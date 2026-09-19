import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

// Requires a signed-in user (any account). Signed-out visitors are sent to
// /login and brought back here afterwards.
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();
  const location = useLocation();

  // Show loading while checking auth status
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-neutral text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  }

  // Wraps children directly, or renders nested routes via <Outlet />
  return children || <Outlet />;
};

export default ProtectedRoute;
