// components/home/CarSlider.js
import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CarCard from "./CarCard";
import ProgressIndicator from "./ProgressIndicator";

const CarSlider = ({ cars }) => {
  const slider = useRef();
  const [currentSlide, setCurrentSlide] = useState(0);
  const maxSlides = Math.ceil(cars.length / 3);

  const slideForward = () => {
    if (currentSlide < maxSlides) {
      const newSlide = currentSlide + 1;
      setCurrentSlide(newSlide);
      slider.current.style.transform = `translateX(-${newSlide * 25}%)`;
    }
  };

  const slideBackward = () => {
    if (currentSlide > 0) {
      const newSlide = currentSlide - 1;
      setCurrentSlide(newSlide);
      slider.current.style.transform = `translateX(-${newSlide * 25}%)`;
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    slider.current.style.transform = `translateX(-${index * 25}%)`;
  };

  return (
    <div className="relative">
      {/* Previous Button */}
      <button
        onClick={slideBackward}
        disabled={currentSlide === 0}
        className="absolute left-0 shadow-xl top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-accent hover:bg-accent-light rounded-full p-3 transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      {/* Slider Wrapper */}
      <div className="overflow-hidden">
        <ul
          ref={slider}
          className="flex gap-6 transition-transform duration-500 ease-in-out"
          style={{ width: `${cars.length * 33.33}%` }}
        >
          {cars.map((car) => (
            <li
              key={car.id}
              className="shrink-0"
              style={{ width: `${100 / cars.length}%` }}
            >
              <CarCard car={car} />
            </li>
          ))}
        </ul>
      </div>

      {/* Next Button */}
      <button
        onClick={slideForward}
        disabled={currentSlide === maxSlides}
        className="absolute right-0 top-1/2 -translate-y-1/2 shadow-xl translate-x-4 z-10 bg-accent hover:bg-accent-light rounded-full p-3 transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Progress Indicator */}
      <ProgressIndicator
        totalSlides={maxSlides + 1}
        currentSlide={currentSlide}
        onSlideChange={goToSlide}
      />
    </div>
  );
};

export default CarSlider;
