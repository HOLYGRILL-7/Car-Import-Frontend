// Seeds the Firestore "cars" collection from cars.json.
// Usage: node seed.js   (needs serviceAccountKey.json in the project root)
import { readFileSync } from "node:fs";
import process from "node:process";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

const readJson = (path) => JSON.parse(readFileSync(new URL(path, import.meta.url)));

let serviceAccount;
try {
  serviceAccount = readJson("./serviceAccountKey.json");
} catch (err) {
  console.error(
    "Could not read serviceAccountKey.json in the project root.\n" +
      "Firebase console > Project settings > Service accounts > Generate new private key.\n" +
      `(${err.message})`,
  );
  process.exit(1);
}
const cars = readJson("./cars.json");

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

// Deterministic doc IDs (slug of the name) make re-running the seed update the
// existing docs instead of creating duplicates.
const slugify = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

async function seed() {
  for (const car of cars) {
    await db
      .collection("cars")
      .doc(slugify(car.name))
      .set({
        ...car,
        createdAt: FieldValue.serverTimestamp(),
      });
    console.log(`Saved: ${car.name}`);
  }
  console.log("Done.");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  });
