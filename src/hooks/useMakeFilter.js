import { useSearchParams } from "react-router-dom";
import { getMake } from "../utils/makes";

// The listing pages' make filter lives in the URL (?make=toyota) so the
// homepage's manufacturer links can set it and it survives refresh/back.
export const useMakeFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const make = searchParams.get("make") || null;

  const clearMake = () =>
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete("make");
        return next;
      },
      { replace: true },
    );

  return { make, makeLabel: make ? getMake(make).label : null, clearMake };
};
