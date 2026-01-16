import React from "react";
import { Link } from "react-router-dom";

const AuthSection = ({ isUserPath, user, onLogout }) => {
  return (
    <div className="contents">
      {isUserPath ? (
        <>
          <Link
            to="/dashboard"
            className="text-white hover:text-secondary-light transition-colors font-medium"
          >
            Dashboard
          </Link>
          <span className="text-white">Welcome, {user?.name}</span>
          <button
            onClick={onLogout}
            className="bg-secondary hover:bg-secondary-dark px-5 py-2 rounded-lg font-medium transition-all text-white"
          >
            Logout
          </button>
        </>
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