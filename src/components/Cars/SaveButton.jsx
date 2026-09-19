import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { useWishlist } from "../../context/useWishlist";

const VARIANTS = {
  // Overlaid on a listing card's photo.
  card: {
    base: "absolute top-6 right-6 z-10 p-2 rounded-full shadow-md transition-all cursor-pointer",
    icon: "w-5 h-5",
  },
  // Sits with the other action buttons on the car details page.
  details: {
    base: "p-3 rounded-full backdrop-blur-sm transition-all cursor-pointer",
    icon: "w-5 h-5",
  },
};

// Save / unsave a car. Signed-out visitors are sent to /login instead of
// anything being saved, and returned here afterwards.
const SaveButton = ({ carId, variant = "card" }) => {
  const { isLoggedIn } = useAuth();
  const { isSaved, toggleSave } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  const saved = isLoggedIn && isSaved(carId);
  const styles = VARIANTS[variant];

  const handleClick = async (e) => {
    // The button can sit inside a card that is itself a link.
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      navigate("/login", {
        state: {
          from: `${location.pathname}${location.search}`,
          message: "Log in to save cars to your wishlist.",
        },
      });
      return;
    }

    try {
      await toggleSave(carId);
    } catch (error) {
      console.error("Failed to update saved cars:", error);
      window.alert("Couldn't update your saved cars. Please try again.");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={saved}
      aria-label={saved ? "Remove from saved cars" : "Save this car"}
      title={saved ? "Remove from saved cars" : "Save this car"}
      className={`${styles.base} ${
        saved
          ? "bg-red-500 text-white"
          : "bg-white/80 text-gray-700 hover:bg-white"
      }`}
    >
      <Heart className={`${styles.icon} ${saved ? "fill-current" : ""}`} />
    </button>
  );
};

export default SaveButton;
