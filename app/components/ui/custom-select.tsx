import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "~/lib/utils";

type CustomSelectProps = {
  id?: string;
  name: string;
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  className?: string;
};

/**
 * Select custom (listbox) — style souligné MSK, clavier Arrow/Enter/Escape,
 * focus-visible bleu charte. Pas de `<select>` natif visible.
 */
export function CustomSelect({
  id,
  name,
  label,
  placeholder,
  options,
  value,
  onChange,
  error,
  required,
  className,
}: CustomSelectProps) {
  const reactId = useId();
  const fieldId = id ?? `select-${name}-${reactId}`;
  const listboxId = `${fieldId}-listbox`;
  const errorId = `${fieldId}-error`;
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selectedIndex = options.findIndex((option) => option === value);
  const display = value || placeholder;

  useEffect(() => {
    if (!open) return;
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);

    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, selectedIndex]);

  const choose = (option: string) => {
    onChange(option);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onButtonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen((prev) => !prev);
    }
  };

  const onListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (options.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => (i + 1) % options.length);
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => (i <= 0 ? options.length - 1 : i - 1));
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(options.length - 1);
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const option = options[activeIndex];
      if (option) choose(option);
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      buttonRef.current?.focus();
    }
  };

  return (
    <div
      ref={rootRef}
      className={cn("group relative flex w-full flex-col gap-2", className)}
    >
      <label htmlFor={fieldId} className="msk-label text-msk-text group-focus-within:text-msk-blue">
        {label}
      </label>

      <input type="hidden" name={name} value={value} required={required} />

      <div
        className={cn(
          "border-b border-solid pb-3",
          error ? "border-msk-error" : "border-msk-border focus-within:border-msk-blue",
        )}
      >
        <button
          ref={buttonRef}
          type="button"
          id={fieldId}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? errorId : undefined}
          aria-required={required || undefined}
          onClick={() => setOpen((prev) => !prev)}
          onKeyDown={onButtonKeyDown}
          className={cn(
            "flex h-11 w-full items-center justify-between gap-3 bg-transparent text-left font-sans text-sm outline-none",
            "focus-visible:ring-2 focus-visible:ring-msk-blue focus-visible:ring-offset-2 focus-visible:ring-offset-msk-ink",
            value ? "text-msk-text" : "text-msk-text-subtle",
          )}
        >
          <span className="min-w-0 truncate">{display}</span>
          <ChevronDown
            className={cn(
              "size-4 shrink-0 text-msk-text-muted transition-transform duration-msk motion-reduce:transition-none",
              open && "rotate-180",
            )}
            strokeWidth={1.5}
            aria-hidden
          />
        </button>
      </div>

      {open ? (
        <ul
          id={listboxId}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={fieldId}
          onKeyDown={onListKeyDown}
          className="absolute top-full right-0 left-0 z-30 mt-1 max-h-60 overflow-auto rounded-md border border-msk-border bg-msk-ink py-1 shadow-lg"
        >
          {options.map((option, index) => {
            const selected = option === value;
            const active = index === activeIndex;
            return (
              <li
                key={option}
                id={`${fieldId}-option-${index}`}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => choose(option)}
                className={cn(
                  "cursor-pointer px-3 py-2.5 font-sans text-sm text-msk-text",
                  active && "bg-msk-blue/20",
                  selected && "text-msk-blue",
                )}
              >
                {option}
              </li>
            );
          })}
        </ul>
      ) : null}

      {error ? (
        <p id={errorId} className="text-msk-xs text-msk-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
