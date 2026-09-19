// Marks the admin account's email as verified (console-created accounts start
// unverified), so rules can require request.auth.token.email_verified.
// Usage: node --env-file=.env verify-admin.js [email]
//   (defaults to VITE_ADMIN_EMAIL; needs serviceAccountKey.json in the root)
import { readFileSync } from "node:fs";
import process from "node:process";
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const email = process.argv[2] ?? process.env.VITE_ADMIN_EMAIL;
if (!email) {
  console.error("No email given and VITE_ADMIN_EMAIL is empty in .env.");
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

async function verify() {
  const auth = getAuth();
  const user = await auth.getUserByEmail(email);
  if (user.emailVerified) {
    console.log(`Already verified: ${user.email}`);
    return;
  }
  await auth.updateUser(user.uid, { emailVerified: true });
  console.log(`Verified: ${user.email}`);
}

verify()
  .then(() => process.exit(0))
  .catch((err) => {
    if (err.code === "auth/user-not-found") {
      console.error(
        `No account for ${email}. Create it first: Firebase console > Authentication > Users > Add user.`,
      );
    } else {
      console.error("Failed:", err.message);
    }
    process.exit(1);
  });
