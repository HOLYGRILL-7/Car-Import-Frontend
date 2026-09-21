// Customer testimonials, stored in the "testimonials" collection:
//   { customerName: string, quote: string, rating: number (1-5),
//     date: timestamp, featured: boolean }
// Anyone can read them; only the admin account can write (firestore.rules).
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./config";

// Enough for a dealership's reviews page; see fetchFeaturedTestimonials.
const MAX_FEATURED = 100;

const toTestimonial = (snapshot) => {
  const data = snapshot.data();
  return {
    id: snapshot.id,
    customerName: data.customerName ?? "",
    quote: data.quote ?? "",
    rating: Number(data.rating) || 0,
    date: data.date?.toDate?.() ?? null,
    featured: data.featured !== false,
  };
};

const newestFirst = (items) =>
  items.sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0));

// The featured testimonials, newest first: what the public Reviews page shows.
// One equality filter needs no composite index, so sorting happens here
// instead of with orderBy.
export const fetchFeaturedTestimonials = async () => {
  const snapshot = await getDocs(
    query(
      collection(db, "testimonials"),
      where("featured", "==", true),
      limit(MAX_FEATURED),
    ),
  );
  return newestFirst(snapshot.docs.map(toTestimonial));
};

// Every testimonial, featured or not, newest first: the admin's list.
export const fetchAllTestimonials = async () => {
  const snapshot = await getDocs(collection(db, "testimonials"));
  return newestFirst(snapshot.docs.map(toTestimonial));
};

const toDocument = ({ customerName, quote, rating, date, featured }) => ({
  customerName,
  quote,
  rating,
  date: Timestamp.fromDate(date),
  featured,
});

export const addTestimonial = (fields) =>
  addDoc(collection(db, "testimonials"), toDocument(fields));

export const updateTestimonial = (id, fields) =>
  updateDoc(doc(db, "testimonials", id), toDocument(fields));

export const deleteTestimonial = (id) =>
  deleteDoc(doc(db, "testimonials", id));
