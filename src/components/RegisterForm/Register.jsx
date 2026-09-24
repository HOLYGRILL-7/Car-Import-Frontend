import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { User, Mail } from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { getAuthErrorMessage } from "../../utils/authErrors";
import { isStrongPassword } from "../../utils/passwordStrength";
import AuthTextField from "../AuthForm/AuthTextField";
import PasswordField from "../AuthForm/PasswordField";
import PasswordStrengthList from "../AuthForm/PasswordStrengthList";

// Sign-up for regular users (e.g. to save cars). The admin account is created
// manually in the Firebase console, not here.
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { user, loading, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Already signed in (including right after a successful registration).
  if (!loading && user) {
    return <Navigate to={location.state?.from ?? "/"} replace />;
  }

  const passwordOk = isStrongPassword(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!passwordOk) {
      setError("Please meet all the password requirements below.");
      return;
    }

    setSubmitting(true);
    try {
      await register(name, email, password);
      // The redirect above takes over once auth state updates.
    } catch (err) {
      setError(getAuthErrorMessage(err));
      setSubmitting(false);
    }
  };

  const handleKeepBrowsing = () => {
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-light px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="m-auto w-full max-w-md space-y-6 rounded-2xl bg-white p-6 shadow-xl sm:p-8"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary">Create an account</h1>
          <p className="mt-1 text-sm text-neutral">
            Sign up to save cars and get in touch faster.
          </p>
        </div>

        <div className="space-y-4">
          <AuthTextField
            icon={User}
            label="Name"
            type="text"
            value={name}
            placeholder="Your full name"
            required
            autoComplete="name"
            onChange={(e) => setName(e.target.value)}
          />
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
            placeholder="Create a password"
            required
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            hint={<PasswordStrengthList password={password} />}
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="space-y-3">
          <button
            type="submit"
            disabled={submitting || !passwordOk}
            className="h-14 w-full cursor-pointer rounded-xl bg-primary text-center font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Creating account..." : "Sign Up"}
          </button>
          <button
            type="button"
            className="h-14 w-full cursor-pointer rounded-xl border border-gray-300 font-semibold text-neutral-dark transition-colors hover:bg-gray-50"
            onClick={handleKeepBrowsing}
          >
            Keep Browsing
          </button>
          <p className="text-center text-sm text-neutral">
            Already have an account?{" "}
            <Link
              to="/login"
              state={location.state}
              className="font-semibold text-primary-light hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
