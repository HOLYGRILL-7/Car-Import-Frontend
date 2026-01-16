import React from "react";
import { newCars } from "../../data/carsData";
import { Link } from "react-router-dom";
import redCar_front from "../../assets/Images/redCar-frontside.png";

const NewCars = () => {
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

        <ul>
          {newCars.map((car) => (
            <li key={car.id}>
              <Link to="/carDetails">
                <div className="car-Card w-full grid grid-cols-2 h-96 my-5 bg-neutral-cream shadow-2xl rounded-2xl overflow-hidden">
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
                      <p className="text-4xl font-bold text-accent">
                        {car.price}
                      </p>
                    </div>

                    <div className="button-sec flex justify-center items-center">
                      <button
                        type="button"
                        className="bg-primary-light hover:bg-primary text-white font-semibold max-w-sm w-full mx-auto h-14 rounded-2xl transition-colors"
                      >
                        Order {car.name}
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewCars;
