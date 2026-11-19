import type { LocaleContent } from "../types";

export const projectSheet: LocaleContent["projectSheet"] = {
  expertiseLabel: "Expertise",
  realizationsLabel: "RÉALISATIONS",
  approachLabel: "APPROCHE",
  nextProjectBracketLabel: "PROJET SUIVANT",
  prevProjectBracketLabel: "Projet précédent",
  worksNavLabel: "Travaux",
  beforeAfterEyebrow: "AVANT / APRÈS",
  beforeAfterSubtitle:
    "L’identité Koundji Services, avant et après notre intervention.",
  beforeLabel: "AVANT",
  afterLabel: "APRÈS",
  closeLabel: "Fermer",
  nextLabel: "Suivant",
  prevLabel: "Précédent",
  backToWorksLabel: "Retour aux travaux",
};

/** Copy = audit Figma fiches + Q24 boards (2026-11-18). */
export const projects: LocaleContent["projects"] = {
  prosperity: {
    title: "PROSPERITY",
    category: "MANAGEMENT MALI",
    eyebrow: "[ Prosperity Management Mali ]",
    sheetTags: "IDENTITÉ VISUELLE · CHARTE GRAPHIQUE · ARCHITECTURE DE MARQUE",
    description:
      "Un groupe malien et ses quatre filiales, Travel, Market, Farm et BTP, réunis sous un même aigle. Nous avons bâti une architecture de marque où chaque entité porte sa propre couleur, tandis que l’or et la structure restent communs : un groupe sobre, à l’allure internationale, sans pastiche.",
    realizations: [
      "Logo et architecture de marque",
      "Charte",
      "Papeterie, badges, signatures mail",
      "Signalétique et véhicules",
      "Réseaux sociaux",
      "Site web Prosperity Travel",
    ],
    approach:
      "L’aigle du Mali devient le signe commun : il surplombe, il protège, il voit loin. L’or et la structure sont partagés, chaque filiale reçoit sa couleur. On reconnaît l’entité d’un coup d’œil, et le groupe derrière elle.",
    coverAlt:
      "Façade Prosperity Management Mali, logo aigle doré et totem navy à Bamako",
    galleryAlts: [
      "Femme en robe blanche, voile bleu au vent sur un balcon surplombant Bamako au crépuscule, logo Prosperity Management Mali",
      "Architecture de marque Prosperity : cinq entités, Management Mali, Travel, Market, Farm et BTP, chacune sur sa couleur",
      "Homme en costume regardant la skyline nocturne depuis une baie vitrée, logo Prosperity Management Mali",
      "Groupe de trois professionnels marchant dans un hall lumineux, logo Prosperity Management Mali",
      "Papeterie Prosperity Management Mali : cartes de visite, chemise, enveloppe, porte-documents et stylo or sur fond navy",
      "Bannière Prosperity Travel : femme en tenue bleue et or, voile au-dessus du pont de Bamako, slogan Partir en toute sérénité",
    ],
  },
  "thoy-art": {
    title: "THÒY ’ART",
    category: "APP MOBILE · SITE WEB · BRANDING",
    eyebrow: "[ Thòy ’Art ]",
    sheetTags: "SITE WEB · APP MOBILE · BRANDING",
    description:
      "Thòy ’Art est un mouvement culturel haïtien qui œuvre au développement et à la préservation de la culture haïtienne. Site, application et identité intègrent délibérément des éléments de cette culture, pour que le design parle la même langue que le mouvement.",
    realizations: [
      "Identité visuelle",
      "Application mobile",
      "Site web",
      "Supports événementiels",
    ],
    approach:
      "Thòy’Art est un combat : préserver une culture, la transmettre, refuser qu’elle s’efface. Le design devait porter cette voix, pas la décorer. Le rouge de l’engagement, l’écriture manuscrite comme une signature au bas d’un manifeste, et une application qui met entre toutes les mains les artistes, les événements et la mémoire du mouvement.",
    coverAlt:
      "Main tenant un téléphone affichant l’application Thòy ’Art devant une galerie d’art",
    galleryAlts: [
      "Portrait de nuit, femme yeux fermés et foulard coloré, logo manuscrit Thòy ’Art",
      "Merchandising Thòy ’Art sur fond rouge : tote, carnet, badge, pinceaux et tanbou",
      "Bannière rue Thòy ’Art : bâtiment turquoise et jaune, logo circulaire et moto-taxi",
    ],
  },
  "koundji-services": {
    title: "KOUNDJI",
    category: "IMMOBILIER · SITE WEB · BRANDING",
    eyebrow: "[ Koundji Services ]",
    sheetTags: "SITE WEB · BRANDING · LOGO",
    description:
      "Transformation complète de l’image de marque : site web moderne, nouvelle identité graphique, charte et logos pour cette agence immobilière de Bamako.",
    realizations: [
      "Nouveau logo",
      "Charte graphique",
      "Site web",
      "Papeterie et supports",
    ],
    approach:
      "Un toit qui protège, une fenêtre allumée : le nouveau logo dit simplement que quelqu’un veille sur votre bien. Le marine rassure, l’orange réchauffe. Le site place la tranquillité au premier plan, pour les propriétaires sur place comme pour la diaspora.",
    coverAlt:
      "Agent Koundji Services remettant les clés d’un bien devant un immeuble moderne",
    galleryAlts: [
      "Papeterie Koundji Services : dossier, cartes de visite et clés sur fond marine et orange",
      "Accueil clients à la réception Koundji Services, logo sur le mur",
      "Bannière chantier Koundji Services : Votre bien. Votre tranquillité.",
      "Mockup navigateur du site Koundji Services, liste des biens disponibles à Bamako",
      "Mockup navigateur Koundji Services, section garanties et sécurité pour la diaspora",
    ],
    beforeAlt: "Ancien logo Koundji Services, initiales KS sous un toit stylisé",
    afterAlt: "Nouveau logo Koundji Services, toit marine et orange au-dessus du wordmark",
  },
  bomoyi: {
    title: "BOMOYI",
    category: "SITE WEB · UX/UI",
    eyebrow: "[ Association Bomoyi ]",
    sheetTags: "SITE WEB · UX/UI · COMMUNICATION",
    description:
      "Bomoyi est une association qui milite pour l’éducation, la culture et le bien-être de tous. Nous avons refondu son site web pour mettre en valeur ses actions auprès des donateurs, renforcer sa visibilité et rendre ses projets et engagements accessibles en quelques clics.",
    realizations: [
      "Refonte du site web",
      "UX/UI",
      "Version mobile",
      "Mise en valeur des actions",
    ],
    approach:
      "Faire du site une fenêtre ouverte sur le terrain : chaque projet raconté par ceux qui le vivent, chaque engagement accessible en quelques clics, et un chemin clair pour s’engager à son tour.",
    coverAlt:
      "Ordinateur portable affichant le site Bomoyi devant une salle de classe",
    galleryAlts: [
      "Femme et fillette lisant dehors, logo Bomoyi en overlay blanc",
      "Flatlay Bomoyi vert : tote bag, cahiers et crayons de couleur",
      "Jeune femme au t-shirt Bomoyi entourée d’enfants en uniforme scolaire",
      "Cahiers Bomoyi sur un pupitre d’école avec crayons et dessin d’enfant",
      "Femme souriante au marché portant un tote bag logo Bomoyi",
      "Entrée du centre Bomoyi avec enseigne logo et passage d’élèves",
    ],
  },
  ecosol: {
    title: "ECOSOL",
    category: "BRANDING · LOGO · IDENTITÉ VISUELLE",
    eyebrow: "[ ÉCOSOL Énergie Solaire ]",
    sheetTags: "BRANDING · LOGO · IDENTITÉ VISUELLE",
    description:
      "ECOSOL Énergie Solaire nous a confié la création de son logo et de son identité visuelle : une marque solaire, lisible et fiable, déclinée sur ses supports et son enseigne pour accompagner sa présence sur le terrain et en ligne.",
    realizations: [
      "Logo",
      "Identité visuelle",
      "Tenues et véhicules",
      "Enseigne et supports",
    ],
    approach:
      "Un soleil qui se lève derrière un panneau posé sur un toit : l’énergie, l’installation et le foyer réunis en un seul signe. Le bleu pour la fiabilité, l’orange pour le soleil.",
    coverAlt:
      "Technicien Ecosol de dos installant des panneaux solaires sur un toit",
    galleryAlts: [
      "Portrait collaboratrice Ecosol au foulard bleu, logo Ecosol en overlay blanc",
      "Flatlay Ecosol bleu et orange : panneau, casque, cartes, carnet et ampoule",
      "Deux techniciens Ecosol chargeant un panneau solaire sur un pick-up blanc",
      "Casque blanc Ecosol et gants sur des panneaux solaires",
      "Collaboratrice Ecosol en polo navy tenant une tablette devant des panneaux",
      "Enseigne Ecosol Énergie Solaire à l’entrée d’une centrale solaire",
    ],
  },
  "elvi-creation": {
    title: "ELVI",
    category: "BRANDING · PACKAGING · E-COMMERCE",
    eyebrow: "[ ELVI Creation ]",
    sheetTags: "E-COMMERCE · IDENTITÉ VISUELLE · PACKAGING",
    description:
      "ELVI CREATION, marque de maroquinerie franco-togolaise, nous a confié son entrée sur le marché international : un site e-commerce, une nouvelle identité graphique et de nouveaux logos, pensés pour porter le savoir-faire artisanal de la marque au-delà de ses frontières.",
    realizations: [
      "Identité visuelle et logos",
      "Packaging",
      "Site e-commerce",
      "Visuels de campagne",
    ],
    approach:
      "Le V ailé : un savoir-faire qui prend son envol. Le noir et l’or pour l’écrin, le wax pour la signature, et une boutique en ligne pensée comme la vitrine d’une maison de créateur.",
    coverAlt:
      "Sac shopping noir Elvi Création aux poignées or, accroché à une poignée de porte",
    galleryAlts: [
      "Affiche Elvi Création dans une station de métro parisienne",
      "Panneau 4x3 Elvi Création à Lomé au coucher du soleil",
      "Coffret noir Elvi Création et sac sur blocs de travertin",
      "Sac rouge Elvi Création et pochon noir siglé sur socle en pierre",
      "Carte et packaging Elvi Création or sur textile wax noir et blanc",
      "Écran vitrine Elvi Création dans une boutique parisienne au crépuscule",
      "Mockup navigateur du site Elvi Création, hero Bijoux en rouge",
      "Mockup navigateur Elvi Création, grille des pièces phares sacs",
      "Mockup navigateur Elvi Création, bandeau Instagram @elvicreation",
      "Mockup navigateur Elvi Création, page La Maison Née à Lomé",
      "Mockup navigateur Elvi Création, newsletter et pied de page",
      "Mockup mobile Elvi Création, boutique sacs en grille",
      "Mockup mobile Elvi Création, fiche produit sac Elsha",
    ],
  },
  akwaba: {
    title: "AKWABA",
    category: "CONCIERGERIE PRIVÉE · LOMÉ",
    eyebrow: "[ Akwaba · Lomé ]",
    sheetTags: "SITE WEB · CHARTE GRAPHIQUE · LOGO",
    description:
      "Conciergerie privée de luxe à Lomé (assistance personnelle, réservations, événements, transport VIP), AKWABA voulait une image conforme aux standards internationaux. Nous avons conçu sa charte graphique et développé son site internet, sobres et exigeants comme sa clientèle.",
    realizations: [
      "Charte graphique",
      "Logo et monogramme A | K",
      "Site internet",
      "Papeterie",
    ],
    approach:
      "Akwaba veut dire bienvenue. Toute l’identité est pensée comme un accueil : le bleu nuit de la discrétion, l’or du service attentif, et une promesse simple, « L’excellence n’attend pas ».",
    coverAlt:
      "Concierge Akwaba à l’aéroport de Lomé tenant une pancarte de bienvenue",
    galleryAlts: [
      "Chauffeur Akwaba plaçant une valise dans le coffre d’un SUV Jetour",
      "Sac de voyage et étiquette AK devant un jet privé au coucher du soleil",
      "Papeterie Akwaba navy et or avec clé, verre et frangipanier",
      "Plaque Akwaba Conciergerie et chauffeur privé Lomé sur mur ensoleillé",
      "Flatlay Akwaba navy et or : carte, enveloppe, étiquette AK et clé de voiture",
      "Mockup mobile Akwaba, accueil chauffeur de luxe à Lomé",
      "Mockup mobile Akwaba, section Chauffeur Privé de Luxe",
      "Mockup navigateur Akwaba, hero excellence à Lomé et au-delà",
      "Mockup navigateur Akwaba, section Nos services chauffeur et VIP",
    ],
  },
};
