import { useCallback, useEffect, useRef, useState } from "react";
import { getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { PAGE_SIZE, buildCarsQuery } from "../firebase/carsQuery";
import {
  buildServerClauses,
  hasClientFilters,
  matchesClientFilters,
} from "../utils/carFilters";

// When client-side filters (price, make) discard most of a page, keep pulling
// pages until PAGE_SIZE cars match — but stop after this many so a rare filter
// can't scan the whole collection in one go ("Load More" continues from there).
const MAX_PAGES_PER_FETCH = 10;

const NO_FILTERS = {
  bodyType: "all",
  fuelType: "",
  transmission: "",
  minPrice: "",
  maxPrice: "",
  make: null,
};

const toCar = (doc) => ({ id: doc.id, ...doc.data() });

// Next batch of matching cars, continuing after `startCursor`. Body style,
// fuel type and transmission are Firestore where() clauses; price and make are
// checked here on each page the server returns. The cursor always follows the
// last document Firestore returned, so the next call resumes right after it.
const fetchMatching = async (type, filters, startCursor) => {
  const clauses = buildServerClauses(filters);
  const clientSide = hasClientFilters(filters);
  const cars = [];
  let cursor = startCursor;
  let hasMore = true;

  for (let pages = 0; pages < MAX_PAGES_PER_FETCH && hasMore; pages++) {
    const { docs } = await getDocs(buildCarsQuery(db, type, clauses, cursor));
    if (docs.length > 0) cursor = docs[docs.length - 1];
    // A short page means the (filtered) results are used up.
    hasMore = docs.length === PAGE_SIZE;

    for (const doc of docs) {
      const car = toCar(doc);
      if (!clientSide || matchesClientFilters(car, filters)) cars.push(car);
    }
    if (!clientSide || cars.length >= PAGE_SIZE) break;
  }

  return { cars, cursor, hasMore };
};

// Fetches available cars of the given type ("used" | "new"), newest first,
// narrowed by `filters` ({ bodyType, fuelType, transmission, minPrice,
// maxPrice, make }; all optional) across the WHOLE collection, PAGE_SIZE at a
// time. Changing the type or any filter starts a fresh query from the first
// page; loadMore() appends the next page of the CURRENT filter combination.
export const useCars = (type, filters) => {
  // A string, so effects re-run only when the filters actually change.
  const key = JSON.stringify([type, { ...NO_FILTERS, ...filters }]);

  // Keyed by the query so `loading` is derived: it's true until the first page
  // for the current type + filters arrives, including when they change.
  const [state, setState] = useState({
    key: null,
    cars: [],
    cursor: null,
    hasMore: false,
    error: null,
    loadingMore: false,
    loadMoreError: null,
  });
  const loadingMoreRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    const [queryType, queryFilters] = JSON.parse(key);

    fetchMatching(queryType, queryFilters, null)
      .then(({ cars, cursor, hasMore }) => {
        if (cancelled) return;
        setState({
          key,
          cars,
          cursor,
          hasMore,
          error: null,
          loadingMore: false,
          loadMoreError: null,
        });
      })
      .catch((error) => {
        if (cancelled) return;
        // For a missing index the message includes the console link to create it.
        console.error("Failed to fetch cars:", error);
        setState({
          key,
          cars: [],
          cursor: null,
          hasMore: false,
          error,
          loadingMore: false,
          loadMoreError: null,
        });
      });

    return () => {
      cancelled = true;
    };
  }, [key]);

  const loadMore = useCallback(() => {
    if (loadingMoreRef.current || state.key !== key || !state.hasMore) return;
    loadingMoreRef.current = true;
    setState((s) =>
      s.key === key ? { ...s, loadingMore: true, loadMoreError: null } : s,
    );
    const [queryType, queryFilters] = JSON.parse(key);

    fetchMatching(queryType, queryFilters, state.cursor)
      .then(({ cars, cursor, hasMore }) => {
        setState((s) =>
          s.key !== key
            ? s
            : {
                ...s,
                cars: [...s.cars, ...cars],
                cursor,
                hasMore,
                loadingMore: false,
              },
        );
      })
      .catch((error) => {
        console.error("Failed to load more cars:", error);
        setState((s) =>
          s.key === key
            ? { ...s, loadingMore: false, loadMoreError: error }
            : s,
        );
      })
      .finally(() => {
        loadingMoreRef.current = false;
      });
  }, [state, key]);

  const current = state.key === key;
  return {
    cars: current ? state.cars : [],
    loading: !current,
    error: current ? state.error : null,
    hasMore: current && state.hasMore,
    loadingMore: current && state.loadingMore,
    loadMoreError: current ? state.loadMoreError : null,
    loadMore,
  };
};
