export type PageMetaContent = {
  title: string;
  description: string;
};

export type NavLinkContent = {
  href: string;
  label: string;
};

export type NavContent = {
  links: NavLinkContent[];
  /** Lisez-moi Figma — scroll vers contact / brief */
  ctaBrief: string;
  /** Lisez-moi Figma — scroll vers travaux */
  ctaWorks: string;
  languageSwitchLabel: string;
};

export type FooterContent = {
  /**
   * Contenu footer complet = PENDING pixels Figma.
   * WhatsApp repris du contact (confirmé).
   */
  pendingNote: string;
};

export type HomeContent = {
  meta: PageMetaContent;
  brandName: string;
  /** Placeholder bootstrap — sections Figma branchées en Phase 7. */
  bootstrapNote: string;
};

export type ContactContent = {
  whatsappDisplay: string;
  whatsappHref: string;
};

export type ProjectCopy = {
  title: string;
  description: string;
  expertiseLabel: string;
  beforeAfterEyebrow?: string;
  beforeAfterSubtitle?: string;
  closeLabel: string;
  nextLabel: string;
  backToWorksLabel: string;
};

export type LocaleContent = {
  home: HomeContent;
  nav: NavContent;
  footer: FooterContent;
  contact: ContactContent;
  projectSheet: Omit<ProjectCopy, "title" | "description">;
  projects: Record<string, Pick<ProjectCopy, "title" | "description">>;
  team: Record<string, { name: string; role: string }>;
};
