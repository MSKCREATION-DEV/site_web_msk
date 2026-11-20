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
  ctaBrief: string;
  ctaWorks: string;
  /** Libellé visible = locale courante (FR sur /fr, EN sur /en). */
  languageSwitchLabel: string;
  /** aria-label du bouton langue = action (ex. Passer en anglais). */
  languageSwitchAriaLabel: string;
  /** aria-label nav desktop */
  primaryNavAriaLabel: string;
  /** aria-label nav drawer mobile */
  mobileNavAriaLabel: string;
  /** aria-label bouton ouvrir menu (mobile) */
  menuOpenLabel: string;
  /** aria-label bouton fermer menu (mobile) */
  menuCloseLabel: string;
  /** Skip link clavier */
  skipToContentLabel: string;
  /** Annonce chargement navigation (barre top + live region) */
  pageLoadingLabel: string;
  /** aria-label intro rideau (1re visite) */
  introAriaLabel: string;
};

export type FooterContent = {
  copyright: string;
  addressLine: string;
  social: Array<{ label: string; href: string }>;
  /** aria-label liste réseaux */
  socialAriaLabel: string;
};

export type HeroSlideContent = {
  src: string;
  alt: string;
};

export type HeroRecentProject = {
  label: string;
  /** null = hors grille V1 (affichage seul, pas de lien). */
  slug: string | null;
};

export type HeroContent = {
  titleLine1: string;
  rotatingWords: string[];
  titleLine3: string;
  subtitle: string;
  /** Libellé italic « Dernièrement » */
  recentLabel: string;
  recentProjects: HeroRecentProject[];
  tickerItems: string[];
  rotateMs: number;
  slides: HeroSlideContent[];
  /** aria-label tablist indicateurs hero */
  slidesAriaLabel: string;
  /** Préfixe aria-label bouton slide (ex. « Slide » / « Diapositive ») */
  slideAriaLabelPrefix: string;
};

export type WorksContent = {
  /** Surtitre « PROJETS SÉLECTIONNÉS » (sans brackets) */
  title: string;
  /** CTA carte stack */
  seeProjectLabel: string;
  /** Aria compteur : « Projet {current} sur {total} » */
  counterAriaLabel: string;
};

export type CtaContent = {
  ariaLabel: string;
  posterSrc: string;
  posterAlt: string;
  clients: string[];
  titleLine1: string;
  titleAccent: string;
  ctaLabel: string;
  /** Email sous CTA : optionnel (retiré si redondant avec Contact). */
  email?: string;
  emailHref?: string;
};

export type ServiceItemContent = {
  index: string;
  title: string;
  description: string;
};

export type ServicesContent = {
  eyebrow: string;
  titleLine1: string;
  titleAccent: string;
  intro: string;
  items: ServiceItemContent[];
};

export type TeamSectionContent = {
  eyebrow: string;
  titleBefore: string;
  titleAccent: string;
  titleAfter: string;
  intro: string;
  officeSrc: string;
  officeAlt: string;
};

export type ApproachStepContent = {
  index: string;
  title: string;
  description: string;
};

export type ApproachContent = {
  eyebrow: string;
  titleLine1: string;
  titleAccent: string;
  titleLine3: string;
  body: string[];
  steps: ApproachStepContent[];
  /** Galerie bureaux (slides validées produit). */
  gallery: Array<{ src: string; alt: string; label?: string }>;
  galleryAriaLabel: string;
  galleryPrevLabel: string;
  galleryNextLabel: string;
};

export type ContactRowContent = {
  label: string;
  value: string;
  href?: string;
  muted?: boolean;
};

export type ContactFormFieldContent = {
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  type?: "text" | "email" | "textarea" | "select";
  options?: string[];
};

