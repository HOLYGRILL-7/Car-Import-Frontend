// A signed-in user's saved cars, stored at users/{uid}/wishlist/{carId}.
// One shared listener feeds every save button on the page.
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "./useAuth";

const WishlistContext = createContext(null);

const wishlistDoc = (uid, carId) => doc(db, "users", uid, "wishlist", carId);

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const uid = user?.uid ?? null;

  // Keyed by uid so nothing from a previous account can leak through.
  const [state, setState] = useState({ uid: null, ids: [], error: false });

  useEffect(() => {
    if (!uid) return;

    const savedQuery = query(
      collection(db, "users", uid, "wishlist"),
      orderBy("savedAt", "desc"),
    );
    return onSnapshot(
      savedQuery,
      (snapshot) =>
        setState({ uid, ids: snapshot.docs.map((d) => d.id), error: false }),
      (error) => {
        console.error("Failed to load saved cars:", error);
        setState({ uid, ids: [], error: true });
      },
    );
  }, [uid]);

  const savedIds = useMemo(
    () => (state.uid === uid ? state.ids : []),
    [state, uid],
  );
  const loading = uid !== null && state.uid !== uid;
  const error = state.uid === uid && state.error;

  const value = useMemo(() => {
    const saved = new Set(savedIds);
    return {
      savedIds,
      loading,
      error,
      isSaved: (carId) => saved.has(carId),
    };
  }, [savedIds, loading, error]);

  const toggleSave = useCallback(
    async (carId) => {
      if (!uid) throw new Error("Sign in to save cars.");
      const ref = wishlistDoc(uid, carId);
      if (savedIds.includes(carId)) {
        await deleteDoc(ref);
      } else {
        await setDoc(ref, { carId, savedAt: serverTimestamp() });
      }
    },
    [uid, savedIds],
  );

  const unsave = useCallback(
    (carId) => (uid ? deleteDoc(wishlistDoc(uid, carId)) : Promise.resolve()),
    [uid],
  );

  return (
    <WishlistContext.Provider value={{ ...value, toggleSave, unsave }}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;
