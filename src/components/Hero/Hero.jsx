import React from "react";
import HeroBackground from "./HeroBackground";
import HeroHeading from "./HeroHeading";
import SearchCard from "./SearchCard";
import hero_Image1 from "../../assets/Images/heroImage1.jpg";
import search_Icon from "../../assets/Icons/search.png";

const Hero = () => {
  const handleSearch = (searchValue, activeTab) => {
    console.log("Searching:", searchValue, "in tab:", activeTab);
    // Handle search logic here
  };

  return (
    <div className="relative h-[500px] overflow-hidden mb-10">
      <HeroBackground image={hero_Image1} alt="Luxury Cars" />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col mt-10 items-center justify-center h-full gap-6 text-white px-4">
        <HeroHeading
          title="Your"
          highlight="Dream Car"
          subtitle="Find Certified New & Used Cars"
        />
        <SearchCard searchIcon={search_Icon} onSearch={handleSearch} />
      </div>
    </div>
  );
};

export default Hero;
