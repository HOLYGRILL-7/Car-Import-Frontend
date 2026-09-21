// Manufacturers offered on the homepage's "Browse by manufacturer" list.
// Cars don't store a separate make, so it's read from the car's name (e.g.
// "Toyota Land Cruiser Prado" -> Toyota). A `make` field on a car, if one is
// ever added, takes priority over the name.
const MAKES = [
  { id: "toyota", label: "Toyota", aliases: ["toyota"] },
  { id: "kia", label: "Kia", aliases: ["kia"] },
  { id: "daewoo", label: "Daewoo", aliases: ["daewoo"] },
  { id: "nissan", label: "Nissan", aliases: ["nissan"] },
  { id: "chevrolet", label: "Chevrolet", aliases: ["chevrolet", "chevy"] },
];

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// A make id that isn't in MAKES (e.g. typed into the URL) still works: it
// matches cars with that word in their name.
export const getMake = (id) =>
  MAKES.find((make) => make.id === id) ?? {
    id,
    label: id.charAt(0).toUpperCase() + id.slice(1),
    aliases: [id.toLowerCase()],
  };

export const matchesMake = (car, makeId) => {
  if (!makeId) return true;
  const { aliases } = getMake(makeId);
  const source =
    typeof car.make === "string" && car.make.trim() ? car.make : car.name;
  return aliases.some((alias) =>
    new RegExp(`\\b${escapeRegExp(alias)}\\b`, "i").test(source ?? ""),
  );
};
