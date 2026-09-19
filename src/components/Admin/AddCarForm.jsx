import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { addCar } from "../../firebase/carsAdmin";

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
};

// Optional details; written to the document only when filled in.
const OPTIONAL_FIELDS = [
  { name: "fuelType", label: "Fuel type", placeholder: "e.g. Petrol", list: "fuel-types" },
  { name: "transmission", label: "Transmission", placeholder: "e.g. Automatic", list: "transmissions" },
  { name: "bodyType", label: "Body type", placeholder: "e.g. SUV" },
  { name: "color", label: "Color", placeholder: "e.g. Black" },
  { name: "engineSize", label: "Engine size", placeholder: "e.g. 3.5L V6" },
  { name: "horsepower", label: "Horsepower", placeholder: "e.g. 278 HP" },
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

const validate = (form, photos) => {
  const errors = {};
  if (!form.name.trim()) errors.name = "Name is required.";
  const year = Number(form.year);
  if (!form.year || !Number.isInteger(year) || year < 1900 || year > new Date().getFullYear() + 1) {
    errors.year = "Enter a valid year.";
  }
  if (!form.price || !(Number(form.price) > 0)) errors.price = "Enter a price above 0.";
  if (!form.mileage.trim()) errors.mileage = "Mileage is required.";
  if (!form.description.trim()) errors.description = "Description is required.";
  if (photos.length === 0) errors.photos = "Add at least 1 photo.";
  return errors;
};

// Form to add a car: uploads the photos to Storage, then writes the document.
const AddCarForm = ({ onAdded }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [photos, setPhotos] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState("");
  const [progress, setProgress] = useState(null);
  const fileInput = useRef(null);

  // Object URLs for the thumbnails; released whenever the selection changes.
  useEffect(() => {
    const urls = photos.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [photos]);

  const submitting = progress !== null;

  const setField = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear a field's error as soon as the user edits it.
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

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

    const room = MAX_PHOTOS - photos.length;
    if (accepted.length > room) {
      problems.push(`You can add up to ${MAX_PHOTOS} photos.`);
    }
    setPhotos((prev) => [...prev, ...accepted.slice(0, room)]);
    setErrors((prev) => ({ ...prev, photos: problems.join(" ") || undefined }));
  };

  const removePhoto = (index) =>
    setPhotos((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setSubmitError("");

    const found = validate(form, photos);
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
    };
    for (const { name } of OPTIONAL_FIELDS) {
      if (form[name].trim()) fields[name] = form[name].trim();
    }

    setProgress(0);
    try {
      const id = await addCar(fields, photos, (done) => setProgress(done));
      setSuccess(
        `"${fields.name}" was added and is now live on the ${
          fields.type === "used" ? "Used" : "New"
        } Cars page${fields.status === "available" ? "" : ` (hidden until it's marked available)`}.`,
      );
      setForm(EMPTY_FORM);
      setPhotos([]);
      setErrors({});
      onAdded?.(id);
    } catch (error) {
      console.error("Failed to add car:", error);
      setSubmitError(
        error?.code === "permission-denied" || error?.code === "storage/unauthorized"
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
      <h2 className="text-xl font-bold text-primary">Add New Car</h2>

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
          <input name="name" value={form.name} onChange={setField} className={inputClass} placeholder="e.g. Toyota Land Cruiser Prado" />
        </Field>
        <Field label="Type *">
          <select name="type" value={form.type} onChange={setField} className={inputClass}>
            <option value="used">Used</option>
            <option value="new">New</option>
          </select>
        </Field>
        <Field label="Year *" error={errors.year}>
          <input name="year" type="number" value={form.year} onChange={setField} className={inputClass} placeholder="e.g. 2018" />
        </Field>
        <Field label="Price (USD) *" error={errors.price}>
          <input name="price" type="number" min="0" value={form.price} onChange={setField} className={inputClass} placeholder="e.g. 25000" />
        </Field>
        <Field label="Mileage *" error={errors.mileage}>
          <input name="mileage" value={form.mileage} onChange={setField} className={inputClass} placeholder="e.g. 45,000 km" />
        </Field>
        <Field label="Status">
          <select name="status" value={form.status} onChange={setField} className={inputClass}>
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
            <option value="sold">Sold</option>
          </select>
        </Field>
      </div>

      <Field label="Description *" error={errors.description}>
        <textarea name="description" rows={4} value={form.description} onChange={setField} className={inputClass} placeholder="Condition, features, history..." />
      </Field>

      <div>
        <h3 className="text-sm font-semibold text-neutral mb-3">
          More details (optional)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {OPTIONAL_FIELDS.map(({ name, label, placeholder, list }) => (
            <Field key={name} label={label}>
              <input name={name} value={form[name]} onChange={setField} list={list} className={inputClass} placeholder={placeholder} />
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
          disabled={photos.length >= MAX_PHOTOS}
          aria-label="Choose photos"
          className="block w-full text-sm text-neutral file:mr-4 file:rounded-lg file:border-0 file:bg-primary-light file:px-4 file:py-2 file:text-white hover:file:bg-primary"
        />
        {errors.photos && (
          <span className="block text-sm text-red-600 mt-1">{errors.photos}</span>
        )}
        {photos.length > 0 && (
          <ul className="mt-3 grid grid-cols-3 md:grid-cols-6 gap-3">
            {photos.map((file, index) => (
              <li key={`${file.name}-${file.size}`} className="relative">
                <img
                  src={previews[index]}
                  alt={file.name}
                  className="h-24 w-full rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  aria-label={`Remove ${file.name}`}
                  className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white shadow cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-primary-light hover:bg-primary text-white font-semibold h-12 px-8 rounded-xl cursor-pointer transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting
          ? `Uploading photos (${progress}/${photos.length})...`
          : "Add Car"}
      </button>
    </form>
  );
};

export default AddCarForm;
