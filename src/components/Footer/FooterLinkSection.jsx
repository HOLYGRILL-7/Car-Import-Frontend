import React from "react";
import { Link } from "react-router-dom";

const FooterLinkSection = ({ title, links }) => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">{title}</h4>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-1">
        {links.map((link) => (
          <li key={link.id}>
            <Link
              to={link.to}
              className="text-gray-300 hover:text-primary-light transition-colors font-medium"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinkSection;
