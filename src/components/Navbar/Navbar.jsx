import React from "react";
import AuthSection from "./AuthSection";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

// Positioned by Layout (fixed at the top, below the promo banner).
const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="bg-primary-dark shadow-lg">
      <div className="relative w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Logo />
          <NavLinks />
          <AuthSection
            onLogout={handleLogout}
            user={user}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
