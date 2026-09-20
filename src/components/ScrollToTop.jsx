import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// Late-loading sections (e.g. Home's Dealer's Choice) can push a #hash target
// down after we've scrolled to it, so keep it aligned until the page settles
// or the user takes over.
const KEEP_ALIGNED_MS = 4000;
const USER_INPUT = ["wheel", "touchstart", "keydown", "mousedown"];

const keepAligned = (target) => {
  const observer = new ResizeObserver(() => target.scrollIntoView());
  observer.observe(document.documentElement);
  const stop = () => {
    observer.disconnect();
    clearTimeout(timer);
    USER_INPUT.forEach((type) => window.removeEventListener(type, stop));
  };
  const timer = setTimeout(stop, KEEP_ALIGNED_MS);
  USER_INPUT.forEach((type) =>
    window.addEventListener(type, stop, { passive: true }),
  );
  return stop;
};

// Mounted once inside <BrowserRouter>. Every navigation to a different page, or
// a click on a link to the page you're already on, starts at the top. A link
// with a #hash scrolls to that element instead. Search-only changes (filter
// chips, sort) are ignored so they don't throw the user back to the top, and
// Back/Forward are left to the browser so it can restore the old position.
const ScrollToTop = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const previous = useRef(location);

  useEffect(() => {
    const before = previous.current;
    previous.current = location;
    if (navigationType === "POP") return;

    const pageChanged = before.pathname !== location.pathname;
    const sameLinkClicked =
      before.key !== location.key &&
      before.pathname === location.pathname &&
      before.search === location.search;
    if (!pageChanged && !sameLinkClicked) return;

    const target =
      location.hash &&
      document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (!target) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }
    target.scrollIntoView();
    return keepAligned(target);
  }, [location, navigationType]);

  return null;
};

export default ScrollToTop;
