import React from "react";
import { Link } from "react-router-dom";
import BrandWordmark from "../Brand/BrandWordmark";

const FooterLogo = () => {
  return (
    <div className="logo">
      <Link to="/" className="inline-block">
        <BrandWordmark />
      </Link>
    </div>
  );
};

export default FooterLogo;
