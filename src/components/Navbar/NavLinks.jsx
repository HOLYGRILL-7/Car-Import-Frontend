import React from "react";
import { Link } from "react-router-dom";

const NavLinks = () => {
  const navLinks = [
    { name: "Home ", to: "/" },
    { name: "New Cars ", to: "/newCars" },
    { name: "Used Cars ", to: "/usedCars" },
    { name: "Reviews ", to: "/reviews" },
    { name: "Services ", to: "/services" },
    { name: "About ", to: "/about" },
  ];

  return (
    <div className="flex flex-row gap-6">
      {navLinks.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className="text-white hover:text-primary-light transition-colors font-semibold text-lg"
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
