import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useWishlist } from "../../context/useWishlist";
import CarListingCard from "../../components/Cars/CarListingCard";

// A signed-in user's saved cars (the route is behind ProtectedRoute).
const Wishlist = () => {
  const { savedIds, loading: wishlistLoading, unsave } = useWishlist();

  // Car docs by id; null means the car no longer exists (e.g. deleted).
  const [carsById, setCarsById] = useState({});
  const [fetchError, setFetchError] = useState(null);

  const missingIds = savedIds.filter((id) => !(id in carsById));
  const missingKey = JSON.stringify(missingIds);

  useEffect(() => {
    const ids = JSON.parse(missingKey);
    if (ids.length === 0) return;

    let cancelled = false;
    Promise.all(
      ids.map((id) =>
        getDoc(doc(db, "cars", id)).then((snapshot) => [
          id,
          snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null,
        ]),
      ),
    )
      .then((entries) => {
        if (!cancelled) {
          setCarsById((prev) => ({ ...prev, ...Object.fromEntries(entries) }));
        }
      })
      .catch((error) => {
        if (cancelled) return;
        console.error("Failed to load saved cars:", error);
        setFetchError(error);
      });

    return () => {
      cancelled = true;
    };
  }, [missingKey]);

  const loading = wishlistLoading || (missingIds.length > 0 && !fetchError);
  const cars = savedIds.map((id) => carsById[id]).filter(Boolean);
  const unavailableIds = savedIds.filter((id) => carsById[id] === null);

  return (
    <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-primary">Saved Cars</h1>
      <p className="text-neutral mt-2">Cars you've saved to look at later.</p>

      {loading && (
        <p className="my-10 text-center text-neutral">Loading your cars...</p>
      )}
      {fetchError && (
        <p className="my-10 text-center text-neutral">
          Couldn't load your saved cars right now. Please try again later.
        </p>
      )}
      {!loading && !fetchError && savedIds.length === 0 && (
        <div className="my-16 text-center text-neutral space-y-4">
          <p>You haven't saved any cars yet.</p>
          <p>
            Browse{" "}
            <Link to="/newCars" className="text-accent hover:underline">
              new cars
            </Link>{" "}
            or{" "}
            <Link to="/usedCars" className="text-accent hover:underline">
              used cars
            </Link>{" "}
            and tap the heart to save one.
          </p>
        </div>
      )}

      {cars.length > 0 && (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10">
          {cars.map((car) => (
            <li key={car.id}>
              <CarListingCard car={car} />
            </li>
          ))}
        </ul>
      )}

      {unavailableIds.length > 0 && (
        <p className="text-center text-sm text-neutral">
          {unavailableIds.length === 1
            ? "1 saved car is no longer listed."
            : `${unavailableIds.length} saved cars are no longer listed.`}{" "}
          <button
            type="button"
            onClick={() => unavailableIds.forEach((id) => unsave(id))}
            className="text-accent hover:underline cursor-pointer"
          >
            Remove {unavailableIds.length === 1 ? "it" : "them"}
          </button>
        </p>
      )}
    </div>
  );
};

export default Wishlist;
