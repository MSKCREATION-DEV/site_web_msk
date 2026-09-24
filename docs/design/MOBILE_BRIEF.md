# Brief mobile — MSK Création (en attendant Figma)

**Statut :** document de cadrage uniquement.  
**Interdit :** inventer une UI mobile ou des breakpoints « au feeling » pour livrer du code responsive.

Le design mobile Figma n’existe pas encore (Lisez-moi : « version mobile » à compléter). Ce brief prépare le designer et l’équipe dev.

---

## Objectifs

1. Conserver la **fidélité Desktop** comme source de vérité actuelle.
2. Lister les contraintes produit pour que le designer livre une maquette mobile cohérente.
3. Préparer l’architecture (pas l’UI) : structure composants, contenu, SEO déjà i18n.

---

## Contexte Desktop figé

- Canvas : **1440 px**
- One-page : Nav → Hero → Travaux → CTA → Services → Équipe → Approche → Contact → Footer
- Transitions : **96 px**
- Dark UI, accent bleu `#137dc5`, typo multi-font (voir `DESIGN_TOKENS.md`)
- Intro rideau 1s, filtres Travaux, overlay fiches projet

---

## Ce que le brief mobile doit couvrir (demande designer)

Pour **chaque** section Desktop, livrer au minimum :

| Livrable | Description |
|----------|-------------|
| Frame mobile | Largeur cible à valider (ex. 390 / 375) — **choix designer** |
| Navigation | Menu (drawer / full-screen / sticky) — états ouvert/fermé |
| Hero | Hierarchie titre, CTAs, diaporama / mot rotatif sur petit écran |
| Travaux | Grille 1 col ? filtres wrap ? hauteur cartes |
| CTA 03b | Vidéo / image full-bleed mobile |
| Équipe | 2×5 Desktop → stacking (combien par rangée) |
| Contact | Champs full width, bouton, WhatsApp |
| Fiche projet | Overlay vs page pleine ; barre fixe ; galerie |
| Intro / BackToTop | Comportement tactile |

États : défaut, focus, erreur formulaire — alignés sur `240:436`.

---

## Contraintes techniques à respecter dans la maquette

- Pas de contenu inventé hors copy Desktop (traduction EN ok).
- Assets = mêmes sources Figma (recadrages mobiles possibles).
- Accessibilité : zones tactiles ≥ 44×44 px recommandées.
- Performance : LCP hero ; éviter autoplay vidéo sans poster.
- SEO : un seul H1 ; pas de contenu critique caché uniquement en CSR.

---

## Breakpoints — politique code

| Phase | Comportement code |
|-------|-------------------|
| V1 actuelle | **Desktop-first** selon Figma 1440 ; pas de layout mobile inventé |
| Après Figma mobile | Implémenter **uniquement** les frames livrés |
| Brief seul | Document + tickets designer — **zéro CSS responsive spéculatif** |

Si un composant nécessite un minimum de fluidité (ex. `max-w`, images `w-full`) sans changer la composition Desktop, c’est acceptable. Changer colonnes / ordre / navigation = **interdit** sans maquette.

---

## Mapping sections (à remplir quand Figma mobile arrive)

| Section Desktop | Node Desktop | Node Mobile | Notes |
|-----------------|--------------|-------------|-------|
| 01 Navigation | PENDING | — | |
| 02 Hero | PENDING | — | |
| 03 Travaux | PENDING | — | |
| 03b CTA | PENDING | — | |
| 04 Services | PENDING | — | |
| 05 Équipe | PENDING | — | |
| 06 Approche | PENDING | — | |
| 09 Contact | PENDING | — | |
| 10 Footer | PENDING | — | |
| Intro | `9:45` | — | |
| Fiche projet | template | — | |

---

## Livrables attendus du designer

1. Page Figma « MSK — Mobile » (ou frames dans le même fichier).
2. Variantes composants (carte projet, équipe, filtres) en largeur mobile.
3. Annotations interactions (menu, swipe galerie si applicable).
4. Confirmation : mêmes  projets grille Travaux.

---

## Suivi

- Owner design : à assigner  
- Owner dev : implémentation **après** validation des frames mobile  
- Lien plan : Phase 0 todo `p0-mobile-brief` / Phase 10 QA mobile différée
