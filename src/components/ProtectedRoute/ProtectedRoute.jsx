import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isLoggedIn, loading } = useAuth();

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

  // If not logged in, redirect to login page
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  // If roles are specified, check if user has required role
  if (allowedRoles.length > 0 && user?.role) {
    if (!allowedRoles.includes(user.role)) {
      // User doesn't have permission - redirect based on their role
      if (user.role === "admin") {
        return <Navigate to="/admin" replace />;
      }
      return <Navigate to="/users/dashboard" replace />;
    }
  }

  // If children are provided (old pattern), render them
  // Otherwise use Outlet for nested routes (new pattern)
  return children || <Outlet />;
};

export default ProtectedRoute;
