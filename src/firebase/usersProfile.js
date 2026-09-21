// Firebase Auth's user list can't be read from a browser (only the Admin SDK
// can), so each account's email and sign-up date is copied to users/{uid} the
// first time it signs in. The admin's Manage Users page and dashboard count
// read those documents. sync-users.js imports accounts that already exist.
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";
import { isAdminEmail } from "../utils/admin";

// No-op when the profile already exists, so signing in costs one read.
export const recordUserProfile = async (firebaseUser) => {
  const ref = doc(db, "users", firebaseUser.uid);
  if ((await getDoc(ref)).exists()) return;

  await setDoc(ref, {
    email: firebaseUser.email,
    createdAt: Timestamp.fromDate(new Date(firebaseUser.metadata.creationTime)),
  });
};

// Every recorded user, newest account first. Admin-only (Firestore rules).
export const fetchUsers = async () => {
  const snapshot = await getDocs(collection(db, "users"));
  return snapshot.docs
    .map((d) => ({
      id: d.id,
      email: d.data().email ?? "",
      createdAt: d.data().createdAt?.toDate() ?? null,
    }))
    .sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0));
};

// The dashboard's "Registered users": real customer accounts only, so the
// admin's own profile (matched by email, like everywhere else) isn't counted.
export const countUsers = async () =>
  (await fetchUsers()).filter((user) => !isAdminEmail(user.email)).length;
