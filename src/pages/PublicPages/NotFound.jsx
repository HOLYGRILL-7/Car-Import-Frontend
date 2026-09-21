import { Link } from "react-router-dom";

// Shown for any URL that doesn't match a route (inside the normal site layout).
const NotFound = () => {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center gap-4 px-4 pt-24 pb-16 text-center">
      <p className="text-6xl font-bold text-accent">404</p>
      <h1 className="text-3xl font-bold text-primary">Page not found</h1>
      <p className="text-neutral">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="rounded-xl bg-accent px-6 py-3 font-bold text-primary-dark hover:bg-accent-light"
        >
          Go to home
        </Link>
        <Link
          to="/usedCars"
          className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-primary"
        >
          Browse used cars
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
