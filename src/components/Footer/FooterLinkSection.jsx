import React from "react";
import { Link } from "react-router-dom";

const FooterLinkSection = ({ title, links }) => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">{title}</h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.id}>
            <Link
              to={link.to}
              className="text-white hover:text-primary-light transition-colors font-semibold text-lg"
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
