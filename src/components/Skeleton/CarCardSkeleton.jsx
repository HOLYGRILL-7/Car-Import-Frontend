import React from "react";
import Skeleton from "./Skeleton";

// Placeholder for a car card while its data loads. Built from the same
// padding and line heights as the real card so nothing jumps when the real
// one replaces it.
//   variant "listing": CarListingCard (Used / New Cars grids, Saved Cars)
//   variant "slider":  CarCard (Home page sliders)
const CarCardSkeleton = ({ variant = "listing" }) => {
  if (variant === "slider") {
    return (
      <div
        data-skeleton="card"
        className="bg-white rounded-2xl overflow-hidden shadow-lg"
      >
        <div className="h-64 p-4">
          <Skeleton className="h-full w-full rounded-lg" />
        </div>
        <div className="p-6">
          <div className="mb-2 flex h-7 items-center">
            <Skeleton className="h-5 w-3/4" />
          </div>
          <div className="mb-4 flex h-8 items-center justify-between">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="flex h-9 items-end border-t border-neutral-light pt-4">
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      data-skeleton="card"
      className="h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg"
    >
      <div className="h-48 p-4 shrink-0">
        <Skeleton className="h-full w-full rounded-lg" />
      </div>
      <div className="flex flex-1 flex-col px-4 pb-4">
        <div className="flex h-[22px] items-center">
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="mt-1 flex h-5 items-center">
          <Skeleton className="h-3.5 w-1/2" />
        </div>
        <div className="mt-auto pt-3">
          <div className="flex h-7 items-center">
            <Skeleton className="h-5 w-1/3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCardSkeleton;
