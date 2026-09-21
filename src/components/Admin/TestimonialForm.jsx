import { useState } from "react";
import { Star } from "lucide-react";
import { addTestimonial, updateTestimonial } from "../../firebase/testimonials";

const inputClass =
  "w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary-light";

const pad = (n) => String(n).padStart(2, "0");

// <input type="date"> values are "YYYY-MM-DD" in the admin's own time zone.
const toInputDate = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

// Noon local time, so the day shows the same everywhere the page is read.
const fromInputDate = (value) => {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d, 12);
};

const formFor = (testimonial) => ({
  customerName: testimonial?.customerName ?? "",
  quote: testimonial?.quote ?? "",
  rating: testimonial?.rating ?? 0,
  date: toInputDate(testimonial?.date ?? new Date()),
  featured: testimonial?.featured ?? true,
});

const Field = ({ label, error, children }) => (
  <label className="block">
    <span className="block text-sm font-medium text-primary mb-1">{label}</span>
    {children}
    {error && <span className="block text-sm text-red-600 mt-1">{error}</span>}
  </label>
);

// Five stars as radio buttons: click one, or use the arrow keys.
const RatingInput = ({ value, onChange, error }) => (
  <fieldset>
    <legend className="block text-sm font-medium text-primary mb-1">
      Rating *
    </legend>
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <label
          key={n}
          className="cursor-pointer rounded p-1 has-focus-visible:ring-2 has-focus-visible:ring-primary-light"
        >
          <input
            type="radio"
            name="rating"
            value={n}
            checked={value === n}
            onChange={() => onChange(n)}
            className="sr-only"
          />
          <Star
            aria-hidden="true"
            className={`h-8 w-8 ${
              n <= value ? "fill-accent text-accent" : "text-gray-300"
            }`}
          />
          <span className="sr-only">
            {n} star{n > 1 ? "s" : ""}
          </span>
        </label>
      ))}
      <span className="ml-2 text-sm text-neutral">
        {value ? `${value} out of 5` : "Choose a rating"}
      </span>
    </div>
    {error && <span className="block text-sm text-red-600 mt-1">{error}</span>}
  </fieldset>
);

const validate = (form) => {
  const errors = {};
  if (!form.customerName.trim())
    errors.customerName = "Customer name is required.";
  if (!form.quote.trim()) errors.quote = "The quote is required.";
  if (!(form.rating >= 1 && form.rating <= 5))
    errors.rating = "Choose a rating from 1 to 5.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(form.date)) errors.date = "Pick a date.";
  return errors;
};

// Form to add a testimonial. Given a `testimonial`, it edits that one instead
// (pre-filled; onSaved gets the result, onCancel closes without saving).
const TestimonialForm = ({ testimonial, onAdded, onSaved, onCancel }) => {
  const isEdit = Boolean(testimonial);
  const [form, setForm] = useState(() => formFor(testimonial));
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const setField = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const setRating = (rating) => {
    setForm((prev) => ({ ...prev, rating }));
    setErrors((prev) => ({ ...prev, rating: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setSubmitError("");

    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const fields = {
      customerName: form.customerName.trim(),
      quote: form.quote.trim(),
      rating: form.rating,
      date: fromInputDate(form.date),
      featured: form.featured,
    };

    setSubmitting(true);
    try {
      if (isEdit) {
        await updateTestimonial(testimonial.id, fields);
        onSaved?.({ ...testimonial, ...fields });
      } else {
        await addTestimonial(fields);
        setSuccess(
          `${fields.customerName}'s testimonial was added${
            fields.featured
              ? " and is now on the Reviews page"
              : " (hidden from the Reviews page)"
          }.`,
        );
        setForm(formFor(null));
        setErrors({});
        onAdded?.();
      }
    } catch (error) {
      console.error("Failed to save testimonial:", error);
      setSubmitError(
        error?.code === "permission-denied"
          ? "Permission denied. Check that you're signed in as the admin and that the Firebase rules are published."
          : "Couldn't save the testimonial. Nothing was changed — please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-2xl shadow p-4 sm:p-6 space-y-6"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-primary">
          {isEdit
            ? `Edit ${testimonial.customerName}'s testimonial`
            : "Add New Testimonial"}
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
        <Field label="Customer name *" error={errors.customerName}>
          <input
            name="customerName"
            value={form.customerName}
            onChange={setField}
            maxLength={60}
            className={inputClass}
            placeholder="e.g. Kwame A."
          />
        </Field>
        <Field label="Date *" error={errors.date}>
          <input
            name="date"
            type="date"
            value={form.date}
            max={toInputDate(new Date())}
            onChange={setField}
            className={inputClass}
          />
        </Field>
      </div>

      <RatingInput
        value={form.rating}
        onChange={setRating}
        error={errors.rating}
      />

      <Field label="Quote *" error={errors.quote}>
        <textarea
          name="quote"
          rows={4}
          value={form.quote}
          onChange={setField}
          maxLength={600}
          className={inputClass}
          placeholder="What the customer said..."
        />
      </Field>

      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, featured: e.target.checked }))
          }
          className="mt-1 h-4 w-4"
        />
        <span className="text-sm font-medium text-primary">
          Show on the Reviews page
          <span className="block font-normal text-neutral">
            Untick to keep it saved here without showing it to visitors.
          </span>
        </span>
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="bg-primary-light hover:bg-primary text-white font-semibold h-12 px-8 rounded-xl cursor-pointer transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Saving..." : isEdit ? "Save Changes" : "Add Testimonial"}
      </button>
    </form>
  );
};

export default TestimonialForm;
