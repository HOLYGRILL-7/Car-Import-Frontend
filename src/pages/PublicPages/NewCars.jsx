import React, { useState } from "react";
import { useCars } from "../../hooks/useCars";
import CarListingCard from "../../components/Cars/CarListingCard";
import CarTypeFilter from "../../components/Cars/CarTypeFilter";
import { BODY_TYPES, matchesBodyType } from "../../utils/bodyTypes";

const NewCars = () => {
  const { cars, loading, error, hasMore, loadingMore, loadMoreError, loadMore } =
    useCars("new");
  const [bodyType, setBodyType] = useState("all");

  const visibleCars = cars.filter((car) => matchesBodyType(car, bodyType));
  const bodyTypeLabel = BODY_TYPES.find((t) => t.id === bodyType)?.label;

  return (
    <div>
      <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary">New Cars</h1>
        <div className="mt-4">
          <CarTypeFilter value={bodyType} onChange={setBodyType} />
        </div>

        {loading && (
          <p className="my-10 text-center text-neutral">Loading cars...</p>
        )}
        {error && (
          <p className="my-10 text-center text-neutral">
            Couldn't load cars right now. Please try again later.
          </p>
        )}
        {!loading && !error && cars.length === 0 && (
          <p className="my-10 text-center text-neutral">
            No new cars available at the moment.
          </p>
        )}
        {cars.length > 0 && visibleCars.length === 0 && (
          <p className="my-10 text-center text-neutral">
            No {bodyTypeLabel} found
            {hasMore ? " so far — try Load More or another type." : "."}
          </p>
        )}

        {visibleCars.length > 0 && (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10">
            {visibleCars.map((car) => (
              <li key={car.id}>
                <CarListingCard car={car} />
              </li>
            ))}
          </ul>
        )}

        {loadMoreError && (
          <p className="my-4 text-center text-neutral">
            Couldn't load more cars. Please try again.
          </p>
        )}
        {hasMore && (
          <div className="my-10 flex justify-center">
            <button
              type="button"
              onClick={loadMore}
              disabled={loadingMore}
              className="bg-primary-light hover:bg-primary text-white font-semibold h-14 px-10 rounded-2xl cursor-pointer transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loadingMore ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewCars;
