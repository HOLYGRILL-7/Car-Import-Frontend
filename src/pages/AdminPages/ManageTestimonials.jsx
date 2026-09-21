import { useCallback, useEffect, useRef, useState } from "react";
import {
  deleteTestimonial,
  fetchAllTestimonials,
} from "../../firebase/testimonials";
import TestimonialForm from "../../components/Admin/TestimonialForm";
import StarRating from "../../components/Reviews/StarRating";
import Skeleton from "../../components/Skeleton/Skeleton";
import { formatDate } from "../../utils/formatDate";

// Admin-only (behind AdminRoute; Firestore rules are the real gate).
const ManageTestimonials = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [editing, setEditing] = useState(null);
  const [notice, setNotice] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const formRef = useRef(null);

  const load = useCallback(async () => {
    try {
      setItems(await fetchAllTestimonials());
      setLoadError(false);
    } catch (error) {
      console.error("Failed to load testimonials:", error);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Bring the form into view when an Edit button is clicked.
  useEffect(() => {
    if (editing) {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [editing]);

  const handleEdit = (testimonial) => {
    setNotice("");
    setEditing(testimonial);
  };

  // Saved from the edit form: show the change straight away, close the form
  // and re-sync in the background.
  const handleSaved = (updated) => {
    setItems((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    setEditing(null);
    setNotice(`${updated.customerName}'s testimonial was updated.`);
    load();
  };

  const handleDelete = async (testimonial) => {
    const confirmed = window.confirm(
      `Delete ${testimonial.customerName}'s testimonial?\n\nThis permanently removes it from the Reviews page.`,
    );
    if (!confirmed) return;

    setDeleteError("");
    setDeletingId(testimonial.id);
    try {
      await deleteTestimonial(testimonial.id);
      setItems((prev) => prev.filter((t) => t.id !== testimonial.id));
      setEditing((current) =>
        current?.id === testimonial.id ? null : current,
      );
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
      setDeleteError(
        `Couldn't delete ${testimonial.customerName}'s testimonial. Nothing was removed — please try again.`,
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div ref={formRef}>
        <TestimonialForm
          key={editing?.id ?? "add"}
          testimonial={editing ?? undefined}
          onAdded={load}
          onSaved={handleSaved}
          onCancel={() => setEditing(null)}
        />
      </div>

      <section className="bg-white rounded-2xl shadow p-4 sm:p-6">
        <h2 className="text-xl font-bold text-primary mb-4">
          All Testimonials {!loading && !loadError && `(${items.length})`}
        </h2>

        {notice && (
          <p
            role="status"
            className="rounded-lg bg-green-50 text-green-800 p-3 mb-4"
          >
            {notice}
          </p>
        )}
        {deleteError && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 text-red-700 p-3 mb-4"
          >
            {deleteError}
          </p>
        )}
        {loading && (
          <div role="status" aria-busy="true" className="space-y-4">
            <span className="sr-only">Loading testimonials...</span>
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        )}
        {loadError && (
          <p className="text-neutral">
            Couldn't load testimonials. Check your connection and the Firebase
            rules, then refresh.
          </p>
        )}
        {!loading && !loadError && items.length === 0 && (
          <p className="text-neutral">
            No testimonials yet. Add your first one above.
          </p>
        )}

        {items.length > 0 && (
          <ul className="divide-y divide-gray-200 fade-in">
            {items.map((testimonial) => {
              const isEditing = editing?.id === testimonial.id;
              return (
                <li
                  key={testimonial.id}
                  className={`flex flex-wrap items-center gap-x-4 gap-y-3 py-3 ${
                    isEditing ? "-mx-3 rounded-lg bg-blue-50 px-3" : ""
                  }`}
                >
                  <div className="min-w-0 flex-1 basis-56">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <p className="font-semibold text-primary truncate">
                        {testimonial.customerName}
                      </p>
                      <StarRating
                        value={testimonial.rating}
                        className="[&_svg]:h-4 [&_svg]:w-4"
                      />
                      {!testimonial.featured && (
                        <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold text-neutral-dark">
                          Hidden
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-neutral">
                      {formatDate(testimonial.date)}
                    </p>
                    <p className="mt-1 text-sm text-neutral-dark line-clamp-2 wrap-break-word">
                      {testimonial.quote}
                    </p>
                  </div>
                  <div className="flex w-full items-center gap-2 sm:w-auto sm:gap-4">
                    <button
                      type="button"
                      onClick={() => handleEdit(testimonial)}
                      disabled={deletingId === testimonial.id || isEditing}
                      className="shrink-0 rounded-lg bg-primary-light px-4 py-2 text-sm font-semibold text-white hover:bg-primary cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isEditing ? "Editing" : "Edit"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(testimonial)}
                      disabled={deletingId === testimonial.id}
                      className="shrink-0 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {deletingId === testimonial.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
};

export default ManageTestimonials;
