import { useCallback, useEffect, useRef, useState } from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";

const PAGE_SIZE = 20;

const toCar = (doc) => ({ id: doc.id, ...doc.data() });

// Needs a composite index: type (asc), status (asc), createdAt (desc).
const pageQuery = (type, cursor) =>
  query(
    collection(db, "cars"),
    where("type", "==", type),
    where("status", "==", "available"),
    orderBy("createdAt", "desc"),
    ...(cursor ? [startAfter(cursor)] : []),
    limit(PAGE_SIZE),
  );

// Fetches available cars of the given type ("used" | "new"), newest first,
// PAGE_SIZE at a time. loadMore() appends the next page.
export const useCars = (type) => {
  // Keyed by type so `loading` is derived: it's true until the first page for
  // the current type arrives, including when the type changes.
  const [state, setState] = useState({
    type: null,
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

    getDocs(pageQuery(type))
      .then((snapshot) => {
        if (cancelled) return;
        setState({
          type,
          cars: snapshot.docs.map(toCar),
          cursor: snapshot.docs[snapshot.docs.length - 1] ?? null,
          hasMore: snapshot.docs.length === PAGE_SIZE,
          error: null,
          loadingMore: false,
          loadMoreError: null,
        });
      })
      .catch((error) => {
        if (cancelled) return;
        console.error("Failed to fetch cars:", error);
        setState({
          type,
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
  }, [type]);

  const loadMore = useCallback(() => {
    if (loadingMoreRef.current || state.type !== type || !state.hasMore) return;
    loadingMoreRef.current = true;
    setState((s) =>
      s.type === type ? { ...s, loadingMore: true, loadMoreError: null } : s,
    );

    getDocs(pageQuery(type, state.cursor))
      .then((snapshot) => {
        setState((s) =>
          s.type !== type
            ? s
            : {
                ...s,
                cars: [...s.cars, ...snapshot.docs.map(toCar)],
                cursor: snapshot.docs[snapshot.docs.length - 1] ?? s.cursor,
                hasMore: snapshot.docs.length === PAGE_SIZE,
                loadingMore: false,
              },
        );
      })
      .catch((error) => {
        console.error("Failed to load more cars:", error);
        setState((s) =>
          s.type === type
            ? { ...s, loadingMore: false, loadMoreError: error }
            : s,
        );
      })
      .finally(() => {
        loadingMoreRef.current = false;
      });
  }, [state, type]);

  const current = state.type === type;
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
