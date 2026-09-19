import { matchesBodyType } from "./bodyTypes";
import { matchesMake } from "./makes";

export const EMPTY_FILTERS = {
  bodyType: "all",
  minPrice: "",
  maxPrice: "",
  fuelType: "",
  transmission: "",
};

const normalize = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

// The distinct values a text field takes across `cars` (e.g. every fuelType
// in use), compared case-insensitively — the first spelling seen is kept —
// and sorted. Used to populate the dropdowns.
export const distinctValues = (cars, field) => {
  const seen = new Map();
  for (const car of cars) {
    const value = typeof car[field] === "string" ? car[field].trim() : "";
    if (value && !seen.has(value.toLowerCase())) {
      seen.set(value.toLowerCase(), value);
    }
  }
  return [...seen.values()].sort((a, b) => a.localeCompare(b));
};

const toBound = (value) => (value === "" ? null : Number(value));

// Every filter must match (they combine). `make` is the ?make= URL filter set
// by the homepage's manufacturer links.
export const applyCarFilters = (cars, filters, make) => {
  const min = toBound(filters.minPrice);
  const max = toBound(filters.maxPrice);

  return cars.filter((car) => {
    if (!matchesMake(car, make)) return false;
    if (!matchesBodyType(car, filters.bodyType)) return false;

    if (min !== null || max !== null) {
      const price = Number(car.price);
      if (Number.isNaN(price)) return false;
      if (min !== null && price < min) return false;
      if (max !== null && price > max) return false;
    }

    if (
      filters.fuelType &&
      normalize(car.fuelType) !== normalize(filters.fuelType)
    ) {
      return false;
    }
    if (
      filters.transmission &&
      normalize(car.transmission) !== normalize(filters.transmission)
    ) {
      return false;
    }
    return true;
  });
};

export const countActiveFilters = (filters, make) =>
  [
    make,
    filters.bodyType !== "all",
    filters.minPrice !== "" || filters.maxPrice !== "",
    filters.fuelType,
    filters.transmission,
  ].filter(Boolean).length;
