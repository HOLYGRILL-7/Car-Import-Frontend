import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import PromoBanner from "../components/Navbar/PromoBanner";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const Layout = () => {
  const location = useLocation();

  // Optional: Hide footer on services page
  const hideFooter = location.pathname === "/services" || location.pathname === "/about";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Promo banner + navbar, fixed together at the top */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <PromoBanner />
        <Navbar />
      </header>

      {/* pt-8 clears the promo banner (h-8); each page adds its own offset
          for the navbar beneath it */}
      <main className="flex-1 pt-8">
        <Outlet />
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
