import React from "react";
import CarCardSkeleton from "./CarCardSkeleton";

// Placeholder grid while a page of cars loads. The default columns match
// CarGrid (Used / New Cars); other pages pass their own `className`.
const CarGridSkeleton = ({
  count = 8,
  className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-6",
}) => (
  <div role="status" aria-busy="true" data-skeleton="grid" className={className}>
    <span className="sr-only">Loading cars...</span>
    {Array.from({ length: count }, (_, i) => (
      <CarCardSkeleton key={i} />
    ))}
  </div>
);

export default CarGridSkeleton;
