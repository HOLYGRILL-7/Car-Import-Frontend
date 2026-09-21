import { BODY_TYPES } from "./bodyTypes";
import { matchesMake } from "./makes";

export const EMPTY_FILTERS = {
  bodyType: "all",
  minPrice: "",
  maxPrice: "",
  fuelType: "",
  transmission: "",
};

// Dropdown choices (the same values the admin form suggests). They can't be
// read from the loaded cars any more: with server-side filtering that would
// only ever reflect the first page.
export const FUEL_TYPES = ["Petrol", "Diesel", "Hybrid", "Electric"];
export const TRANSMISSIONS = ["Automatic", "Manual"];

export const countActiveFilters = (filters, make) =>
  [
    make,
    filters.bodyType !== "all",
    filters.minPrice !== "" || filters.maxPrice !== "",
    filters.fuelType,
    filters.transmission,
  ].filter(Boolean).length;

// ---------------------------------------------------------------------------
// Server-side filters: body style, fuel type, transmission. Sent to Firestore
// as where() clauses, so they search the WHOLE collection.
//
// Firestore compares text exactly (case-sensitive), but these fields are free
// text, so each value is matched with `in` over its usual spellings. Two
// Firestore limits cap how many spellings can be sent at once, because `in`
// lists multiply (two lists of 9 and 3 values become 27 separate branches):
//   - at most 30 branches, and
//   - at most 100 filters + sort orders in total once expanded: every branch
//     carries type, status and one filter per clause, and there are two sort
//     orders (createdAt and the document id).
// When filters combine, the casing tolerance of the later ones (transmission,
// then fuel type) is dropped first; the exact value is always kept.
// ---------------------------------------------------------------------------
const MAX_COMBINATIONS = 30;
const MAX_QUERY_FILTERS = 100;
const SORT_ORDERS = 2;
const FILTERS_IN_EVERY_BRANCH = 2; // type and status

const maxCombinations = (clauseCount) =>
  Math.min(
    MAX_COMBINATIONS,
    Math.floor(
      (MAX_QUERY_FILTERS - SORT_ORDERS) /
        (FILTERS_IN_EVERY_BRANCH + clauseCount),
    ),
  );

const titleCase = (text) =>
  text.replace(
    /(^|[\s-])([a-z])/g,
    (_, before, letter) => before + letter.toUpperCase(),
  );
const sentenceCase = (text) => text.charAt(0).toUpperCase() + text.slice(1);

// "petrol" -> ["petrol", "PETROL", "Petrol"]; "mini truck" also gets
// "Mini Truck" and "Mini truck". The spelling passed in always comes first.
const casingVariants = (value) => {
  const lower = value.toLowerCase();
  return [
    ...new Set([
      value,
      lower,
      value.toUpperCase(),
      titleCase(lower),
      sentenceCase(lower),
    ]),
  ];
};

const bodyTypeValues = (bodyTypeId) => {
  const type = BODY_TYPES.find((t) => t.id === bodyTypeId);
  if (!type) return [];
  return [...new Set(type.aliases.flatMap((alias) => casingVariants(alias)))];
};

// -> [{ field, values }] where values.length === 1 means an equality filter
// and more means `in`.
export const buildServerClauses = (filters) => {
  const clauses = [];
  if (filters.bodyType !== "all") {
    const values = bodyTypeValues(filters.bodyType);
    if (values.length > 0) clauses.push({ field: "bodyType", values });
  }
  if (filters.fuelType) {
    clauses.push({
      field: "fuelType",
      values: casingVariants(filters.fuelType),
    });
  }
  if (filters.transmission) {
    clauses.push({
      field: "transmission",
      values: casingVariants(filters.transmission),
    });
  }

  const combinations = () =>
    clauses.reduce((total, clause) => total * clause.values.length, 1);
  for (
    let i = clauses.length - 1;
    i >= 0 && combinations() > maxCombinations(clauses.length);
    i--
  ) {
    clauses[i] = { ...clauses[i], values: clauses[i].values.slice(0, 1) };
  }
  return clauses;
};

// ---------------------------------------------------------------------------
// Client-side filters, applied to each page the server returns: price range
// (a range filter would force Firestore to sort by price instead of recency
// and need a separate index for every combination) and manufacturer (derived
// from the car's name, which Firestore can't search).
// ---------------------------------------------------------------------------
export const hasClientFilters = ({ minPrice, maxPrice, make }) =>
  minPrice !== "" || maxPrice !== "" || Boolean(make);

export const matchesClientFilters = (car, { minPrice, maxPrice, make }) => {
  if (!matchesMake(car, make)) return false;
  if (minPrice !== "" || maxPrice !== "") {
    const price = Number(car.price);
    if (Number.isNaN(price)) return false;
    if (minPrice !== "" && price < Number(minPrice)) return false;
    if (maxPrice !== "" && price > Number(maxPrice)) return false;
  }
  return true;
};
