import { useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import { addCar, toUrlList, updateCar } from "../../firebase/carsAdmin";

const MAX_PHOTOS = 6;
const MAX_PHOTO_BYTES = 5 * 1024 * 1024;

const EMPTY_FORM = {
  name: "",
  type: "used",
  year: "",
  price: "",
  mileage: "",
  description: "",
  fuelType: "",
  transmission: "",
  bodyType: "",
  color: "",
  engineSize: "",
  horsepower: "",
  status: "available",
  isDealerChoice: false,
  dealerReviewText: "",
};

const STATUSES = ["available", "reserved", "sold"];

// The form's values for an existing car (edit mode). Numbers become strings
// because that's what the inputs hold; missing optional fields become "".
const formFromCar = (car) => ({
  name: String(car.name ?? ""),
  type: car.type === "new" ? "new" : "used",
  year: car.year != null ? String(car.year) : "",
  price: car.price != null ? String(car.price) : "",
  mileage: String(car.mileage ?? ""),
  description: String(car.description ?? ""),
  fuelType: String(car.fuelType ?? ""),
  transmission: String(car.transmission ?? ""),
  bodyType: String(car.bodyType ?? ""),
  color: String(car.color ?? ""),
  engineSize: String(car.engineSize ?? ""),
  horsepower: String(car.horsepower ?? ""),
  status: STATUSES.includes(car.status) ? car.status : "available",
  isDealerChoice: car.isDealerChoice === true,
  dealerReviewText: String(car.dealerReviewText ?? ""),
});

// Optional details; written to the document only when filled in.
const OPTIONAL_FIELDS = [
  {
    name: "fuelType",
    label: "Fuel type",
    placeholder: "e.g. Petrol",
    list: "fuel-types",
  },
  {
    name: "transmission",
    label: "Transmission",
    placeholder: "e.g. Automatic",
    list: "transmissions",
  },
  { name: "bodyType", label: "Body type", placeholder: "e.g. SUV" },
  { name: "color", label: "Color", placeholder: "e.g. Black" },
  { name: "engineSize", label: "Engine size", placeholder: "e.g. 3.5L V6" },
  { name: "horsepower", label: "Horsepower", placeholder: "e.g. 278 HP" },
];

// Every optional text field: written to the document only when filled in, and
// removed from it when an edit empties it.
const OPTIONAL_TEXT_FIELDS = [
  ...OPTIONAL_FIELDS.map(({ name }) => name),
  "dealerReviewText",
];

const inputClass =
  "w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary-light";

const Field = ({ label, error, children }) => (
  <label className="block">
    <span className="block text-sm font-medium text-primary mb-1">{label}</span>
    {children}
    {error && <span className="block text-sm text-red-600 mt-1">{error}</span>}
  </label>
);

const validate = (form, photoCount) => {
  const errors = {};
  if (!form.name.trim()) errors.name = "Name is required.";
  const year = Number(form.year);
  if (
    !form.year ||
    !Number.isInteger(year) ||
    year < 1900 ||
    year > new Date().getFullYear() + 1
  ) {
    errors.year = "Enter a valid year.";
  }
  if (!form.price || !(Number(form.price) > 0))
    errors.price = "Enter a price above 0.";
  if (!form.mileage.trim()) errors.mileage = "Mileage is required.";
  if (!form.description.trim()) errors.description = "Description is required.";
  if (photoCount === 0) errors.photos = "Add at least 1 photo.";
  return errors;
};

// Form to add a car: uploads the photos to Storage, then writes the document.
// Given a `car`, it edits that car instead: pre-filled, its saved photos shown
// (each removable) next to any new ones, and saving updates the document in
// place (onSaved gets the result; onCancel closes without saving).
const AddCarForm = ({ car, onAdded, onSaved, onCancel }) => {
  const isEdit = Boolean(car);
  const [form, setForm] = useState(() => (car ? formFromCar(car) : EMPTY_FORM));
  // Every photo on the form, in gallery order (the first is the cover): the
  // car's saved photos ({ id, url }) and any newly picked ones
  // ({ id, file, previewUrl }). One list, so a saved photo and a new one can
  // be reordered against each other.
  const [gallery, setGallery] = useState(() =>
    car
      ? toUrlList(car.imageUrls).map((url) => ({ id: `saved:${url}`, url }))
      : [],
  );
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState("");
  const [progress, setProgress] = useState(null);
  const fileInput = useRef(null);

  // Preview URLs for new files are created when they're picked and released
  // when they're removed, cleared, or the form closes.
  const galleryRef = useRef(gallery);
  useEffect(() => {
    galleryRef.current = gallery;
  }, [gallery]);
  useEffect(
    () => () =>
      galleryRef.current.forEach(
        (item) => item.previewUrl && URL.revokeObjectURL(item.previewUrl),
      ),
    [],
  );

  const photos = useMemo(
    () => gallery.filter((item) => item.file).map((item) => item.file),
    [gallery],
  );
  const submitting = progress !== null;
  const photoCount = gallery.length;

  const setField = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear a field's error as soon as the user edits it.
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const setChecked = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.checked }));

  const handleFiles = (e) => {
    const picked = Array.from(e.target.files);
    e.target.value = ""; // allow re-picking the same file after removing it

    const problems = [];
    const accepted = [];
    for (const file of picked) {
      if (!file.type.startsWith("image/")) {
        problems.push(`${file.name} isn't an image.`);
      } else if (file.size > MAX_PHOTO_BYTES) {
        problems.push(`${file.name} is over 5 MB.`);
      } else if (
        !photos.some((p) => p.name === file.name && p.size === file.size)
      ) {
        accepted.push(file);
      }
    }

    const room = MAX_PHOTOS - photoCount;
    if (accepted.length > room) {
      problems.push(`You can add up to ${MAX_PHOTOS} photos.`);
    }
    setGallery((prev) => [
      ...prev,
      ...accepted.slice(0, room).map((file) => ({
        id: `new:${file.name}:${file.size}`,
        file,
        previewUrl: URL.createObjectURL(file),
      })),
    ]);
    setErrors((prev) => ({ ...prev, photos: problems.join(" ") || undefined }));
  };

  const removePhoto = (id) => {
    setGallery((prev) =>
      prev.filter((item) => {
        if (item.id !== id) return true;
        if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
        return false;
      }),
    );
    setErrors((prev) => ({ ...prev, photos: undefined }));
  };

  // Moves a photo to the front. Purely a reordering: nothing is uploaded or
  // deleted until Save, and then only what was added or removed.
  const setCover = (id) =>
    setGallery((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      if (index <= 0) return prev;
      return [prev[index], ...prev.slice(0, index), ...prev.slice(index + 1)];
    });

  const clearGallery = () => {
    gallery.forEach(
      (item) => item.previewUrl && URL.revokeObjectURL(item.previewUrl),
    );
    setGallery([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setSubmitError("");

    const found = validate(form, photoCount);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const fields = {
      name: form.name.trim(),
      type: form.type,
      year: Number(form.year),
      price: Number(form.price),
      mileage: form.mileage.trim(),
      description: form.description.trim(),
      status: form.status,
      isDealerChoice: form.isDealerChoice,
    };
    for (const name of OPTIONAL_TEXT_FIELDS) {
      if (form[name].trim()) fields[name] = form[name].trim();
    }

    setProgress(0);
    if (isEdit) {
      try {
        const result = await updateCar(car, fields, {
          photos: gallery.map((item) =>
            item.url ? { url: item.url } : { file: item.file },
          ),
          clearedFields: OPTIONAL_TEXT_FIELDS.filter(
            (name) => !form[name].trim(),
          ),
          onProgress: (done) => setProgress(done),
        });
        onSaved?.(result);
        setProgress(null);
      } catch (error) {
        console.error("Failed to update car:", error);
        setSubmitError(
          error?.code === "permission-denied" ||
            error?.code === "storage/unauthorized"
            ? "Permission denied. Check that you're signed in as the admin and that the Firebase rules are published."
            : "Couldn't save the changes. The car wasn't modified — please try again.",
        );
        setProgress(null);
      }
      return;
    }

    try {
      const id = await addCar(fields, photos, (done) => setProgress(done));
      setSuccess(
        `"${fields.name}" was added and is now live on the ${
          fields.type === "used" ? "Used" : "New"
        } Cars page${fields.status === "available" ? "" : ` (hidden until it's marked available)`}.`,
      );
      setForm(EMPTY_FORM);
      clearGallery();
      setErrors({});
      onAdded?.(id);
    } catch (error) {
      console.error("Failed to add car:", error);
      setSubmitError(
        error?.code === "permission-denied" ||
          error?.code === "storage/unauthorized"
          ? "Permission denied. Check that you're signed in as the admin and that the Firebase rules are published."
          : "Couldn't add the car. Nothing was saved — please try again.",
      );
    } finally {
      setProgress(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-2xl shadow p-6 space-y-6"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-primary">
          {isEdit ? `Edit "${car.name}"` : "Add New Car"}
        </h2>
        {isEdit && (
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-neutral-dark hover:bg-gray-50 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        )}
      </div>

      {success && (
        <p role="status" className="rounded-lg bg-green-50 text-green-800 p-3">
          {success}
        </p>
      )}
      {submitError && (
        <p role="alert" className="rounded-lg bg-red-50 text-red-700 p-3">
          {submitError}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Name *" error={errors.name}>
          <input
            name="name"
            value={form.name}
            onChange={setField}
            className={inputClass}
            placeholder="e.g. Toyota Land Cruiser Prado"
          />
        </Field>
        <Field label="Type *">
          <select
            name="type"
            value={form.type}
            onChange={setField}
            className={inputClass}
          >
            <option value="used">Used</option>
            <option value="new">New</option>
          </select>
        </Field>
        <Field label="Year *" error={errors.year}>
          <input
            name="year"
            type="number"
            value={form.year}
            onChange={setField}
            className={inputClass}
            placeholder="e.g. 2018"
          />
        </Field>
        <Field label="Price (USD) *" error={errors.price}>
          <input
            name="price"
            type="number"
            min="0"
            value={form.price}
            onChange={setField}
            className={inputClass}
            placeholder="e.g. 25000"
          />
        </Field>
        <Field label="Mileage *" error={errors.mileage}>
          <input
            name="mileage"
            value={form.mileage}
            onChange={setField}
            className={inputClass}
            placeholder="e.g. 45,000 km"
          />
        </Field>
        <Field label="Status">
          <select
            name="status"
            value={form.status}
            onChange={setField}
            className={inputClass}
          >
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
            <option value="sold">Sold</option>
          </select>
        </Field>
      </div>

      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          name="isDealerChoice"
          checked={form.isDealerChoice}
          onChange={setChecked}
          className="mt-1 h-4 w-4"
        />
        <span className="text-sm font-medium text-primary">
          Dealer's Choice
          <span className="block font-normal text-neutral">
            Feature this car in the homepage's Dealer's Choice section.
          </span>
        </span>
      </label>

      <Field label="Description *" error={errors.description}>
        <textarea
          name="description"
          rows={4}
          value={form.description}
          onChange={setField}
          className={inputClass}
          placeholder="Condition, features, history..."
        />
      </Field>

      <Field label="Dealer's Review (optional)">
        <textarea
          name="dealerReviewText"
          rows={5}
          value={form.dealerReviewText}
          onChange={setField}
          maxLength={2000}
          className={inputClass}
          placeholder="Your own take on this car: what you like about it, how it drives, who it suits..."
        />
        <span className="block text-xs text-neutral mt-1">
          Shown on the Reviews page when this car is also marked Dealer's
          Choice.
        </span>
      </Field>

      <div>
        <h3 className="text-sm font-semibold text-neutral mb-3">
          More details (optional)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {OPTIONAL_FIELDS.map(({ name, label, placeholder, list }) => (
            <Field key={name} label={label}>
              <input
                name={name}
                value={form[name]}
                onChange={setField}
                list={list}
                className={inputClass}
                placeholder={placeholder}
              />
            </Field>
          ))}
        </div>
        <datalist id="fuel-types">
          <option value="Petrol" />
          <option value="Diesel" />
          <option value="Hybrid" />
          <option value="Electric" />
        </datalist>
        <datalist id="transmissions">
          <option value="Automatic" />
          <option value="Manual" />
        </datalist>
      </div>

      <div>
        <span className="block text-sm font-medium text-primary mb-1">
          Photos * (1–{MAX_PHOTOS}, up to 5 MB each)
        </span>
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFiles}
          disabled={photoCount >= MAX_PHOTOS}
          aria-label="Choose photos"
          className="block w-full text-sm text-neutral file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-primary-light file:px-4 file:py-2 file:text-white file:hover:bg-primary"
        />
        {errors.photos && (
          <span className="block text-sm text-red-600 mt-1">
            {errors.photos}
          </span>
        )}
        {isEdit && (
          <span className="block text-xs text-neutral mt-1">
            Photos appear in this order on the car's page. The first is the
            cover (the listing photo and the main image) — use "Set as cover" to
            change it. New photos are added at the end.
          </span>
        )}
        {photoCount > 0 && (
          <ul className="mt-3 grid grid-cols-3 md:grid-cols-6 gap-3">
            {gallery.map((item, index) => {
              const isSaved = Boolean(item.url);
              const isCover = isEdit && index === 0;
              // Saved photos are numbered among the saved ones, in current order.
              const savedNumber = gallery
                .slice(0, index + 1)
                .filter((g) => g.url).length;
              const label = isSaved
                ? `saved photo ${savedNumber}`
                : item.file.name;
              return (
                <li
                  key={item.id}
                  className={`relative ${
                    isCover ? "rounded-lg ring-2 ring-primary" : ""
                  }`}
                >
                  <img
                    src={item.url ?? item.previewUrl}
                    alt={
                      isSaved ? `Saved photo ${savedNumber}` : item.file.name
                    }
                    className="h-24 w-full rounded-lg object-cover"
                  />
                  {isCover && (
                    <span className="absolute top-1 left-1 rounded bg-primary px-1.5 text-[10px] font-semibold text-white">
                      Cover
                    </span>
                  )}
                  {isEdit && !isSaved && (
                    <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 text-[10px] font-semibold text-white">
                      New
                    </span>
                  )}
                  {isEdit && !isCover && (
                    <button
                      type="button"
                      onClick={() => setCover(item.id)}
                      aria-label={`Set ${label} as cover`}
                      className="absolute bottom-1 right-1 rounded bg-white/90 px-1.5 py-0.5 text-[10px] font-semibold text-primary shadow cursor-pointer hover:bg-white"
                    >
                      Set as cover
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => removePhoto(item.id)}
                    aria-label={`Remove ${label}`}
                    className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white shadow cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-primary-light hover:bg-primary text-white font-semibold h-12 px-8 rounded-xl cursor-pointer transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting
          ? photos.length > 0
            ? `Uploading photos (${progress}/${photos.length})...`
            : "Saving..."
          : isEdit
            ? "Save Changes"
            : "Add Car"}
      </button>
    </form>
  );
};

export default AddCarForm;
