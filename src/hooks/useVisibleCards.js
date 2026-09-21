import { useSyncExternalStore } from "react";

// How many cards a Home slider shows at once: 1 on phones, 2 on tablets, 3 on
// desktops (matching Tailwind's sm and lg breakpoints).
const STEPS = [
  { query: "(min-width: 1024px)", cards: 3 },
  { query: "(min-width: 640px)", cards: 2 },
];

const getVisibleCards = () =>
  STEPS.find(({ query }) => window.matchMedia(query).matches)?.cards ?? 1;

const subscribe = (onChange) => {
  const lists = STEPS.map(({ query }) => window.matchMedia(query));
  lists.forEach((list) => list.addEventListener("change", onChange));
  return () =>
    lists.forEach((list) => list.removeEventListener("change", onChange));
};

export const useVisibleCards = () =>
  useSyncExternalStore(subscribe, getVisibleCards, () => 3);
