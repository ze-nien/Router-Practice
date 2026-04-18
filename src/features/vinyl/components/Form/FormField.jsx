export const FormField = ({ label, id, children, error }) => (
  <div className="relative flex-1 flex items-center">
    <label className="w-24 shrink-0" htmlFor={id}>
      {label}
    </label>

    {children}
    <div className="absolute right-2">
      {error && <span className="text-red-500 text-xs">{error.message}</span>}
    </div>
  </div>
);
