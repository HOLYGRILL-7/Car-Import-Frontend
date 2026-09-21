import { useEffect, useState } from "react";
import { fetchFeaturedTestimonials } from "../firebase/testimonials";

// The featured testimonials, newest first, for the public Reviews page.
export const useFeaturedTestimonials = () => {
  const [result, setResult] = useState({ done: false, items: [], error: null });

  useEffect(() => {
    let cancelled = false;

    fetchFeaturedTestimonials()
      .then((items) => {
        if (!cancelled) setResult({ done: true, items, error: null });
      })
      .catch((error) => {
        console.error("Failed to fetch testimonials:", error);
        if (!cancelled) setResult({ done: true, items: [], error });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { items: result.items, loading: !result.done, error: result.error };
};
