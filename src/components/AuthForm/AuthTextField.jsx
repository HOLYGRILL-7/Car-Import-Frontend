// Icon-prefixed text input shared by Login, Register and the reset-password
// page, styled consistently with PasswordField.
const AuthTextField = ({ icon: Icon, label, error, ...inputProps }) => (
  <label className="block">
    <span className="mb-1.5 block text-sm font-medium text-primary">
      {label}
    </span>
    <div
      className={`flex items-center gap-3 rounded-xl border bg-white px-4 py-3 transition-colors focus-within:border-primary-light focus-within:ring-2 focus-within:ring-primary-light/40 ${
        error ? "border-red-400" : "border-gray-300"
      }`}
    >
      <Icon className="h-5 w-5 shrink-0 text-neutral" aria-hidden="true" />
      <input
        {...inputProps}
        aria-label={label}
        className="w-full border-none bg-transparent text-neutral-dark placeholder:text-neutral outline-none"
      />
    </div>
    {error && <span className="mt-1 block text-sm text-red-600">{error}</span>}
  </label>
);

export default AuthTextField;
