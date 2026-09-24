import { Link } from "react-router";
import { MskLogo } from "~/components/ui";
import type { ContactContent, FooterContent } from "~/content/types";
import type { Locale } from "~/i18n";
import { homePath } from "~/i18n";
import { cn } from "~/lib/utils";

type SiteFooterProps = {
  locale: Locale;
  footer: FooterContent;
  contact: ContactContent;
  className?: string;
};

/**
 * Footer — structure minimale (logo + WhatsApp Figma).
 * Layout / copy complets = PENDING MCP.
 */
export function SiteFooter({
  locale,
  footer,
  contact,
  className,
}: SiteFooterProps) {
  return (
    <footer
      className={cn(
        "border-t border-msk-border bg-msk-page",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-8 py-16 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-4">
          <Link to={homePath(locale)} aria-label="MSK Création">
            <MskLogo variant="header" />
          </Link>
          <p className="max-w-sm text-xs text-msk-text-subtle">
            {footer.pendingNote}
          </p>
        </div>
        <a
          href={contact.whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="text-[11px] tracking-[2px] text-msk-text uppercase transition-colors hover:text-msk-blue"
        >
          WhatsApp {contact.whatsappDisplay}
        </a>
      </div>
    </footer>
  );
}
