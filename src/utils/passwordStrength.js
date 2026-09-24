// Shared strength rule for Register and the password-reset page: at least 8
// characters, a number, and an uppercase letter or symbol.
export const PASSWORD_MIN_LENGTH = 8;

export const passwordRequirements = (password) => [
  {
    key: "length",
    label: `At least ${PASSWORD_MIN_LENGTH} characters`,
    met: password.length >= PASSWORD_MIN_LENGTH,
  },
  {
    key: "number",
    label: "At least one number",
    met: /\d/.test(password),
  },
  {
    key: "upperOrSymbol",
    label: "An uppercase letter or symbol",
    met: /[A-Z]/.test(password) || /[^A-Za-z0-9]/.test(password),
  },
];

export const isStrongPassword = (password) =>
  passwordRequirements(password).every((req) => req.met);
