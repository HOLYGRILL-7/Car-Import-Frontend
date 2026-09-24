import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { getAuthErrorMessage } from "../../utils/authErrors";
import { isStrongPassword } from "../../utils/passwordStrength";
import PasswordField from "../../components/AuthForm/PasswordField";
import PasswordStrengthList from "../../components/AuthForm/PasswordStrengthList";

// Handles Firebase's password-reset email link. Firebase's action URL is
// shared across every email type (reset, verify, recover), so `mode` is
// checked before doing anything — see the Firebase Console note this page's
// caller was given (Authentication -> Templates -> gear icon -> Action URL).
const ResetPasswordAction = () => {
  const [params] = useSearchParams();
  const mode = params.get("mode");
  const oobCode = params.get("oobCode");
  const { verifyResetCode, confirmReset } = useAuth();

  const [status, setStatus] = useState("verifying"); // verifying | ready | invalid | done
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (mode !== "resetPassword" || !oobCode) {
      setStatus("invalid");
      return;
    }
    verifyResetCode(oobCode)
      .then((verifiedEmail) => {
        setEmail(verifiedEmail);
        setStatus("ready");
      })
      .catch(() => setStatus("invalid"));
    // Only ever needs to run once per link.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const passwordOk = isStrongPassword(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!passwordOk) {
      setError("Please meet all the password requirements below.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Those passwords don't match.");
      return;
    }

    setSubmitting(true);
    try {
      await confirmReset(oobCode, password);
      setStatus("done");
    } catch (err) {
      setError(getAuthErrorMessage(err));
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center px-4 py-6 pt-24">
      <div className="m-auto w-full max-w-md space-y-6 rounded-2xl bg-white p-6 shadow-xl sm:p-8">
        {status === "verifying" && (
          <p className="text-center text-neutral">Checking your reset link...</p>
        )}

        {status === "invalid" && (
          <div className="space-y-4 text-center">
            <h1 className="text-2xl font-bold text-primary">
              This link isn't valid
            </h1>
            <p className="text-neutral">
              It may have already been used, or it's expired. Request a new
              reset link from the login page and try again.
            </p>
            <Link
              to="/login"
              className="inline-block rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark"
            >
              Back to Login
            </Link>
          </div>
        )}

        {status === "ready" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-primary">
                Set a new password
              </h1>
              <p className="mt-1 text-sm text-neutral">
                Resetting the password for <strong>{email}</strong>
              </p>
            </div>

            <div className="space-y-4">
              <PasswordField
                label="New Password"
                value={password}
                placeholder="Create a new password"
                required
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                hint={<PasswordStrengthList password={password} />}
              />
              <PasswordField
                label="Confirm Password"
                value={confirmPassword}
                placeholder="Re-enter the password"
                required
                autoComplete="new-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting || !passwordOk}
              className="h-14 w-full cursor-pointer rounded-xl bg-primary text-center font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        {status === "done" && (
          <div className="space-y-4 text-center">
            <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" />
            <h1 className="text-2xl font-bold text-primary">
              Password reset
            </h1>
            <p className="text-neutral">
              Your password has been changed. You can now log in with it.
            </p>
            <Link
              to="/login"
              className="inline-block rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark"
            >
              Log in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordAction;
