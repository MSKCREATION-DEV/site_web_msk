import type { HomeContent } from "../types";

export const home: HomeContent = {
  meta: {
    title: "MSK Creation",
    description:
      "Digital agency in Bamako, ACI 2000. Also in Lomé and Lyon.",
  },
  brandName: "MSK Creation",
  hero: {
    slides: [
      {
        src: "/assets/hero/slide-01.png",
        alt: "MSK Creation, hero visual 1",
      },
      {
        src: "/assets/hero/slide-02.png",
        alt: "MSK Creation, hero visual 2",
      },
    ],
    titleLine1: "We create",
    rotatingWords: [
      "websites",
      "mobile apps",
      "branding",
      "campaigns",
      "solutions",
    ],
    titleLine3: "that convert.",
    subtitle:
      "Digital agency in Bamako, ACI 2000. Also present in Lomé and Lyon. Brand image, digital presence and growth, no outsourcing, by a team of 11 experts trained in France, Morocco and Mali.",
    recentLabel: "Recently",
    recentProjects: [],
    tickerItems: [
      "Websites",
      "Mobile Apps",
      "Branding",
      "E-commerce",
      "Visual Identity",
      "UX/UI Design",
      "Digital Marketing",
      "Custom Solutions",
    ],
    rotateMs: 3000,
  },
  works: {
    title: "SELECTED PROJECTS",
    seeProjectLabel: "View project",
    counterAriaLabel: "Project {current} of {total}",
  },
  cta: {
    ariaLabel: "Project reminder",
    posterSrc: "/assets/cta/teaser-poster.png",
    posterAlt: "Teaser video, your next project",
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
    titleLine1: "Your next",
    titleAccent: "project.",
    ctaLabel: "Start →",
    email: "contact@mskcreation.net",
    emailHref: "mailto:contact@mskcreation.net",
    mediaTabs: ["Video", "15 s teaser", "Your next project"],
  },
  services: {
    eyebrow: "Services",
    titleLine1: "What",
    titleAccent: "we do.",
    intro:
      "Solutions tailored to each reality. Design, development, content and strategy in the same office, in Bamako. You speak to one team, from the first brief to launch, and after.",
    items: [
      {
        index: "01",
        title: "Web & Mobile Development",
        description:
          "Showcase sites, online stores, iOS and Android apps. Fast, accessible, built for the real connections of our markets.",
      },
      {
        index: "02",
        title: "Custom Solutions",
        description:
          "Business tools, client spaces, automations. Clean, documented code your next team can take over.",
      },
      {
        index: "03",
        title: "Branding & Design",
        description:
          "Logos, brand guidelines, interfaces. A coherent brand on the business card, packaging and screen.",
      },
      {
        index: "04",
        title: "Digital Marketing",
        description:
          "Social networks, campaigns, content. Measurable goals before publishing, a review after.",
      },
    ],
  },
  teamSection: {
    eyebrow: "The team",
    titleBefore: "The people",
    titleAccent: "behind",
    titleAfter: "the work.",
    intro:
      "11 experts with complementary profiles: strategy, design, video, development, community management. Trained in France, Morocco and Mali. Zero outsourcing: the faces below are the ones who really work on your project.",
    officeSrc: "/assets/cta/teaser-poster.png",
    officeAlt: "MSK Creation offices, Bamako",
  },
  approach: {
    eyebrow: "Our approach",
    titleLine1: "Impact,",
    titleAccent: "precision,",
    titleLine3: "Boldness.",
    body: [
      "Based in the heart of Bamako, ACI 2000. We understand cultural codes, digital behaviors and the sensibilities of African audiences. Since 2022: projects delivered in Mali, Togo, Haiti and France, for companies from 2 to 200 people.",
      "Distance has never been a barrier: our clients in Paris or Lomé get the same weekly check-in, the same planning access and the same timelines as those in Bamako. A team that can take charge of your entire digital communication.",
    ],
    galleryAriaLabel: "MSK offices gallery",
    gallery: [
      {
        src: "/assets/approach/gallery-01.png",
        alt: "MSK offices, entrance",
        label: "Entrance",
      },
      {
        src: "/assets/approach/gallery-02.png",
        alt: "MSK offices, lobby",
        label: "Lobby",
      },
      {
        src: "/assets/approach/gallery-03.png",
        alt: "MSK offices, desk",
        label: "Office",
      },
      {
        src: "/assets/approach/gallery-04.png",
        alt: "MSK offices, workspace",
        label: "Workspace",
      },
      {
        src: "/assets/approach/gallery-05.png",
        alt: "MSK offices, open space",
        label: "Open space",
      },
      {
        src: "/assets/approach/gallery-06.png",
        alt: "MSK offices, detail",
        label: "Detail",
      },
    ],
    steps: [
      {
        index: "01",
        title: "Discovery",
        description:
          "We listen first. Your market, your clients, what has already been tried. A report within 48 h.",
      },
      {
        index: "02",
        title: "Strategy",
        description:
          "A clear plan before the first pixel: scope, mockups, timeline, firm budget.",
      },
      {
        index: "03",
        title: "Development",
        description:
          "Deliveries every two weeks that you test yourself. Nothing ships without your validation.",
      },
      {
        index: "04",
        title: "Launch",
        description:
          "Go-live, team training, performance follow-up. We stay reachable after launch.",
      },
    ],
  },
  contactSection: {
    eyebrow: "Contact",
    titleLine1: "Let's talk",
    titleLine2: "about your",
    titleAccent: "project.",
    backgroundSrc: "/assets/contact/background.png",
    valuesTicker: [
      "Impact",
      "Precision",
      "Boldness",
      "Excellence",
      "Innovation",
      "Coherence",
      "Performance",
      "Creativity",
    ],
    rows: [
      {
        label: "Email",
        value: "contact@mskcreation.net",
        href: "mailto:contact@mskcreation.net",
      },
      {
        label: "Landline",
        value: "+223 44 90 76 32",
        href: "tel:+22344907632",
      },
      {
        label: "Mobile · WhatsApp",
        value: "+223 70 68 90 91",
        href: "https://wa.me/22370689091",
      },
      {
        label: "France",
        value: "+33 7 53 77 05 79",
        href: "tel:+33753770579",
      },
      {
        label: "Address",
        value: "Bamako, ACI 2000, Mali",
        muted: true,
      },
      {
        label: "Reply",
        value: "Within 24 h: French, English, Bambara",
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
    formNote: "* Required fields. Reply within 24 business hours.",
    submitLabel: "Send →",
    submitLoadingLabel: "Sending…",
    whatsappLabel: "Message on WhatsApp",
    successEyebrow: "Brief received",
    successTitle: "Thank you, your message has been received.",
    successBody:
      "We reply within 24 business hours. For urgent matters, message us on WhatsApp.",
    errorRequired: "This field is required.",
    errorEmail: "Please enter a valid email address.",
    fields: [
      {
        name: "name",
        label: "Full name *",
        placeholder: "Mathieu Diallo",
        required: true,
        type: "text",
      },
      {
        name: "email",
        label: "Email *",
        placeholder: "diallo@company.com",
        required: true,
        type: "email",
      },
      {
        name: "company",
        label: "Company",
        placeholder: "Your organization name",
        type: "text",
      },
      {
        name: "service",
        label: "Service",
        placeholder: "Select...",
        type: "select",
        options: [],
      },
      {
        name: "budget",
        label: "Indicative budget",
        placeholder: "Select a range...",
        type: "select",
        options: [],
      },
      {
        name: "message",
        label: "Your project *",
        placeholder: "Describe your project and goals...",
        required: true,
        type: "textarea",
      },
    ],
  },
};
