import React from "react";
import { Star } from "lucide-react";

// A read-only row of five stars, `value` of them filled.
const StarRating = ({ value, className = "" }) => (
  <span
    role="img"
    aria-label={`${value} out of 5 stars`}
    className={`inline-flex items-center gap-0.5 ${className}`}
  >
    {[1, 2, 3, 4, 5].map((n) => (
      <Star
        key={n}
        aria-hidden="true"
        className={`h-5 w-5 ${
          n <= value ? "fill-accent text-accent" : "text-gray-300"
        }`}
      />
    ))}
  </span>
);

export default StarRating;
