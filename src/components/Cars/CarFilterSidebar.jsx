import React, { useId, useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import MakeFilterChip from "./MakeFilterChip";
import { useMakeFilter } from "../../hooks/useMakeFilter";
import { BODY_TYPES } from "../../utils/bodyTypes";
import {
  EMPTY_FILTERS,
  applyCarFilters,
  countActiveFilters,
  distinctValues,
} from "../../utils/carFilters";

const BODY_OPTIONS = [{ id: "all", label: "All" }, ...BODY_TYPES];

const fieldClass =
  "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-light disabled:bg-gray-100 disabled:text-gray-400";

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
      disabled={options.length === 0}
      className={fieldClass}
    >
      <option value="">{options.length === 0 ? "None listed yet" : "Any"}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </Section>
);

// Filter sidebar shared by the Used Cars and New Cars pages. Give it the
// page's loaded `cars` and its `type` ("used" | "new"); it owns all filter
// state and calls `children(visibleCars)` with the cars that match every
// filter, so the page just renders them. Filters combine, apply in place, and
// the manufacturer set by the homepage links (?make=toyota) is one of them.
// Desktop: a column on the left. Mobile: behind a "Filters" toggle.
const CarFilterSidebar = ({ cars, type, children }) => {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [open, setOpen] = useState(false);
  const { make, makeLabel, clearMake } = useMakeFilter();
  const panelId = useId();

  const visibleCars = useMemo(
    () => applyCarFilters(cars, filters, make),
    [cars, filters, make],
  );
  const fuelOptions = useMemo(() => distinctValues(cars, "fuelType"), [cars]);
  const transmissionOptions = useMemo(
    () => distinctValues(cars, "transmission"),
    [cars],
  );

  const activeCount = countActiveFilters(filters, make);
  const setFilter = (name, value) =>
    setFilters((prev) => ({ ...prev, [name]: value }));
  const clearFilters = () => {
    setFilters(EMPTY_FILTERS);
    clearMake();
  };

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
            {visibleCars.length} of {cars.length} {type}{" "}
            {cars.length === 1 ? "car" : "cars"}
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
            options={fuelOptions}
            onChange={(value) => setFilter("fuelType", value)}
          />
          <Dropdown
            label="Transmission"
            value={filters.transmission}
            options={transmissionOptions}
            onChange={(value) => setFilter("transmission", value)}
          />
        </aside>
      </div>

      <div className="min-w-0">
        {cars.length > 0 && visibleCars.length === 0 && (
          <div className="my-10 text-center text-neutral">
            <p>No {type} cars match these filters.</p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-2 text-accent hover:underline cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        )}
        {children(visibleCars)}
      </div>
    </div>
  );
};

export default CarFilterSidebar;
