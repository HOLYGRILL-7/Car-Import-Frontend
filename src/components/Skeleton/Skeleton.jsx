import React from "react";

// One grey placeholder block with the shimmer (see .skeleton in index.css).
// Size and shape come from `className`.
const Skeleton = ({ className = "" }) => (
  <div aria-hidden="true" className={`skeleton rounded ${className}`} />
);

export default Skeleton;
