import React from "react";
import { Link } from "react-router-dom";

const PopularUsedCarList = ({ cars }) => {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {cars.map((car) => (
        <li key={car.id}>
          <Link to={`/car/${car.id}`} className="block w-full group">
            <button className="opacity-60 hover:opacity-100 hover:underline font-bold text-xl transition-all text-left w-full cursor-pointer">
              <h4 className="text-primary text-xl font-bold group-hover:text-accent">
                {car.name}
              </h4>
            </button>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PopularUsedCarList;
