import React from "react";

// Thin strip above the navbar. Its height (h-8) is mirrored by the top
// padding on <main> in Layout, so keep the two in sync.
const PromoBanner = () => {
  return (
    <div className="h-8 bg-black text-white text-sm font-medium flex items-center justify-center px-4">
      We give the best deals
    </div>
  );
};

export default PromoBanner;
