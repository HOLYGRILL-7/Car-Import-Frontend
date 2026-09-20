import React from "react";
import HeroHeading from "./HeroHeading";
import plane from "../../assets/sale-plane.png";

const Hero = () => {
  return (
    <div className="relative h-[500px] overflow-hidden mb-10 bg-black">
      {/* Ambient plane: decorative, CSS-only (see .hero-plane in index.css) */}
      <div aria-hidden="true" className="hero-plane">
        <img src={plane} alt="" />
      </div>

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
