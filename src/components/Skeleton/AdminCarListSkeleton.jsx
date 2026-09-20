import React from "react";
import Skeleton from "./Skeleton";

// Placeholder for the admin car list rows (thumbnail, two text lines, and the
// Edit / Delete buttons), same row layout as ManageCars.
const AdminCarListSkeleton = ({ count = 5 }) => (
  <div role="status" aria-busy="true" data-skeleton="rows">
    <span className="sr-only">Loading cars...</span>
    <ul className="divide-y divide-gray-200">
      {Array.from({ length: count }, (_, i) => (
        <li key={i} data-skeleton="row" className="flex items-center gap-4 py-3">
          <Skeleton className="h-16 w-24 shrink-0 rounded-lg" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3.5 w-1/2" />
          </div>
          <Skeleton className="h-9 w-16 shrink-0 rounded-lg" />
          <Skeleton className="h-9 w-[4.5rem] shrink-0 rounded-lg" />
        </li>
      ))}
    </ul>
  </div>
);

export default AdminCarListSkeleton;
