import React, { useCallback, useEffect, useState } from "react";
import { deleteCar, fetchAllCars, toUrlList } from "../../firebase/carsAdmin";
import { formatPrice } from "../../utils/formatPrice";
import AddCarForm from "../../components/Admin/AddCarForm";

// Admin-only (behind AdminRoute; Firestore/Storage rules are the real gate).
const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState("");

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
      <AddCarForm onAdded={loadCars} />

      <section className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold text-primary mb-4">
          All Cars {!loading && !loadError && `(${cars.length})`}
        </h2>

        {deleteError && (
          <p role="alert" className="rounded-lg bg-red-50 text-red-700 p-3 mb-4">
            {deleteError}
          </p>
        )}
        {loading && <p className="text-neutral">Loading cars...</p>}
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
          <ul className="divide-y divide-gray-200">
            {cars.map((car) => {
              const thumbnail = toUrlList(car.imageUrls)[0];
              return (
                <li key={car.id} className="flex items-center gap-4 py-3">
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
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-primary truncate">
                      {car.name}
                    </p>
                    <p className="text-sm text-neutral">
                      {car.year} · {formatPrice(car.price)} · {car.type} ·{" "}
                      {car.status}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(car)}
                    disabled={deletingId === car.id}
                    className="shrink-0 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {deletingId === car.id ? "Deleting..." : "Delete"}
                  </button>
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
