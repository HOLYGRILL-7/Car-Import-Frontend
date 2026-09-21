import Hero from "../../../components/Hero/Hero";
import SectionHeader from "../../../components/Home/SectionHeader";
import CarSlider from "../../../components/Home/CarSlider";
import BrandList from "../../../components/Home/BrandList";
import CarGrid from "../../../components/Cars/CarGrid";
import CarGridSkeleton from "../../../components/Skeleton/CarGridSkeleton";
import { useCars } from "../../../hooks/useCars";
import { useDealerChoiceCars } from "../../../hooks/useDealerChoiceCars";
import { useVisibleCards } from "../../../hooks/useVisibleCards";
import { pickNewArrivals } from "../../../utils/newArrivals";
import { matchesMake } from "../../../utils/makes";

// Import data
import { carBrands } from "../../../data/carsData";

const NEW_ARRIVALS_COUNT = 8;
const POPULAR_USED_COUNT = 8;

// Placeholder for a CarSlider: as many listing-card skeletons as the slider
// shows at this screen size (same widths and gap), plus the space of the dot
// indicator below.
const SLIDER_COLUMNS = {
  1: "grid grid-cols-1 gap-6",
  2: "grid grid-cols-2 gap-6",
  3: "grid grid-cols-3 gap-6",
};

const SliderSkeleton = () => {
  const visible = useVisibleCards();
  return (
    <div>
      <CarGridSkeleton count={visible} className={SLIDER_COLUMNS[visible]} />
      <div className="mt-8 h-2" />
    </div>
  );
};

// Message to show in place of a section's content, or null when it has cars.
const getStatusMessage = ({ loading, error, cars }, emptyText) => {
  if (loading) return "Loading cars...";
  if (error) return "Couldn't load cars right now. Please try again later.";
  if (cars.length === 0) return emptyText;
  return null;
};

const Home = () => {
  const newCarsResult = useCars("new");
  const usedCarsResult = useCars("used");
  const dealerChoiceResult = useDealerChoiceCars();

  // New Arrivals draws on both lists (newest 20 of each type, which always
  // contain the newest 8 overall): cars added in the last 14 days, else the
  // most recent overall.
  const newArrivalsResult = {
    loading: newCarsResult.loading || usedCarsResult.loading,
    error: newCarsResult.error && usedCarsResult.error,
    cars: pickNewArrivals([...newCarsResult.cars, ...usedCarsResult.cars], {
      max: NEW_ARRIVALS_COUNT,
    }),
  };

  // "View All" opens whichever listing page holds most of the arrivals shown
  // (New Arrivals mixes both types), so it never lands on an empty page.
  const newArrivalCount = newArrivalsResult.cars.filter(
    (car) => car.type === "new",
  ).length;
  const usedArrivalCount = newArrivalsResult.cars.length - newArrivalCount;
  const viewAllPath =
    usedArrivalCount > newArrivalCount ? "/usedCars" : "/newCars";

  // A manufacturer opens the listing page that has cars of that make: the
  // used page, unless it only has new ones.
  const brands = carBrands.map((brand) => {
    const make = brand.name.toLowerCase();
    const inNew = newCarsResult.cars.some((car) => matchesMake(car, make));
    const inUsed = usedCarsResult.cars.some((car) => matchesMake(car, make));
    const page = inNew && !inUsed ? "/newCars" : "/usedCars";
    return { ...brand, to: `${page}?make=${make}` };
  });

  const newArrivalsMessage = getStatusMessage(
    newArrivalsResult,
    "No new arrivals at the moment.",
  );
  const usedCarsMessage = getStatusMessage(
    usedCarsResult,
    "No used cars available at the moment.",
  );

  return (
    <div>
      <Hero />

      {/* Dealer's Choice: only cars the admin has flagged; hidden when none */}
      {dealerChoiceResult.cars.length > 0 && (
        <div className="py-14 mt-15 bg-neutral-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="Dealer's Choice"
              description="Hand-picked by our dealers"
            />
            <CarSlider cars={dealerChoiceResult.cars} />
          </div>
        </div>
      )}

      {/* New Arrivals Section */}
      <div
        id="new-arrivals"
        className={`scroll-mt-20 py-14 ${
          dealerChoiceResult.cars.length > 0
            ? "bg-white"
            : "mt-15 bg-neutral-light"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="New Arrivals"
            description="Freshly listed vehicles, updated as new stock arrives."
            linkTo={viewAllPath}
            linkText="View All"
            tone="blue"
          />
          {newArrivalsResult.loading ? (
            <SliderSkeleton />
          ) : newArrivalsMessage ? (
            <p className="my-10 text-center text-neutral">
              {newArrivalsMessage}
            </p>
          ) : (
            <div className="fade-in">
              <CarSlider cars={newArrivalsResult.cars} tone="blue" />
            </div>
          )}
        </div>
      </div>

      {/* Browse by Manufacturer */}
      <div className="py-14 bg-neutral-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Browse by car manufacturer"
            description="Explore vehicles from top brands"
          />
        </div>
        <div className="py-10">
          <BrandList brands={brands} />
        </div>
      </div>

      {/* Popular Used Cars */}
      <div className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Popular Used Car Models"
            description="Find the best deals on pre-owned vehicles"
            linkTo="/usedCars"
            linkText="View All"
          />
        </div>
        <div className="py-10">
          {usedCarsResult.loading ? (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <CarGridSkeleton count={POPULAR_USED_COUNT} />
            </div>
          ) : usedCarsMessage ? (
            <p className="text-center text-neutral">{usedCarsMessage}</p>
          ) : (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <CarGrid
                cars={usedCarsResult.cars.slice(0, POPULAR_USED_COUNT)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
