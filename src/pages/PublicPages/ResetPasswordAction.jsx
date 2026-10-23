import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { getAuthErrorMessage } from "../../utils/authErrors";
import { isStrongPassword } from "../../utils/passwordStrength";
import PasswordField from "../../components/AuthForm/PasswordField";
import PasswordStrengthList from "../../components/AuthForm/PasswordStrengthList";
import PageMeta from "../../components/PageMeta";

// Handles Firebase's email action links (Authentication > Templates > Action
// URL is set to /auth/action). The site only sends password-reset emails, so
// only mode=resetPassword is handled; any other link type gets a clear
// "not a reset link" message.

// Why a link can't be used, with what to tell the visitor.
const DEAD_LINK = {
  expired: {
    title: "This link has expired",
    body: "Password reset links only work for a limited time. Request a new one from the login page with “Forgot Password?”.",
  },
  used: {
    title: "This link has already been used",
    body: "Each reset link works only once. If you haven't changed your password yet, request a new link from the login page with “Forgot Password?”.",
  },
  account: {
    title: "This account can't be reset",
    body: "The account this link belongs to no longer exists or has been disabled. Contact us if you need help.",
  },
  malformed: {
    title: "This link isn't valid",
    body: "It's incomplete or isn't a password reset link. Request a new reset link from the login page with “Forgot Password?”.",
  },
};

// Firebase error -> which DEAD_LINK reason, or null if the link itself may
// still be fine (e.g. a network error).
const deadLinkReason = (error) => {
  switch (error?.code) {
    case "auth/expired-action-code":
      return "expired";
    case "auth/invalid-action-code": // already used, or mangled
      return "used";
    case "auth/user-disabled":
    case "auth/user-not-found":
      return "account";
    default:
      return null;
  }
};

const buttonClass =
  "inline-block rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark cursor-pointer";

const ResetPasswordAction = () => {
  const [params] = useSearchParams();
  const mode = params.get("mode");
  const oobCode = params.get("oobCode");
  const isResetLink = mode === "resetPassword" && Boolean(oobCode);
  const { verifyResetCode, confirmReset } = useAuth();

  // verifying | ready | dead (see `reason`) | offline | done
  const [check, setCheck] = useState(() =>
    isResetLink
      ? { status: "verifying" }
      : { status: "dead", reason: "malformed" },
  );
  const [attempt, setAttempt] = useState(0); // bumped by "Try again"
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Checks the code is still valid and gets the email it belongs to.
  useEffect(() => {
    if (!isResetLink) return;
    let cancelled = false;
    verifyResetCode(oobCode)
      .then((email) => {
        if (!cancelled) setCheck({ status: "ready", email });
      })
      .catch((err) => {
        if (cancelled) return;
        const reason = deadLinkReason(err);
        if (reason) {
          setCheck({ status: "dead", reason });
        } else {
          console.error("Failed to check reset link:", err);
          setCheck({ status: "offline" });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [isResetLink, oobCode, verifyResetCode, attempt]);

  const handleRetry = () => {
    setCheck({ status: "verifying" });
    setAttempt((n) => n + 1);
  };

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
      setCheck({ status: "done" });
    } catch (err) {
      // The link can expire, or be used in another tab, while the form is open.
      const reason = deadLinkReason(err);
      if (reason) setCheck({ status: "dead", reason });
      else setError(getAuthErrorMessage(err));
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center px-4 py-6 pt-24">
      <PageMeta title="Reset Password | Extra Motors" noindex />
      <div className="m-auto w-full max-w-md space-y-6 rounded-2xl bg-white p-6 shadow-xl sm:p-8">
        {check.status === "verifying" && (
          <p role="status" className="text-center text-neutral">
            Checking your reset link...
          </p>
        )}

        {check.status === "dead" && (
          <div className="space-y-4 text-center">
            <h1 className="text-2xl font-bold text-primary">
              {DEAD_LINK[check.reason].title}
            </h1>
            <p className="text-neutral">{DEAD_LINK[check.reason].body}</p>
            <Link to="/login" className={buttonClass}>
              Back to Login
            </Link>
          </div>
        )}

        {check.status === "offline" && (
          <div className="space-y-4 text-center">
            <h1 className="text-2xl font-bold text-primary">
              Couldn't check your link
            </h1>
            <p className="text-neutral">
              Check your internet connection and try again. Your link may still
              be fine.
            </p>
            <button type="button" onClick={handleRetry} className={buttonClass}>
              Try again
            </button>
          </div>
        )}

        {check.status === "ready" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-primary">
                Set a new password
              </h1>
              <p className="mt-1 text-sm text-neutral">
                Resetting the password for <strong>{check.email}</strong>
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

        {check.status === "done" && (
          <div className="space-y-4 text-center">
            <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" />
            <h1 className="text-2xl font-bold text-primary">Password reset</h1>
            <p className="text-neutral">
              Your password has been changed. You can now log in with it.
            </p>
            {/* Login shows state.message in a banner above the form. */}
            <Link
              to="/login"
              state={{
                message:
                  "Your password has been changed. Log in with your new password.",
              }}
              className={buttonClass}
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
