import React from "react";
import { BODY_TYPES } from "../../utils/bodyTypes";

const OPTIONS = [{ id: "all", label: "All" }, ...BODY_TYPES];

// Compact filter bar for the listing pages. Filters in place — no navigation.
const CarTypeFilter = ({ value, onChange }) => {
  return (
    <div
      role="group"
      aria-label="Filter by body type"
      className="flex flex-wrap gap-2"
    >
      {OPTIONS.map(({ id, label }) => {
        const active = value === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-pressed={active}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors cursor-pointer ${
              active
                ? "bg-primary text-white border-primary"
                : "bg-white text-primary border-neutral-light hover:bg-neutral-cream"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default CarTypeFilter;
