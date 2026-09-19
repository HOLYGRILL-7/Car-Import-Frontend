import React from "react";

// The site's name as a text wordmark. (The old logo images had "CarWise"
// drawn into them; swap this for a new logo image whenever one exists.)
const BrandWordmark = ({ className = "text-2xl" }) => {
  return (
    <span
      className={`font-extrabold tracking-tight text-white whitespace-nowrap ${className}`}
    >
      Xtra <span className="text-secondary-light">Motors</span>
    </span>
  );
};

export default BrandWordmark;
