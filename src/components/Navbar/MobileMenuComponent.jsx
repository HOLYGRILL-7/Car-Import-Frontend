import NavLinks from "./NavLinks";
import AuthSection from "./AuthSection";

// The dropdown under the navbar on small screens: the same links and account
// actions as the desktop bar, stacked. Scrolls if the screen is very short.
const MobileMenuComponent = ({ id, user, isAdmin, onLogout }) => {
  return (
    <div
      id={id}
      className="xl:hidden absolute left-0 right-0 top-full max-h-[calc(100vh-76px)] overflow-y-auto border-t border-white/10 bg-primary-dark px-4 sm:px-6 pb-5 pt-3 shadow-xl"
    >
      <NavLinks stacked />
      <div className="mt-3 border-t border-white/10 pt-3">
        <AuthSection
          stacked
          user={user}
          isAdmin={isAdmin}
          onLogout={onLogout}
        />
      </div>
    </div>
  );
};

export default MobileMenuComponent;
