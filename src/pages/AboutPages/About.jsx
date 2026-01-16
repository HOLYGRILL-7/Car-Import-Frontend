import React from "react";
import { Award } from "lucide-react";
import { ABOUT_CONTENT } from "../../data/aboutData";

const About = () => {
  const [imageErrors, setImageErrors] = React.useState({});

  const handleImageError = (investorId) => {
    console.error(`Failed to load image for investor: ${investorId}`);
    setImageErrors((prev) => ({ ...prev, [investorId]: true }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-light to-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-primary via-[#1e3a5f] to-primary-dark text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
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
            className="space-y-6 bg-white rounded-2xl p-8 shadow-lg"
            aria-labelledby={`section-${section.id}`}
          >
            <h2
              id={`section-${section.id}`}
              className={`text-4xl font-bold text-primary border-l-4 ${section.borderColor} pl-6`}
            >
              {section.title}
            </h2>
            <p className="text-lg text-neutral leading-relaxed pl-6">
              {section.content}
            </p>
          </section>
        ))}

        {/* Our Investors */}
        <section className="space-y-10" aria-labelledby="investors-heading">
          <div className="text-center space-y-4">
            <h2
              id="investors-heading"
              className="text-4xl font-bold text-primary"
            >
              {ABOUT_CONTENT.investors.heading}
            </h2>
            <p className="text-lg text-neutral max-w-3xl mx-auto">
              {ABOUT_CONTENT.investors.description}
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
            {ABOUT_CONTENT.investors.list.map((investor) => (
              <article
                key={investor.id}
                className="bg-white rounded-xl h-72 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center justify-center p-8"
              >
                {imageErrors[investor.id] ? (
                  <div className="flex flex-col items-center justify-center space-y-4 text-neutral">
                    <Award className="w-16 h-16 text-primary opacity-50" />
                    <p className="font-semibold">{investor.name}</p>
                    <p className="text-sm text-center">
                      {investor.description}
                    </p>
                  </div>
                ) : (
                  <>
                    <img
                      src={investor.logo}
                      alt={`${investor.name} logo`}
                      className="max-w-full max-h-48 object-contain"
                      onError={() => handleImageError(investor.id)}
                      loading="lazy"
                    />
                    <p className="mt-4 text-sm text-neutral text-center">
                      {investor.description}
                    </p>
                  </>
                )}
              </article>
            ))}
          </div>
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
