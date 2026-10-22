// Rebuilds public/sitemap.xml: the fixed pages plus one URL per available car.
// Cars are public-read, so this uses the web SDK and the site's own config;
// no service account needed.
// Usage: node --env-file=.env generate-sitemap.js
// Re-run after adding, selling or removing cars, then commit and deploy.
import { writeFileSync } from "node:fs";
import process from "node:process";
import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  terminate,
  where,
} from "firebase/firestore";

const SITE_URL = "https://extra-motors.vercel.app";

// The public pages worth indexing (login, wishlist, admin are left out).
const FIXED_PAGES = [
  "/",
  "/newCars",
  "/usedCars",
  "/services",
  "/reviews",
  "/faq",
  "/contact",
  "/about",
  "/about/team",
  "/about/press",
];

const projectId = process.env.VITE_FIREBASE_PROJECT_ID;
if (!projectId) {
  console.error("VITE_FIREBASE_PROJECT_ID is empty. Run with --env-file=.env.");
  process.exit(1);
}

const app = initializeApp({
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  projectId,
});
const db = getFirestore(app);

const escapeXml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (ch) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[ch],
  );

const urlEntry = (path, lastmod) =>
  [
    "  <url>",
    `    <loc>${escapeXml(SITE_URL + path)}</loc>`,
    ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
    "  </url>",
  ].join("\n");

async function generate() {
  const snapshot = await getDocs(
    query(collection(db, "cars"), where("status", "==", "available")),
  );
  const cars = snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.get("name"),
    lastmod: doc.get("createdAt")?.toDate().toISOString().slice(0, 10),
  }));

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...FIXED_PAGES.map((path) => urlEntry(path)),
    ...cars.map((car) =>
      urlEntry(`/carDetails/${encodeURIComponent(car.id)}`, car.lastmod),
    ),
    "</urlset>",
    "",
  ].join("\n");

  writeFileSync(new URL("./public/sitemap.xml", import.meta.url), xml);
  for (const car of cars) console.log(`Car: ${car.name} (${car.id})`);
  console.log(
    `Wrote public/sitemap.xml: ${FIXED_PAGES.length} pages + ${cars.length} car(s).`,
  );
}

generate()
  .then(() => terminate(db))
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Failed:", err.message);
    process.exit(1);
  });
