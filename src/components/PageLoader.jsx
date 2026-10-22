// Shown while a page's code is downloading (the Suspense fallback for the
// lazily loaded routes in App.jsx). `className` sets the height and offset
// for where it sits, e.g. below the fixed navbar.
const PageLoader = ({ className = "min-h-screen" }) => (
  <div
    role="status"
    className={`page-loader flex items-center justify-center ${className}`}
  >
    <span
      aria-hidden="true"
      className="h-10 w-10 rounded-full border-4 border-primary-light/30 border-t-primary motion-safe:animate-spin"
    />
    <span className="sr-only">Loading...</span>
  </div>
);

export default PageLoader;
