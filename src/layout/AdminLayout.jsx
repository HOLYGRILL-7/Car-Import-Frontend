import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../context/useAuth";
import BrandWordmark from "../components/Brand/BrandWordmark";
import { ADMIN_DISPLAY_NAME } from "../utils/admin";
import { CarFront, Gauge, Menu, MessageSquareQuote, Users, X } from "lucide-react";

const NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", icon: <Gauge width={24} height={24} />, end: true },
  { to: "/admin/cars", label: "Manage Cars", icon: <CarFront width={24} height={24} /> },
  { to: "/admin/testimonials", label: "Testimonials", icon: <MessageSquareQuote width={24} height={24} /> },
  { to: "/admin/users", label: "Manage Users", icon: <Users width={24} height={24} /> },
];

// From lg up the sidebar sits beside the page; below that it's a drawer that
// slides in over it, opened from the bar at the top.
const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Open only for the page it was opened on, so going anywhere closes it.
  const [openAt, setOpenAt] = useState(null);
  const drawerOpen = openAt === location.key;

  useEffect(() => {
    if (!drawerOpen) return;
    const onKeyDown = (e) => e.key === "Escape" && setOpenAt(null);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [drawerOpen]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-neutral-light">
      {/* Dimmed backdrop behind the drawer (small screens only) */}
      {drawerOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpenAt(null)}
          className="fixed inset-0 z-30 cursor-default bg-black/50 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        id="admin-sidebar"
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-primary-dark text-white transition-[transform,visibility] duration-200 motion-reduce:transition-none lg:static lg:z-auto lg:translate-x-0 lg:visible ${
          drawerOpen ? "translate-x-0" : "-translate-x-full invisible"
        }`}
      >
        <div className="flex items-center justify-between border-b border-neutral-cream/10 px-8 pt-6 pb-6 lg:p-9 lg:px-8 lg:pt-6">
          <Link to="/admin" className="transition-transform">
            <BrandWordmark />
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpenAt(null)}
            className="-mr-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-white hover:bg-white/10 lg:hidden"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Logo/Brand */}
        <div className="p-6 border-b border-neutral-cream/10 mx-4">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <p className="text-sm text-neutral-cream mt-1">Car Import Business</p>
        </div>

        {/* Navigation Links. NavLink marks the page you're on (`end` keeps
            Dashboard from also matching every /admin/... page). */}
        <nav className="flex-1 overflow-y-auto p-4">
          {NAV_ITEMS.map(({ to, label, icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex gap-2 py-3 px-4 rounded mb-2 transition-colors ${
                  isActive
                    ? "bg-accent text-primary-dark font-semibold"
                    : "hover:bg-neutral-cream/10"
                }`
              }
            >
              {icon}
              <p className="text-lg">{label}</p>
            </NavLink>
          ))}
        </nav>

        {/* User Info at Bottom */}
        <div className="p-4 border-t border-neutral-cream/10">
          <div className="mb-3">
            <p className="text-sm text-neutral-cream">Logged in as</p>
            <p className="font-semibold">{ADMIN_DISPLAY_NAME}</p>
            <p className="text-xs text-neutral-cream break-all">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-accent hover:bg-accent-light py-2 px-4 rounded transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="min-w-0 flex-1 overflow-y-auto">
        {/* Menu bar (small screens only) */}
        <div className="flex items-center gap-3 bg-primary-dark px-4 py-3 text-white lg:hidden">
          <button
            type="button"
            onClick={() => setOpenAt(location.key)}
            aria-expanded={drawerOpen}
            aria-controls="admin-sidebar"
            aria-label="Open menu"
            className="-ml-2 flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg hover:bg-white/10"
          >
            <Menu className="h-7 w-7" aria-hidden="true" />
          </button>
          <BrandWordmark className="text-xl" />
        </div>

        {/* Top Bar */}
        <header className="bg-white shadow-sm p-4 sm:p-6 border-b border-neutral-light">
          <h1 className="text-xl sm:text-2xl font-semibold text-primary">
            Welcome back, {ADMIN_DISPLAY_NAME}!
          </h1>
          <p className="text-neutral text-sm mt-1">
            Manage your car import business from here
          </p>
        </header>

        {/* Page Content */}
        <div className="p-4 sm:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
