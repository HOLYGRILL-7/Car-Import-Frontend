// Firebase Auth (email/password). Tracks who's signed in and whether they are
// the admin — the one account whose email matches VITE_ADMIN_EMAIL.
import { createContext, useEffect, useMemo, useState } from "react";
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  verifyPasswordResetCode,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { recordUserProfile } from "../firebase/usersProfile";
import { isAdminEmail } from "../utils/admin";

const AuthContext = createContext(null);

// The slice of the Firebase user the app uses.
const toUser = (firebaseUser) =>
  firebaseUser
    ? {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName || firebaseUser.email?.split("@")[0],
      }
    : null;

const login = async (email, password) => {
  const credential = await signInWithEmailAndPassword(
    auth,
    email.trim(),
    password,
  );
  return toUser(credential.user);
};

const logout = () => signOut(auth);

const resetPassword = (email) => sendPasswordResetEmail(auth, email.trim());

// The two halves of our custom /auth/action page's reset flow: check the
// emailed code is still valid (and get the email it belongs to, so the page
// can show it), then apply the new password once the user confirms it.
const verifyResetCode = (oobCode) => verifyPasswordResetCode(auth, oobCode);
const confirmReset = (oobCode, newPassword) =>
  confirmPasswordReset(auth, oobCode, newPassword);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(
    () =>
      onAuthStateChanged(auth, (firebaseUser) => {
        setUser(toUser(firebaseUser));
        setLoading(false);
        // Best effort: a failure here must never get in the way of signing in.
        if (firebaseUser) {
          recordUserProfile(firebaseUser).catch((error) =>
            console.warn("Couldn't record the user profile:", error),
          );
        }
      }),
    [],
  );

  const register = async (name, email, password) => {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email.trim(),
      password,
    );
    await updateProfile(credential.user, { displayName: name.trim() });
    // onAuthStateChanged already fired with the pre-displayName user.
    const registered = toUser(auth.currentUser);
    setUser(registered);
    return registered;
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isLoggedIn: user !== null,
      isAdmin: isAdminEmail(user?.email),
      login,
      logout,
      resetPassword,
      verifyResetCode,
      confirmReset,
      register,
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Export the context itself so useAuth can use it
export default AuthContext;
