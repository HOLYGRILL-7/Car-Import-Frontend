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
