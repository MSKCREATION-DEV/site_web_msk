# Design Tokens — MSK Création

**Source brand :** Charte graphique v3 (PDF 2026-09-25) — [`docs/brand/`](../brand/).  
**Source layout / typo scale Desktop :** Figma MSK-MAQUETTE 1440 (inchangé).

---

## Couleurs (Charte v3)

| Token CSS | Hex | Rôle charte |
|-----------|-----|-------------|
| `--color-msk-ink` / `page` / `black` | `#0D1330` | Encre — fond sombre |
| `--color-msk-card` | `#151B3D` | Surfaces carte |
| `--color-msk-placeholder` | `#1C2448` | Placeholders |
| `--color-msk-blue` | `#1D73BC` | Bleu de référence (CTA, accents, **focus-visible**) |

**Focus clavier :** `:focus-visible { outline: 2px solid var(--color-msk-blue); outline-offset: 2px; }` dans `app/app.css` (pas d’anneau au clic souris).
| `--color-msk-blue-hover` | `#1384CB` | Bleu vif — hover |
| `--color-msk-cyan` | `#00ACEE` | Famille / extrémité dégradé |
| `--color-msk-indigo` | `#2A3D8E` | Famille / départ dégradé |
| `--color-msk-deep` | `#284393` | Famille |
| `--color-msk-coral` | `#FF5A3C` | Accent secondaire (≤10 %, jamais sur logo) |
| `--color-msk-chalk` | `#F5F3EF` | Craie — fond clair documents |
| `--color-msk-paper` | `#DCE0E8` | Gris papier |
| `--color-msk-gray` | `#8A93A6` | Gris moyen |
| `--color-msk-ink-deep` / `footer` / `contact` | nuances Encre | Dégradés de section |
| Texte / bordures | blanc + opacités | Inchangé (UI dark) |

**Dégradé logo** `#2A3D8E → #00ACEE` : fond clair uniquement — **interdit** sur Encre.

### Mapping ancien Figma → Charte v3

| Ancien (Figma audit) | Nouveau (charte) |
|----------------------|------------------|
| `#080808` Fond/Page | `#0D1330` Encre |
| `#000000` Fond/Noir | `#0D1330` Encre |
| `#111111` Fond/Carte | `#151B3D` |
| `#137DC5` Accent/Bleu | `#1D73BC` |
| `#2994DB` hover | `#1384CB` Bleu vif |
| `#C8742A` Accent/Ocre | `#FF5A3C` Corail |

**Couleurs panneau Travaux / fiches** : par projet (audit Figma 2026-10) — hors palette charte OK (identité client). Voir `app/data/projects.ts` (`panel`).

**Logo nav / fiche** : hauteur frame Figma **44 px** (`--msk-logo-header-h`), signature intercalée.

---

## Typographie

| Famille | Rôle |
|---------|------|
| **Jost** | Corps UI (Light 300 → SemiBold 600) |
| **Bricolage Grotesque ExtraBold 800** | Titres section, Hero L3, CTA titre |
| **Instrument Serif Italic 400** | Accents bleus (un mot / expression par titre) |

Échelles Desktop : utilitaires `.msk-*` dans `app/app.css` (Hero 86/96/86, section 79/88, CTA 101/113, Contact 58/65, fiche 72) — relevé Figma confirmé PDF §03 numérique.

Sources locales : `docs/brand/fonts/`. Runtime : Google Fonts (`app/root.tsx`).

---

## Espacements

| Token | Valeur design (1440) | Runtime |
|-------|----------------------|---------|
| Unité `--msk-u` | 1 px | `100vw / 1440` (pleine largeur, sans plafond) |
| Transition sections | **96 px** | `96 × --msk-u` |
| Padding horizontal page | **112 px** | `112 × --msk-u` (plancher 1.25rem) |
| Largeur page | 1440 | `100%` / viewport |
| Largeur utile | **1216 px** | `1216 × --msk-u` |
| Nav | 96 h | `clamp(72px, 96×u, 96px)` (plafond Figma) |
| Hero | 900 h | `900 × --msk-u` |

**Règle :** gabarit = largeur viewport (pleine page Desktop). Intérieurs = calcs depuis les tailles Figma × `--msk-u`.

---

## Breakpoints

Desktop 1440 = source. Composition proportionnelle via `--msk-u`. Frames mobile Figma : `MOBILE_BRIEF.md`.
