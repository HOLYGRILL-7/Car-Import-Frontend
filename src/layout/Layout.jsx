import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import BackToTop from "../components/BackToTop";

const Layout = () => {
  const location = useLocation();
  // A brief confirmation banner for actions that redirect here (e.g. logout,
  // via navigate(path, { state: { toast: "..." } })). Cleared from history
  // state right away so it doesn't reappear on refresh or back/forward.
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!location.state?.toast) return;
    setToast(location.state.toast);
    window.history.replaceState({}, "");
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state?.toast]);

  // Optional: Hide footer on services page
  const hideFooter =
    location.pathname === "/services" || location.pathname === "/about";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar, fixed at the top; each page adds its own offset beneath it */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      {!hideFooter && <Footer />}
      <BackToTop />

      {toast && (
        <p
          role="status"
          className="fade-in fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-800 shadow-lg"
        >
          {toast}
        </p>
      )}
    </div>
  );
};

export default Layout;
