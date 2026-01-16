// components/home/CarTypeCard.js
import React from "react";
import { Link } from "react-router-dom";

const CarTypeCard = ({ image, name, link }) => {
  return (
    <Link
      to={link}
      className="w-full h-30 cursor-pointer bg-neutral-light hover:bg-neutral-cream shadow-lg rounded-2xl flex flex-col items-center justify-center transition-all hover:shadow-xl transform hover:-translate-y-1 py-6"
    >
      <img src={image} alt={name} className="mb-2" style={{ width: "175px" }} />
      <span className="font-semibold text-primary">{name}</span>
    </Link>
  );
};

export default CarTypeCard;
