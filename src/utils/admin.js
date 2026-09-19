// The single admin account, identified by email. This only controls what the
// UI shows — the real enforcement is in firestore.rules / storage.rules.
export const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL ?? "")
  .trim()
  .toLowerCase();

export const isAdminEmail = (email) =>
  ADMIN_EMAIL !== "" && (email ?? "").trim().toLowerCase() === ADMIN_EMAIL;
