import React from "react";
import HeroBackground from "./HeroBackground";
import HeroHeading from "./HeroHeading";
import hero_Image1 from "../../assets/Images/heroImage1.jpg";

const Hero = () => {
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
      </div>
    </div>
  );
};

export default Hero;
