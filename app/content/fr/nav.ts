import type { NavContent } from "../types";

/**
 * Libellés nav. Ancres = sections home ; Équipe = page dédiée.
 * CTAs « Briefer un projet » / « Voir nos travaux » = Lisez-moi prototype.
 */
export const nav: NavContent = {
  links: [
    { href: "#travaux", label: "Travaux" },
    { href: "#services", label: "Services" },
    { href: "/fr/equipe", label: "Équipe" },
    { href: "#approche", label: "Approche" },
    { href: "#contact", label: "Contact" },
  ],
  ctaBrief: "Briefer un projet →",
  ctaWorks: "Voir nos travaux",
  languageSwitchLabel: "EN",
  languageSwitchAriaLabel: "Passer en anglais",
  primaryNavAriaLabel: "Principal",
  mobileNavAriaLabel: "Mobile",
  menuOpenLabel: "Ouvrir le menu",
  menuCloseLabel: "Fermer le menu",
  skipToContentLabel: "Aller au contenu",
  pageLoadingLabel: "Chargement de la page",
  introAriaLabel: "MSK Création",
};
