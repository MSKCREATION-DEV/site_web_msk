import type { NavContent } from "../types";

/**
 * Libellés nav — ancres = noms de sections Figma Desktop.
 * CTAs « Briefer un projet » / « Voir nos travaux » = Lisez-moi prototype.
 * Composition pixel Header = PENDING MCP.
 */
export const nav: NavContent = {
  links: [
    { href: "#travaux", label: "Travaux" },
    { href: "#services", label: "Services" },
    { href: "#equipe", label: "Équipe" },
    { href: "#approche", label: "Approche" },
    { href: "#contact", label: "Contact" },
  ],
  ctaBrief: "Briefer un projet →",
  ctaWorks: "Voir nos travaux",
  languageSwitchLabel: "EN",
  primaryNavAriaLabel: "Principal",
  mobileNavAriaLabel: "Mobile",
};
