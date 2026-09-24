# Design Tokens — MSK Création

Extrapolés depuis Figma (variables nommées + fallbacks design context).  
**Accent/Ocre :** hex Figma non exporté (rate limit) — fallback expert documenté ici ; à remplacer dès `get_variable_defs` disponible.

---

## Couleurs

Collection Figma : `MSK / Couleurs`

| Token | Valeur | Usage |
|-------|--------|-------|
| `fond/page` | `#080808` | Fond page |
| `fond/noir` | `#000000` | Intro rideau |
| `fond/image-placeholder` | `#1a1a1a` | Placeholders images |
| `accent/bleu` | `#137dc5` | CTA, focus, traits, liens accent |
| `accent/bleu-survol` | `#2994db` | Bouton Envoyer hover (observé) |
| `accent/ocre` | `#C4A574` | **Fallback expert** — secondaire chaud sur dark |
| `erreur` | `#e5484d` | Bordure + message erreur champ |
| `texte/principal` | `#ffffff` | Titres, corps fort |
| `texte/secondaire` | `rgba(255,255,255,0.78)` | Fermer, secondaires |
| `texte/atténué` | `rgba(255,255,255,0.6)` | Labels discrets, sous-titres |
| `texte/discret` | `rgba(255,255,255,0.45)` | Placeholder, compteur |
| `bordure/subtile` | `rgba(255,255,255,0.08)` | Séparateurs, champs défaut |
| `bordure/rempli` | `rgba(255,255,255,0.3)` | Champ rempli |
| `fond/succès-carte` | `rgba(255,255,255,0.04)` | Message brief reçu |
| `bordure/succès-carte` | `rgba(255,255,255,0.1)` | Bordure message succès |

### Mapping CSS proposé (`@theme`)

```css
--color-msk-page: #080808;
--color-msk-black: #000000;
--color-msk-placeholder: #1a1a1a;
--color-msk-blue: #137dc5;
--color-msk-blue-hover: #2994db;
--color-msk-ocre: #C4A574;
--color-msk-error: #e5484d;
--color-msk-text: #ffffff;
--color-msk-text-secondary: rgba(255, 255, 255, 0.78);
--color-msk-text-muted: rgba(255, 255, 255, 0.6);
--color-msk-text-subtle: rgba(255, 255, 255, 0.45);
--color-msk-border: rgba(255, 255, 255, 0.08);
```

daisyUI theme : mapper `primary` → bleu MSK ; ne pas utiliser les pastels daisyUI par défaut.

---

## Typographie

| Famille | Rôle |
|---------|------|
| **Space Grotesk** | Titres (Lisez-moi) |
| **Inter** | Corps, labels, boutons |
| **Space Mono** | Libellés mono, compteurs, eyebrow form |
| **Bricolage Grotesque** | Grands titres (ExtraBold 72 fiche, SemiBold nav projet) |
| **Instrument Serif Italic** | Grands titres de section (Lisez-moi) |

### Échelles observées

| Style | Spec |
|-------|------|
| Titre projet fiche | Bricolage ExtraBold 72px, tracking -1.44px, uppercase |
| Label champ | Inter Regular 10px, tracking 1px, uppercase |
| Input | Inter Regular 14px |
| Erreur champ | Inter Regular 11px `#e5484d` |
| Bouton | Inter Regular 11px, tracking 2.2px, uppercase |
| Compteur | Space Mono 12px |
| Eyebrow form | Space Mono 10px, tracking 2px |
| Description fiche | Inter Regular 18px, line-height 1.8, max-width 576 |

---

## Espacements

| Token / usage | Valeur |
|---------------|--------|
| Transition sections | **96 px** |
| Barre fiche padding | 32 horizontal / 20 vertical |
| Bloc titre fiche py | 80 |
| Gaps titre internes | 24 / 32 / 40 |
| Trait accent | 48 × 1 |
| Label → input gap | 8 |
| Bouton padding | 32 × 16 |
| Bouton radius | **999** (pilule) |
| Message succès padding | 40 |
| Message succès width | 568 |

---

## Rayons / ombres

| Élément | Valeur |
|---------|--------|
| Bouton CTA | `999px` |
| Carte logo avant/après | `4px` (observé fiche) |
| Ombres page | Non inventoriées en détail — PENDING MCP Desktop |

---

## Breakpoints

| Nom | Largeur | Statut |
|-----|---------|--------|
| Desktop | 1440 (maquette) | Source |
| Tablet / Mobile | — | **Absents Figma** — voir brief mobile |

Ne pas inventer de breakpoints responsive UI tant que Figma mobile n’existe pas.

---

## Icônes

- Lucide autorisé (décision projet) pour flèches / interactions.
- Logo marque = SVG export Figma uniquement.
