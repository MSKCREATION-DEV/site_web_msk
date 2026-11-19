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
| Projets | **Deck Travaux 7** : Prosperity, Thòy ’Art, Koundji Services, Bomoyi, Ecosol, Elvi Creation, Akwaba |
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

## Brand — Charte graphique v3 (2026-10-03)

**Source :** PDF [`docs/brand/CHARTE_GRAPHIQUE_MSK_CREATION_v3.pdf`](../brand/CHARTE_GRAPHIQUE_MSK_CREATION_v3.pdf).  
**Décision :** les tokens couleur / logo / favicon suivent la charte PDF. Le **layout** Desktop reste Figma.

| Sujet | Choix charte | Ancien Figma |
|-------|--------------|--------------|
| Fond sombre | Encre `#0D1330` | `#080808` |
| Bleu | `#1D73BC` | `#137DC5` |
| Accent secondaire | Corail `#FF5A3C` | Ocre `#C8742A` |
| Logo sur sombre | Réservé blanc (intercalé / bloc gauche / signe) | SVG dégradé + `#0000FF` (interdit PDF) |

Index brand : [`docs/brand/README.md`](../brand/README.md).

## Typographie (audit 2026-09-25 + charte v3)

Police UI : **Jost**. Display : **Bricolage Grotesque ExtraBold**. Accents : **Instrument Serif Italic**.  
Travaux : pas de H2 distinct → surtitre 12px. Confirmé PDF §03.

---

## Assets

```
Figma → public/assets/... → assetUrl(path)
V1  : ASSET_BASE_URL vide ou "/"
Later : ASSET_BASE_URL = https://cdn... (R2)
```

Règle : jamais Unsplash / image « similaire ».  
Signaler : `Asset X présent dans Figma mais source non disponible.`

### Compression / dérivés (perf P1)

- **Sources PNG/JPEG Figma conservées** ; dérivés `.webp` + `.avif` écrits à côté (sharp).
- Commandes : `npm run assets:compress` / `assets:compress:priority` / `check:images`.
- Runtime : composant `OptimizedImg` (`<picture>` AVIF → WebP → PNG) sur hero, Travaux, fiches, équipe, contact, CTA, Approche.
- Logos SVG exclus. Budgets + QA Desktop : [`docs/quality/IMAGE_PIPELINE.md`](../quality/IMAGE_PIPELINE.md).
- Manifest : `public/assets/.derivatives-manifest.json`.

---

## SEO

