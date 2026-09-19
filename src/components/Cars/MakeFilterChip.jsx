import React from "react";
import { X } from "lucide-react";

// Shows the manufacturer filter that's currently applied, and clears it.
const MakeFilterChip = ({ label, onClear }) => {
  return (
    <div className="flex items-center gap-2 text-sm text-neutral">
      <span>Make:</span>
      <button
        type="button"
        onClick={onClear}
        aria-label={`Clear ${label} filter`}
        className="inline-flex items-center gap-1.5 rounded-full border border-primary bg-white px-3 py-1 font-semibold text-primary cursor-pointer hover:bg-neutral-cream"
      >
        {label}
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default MakeFilterChip;
