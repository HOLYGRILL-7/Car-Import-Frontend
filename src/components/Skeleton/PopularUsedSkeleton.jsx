import React from "react";
import Skeleton from "./Skeleton";

// Placeholder for PopularUsedCarList: same grid, one name-sized line per item
// (the real items are text-xl names, 28px tall).
const PopularUsedSkeleton = ({ count = 8 }) => (
  <div
    role="status"
    aria-busy="true"
    data-skeleton="list"
    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
  >
    <span className="sr-only">Loading cars...</span>
    {Array.from({ length: count }, (_, i) => (
      <div key={i} data-skeleton="list-item" className="flex h-7 items-center">
        <Skeleton className="h-5 w-3/4" />
      </div>
    ))}
  </div>
);

export default PopularUsedSkeleton;
