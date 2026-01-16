import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { navItems, aboutHeader, ctaSection } from "../../data/aboutData";

const AboutUs = () => {
  const location = useLocation();

  const isActiveTab = (itemPath) => {
    if (location.pathname === itemPath) return true;
    if (itemPath !== "/about" && location.pathname.startsWith(itemPath))
      return true;
    return false;
  };

  const getTabClasses = (itemPath) => {
    const baseClasses =
      "py-4 px-2 border-b-2 transition-colors whitespace-nowrap font-medium";
    const activeClasses = "border-accent text-accent font-semibold";
    const inactiveClasses =
      "border-transparent text-neutral hover:text-primary hover:border-neutral";

    return `${baseClasses} ${isActiveTab(itemPath) ? activeClasses : inactiveClasses}`;
  };

  const getButtonClasses = (isPrimary) => {
    const baseClasses =
      "px-8 py-4 font-bold rounded-xl shadow-lg transition-all";
    const primaryClasses =
      "bg-accent hover:bg-accent-light text-white transform hover:scale-105";
    const secondaryClasses = "bg-white text-primary hover:scale-105";

    return `${baseClasses} ${isPrimary ? primaryClasses : secondaryClasses}`;
  };

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-primary via-[#1e3a5f] to-primary-dark text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold">
              {aboutHeader.title}
            </h1>
            <p className="text-xl text-neutral-cream">{aboutHeader.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-md sticky top-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-8 overflow-x-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={getTabClasses(item.path)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Children Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Outlet />
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16 mt-20">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-4xl font-bold">{ctaSection.title}</h2>
          <p className="text-xl text-neutral-light">{ctaSection.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {ctaSection.buttons.map((btn) => (
              <Link key={btn.path} to={btn.path}>
                <button className={getButtonClasses(btn.primary)}>
                  {btn.text}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
