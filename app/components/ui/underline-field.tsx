import type { ComponentProps } from "react";
import { cn } from "~/lib/utils";

export type UnderlineFieldState = "default" | "focus" | "filled" | "error";

type UnderlineFieldProps = {
  label: string;
  error?: string;
  /** Force un état visuel (story / réf. Figma). */
  visualState?: UnderlineFieldState;
  className?: string;
} & Omit<ComponentProps<"input">, "className">;

/**
 * Champ souligné — états Figma 240:436 (Défaut / Focus / Rempli / Erreur).
 */
export function UnderlineField({
  label,
  error,
  visualState,
  id,
  className,
  ...inputProps
}: UnderlineFieldProps) {
  const fieldId = id ?? inputProps.name ?? "field";
  const errorId = `${fieldId}-error`;

  const borderClass =
    visualState === "error" || error
      ? "border-msk-error"
      : visualState === "focus"
        ? "border-msk-blue"
        : visualState === "filled"
          ? "border-msk-field-filled"
          : "border-msk-border focus-within:border-msk-blue";

  const labelClass =
    visualState === "focus"
      ? "text-msk-blue"
      : "text-msk-text group-focus-within:text-msk-blue";

  return (
    <div className={cn("group flex w-full max-w-msk-field flex-col gap-2", className)}>
      <label
        htmlFor={fieldId}
        className={cn("msk-label", labelClass)}
      >
        {label}
      </label>
      <div className={cn("border-b border-solid pb-3", borderClass)}>
        <input
          {...inputProps}
          id={fieldId}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "w-full bg-transparent font-sans text-sm text-msk-text outline-none",
            "placeholder:text-msk-text-subtle",
          )}
        />
      </div>
      {error ? (
        <p id={errorId} className="text-msk-xs text-msk-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
