// Copies every Firebase Auth account (email + creation date) into the
// Firestore "users" collection, which is what the admin's Manage Users page
// and dashboard count read. New accounts are recorded by the app itself the
// first time they sign in; run this once to bring in the ones that existed
// before that was added. Safe to re-run: it only rewrites the same two fields.
// Usage: node sync-users.js   (needs serviceAccountKey.json in the project root)
import { readFileSync } from "node:fs";
import process from "node:process";
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

// Against the Firebase emulators (FIREBASE_AUTH_EMULATOR_HOST and
// FIRESTORE_EMULATOR_HOST set) no credentials are needed.
if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
  initializeApp({ projectId: process.env.GCLOUD_PROJECT ?? "demo-cars" });
} else {
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
}

const auth = getAuth();
const db = getFirestore();

async function sync() {
  let written = 0;
  let skipped = 0;
  let pageToken;

  do {
    const page = await auth.listUsers(1000, pageToken);
    const batch = db.batch();
    for (const user of page.users) {
      if (!user.email) {
        skipped++; // no email to show (e.g. a phone-only account)
        continue;
      }
      batch.set(db.collection("users").doc(user.uid), {
        email: user.email,
        createdAt: Timestamp.fromDate(new Date(user.metadata.creationTime)),
      });
      written++;
    }
    await batch.commit();
    pageToken = page.pageToken;
  } while (pageToken);

  console.log(
    `Synced ${written} account${written === 1 ? "" : "s"}` +
      (skipped ? `; skipped ${skipped} without an email.` : "."),
  );
}

sync()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Failed:", err.message);
    process.exit(1);
  });
