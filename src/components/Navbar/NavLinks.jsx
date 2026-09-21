import React from "react";
import { NavLink } from "react-router-dom";

// `stacked` lays the links out as a vertical list (the mobile menu).
const NavLinks = ({ stacked = false }) => {
  const navLinks = [
    { name: "Home ", to: "/" },
    { name: "New Cars ", to: "/newCars" },
    { name: "Used Cars ", to: "/usedCars" },
    { name: "Services ", to: "/services" },
    { name: "About ", to: "/about" },
    { name: "Reviews ", to: "/reviews" },
  ];

  return (
    <div className={stacked ? "flex flex-col" : "flex flex-row gap-6"}>
      {navLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === "/"}
          className={({ isActive }) =>
            `${
              isActive ? "text-primary-light" : "text-white"
            } hover:text-primary-light transition-colors font-semibold text-lg ${
              stacked ? "py-3" : ""
            }`
          }
        >
          {link.name}
        </NavLink>
      ))}
    </div>
  );
};

export default NavLinks;
