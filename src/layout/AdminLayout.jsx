import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import logoWhite from ".././assets/Logo/logoWhite.png";
import { CarFront, Gauge, Boxes, Users, ExternalLink } from "lucide-react";

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Open public site in new tab to preserve admin session
  const handleViewSite = (e) => {
    e.preventDefault();
    window.open("/", "_blank");
  };

  return (
    <div className="flex h-screen bg-neutral-light">
      {/* Sidebar */}
      <aside className="w-64 bg-primary-dark text-white flex flex-col">
        <Link
          to="/admin"
          className="transition-transform border-b p-9 border-neutral-cream/10 px-8 pt-6"
        >
          <img src={logoWhite} alt="CarWise" width={130} />
        </Link>

        {/* Logo/Brand */}
        <div className="p-6 border-b border-neutral-cream/10 mx-4">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <p className="text-sm text-neutral-cream mt-1">Car Import Business</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4">
          <Link
            to="/admin"
            className="flex gap-2 py-3 px-4 rounded hover:bg-neutral-cream/10 mb-2 transition-colors"
          >
            <Gauge width={24} height={24} />
            <p className="text-lg">Dashboard</p>
          </Link>
          <Link
            to="/admin/cars"
            className="flex gap-2 py-3 px-4 rounded hover:bg-neutral-cream/10 mb-2 transition-colors"
          >
            <CarFront width={24} height={24} />
            <p className="text-lg">Manage Cars</p>
          </Link>
          <Link
            to="/admin/orders"
            className="flex gap-2 py-3 px-4 rounded hover:bg-neutral-cream/10 mb-2 transition-colors"
          >
            <Boxes width={24} height={24} />
            <p className="text-lg">Manage Orders</p>
          </Link>
          <Link
            to="/admin/users"
            className="flex gap-2 py-3 px-4 rounded hover:bg-neutral-cream/10 mb-2 transition-colors"
          >
            <Users width={24} height={24} />
            <p className="text-lg">Manage Users</p>
          </Link>

          {/* Divider */}
          <div className="border-t border-neutral-cream/10 my-4"></div>

          {/* View Public Site - Opens in new tab */}
          <a
            href="/"
            onClick={handleViewSite}
            className="flex gap-2 items-center py-3 px-4 rounded hover:bg-neutral-cream/10 mb-2 text-neutral-cream transition-colors cursor-pointer"
          >
            <ExternalLink width={24} height={24} />
            <p className="text-lg">View Site</p>
          </a>
        </nav>

        {/* User Info at Bottom */}
        <div className="p-4 border-t border-neutral-cream/10">
          <div className="mb-3">
            <p className="text-sm text-neutral-cream">Logged in as</p>
            <p className="font-semibold">{user?.name}</p>
            <p className="text-xs text-neutral-cream">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-accent hover:bg-accent-light py-2 px-4 rounded transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <header className="bg-white shadow-sm p-6 border-b border-neutral-light">
          <h1 className="text-2xl font-semibold text-primary">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-neutral text-sm mt-1">
            Manage your car import business from here
          </p>
        </header>

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
