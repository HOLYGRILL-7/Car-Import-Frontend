import React from "react";
import { Link } from "react-router-dom";

// Signed out: Login / Register. Signed in: Saved Cars, the user's name and
// Logout — plus an Admin link for the admin account only.
const AuthSection = ({ user, isAdmin, onLogout }) => {
  return (
    <div className="contents">
      {user ? (
        <div className="flex items-center gap-4">
          {isAdmin && (
            <Link
              to="/admin"
              className="text-white hover:text-secondary-light transition-colors font-medium"
            >
              Admin
            </Link>
          )}
          <Link
            to="/wishlist"
            className="text-white hover:text-secondary-light transition-colors font-medium"
          >
            Saved Cars
          </Link>
          <span className="text-white">Welcome, {user.name}</span>
          <button
            onClick={onLogout}
            className="bg-secondary hover:bg-secondary-dark px-5 py-2 rounded-lg font-medium transition-all text-white cursor-pointer"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-2 text-lg font-semibold">
          <Link
            to="/login"
            className="text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-secondary hover:bg-secondary-dark text-white px-5 py-2 rounded-lg transition-all"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthSection;
