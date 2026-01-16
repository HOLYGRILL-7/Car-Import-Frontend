import React from "react";
import { usedCars } from "../../data/carsData";
import { Link } from "react-router-dom";

const UsedCars = () => {
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

      {/* Cars List */}
      <ul>
        {usedCars.map((car) => (
          <li key={car.id} className="my-5">
            <div className="car-Card w-full grid grid-cols-2 h-96 bg-neutral-cream shadow-2xl rounded-2xl overflow-hidden">
              <div className="image-section p-6">
                <img
                  src={car.image}
                  alt={car.name}
                  className="max-w-sm w-full h-[350px] object-cover rounded-lg"
                />
              </div>
              <div className="text-btn-alignment flex flex-col justify-between py-8 pr-8">
                <div className="text-section space-y-4">
                  <h1 className="text-3xl font-bold text-primary">
                    {car.name}
                  </h1>
                  <p className="text-neutral text-base leading-relaxed">
                    {car.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-neutral">
                    <span className="font-semibold">Year: {car.year}</span>
                    <span>•</span>
                    <span className="font-semibold">{car.mileage}</span>
                  </div>
                  <p className="text-4xl font-bold text-accent">{car.price}</p>
                </div>

                {/* Button */}
                <Link to="/carDetails" className="w-full">
                  <button
                    type="button"
                    className="bg-primary-light hover:bg-primary text-white font-semibold max-w-sm cursor-pointer w-full h-14 rounded-2xl transition-colors"
                  >
                    Order {car.name}
                  </button>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsedCars;
