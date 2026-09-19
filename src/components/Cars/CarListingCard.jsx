import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Gauge } from "lucide-react";
import { formatPrice } from "../../utils/formatPrice";
import SaveButton from "./SaveButton";

// One listing tile for the used/new car grids. `car.id` is the Firestore
// document ID, which is what /carDetails/:id looks up.
const CarListingCard = ({ car }) => {
  const photo = car.imageUrls?.[0];

  return (
    <Link to={`/carDetails/${car.id}`} className="block group h-full">
      <div className="h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
        <div className="relative h-56 p-4">
          <SaveButton carId={car.id} />
          {photo ? (
            <img
              src={photo}
              alt={car.name}
              loading="lazy"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-full rounded-lg bg-neutral-light flex items-center justify-center text-sm text-neutral">
              No photo available
            </div>
          )}
        </div>

        <div className="p-6 pt-2">
          <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
            {car.name}
          </h3>
          <p className="text-2xl font-bold text-accent mb-4">
            {formatPrice(car.price)}
          </p>

          <div className="flex items-center justify-between text-sm text-neutral pt-4 border-t border-neutral-light">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {car.year}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Gauge className="w-4 h-4" />
              {car.mileage}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CarListingCard;
