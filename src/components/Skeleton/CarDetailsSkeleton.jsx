import Skeleton from "./Skeleton";

// Placeholder for the car details page: same page frame, gallery, info panel
// and description card as the real page, so the real one lands in place.
const CarDetailsSkeleton = () => (
  <div
    role="status"
    aria-busy="true"
    data-skeleton="details"
    className="min-h-screen bg-gray-50 pt-20"
  >
    <span className="sr-only">Loading car details...</span>

    {/* Back link */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex h-6 items-center">
        <Skeleton className="h-4 w-32" />
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gallery: main image + thumbnail row */}
        <div>
          <div
            data-skeleton="gallery"
            className="mb-4 h-96 overflow-hidden rounded-2xl shadow-lg"
          >
            <Skeleton className="h-full w-full rounded-none" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Info panel: title, price, specs, buttons */}
        <div>
          <div
            data-skeleton="panel"
            className="rounded-2xl bg-white p-8 shadow-lg"
          >
            <div className="mb-6 flex h-10 items-center">
              <Skeleton className="h-8 w-3/4" />
            </div>
            <div className="mb-8 flex h-12 items-center">
              <Skeleton className="h-9 w-1/2" />
            </div>
            <div className="mb-8 grid grid-cols-2 gap-4">
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl bg-gray-50 p-4"
                >
                  <Skeleton className="h-9 w-9 shrink-0 rounded-lg" />
                  <div className="flex h-11 flex-1 flex-col justify-between py-0.5">
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <Skeleton className="h-14 w-full rounded-xl" />
              <Skeleton className="h-14 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div
        data-skeleton="description"
        className="mt-8 rounded-2xl bg-white p-8 shadow-lg"
      >
        <div className="mb-4 flex h-8 items-center">
          <Skeleton className="h-6 w-40" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </div>
  </div>
);

export default CarDetailsSkeleton;
