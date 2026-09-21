import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

// A round button, fixed to the bottom-right, that appears once the visitor has
// scrolled down more than one screen and smoothly scrolls back to the top.
// (It's a single-page-height nudge, so it stays out of the way on short pages.)
const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (!visible) return null;

  const handleClick = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, left: 0, behavior: reduceMotion ? "instant" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      title="Back to top"
      className="fade-in fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary-dark shadow-lg hover:bg-accent-light cursor-pointer"
    >
      <ArrowUp className="h-6 w-6" aria-hidden="true" />
    </button>
  );
};

export default BackToTop;
