import React from "react";

const HeroHeading = ({ title, highlight, subtitle }) => {
  return (
    <div className="header-text space-y-5">
      <h1 className="font-bold text-5xl text-center">
        {title} <span className="text-blue-400">{highlight}</span> Awaits
      </h1>
      <p className="text-center text-white font-semibold text-lg">{subtitle}</p>
    </div>
  );
};

export default HeroHeading;
