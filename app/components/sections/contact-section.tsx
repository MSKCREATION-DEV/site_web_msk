import { useState, type FormEvent } from "react";
import {
  BriefSuccessMessage,
  Reveal,
  SubmitButton,
  UnderlineField,
} from "~/components/ui";
import type { ContactContent, ContactSectionContent } from "~/content/types";
import { assetUrl } from "~/lib/assets";
import { cn } from "~/lib/utils";

type ContactSectionProps = {
  content: ContactSectionContent;
  contact: ContactContent;
  className?: string;
};

type FormValues = Record<string, string>;
type FormErrors = Record<string, string>;

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/**
 * Contact — fond photo (cadrage bureau) + vignette Encre,
 * grille 568+80+568, form Nom|Email 272, validation + loading + confirmation.
 *
 * Charte v3 §02 : photo uniquement sur zone calme / contrastée.
 * Vignette Encre pour unifier et éviter l’effet « deux photos » (porte ↔ bureau).
 */
export function ContactSection({
  content,
  contact,
  className,
}: ContactSectionProps) {
  const [nameField, emailField, ...restFields] = content.fields;
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const setValue = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    for (const field of content.fields) {
      const value = (values[field.name] ?? "").trim();
      if (field.required && !value) {
        next[field.name] = content.errorRequired;
        continue;
      }
      if (field.type === "email" && value && !isValidEmail(value)) {
        next[field.name] = content.errorEmail;
      }
    }
    return next;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 900);
  };

  const fieldClass =
    "w-full border-b border-msk-border bg-transparent pb-3 font-sans text-sm text-msk-text outline-none placeholder:text-msk-text-subtle focus:border-msk-blue";

  return (
    <section
      id="contact"
      className={cn(
        "scroll-mt-24 relative overflow-hidden bg-msk-black",
        className,
      )}
      aria-labelledby="contact-heading"
    >
      {content.backgroundSrc ? (
        <img
          src={assetUrl(content.backgroundSrc)}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          /* Cadrage sur le bureau / laptop (droite) — moins de porte & couture sol */
          className="absolute inset-0 size-full object-cover object-[72%_42%]"
        />
      ) : (
        <div
          className="absolute inset-0 bg-linear-to-b from-msk-ink-contact via-msk-page to-msk-ink"
          aria-hidden
        />
      )}
      {/* Scrim + vignettes Encre : unifie la photo, masque les coutures latérales */}
      <div className="absolute inset-0 bg-msk-ink/72" aria-hidden />
      <div
        className="absolute inset-0 bg-linear-to-r from-msk-ink via-msk-ink/35 to-msk-ink/50"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-linear-to-t from-msk-ink via-transparent to-msk-ink/55"
        aria-hidden
      />

      <div className="msk-page-x relative mx-auto w-full max-w-msk py-msk-x">
        <div className="relative grid grid-cols-1 gap-16 lg:grid-cols-msk-split lg:gap-0">
          <Reveal>
            <div>
              <p className="msk-eyebrow mb-6 text-msk-text-muted">{content.eyebrow}</p>
              <h2
                id="contact-heading"
                className="mb-16 flex flex-col text-msk-text"
              >
                <span className="msk-contact-title">{content.titleLine1}</span>
                {content.titleLine2 ? (
                  <span className="msk-contact-title">{content.titleLine2}</span>
                ) : null}
                <span className="msk-contact-accent text-msk-blue">
                  {content.titleAccent}
                </span>
              </h2>

              <dl className="flex flex-col gap-6">
                {content.rows.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-msk-contact-row items-baseline gap-6 border-b border-msk-border pb-5"
                  >
                    <dt className="font-sans text-xs tracking-msk text-msk-text-muted uppercase">
                      {row.label}
                    </dt>
                    <dd>
                      {row.href ? (
                        <a
                          href={row.href}
                          target={row.href.startsWith("http") ? "_blank" : undefined}
                          rel={
                            row.href.startsWith("http") ? "noreferrer" : undefined
                          }
                          className="font-sans text-msk-15 font-medium text-msk-blue transition-colors hover:text-msk-blue-hover"
                        >
                          {row.value}
                        </a>
                      ) : (
                        <span
                          className={cn(
                            "font-sans text-msk-15 font-medium",
                            row.muted ? "text-msk-text" : "text-msk-blue",
                          )}
                        >
                          {row.value}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <div className="hidden lg:block" aria-hidden />

          <Reveal delayMs={80}>
            {success ? (
              <BriefSuccessMessage
                eyebrow={content.successEyebrow}
                title={content.successTitle}
                body={content.successBody}
              />
            ) : (
              <form className="flex flex-col gap-6" onSubmit={onSubmit} noValidate>
                {nameField && emailField ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <UnderlineField
                      label={nameField.label}
                      name={nameField.name}
                      placeholder={nameField.placeholder}
                      required={nameField.required}
                      value={values[nameField.name] ?? ""}
                      onChange={(e) => setValue(nameField.name, e.target.value)}
                      error={errors[nameField.name]}
                      className="max-w-none"
                    />
                    <UnderlineField
                      label={emailField.label}
                      name={emailField.name}
                      type="email"
                      placeholder={emailField.placeholder}
                      required={emailField.required}
                      value={values[emailField.name] ?? ""}
                      onChange={(e) => setValue(emailField.name, e.target.value)}
                      error={errors[emailField.name]}
                      className="max-w-none"
                    />
                  </div>
                ) : null}

                {restFields.map((field) => {
                  const fieldId = `contact-${field.name}`;
                  const error = errors[field.name];
                  const errorId = `${fieldId}-error`;

                  if (field.type === "textarea") {
                    return (
                      <div key={field.name} className="flex flex-col gap-2">
                        <label htmlFor={fieldId} className="msk-label text-msk-text">
                          {field.label}
                        </label>
                        <textarea
                          id={fieldId}
                          name={field.name}
                          required={field.required}
                          placeholder={field.placeholder}
                          rows={4}
                          value={values[field.name] ?? ""}
                          onChange={(e) => setValue(field.name, e.target.value)}
                          aria-invalid={Boolean(error) || undefined}
                          aria-describedby={error ? errorId : undefined}
                          className={cn(
                            fieldClass,
                            "h-msk-textarea resize-none",
                            error && "border-msk-error",
                          )}
                        />
                        {error ? (
                          <p id={errorId} className="text-msk-xs text-msk-error" role="alert">
                            {error}
                          </p>
                        ) : null}
                      </div>
                    );
                  }

                  if (field.type === "select") {
                    return (
                      <div key={field.name} className="flex flex-col gap-2">
                        <label htmlFor={fieldId} className="msk-label text-msk-text">
                          {field.label}
                        </label>
                        <select
                          id={fieldId}
                          name={field.name}
                          value={values[field.name] ?? ""}
                          onChange={(e) => setValue(field.name, e.target.value)}
                          className={cn(fieldClass, "h-11 appearance-none")}
                        >
                          <option value="" disabled>
                            {field.placeholder}
                          </option>
                          {(field.options ?? []).map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  }

                  return (
                    <div key={field.name} className="flex flex-col gap-2">
                      <label htmlFor={fieldId} className="msk-label text-msk-text">
                        {field.label}
                      </label>
                      <input
                        id={fieldId}
                        name={field.name}
                        type={field.type ?? "text"}
                        required={field.required}
                        placeholder={field.placeholder}
                        value={values[field.name] ?? ""}
                        onChange={(e) => setValue(field.name, e.target.value)}
                        className={cn(fieldClass, "h-11")}
                      />
                    </div>
                  );
                })}

                <p className="font-sans text-msk-xs text-msk-text-muted">
                  {content.formNote}
                </p>

                <div className="mt-2 flex w-full min-w-0 flex-col items-stretch gap-msk-cta-gap sm:flex-row sm:flex-wrap sm:items-center">
                  <SubmitButton
                    label={content.submitLabel}
                    loadingLabel={content.submitLoadingLabel}
                    visualState={loading ? "loading" : undefined}
                    disabled={loading}
                    className="w-full sm:w-auto sm:min-w-msk-submit"
                  />
                  <a
                    href={contact.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="msk-btn-label-sm inline-flex h-msk-btn-sm w-full items-center justify-center rounded-msk-pill border border-white/35 px-msk-btn-px text-center text-msk-text transition-colors duration-msk ease-out hover:border-msk-text hover:bg-white/5 sm:w-auto sm:min-w-msk-whatsapp"
                  >
                    {content.whatsappLabel}
                  </a>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
