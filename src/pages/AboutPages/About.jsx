import React from "react";
import { Link } from "react-router-dom";
import { ABOUT_CONTENT } from "../../data/aboutData";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-light to-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-primary via-[#1e3a5f] to-primary-dark text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              {ABOUT_CONTENT.hero.title}
              <br />
              <span className="text-accent">{ABOUT_CONTENT.hero.subtitle}</span>
            </h1>
          </div>
        </div>
      </header>

      {/* Content Sections */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Dynamic Sections */}
        {ABOUT_CONTENT.sections.map((section) => (
          <section
            key={section.id}
            className="space-y-6 bg-white rounded-2xl p-5 sm:p-8 shadow-lg"
            aria-labelledby={`section-${section.id}`}
          >
            <h2
              id={`section-${section.id}`}
              className={`text-3xl sm:text-4xl font-bold text-primary border-l-4 ${section.borderColor} pl-4 sm:pl-6`}
            >
              {section.title}
            </h2>
            <p className="text-lg text-neutral leading-relaxed pl-4 sm:pl-6">
              {section.content}
            </p>
          </section>
        ))}

        {/* Investing: an invitation to talk, not a list of backers */}
        <section
          className="space-y-6 rounded-2xl bg-white p-6 text-center shadow-lg sm:p-10"
          aria-labelledby="invest-heading"
        >
          <h2
            id="invest-heading"
            className="text-3xl sm:text-4xl font-bold text-primary"
          >
            {ABOUT_CONTENT.invest.heading}
          </h2>
          <p className="text-lg text-neutral">
            {ABOUT_CONTENT.invest.description}
          </p>
          <Link
            to={ABOUT_CONTENT.invest.buttonPath}
            className="inline-block rounded-xl bg-accent px-8 py-4 font-bold text-primary-dark shadow-lg hover:bg-accent-light"
          >
            {ABOUT_CONTENT.invest.buttonText}
          </Link>
        </section>
      </main>

      {/* CTA Section - Conditionally rendered */}
      {ABOUT_CONTENT.cta.enabled && (
        <aside className="bg-gradient-to-r from-primary to-primary-dark text-white py-16 mt-20">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
            <h2 className="text-4xl font-bold">{ABOUT_CONTENT.cta.title}</h2>
            <p className="text-xl text-neutral-light">
              {ABOUT_CONTENT.cta.description}
            </p>
            <button
              className="px-8 py-4 bg-accent hover:bg-accent-light text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg"
              onClick={() => {
                if (typeof ABOUT_CONTENT.cta.buttonAction === "function") {
                  ABOUT_CONTENT.cta.buttonAction();
                } else {
                  console.log("Navigate to:", ABOUT_CONTENT.cta.buttonAction);
                }
              }}
            >
              {ABOUT_CONTENT.cta.buttonText}
            </button>
          </div>
        </aside>
      )}
    </div>
  );
};

export default About;
