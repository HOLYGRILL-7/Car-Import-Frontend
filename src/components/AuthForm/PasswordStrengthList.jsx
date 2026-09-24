import { Check, X } from "lucide-react";
import { passwordRequirements } from "../../utils/passwordStrength";

// Live checklist shown under a password field while the user types. Hidden
// once the field is empty so it doesn't clutter the form before they start.
const PasswordStrengthList = ({ password }) => {
  if (!password) return null;

  return (
    <ul className="mt-2 space-y-1">
      {passwordRequirements(password).map((req) => (
        <li
          key={req.key}
          className={`flex items-center gap-1.5 text-xs ${
            req.met ? "text-green-700" : "text-neutral"
          }`}
        >
          {req.met ? (
            <Check className="h-3.5 w-3.5 shrink-0" />
          ) : (
            <X className="h-3.5 w-3.5 shrink-0" />
          )}
          {req.label}
        </li>
      ))}
    </ul>
  );
};

export default PasswordStrengthList;
