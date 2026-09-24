import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { useAuth } from "../../context/useAuth";
import { auth } from "../../firebase/config";
import { getAuthErrorMessage } from "../../utils/authErrors";
import AuthTextField from "../AuthForm/AuthTextField";
import PasswordField from "../AuthForm/PasswordField";

// The one login page for everyone. Whether the account is the admin is
// decided by its email (see AuthContext), not by anything chosen here.
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  // Set instead of `error` when the email doesn't match any account, so we
  // can point the person at Register instead of implying a typo'd password.
  const [noAccountEmail, setNoAccountEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, loading, login, resetPassword } = useAuth();

  // Where to go once signed in: the admin account always lands on the
  // dashboard; everyone else goes back to what they were doing, else home.
  const destination = isAdmin ? "/admin" : (location.state?.from ?? "/");
  const promptMessage = location.state?.message;

  // Already signed in (including right after a successful login).
  if (!loading && user) {
    return <Navigate to={destination} replace />;
  }

  const handleKeepBrowsing = () => {
    navigate("/");
  };

  // Firebase's own error codes for "no such account" (`auth/user-not-found`)
  // only appear when the project has Email Enumeration Protection turned
  // off. With it on (the modern default), both a wrong password and a
  // nonexistent email come back as `auth/invalid-credential`, so we fall
  // back to fetchSignInMethodsForEmail as a best-effort second check. If
  // enumeration protection is on, that call also always returns an empty
  // list, in which case we quietly fall back to the generic message rather
  // than risk telling an existing user their account doesn't exist.
  const looksLikeNoAccount = async (err, trimmedEmail) => {
    if (err?.code === "auth/user-not-found") return true;
    if (err?.code !== "auth/invalid-credential") return false;
    try {
      const methods = await fetchSignInMethodsForEmail(auth, trimmedEmail);
      return methods.length === 0;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");
    setNoAccountEmail("");
    setSubmitting(true);

    const trimmedEmail = email.trim();
    try {
      await login(trimmedEmail, password);
      // The redirect above takes over once auth state updates.
    } catch (err) {
      if (await looksLikeNoAccount(err, trimmedEmail)) {
        setNoAccountEmail(trimmedEmail);
      } else {
        setError(getAuthErrorMessage(err));
      }
      setSubmitting(false);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setNotice("");
    setNoAccountEmail("");
    if (!email.trim()) {
      setError("Enter your email above, then click Forgot Password again.");
      return;
    }
    try {
      await resetPassword(email);
      setNotice("If that email has an account, a reset link is on its way.");
    } catch (err) {
      setError(getAuthErrorMessage(err));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-light px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="m-auto w-full max-w-md space-y-6 rounded-2xl bg-white p-6 shadow-xl sm:p-8"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary">Welcome back</h1>
          <p className="mt-1 text-sm text-neutral">Log in to your account</p>
        </div>

        {promptMessage && (
          <p className="rounded-xl bg-blue-50 p-3 text-center text-sm text-blue-700">
            {promptMessage}
          </p>
        )}

        <div className="space-y-4">
          <AuthTextField
            icon={Mail}
            label="Email"
            type="email"
            value={email}
            placeholder="you@example.com"
            required
            autoComplete="email"
            onChange={(e) => {
              setEmail(e.target.value);
              setNoAccountEmail("");
            }}
          />
          <PasswordField
            label="Password"
            value={password}
            placeholder="Your password"
            required
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}
        {notice && <p className="text-sm text-green-700">{notice}</p>}
        {noAccountEmail && (
          <p
            role="alert"
            className="rounded-xl border border-accent/40 bg-accent/10 p-3 text-sm text-accent-text"
          >
            We couldn't find an account with that email — would you like to{" "}
            <Link
              to="/register"
              state={location.state}
              className="font-semibold underline"
            >
              create one?
            </Link>
          </p>
        )}

        <div className="space-y-3">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="cursor-pointer text-sm font-medium text-primary-light hover:underline"
          >
            Forgot Password?
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="h-14 w-full cursor-pointer rounded-xl bg-primary text-center font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Logging in..." : "Login"}
          </button>
          <button
            type="button"
            className="h-14 w-full cursor-pointer rounded-xl border border-gray-300 font-semibold text-neutral-dark transition-colors hover:bg-gray-50"
            onClick={handleKeepBrowsing}
          >
            Keep Browsing
          </button>
          <p className="text-center text-sm text-neutral">
            Don't have an account?{" "}
            <Link
              to="/register"
              state={location.state}
              className="font-semibold text-primary-light hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
