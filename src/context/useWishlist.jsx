import { useContext } from "react";
import WishlistContext from "./WishlistContext";

// Custom hook to use the wishlist context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
};
