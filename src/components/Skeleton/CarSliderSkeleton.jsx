import React from "react";
import CarCardSkeleton from "./CarCardSkeleton";
import Skeleton from "./Skeleton";

// Placeholder for a Home page CarSlider: the same three-card row (same widths
// and gaps) and the same space for the dot indicator below it.
const CarSliderSkeleton = () => (
  <div role="status" aria-busy="true" data-skeleton="slider" className="relative">
    <span className="sr-only">Loading cars...</span>
    <div className="overflow-hidden">
      <div className="flex gap-6">
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ flex: "0 0 calc((100% - 3rem) / 3)" }}>
            <CarCardSkeleton variant="slider" />
          </div>
        ))}
      </div>
    </div>
    <div className="mt-8 flex justify-center gap-2">
      <Skeleton className="h-2 w-8 rounded-full" />
      <Skeleton className="h-2 w-2 rounded-full" />
      <Skeleton className="h-2 w-2 rounded-full" />
    </div>
  </div>
);

export default CarSliderSkeleton;
