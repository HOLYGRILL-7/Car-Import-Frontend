// "12 Sep 2026" in the visitor's locale; "—" when there's no date.
export const formatDate = (date) =>
  date
    ? date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";
