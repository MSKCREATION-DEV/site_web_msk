export type TeamMemberCopy = {
  name: string;
  role: string;
  /** Phrase courte factuelle dérivée du rôle (home / fallback). */
  focus?: string;
  email?: string;
  service?: string;
  presentation?: string;
  expertise?: string;
  contribution?: string;
  impact?: string;
  signature?: string;
};

/**
 * Noms + rôles = source produit / Figma (home inchangée).
 * Portraits page Équipe = rôle public + faits org ERP publics (voir TEAM_PAGE.md).
 * Pas de diplôme / bio non sourcée.
 */
export const team: Record<string, TeamMemberCopy> = {
  "mathieu-diarra": {
    name: "Mathieu Diarra",
    role: "Fondateur",
    focus: "Direction de l'agence et pilotage stratégique des projets.",
    presentation:
      "Porte la vision de MSK Création et aligne chaque projet sur les ambitions du client.",
    expertise: "Pilotage stratégique, direction d'agence, arbitrages business.",
    contribution:
      "Cadre les priorités, sécurise les engagements et la cohérence de marque.",
    impact: "Une agence qui avance sans sous-traitance, avec une ligne claire.",
    signature: "La vision d'abord. L'exécution ensuite.",
  },
  "isdalinia-boisseaux": {
    name: "Isdalinia Boisseaux",
    role: "Co-fondatrice",
    focus: "Co-direction et coordination des livrables client.",
    presentation:
      "Co-pilote l'agence et veille à la qualité des livrables au quotidien.",
    expertise: "Coordination, exigence de rendu, relation client.",
    contribution: "Relie intention créative et livraison concrète.",
    impact: "Des projets tenus, des détails soignés.",
    signature: "La qualité se joue dans les détails.",
  },
  "andile-boussari": {
    name: "Andile Boussari",
    role: "Chef de projet",
    focus: "Suivi de planning, brief et relation client au quotidien.",
    presentation:
      "Orchestre briefs, plannings et échanges pour que chaque étape avance.",
    expertise: "Gestion de projet, suivi client, coordination des pôles.",
    contribution: "Transforme un brief en feuille de route claire.",
    impact: "Moins de friction, plus de clarté pour les équipes et les clients.",
    signature: "Le projet avance quand tout le monde sait où on va.",
  },
  "yahe-bah": {
    name: "Yaye Bah",
    role: "Commerciale",
    focus: "Développement commercial et qualification des briefs.",
    presentation:
      "Développe le portefeuille et qualifie les besoins dès le premier échange.",
    expertise: "Prospection, qualification de briefs, relation commerciale.",
    contribution: "Fait entrer les bons projets dans le pipeline MSK.",
    impact: "Des conversations commerciales utiles, sans bruit.",
    signature: "Écouter d'abord. Proposer ensuite.",
  },
  "amadou-samba-guiro": {
    name: "Amadou Samba Guiro",
    role: "Responsable technique",
    focus: "Architecture technique et qualité des livrables code.",
    presentation:
      "Garantit l'architecture et la solidité des livrables techniques.",
    expertise: "Architecture web, standards de qualité, transmission.",
    contribution:
      "Pose les bases pour que le code reste propre et reprisable.",
    impact: "Une stack claire, documentée, sans zone d'ombre.",
    signature: "La technique au service du produit.",
  },
  "fatimatou-diallo": {
    name: "Fatimatou Diallo",
    role: "Graphiste",
    focus: "Identité visuelle, supports print et assets digitaux.",
    presentation:
      "Dessine l'identité et les supports qui incarnent chaque marque.",
    expertise: "Identité visuelle, print, assets digitaux.",
    contribution:
      "Traduit la stratégie en formes, couleurs et compositions.",
    impact: "Une image de marque cohérente, sur tous les supports.",
    signature: "Chaque pixel compte.",
  },
  "lidaou-espoir-awesso": {
    name: "Lidaou Espoir Awesso",
    role: "Vidéaste & graphiste",
    focus: "Production vidéo et création graphique associée.",
    presentation:
      "Produit l'image en mouvement et les assets graphiques associés.",
    expertise: "Vidéo, montage, création visuelle · pôle Communication & Marketing.",
    contribution: "Donne une présence visuelle forte aux récits de marque.",
    impact: "Des contenus qui se retiennent et se diffusent.",
    signature: "L'image qui porte le message.",
  },
  "ismael-oussi": {
    name: "Ismaël Oussi",
    role: "Lead développeur",
    focus: "Développement front et back des sites et applications.",
    presentation:
      "Construit et structure les sites et applications que MSK livre.",
    expertise: "Développement front et back, qualité technique.",
    contribution:
      "Transforme les maquettes en produits robustes et maintenables.",
    impact: "Des expériences digitales stables, prêtes à évoluer.",
    signature: "Du code qui tient la route.",
  },
  "djoulede-keita": {
    name: "Djouldé Keita",
    role: "Stagiaire community",
    focus: "Animation et publication sur les réseaux sociaux.",
    presentation: "Anime la présence MSK et clients sur les réseaux.",
    expertise: "Publication, animation community, rythme éditorial.",
    contribution: "Maintient le lien entre la marque et son audience.",
    impact: "Une présence régulière, lisible, alignée.",
    signature: "La community se construit post après post.",
  },
  "eric-golo": {
    name: "Eric Golo",
    role: "Monteur Vidéo",
    focus: "Montage et finalisation des contenus vidéo.",
    email: "e.golo@mskcreation.net",
    service: "Communication & Marketing",
    presentation:
      "Finalise les montages pour des contenus prêts à diffuser.",
    expertise: "Montage, rythme, finition vidéo.",
    contribution: "Affine chaque séquence jusqu'au rendu final.",
    impact: "Des vidéos nettes, fluides, prêtes pour la diffusion.",
    signature: "Le rythme fait le récit.",
  },
};
