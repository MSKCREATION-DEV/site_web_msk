import type { HomeContent } from "../types";

/** Copy = captures Figma Desktop (2026-09-25). Pas de tiret cadratin. */
export const home: HomeContent = {
  meta: {
    title: "MSK Création",
    description:
      "Agence digitale à Bamako, ACI 2000. Présente aussi à Lomé et Lyon.",
  },
  brandName: "MSK Création",
  hero: {
    slides: [
      {
        src: "/assets/hero/slide-01.png",
        alt: "MSK Création, visuel hero 1",
      },
      {
        src: "/assets/hero/slide-02.png",
        alt: "MSK Création, visuel hero 2",
      },
    ],
    /* Espaces de linéarisation a11y/SEO (H1 flex) : ne pas retirer. */
    titleLine1: "Nous créons ",
    rotatingWords: [
      "sites web",
      "apps mobile",
      "branding",
      "campagnes",
      "solutions",
    ],
    titleLine3: " qui convertissent.",
    subtitle:
      "Agence digitale à Bamako, ACI 2000. Présente aussi à Lomé et Lyon. Image de marque, présence digitale et croissance, sans sous-traitance, par une équipe de 10 experts formés en France, au Maroc et au Mali.",
    recentLabel: "Dernièrement",
    recentProjects: [],
    tickerItems: [
      "Sites Web",
      "Apps Mobile",
      "Branding",
      "E-commerce",
      "Identité Visuelle",
      "UX/UI Design",
      "Marketing Digital",
      "Solutions Sur-Mesure",
    ],
    rotateMs: 3000,
    slidesAriaLabel: "Diapositives",
    slideAriaLabelPrefix: "Diapositive",
  },
  works: {
    title: "PROJETS SÉLECTIONNÉS",
    seeProjectLabel: "Voir le projet",
    counterAriaLabel: "Projet {current} sur {total}",
  },
  cta: {
    ariaLabel: "Rappel projet",
    posterSrc: "/assets/cta/teaser-poster.png",
    posterAlt: "Vidéo teaser, votre prochain projet",
    clients: [
      "Koundji Services",
      "ELVI CREATION",
      "DELMORIAN",
      "AKWABA",
      "Thòy 'Art",
      "GENESIS SARL",
      "Mélya",
      "Bomoyi",
      "Andreas Maack",
      "Osez By Nico",
      "Gerald Lapointe",
      "Orsay.ai",
      "ECOSOL",
      "Beauté Divine",
    ],
    titleLine1: "Votre prochain",
    titleAccent: "projet.",
    ctaLabel: "Démarrer →",
    email: "contact@mskcreation.net",
    emailHref: "mailto:contact@mskcreation.net",
    mediaTabs: ["Vidéo", "Teaser 15 s", "Votre prochain projet"],
  },
  services: {
    eyebrow: "Services",
    titleLine1: "Ce que",
    titleAccent: "nous faisons.",
    intro:
      "Des solutions adaptées à chaque réalité. Design, développement, contenu et stratégie dans le même bureau, à Bamako. Vous parlez à une seule équipe, du premier brief jusqu'à la mise en ligne, et après.",
    items: [
      {
        index: "01",
        title: "Développement Web & Mobile",
        description:
          "Sites vitrine, boutiques en ligne, applications iOS et Android. Rapides, accessibles, pensés pour les connexions réelles de nos marchés.",
      },
      {
        index: "02",
        title: "Solutions Sur-Mesure",
        description:
          "Outils métier, espaces clients, automatisations. Du code propre, documenté, que votre prochaine équipe pourra reprendre.",
      },
      {
        index: "03",
        title: "Branding & Design",
        description:
          "Logos, chartes, interfaces. Une marque cohérente sur la carte de visite, le packaging et l'écran.",
      },
      {
        index: "04",
        title: "Marketing Digital",
        description:
          "Réseaux sociaux, campagnes, contenus. Des objectifs chiffrés avant de publier, un bilan après.",
      },
    ],
  },
  teamSection: {
    eyebrow: "L'équipe",
    titleBefore: "Les gens",
    titleAccent: "derrière",
    titleAfter: "le travail.",
    intro:
      "10 experts aux profils complémentaires : stratégie, design, vidéo, développement, community management. Formés entre la France, le Maroc et le Mali. Zéro sous-traitance : les visages ci-dessous sont ceux qui travaillent vraiment sur votre projet.",
    officeSrc: "/assets/cta/teaser-poster.png",
    officeAlt: "Bureaux MSK Création, Bamako",
  },
  approach: {
    eyebrow: "Notre approche",
    titleLine1: "Impact,",
    titleAccent: "précision,",
    titleLine3: "Audace.",
    body: [
      "Basés au cœur de Bamako, ACI 2000. Nous comprenons les codes culturels, les comportements digitaux et les sensibilités de l'audience africaine. Depuis 2022 : des projets livrés au Mali, au Togo, en Haïti et en France, pour des entreprises de 2 à 200 personnes.",
      "La distance n'a jamais été un frein : nos clients de Paris ou de Lomé ont le même point hebdomadaire, le même accès au planning et les mêmes délais que ceux de Bamako. Une équipe capable de prendre en charge l'intégralité de votre communication digitale.",
    ],
    galleryAriaLabel: "Galerie des bureaux MSK",
    gallery: [
      {
        src: "/assets/approach/gallery-01.png",
        alt: "Bureaux MSK, entrée",
        label: "Entrée",
      },
      {
        src: "/assets/approach/gallery-02.png",
        alt: "Bureaux MSK, hall d'accueil",
        label: "Hall d'accueil",
      },
      {
        src: "/assets/approach/gallery-03.png",
        alt: "Bureaux MSK, bureau",
        label: "Bureau",
      },
      {
        src: "/assets/approach/gallery-04.png",
        alt: "Bureaux MSK, espace de travail",
        label: "Espace de travail",
      },
      {
        src: "/assets/approach/gallery-05.png",
        alt: "Bureaux MSK, open space",
        label: "Open space",
      },
      {
        src: "/assets/approach/gallery-06.png",
        alt: "Bureaux MSK, détail",
        label: "Détail",
      },
    ],
    steps: [
      {
        index: "01",
        title: "Découverte",
        description:
          "On écoute d'abord. Votre marché, vos clients, ce qui a déjà été tenté. Un compte rendu sous 48 h.",
      },
      {
        index: "02",
        title: "Stratégie",
        description:
          "Un plan clair avant le premier pixel : périmètre, maquettes, calendrier, budget ferme.",
      },
      {
        index: "03",
        title: "Développement",
        description:
          "Des livraisons toutes les deux semaines, que vous testez vous-même. Rien ne part sans votre validation.",
      },
      {
        index: "04",
        title: "Lancement",
        description:
          "Mise en ligne, formation de vos équipes, suivi des performances. On reste joignables après le lancement.",
      },
    ],
  },
  contactSection: {
    eyebrow: "Contact",
    titleLine1: "Parlons",
    titleLine2: "de votre",
    titleAccent: "projet.",
    backgroundSrc: "/assets/contact/background.png",
    valuesTicker: [
      "Impact",
      "Précision",
      "Audace",
      "Excellence",
      "Innovation",
      "Cohérence",
      "Performance",
      "Créativité",
    ],
    rows: [
      {
        label: "Email",
        value: "contact@mskcreation.net",
        href: "mailto:contact@mskcreation.net",
      },
      {
        label: "Téléphone fixe",
        value: "+223 44 90 76 32",
        href: "tel:+22344907632",
      },
      {
        label: "Portable · WhatsApp",
        value: "+223 70 68 90 91",
        href: "https://wa.me/22370689091",
      },
      {
        label: "France",
        value: "+33 7 53 77 05 79",
        href: "tel:+33753770579",
      },
      {
        label: "Adresse",
        value: "Bamako, ACI 2000, Mali",
        muted: true,
      },
      {
        label: "Réponse",
        value: "Sous 24 h : français, anglais, bambara",
        muted: true,
      },
      {
        label: "Instagram",
        value: "@mskcreation.io",
        href: "https://www.instagram.com/mskcreation.io",
      },
      {
        label: "TikTok",
        value: "@msk.creation",
        href: "https://www.tiktok.com/@msk.creation",
      },
      {
        label: "LinkedIn",
        value: "MSK CREATION",
        href: "https://www.linkedin.com/company/msk-creation/",
      },
    ],
    formNote: "* Champs obligatoires. Réponse sous 24 h ouvrées.",
    submitLabel: "Envoyer →",
    submitLoadingLabel: "Envoi en cours…",
    whatsappLabel: "Écrire sur WhatsApp",
    successEyebrow: "Brief reçu",
    successTitle: "Merci, votre message est bien arrivé.",
    successBody:
      "Nous vous répondons sous 24 h ouvrées. En urgence, écrivez-nous sur WhatsApp.",
    unavailableEyebrow: "Envoi bientôt disponible",
    unavailableTitle: "Le formulaire n’envoie pas encore de message.",
    unavailableBody:
      "Écrivez-nous par e-mail ou WhatsApp. L’envoi en ligne sera activé après configuration du serveur (Q23).",
    errorGeneric: "Envoi impossible pour le moment. Réessayez plus tard ou contactez-nous par e-mail / WhatsApp.",
    errorRequired: "Ce champ est obligatoire.",
    errorEmail: "Indiquez une adresse e-mail valide.",
    fields: [
      {
        name: "name",
        label: "Nom complet *",
        placeholder: "Mathieu Diallo",
        required: true,
        type: "text",
      },
      {
        name: "email",
        label: "Email *",
        placeholder: "diallo@entreprise.com",
        required: true,
        type: "email",
      },
      {
        name: "company",
        label: "Entreprise",
        placeholder: "Nom de votre structure",
        type: "text",
      },
      {
        name: "service",
        label: "Service",
        placeholder: "Sélectionnez...",
        type: "select",
        options: [],
      },
      {
        name: "budget",
        label: "Budget indicatif",
        placeholder: "Sélectionnez une fourchette...",
        type: "select",
        options: [],
      },
      {
        name: "message",
        label: "Votre projet *",
        placeholder: "Décrivez votre projet et vos objectifs...",
        required: true,
        type: "textarea",
      },
    ],
  },
};
