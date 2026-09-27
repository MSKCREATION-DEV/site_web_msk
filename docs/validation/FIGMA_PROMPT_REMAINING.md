# Prompt Figma AI — export & classification des manquants MSK

Colle le bloc ci-dessous dans l’IA Figma **avec le fichier MSK-MAQUETTE ouvert**, idéalement après avoir sélectionné le frame **MSK CREATION — Desktop 1440** (`node-id=2-14`) **et** le frame fiche **KOUNDJI** (`node-id=9-2`) si l’outil permet plusieurs cibles.

---

## PROMPT À COPIER

```text
Tu es un agent d’export et de classification pour le site MSK Création (React).

OBJECTIF
Inventorier, classer et me rendre TOUT ce qui manque encore pour finaliser le code — sans inventer.

FICHIER
MSK-MAQUETTE — Desktop 1440 + fiches projet + composants.

INTERDICTIONS
- N’invente aucune option, couleur, texte, image ou chemin.
- Si un élément n’existe pas dans Figma : écris exactement « NON TROUVÉ ».
- Ne redesign rien. Ne propose pas d’alternatives Unsplash.
- Pour chaque asset trouvé : donne le nom de calque Figma + un lien Figma (node-id) + le nom de fichier CIBLE ci-dessous.

NOMENCLATURE FICHIERS CIBLE (obligatoire)
Utilise EXACTEMENT ces chemins / noms :

public/assets/contact/background.png
public/assets/team/office.png
public/assets/approach/gallery-01.png
public/assets/approach/gallery-02.png
public/assets/approach/gallery-03.png
public/assets/approach/gallery-04.png
public/assets/approach/gallery-05.png
public/assets/approach/gallery-06.png
public/assets/approach/gallery-07.png
public/assets/approach/gallery-08.png
public/assets/projects/koundji-services/before.png
public/assets/projects/koundji-services/after.png
public/assets/projects/{slug}/gallery-01.png … gallery-NN.png
  slugs autorisés grille V1 uniquement :
  koundji-services | thoy-art | ecosol | bomoyi | akwaba | elvi-creation

FORMAT DE SORTIE (Markdown strict, sections numérotées)

## 1. Formulaire Contact — listes
### Service
- Placeholder exact :
- Options (une ligne = une option, ordre Figma) :
### Budget
- Placeholder exact :
- Options (une ligne = une option, ordre Figma) :
Source : lien Figma node-id + nom calque / annotation Dev.

## 2. Hero — « Dernièrement / Projets récents »
- Libellé italic exact (« Dernièrement » ?) :
- Libellé liste exact (« Projets récents » ?) :
- Liste des projets affichés (ordre Figma, texte exact de chaque item) :
- Lien Figma du groupe :
Si absent : NON TROUVÉ.

## 3. Couleur hover carte Bomoyi
- Hex exact du titre / lien au survol :
- Lien Figma :
Si absent : NON TROUVÉ.

## 4. Assets images — tableau
Colonnes : | Statut | Calque Figma | Node ID / lien | Fichier cible | Format export | Notes |
Lignes OBLIGATOIRES (une par fichier cible) :
1. contact/background.png
2. team/office.png
3. approach/gallery-01 … gallery-08 (8 lignes)
4. projects/koundji-services/before.png
5. projects/koundji-services/after.png
6. Pour chaque slug de la grille : lister TOUTES les images de galerie présentes dans la fiche Figma, mappées vers gallery-01…NN
Statut = TROUVÉ | NON TROUVÉ | PLACEHOLDER (ex. vidéo CTA remplacée par photo)

Pour chaque TROUVÉ : indique « Export PNG 2× » ou « SVG » selon le type.

## 5. Fiche projet KOUNDJI (frame hors landing si besoin)
Pour chaque item, donne : famille, graisse, size px, line-height, letter-spacing, transform, couleur.
- Année
- H1 titre
- Label expertises + tags
- Description
- « Fermer »
- Compteur (ex. 01 / 06)
- Avant / Après : titres, sous-titre, labels Avant/Après
Lien frame : https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE?node-id=9-2

## 6. Liens Figma directs (à remplir)
Génère une liste cliquable au format :
- [Nom](https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE?node-id=XX-YY) — description courte
Couvrir au minimum :
- Desktop 1440
- Hero / Dernièrement
- Contact (fond + form selects)
- Équipe (bandeau bureau)
- Approche (galerie bureaux)
- Carte projet Bomoyi (état Survol)
- Fiche KOUNDJI + Avant/Après
- Chaque fiche des 6 projets grille si galeries présentes

## 7. Checklist finale
Liste à cocher :
- [ ] Options Service
- [ ] Options Budget
- [ ] Hero Dernièrement (liste)
- [ ] Couleur Bomoyi
- [ ] Fond Contact
- [ ] Office équipe
- [ ] Galerie Approche ×8
- [ ] Before/After Koundji
- [ ] Galeries fiches ×6 projets
- [ ] Typo fiche KOUNDJI

RÈGLE FINALE
Si tu ne peux pas exporter les binaires, donne quand même le tableau §4 + les liens §6 pour que l’humain exporte manuellement vers les chemins cibles.
Ne renvoie AUCUN chemin inventé hors nomenclature.
```

---

## Liens de départ (ouvre-les avant de lancer le prompt)

| Cible | Lien |
|-------|------|
| Desktop 1440 | https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE?node-id=2-14 |
| Fiche KOUNDJI | https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE?node-id=9-2 |
| États formulaire | https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE?node-id=240-436 |
| APERÇU Travaux | https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE?node-id=441-901 |
| Lisez-moi | https://www.figma.com/design/wn9ZMeW9YwaF3PE8Wqa2WS/MSK-MAQUETTE?node-id=9-56 |

---

## Après la réponse de l’IA Figma

1. Colle **tout le Markdown** ici dans le chat Cursor.  
2. Pour chaque ligne `TROUVÉ` du tableau assets : dans Figma, Export PNG **2×** (ou SVG) → enregistre sous le **fichier cible** exact dans `public/assets/...`.  
3. Si l’IA dit NON TROUVÉ : on documente et on n’invente pas.

## Export manuel rapide (si l’IA ne peut pas joindre les fichiers)

1. Clic calque image dans Figma  
2. Panneau droit → **Export** → PNG → **2x**  
3. Renomme selon la nomenclature du prompt  
4. Dépose dans le dossier `public/assets/...` correspondant  
```
