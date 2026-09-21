import Skeleton from "./Skeleton";

// Placeholder for a car card while its data loads. Built from the same
// padding and line heights as CarListingCard (Used / New Cars grids, Home
// sliders, Saved Cars) so nothing jumps when the real card replaces it.
const CarCardSkeleton = () => {
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
