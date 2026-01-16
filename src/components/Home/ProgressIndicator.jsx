// components/home/ProgressIndicator.js
import React from "react";

const ProgressIndicator = ({ totalSlides, currentSlide, onSlideChange }) => {
  return (
    <div className="flex justify-center gap-2 mt-8">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSlideChange(index)}
          className={`w-2 h-2 rounded-full transition-all ${
            currentSlide === index
              ? "bg-accent w-8"
              : "bg-neutral hover:bg-neutral-dark"
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default ProgressIndicator;
