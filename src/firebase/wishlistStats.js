// How many wishlists hold each car, across every user. Admin-only: it reads
// all users' users/{uid}/wishlist/{carId} documents with one collection-group
// query (the admin rule in firestore.rules allows exactly that). A wishlist
// document's ID is the car's ID, so counting IDs counts saves.
//
// This downloads one small document per saved car (not per car listing), which
// is fine for a dealership's traffic. If saves ever reach the many thousands,
// switch to a wishlistCount field on each car kept up to date by a Cloud
// Function; that needs the Blaze plan, which is why it isn't used here.
import { collectionGroup, getDocs } from "firebase/firestore";
import { db } from "./config";

export const fetchWishlistCounts = async () => {
  const snapshot = await getDocs(collectionGroup(db, "wishlist"));
  const counts = new Map();
  for (const d of snapshot.docs) counts.set(d.id, (counts.get(d.id) ?? 0) + 1);
  return counts;
};
