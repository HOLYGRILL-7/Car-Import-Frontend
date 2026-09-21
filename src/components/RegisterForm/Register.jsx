import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { getAuthErrorMessage } from "../../utils/authErrors";
import user_icon from "../../assets/Icons/user.png";
import mail_icon from "../../assets/Icons/mail.png";
import pass_icon from "../../assets/Icons/pass.png";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
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
    <div className="bg-gray-300 min-h-screen flex justify-center items-center px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full m-auto space-y-8 bg-white rounded-lg p-6 sm:p-8"
      >
        <div className="header text-center space-y-2">
          <div className="text-2xl font-bold">Sign Up</div>
          <h1>Create an account with us today!</h1>
        </div>
        <div className="inputs">
          <div className="input flex mt-5 bg-gray-200 h-15 opacity-80 rounded focus-within:ring-2 focus-within:ring-primary-light">
            <img
              src={user_icon}
              alt=""
              className="w-6 h-6 m-5 mt-5 opacity-80"
            />
            <input
              type="text"
              value={name}
              placeholder="Name"
              aria-label="Name"
              required
              autoComplete="name"
              className="border-none outline-none w-full flex bg-gray-200 h-15 opacity-80"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="email flex mt-5 bg-gray-200 h-15 opacity-80 rounded">
            <img
              src={mail_icon}
              alt=""
              className="w-6 h-6 m-5 mt-5 opacity-80"
            />
            <input
              type="email"
              value={email}
              placeholder="Email"
              aria-label="Email"
              required
              autoComplete="email"
              className="border-none outline-none w-full flex bg-gray-200 h-15 opacity-80"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password flex mt-5 bg-gray-200 h-15 opacity-80 rounded">
            <img
              src={pass_icon}
              alt=""
              className="w-6 h-6 m-5 mt-5 opacity-80"
            />
            <input
              type="password"
              value={password}
              placeholder="Password (at least 6 characters)"
              aria-label="Password (at least 6 characters)"
              required
              minLength={6}
              autoComplete="new-password"
              className="border-none outline-none w-full flex bg-gray-200 h-15 opacity-80"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="buttons space-y-3">
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 h-14 font-semibold text-white text-center rounded-lg cursor-pointer hover:bg-blue-600 w-full disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Creating account..." : "Sign Up"}
          </button>
          <button
            type="button"
            className="w-full p-3 bg-gray-500 hover:bg-gray-600 h-14 font-semibold text-white rounded-lg border-none cursor-pointer"
            onClick={handleKeepBrowsing}
          >
            Keep Browsing
          </button>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              state={location.state}
              className="text-blue-600 hover:underline"
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
