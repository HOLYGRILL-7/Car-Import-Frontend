import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

// Only the admin account (email === VITE_ADMIN_EMAIL) gets through. Everyone
// else is redirected, so /admin/* never renders for regular users.
const AdminRoute = ({ children }) => {
  const { isLoggedIn, isAdmin, loading } = useAuth();
  const location = useLocation();

  //show loading while checking auth status
  if (loading) {
    return <div>Loading...</div>;
  }

  //If not logged in, redirect to login page
  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  }

  //If logged in but not admin, redirect to home page
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  //if admin, render the child components (or nested routes)
  return children || <Outlet />;
};

export default AdminRoute;
