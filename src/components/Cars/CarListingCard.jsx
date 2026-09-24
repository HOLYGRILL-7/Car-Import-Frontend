import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";
import SaveButton from "./SaveButton";

const hasValue = (value) =>
  value !== undefined && value !== null && String(value).trim() !== "";

// One listing tile for the car grids. Top to bottom: photo (with the save
// heart overlaid top-right), bold name, a compact spec line
// (transmission • fuel type • year — anything missing is skipped), then price.
// `car.id` is the Firestore document ID, which is what /carDetails/:id looks up.
const CarListingCard = ({ car }) => {
  const photo = car.imageUrls?.[0];
  const specLine = [car.transmission, car.fuelType, car.year]
    .filter(hasValue)
    .join(" • ");

  return (
    <Link to={`/carDetails/${car.id}`} className="block h-full cursor-pointer">
      <div className="h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg">
        <div className="relative h-48 p-4 shrink-0">
          <SaveButton carId={car.id} />
          {photo ? (
            <img
              src={photo}
              alt={car.name}
              loading="lazy"
              width={400}
              height={192}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-full rounded-lg bg-neutral-light flex items-center justify-center text-sm text-neutral">
              No photo available
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col px-4 pb-4">
          <h3 className="text-base font-bold leading-snug text-primary line-clamp-2">
            {car.name}
          </h3>
          <p className="mt-1 text-sm text-neutral">{specLine}</p>
          <p className="mt-auto pt-3 text-xl font-bold text-accent-text">
            {formatPrice(car.price)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CarListingCard;
