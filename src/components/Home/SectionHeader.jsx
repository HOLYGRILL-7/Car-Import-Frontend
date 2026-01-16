// components/home/SectionHeader.js
import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const SectionHeader = ({ icon, title, description, linkTo, linkText }) => {
  return (
    <div className="flex items-center justify-between mb-10">
      <div className="flex items-center gap-3">
        {icon && (
          <span className="text-3xl">
            <img src={icon} alt="" />
          </span>
        )}
        <div className="space-y-1">
          <h2 className="text-4xl font-bold text-primary">{title}</h2>
          {description && <p className="text-neutral text-lg">{description}</p>}
        </div>
      </div>
      {linkTo && linkText && (
        <Link
          to={linkTo}
          className="text-accent hover:text-accent-light font-semibold flex items-center gap-2 transition-colors"
        >
          {linkText}
          <ChevronRight className="w-5 h-5" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