export type ContactSectionContent = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  titleAccent: string;
  valuesTicker: string[];
  rows: ContactRowContent[];
  formNote: string;
  submitLabel: string;
  submitLoadingLabel: string;
  whatsappLabel: string;
  fields: ContactFormFieldContent[];
  successEyebrow: string;
  successTitle: string;
  successBody: string;
  /**
   * État honnête quand CONTACT_EMAIL_ENABLED≠1 (env locale / preview sans envoi).
   * Affiché à la place du succès Figma.
   */
  unavailableEyebrow: string;
  unavailableTitle: string;
  unavailableBody: string;
  /** Erreur générique serveur (pas de stack). */
  errorGeneric: string;
  errorRequired: string;
  errorEmail: string;
  /** Fond contact : PENDING export si absent */
  backgroundSrc?: string;
};

export type HomeContent = {
  meta: PageMetaContent;
  brandName: string;
  hero: HeroContent;
  works: WorksContent;
  cta: CtaContent;
  services: ServicesContent;
  teamSection: TeamSectionContent;
  approach: ApproachContent;
  contactSection: ContactSectionContent;
};

export type ContactContent = {
  whatsappDisplay: string;
  whatsappHref: string;
  email: string;
  emailHref: string;
};

export type ProjectCopy = {
  title: string;
  description: string;
  /** Légende carte Travaux (chaine ·). */
  category: string;
  /** Eyebrow ouverture fiche, avec crochets Figma. */
  eyebrow?: string;
  /** Métadonnées intro fiche (chaine ·), distincte de la carte. */
  sheetTags?: string;
  /**
   * @deprecated Prefer `approach` intercalé en galerie (Figma Q24).
   * Conservé pour rétrocompat si présent sans `approach`.
   */
  galleryNote?: string;
  /** Liste `[ RÉALISATIONS ]` Figma (colonne gauche intro). */
  realizations?: string[];
  /** Paragraphe `[ APPROCHE ]` intercalé en galerie après la 1re image. */
  approach?: string;
  /** Alt cover fiche (SEO). */
  coverAlt?: string;
  /** Alts galerie indexés (parallèles à `data.projects.gallery`). */
  galleryAlts?: string[];
  /** Alt logo Avant (Koundji). */
  beforeAlt?: string;
  /** Alt logo Après (Koundji). */
  afterAlt?: string;
  expertiseLabel: string;
  realizationsLabel: string;
  approachLabel: string;
  nextProjectBracketLabel: string;
  prevProjectBracketLabel: string;
  worksNavLabel: string;
  beforeAfterEyebrow?: string;
  beforeAfterSubtitle?: string;
  beforeLabel?: string;
  afterLabel?: string;
  closeLabel: string;
  nextLabel: string;
  prevLabel: string;
  backToWorksLabel: string;
  /** aria-label section galerie fiche */
  galleryAriaLabel: string;
  /** aria-label nav projet suivant */
  nextNavAriaLabel: string;
};

type ProjectLocaleFields = Pick<
  ProjectCopy,
  | "title"
  | "description"
  | "category"
  | "eyebrow"
  | "sheetTags"
  | "galleryNote"
  | "realizations"
  | "approach"
  | "coverAlt"
  | "galleryAlts"
  | "beforeAlt"
  | "afterAlt"
>;

export type LocaleContent = {
  home: HomeContent;
  nav: NavContent;
  footer: FooterContent;
  contact: ContactContent;
  projectSheet: Omit<
    ProjectCopy,
    | "title"
    | "description"
    | "category"
    | "eyebrow"
    | "sheetTags"
    | "galleryNote"
    | "realizations"
    | "approach"
    | "coverAlt"
    | "galleryAlts"
    | "beforeAlt"
    | "afterAlt"
  >;
  projects: Record<string, ProjectLocaleFields>;
  team: Record<
    string,
    {
      name: string;
      role: string;
      /** Phrase courte factuelle (rôle), pas bio marketing. */
      focus?: string;
      email?: string;
      service?: string;
    }
  >;
  teamPage: TeamPageContent;
};

export type TeamPageContent = {
  meta: PageMetaContent;
  eyebrow: string;
  title: string;
  intro: string;
  focusLabel: string;
  serviceLabel: string;
  emailLabel: string;
  backHomeLabel: string;
  /** A11y carte flip : révéler le verso */
  flipRevealLabel: string;
  /** A11y carte flip : revenir au recto */
  flipHideLabel: string;
};
