# Page Équipe — magazine de talents

**Date** : 2026-11-20 (refonte plaque éditoriale)  
**Routes** : `/fr/equipe` · `/en/team`  
**Home** : section `#equipe` (Figma 2:19) **inchangée** (`TeamCard` Figma, pas `TeamFlipCard`).

## Direction artistique

Concept éditorial :

> **Derrière chaque idée, des talents…**

Composition magazine, photos **pleine chroma** (sans voile sombre au repos), typo expressive (Bricolage display + Instrument Serif), reveal panneau Encre.

Recherche patterns : `docs/design/TEAM_CARD_PATTERNS.md`.

Identité MSK : Encre `#0D1330`, bleu `#1D73BC`, corail `#FF5A3C`, Jost / Bricolage / Instrument Serif. Fond portrait papier `#DCE0E8`.

### Sections

1. **Intro** — H1 concept + lead collectif.
2. **Collectif** — manifeste court (zéro sous-traitance, complémentarité).
3. **Galerie éditoriale** — fondateurs (span 6) · cadres (span 4) · collabs (3×4 + 2×6).
4. **Complémentarité** — quatre pôles métiers.
5. **Conclusion** — phrase mémorable + CTA brief (`/#contact`).

### Carte talent (plaque éditoriale)

| Zone | Contenu |
|------|---------|
| Photo | Portrait net, fond papier, léger zoom au reveal. **Aucun scrim / gradient sur le visage au repos.** |
| Légende | Sous la photo : index, nom, rôle, invitation discrète (serif bleu) |
| Panneau | Slide depuis le bas (Encre) : présentation / expertise / contribution / impact / signature (+ email si data) |

Interaction : hover Desktop (pointeur fin) · tap mobile (`.is-open`) · clavier (`aria-expanded`) · `prefers-reduced-motion` = fade sans `translateY`.

### Niveaux visuels (`tier` dans `app/data/team.ts`)

Hiérarchie éditoriale page `/equipe` (pas un titre affiché ; rôles UI restent les labels site). Source : ERP `ORG_LEVEL_KEYS` / `MSK_TEAM` + rôles site (Responsable / Lead / Chef).

| `tier` | Personnes | ERP / critère | UI |
|--------|-----------|---------------|-----|
| `founder` | Mathieu Diarra, Isdalinia Boisseaux | L0 · Fondateur / Co-fondatrice | Span 6, ratio 3/4, filet bleu sur média, légende bordure bleue + trait corail, nom display, rôle serif |
| `cadre` | Andile Boussari, Ismaël Oussi, Amadou Samba Guiro | L1 + Responsable technique (site) | Span 4 (triptyque), barre bleue inset média + légende, rôle teinté bleu |
| `collaborator` | Lidaou Espoir Awesso, Fatimatou Diallo, Yaye Bah, Djouldé Keita, Eric Golo | L3–L4 | Span 4 puis 6×2, typo plus légère, filet subtil, panneau bordure bleue fine |

Home `#equipe` (`TeamCard` Figma) inchangée.

## Sources ERP / organisation (publiques-pro)

Projet : `labs/erp_msk`.

| Source | Usage |
|--------|--------|
| `src/lib/org/team.ts` (`MSK_TEAM`, `ORG_LEVEL_KEYS`) | Noms, hiérarchie L0→L4, titres internes, pattern e-mail pro |
| `docs/ops/CREATE-MARKETING-COLLABS.md` | Postes Marketing, pôle Communication & Marketing, e-mails pro |
| `docs/guides/SUIVI-GUIDES.md` (entrée org 2026-11-16) | Hiérarchie à jour |
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
| Yaye | ~~Commerciale~~ → **Stagiaire commerciale** | Stagiaire Commerciale | Clos (validation produit 2026-11-20) |
| Djouldé | Stagiaire community | Ops « Community Manager » · org « Stagiaire Community » | Clos : garder « Stagiaire community » |
| Eric | ~~Monteur Vidéo~~ → **Stagiaire monteur vidéo** | Eric Wilfried Golo | Stage clos ; second prénom = PENDING |
| E-mails hors Eric | Non publiés | Pattern `initiale.nom@mskcreation.net` | OK produit pour publier ? |
| Lieu Espoir (Togo) | Non | Ops CREATE-MARKETING | Mention page ? (tél. perso : non) |

## Assets

Uniquement `public/assets/team/{slug}.{png,webp,avif}` — pas Unsplash / IA.
