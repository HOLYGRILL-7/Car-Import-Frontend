import { useEffect, useState } from "react";

// `value`, but only after it has stopped changing for `delay` ms. Used so
// typing a price doesn't fire a Firestore query on every keystroke.
export const useDebouncedValue = (value, delay = 400) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};
