import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  // Wraps the hamburger button + dropdown, so a tap outside either closes it
  // (the button itself already toggles, so it's excluded from that check).
  const navRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => e.key === "Escape" && setOpenAt(null);
    const onPointerDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenAt(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const handleLogout = async () => {
    setOpenAt(null);
    await logout();
    navigate("/", { state: { toast: "You've been logged out." } });
  };

  return (
    <nav className="bg-primary-dark shadow-lg">
      <div ref={navRef} className="relative w-full px-4 sm:px-6 lg:px-8">
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
          {/* Below xl, Login/Register otherwise live only inside the
              hamburger dropdown, which is easy to miss when prompted to log
              in from elsewhere (e.g. saving a car) — so a logged-out visitor
              always has this small, direct way in. */}
          {!user && (
            <Link
              to="/login"
              className="mr-1 rounded-lg px-3 py-1.5 text-sm font-semibold text-white hover:bg-white/10 xl:hidden"
            >
              Log in
            </Link>
          )}
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
