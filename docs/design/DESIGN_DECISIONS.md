# Décisions de design / produit — MSK Création

Décisions verrouillées avec le client (2026-09-24) + choix experts documentés.

---

## Stack

| Décision | Choix | Raison |
|----------|-------|--------|
| React Router | **8.4.0** Framework Mode (`create-react-router@latest`) | Client : « latest » — livré en 8.x |
| SSR | `ssr: true` | SEO + plan projet |
| Tailwind | **4.3.x** + `@tailwindcss/vite` | Template officiel + docs v4 |
| daisyUI | **5.7.x** thème custom `msk` | `@plugin "daisyui"` — pas de pastels défaut |
| Icônes UI | **lucide-react** | Autorisé ; retrait si designer demande glyphes Figma |
| Contenu | Local `app/content` + `app/data` | V1 sans Directus |
| Assets | Locaux + `assetUrl()` / `VITE_ASSET_BASE_URL` | Switch R2 sans refacto composants |

---

## Scope contenu

| Décision | Choix |
|----------|-------|
| Projets | **Grille Travaux / APERÇU 6 uniquement** — fiches canvas supplémentaires = designer only |
| Avant/Après | Exactement le design : seulement si présent sur la fiche du projet |
| Articles | Hors V1 |
| WhatsApp | Reprendre les infos Figma telles quelles |
| CTA média | Tout exporter depuis Figma (vidéo / poster / secours) |
| Langues | **FR + EN** — dual content dès le départ |
| Mobile UI | Pas d’implémentation inventée — **brief séparé** en attendant Figma mobile |

---

## Routes (cible)

```
/        → redirect /fr
/fr
/en
/fr/travaux/:slug
/en/projects/:slug
```

Default locale : `fr`. Convention EN projets verrouillée : `/en/projects/:slug` (Q07 fermée).

---

## Cartes projet / équipe — survol

`ProjectCard` / `TeamCard` : survol structurel (scale + titre).  
Détail pixel overlay Figma (composants `58:2` / `58:28`) = **PENDING** jusqu’à réouverture MCP.

---

## Accent / Ocre (choix expert)

1. Priorité : variable Figma `Accent/Ocre` dès export MCP.
2. Sinon : dériver des fills ocre du canvas Desktop.
3. **Fallback actuel :** `#C4A574` — ocre chaud désaturé, lisible sur `#080808`, complémentaire au bleu `#137dc5` sans concurrence visuelle.

Toute valeur Figma différente **remplace** le fallback et est notée ici.

---

## Assets

```
Figma → public/assets/... → assetUrl(path)
V1  : ASSET_BASE_URL vide ou "/"
Later : ASSET_BASE_URL = https://cdn... (R2)
```

Règle : jamais Unsplash / image « similaire ».  
Signaler : `Asset X présent dans Figma mais source non disponible.`

---

## SEO

- Meta SSR par locale (`meta` React Router).
- Canonical + hreflang FR/EN.
- Contenu meta : dérivé des textes page ou validé — **pas inventé** marketing libre.
- Sitemap / robots / JSON-LD : phase ultérieure si validé.

---

## CSR vs SSR

| CSR | SSR |
|-----|-----|
| Intro curtain | Contenu sections |
| Filtres Travaux | Meta / HTML initial |
| Overlays fiches, animations | Texte, images, structure |
| Formulaire (états) | |

---

## Historique

| Date | Décision |
|------|----------|
| 2026-09-24 | Verrouillage Q&A client (RR latest, FR+EN, Lucide, grille projets, assets switch, brief mobile) |
| 2026-09-24 | Fallback ocre `#C4A574` |
| 2026-09-24 | Phase 0 docs + Phase 1 bootstrap (RR 8.4, TW 4.3, daisyUI 5.7, Lucide) — typecheck/build OK |
| 2026-09-24 | Phase 2 gouvernance Cursor + Phase 3 routes i18n `/fr|/en`, `/travaux` vs `/projects`, content FR+EN, `assetUrl` |
| 2026-09-24 | Phase 4 primitives UI + Phase 5 inventaire assets (export MCP bloqué — dossiers convention prêts) |
