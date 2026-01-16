// pages/Home.js
import React from "react";
import Hero from "../../../components/Hero/Hero";
import SectionHeader from "../../../components/Home/SectionHeader";
import CarSlider from "../../../components/Home/CarSlider";
import CarTypeCard from "../../../components/Home/CarTypeCard";
import BrandList from "../../../components/Home/BrandList";
import PopularUsedCarList from "../../../components/Home/PopularUsedCarList";

// Import data
import {
  newArrivals,
  carTypes,
  carBrands,
  popularUsedBrands,
  icons,
} from "../../../data/carsData";

const Home = () => {
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
          <CarSlider cars={newArrivals} />
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
          <PopularUsedCarList cars={popularUsedBrands} />
        </div>
      </div>
    </div>
  );
};

export default Home;
