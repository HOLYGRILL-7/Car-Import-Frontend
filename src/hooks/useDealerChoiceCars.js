import { useEffect, useState } from "react";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

const MAX_CARS = 50;

// Available cars flagged isDealerChoice === true, newest first. Two equality
// filters need no composite index, so sorting happens here instead of with
// orderBy. Cars without the field count as not flagged.
export const useDealerChoiceCars = () => {
  const [result, setResult] = useState({
    done: false,
    cars: [],
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    getDocs(
      query(
        collection(db, "cars"),
        where("isDealerChoice", "==", true),
        where("status", "==", "available"),
        limit(MAX_CARS),
      ),
    )
      .then((snapshot) => {
        if (cancelled) return;
        const cars = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .sort(
            (a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0),
          );
        setResult({ done: true, cars, error: null });
      })
      .catch((error) => {
        if (cancelled) return;
        console.error("Failed to fetch Dealer's Choice cars:", error);
        setResult({ done: true, cars: [], error });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { cars: result.cars, loading: !result.done, error: result.error };
};
