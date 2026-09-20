// components/home/CarCard.js
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

// Accent colours. "orange" is the default; New Arrivals uses "blue".
const TONES = {
  orange: {
    newBadge: "bg-accent",
    usedBadge: "bg-accent",
    price: "text-accent",
    link: "text-accent",
  },
  blue: {
    newBadge: "bg-blue-800",
    usedBadge: "bg-blue-600",
    price: "text-blue-800",
    link: "text-blue-600",
  },
};

// No hover/transition effects on purpose (the slider keeps only its simple
// slide and the dot indicator's animation).
const CarCard = ({ car, tone = "orange" }) => {
  const colors = TONES[tone];
  return (
    <Link to={`/carDetails/${car.id}`} className="block cursor-pointer">
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
        {/* Image */}
        <div className="relative overflow-hidden h-52 p-3">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover rounded-lg"
          />
          <div
            className={`absolute top-5 right-5 ${
              car.type === "new" ? colors.newBadge : colors.usedBadge
            } text-white px-3 py-1 rounded-full text-sm font-semibold`}
          >
            {car.type === "new" ? "NEW" : "USED"}
          </div>
        </div>

        {/* Card Content */}
        <div className="px-4 pt-1 pb-3">
          <h3 className="text-lg font-bold text-primary mb-1">
            {car.name}
          </h3>

          <div className="flex items-center justify-between mb-2">
            <span className={`text-xl font-bold ${colors.price}`}>{car.price}</span>
            <span className="text-neutral text-sm">{car.year}</span>
          </div>

          <div className="flex items-center justify-between text-sm text-neutral pt-2 border-t border-neutral-light">
            <span className={`${colors.link} font-semibold flex items-center`}>
              View Details
              <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
