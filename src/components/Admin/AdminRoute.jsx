import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const AdminRoute = ({ children }) => {
  const { isLoggedIn, isAdmin, loading } = useAuth();

  //show loading while checking auth status
  if (loading) {
    return <div>Loading...</div>;
  }

  //If not logged in, redirect to login page
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  //If logged in but not admin, redirect to home page
  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  //if admin, render the child components
  return children;
};

export default AdminRoute;
