# Questions ouvertes Figma / produit — MSK

Suivi des ambiguïtés. Les items **fermés** restent pour historique.

---

## Ouvertes

| ID | Question | Impact | Statut |
|----|----------|--------|--------|
| Q01 | Liste exacte des projets de la grille Travaux (APERÇU 6) | Data + routes fiches | **PENDING** — relancer MCP / lecture manuelle Figma |
| Q02 | Hex final `Accent/Ocre` (variable Figma) | Tokens CSS | **PENDING MCP** — fallback `#C4A574` en place |
| Q03 | Options listes Service / Budget (annotations Dev) | Formulaire Contact | **PENDING** lecture annotations |
| Q04 | Titles / descriptions SEO marketing absents de Figma | `meta` | **PENDING** validation contenu (dériver des H1/textes ou brief SEO) |
| Q05 | Motion keyframes exacts (bandeaux, mot, diaporama) | Animations Hero | **PENDING** `get_motion_context` (rate limit) |
| Q06 | Détail pixel sections Services / Approche / Footer / Nav | Implémentation | **PENDING** MCP — Header/Footer structure minimale livrée Phase 6 |
| Q08 | Export binaire assets (logo, hero, projets, équipe, CTA) | Phase 5 / UI | **BLOQUÉ MCP** — voir `ASSETS_INVENTORY.md` ; export manuel requis |

---

## Fermées (2026-09-24)

| ID | Question | Décision |
|----|----------|----------|
| C01 | RR 7 vs attendre v8 | **Latest** (`create-react-router@latest`) |
| C02 | Mobile | Brief séparé ; pas d’UI inventée |
| C03 | 6 vs 10 projets | **Grille Travaux** ; fiches extras = designer |
| C04 | WhatsApp | Infos Figma bonnes |
| C05 | Vidéo CTA | Tout prendre sur Figma |
| C06 | Avant/Après | Exactement le design par fiche |
| C07 | Langues | FR + EN créés |
| C08 | Flèches | Lucide autorisé |
| C10 | Convention EN projets | `/en/projects/:slug` |

---

## Blocage technique

- **Figma MCP rate limit** (seat View) au 2026-09-24 : 1re passe OK ; 2e passe (Phase 0 retry) toujours bloquée — `get_variable_defs`, `get_motion_context`, sous-sections Desktop.
- Action : réessayer quand le quota se réinitialise, ou export manuel tokens depuis Figma Desktop.
- Docs Phase 0 rédigés à partir de l’audit déjà capturé + Lisez-moi.
