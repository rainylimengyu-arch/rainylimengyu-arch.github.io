import { RealisticTape } from "./TapePreview";
import { useEffect, useRef } from "react";
import { img, icon, flavors } from "./data";
import { useI18n } from "./i18n";
export function Icon({ name, className = "" }) {
  return (
    <img
      className={`icon ${className}`}
      src={icon(name)}
      alt=""
      aria-hidden="true"
    />
  );
}
export function Arrow() {
  return <Icon name="arrow-right" />;
}
export function Button({
  children,
  secondary = false,
  className = "",
  ...props
}) {
  return (
    <button
      className={`button ${secondary ? "button-secondary" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
export function Modal({ title, children, onClose, className = "" }) {
  const { t } = useI18n();
  const dialogRef = useRef(null);
  useEffect(() => {
    const before = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const dialog = dialogRef.current;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      before?.focus?.();
    };
  }, []);
  function closeOnBackdrop(e) {
    if (e.target !== e.currentTarget) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    if (
      e.clientX < bounds.left ||
      e.clientX > bounds.right ||
      e.clientY < bounds.top ||
      e.clientY > bounds.bottom
    )
      onClose();
  }
  return (
    <dialog
      ref={dialogRef}
      className={`modal ${className}`}
      aria-label={t(title)}
      onCancel={onClose}
      onClick={closeOnBackdrop}
    >
      <button
        className="close-button"
        aria-label={t("Close dialog")}
        onClick={onClose}
      >
        <Icon name="plus" />
      </button>
      <h2>{t(title)}</h2>
      {children}
    </dialog>
  );
}
export function FlavorOptions({ value, onChange, expanded = false }) {
  const { t } = useI18n();
  function keyboardSelect(e) {
    const direction = ["ArrowRight", "ArrowDown"].includes(e.key)
      ? 1
      : ["ArrowLeft", "ArrowUp"].includes(e.key)
        ? -1
        : 0;
    if (!direction) return;
    e.preventDefault();
    const index =
      (flavors.findIndex((f) => f.id === value) + direction + flavors.length) %
      flavors.length;
    onChange(flavors[index].id);
    e.currentTarget.querySelectorAll('[role="radio"]')[index]?.focus();
  }
  return (
    <div
      className={`flavor-options ${expanded ? "expanded" : ""}`}
      role="radiogroup"
      aria-label={t("Choose your flavor")}
      onKeyDown={keyboardSelect}
    >
      {flavors.map((f) => (
        <button
          key={f.id}
          role="radio"
          tabIndex={value === f.id ? 0 : -1}
          aria-checked={value === f.id}
          className={`flavor ${value === f.id ? "active" : ""}`}
          onClick={() => onChange(f.id)}
        >
          <img src={img(`builder/flavor_thumbnails/${f.id}.png`)} alt="" />
          <span>
            {t(f.name)}
            {expanded && <small>{t(f.description)}</small>}
          </span>
          {expanded && value === f.id && <Icon name="check" />}
        </button>
      ))}
    </div>
  );
}
export function TapePreview({ selected }) {
  return <RealisticTape selected={selected} />;
}
export function NutrientList({ selected, onRemove }) {
  const { t } = useI18n();
  return (
    <ul className="nutrient-list">
      {selected.map((n) => (
        <li key={n.id}>
          <span className="color-dot" style={{ backgroundColor: n.stripe }} />
          <span>{t(n.name)}</span>
          {onRemove && (
            <button
              onClick={() => onRemove(n.id)}
              aria-label={t("Remove {name}", { name: t(n.name) })}
              className="remove-nutrient"
            >
              <Icon name="plus" />
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
