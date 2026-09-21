// Numbers for the admin dashboard, computed from the full list of car
// documents (see fetchAllCars) so every figure comes from the same data.

const TYPES = ["used", "new"];
export const STATUSES = ["available", "reserved", "sold"];

// Cars are counted by type and status; anything outside the known values
// (hand-edited documents) lands in "other" instead of silently vanishing.
const bucket = (value, known) => (known.includes(value) ? value : "other");

const emptyRow = () => ({
  available: 0,
  reserved: 0,
  sold: 0,
  other: 0,
  total: 0,
});

export const computeCarStats = (cars) => {
  const byTypeStatus = { used: emptyRow(), new: emptyRow(), other: emptyRow() };
  const byStatus = emptyRow();
  let dealerChoice = 0;
  let dealerChoiceLive = 0;

  for (const car of cars) {
    const row = byTypeStatus[bucket(car.type, TYPES)];
    const status = bucket(car.status, STATUSES);
    row[status]++;
    row.total++;
    byStatus[status]++;
    byStatus.total++;

    if (car.isDealerChoice === true) {
      dealerChoice++;
      // The Home page only shows flagged cars that are still available.
      if (car.status === "available") dealerChoiceLive++;
    }
  }

  return {
    total: cars.length,
    byTypeStatus,
    byStatus,
    byType: {
      used: byTypeStatus.used.total,
      new: byTypeStatus.new.total,
      other: byTypeStatus.other.total,
    },
    dealerChoice,
    dealerChoiceLive,
  };
};

// The `count` newest cars (input is already newest first, as fetchAllCars
// returns it, but sort here so this stands on its own).
export const recentCars = (cars, count = 5) =>
  [...cars]
    .sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0))
    .slice(0, count);

// `saveCounts` maps carId -> number of wishlists holding it. Only cars that
// still exist are ranked (saves of deleted cars are ignored); ties go to the
// newer car, then the name, so the order is stable.
export const mostWishlisted = (cars, saveCounts, count = 5) =>
  cars
    .map((car) => ({ car, saves: saveCounts.get(car.id) ?? 0 }))
    .filter(({ saves }) => saves > 0)
    .sort(
      (a, b) =>
        b.saves - a.saves ||
        (b.car.createdAt?.seconds ?? 0) - (a.car.createdAt?.seconds ?? 0) ||
        String(a.car.name).localeCompare(String(b.car.name)),
    )
    .slice(0, count);
