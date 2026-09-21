import { Menu, X } from "lucide-react";

// The hamburger that opens the mobile menu (shown below the xl breakpoint).
const MobileMenuButton = ({ open, onClick, controls }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls={controls}
      aria-label={open ? "Close menu" : "Open menu"}
      className="xl:hidden -mr-2 flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-white hover:bg-white/10"
    >
      {open ? (
        <X className="h-7 w-7" aria-hidden="true" />
      ) : (
        <Menu className="h-7 w-7" aria-hidden="true" />
      )}
    </button>
  );
};

export default MobileMenuButton;
