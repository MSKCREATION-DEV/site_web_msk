---
name: react-router-ssr
description: Patterns React Router Framework Mode SSR pour MSK (routes, loaders, meta, i18n).
---

# React Router SSR — MSK

## Routes

- Déclarer dans `app/routes.ts` avec `route`, `index`, `layout`, `prefix`.
- Locale dans le path : `:lang` ∈ `fr` | `en`.
- Projets : FR `travaux/:slug`, EN `projects/:slug`.

## Loaders

- Lire content + data côté serveur.
- Valider `lang` avec `~/i18n`.
- Retourner 404 via `data()` / `throw` Response si slug inconnu.

## Meta

- Utiliser `~/lib/seo` + content locale.
- Inclure alternate hreflang quand les deux locales existent.
