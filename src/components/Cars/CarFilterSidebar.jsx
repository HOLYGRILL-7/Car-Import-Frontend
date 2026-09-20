import React, { useId, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import MakeFilterChip from "./MakeFilterChip";
import { useCars } from "../../hooks/useCars";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { useMakeFilter } from "../../hooks/useMakeFilter";
import { BODY_TYPES } from "../../utils/bodyTypes";
import {
  EMPTY_FILTERS,
  FUEL_TYPES,
  TRANSMISSIONS,
  countActiveFilters,
} from "../../utils/carFilters";

const BODY_OPTIONS = [{ id: "all", label: "All" }, ...BODY_TYPES];

const fieldClass =
  "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-light";

const Section = ({ title, children }) => (
  <div>
    <h3 className="text-sm font-semibold text-primary mb-2">{title}</h3>
    {children}
  </div>
);

const Dropdown = ({ label, value, options, onChange }) => (
  <Section title={label}>
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={fieldClass}
    >
      <option value="">Any</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </Section>
);

const INDEX_MISSING_MESSAGE =
  "This filter combination isn't available yet — it needs a database index that hasn't been created.";
const GENERIC_ERROR_MESSAGE =
  "Couldn't load cars right now. Please try again later.";

// Filter sidebar shared by the Used Cars and New Cars pages. Give it the
// page's `type` ("used" | "new"); it owns the filter state AND runs the query:
// every filter change starts a fresh Firestore query over the whole
// collection (see useCars), and `children(result)` is called with what came
// back — { cars, loading, error, errorMessage, hasMore, loadingMore,
// loadMoreError, loadMore, hasActiveFilters } — so the page just renders it.
// The manufacturer set by the homepage links (?make=toyota) is one of the
// filters. Desktop: a column on the left. Mobile: behind a "Filters" toggle.
const CarFilterSidebar = ({ type, children }) => {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [open, setOpen] = useState(false);
  const { make, makeLabel, clearMake } = useMakeFilter();
  const panelId = useId();

  // Typing a price shouldn't query on every keystroke; clearing one is instant.
  const debouncedMin = useDebouncedValue(filters.minPrice);
  const debouncedMax = useDebouncedValue(filters.maxPrice);
  const result = useCars(type, {
    ...filters,
    minPrice: filters.minPrice === "" ? "" : debouncedMin,
    maxPrice: filters.maxPrice === "" ? "" : debouncedMax,
    make,
  });
  const { cars, loading, error, hasMore } = result;

  const activeCount = countActiveFilters(filters, make);
  const setFilter = (name, value) =>
    setFilters((prev) => ({ ...prev, [name]: value }));
  const clearFilters = () => {
    setFilters(EMPTY_FILTERS);
    clearMake();
  };

  const errorMessage =
    error?.code === "failed-precondition"
      ? INDEX_MISSING_MESSAGE
      : GENERIC_ERROR_MESSAGE;

  const minPrice = Number(filters.minPrice);
  const maxPrice = Number(filters.maxPrice);
  const priceRangeBackwards =
    filters.minPrice !== "" && filters.maxPrice !== "" && minPrice > maxPrice;

  return (
    <div className="lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-8">
      <div>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={panelId}
          className="lg:hidden mb-4 inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-primary cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeCount > 0 && (
            <span className="rounded-full bg-primary px-2 text-xs text-white">
              {activeCount}
            </span>
          )}
        </button>

        <aside
          id={panelId}
          aria-label={`Filter ${type} cars`}
          className={`${
            open ? "block" : "hidden"
          } lg:block mb-6 lg:mb-0 space-y-6 rounded-2xl bg-white p-5 shadow lg:sticky lg:top-28`}
        >
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-bold text-primary">Filters</h2>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm text-accent hover:underline cursor-pointer"
              >
                Clear all
              </button>
            )}
          </div>
          <p className="-mt-4 text-sm text-neutral">
            {loading
              ? "Searching..."
              : error
                ? "Search failed"
                : `${cars.length}${hasMore ? "+" : ""} ${type} ${
                    cars.length === 1 && !hasMore ? "car" : "cars"
                  }`}
          </p>

          {make && <MakeFilterChip label={makeLabel} onClear={clearMake} />}

          <Section title="Body style">
            <div role="radiogroup" aria-label="Body style" className="space-y-1.5">
              {BODY_OPTIONS.map(({ id, label }) => (
                <label
                  key={id}
                  className="flex items-center gap-2 text-sm text-neutral-dark cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`${type}-body-style`}
                    value={id}
                    checked={filters.bodyType === id}
                    onChange={() => setFilter("bodyType", id)}
                  />
                  {label}
                </label>
              ))}
            </div>
          </Section>

          <Section title="Price range (USD)">
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                inputMode="numeric"
                placeholder="Min"
                aria-label="Minimum price"
                value={filters.minPrice}
                onChange={(e) => setFilter("minPrice", e.target.value)}
                className={fieldClass}
              />
              <span className="text-neutral">–</span>
              <input
                type="number"
                min="0"
                inputMode="numeric"
                placeholder="Max"
                aria-label="Maximum price"
                value={filters.maxPrice}
                onChange={(e) => setFilter("maxPrice", e.target.value)}
                className={fieldClass}
              />
            </div>
            {priceRangeBackwards && (
              <p className="mt-1 text-xs text-red-600">
                Minimum is higher than maximum.
              </p>
            )}
          </Section>

          <Dropdown
            label="Fuel type"
            value={filters.fuelType}
            options={FUEL_TYPES}
            onChange={(value) => setFilter("fuelType", value)}
          />
          <Dropdown
            label="Transmission"
            value={filters.transmission}
            options={TRANSMISSIONS}
            onChange={(value) => setFilter("transmission", value)}
          />
        </aside>
      </div>

      <div className="min-w-0">
        {!loading && !error && cars.length === 0 && activeCount > 0 && (
          <div className="my-10 text-center text-neutral">
            <p>
              {hasMore
                ? "No matches among the newest cars yet — use Load More to keep searching."
                : `No ${type} cars match these filters.`}
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-2 text-accent hover:underline cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        )}
        {children({ ...result, errorMessage, hasActiveFilters: activeCount > 0 })}
      </div>
    </div>
  );
};

export default CarFilterSidebar;
