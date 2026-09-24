import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CarListingCard from "../Cars/CarListingCard";
import ProgressIndicator from "./ProgressIndicator";
import { useVisibleCards } from "../../hooks/useVisibleCards";

// Arrow colours. "orange" is the default; New Arrivals passes tone="blue".
// (The dot indicator keeps its own orange in both, and the cards themselves
// are the same CarListingCard as the Used / New Cars pages.)
const ARROW_TONES = {
  orange: "bg-accent hover:bg-accent-light",
  blue: "bg-blue-600 hover:bg-blue-500",
};

// Shows 1, 2 or 3 full cards at a time depending on the screen (see
// useVisibleCards); each step moves a page of that many. The last page is
// pulled back so it still shows full cards (overlapping the previous page)
// instead of leaving gaps. The gap between cards is 1.5rem (gap-6).
const CarSlider = ({ cars, tone = "orange" }) => {
  const visible = useVisibleCards();
  const [page, setPage] = useState(0);
  const touchStartX = useRef(null);

  const pages = Math.max(1, Math.ceil(cars.length / visible));
  const currentPage = Math.min(page, pages - 1);
  const firstCard = Math.min(
    currentPage * visible,
    Math.max(cars.length - visible, 0),
  );

  const goToPage = (index) => setPage(Math.min(Math.max(index, 0), pages - 1));

  // Swipe support for touch devices: a plain threshold check on release,
  // no live drag-follow (arrows already handle the precise, discrete case).
  const SWIPE_THRESHOLD = 40;
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (deltaX > SWIPE_THRESHOLD) goToPage(currentPage - 1);
    else if (deltaX < -SWIPE_THRESHOLD) goToPage(currentPage + 1);
  };

  return (
    <div className="relative">
      {/* Previous Button: hidden on mobile, which relies on swipe instead */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 0}
        className={`hidden sm:block absolute left-0 shadow-xl top-1/2 -translate-y-1/2 -translate-x-4 z-10 ${ARROW_TONES[tone]} rounded-full p-2.5 sm:p-3 disabled:opacity-50 disabled:cursor-not-allowed`}
        aria-label="Previous"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      {/* Slider Wrapper */}
      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <ul
          className="flex gap-6 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(calc(${-firstCard} * (100% + 1.5rem) / ${visible}))`,
          }}
        >
          {cars.map((car) => (
            <li
              key={car.id}
              className="shrink-0"
              style={{
                flex: `0 0 calc((100% - ${(visible - 1) * 1.5}rem) / ${visible})`,
              }}
            >
              <CarListingCard car={car} />
            </li>
          ))}
        </ul>
      </div>

      {/* Next Button: hidden on mobile, which relies on swipe instead */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= pages - 1}
        className={`hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 shadow-xl translate-x-4 z-10 ${ARROW_TONES[tone]} rounded-full p-2.5 sm:p-3 disabled:opacity-50 disabled:cursor-not-allowed`}
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
