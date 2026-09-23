import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { getAuthErrorMessage } from "../../utils/authErrors";
import mail_icon from "../../assets/Icons/mail.png";
import pass_icon from "../../assets/Icons/pass.png";

// The one login page for everyone. Whether the account is the admin is
// decided by its email (see AuthContext), not by anything chosen here.
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");
    setSubmitting(true);

    try {
      await login(email, password);
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
    <div className="bg-gray-300 min-h-screen flex justify-center items-center px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full m-auto space-y-8 bg-white rounded-lg p-6 sm:p-8"
      >
        <div className="header flex justify-center items-center">
          <h1 className="text-2xl font-bold">Login</h1>
        </div>

        {promptMessage && (
          <p className="text-center text-sm text-blue-700 bg-blue-50 rounded p-3">
            {promptMessage}
          </p>
        )}

        <div className="inputs">
          <div className="email flex mt-5 bg-gray-200 h-15 opacity-80 focus-within:ring-2 focus-within:ring-primary-light">
            <img
              src={mail_icon}
              alt=""
              className="w-6 h-6 m-5 mt-5 opacity-80 "
            />
            <input
              type="email"
              value={email}
              className="border-none outline-none w-full flex bg-gray-200 h-15 opacity-80"
              placeholder="Email"
              aria-label="Email"
              required
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password flex items-center mt-5 bg-gray-200 h-15 opacity-80 focus-within:ring-2 focus-within:ring-primary-light">
            <img
              src={pass_icon}
              alt=""
              className="w-6 h-6 m-5 mt-5 opacity-80 "
            />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              className="border-none outline-none w-full flex bg-gray-200 h-15 opacity-80"
              placeholder="Password"
              aria-label="Password"
              required
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="mr-5 shrink-0 text-neutral-600 hover:text-neutral-900"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}
        {notice && <p className="text-sm text-green-700">{notice}</p>}

        <div className="buttons space-y-3">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="forgot-password text-blue-400 cursor-pointer"
          >
            Forgot Password?
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 h-14 font-semibold text-white text-center rounded-lg cursor-pointer hover:bg-blue-600 w-full disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Logging in..." : "Login"}
          </button>
          <button
            type="button"
            className="w-full p-3 bg-gray-500 hover:bg-gray-600 h-14 font-semibold text-white rounded-lg border-none cursor-pointer"
            onClick={handleKeepBrowsing}
          >
            Keep Browsing
          </button>
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              state={location.state}
              className="text-blue-600 hover:underline"
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
