// components/home/SectionHeader.js
import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// "View All" link colours. "orange" is the default; New Arrivals uses "blue".
const LINK_TONES = {
  orange: "text-accent hover:text-accent-light",
  blue: "text-blue-600 hover:text-blue-500",
};

const SectionHeader = ({
  icon,
  title,
  description,
  linkTo,
  linkText,
  tone = "orange",
}) => {
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
          className={`${LINK_TONES[tone]} font-semibold flex items-center gap-2`}
        >
          {linkText}
          <ChevronRight className="w-5 h-5" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
