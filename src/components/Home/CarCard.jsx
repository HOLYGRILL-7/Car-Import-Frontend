// components/home/CarCard.js
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const CarCard = ({ car }) => {
  return (
    <Link to={`/carDetails/${car.id}`} className="block group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
        {/* Image */}
        <div className="relative overflow-hidden h-64 p-4">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover rounded-lg transition-transform duration-500"
          />
          <div className="absolute top-6 right-6 bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
            NEW
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
            {car.name}
          </h3>

          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-accent">{car.price}</span>
            <span className="text-neutral text-sm">{car.year}</span>
          </div>

          <div className="flex items-center justify-between text-sm text-neutral pt-4 border-t border-neutral-light">
            <span className="text-accent font-semibold group-hover:gap-2 flex items-center transition-all">
              View Details
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
