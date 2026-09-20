// components/home/CarSlider.js
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CarCard from "./CarCard";
import ProgressIndicator from "./ProgressIndicator";

const VISIBLE_CARDS = 3;

// Arrow colours. "orange" is the default; New Arrivals passes tone="blue".
// (The dot indicator keeps its own orange in both.)
const ARROW_TONES = {
  orange: "bg-accent hover:bg-accent-light",
  blue: "bg-blue-600 hover:bg-blue-500",
};

// Shows exactly 3 full cards at a time; each step moves a page of 3. The last
// page is pulled back so it still shows 3 full cards (overlapping the previous
// page) instead of leaving gaps. The 3rem below is the two gap-6 gaps between
// visible cards, and 1.5rem is one gap.
const CarSlider = ({ cars, tone = "orange" }) => {
  const [page, setPage] = useState(0);

  const pages = Math.max(1, Math.ceil(cars.length / VISIBLE_CARDS));
  const currentPage = Math.min(page, pages - 1);
  const firstCard = Math.min(
    currentPage * VISIBLE_CARDS,
    Math.max(cars.length - VISIBLE_CARDS, 0),
  );

  const goToPage = (index) => setPage(Math.min(Math.max(index, 0), pages - 1));

  return (
    <div className="relative">
      {/* Previous Button */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 0}
        className={`absolute left-0 shadow-xl top-1/2 -translate-y-1/2 -translate-x-4 z-10 ${ARROW_TONES[tone]} rounded-full p-3 disabled:opacity-50 disabled:cursor-not-allowed`}
        aria-label="Previous"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      {/* Slider Wrapper */}
      <div className="overflow-hidden">
        <ul
          className="flex gap-6 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(calc(${-firstCard} * (100% + 1.5rem) / ${VISIBLE_CARDS}))`,
          }}
        >
          {cars.map((car) => (
            <li
              key={car.id}
              className="shrink-0"
              style={{ flex: `0 0 calc((100% - 3rem) / ${VISIBLE_CARDS})` }}
            >
              <CarCard car={car} tone={tone} />
            </li>
          ))}
        </ul>
      </div>

      {/* Next Button */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= pages - 1}
        className={`absolute right-0 top-1/2 -translate-y-1/2 shadow-xl translate-x-4 z-10 ${ARROW_TONES[tone]} rounded-full p-3 disabled:opacity-50 disabled:cursor-not-allowed`}
        aria-label="Next"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Progress Indicator */}
      <ProgressIndicator
        totalSlides={pages}
        currentSlide={currentPage}
        onSlideChange={goToPage}
      />
    </div>
  );
};

export default CarSlider;
