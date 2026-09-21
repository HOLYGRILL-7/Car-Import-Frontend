import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import BackToTop from "../components/BackToTop";

const Layout = () => {
  const location = useLocation();

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
    </div>
  );
};

export default Layout;
