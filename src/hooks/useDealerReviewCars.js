import { useEffect, useState } from "react";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

const MAX_CARS = 50;

const hasReview = (car) =>
  typeof car.dealerReviewText === "string" && car.dealerReviewText.trim() !== "";

// Cars flagged isDealerChoice === true that also have the dealer's own written
// review (dealerReviewText), newest first. Firestore can't filter on "text is
// not empty" without a composite index, so only the flag is queried and the
// review check and the sorting happen here.
export const useDealerReviewCars = () => {
  const [result, setResult] = useState({ done: false, cars: [], error: null });

  useEffect(() => {
    let cancelled = false;

    getDocs(
      query(
        collection(db, "cars"),
        where("isDealerChoice", "==", true),
        limit(MAX_CARS),
      ),
    )
      .then((snapshot) => {
        if (cancelled) return;
        const cars = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter(hasReview)
          .sort(
            (a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0),
          );
        setResult({ done: true, cars, error: null });
      })
      .catch((error) => {
        console.error("Failed to fetch dealer reviews:", error);
        if (!cancelled) setResult({ done: true, cars: [], error });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { cars: result.cars, loading: !result.done, error: result.error };
};
