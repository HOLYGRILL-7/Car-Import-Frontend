import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

// Fetches a single car by its Firestore document ID. `car` is null when the
// document doesn't exist.
export const useCar = (id) => {
  const [result, setResult] = useState({ id: null, car: null, error: null });

  useEffect(() => {
    let cancelled = false;

    getDoc(doc(db, "cars", id))
      .then((snapshot) => {
        if (cancelled) return;
        const car = snapshot.exists()
          ? { id: snapshot.id, ...snapshot.data() }
          : null;
        setResult({ id, car, error: null });
      })
      .catch((error) => {
        if (cancelled) return;
        console.error("Failed to fetch car:", error);
        setResult({ id, car: null, error });
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { car: result.car, loading: result.id !== id, error: result.error };
};
