import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

// Password input with a show/hide toggle, shared by Login, Register and the
// reset-password page. `hint` renders below the input (e.g. a strength list).
const PasswordField = ({ label, error, hint, ...inputProps }) => {
  const [show, setShow] = useState(false);

  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-primary">
        {label}
      </span>
      <div
        className={`flex items-center gap-3 rounded-xl border bg-white px-4 py-3 transition-colors focus-within:border-primary-light focus-within:ring-2 focus-within:ring-primary-light/40 ${
          error ? "border-red-400" : "border-gray-300"
        }`}
      >
        <Lock className="h-5 w-5 shrink-0 text-neutral" aria-hidden="true" />
        <input
          {...inputProps}
          type={show ? "text" : "password"}
          aria-label={label}
          className="w-full border-none bg-transparent text-neutral-dark placeholder:text-neutral outline-none"
        />
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          aria-label={show ? "Hide password" : "Show password"}
          className="shrink-0 cursor-pointer text-neutral hover:text-primary"
        >
          {show ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
      {hint}
      {error && <span className="mt-1 block text-sm text-red-600">{error}</span>}
    </label>
  );
};

export default PasswordField;