- Meta SSR par locale (`meta` React Router).
- Canonical + hreflang FR/EN + `x-default` → `/fr`.
- Contenu meta : dérivé des textes page ou validé — **pas inventé** marketing libre.
- Open Graph : `og:title`, `og:description`, `og:url`, `og:locale` (+ alternate), `og:type`, **`og:site_name`**, **`og:image`**.
- Twitter card : `summary_large_image` + **`twitter:image`**.
- Image partage default : **`/assets/hero/slide-01.png`** (Figma hero) ; fiches = cover projet. Détail : [`SEO_STRUCTURED_DATA.md`](./SEO_STRUCTURED_DATA.md).
- Origine absolue : `VITE_SITE_ORIGIN` (prod obligatoire — voir README / `.env.example`).
- JSON-LD SSR (`script:ld+json`) : Organization + WebSite + Person (équipe) sur home ; CreativeWork sur fiches.
- Sitemap `/sitemap.xml` + robots `/robots.txt` (routes FR/EN existantes uniquement).

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
| 2026-09-27 | Assets branchés : Approche ×6, Contact fond, galeries fiches + Avant/Après Koundji ; `isUsableAsset` partagé ; restant Q03 options + `akwaba/gallery-06` |
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
| 2026-10-03 | **Charte graphique v3** : Encre `#0D1330`, bleu `#1D73BC`, corail `#FF5A3C` ; logos pack 2026 (intercalé / bloc gauche / signe) ; favicon signe sur Encre ; docs/brand ; retrait warm brun + ocre tokens. Layout Figma inchangé. |
| 2026-10-03 | **QA charte** : fond Contact recentré bureau + vignette Encre (masque couture porte/sol) ; logo intercalé recomposé (gaps X) ; nav logo h≥56px / w auto (seuil mot-logo 24px) ; legacy `#0000FF` sorti de `public/`. |
| 2026-10-03 | **Pleine largeur Desktop** : retrait du plafond 1440 sur `--msk-u` (`100vw / 1440`) et `max-w-msk` = 100 % — plus de bandes vides sur écrans larges. |
| 2026-10-03 | **Rythme horizontal** : médias/marquees full-bleed ; textes/compteurs/CTA/`BackToTop` calés sur `--msk-page-px`. Galerie Approche = 1 slide / viewport (plus de bandeau sombre ni slide suivante visible). CTA : fond hors gutter. Marquees : mask latéral = gutter. |
| 2026-10-03 | **Équipe** : ajout Ismael Oussi (Directeur Technique · Développement) après Lead développeur ; photo `team/ismael-oussi.png` ; copy « 11 experts » (meta + section). |
| 2026-10-04 | **Travaux + fiches (exception Figma)** : UX/animation inspirée Dagobert (stack scroll + case study split). Couleurs charte MSK inchangées (pas de `#0000FF`). Remplace grille 2 cols + filtres. Mobile autorisé pour ces deux surfaces (override `MOBILE_BRIEF`). Copy V1 = titres/expertises/descriptions existants. |
| 2026-10-04 | **Stack Travaux** : empilement `position: sticky` + peek ; retrait `overflow-x-clip` sur `<main>`. Sans barre accent ; bandeau titre part avant le dernier projet ; fiche : Fermer + Travaux (pas Agence), nav précédent/suivant. |
| 2026-10-04 | **Stack Travaux v3** : refonte scroll-driven (track `N×100svh`, stage sticky, transforms). Fin des marginBottom/sticky-header orphelins ; bandeau masqué sur dernier ; peek seulement après scroll. |
| 2026-10-04 | **Travaux Figma sync** : logo signature horizontale (611:972) en nav/fiche ; deck **7** (Prosperity en tête) ; panneaux couleur Figma par projet ; fiche ouverture deux moitiés accent+cover ; empilement scroll conservé. Covers Prosperity + refresh photos : MCP saturé → `FIGMA_PROMPT_WORKS_7.md`. |
| 2026-10-04 | **Audit Figma appliqué** : titre `[ PROJETS SÉLECTIONNÉS ]` ; cartes 560/656 radius 16 ; couleurs/texte/CTA par projet (hors charte OK = identité client) ; fiches Encre + intro + galerie paires + next only ; copy FR audit. Empilement scroll conservé malgré liste Figma gap 32. Downloads : `ASSETS_DOWNLOAD_WORKS_SHEETS.md`. |
| 2026-11-18 | **SEO P0** : og/twitter image (hero slide-01 + covers), JSON-LD, robots/sitemap, alts équipe `{name}, {role} · MSK Création`. Spec `SEO_STRUCTURED_DATA.md`. sameAs / bios / alts marketing = Q20–Q22. |
| 2026-10-05 | **Équipe (2:19)** : en-tête Figma `justify-between` / `items-end` (titre gauche + intro 320px droite) ; grille 5+6 gap 32/40 ; ordre + rôles Figma ; cartes portrait 176×235 + voile hover. |
| 2026-10-05 | **Assets Travaux/fiches livrés** ; nettoyage `docs/charte graphique New/` (doublon `docs/brand/`) ; inventaires / Q19 fermée. |
| 2026-10-07 | **Équipe** : ordre client. Rangée 1 : Mathieu, Isdalinia, Andile, Ismaël (Lead développeur), Amadou. Rangée 2 : Madina, Issiaka, Lidaou, Fatimatou, Yaye (Commerciale), Djouldé. Rôles inchangés. |
| 2026-11-18 | **Équipe** : retrait Madina Tall + Issiaka Yacouba Traoré ; ajout **Eric Golo** (Monteur Vidéo / Video editor) en dernier. Photo `team/eric-golo.png`. Copy « 10 experts ». Service produit fourni : Communication & Marketing (orthographe corrigée depuis « Maketing » ; non affiché en UI). Email `e.golo@mskcreation.net` fourni mais hors schéma cartes (name + role seulement). Grille 5+5. |
| 2026-11-18 | **Perf images P1** : pipeline sharp (`scripts/compress-assets.mjs`) WebP+AVIF sans destruction des PNG ; `OptimizedImg` branché (hero prioritaire + Travaux/fiches/équipe/contact/CTA/Approche) ; doc `IMAGE_PIPELINE.md` ; retrait JPEG racine inutilisé `ERIC-GOLO.jpeg` (garder `public/assets/team/eric-golo.png`). QA visuelle Desktop vs Figma obligatoire avant merge. |
| 2026-11-18 | **Q24 Prosperity / Thòy** : galeries Figma (6 + 3, full 1216) remplacent les anciens slots filiales/mockups. Copy : eyebrows Figma, `[ RÉALISATIONS ]`, `[ APPROCHE ]` intercalé après 1re image. Banner Travel = pixels = ancien `gallery-09` (slogan FR). Métadonnées IPTC/EXIF via `assets:stamp-meta` + alts/JSON-LD. |
| 2026-11-18 | **Fiches gutters Desktop** : écart vs Figma `244:631` / `618:1298` (artboard 1440, contenu x=112 w=1216, prose 790). Cause : `max-w-[1216px]` fixe + `px` interne (double contrainte → bandes trop larges). Fix : rythme home `msk-page-x` + `max-w-msk` (largeur utile = `1216×--msk-u`) ; intro `justify-between` + prose `790×--msk-u` ; galerie full sans second plafond. Template partagé Thòy + Prosperity. |
| 2026-11-18 | **Q25 cinq fiches** : copy + layouts alignés Figma (Koundji 9:2, Bomoyi 244:826, Ecosol 244:891, Elvi 244:436, Akwaba 244:501). Galeries branchées sur assets locaux confirmés (2 / 4 / 4 / 3 / 3) ; slots Conran A/B et mockups campagne manquants listés Q25. Anciennes galeries déplacées en `public/assets/projects/{slug}/_legacy/`. Métadonnées `scripts/image-metadata.q25-five.json`. |
| 2026-11-19 | **Q25 assets racine** : 9 exports intégrés en **ajout** (galeries existantes conservées). Koundji 3 · Bomoyi 6 · Ecosol 6 · Elvi 5 (vitrine Paris encore MANQUANT) · Akwaba 4. Ordre board : Conran/campagne en tête. Avant/Après Koundji : gutters `msk-page-x`, tuiles `rounded-[10px]`, Avant fond blanc / Après `#1D2B53`, `object-contain` + alts FR/EN (hors frame fiche actuelle, Q13). 3 fichiers `incrustation*` racine = doublons pick-up/enseigne Ecosol + métro Elvi → non appliqués (règle ne pas écraser). |
| 2026-11-19 | **Q25 reste racine** : Elvi vitrine Paris → `elvi-creation/gallery-06` ; Akwaba Conran B → `akwaba/gallery-05` (ajout, sans écraser papeterie lifestyle `gallery-03`). Compteurs finaux Elvi **6** · Akwaba **5**. Doublons `incrustation*` déjà absents / retirés. Stamp meta + WebP/AVIF. |
| 2026-11-19 | **Q26 mockups UI** : 13 captures racine → mockups browser/iPhone via `npm run assets:mockup` (`scripts/compose-device-mockups.mjs`). Elvi **13** (6 branding + 5 web + 2 mobile half) · Akwaba **9** (5 branding + 2 mobile half + 2 web) · Koundji **5** (3 branding + 2 web). Aucune QA site MSK. Stamp `image-metadata.q26-ui-mockups.json` + WebP/AVIF. Captures brutes racine retirées. QA Desktop vs Figma due. |
| 2026-11-19 | **Audit assets orphan** : purge `public/assets/projects/{akwaba,bomoyi,ecosol,elvi-creation,koundji-services}/_legacy/` (150 fichiers, ~122,8 Mo). Works covers **conservés** (`worksCover` stack Travaux). Hors deck (`beaute-divine`, `delmorian`, `genesis-sarl`, `melya-beauty`) + logo bloc archive **conservés** (à valider humain). Manifest dérivés reconstruit sans re-encode. |
