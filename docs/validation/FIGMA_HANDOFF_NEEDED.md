# Besoins Figma — charte & pixels (MCP bloqué)

**Date :** 2026-09-25  
**Cause :** quota MCP Figma seat **View** atteint — impossible d’appeler `get_variable_defs` / `get_design_context` / `get_screenshot`.  
**Fichier :** [MSK-MAQUETTE](https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE)

Quand tu fournis un item : **colle la capture ici dans le chat** (idéalement avec le panneau droit Figma visible : police, taille, graisse, interligne, tracking, couleur). Pour les images : export PNG **2×** dans le dossier indiqué.

---

## Priorité 1 — Charte (bloquant tokens)

### 1.1 Variables couleurs (surtout Ocre)

| Besoin | Action | Lien |
|--------|--------|------|
| Hex exact de **toutes** les variables `MSK / Couleurs` | Figma → panneau Variables / Local variables → capture du tableau (ou export CSV si dispo) | [Desktop 1440](https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE?node-id=2-14) |
| **Accent/Ocre** (Q02) | Même capture, zoom sur `Accent/Ocre` | Idem |

**Fallback actuel en code :** `#C4A574` (à remplacer dès hex Figma connu).

### 1.2 Styles texte (text styles) — tailles exactes

Pour **chaque** style listé : sélectionne un calque texte typique → capture du panneau Design (Font / Size / Weight / Line height / Letter spacing / Color).

| Style à confirmer | Hypothèse actuelle code | Lien de départ |
|-------------------|-------------------------|----------------|
| Hero Ligne 1 « NOUS CRÉONS » | Space Grotesk Light **88** / 110% / −2% ✅ (déjà panel) | [Desktop](https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE?node-id=2-14) → calque `02 - Hero` → `Ligne 1` |
| Hero Ligne 2 (mot bleu) | Instrument Serif Italic **?** px | Même frame, `Ligne 2 (mot animé)` |
| Hero Ligne 3 | Space Grotesk Bold **?** px | `Ligne 3` |
| Hero accroche / sous-titre | Inter **?** px / LH | `Sous-titre` / `Accroche` |
| Titre section Services « CE QUE » | Space Grotesk Bold **64** (estimé capture) | Desktop → `04 - Services` |
| Accent « nous faisons. » | Instrument Serif Italic **?** | Idem |
| Titre Travaux | Instrument Serif **56** (estimé) | Desktop → `03 - Travaux` |
| Titre CTA « VOTRE PROCHAIN » | **?** | Desktop → `03b` CTA |
| Titre Équipe / Approche / Contact | **?** | Sections `05` / `06` / `09` |
| Titre fiche projet | Bricolage ExtraBold **72** / −1.44px ✅ | [Fiche KOUNDJI](https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE?node-id=9-2) |
| Labels form / boutons / nav | 10 / 11 px (tokens) | [États formulaire](https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE?node-id=240-436) + Nav sur Desktop |

**Astuce :** un seul screenshot par calque avec le panneau droit ouvert suffit.

---

## Priorité 2 — Layout / spacing (pixels)

Pour chaque section : **1 capture plein cadre** à 100 % zoom (pas crop trop serré), idéalement à largeur 1440.

| # | Section | Lien | Ce que je dois voir |
|---|---------|------|---------------------|
| 01 | Navigation | [Desktop 2:14](https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE?node-id=2-14) → `01 - Navigation` | Hauteur barre, padding H/V, gaps liens, taille logo, états |
| 02 | Hero | Idem → `02 - Hero` | Padding contenu, gaps titre/accroche/CTA, bandeau bas |
| 03 | Travaux | Idem + [APERÇU 441:901](https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE?node-id=441-901) | Titre + filtres, hauteurs Courte/Haute par carte |
| 03b | CTA | Desktop → CTA | Marges banner, overlay logo, bouton |
| 04 | Services | Desktop → `04` | Gaps lignes, colonnes index/titre/desc |
| 05 | Équipe | Desktop → `05` | Gaps grille, hover (nom bleu + trait) |
| 06 | Approche | Desktop → `06` | Filigrane, 4 colonnes steps |
| 09 | Contact | Desktop → `09` | 2 cols, form, fond photo |
| 10 | Footer | Desktop → `10` | Logo géant, barre 3 zones |
| — | Intro | [9:45](https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE?node-id=9-45) | OK structure |
| — | Retour haut | [9:54](https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE?node-id=9-54) | Taille / position |
| — | Form états | [240:436](https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE?node-id=240-436) | Déjà partiel |

Si tu peux : dans Figma, **clic droit sur le frame section → Copy/Paste as → Copy as CSS** (ou « Copy properties ») et colle le texte ici.

---

## Priorité 3 — Assets manquants (exports PNG 2×)

| Asset | Où dans Figma | Déposer / coller | Lien |
|-------|---------------|------------------|------|
| **Fond photo Contact** (Q12) | Section `09 - Contact` → calque image de fond | `public/assets/contact/background.png` ou collage chat | [Desktop](https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE?node-id=2-14) |
| **Bureau équipe** dédié (pas le poster CTA) | Sous grille `05 - Équipe` | `public/assets/team/office.png` | Idem |
| **Avant / Après Koundji** (Q13) | [Fiche 9:2](https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE?node-id=9-2) | `projects/koundji-services/before.png` + `after.png` (remplacer les 1×1) | Lien fiche |
| **Galeries fiches** (Q13) | Chaque fiche projet grille | `projects/{slug}/gallery-0N.png` | Fiches : Koundji [9:2](https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE?node-id=9-2) + autres frames fiches sur le canvas |

**Check export :** fichier > ~5 Ko (les placeholders actuels font ~1×1 px).

---

## Priorité 4 — Contenu / annotations

| Besoin | Action | Lien |
|--------|--------|------|
| Options **Service** + **Budget** du form (Q03) | Ouvre le calque Dev Mode / annotations sur Contact, ou liste les options dans le chat | [240:436](https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE?node-id=240-436) + Contact Desktop |
| **Lisez-moi** complet (si tu peux) | Capture scrollable du frame Lisez-moi | [9:56](https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE?node-id=9-56) |

---

## Priorité 5 — Motion (optionnel V1 polish)

| Anim | Lien composant | Besoin |
|------|----------------|--------|
| Mot hero | [150:956](https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE?node-id=150-956) | Durée / easing (ou note « garder 3 s ») |
| Diaporama | [150:973](https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE?node-id=150-973) | Intervalle / fade |
| Bandeaux | [150:296](https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE?node-id=150-296), [150:523](https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE?node-id=150-523), [150:810](https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE?node-id=150-810) | Vitesse défilement |

---

## Bonus — débloquer le MCP (recommandé)

Le seat Figma actuel est **View** → limite d’appels MCP atteinte.

1. Demander un seat **Full / Dev** sur le fichier, **ou**
2. [Demande d’upgrade seat](https://www.figma.com/files/1467066880591779770/recents-and-sharing?upgrade_request_type=expert&entry_point=mcp_rate_limit_deeplink)

Dès que le quota revient, je relance `get_variable_defs` + contextes section par section sans te demander autant de captures.

---

## Ordre de livraison idéal (minimum pour finir la charte)

1. Capture **variables couleurs** (Ocre inclus)  
2. Captures panel typo : Hero L2/L3 + 1 titre de section (Services) + Travaux + Contact  
3. Export **fond Contact** + **bureau équipe** + **before/after Koundji**  
4. Liste options Service / Budget  

Le reste (motion, galeries autres projets) peut suivre juste après.
