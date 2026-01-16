import React from "react";
import { Link } from "react-router-dom";

const FooterLogo = ({ logo, description }) => {
  return (
    <div>
      <div className="logo">
        <Link to="/" className="transition-transform hover:scale-105">
          <img src={logo} alt="CarWise" width={130} />
        </Link>
      </div>
      <p className="text-gray-400 text-sm mt-2">{description}</p>
    </div>
  );
};

export default FooterLogo;
