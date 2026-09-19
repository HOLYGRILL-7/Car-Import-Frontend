import React from "react";
import { useCars } from "../../hooks/useCars";
import CarListingCard from "../../components/Cars/CarListingCard";
import redCar_front from "../../assets/Images/redCar-frontside.png";

const NewCars = () => {
  const { cars, loading, error, hasMore, loadingMore, loadMoreError, loadMore } =
    useCars("new");

  return (
    <div>
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="hero-section w-full p-20 bg-linear-to-b from bg-neutral-dark via-neutral to-bg-neutral-light h-[390px] shadow-2xl rounded-2xl px-14 grid grid-cols-2 ">
          <h1 className="font-bold text-8xl col-span-2 text-neutral-cream">
            ONLY THE BEST <br /> NEW CAR DEALS
          </h1>
        </div>
        <div className=" front redCar absolute right-8 top-0 z-10">
          <img src={redCar_front} alt="" width={450} />
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
    </div>
  );
};

export default NewCars;
