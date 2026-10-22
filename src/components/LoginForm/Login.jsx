import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { getAuthErrorMessage } from "../../utils/authErrors";
import AuthTextField from "../AuthForm/AuthTextField";
import PasswordField from "../AuthForm/PasswordField";
import PageMeta from "../PageMeta";

// The one login page for everyone. Whether the account is the admin is
// decided by its email (see AuthContext), not by anything chosen here.
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
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

  // A wrong password and an unknown email both show "Incorrect email or
  // password." (see authErrors.js): with Email Enumeration Protection on,
  // Firebase can't tell them apart anyway.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");
    setSubmitting(true);

    try {
      await login(email.trim(), password);
      // The redirect above takes over once auth state updates.
    } catch (err) {
      setError(getAuthErrorMessage(err));
      setSubmitting(false);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setNotice("");
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
      <PageMeta title="Log In | Extra Motors" noindex />
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
            onChange={(e) => setEmail(e.target.value)}
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
