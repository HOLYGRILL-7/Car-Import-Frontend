import React from "react";
import { Link } from "react-router-dom";
import FaqAccordion from "../../components/Faq/FaqAccordion";
import { faqs } from "../../data/faqData";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Header (the navbar is fixed, so it starts below it) */}
      <div className="bg-linear-to-br from-primary via-[#1e3a5f] to-primary-dark text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-14 text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Frequently Asked <span className="text-accent">Questions</span>
          </h1>
          <p className="text-lg text-neutral-cream">
            Quick answers about buying, importing and paying for your car.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <FaqAccordion items={faqs} />

        <div className="text-center space-y-4 pb-6">
          <h2 className="text-2xl font-bold text-primary">
            Still have a question?
          </h2>
          <p className="text-neutral">
            Call us or message us on WhatsApp and we'll be happy to help.
          </p>
          <Link
            to="/contact"
            className="inline-block rounded-xl bg-accent px-8 py-3 font-bold text-primary-dark hover:bg-accent-light"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
