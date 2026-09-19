// pages/Home.js
import React from "react";
import Hero from "../../../components/Hero/Hero";
import SectionHeader from "../../../components/Home/SectionHeader";
import CarSlider from "../../../components/Home/CarSlider";
import CarTypeCard from "../../../components/Home/CarTypeCard";
import BrandList from "../../../components/Home/BrandList";
import PopularUsedCarList from "../../../components/Home/PopularUsedCarList";
import { useCars } from "../../../hooks/useCars";
import { formatPrice } from "../../../utils/formatPrice";

// Import data
import { carTypes, carBrands, icons } from "../../../data/carsData";

const NEW_ARRIVALS_COUNT = 8;

// CarCard expects { id, name, image, price, year } with a display-ready price.
const toCardCar = (car) => ({
  id: car.id,
  name: car.name,
  image: car.imageUrls?.[0],
  price: formatPrice(car.price),
  year: car.year,
});

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

  const newArrivalsMessage = getStatusMessage(
    newCarsResult,
    "No new arrivals at the moment.",
  );
  const usedCarsMessage = getStatusMessage(
    usedCarsResult,
    "No used cars available at the moment.",
  );

  return (
    <div>
      <Hero />

      {/* New Arrivals Section */}
      <div className="py-14 mt-15 bg-neutral-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            icon={icons.fireFlame}
            title="New Arrivals"
            description="Say hello to the hottest deals on the market"
            linkTo="/newCars"
            linkText="View All"
          />
          {newArrivalsMessage ? (
            <p className="my-10 text-center text-neutral">
              {newArrivalsMessage}
            </p>
          ) : (
            <CarSlider
              cars={newCarsResult.cars
                .slice(0, NEW_ARRIVALS_COUNT)
                .map(toCardCar)}
            />
          )}
        </div>
      </div>

      {/* Explore Cars */}
      <div className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Explore Cars"
            description="Browse by Car type"
          />
          <div className="flex gap-6">
            {carTypes.map((type) => (
              <CarTypeCard
                key={type.id}
                image={type.image}
                name={type.name}
                link={type.link}
              />
            ))}
          </div>
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
          <BrandList brands={carBrands} />
        </div>
      </div>

      {/* Popular Used Cars */}
      <div className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Popular Used Car Models"
            description="Find the best deals on pre-owned vehicles"
          />
        </div>
        <div className="py-10">
          {usedCarsMessage ? (
            <p className="text-center text-neutral">{usedCarsMessage}</p>
          ) : (
            <PopularUsedCarList cars={usedCarsResult.cars} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
