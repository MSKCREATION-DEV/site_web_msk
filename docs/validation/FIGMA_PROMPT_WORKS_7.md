# Super-prompt Figma — Travaux (cartes) + Fiches projet

**Statut : historique (2026-10-04/05)** — specs appliquées en code ; assets livrés.  
Ne relancer que pour un refresh Figma.

---

## PROMPT À COPIER

```text
Tu es un agent d’audit + export Figma pour le site MSK Création (React / Tailwind).

MISSION
Extraire TOUT ce qui est nécessaire pour coder fidèlement :
1) la section « Travaux sélectionnés » (cartes projets empilées / listées)
2) chaque fiche détail projet liée (ouverture, contenu, galerie, navigation)

Sans inventer. Sans redesign. Sans Unsplash. Sans approximation.

FICHIER
MSK-MAQUETTE — https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE
File key : wn9ZMeW9YwaF3PE8Wqa2WS
Entry Travaux : node-id=2-17 (si autre node = section Travaux, corrige et donne le vrai node-id)

INTERDICTIONS ABSOLUES
- N’invente AUCUNE valeur (px, hex, font, texte, image, radius, ombre, gap).
- Si une info n’existe pas / n’est pas lisible : écris exactement « NON TROUVÉ ».
- Ne « corrige » pas le design. Ne propose pas d’alternative.
- Ne résume pas les textes : copie EXACTE (casse, accents, ponctuation, crochets []).
- Ne fusionne pas deux projets. Une carte = une fiche = un bloc.
- Si Auto Layout : rapporte padding / gap / align / justify tels quels.
- Si contrainte Absolute : rapporte x, y, w, h relatifs au parent nommé.

RÈGLES DE MESURE
- Unité : px Desktop (frame 1440 sauf indication contraire).
- Couleurs : HEX 6 chiffres (+ alpha si présent, ex. #FFFFFF99). Si fill = variable Figma, donne NOM variable + HEX résolu.
- Typo : famille, style/weight, size, line-height (px ou %), letter-spacing (px ou %), text-case, text-decoration, color.
- Pour chaque TEXT : donne aussi le contenu exact entre guillemets.
- Liens : https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE?node-id=XX-YY
- Assets images : nom calque + node-id + dimensions natives + recommendation export (PNG 2× ou SVG) + chemin cible ci-dessous.

SLUGS CIBLES (mapping titre Figma → slug fichier)
- Prosperity → prosperity
- Thòy ’Art / Thoy / Thòy → thoy-art
- Koundji Services / Koundji → koundji-services
- Bomoyi → bomoyi
- Ecosol → ecosol
- Elvi Creation / Elvi → elvi-creation
- Akwaba → akwaba
Si un 8e projet apparaît : l’ajouter avec slug kebab-case + note « HORS LISTE V1 ? ».

CHEMINS ASSETS CIBLES
public/assets/works/{slug}/cover.png
public/assets/projects/{slug}/cover.png
public/assets/projects/{slug}/gallery-01.png … gallery-NN.png
public/assets/projects/{slug}/before.png  (si Avant/Après)
public/assets/projects/{slug}/after.png
public/assets/logo/… (si logo distinct sur fiche / nav fiche)

════════════════════════════════════════
FORMAT DE SORTIE — Markdown strict, sections dans CET ordre
════════════════════════════════════════

# 0. Carte d’identité section Travaux
- Nom calque exact :
- Node ID / lien :
- Frame parent (Desktop 1440 ?) + node-id :
- Dimensions section (W×H) :
- Fond section (HEX / variable) :
- Padding section (top / right / bottom / left) :
- Margin / gap avec section précédente et suivante :
- Mode d’affichage Figma des cartes : liste verticale avec gaps | stack/overlap | autre (décrire) :
- Nombre de cartes visibles dans le frame :
- Ordre EXACT haut→bas (ou avant→arrière si stack) des projets :
- Compteur UI présent ? texte exact + typo + position :
- Titre section présent ? texte exact (« Travaux sélectionnés » ?) + typo + position :
- Autres éléments hors cartes (marquee, CTA global, filtres…) : liste ou NON TROUVÉ

# 1. Spec GLOBALE d’une carte Travaux (composant / prototype)
Si un COMPONENT / INSTANCE « carte projet » existe : nom + node-id + variants.
Sinon : déduire depuis la 1re carte complète et signaler « pas de component ».

## 1.1 Structure
- Layout : horizontal split | vertical | autre
- Ratio / largeur pane image vs pane texte (px ou %)
- Ordre : image | texte  (gauche/droite, haut/bas)
- Radius carte (par coin si différent) :
- Clip content ? oui/non
- Ombre / elevation (x, y, blur, spread, color) :
- Bordure (width, color) ou aucune :
- Overflow / mask sur l’image :
- Hauteur carte (px) fixe / hug / fill :
- Largeur carte (px) :
- Gap interne entre image et panneau (si Auto Layout) :

## 1.2 Zone IMAGE (gauche ou haut)
- Dimensions (W×H) :
- Object-fit équivalent (fill / fit / crop) + position du crop si visible :
- Overlay / gradient / vignette sur l’image ? (HEX + opacity + direction) :
- Autre calque au-dessus de l’image (logo client, badge…) :

## 1.3 Zone PANNEAU (texte / CTA)
- Fond (HEX / variable) — s’il varie par projet, le dire ici et détailler en §2
- Padding panneau (t/r/b/l) :
- Alignement contenu (horizontal + vertical) :
- Distribution (space-between / pack / gaps fixes) :
- Gap entre année / titre / tags / CTA :
- Largeur max du bloc texte si contrainte :

## 1.4 Typo — Année
- Contenu type exact (ex. « [ 2025 ] » ou « 2025 ») :
- Famille / weight / size / line-height / letter-spacing / case / color :
- Position (top / centered column / absolute x,y) :

## 1.5 Typo — Titre projet
- Famille / weight / size / line-height / letter-spacing / case / color :
- Alignement :
- Max-width / wrapping :

## 1.6 Typo — Tags / catégories
- Format exact (ex. « [ Branding ] [ Site web ] » ou « Branding · Site web ») :
- Un tag = un text node ou une seule ligne ?
- Famille / weight / size / line-height / letter-spacing / case / color :
- Gap entre tags :
- Padding / radius / fond / bordure SI pills/chips (sinon « texte nu ») :

## 1.7 CTA « Voir le projet » (ou libellé exact Figma)
- Libellé EXACT :
- Type : bouton / lien texte / pill / outline / filled
- Position : bas du panneau / sous les tags / absolute (x,y depuis panneau)
- Alignement (center / start / end) :
- Dimensions (W×H) ou hug :
- Padding interne (t/r/b/l) :
- Radius :
- Border width + color :
- Background (default) :
- Color texte :
- Typo (famille / weight / size / LH / tracking / case) :
- Icone ? (nom, taille, côté gauche/droite, gap) :
- États Figma présents : Default / Hover / Pressed / Focus / Disabled
  Pour CHAQUE état trouvé : bg, border, text, shadow, underline
- Zone cliquable (toute la carte vs CTA seul) — d’après prototype / liens Figma :
- Destination du lien prototype si présent :

## 1.8 États carte (si variants)
- Hover carte (scale, overlay, changement couleur titre…) :
- Active / selected :
- Disabled :
Sinon : NON TROUVÉ

## 1.9 Empilement / peek (si maquette stack)
- Cartes se chevauchent ? oui/non
- Offset visible (peek) en px (haut / droite / autre) :
- Ombre entre cartes :
- Opacité des cartes arrière :
- Rotation / scale des cartes arrière :
- Z-index / ordre de calques :
Sinon : « liste sans overlap »

## 1.10 Espacements INTER-CARTES
- Gap vertical entre cartes (px) :
- Si overlap : delta Y entre card N et N+1 :
- Marges gauche/droite de la colonne de cartes vs frame :

# 2. TABLEAU PAR PROJET (une ligne min. + sous-bloc)
Pour CHAQUE projet dans l’ordre Figma, remplir :

## 2.{n} {Titre exact}
- Ordre (# / total) :
- Node ID carte / instance :
- Slug cible :
- Année affichée (texte exact) :
- Tags affichés (texte exact de chaque tag) :
- Titre affiché (texte exact) :
- Libellé CTA (si différent du global) :
- HEX fond panneau (résolu) + nom variable Figma si existant :
- HEX textes panneau (année / titre / tags / CTA) si différents du global :
- HEX bordure CTA + fond CTA :
- Asset image :
  - nom calque
  - node-id
  - W×H
  - fichier cible : public/assets/works/{slug}/cover.png
  - export : PNG 2×
  - notes (crop, masque, image fill vs nested)
- Différences vs spec globale §1 (si carte non conforme au component) :
- Lien Figma carte :

(Répéter pour les 7 — et plus si présents.)

# 3. FICHES DÉTAIL PROJET — spec globale template
Lister toutes les frames fiche trouvées (noms + node-ids + liens).
Identifier le template commun (« Ouverture · deux moitiés », etc.).

## 3.1 Chrome / header fiche
- Fond page :
- Header : hauteur, fond, blur, bordure
- Logo : composition exacte, node-id, W×H, couleur (blanc/noir/brightness)
- « Fermer » : texte exact, typo, icône, position
- Compteur : format exact (ex. « [ 01 / 07 ] »), typo, position
- Lien « Travaux » / nav : texte, typo, style bouton, position
- Autres actions header :

## 3.2 Ouverture (hero split)
- Structure (2 colonnes ?) + ratio % / px
- Ordre mobile si frame mobile existe (sinon NON TROUVÉ mobile)
- Colonne INFO :
  - fond (fixe ou accent projet ?)
  - padding
  - contenus ordonnés (année, titre, tags, description, autre)
  - typo de CHAQUE niveau (comme §1.4–1.6)
  - max-width texte
- Colonne MEDIA :
  - image cover node-id
  - dimensions / object-fit
  - overlays
- Hauteur ouverture (vh / px / fill) :

## 3.3 Sections sous l’ouverture (dans l’ordre Figma)
Pour chaque section trouvée (Réalisations, Approche, Avant/Après, Galerie, Quote, Crédits, etc.) :
- Nom
- Node-id
- Fond
- Padding / max-width
- Titre section (texte + typo)
- Contenu (liste / paragraphes / grille) avec typos
- Gaps

## 3.4 Galerie
- Layout (1 col full-bleed / grille / masonry)
- Gap entre images
- Radius images
- Ratio / hauteurs
- Mapping gallery-01…NN par projet (§4)

## 3.5 Avant / Après (si présent)
- Sur quels projets ?
- Eyebrow / sous-titre exacts
- Labels Avant / Après
- Specs layout + assets cibles before.png / after.png

## 3.6 Navigation projet suivant / précédent
- Présence prev / next
- Textes exacts (« [ Projet suivant ] », etc.)
- Typo titre projet cible
- Subtitle ?
- Layout (2 cols), padding, border, hover
- Chaîne d’ordre Figma (A → B → … → A ?) — lister la boucle complète
- CTA « Retour aux travaux » : texte, style, position

## 3.7 Motion / prototype fiche
- Transitions notées dans Figma (si présentes)
Sinon NON TROUVÉ

# 4. TABLEAU PAR FICHE (7+)
Pour chaque projet :

## 4.{n} Fiche {Titre}
- Frame name + node-id + lien
- Accent / fond colonne info (HEX)
- Cover fiche → public/assets/projects/{slug}/cover.png (node-id, W×H)
- Identique au works cover ? OUI/NON
- Copy EXACTE :
  - title
  - year
  - tags[]
  - description / approche (paragraphe(s) complets)
  - réalisations / expertises (liste complète)
- Galerie : | # | calque | node-id | → gallery-NN.png | W×H |
- Before/After : OUI/NON + nodes
- Next project title exact + slug
- Prev project title exact + slug
- Éléments UNIQUES à cette fiche (absents du template) :

# 5. TOKENS / VARIABLES FIGMA utilisés sur Travaux + fiches
Tableau : | Nom variable | Type | Valeur résolue | Où utilisé |
Couvrir fills, strokes, text colors, radii, spacings si variables.

# 6. TYPO — récap familles réellement utilisées
Tableau : | Zone | Famille | Weight | Size | LH | Tracking | Case | Color |
Couvrir au minimum : titre section Travaux, compteur, année carte, titre carte, tags, CTA, H1 fiche, body fiche, nav suivant.

# 7. EXPORT ASSETS — checklist exécutable
Tableau unique :
| Priorité | Statut | Calque | Node-id | Fichier cible | Format | Scale | Notes |

Priorités :
P0 = covers works (7)
P1 = covers fiches si différentes
P2 = galeries
P3 = before/after
P4 = logos / icônes CTA / autres

Statut = TROUVÉ | NON TROUVÉ | DOUBLON (même bitmap qu’une autre ligne)

# 8. ÉCARTS / AMBIGUÏTÉS POUR L’AGENT CODE
- Liste tout ce qui est flou, contradictoire entre cartes, ou « hidden » dans Figma
- Signaler si la maquette est une LISTE à gaps alors que le site code un STACK scroll (pour qu’on mappe correctement)
- Signaler toute couleur hors charte MSK (Encre #0D1330, Bleu #1D73BC, Corail #FF5A3C) utilisée ici
- Ne PAS résoudre toi-même : juste documenter

# 9. LIENS FIGMA DIRECTS (checklist cliquable)
Au minimum :
- Section Travaux
- Component carte (si existe)
- Chaque carte 1…7
- Chaque fiche 1…7
- Header fiche / logo fiche
- Exemple Avant/Après
- Variables locales / styles de texte utilisés

════════════════════════════════════════
QUALITÉ ATTENDUE
════════════════════════════════════════
- Complet > court. Mieux vaut un tableau dense que des phrases vagues.
- Toute valeur chiffrée doit être mesurable dans Figma (Inspect / Dev Mode).
- Si tu ne peux pas exporter les binaires ici, DONNE quand même node-ids + chemins cibles pour export manuel.
- Termine par : « AUDIT TRAVAUX+FICHES : COMPLET » ou « PARTIEL — manque : … ».
```

---

## Après réponse Figma

1. Coller la réponse agent dans le chat Cursor (ou fichier `docs/validation/FIGMA_AUDIT_WORKS_SHEETS.md`).
2. L’agent code réapplique : tokens carte, typos, CTA, couleurs par projet, assets.
3. Ne pas committer tant que non demandé.

## Notes internes (ne pas coller dans Figma)

- Empilement scroll React = décision produit (Dagobert) ; le prompt demande quand même la vérité Figma (liste vs overlap) pour mapper correctement.
- MCP View saturé au 2026-10-04 → ce prompt est le canal principal de récupération specs + assets.
