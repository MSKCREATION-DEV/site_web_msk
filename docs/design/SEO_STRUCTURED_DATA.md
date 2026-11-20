# Spec SEO — données structurées, partage, crawl

**Statut :** validé pour implémentation code (option B audit) — 2026-11-18.  
**Primauté :** content `app/content` + assets Figma/`public` uniquement. Pas d’invention marketing.

Voir aussi : [`DESIGN_DECISIONS.md`](./DESIGN_DECISIONS.md) § SEO, questions ouvertes [`FIGMA_OPEN_QUESTIONS.md`](../validation/FIGMA_OPEN_QUESTIONS.md).

---

## 1. Open Graph / Twitter image

| Usage | Asset (déjà dans `public`) | Raison |
|-------|----------------------------|--------|
| **Default site** (`og:image` / `twitter:image` home + fallback) | `/assets/hero/slide-01.png` | Visuel hero Figma Desktop, déjà alt content |
| **Fiche projet** | Cover fiche `project.cover.src` (fallback `worksCover`) | Asset projet existant, pas d’image inventée |

**Hors scope V1 :** génération d’une OG 1200×630 dédiée Figma.  
**Poids connu :** `slide-01.png` source ~8 Mo pour `og:image` (PNG). **Ne pas recompresser / recadrer** ce PNG pour OG sans asset Figma dédié. Les dérivés AVIF/WebP réduisent le LCP navigateur via `OptimizedImg` ; les crawlers sociaux qui tirent `og:image` voient encore le PNG lourd — dette acceptée jusqu’à export OG validé.

Meta associées (code) : `og:site_name`, `og:image`, `twitter:image`, `twitter:card=summary_large_image`.

Origine absolue : `VITE_SITE_ORIGIN` (prod obligatoire). Assets CDN : `VITE_ASSET_BASE_URL` si présent, sinon origine site.

---

## 2. JSON-LD (SSR via `script:ld+json` React Router)

### Home (`/fr`, `/en`)

`@graph` :

1. **Organization** — `name` = brand content, `url` = origin, `logo` = `/assets/logo/msk-creation.svg`, `email` = content contact, `address` = row contact « Adresse » / « Address » (`postalAddressFromContactRows`, ex. Bamako / ACI 2000 / ML). **`sameAs`** = hrefs déjà présents dans `footer.social` (Instagram / TikTok / LinkedIn Figma) — pas d’URL inventée.
2. **WebSite** — `url`, `name`, `inLanguage` fr|en, lien `publisher` → Organization.
3. **Person** (équipe) — pour chaque membre content : `name`, `jobTitle` (= role), `worksFor` → Organization. Liste = `app/data/team.ts` + copy FR/EN (10 personnes, dont **Eric Golo**). **Pas de bio / URL perso / email perso** sans validation éditoriale (schéma UI = name + role uniquement).

### Fiche projet

- **CreativeWork** (ou `ImageObject` si cover seule) : `name` = titre content, `description` = copy fiche si non vide, `url` = canonical locale, `image` = cover absolue, `creator` = Organization.

### Page équipe (`/fr/equipe`, `/en/team`)

`@graph` :

1. **Organization** — même règles que la home (`sameAs` footer uniquement).
2. **CollectionPage** — `name` / `description` = meta content page équipe, `url` = canonical locale, `mainEntity` = **ItemList** de Person (name + jobTitle + worksFor).

Langue JSON-LD : alignée sur la locale de la page (noms/rôles FR ou EN selon content).

---

## 2bis. Mots-clés (politique 2024+)

- **Pas** de balise `meta name="keywords"` (ignorée / bruit).
- Signal utile : **intent** dans `title`, **H1**, `meta description`, alts images, copy SSR visible, JSON-LD.
- Titles / descriptions = dérivés de `app/content` (hero, fiches, page équipe) — pas de stuffing ni slogans inventés hors Figma/content.

---

## 3. Alts équipe

Pattern **obligatoire** (données existantes uniquement) :

```text
{name}, {role} · MSK Création
```

Ex. : `Amadou Samba Guiro, Responsable technique · MSK Création`  
Séparateur `·` (conforme règle ponctuation : pas de `—` / `–`).

---

## 4. robots.txt + sitemap.xml

| Route | Rôle |
|-------|------|
| `/robots.txt` | `Allow: /` + `Sitemap: {origin}/sitemap.xml` |
| `/sitemap.xml` | Home FR/EN + équipe (`/fr/equipe`, `/en/team`) + 7 fiches FR (`/fr/travaux/:slug`) + 7 EN (`/en/projects/:slug`) |

Pas d’URL inventée.  
`lastmod` : constante documentée `SITEMAP_CONTENT_LASTMOD` dans `app/lib/seo/sitemap.ts` (révision content indexable). Pas de dates inventées par URL sans source data. Mettre à jour la constante quand home / équipe / deck changent de façon crawlable.

Guide ops Search Console : [`docs/ops/GOOGLE_SEARCH_CONSOLE.md`](../ops/GOOGLE_SEARCH_CONSOLE.md).

---

## 5. Ponctuation copy

Interdit dans littéraux UI (`app/content`, `app/data`) : tiret cadratin `—`, demi-cadratin `–`.  
Remplacer par `.` `,` `:` ou `·`. Garde-fou : `npm run check:copy`.

---

## 6. Bloqué sans validation éditoriale / produit

| Sujet | ID | Note |
|-------|-----|------|
| `sameAs` hors liens footer Figma | Q20 | Liens footer déjà branchés ; nouveaux réseaux = validation |
| Bios Person / pages auteur | Q21 | Roles Figma seulement |
| Alts projets « marketing » riches | Q22 | V1 = titre (+ index galerie) ; enrichissement copy à valider |
| Options Service / Budget formulaire | Q03 | Selects vides |
| Backend contact Resend | Q23 fermée | Runbook `CONTACT_BACKEND.md` ; envoi si env activée ; UX honnête sinon |
| OG 1200×630 Figma dédiée | P2 | Ne pas recompresser le PNG ~8 Mo sans export dédié |

---

## 7. Checklist implémentation (P0)

- [x] Spec (ce document)
- [x] `app/lib/seo` : og/twitter image, site_name, helpers JSON-LD
- [x] Injection meta home + fiches
- [x] Meta + JSON-LD page équipe + OG default
- [x] robots + sitemap (home + équipe + deck 7×2) + `lastmod` révision content
- [x] Alts équipe pattern
- [x] Doc `VITE_SITE_ORIGIN` prod
- [x] Guide Search Console (`docs/ops/GOOGLE_SEARCH_CONSOLE.md`)
- [x] Skill `seo-review` étendue
- [x] Pas de `meta keywords` (intent via title/H1/description/alts)
