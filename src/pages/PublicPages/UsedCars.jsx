import React from "react";
import { useCars } from "../../hooks/useCars";
import CarListingCard from "../../components/Cars/CarListingCard";

const UsedCars = () => {
  const { cars, loading, error, hasMore, loadingMore, loadMoreError, loadMore } =
    useCars("used");

  return (
    <div className="main-container bg-neutral-light pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="hero-section w-full space-y-7 p-20 bg-linear-to-b from bg-neutral-dark via-neutral to-bg-neutral-light h-[390px] shadow-2xl rounded-2xl flex flex-col justify-center items-center">
        <h1 className="font-bold text-8xl text-neutral-cream">
          USED CAR DEALS
        </h1>
        <p className="text-2xl font-bold">
          Approved by our experts, zero-faults.
        </p>
      </div>

      {/* Cars Grid */}
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
          No used cars available at the moment.
        </p>
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
  );
};

export default UsedCars;
