// components/home/BrandList.js
import React from "react";
import { Link } from "react-router-dom";

// Each brand carries a `to` link (a listing page with ?make=...).
const BrandList = ({ brands }) => {
  return (
    <ul className="flex flex-row justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {brands.map((brand) => (
        <li key={brand.id}>
          <Link to={brand.to} className="group block cursor-pointer">
            <div className="flex flex-row items-center justify-center space-x-5 opacity-60 hover:opacity-100 transition-opacity">
              <img src={brand.logo} alt="" width={35} />
              <h4 className="text-primary text-xl font-bold group-hover:text-accent transition-colors">
                {brand.name}
              </h4>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default BrandList;
