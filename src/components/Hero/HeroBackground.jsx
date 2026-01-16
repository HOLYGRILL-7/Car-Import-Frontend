import React from "react";

const HeroBackground = ({ image, alt }) => {
  return (
    <div className="absolute inset-0">
      <img src={image} alt={alt} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-linear-to-b from-black via-black/80 to-transparent"></div>
    </div>
  );
};

export default HeroBackground;
