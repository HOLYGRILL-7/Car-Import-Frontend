const NEW_ARRIVAL_DAYS = 14;

const createdSeconds = (car) => car.createdAt?.seconds ?? 0;

// A "new arrival" was added within the last NEW_ARRIVAL_DAYS days. If there
// are none, fall back to the most recent cars overall so the section is never
// empty. Either way: newest first, at most `max`.
export const pickNewArrivals = (
  cars,
  { max = 8, days = NEW_ARRIVAL_DAYS, now = Date.now() } = {},
) => {
  const newestFirst = [...cars].sort(
    (a, b) => createdSeconds(b) - createdSeconds(a),
  );
  const cutoff = now / 1000 - days * 24 * 60 * 60;
  const recent = newestFirst.filter((car) => createdSeconds(car) >= cutoff);
  return (recent.length > 0 ? recent : newestFirst).slice(0, max);
};
