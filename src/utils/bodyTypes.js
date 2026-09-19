// Body types offered by the filter buttons on the listing pages. A car's
// `bodyType` is free text in the admin form, so each type lists the spellings
// that count as a match (compared case-insensitively).
export const BODY_TYPES = [
  { id: "suv", label: "SUV", aliases: ["suv", "suvs", "crossover"] },
  {
    id: "saloon",
    label: "Sedan",
    aliases: ["saloon", "saloons", "sedan", "sedans"],
  },
  {
    id: "hatchback",
    label: "Hatchback",
    aliases: ["hatchback", "hatchbacks", "hatch"],
  },
  {
    id: "mini-truck",
    label: "Mini Truck",
    aliases: [
      "mini truck",
      "mini-truck",
      "minitruck",
      "pickup",
      "pick-up",
      "pickup truck",
    ],
  },
  {
    id: "big-truck",
    label: "Big Truck",
    aliases: ["big truck", "big-truck", "bigtruck", "truck", "lorry"],
  },
];

const normalize = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

// `typeId` is a BODY_TYPES id, or "all" for no filtering.
export const matchesBodyType = (car, typeId) => {
  if (typeId === "all") return true;
  const type = BODY_TYPES.find((t) => t.id === typeId);
  return type !== undefined && type.aliases.includes(normalize(car.bodyType));
};
