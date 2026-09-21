import { Link, NavLink } from "react-router-dom";
import { ADMIN_DISPLAY_NAME } from "../../utils/admin";

// Signed out: Login / Register. Signed in: Saved Cars, the user's name and
// Logout — plus an Admin link for the admin account only. `stacked` lays it
// out as a vertical list (the mobile menu).
const AuthSection = ({ user, isAdmin, onLogout, stacked = false }) => {
  return (
    <div className="contents">
      {user ? (
        <div
          className={
            stacked ? "flex flex-col gap-1" : "flex items-center gap-4"
          }
        >
          {isAdmin && (
            <Link
              to="/admin"
              className={`text-white hover:text-secondary-light transition-colors font-medium ${
                stacked ? "py-3 text-lg" : ""
              }`}
            >
              Admin
            </Link>
          )}
          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              `${
                isActive ? "text-secondary-light" : "text-white"
              } hover:text-secondary-light transition-colors font-medium ${
                stacked ? "py-3 text-lg" : ""
              }`
            }
          >
            Saved Cars
          </NavLink>
          <span className={`text-white ${stacked ? "py-2" : ""}`}>
            Welcome, {isAdmin ? ADMIN_DISPLAY_NAME : user.name}
          </span>
          <button
            onClick={onLogout}
            className={`bg-secondary hover:bg-secondary-dark px-5 py-2 rounded-lg font-medium transition-all text-white cursor-pointer ${
              stacked ? "mt-2 py-3" : ""
            }`}
          >
            Logout
          </button>
        </div>
      ) : (
        <div
          className={
            stacked
              ? "flex flex-col gap-2 text-lg font-semibold"
              : "flex gap-2 text-lg font-semibold"
          }
        >
          <Link
            to="/login"
            className={`text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all ${
              stacked ? "py-3 text-center" : ""
            }`}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={`bg-secondary hover:bg-secondary-dark text-white px-5 py-2 rounded-lg transition-all ${
              stacked ? "py-3 text-center" : ""
            }`}
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthSection;
