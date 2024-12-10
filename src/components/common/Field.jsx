export default function Field({ label, error, htmlFor, children }) {
  return (
    <div className="form-control">
      {label && <label htmlFor={htmlFor}>{label}</label>}
      {children}
      {error && (
        <div role="alert" className="text-xs lg:text-sm text-red-600">
          {error.message}
        </div>
      )}
    </div>
  );
}
