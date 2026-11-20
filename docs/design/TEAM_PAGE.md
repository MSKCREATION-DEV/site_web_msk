# Page Équipe — magazine de talents

**Date** : 2026-11-20  
**Routes** : `/fr/equipe` · `/en/team`  
**Home** : section `#equipe` (Figma 2:19) **inchangée**.

## Direction artistique

Refonte radicale hors grille 3 colonnes / annuaire. Concept éditorial :

> **Derrière chaque idée, des talents…**

Composition asymétrique type magazine, photos full-bleed valorisées, typo expressive (Bricolage display + Instrument Serif pour accents), flip 3D soigné (inspiration structurelle [Voyageurs du Monde / voyage sur-mesure](https://www.voyageursdumonde.fr/voyage-sur-mesure) : cards interactives + storytelling, **sans** copie branding / textes / images).

Identité MSK : Encre `#0D1330`, bleu `#1D73BC`, corail `#FF5A3C`, Jost / Bricolage / Instrument Serif.

### Sections

1. **Intro** — H1 concept + lead collectif.
2. **Collectif** — manifeste court (zéro sous-traitance, complémentarité).
3. **Galerie éditoriale** — lead + paires (2×6 puis 8×6, pas d’orphelin), flip recto-verso.
4. **Complémentarité** — quatre pôles métiers (pas un org chart RH).
5. **Conclusion** — phrase mémorable + CTA brief (`/#contact`).

### Carte talent

| Face | Contenu |
|------|---------|
| Recto | Photo réelle, nom, rôle, index graphique, invitation discrète |
| Verso | Présentation · expertise · contribution · impact · signature (+ email si validé) |

Interaction : hover flip Desktop (pointeur fin) · tap mobile · clavier (`aria-expanded`) · `prefers-reduced-motion` = fade overlay sans `rotateY`.

## Sources ERP / organisation (publiques-pro)

Projet : `labs/erp_msk`.

| Source | Usage |
|--------|--------|
| `src/lib/org/team.ts` (`MSK_TEAM`, `ORG_LEVEL_KEYS`) | Noms, hiérarchie L0→L4, titres internes, pattern e-mail pro |
| `docs/ops/CREATE-MARKETING-COLLABS.md` | Postes Marketing (Fatimatou, Espoir, Djouldé, Eric), pôle Communication & Marketing, e-mails pro |
| `docs/guides/SUIVI-GUIDES.md` (entrée org 2026-11-16) | Hiérarchie à jour (Espoir sous Guiro ; Yaye / Fatimatou / Djouldé / Eric sous Espoir) |
| `public/team/*.jpg` / `docs/msk/team` | Confirmation roster photos (site = `public/assets/team`) |

**Non utilisés (privé / sensible)** : salaires, fiches de paie, contrats individuels, absences, documents GED perso, téléphones perso, IDs Auth/RH.

## Règles copy

- Rôles affichés = labels **site vitrine** déjà validés (home / Figma), pour cohérence.
- Verso = textes riches mais factuels, dérivés du **rôle public** + faits org (pôle, complémentarité).
- Pas de diplôme, titre dirigeant inventé, ni bio marketing non sourcée.
- Pas de tiret cadratin / demi-cadratin.
- Email public affiché : Eric uniquement (`e.golo@mskcreation.net`, déjà fourni produit).

## Gaps à valider (humain)

| Sujet | Site actuel | ERP org / ops | Action |
|-------|-------------|-----------------|--------|
| Ismaël | Lead développeur | Directeur Technique (`MSK_TEAM`) | Trancher label public |
| Amadou | Responsable technique | Développeur Web & Mobile | Trancher label public |
| Isdalinia | Co-fondatrice | Co-fondatrice & Designer | Ajouter « Designer » ? |
| Lidaou / Espoir | Vidéaste & graphiste | Org « Monteur Vidéo » · ops « Vidéaste & Graphisme » | Harmoniser |
| Yaye | Commerciale | Stagiaire Commerciale | Trancher (stage vs titre) |
| Djouldé | Stagiaire community | Ops « Community Manager » · org « Stagiaire Community » | Trancher |
| Eric | Eric Golo · Monteur Vidéo | Eric Wilfried Golo | Afficher second prénom ? |
| E-mails hors Eric | Non publiés | Pattern `initiale.nom@mskcreation.net` | OK produit pour publier ? |
| Lieu Espoir (Togo) | Non | Ops CREATE-MARKETING | Mention page ? (tél. perso : non) |

## Assets

Uniquement `public/assets/team/{slug}.{png,webp,avif}` — pas Unsplash / IA.
