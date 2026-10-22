// One-off: sets Cache-Control on every car photo already in Storage under
// cars/, matching what the admin form now sets on new uploads. Only that one
// metadata field changes; download tokens (and so the photo URLs) are kept.
// Usage: node --env-file=.env set-photo-cache.js [--dry-run]
//   (reads VITE_FIREBASE_STORAGE_BUCKET; needs serviceAccountKey.json in the root)
import { readFileSync } from "node:fs";
import process from "node:process";
import { initializeApp, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

const CACHE_CONTROL = "public, max-age=31536000";
const dryRun = process.argv.includes("--dry-run");

const bucketName = process.env.VITE_FIREBASE_STORAGE_BUCKET;
if (!bucketName) {
  console.error(
    "VITE_FIREBASE_STORAGE_BUCKET is empty. Run with --env-file=.env.",
  );
  process.exit(1);
}

let serviceAccount;
try {
  serviceAccount = JSON.parse(
    readFileSync(new URL("./serviceAccountKey.json", import.meta.url)),
  );
} catch (err) {
  console.error(`Could not read serviceAccountKey.json: ${err.message}`);
  process.exit(1);
}

initializeApp({ credential: cert(serviceAccount) });

async function run() {
  const [files] = await getStorage()
    .bucket(bucketName)
    .getFiles({ prefix: "cars/" });
  let changed = 0;

  for (const file of files) {
    if (file.name.endsWith("/")) continue; // folder placeholder
    if (file.metadata.cacheControl === CACHE_CONTROL) {
      console.log(`Already set: ${file.name}`);
      continue;
    }
    if (!dryRun) await file.setMetadata({ cacheControl: CACHE_CONTROL });
    console.log(`${dryRun ? "Would set" : "Set"}: ${file.name}`);
    changed++;
  }

  console.log(
    `${files.length} file(s) under cars/, ${changed} ${dryRun ? "to update (dry run, nothing changed)" : "updated"}.`,
  );
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Failed:", err.message);
    process.exit(1);
  });
