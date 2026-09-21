// The single admin account, identified by email. This only controls what the
// UI shows — the real enforcement is in firestore.rules / storage.rules.
const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL ?? "")
  .trim()
  .toLowerCase();

// How the admin panel greets the (single) admin. The Auth account has no
// display name set, so this is fixed here rather than taken from the email.
export const ADMIN_DISPLAY_NAME = "Bismark";

export const isAdminEmail = (email) =>
  ADMIN_EMAIL !== "" && (email ?? "").trim().toLowerCase() === ADMIN_EMAIL;
