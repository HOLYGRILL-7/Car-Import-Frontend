// Admin-only writes to the "cars" collection and its photos in Storage.
// Firestore/Storage rules enforce that only the admin account can do these.
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
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
    await Promise.allSettled(uploaded.map(({ photoRef }) => deleteObject(photoRef)));
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
