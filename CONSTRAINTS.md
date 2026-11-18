# Constraints — MSK Création

Last reviewed: 2026-11-18

Barre qualité projet. Ne pas affaiblir ce fichier pour faire passer un changement.
Lire aussi `AGENTS.md` + primauté Figma.

## Floor (toujours)

- Pas de nouveaux `@ts-ignore` / `@ts-expect-error` / `eslint-disable` sans exception datée ci-dessous
- Pas de secrets dans le dépôt
- Pas d’UI / copy / asset inventés hors Figma / charte / décisions documentées
- Pas de tiret cadratin `—` ni demi-cadratin `–` dans `app/content` / `app/data` (`npm run check:copy`)
- Ce fichier ne se réduit pas pour « passer au vert »

## Enforced with numbers

| Dimension | Rule | Checked by | Runs at |
|-----------|------|------------|---------|
| Types | Zéro erreur | `npm run typecheck` | chaque edit / CI |
| Copy dashes | Zéro `—` / `–` dans content/data | `npm run check:copy` | chaque edit / CI |
| Check combiné | typecheck + copy | `npm run check` | fin de tâche |

## Budgets perf / a11y (cibles produit — enforcement CI = P2)

| Dimension | Cible « Good » | Note |
|-----------|----------------|------|
| LCP | ≤ 2.5 s | Hero Desktop ; pipeline WebP/AVIF (`assets:compress`) + `OptimizedImg` → QA LCP P1 |
| CLS | ≤ 0.1 | Réserver dimensions images / fonts |
| INP | ≤ 200 ms | Interactions filtres / formulaire |
| WCAG | 2.1 AA (contraste, focus, labels) | Pas d’UI mobile inventée ; a11y Desktop Figma |

Commandes aspirées (pas encore branchées CI) :

- Lighthouse preview : LCP / CLS / perf score
- axe : zéro critical / serious sur `/fr` et une fiche

## Measured, not yet enforced

| Metric | Today | Direction |
|--------|-------|-----------|
| Poids hero `slide-01.png` | ~8.1 Mo PNG ; dérivés WebP/AVIF via pipeline | mesurer best format après `assets:compress` ; QA Figma |
| OG image dédiée 1200×630 | absente | utiliser hero temporairement |
| Self-host fonts | Google Fonts runtime | self-host pack charte (P2) |
| CI Lighthouse | absent | ajouter avec preview URL |

## Exceptions

| ID | Rule | Path | Reason | Owner | Expires |
|----|------|------|--------|-------|---------|
| E1 | Stub succès contact CSR | `contact-section.tsx` | Q23 backend non validé | produit | jusqu’à fermeture Q23 |
