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
| Projets | **Grille Travaux 6** : Koundji Services, Thòy ’Art, Ecosol, Bomoyi, Akwaba, Elvi Creation |
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

## Accent / Ocre (audit 2026-09-25)

**Confirmé Figma :** `#C8742A` (variable `Accent/Ocre`, mode Sombre).  
Remplace l’ancien fallback expert `#C4A574`.

## Typographie (audit 2026-09-25)

Police UI : **Jost**. Display : **Bricolage Grotesque ExtraBold**. Accents : **Instrument Serif Italic**.  
Travaux : pas de H2 distinct → surtitre 12px.

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
- Canonical + hreflang FR/EN + `x-default` → `/fr`.
- Contenu meta : dérivé des textes page ou validé — **pas inventé** marketing libre.
- Open Graph : `og:title`, `og:description`, `og:url`, `og:locale` (+ alternate), `og:type`.
- Twitter card : `summary_large_image` (sans image OG dédiée tant que non fournie Figma).
- Origine absolue : `VITE_SITE_ORIGIN` (voir `.env.example`).
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
| 2026-09-24 | Phase 6 layout (Intro, Header, Footer, BackToTop) — pixels Nav/Footer PENDING MCP |
| 2026-09-25 | Exports manuels validés ; grille 6 projets + équipe 10 ; CTA sans vidéo |
| 2026-09-25 | Copy UI : pas de tiret cadratin (—) ; ponctuation point / virgule |
| 2026-09-27 | Copy UI : purge `—` / `–` restants (Hero, Équipe, Approche, Contact FR+EN) ; garde-fou `npm run check:copy` |
| 2026-09-27 | Favicon SVG marque MSK (`/favicon.svg` + webmanifest) ; perf : fonts poids réduits, LCP hero `fetchPriority`, images below-fold `loading=lazy` |
| 2026-09-25 | Phase 7.2 Travaux : filtres CSR + grille 6 ; hauteurs Courte/Haute proxy assets (Q10) |
| 2026-09-25 | APERÇU Grille projets : 2 cols (Koundji/Ecosol/Akwaba \| Thòy/Bomoyi/Elvi), px 112, gap 32, pb 56, légende + image, « Voir tous les projets » |
| 2026-09-25 | Phase 7.3–7.5 : CTA + Services + Équipe + Approche + Contact + Footer depuis captures Figma ; WhatsApp réel +223 70 68 90 91 ; options Service/Budget encore Q03 |
| 2026-09-25 | Footer : logo géant + grille 3 cols ; logo SVG fill noir → blanc (lisible sur fond dark) |
| 2026-09-25 | Phase 8 fiches grille : template KOUNDJI ; galeries/avant-après absents (Q13) |
| 2026-09-25 | Phase 9 SEO : canonical, hreflang fr/en/x-default, OG/Twitter, skip-link, `lang` html |
| 2026-09-25 | Phase 10 QA : typecheck/build OK ; smoke SSR routes 200/404 ; meta/H1/landmarks OK — voir `docs/validation/QA_PHASE10.md` |
| 2026-09-25 | Typo Desktop : Hero 88/110%/-2% ; titres section 64 ; Travaux 56 ; fiche 72/-1.44 ; utilitaires `.msk-*` ; Approche body = copy Figma ; équipe hover bleu + trait ; portrait 176×235 |
| 2026-09-25 | Audit Figma appliqué : Ocre `#C8742A` ; Jost ; tailles Hero/section/CTA/Contact ; cartes année+hover ; spacing 112/96 ; couleurs projet hover |
| 2026-09-25 | Ajustements captures scroll : nav transparente ; Travaux titre+filtres+compteur+CTA pilule ; Équipe 3 lignes + hover trait/bleu ; galerie Approche ; cards `#111` ; Contact Nom\|Email ; CTA mediaTabs ; Ecosol 2025/ocre |
| 2026-09-27 | Spec Desktop complète : gaps 96 dégradés ; Hero indicateurs + Dernièrement + accroche 520 ; Travaux hauteurs 400/580 + années/accents ; galerie Approche draggable ; Contact validation/loading/succès ; Footer dégradé ; BackToTop 32 px ; Reveal scroll ; padding fluide `msk-page-x` (sans inventer UI mobile) |
| 2026-09-27 | **Hero/Nav purge inventé** : retrait « Dernièrement », retrait switch EN du header (→ footer + drawer), nav Desktop grille 3 cols centrée, séparateurs marquee `·`. **Mobile interim Hero/Nav** : drawer plein écran (mêmes liens Figma), CTAs full-width stack, `100svh` — en attendant frames Figma mobile (`MOBILE_BRIEF.md`) |
| 2026-09-27 | Design tokens Tailwind `@theme` sémantiques (`max-w-msk`, `w-msk-logo`, `py-msk-x`, `grid-cols-msk-split`…) — zéro classes arbitraires `[Npx]` / warnings `suggestCanonicalClasses` |
| 2026-09-27 | Nav : fond noir H96 (Figma) ; switch EN dans la nav ; indicateurs slides **bas-droite** au-dessus du marquee. Mobile premium : drawer immersif, stack CTAs, grille Travaux/Équipe/CTA/Approche adaptées |
| 2026-09-27 | **Scale proportionnel** : `--msk-u = min(100vw, 1440px) / 1440` — gabarit = écran ; paddings/gaps/largeurs/typo display = `N_design × --msk-u` (plus de 20/24 px « téléphone »). Débordements acceptés dans parents scrollables (galerie). Plancher lisibilité UI/body uniquement. |
| 2026-09-27 | **Nav chrome** : hauteur `max(72px, 96×u)`, logo `max(104px, 126×u)` — le scale pur rendait la barre ~26 px / logo ~34 px inutilisables. Layout flex mobile + grille 3 cols Desktop (logo \| liens gap 40 \| Briefer+EN). |
| 2026-09-27 | **Boutons / footer mobile** : planchers hauteur CTA/sm ; Envoyer sans double flèche (label content seul) ; boutons Hero/CTA/Travaux en `w-auto` alignés start (plus de full-bleed) ; footer 1 logo géant mobile (petit logo Desktop only). |
