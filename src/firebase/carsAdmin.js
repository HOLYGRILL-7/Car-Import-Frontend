// Admin-only writes to the "cars" collection and its photos in Storage.
// Firestore/Storage rules enforce that only the admin account can do these.
import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { db, storage } from "./config";

// imageUrls should be an array, but tolerate a lone string from hand-made docs.
export const toUrlList = (imageUrls) => {
  if (Array.isArray(imageUrls)) return imageUrls;
  return typeof imageUrls === "string" && imageUrls ? [imageUrls] : [];
};

const safeFileName = (name) => name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");

// Every car regardless of status, newest first. Sorted here (not with
// orderBy) so docs missing createdAt still show up and can be deleted.
export const fetchAllCars = async () => {
  const snapshot = await getDocs(collection(db, "cars"));
  return snapshot.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0));
};

// Changes only a car's status: the quick toggle on the Manage Cars list.
export const updateCarStatus = (carId, status) =>
  updateDoc(doc(db, "cars", carId), { status });

// Uploads the photos, then writes the car doc with the resulting imageUrls.
// If anything fails, photos already uploaded are removed again.
export const addCar = async (fields, photos, onProgress) => {
  const carRef = doc(collection(db, "cars"));
  let uploadedCount = 0;

  const uploads = await Promise.allSettled(
    photos.map(async (file, index) => {
      const photoRef = ref(
        storage,
        `cars/${carRef.id}/${Date.now()}-${index}-${safeFileName(file.name)}`,
      );
      await uploadBytes(photoRef, file, { contentType: file.type });
      const url = await getDownloadURL(photoRef);
      onProgress?.(++uploadedCount, photos.length);
      return { photoRef, url };
    }),
  );

  const uploaded = uploads
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);
  const failure = uploads.find((result) => result.status === "rejected");

  try {
    if (failure) throw failure.reason;
    await setDoc(carRef, {
      ...fields,
      imageUrls: uploaded.map(({ url }) => url),
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    await Promise.allSettled(
      uploaded.map(({ photoRef }) => deleteObject(photoRef)),
    );
    throw error;
  }

  return carRef.id;
};

// Only http(s) download URLs are resolved; ref() would treat any other string
// as a path inside the bucket.
const isDownloadUrl = (value) => /^https?:\/\//.test(value);

// Deletes the car's photos from Storage, then its Firestore document. Photos
// that aren't this admin's to delete (other hosts or buckets, or outside
// cars/) are skipped, as is one that's already gone. Any other Storage error
// stops before the document is touched, so it can be retried without
// orphaning anything.
export const deleteCar = async (car) => {
  for (const url of toUrlList(car.imageUrls)) {
    if (!isDownloadUrl(url)) continue;

    let photoRef;
    try {
      photoRef = ref(storage, url);
    } catch {
      continue; // not a Firebase Storage URL
    }
    if (
      photoRef.bucket !== storage.app.options.storageBucket ||
      !photoRef.fullPath.startsWith("cars/")
    ) {
      continue;
    }

    try {
      await deleteObject(photoRef);
    } catch (error) {
      if (error.code !== "storage/object-not-found") throw error;
    }
  }

  await deleteDoc(doc(db, "cars", car.id));
};

// Removes one photo from Storage. Returns false only when it should have been
// deleted but couldn't be; photos that aren't this admin's to delete (other
// hosts or buckets, outside cars/) or that are already gone count as done.
const deleteStoragePhoto = async (url) => {
  if (!isDownloadUrl(url)) return true;

  let photoRef;
  try {
    photoRef = ref(storage, url);
  } catch {
    return true; // not a Firebase Storage URL
  }
  if (
    photoRef.bucket !== storage.app.options.storageBucket ||
    !photoRef.fullPath.startsWith("cars/")
  ) {
    return true;
  }

  try {
    await deleteObject(photoRef);
    return true;
  } catch (error) {
    return error.code === "storage/object-not-found";
  }
};

// Updates an existing car in place. `photos` is the final gallery, in order
// (the first is the cover): each entry is either a saved photo ({ url }) or a
// new file to upload ({ file }), so a new photo can be placed anywhere.
// Reordering saved photos touches nothing in Storage. Order of operations, so
// a failure never leaves the listing pointing at photos that are gone:
//   1. upload the new photos (removed again if anything below fails)
//   2. update the document — createdAt and id are untouched
//   3. only then delete the removed photos from Storage
// `clearedFields` are optional fields the admin emptied; they're removed from
// the document rather than left holding their old value.
// Resolves to { car, cleanupFailures }: the updated car, and how many removed
// photos couldn't be deleted from Storage (the save itself still succeeded).
export const updateCar = async (
  car,
  fields,
  { photos, clearedFields = [], onProgress },
) => {
  const newPhotos = photos
    .filter((photo) => photo.file)
    .map((photo) => photo.file);
  let uploadedCount = 0;

  const uploads = await Promise.allSettled(
    newPhotos.map(async (file, index) => {
      const photoRef = ref(
        storage,
        `cars/${car.id}/${Date.now()}-${index}-${safeFileName(file.name)}`,
      );
      await uploadBytes(photoRef, file, { contentType: file.type });
      const url = await getDownloadURL(photoRef);
      onProgress?.(++uploadedCount, newPhotos.length);
      return { photoRef, url };
    }),
  );

  const uploaded = uploads
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);
  const failure = uploads.find((result) => result.status === "rejected");

  let imageUrls;
  try {
    if (failure) throw failure.reason;
    // Promise.allSettled keeps results in input order, so each new file maps
    // to its own uploaded URL and lands where the admin put it.
    const urlByFile = new Map(
      newPhotos.map((file, i) => [file, uploads[i].value.url]),
    );
    imageUrls = photos.map((photo) => photo.url ?? urlByFile.get(photo.file));
    await updateDoc(doc(db, "cars", car.id), {
      ...fields,
      ...Object.fromEntries(clearedFields.map((name) => [name, deleteField()])),
      imageUrls,
    });
  } catch (error) {
    await Promise.allSettled(
      uploaded.map(({ photoRef }) => deleteObject(photoRef)),
    );
    throw error;
  }

  const removedUrls = toUrlList(car.imageUrls).filter(
    (url) => !imageUrls.includes(url),
  );
  const results = await Promise.all(removedUrls.map(deleteStoragePhoto));

  const updated = { ...car, ...fields, imageUrls };
  for (const name of clearedFields) delete updated[name];
  return { car: updated, cleanupFailures: results.filter((ok) => !ok).length };
};
