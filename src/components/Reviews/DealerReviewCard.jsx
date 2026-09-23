import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { toUrlList } from "../../firebase/carsAdmin";
import { formatPrice } from "../../utils/formatPrice";

// One Dealer's Choice car with the dealer's own written take on it.
const DealerReviewCard = ({ car }) => {
  const photo = toUrlList(car.imageUrls)[0];
  const details = [car.year, formatPrice(car.price)]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="grid overflow-hidden rounded-2xl bg-white shadow-lg md:grid-cols-5">
      <Link
        to={`/carDetails/${car.id}`}
        className="block h-56 bg-neutral-light md:col-span-2 md:h-full md:min-h-64"
        aria-label={`View ${car.name}`}
      >
        {photo ? (
          <img
            src={photo}
            alt={car.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-sm text-neutral">
            No photo available
          </span>
        )}
      </Link>

      <div className="flex flex-col gap-3 p-6 sm:p-8 md:col-span-3">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent-text">
          <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
          Dealer's Choice
        </span>
        <div>
          <h3 className="text-2xl font-bold text-primary wrap-break-word">
            <Link to={`/carDetails/${car.id}`}>{car.name}</Link>
          </h3>
          {details && <p className="text-neutral">{details}</p>}
        </div>
        <p className="flex-1 whitespace-pre-line leading-relaxed text-neutral-dark wrap-break-word">
          {car.dealerReviewText.trim()}
        </p>
        <Link
          to={`/carDetails/${car.id}`}
          className="inline-flex w-fit items-center gap-2 font-semibold text-accent-text hover:underline"
        >
          View this car
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
};

export default DealerReviewCard;
