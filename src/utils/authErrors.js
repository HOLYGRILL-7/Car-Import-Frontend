const MESSAGES = {
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/user-not-found": "Incorrect email or password.",
  "auth/wrong-password": "Incorrect email or password.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/email-already-in-use":
    "An account with this email already exists. Try logging in instead.",
  "auth/weak-password": "Password must be at least 6 characters.",
  "auth/too-many-requests":
    "Too many attempts. Please wait a moment and try again.",
  "auth/network-request-failed":
    "Network error. Check your connection and try again.",
  "auth/operation-not-allowed":
    "Email/password sign-in isn't enabled for this site yet.",
  "auth/configuration-not-found":
    "Sign-in isn't set up for this site yet. Please try again later.",
};

export const getAuthErrorMessage = (error) =>
  MESSAGES[error?.code] ?? "Something went wrong. Please try again.";
