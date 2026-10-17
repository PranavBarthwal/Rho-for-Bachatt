export default function Sheet({ open, title, onClose, children }) {
  if (!open) return null;
  return (
    <div className="overlay" role="presentation">
      <button className="overlay-backdrop" type="button" aria-label="Close" onClick={onClose} />
      <div className="overlay-sheet" role="dialog" aria-modal="true" aria-label={title}>
        <div className="sheet-handle" />
        {title ? <h2>{title}</h2> : null}
        {children}
      </div>
    </div>
  );
}
