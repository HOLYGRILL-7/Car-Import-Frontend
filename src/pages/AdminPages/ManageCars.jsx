import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  deleteCar,
  fetchAllCars,
  toUrlList,
  updateCarStatus,
} from "../../firebase/carsAdmin";
import { STATUSES } from "../../utils/carStats";
import { formatPrice } from "../../utils/formatPrice";
import AddCarForm from "../../components/Admin/AddCarForm";
import AdminCarListSkeleton from "../../components/Skeleton/AdminCarListSkeleton";

// Admin-only (behind AdminRoute; Firestore/Storage rules are the real gate).
const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const [editingCar, setEditingCar] = useState(null);
  const [notice, setNotice] = useState(null);
  const [linkError, setLinkError] = useState("");
  const [statusSaving, setStatusSaving] = useState(null); // { id, status }
  const [statusError, setStatusError] = useState("");
  const formRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const editId = searchParams.get("edit");

  const loadCars = useCallback(async () => {
    try {
      setCars(await fetchAllCars());
      setLoadError(false);
    } catch (error) {
      console.error("Failed to load cars:", error);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCars();
  }, [loadCars]);

  // /admin/cars?edit=<id> (the dashboard's links) opens that car's Edit form
  // once the list has loaded, then drops the parameter so a refresh or Cancel
  // behaves normally.
  useEffect(() => {
    if (!editId || loading) return;
    const car = cars.find((c) => c.id === editId);
    if (car) {
      setNotice(null);
      setEditingCar(car);
    } else if (!loadError) {
      setLinkError("That car couldn't be found. It may have been deleted.");
    }
    setSearchParams({}, { replace: true });
  }, [editId, loading, loadError, cars, setSearchParams]);

  // Bring the form into view when an Edit button is clicked.
  useEffect(() => {
    if (editingCar) {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [editingCar]);

  const handleEdit = (car) => {
    setNotice(null);
    setEditingCar(car);
  };

  // The form saved: show the change in the list straight away, close the
  // form, and re-sync from Firestore in the background.
  const handleSaved = ({ car: updated, cleanupFailures }) => {
    setCars((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    setEditingCar(null);
    setNotice({
      message: `"${updated.name}" was updated.`,
      warning:
        cleanupFailures > 0
          ? `${cleanupFailures} removed photo${
              cleanupFailures === 1 ? "" : "s"
            } couldn't be deleted from Storage and may need manual cleanup.`
          : null,
    });
    loadCars();
  };

  // The status dropdown on each row: saves just the status, right away. The
  // list only changes once Firestore has accepted it; on failure the dropdown
  // goes back to the old value and says so.
  const handleStatusChange = async (car, status) => {
    if (status === car.status) return;
    setStatusError("");
    setStatusSaving({ id: car.id, status });
    try {
      await updateCarStatus(car.id, status);
      setCars((prev) =>
        prev.map((c) => (c.id === car.id ? { ...c, status } : c)),
      );
    } catch (error) {
      console.error("Failed to update car status:", error);
      setStatusError(
        `Couldn't change the status of "${car.name}". It's still ${car.status}. Please try again.`,
      );
    } finally {
      setStatusSaving(null);
    }
  };

  const handleDelete = async (car) => {
    const confirmed = window.confirm(
      `Delete "${car.name}"?\n\nThis permanently removes the listing and its photos.`,
    );
    if (!confirmed) return;

    setDeleteError("");
    setDeletingId(car.id);
    try {
      await deleteCar(car);
      setCars((prev) => prev.filter((c) => c.id !== car.id));
      // Don't leave the edit form open on a car that no longer exists.
      setEditingCar((current) => (current?.id === car.id ? null : current));
    } catch (error) {
      console.error("Failed to delete car:", error);
      setDeleteError(
        `Couldn't delete "${car.name}". Nothing was removed from the listing — please try again.`,
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div ref={formRef}>
        <AddCarForm
          key={editingCar?.id ?? "add"}
          car={editingCar ?? undefined}
          onAdded={loadCars}
          onSaved={handleSaved}
          onCancel={() => setEditingCar(null)}
        />
      </div>

      <section className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold text-primary mb-4">
          All Cars {!loading && !loadError && `(${cars.length})`}
        </h2>

        {notice && (
          <div
            role="status"
            className="rounded-lg bg-green-50 text-green-800 p-3 mb-4"
          >
            <p>{notice.message}</p>
            {notice.warning && (
              <p className="mt-1 text-amber-700">{notice.warning}</p>
            )}
          </div>
        )}
        {linkError && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 text-red-700 p-3 mb-4"
          >
            {linkError}
          </p>
        )}
        {statusError && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 text-red-700 p-3 mb-4"
          >
            {statusError}
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
        {loading && <AdminCarListSkeleton />}
        {loadError && (
          <p className="text-neutral">
            Couldn't load cars. Check your connection and the Firebase rules,
            then refresh.
          </p>
        )}
        {!loading && !loadError && cars.length === 0 && (
          <p className="text-neutral">No cars yet. Add your first one above.</p>
        )}

        {cars.length > 0 && (
          <ul className="divide-y divide-gray-200 fade-in">
            {cars.map((car) => {
              const thumbnail = toUrlList(car.imageUrls)[0];
              const isEditing = editingCar?.id === car.id;
              return (
                <li
                  key={car.id}
                  className={`flex flex-wrap items-center gap-x-4 gap-y-3 py-3 ${
                    isEditing ? "-mx-3 rounded-lg bg-blue-50 px-3" : ""
                  }`}
                >
                  {thumbnail ? (
                    <img
                      src={thumbnail}
                      alt=""
                      className="h-16 w-24 shrink-0 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="h-16 w-24 shrink-0 rounded-lg bg-neutral-light flex items-center justify-center text-xs text-neutral">
                      No photo
                    </div>
                  )}
                  <div className="min-w-0 flex-1 basis-40">
                    <p className="font-semibold text-primary truncate">
                      {car.name}
                    </p>
                    <p className="text-sm text-neutral">
                      {car.year} · {formatPrice(car.price)} · {car.type}
                    </p>
                  </div>
                  {/* On phones the controls take their own line under the car. */}
                  <div className="flex w-full items-center gap-2 sm:w-auto sm:gap-4">
                    <select
                      value={
                        statusSaving?.id === car.id
                          ? statusSaving.status
                          : car.status
                      }
                      onChange={(e) => handleStatusChange(car, e.target.value)}
                      disabled={
                        statusSaving?.id === car.id ||
                        deletingId === car.id ||
                        isEditing
                      }
                      aria-label={`Status of ${car.name}`}
                      title={
                        isEditing
                          ? "Change the status in the form below while editing"
                          : undefined
                      }
                      className="shrink-0 max-sm:flex-1 rounded-lg border border-gray-300 bg-white px-2 py-2 text-sm font-semibold capitalize text-primary cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {(STATUSES.includes(car.status)
                        ? STATUSES
                        : [...STATUSES, car.status]
                      ).map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => handleEdit(car)}
                      disabled={deletingId === car.id || isEditing}
                      className="shrink-0 rounded-lg bg-primary-light px-4 py-2 text-sm font-semibold text-white hover:bg-primary cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isEditing ? "Editing" : "Edit"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(car)}
                      disabled={deletingId === car.id}
                      className="shrink-0 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {deletingId === car.id ? "Deleting..." : "Delete"}
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

export default ManageCars;
