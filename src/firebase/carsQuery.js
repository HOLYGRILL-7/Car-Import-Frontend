import {
  collection,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";

export const PAGE_SIZE = 20;

// One page of available cars of `type`, newest first, narrowed by the
// server-side `clauses` (see buildServerClauses) and continuing after `cursor`
// (the last document of the previous page).
//
// Every distinct set of filter fields is its own Firestore query shape and
// needs a composite index: type, status, <each filtered field>, createdAt desc.
export const buildCarsQuery = (db, type, clauses = [], cursor = null) =>
  query(
    collection(db, "cars"),
    where("type", "==", type),
    where("status", "==", "available"),
    ...clauses.map(({ field, values }) =>
      values.length === 1
        ? where(field, "==", values[0])
        : where(field, "in", values),
    ),
    orderBy("createdAt", "desc"),
    ...(cursor ? [startAfter(cursor)] : []),
    limit(PAGE_SIZE),
  );
