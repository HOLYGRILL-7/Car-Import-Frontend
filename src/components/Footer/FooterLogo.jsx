import React from "react";
import { Link } from "react-router-dom";
import BrandWordmark from "../Brand/BrandWordmark";

const FooterLogo = ({ description }) => {
  return (
    <div>
      <div className="logo">
        <Link to="/" className="transition-transform hover:scale-105 inline-block">
          <BrandWordmark />
        </Link>
      </div>
      <p className="text-gray-400 text-sm mt-2">{description}</p>
    </div>
  );
};

export default FooterLogo;
