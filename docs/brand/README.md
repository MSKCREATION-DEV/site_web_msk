# Brand MSK Création — Charte graphique v3

**Source :** [`CHARTE_GRAPHIQUE_MSK_CREATION_v3.pdf`](./CHARTE_GRAPHIQUE_MSK_CREATION_v3.pdf)  
**Version :** 3 · 25 septembre 2026  
**Règle projet :** la charte PDF prime sur les anciennes variables couleur Figma pour tokens brand. Le layout Desktop reste Figma.

---

## Palette (web)

| Token | Hex | Usage |
|-------|-----|--------|
| Encre | `#0D1330` | Fond sombre, avatar, texte sombre print |
| Bleu de référence | `#1D73BC` | Logo (version couleur), CTA, accents |
| Dégradé | `#2A3D8E → #00ACEE` | Grands formats **fond clair uniquement** |
| Bleu vif | `#1384CB` | Hover / famille |
| Cyan | `#00ACEE` | Famille |
| Indigo | `#2A3D8E` | Famille / départ dégradé |
| Corail | `#FF5A3C` | Accent secondaire (≤10 % surface, jamais sur logo) |
| Craie | `#F5F3EF` | Fond clair documents longs |
| Gris papier | `#DCE0E8` | Neutre |
| Gris moyen | `#8A93A6` | Neutre |

**Interdit logo :** ocre, `#0000FF`, dégradé sur fond sombre, déformer, ombre, contour.

---

## Typographie

| Famille | Rôle | Poids |
|---------|------|--------|
| Jost | UI, texte, intertitres, boutons | Light 300 · Book 400 · Medium 500 · Semi 600 · Bold 700 |
| Bricolage Grotesque | Titres impact / hero | ExtraBold 800 uniquement |
| Instrument Serif | Mot d’accent (un seul par titre), bleu | Italic uniquement |

Fichiers sources : [`fonts/`](./fonts/). Runtime site : Google Fonts (mêmes familles) — voir commentaire dans `app/root.tsx`.

---

## Compositions logo (5 autorisées)

| Dossier | Composition | Usage web |
|---------|-------------|-----------|
| [`logos/intercalated/`](./logos/intercalated/) | MSK · signe · CREATION | Verrouillage principal |
| [`logos/stacked/`](./logos/stacked/) | Empilé / empilé intercalé | Intro, formats hauts |
| [`logos/block-left/`](./logos/block-left/) | Bloc à gauche | Header, bandeaux |
| [`logos/msk-mark/`](./logos/msk-mark/) | MSK + signe | Petites tailles |
| [`logos/mark-only/`](./logos/mark-only/) | Signe seul | Favicon, watermark &lt; 24 px |
| [`logos/sources/`](./logos/sources/) | Pack brut non renommé | Archive |

### Tailles minimales (PDF §01)

- Mot-logo : jamais sous **24 px**
- Sous **16 px** : signe seul uniquement
- Zone de protection : X = hauteur du signe ÷ 2, sur les quatre côtés

### Runtime app

```
public/assets/logo/msk-creation.svg   → block-left (header / fiche) ou intercalé
public/assets/logo/msk-mark.svg       → signe seul (watermark, favicon source)
```

---

## Mapping sources pack → noms stables

| Fichier pack | Destination |
|--------------|-------------|
| `logo 2026 blancs 1-36.svg` | `stacked/logo-stacked-white.svg` |
| `logo 2026 blancs 1-37.svg` | `block-left/logo-block-left-white.svg` |
| `logo 2026 blancs 1-38.svg` | `stacked/logo-stacked-intercalated-white.svg` |
| `logo 2026 blancs 1-39.svg` | `msk-mark/logo-msk-mark-white.svg` |
| `logo 2026 blancs 1-40.svg` | `mark-only/mark-only-white.svg` |
| `logos MSK2026 Refonte -25.png` | `intercalated/logo-intercalated-gradient.png` |

L’ancien dossier `docs/charte graphique New/` peut être retiré une fois cette arborescence validée.
