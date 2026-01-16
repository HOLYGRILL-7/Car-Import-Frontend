import React from "react";
import logoWhite from "../../assets/Logo/logoWhite.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div>
      <Link to="/" className="transition-transform hover:scale-105">
        <img src={logoWhite} alt="CarWise" width={130} />
      </Link>
    </div>
  );
};

export default Logo;
