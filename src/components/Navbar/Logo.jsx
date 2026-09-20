import React from "react";
import BrandWordmark from "../Brand/BrandWordmark";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div>
      <Link to="/" className="block">
        <BrandWordmark />
      </Link>
    </div>
  );
};

export default Logo;
