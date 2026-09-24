# Inventaire Figma — MSK Création

**Fichier :** [MSK-MAQUETTE](https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE)  
**File key :** `wn9ZMeW9YwaF3PE8Wqa2WS`  
**Dernière extraction MCP :** 2026-09-24 (partielle — rate limit sur 2e passe)  
**Source structure :** calque « Lisez-moi » + métadonnées page `0:1` + design context `9:2`, `9:45`, `240:436`

---

## Frames principaux

| Node ID | Nom | Rôle V1 |
|---------|-----|---------|
| `0:1` | MSK — Maquette Desktop | Page canvas |
| `2:14` | MSK CREATION — Desktop 1440 | Landing one-page (1440 × ~10713) |
| `9:45` | Intro — écran de chargement (rideau noir) | Intro ≤1s, 1re visite |
| `9:54` | Bouton · Retour en haut | Fixe bas droite |
| `240:436` | États du formulaire (référence dev) | Spec champs / bouton / succès |
| `9:56` | Lisez-moi | Spec textuelle designer |
| `72:3458` | Composants (modèles) | Cartes, filtres, anims |
| `441:901` | APERÇU · Travaux — 6 projets (à valider) | **Source scope projets V1** |
| Fiches `9:2`, `244:*` | Fiches projet individuelles | Template + refs designer |

---

## Page Desktop — sections (ordre)

| # | Section | Node (à affiner MCP) | Statut inventaire pixels |
|---|---------|----------------------|--------------------------|
| 01 | Navigation | Enfant de `2:14` | Structure OK — détail PENDING |
| 02 | Hero | | Interactions OK — détail PENDING |
| 03 | Travaux | Filtre composant `256:1008` | Variantes OK |
| 03b | CTA (rappel projet) | | Assets à exporter depuis Figma |
| 04 | Services | | PENDING |
| 05 | Équipe (2×5) | | Structure OK |
| 06 | Approche | | PENDING |
| 09 | Contact | | États via `240:436` |
| 10 | Footer | | PENDING |

**Espaceurs :** frames « Transition » = **96 px** entre sections.  
**Hors V1 :** section 07 Articles (archivée).

---

## Composants maîtres Figma

| Composant | Variantes | Node parent |
|-----------|-----------|-------------|
| Carte projet | Défaut/Survol × Courte/Haute | `58:26` |
| Carte équipe | Défaut / Survol | `58:46` |
| Travaux · Filtre | Tout / Web / Branding / App | `256:1008` |
| Anim · Bandeau défilant | Position A/B | `150:296` |
| Anim · Bandeau clients | Position A/B | `150:523` |
| Anim · Bandeau valeurs | Position A/B | `150:810` |
| Anim · Mot du titre | Rotation 3s | `150:956` |
| Anim · Diaporama hero | Photo 1 / 2 | `150:973` |
| Logo MSK CREATION | Intro / Header / Fiche | Plusieurs instances |

---

## Fiches projet (canvas designer)

Présentes dans Figma (référence visuelle / chaîne Suivant) :

1. KOUNDJI SERVICES (`9:2`) — **Avant/Après confirmé**
2. ELVI CREATION
3. AKWABA
4. DELMORIAN
5. THÒY ’ART
6. GENESIS SARL
7. MÉLYA BEAUTY
8. BOMOYI
9. ECOSOL
10. BEAUTÉ DIVINE

**Règle V1 code :** n’implémenter que les projets de la **grille Travaux / APERÇU 6**.  
Les autres fiches = matériel designer, hors routes tant que non présentes dans la grille.

### Template fiche (confirmé KOUNDJI)

1. Barre fixe (Fermer · Logo · Compteur)
2. Visuel principal plein écran
3. Bloc titre (année, titre, expertises, trait, description)
4. Avant / Après (si présent sur la fiche)
5. Visuels complémentaires
6. Nav précédent / suivant
7. Retour aux travaux

Annotation : overlay `/travaux/:slug` ; Fermer / Échap / Retour ; Suivant → fiche suivante.

---

## Intro (`9:45`)

- Fond noir, logo centré, ligne de progression
- Annotation : max **1 s**, `sessionStorage` première visite

---

## Formulaire — états (`240:436`)

**Champs :** Défaut / Focus / Rempli / Erreur  
**Bouton Envoyer :** Défaut / Survol / Chargement / Désactivé  
**Succès :** message « Brief reçu » remplace le formulaire

---

## Interactions prototype (Lisez-moi)

| Interaction | Comportement |
|-------------|--------------|
| Mot bleu hero | Change toutes les 3 s |
| Bandeaux | Défilement |
| Diaporama hero | Rotation photos |
| CTA / menu | Scroll section |
| Filtres Travaux | Variante Tout/Web/Branding/App |
| Survol | Cartes projet + portraits |
| Clic vignette | Overlay fiche |
| Retour en haut | Scroll hero |

**Motion keyframes :** PENDING (MCP rate limit sur `get_motion_context`).

---

## Assets (inventaire)

| Type | Statut |
|------|--------|
| Logo MSK SVG | Présent Figma |
| Images `IMG · …` | Présentes (export Phase 5) |
| Portraits équipe | Présents — mode Recadrer |
| CTA vidéo / poster | Prendre tout depuis Figma |
| WhatsApp | Infos Figma = bonnes |

Pipeline : Figma → locaux `public/assets` → `assetUrl()` → (plus tard) R2.

---

## Responsive

| Viewport | Statut |
|----------|--------|
| Desktop 1440 | Présent |
| Tablet / Mobile | **Absent** — voir `MOBILE_BRIEF.md` |
