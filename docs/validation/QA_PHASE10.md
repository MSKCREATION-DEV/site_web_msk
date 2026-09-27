# QA Phase 10 — MSK Création (2026-09-25)

Environnement : `npm run build` + `PORT=4173 npm run start`  
Origine meta : `VITE_SITE_ORIGIN` (défaut `http://localhost:5173`)

## Automatisé

| Check | Résultat |
|-------|----------|
| `npm run typecheck` | OK |
| `npm run build` | OK |
| `GET /` → `/fr` | 200 |
| `GET /fr` | 200 |
| `GET /en` | 200 |
| `GET /fr/travaux/koundji-services` | 200 |
| `GET /en/projects/koundji-services` | 200 |
| `GET /fr/travaux/missing` | 404 |
| `GET /xx` | 404 |
| `GET /en/travaux/...` (mauvais segment) | 404 |
| `GET /fr/projects/...` (mauvais segment) | 404 |

## SEO / SSR (`/fr`)

| Check | Résultat |
|-------|----------|
| `html lang=fr` | OK |
| `<title>` depuis content | OK (`MSK Création`) |
| meta description | OK |
| canonical | OK |
| hreflang fr / en / x-default | OK |
| og:title | OK |
| H1 unique | OK (1) |
| Contenu hero SSR (« Nous créons ») | OK |

## SEO fiche (`/en/projects/koundji-services`)

| Check | Résultat |
|-------|----------|
| `lang=en` | OK |
| title `Koundji Services \| MSK Creation` | OK |
| H1 unique | OK |
| Barre Fermer (Close) | OK |

## Sémantique / a11y structure

| Check | Résultat |
|-------|----------|
| Skip link → `#main` | OK |
| `header` / `main` / `footer` | OK |
| Sections `#travaux` `#services` `#contact` | OK |
| Labels formulaire (`htmlFor`) | OK (Phase 7.5) |

## Visuel Desktop vs Figma

Comparaison manuelle requise à 1440 px (`npm run dev`). Écarts connus / PENDING :

| Item | Statut |
|------|--------|
| Galeries + Avant/Après (PNG 1×1) | Q13 — re-export |
| Fond photo Contact | Q12 |
| Options Service / Budget | Q03 |
| Accent/Ocre hex Figma | Q02 |
| Mobile | Brief seulement — pas de QA mobile inventée |

## Prod

Avant go-live : `VITE_SITE_ORIGIN=https://domaine-reel` dans l’env de build.
