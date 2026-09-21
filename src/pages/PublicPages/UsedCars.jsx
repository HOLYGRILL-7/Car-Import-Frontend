import CarFilterSidebar from "../../components/Cars/CarFilterSidebar";
import CarGrid from "../../components/Cars/CarGrid";
import CarGridSkeleton from "../../components/Skeleton/CarGridSkeleton";

const UsedCars = () => {
  return (
    <div className="main-container pt-24 pb-16 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-primary mb-6">Used Cars</h1>

      <CarFilterSidebar type="used">
        {({
          cars,
          loading,
          error,
          errorMessage,
          hasMore,
          loadingMore,
          loadMoreError,
          loadMore,
          hasActiveFilters,
        }) => (
          <>
            {loading && <CarGridSkeleton />}
            {error && (
              <p className="my-10 text-center text-neutral">{errorMessage}</p>
            )}
            {!loading && !error && cars.length === 0 && !hasActiveFilters && (
              <p className="my-10 text-center text-neutral">
                No used cars available at the moment.
              </p>
            )}
            {cars.length > 0 && <CarGrid cars={cars} />}

            {loadMoreError && (
              <p className="my-4 text-center text-neutral">
                Couldn't load more cars. Please try again.
              </p>
            )}
            {hasMore && (
              <div className="my-10 flex justify-center">
                <button
                  type="button"
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="bg-primary-light hover:bg-primary text-white font-semibold h-14 px-10 rounded-2xl cursor-pointer transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loadingMore ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </CarFilterSidebar>
    </div>
  );
};

export default UsedCars;
