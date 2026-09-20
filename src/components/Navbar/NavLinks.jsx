import React from "react";
import { NavLink } from "react-router-dom";

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
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === "/"}
          className={({ isActive }) =>
            `${
              isActive ? "text-primary-light" : "text-white"
            } hover:text-primary-light transition-colors font-semibold text-lg`
          }
        >
          {link.name}
        </NavLink>
      ))}
    </div>
  );
};

export default NavLinks;
