# Design Tokens — MSK Création

Source : **audit design system Desktop 1440** (2026-09-25) — collection `MSK / Couleurs` mode Sombre + instances typo frame.

---

## Couleurs

| Token | Hex | Usage |
|-------|-----|-------|
| `Fond/Page` | `#080808` | Fond page |
| `Fond/Noir` | `#000000` | Intro / zones noires |
| `Fond/Carte` | `#111111` | Surfaces carte |
| `Fond/Image placeholder` | `#1A1A1A` | Placeholders images |
| `Accent/Bleu` | `#137DC5` | CTA, accents italic, focus |
| `Accent/Ocre` | `#C8742A` | Secondaire chaud (confirmé audit) |
| `Texte/Principal` | `#FFFFFF` | Titres |
| `Texte/Secondaire` | `rgba(255,255,255,0.78)` | Nav, intros |
| `Texte/Atténué` | `rgba(255,255,255,0.6)` | Eyebrows, secondaires |
| `Texte/Discret` | `rgba(255,255,255,0.45)` | Placeholders, années |
| `Bordure/Subtile` | `rgba(255,255,255,0.08)` | Séparateurs champs |
| `Bordure/Visible` | `rgba(255,255,255,0.2)` | Contours secondaires |

**Couleurs projet (hover cartes)** : Koundji `#E87B1A`, Ecosol `#F0A020`, Akwaba `#8FB8D8`, Thòy `#CC2200`, Elvi `#C9A84C`. Bomoyi : NON TROUVÉ.

Survol bouton (hors variables) observé antérieurement : `#2994db`. Erreur form : `#e5484d` (frame états).

---

## Typographie

| Famille | Rôle |
|---------|------|
| **Jost** | Corps UI (Light 300 → SemiBold 600) |
| **Bricolage Grotesque ExtraBold 800** | Titres section, Hero L3, CTA titre |
| **Instrument Serif Italic 400** | Accents bleus (Hero L2, titres section) |

Échelles clés (Desktop) : voir utilitaires `.msk-*` dans `app/app.css` (Hero 86/96/86, section 79/88, CTA 101/113, Contact 58/65, fiche 72).

---

## Espacements

| Token | Valeur design (1440) | Runtime |
|-------|----------------------|---------|
| Unité `--msk-u` | 1 px | `min(100vw, 1440px) / 1440` |
| Transition sections | **96 px** | `96 × --msk-u` |
| Padding horizontal page | **112 px** | `112 × --msk-u` |
| Largeur utile | **1216 px** | `1216 × --msk-u` |
| Nav | 96 h | `96 × --msk-u` |
| Hero | 900 h | `900 × --msk-u` |

**Règle :** gabarit = largeur d’écran (plafonnée 1440). Intérieurs = calcs depuis les tailles Figma — **pas** de distances « matériel » (20/24 px téléphone). Les blocs plus larges que le parent (galerie) débordent dans un scroll interne.

---

## Breakpoints

Desktop 1440 = source. Composition proportionnelle via `--msk-u`. Frames mobile Figma : `MOBILE_BRIEF.md` (stack / drawer interim uniquement).
