import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthSection from "./AuthSection";
import { useAuth } from "../../context/useAuth";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import MobileMenuButton from "./MobileMenuButton";
import MobileMenuComponent from "./MobileMenuComponent";

const MOBILE_MENU_ID = "mobile-menu";

// Positioned by Layout (fixed at the top). From the xl breakpoint up the links
// and account actions sit in the bar; below it they move into a dropdown
// opened by the hamburger.
const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Open only for the page it was opened on, so going anywhere closes it.
  const [openAt, setOpenAt] = useState(null);
  const open = openAt === location.key;

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => e.key === "Escape" && setOpenAt(null);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const handleLogout = async () => {
    setOpenAt(null);
    await logout();
    navigate("/");
  };

  return (
    <nav className="bg-primary-dark shadow-lg">
      <div className="relative w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Logo />
          <div className="hidden xl:contents">
            <NavLinks />
            <AuthSection
              onLogout={handleLogout}
              user={user}
              isAdmin={isAdmin}
            />
          </div>
          <MobileMenuButton
            open={open}
            controls={MOBILE_MENU_ID}
            onClick={() => setOpenAt(open ? null : location.key)}
          />
        </div>
        {open && (
          <MobileMenuComponent
            id={MOBILE_MENU_ID}
            user={user}
            isAdmin={isAdmin}
            onLogout={handleLogout}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
