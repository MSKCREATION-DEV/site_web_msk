# MSK Création --- Plan complet du site React Router

Version V1 --- React Router v8, SSR, Tailwind CSS, daisyUI.

Le Figma validé est la source de vérité visuelle. Aucune interface,
section, contenu, animation, couleur, typographie, espacement ou
comportement responsive ne doit être inventé sans remontée et
validation.

## Périmètre V1

-   React Router v8 --- Framework Mode
-   Vite
-   TypeScript
-   SSR
-   Tailwind CSS
-   daisyUI
-   Architecture contenu/données séparée
-   Multilingue prévu dès le départ
-   CSR uniquement lorsque nécessaire

Pas de Directus, PostgreSQL, Cloudflare Workers, R2 ou backend dans
cette première étape.

## Architecture

``` txt
Browser
  ↓
React Router v8
  ↓
SSR
  ├── routes
  ├── loaders
  └── contenu
  ↓
HTML
  ↓
Hydration
  ↓
CSR uniquement pour les interactions nécessaires
```

## Règle absolue Figma

Le développement reproduit le design validé à la lettre de A à Z.

Si un élément n'existe pas dans Figma ou si son comportement est ambigu
:

1.  identifier le manque ;
2.  expliquer le problème ;
3.  proposer éventuellement une solution ;
4.  demander validation ;
5.  documenter la décision ;
6.  seulement ensuite implémenter.

Ne jamais ajouter une section parce qu'elle semble utile, inventer du
contenu pour remplir une page, choisir une image stock arbitraire,
inventer un breakpoint ou ajouter une animation non validée.

## Structure

``` txt
app/
├── components/
│   ├── ui/
│   ├── layout/
│   └── sections/
├── content/
│   ├── fr/
│   └── en/
├── data/
├── i18n/
├── lib/
│   ├── seo/
│   ├── utils/
│   └── validation/
├── routes/
├── router/
├── server/
│   └── api/
├── styles/
├── root.tsx
└── routes.ts

public/
.cursor/
├── rules/
├── skills/
└── mcp.json

docs/
├── architecture/
├── design/
├── decisions/
└── validation/

AGENTS.md
react-router.config.ts
vite.config.ts
package.json
```

## Séparation

``` txt
UI
≠ contenu
≠ données
≠ traductions
```

Les composants reçoivent leur contenu. Ils ne contiennent pas les
traductions en dur.

Exemple :

``` tsx
<Hero
  title={content.hero.title}
  description={content.hero.description}
/>
```

## Multilingue

Structure cible :

``` txt
/fr
/fr/a-propos
/fr/services
/fr/projets
/fr/contact

/en
/en/about
/en/services
/en/projects
/en/contact
```

La liste finale des langues doit être validée.

Le système doit prévoir :

-   locale ;
-   routes ;
-   contenus ;
-   metadata ;
-   canonical ;
-   hreflang.

## React Router / SSR

`react-router.config.ts` conserve :

``` ts
ssr: true
```

Les routes sont déclarées explicitement dans `app/routes.ts`,
éventuellement composées depuis `app/router/*.routes.ts`.

Utiliser les route modules, les layouts imbriqués et `<Outlet />`.

Loader pour toute lecture initiale.

Action pour toute mutation.

`useFetcher` pour une mutation sans navigation.

`useNavigation` pour le pending global.

`useRevalidator` uniquement lorsqu'une revalidation explicite est
nécessaire.

Search params pour les filtres, tri, pagination, période et onglet
partageable.

Les composants ne contiennent pas de fetch, session, RBAC ou parsing
métier lourd.

## Règle fournie --- architecture pages/data/API

La règle suivante est conservée comme règle de référence du projet :

``` md
---
description: Séparation pages, loaders, actions et API server-only
alwaysApply: true
---

# Structure par domaine

```txt
app/server/<domain>/
  loaders/<domain>.server.ts
  actions/<domain>.server.ts
  schema/<domain>.schema.ts
  mappers/<domain>.mapper.ts
```

# API

Tous les appels externes passent par `app/server/api/*.server.ts`.

Le client API :

-   ajoute Authorization depuis la session serveur ;
-   ajoute correlation ID et idempotency key si requis ;
-   applique timeout ;
-   normalise erreurs ;
-   ne journalise jamais les payloads sensibles ;
-   transforme 401/403/409/422 en réponses gérables.

# FormData

-   parser dans une action ;
-   valider avec Zod ;
-   retourner des erreurs françaises structurées ;
-   ne pas faire confiance aux champs cachés pour les permissions ou
    l'identité de l'utilisateur.

# Mocks

Les mocks utilisent les mêmes interfaces que l'API réelle et restent
server-only.


    Pour le site public, les parties non applicables ne doivent pas être artificiellement implémentées.

    ## Règle React Router fournie

    ```md
    ---
    description: React Router v7 Framework Mode et SSR
    alwaysApply: true
    ---

    # SSR

    - `react-router.config.ts` doit conserver `ssr: true`.
    - Les routes sont déclarées explicitement dans `app/routes.ts` et éventuellement composées depuis `app/router/*.routes.ts`.
    - Utiliser des route modules, layouts imbriqués et `<Outlet />`.

    # Données

    - Loader pour toute lecture initiale.
    - Action pour toute mutation.
    - `useFetcher` pour une mutation sans navigation.
    - `useNavigation` pour le pending global.
    - `useRevalidator` seulement lorsqu'une revalidation explicite est nécessaire.
    - Search params pour filtres, tri, pagination, période et onglet partageable.

    # Pages

    Une page exporte des fonctions courtes :

    ```ts
    export { agentsListLoader as loader } from '~/server/agents/loaders/agents.server';
    export { agentsListAction as action } from '~/server/agents/actions/agents.server';

Ne pas mettre de fetch, session, RBAC ou parsing métier lourd dans le
composant.

# Erreurs

-   401 : détruire ou renouveler la session selon la stratégie validée.
-   403 : route `/unauthorized` ou boundary dédiée.
-   404 : catch-all.
-   409 : message de conflit + revalidation.
-   422 : erreurs de champs.
-   500 : message générique avec correlationId.

```{=html}
<!-- -->
```

    Le texte est conservé conformément à la demande. Pour ce site vitrine, 401/403/RBAC/session restent inactifs tant qu'aucune fonctionnalité authentifiée n'est validée.

    ## Tailwind + daisyUI

    Tailwind est la couche de composition.

    daisyUI fournit des primitives.

    Le design system MSK est construit au-dessus.

    ```txt
    Tailwind
      ↓
    daisyUI
      ↓
    MSK Design System
      ↓
    Pages

Ne pas utiliser les couleurs, tailles, rayons ou composants par défaut
lorsqu'ils contredisent Figma.

## Design system

Le design system doit être extrait de Figma :

-   couleurs ;
-   typographies ;
-   poids ;
-   tailles ;
-   line-height ;
-   espacements ;
-   grille ;
-   breakpoints ;
-   rayons ;
-   ombres ;
-   bordures ;
-   icônes ;
-   boutons ;
-   champs ;
-   cartes ;
-   navigation ;
-   états ;
-   variantes.

Aucune valeur inconnue ne doit être inventée.

## Figma workflow

``` txt
Figma
 ↓
analyse
 ↓
inventaire
 ↓
tokens
 ↓
variants
 ↓
responsive
 ↓
assets
 ↓
questions ouvertes
 ↓
validation
 ↓
implémentation
 ↓
comparaison visuelle
```

Créer :

``` txt
docs/design/FIGMA_INVENTORY.md
docs/design/DESIGN_TOKENS.md
docs/design/DESIGN_DECISIONS.md
docs/validation/FIGMA_OPEN_QUESTIONS.md
```

## Inventaire Figma

Pour chaque écran :

``` txt
Page
Section
Composant
Variant
Desktop
Tablet
Mobile
Interaction
Animation
Asset
Texte
Lien
État
Question
Statut de validation
```

## Responsive

Ne pas déduire arbitrairement le comportement mobile.

Comparer :

``` txt
Desktop Figma
Tablet Figma
Mobile Figma
```

et documenter les transformations.

Si un comportement n'est pas déterminable :

``` txt
PENDING → validation
```

## Composants

Créer uniquement les composants nécessaires au design ou réellement
réutilisés.

``` txt
components/
├── ui/
├── layout/
└── sections/
```

Éviter la sur-abstraction.

## Contenu et données

Le contenu éditorial est dans :

``` txt
app/content/fr/
app/content/en/
```

Les données structurées sont dans :

``` txt
app/data/
```

Cette séparation prépare l'arrivée future d'un CMS sans coupler les
composants à Directus.

## Futur CMS

V1 :

``` txt
React Router
 ↓
loader
 ↓
contenu local
```

Plus tard :

``` txt
React Router
 ↓
loader
 ↓
content service
 ↓
Directus SDK
 ↓
Directus
```

Les composants ne doivent jamais dépendre directement de Directus.

## SEO

Chaque page publique doit prévoir :

-   title ;
-   description ;
-   canonical ;
-   lang ;
-   Open Graph ;
-   hreflang pour les versions linguistiques ;
-   H1 cohérent ;
-   structure sémantique.

Le contenu SEO ne doit pas être inventé.

Plus tard, selon le périmètre validé :

-   sitemap ;
-   robots ;
-   données structurées.

## Images / vidéos

Utiliser les assets fournis ou validés.

Si un asset manque :

``` txt
identifier
→ remonter
→ proposer éventuellement un placeholder
→ valider
→ intégrer
```

Ne jamais remplacer silencieusement un asset Figma par une image stock.

## CSR

CSR uniquement pour :

-   menu mobile ;
-   drawer ;
-   modal ;
-   carousel ;
-   tabs ;
-   filtres ;
-   animations ;
-   formulaires ;
-   APIs navigateur.

Le contenu principal reste SSR.

## Cursor

Créer :

``` txt
AGENTS.md
.cursor/rules/
.cursor/skills/
.cursor/mcp.json
```

Règles recommandées :

``` txt
react-router-ssr.mdc
architecture-pages-data.mdc
design-figma.mdc
responsive.mdc
styling-tailwind-daisyui.mdc
i18n.mdc
accessibility.mdc
seo.mdc
testing.mdc
workflow.mdc
```

Les règles doivent rester courtes et spécialisées.

## Skills

Prévoir seulement les skills réellement utiles :

``` txt
msk-figma-implementation
react-router-ssr
responsive-qa
seo-review
visual-regression
```

Chaque skill possède un `SKILL.md`.

## MCP

Pour cette V1 :

``` txt
Figma MCP
Playwright MCP
```

sont pertinents.

Directus MCP est reporté tant que Directus n'est pas intégré.

Les MCP servent au développement et ne deviennent pas des dépendances
runtime.

## Tests

Pipeline :

``` txt
typecheck
 ↓
lint
 ↓
build
 ↓
tests ciblés
 ↓
tests navigateur
 ↓
QA responsive
 ↓
comparaison visuelle
```

Vérifier notamment :

-   SSR ;
-   HTML initial ;
-   title ;
-   meta ;
-   H1 ;
-   liens ;
-   navigation ;
-   responsive ;
-   erreurs console ;
-   accessibilité ;
-   contenu ;
-   traductions.

## Git

Commits lisibles :

``` txt
feat: initialize react router project
feat: add multilingual route structure
feat: implement header from figma
fix: align mobile hero with figma
test: add home route coverage
```

Ne pas créer de commit qui mélange plusieurs responsabilités sans
raison.

## Phases

### Phase 0 --- Cadrage

-   récupérer le Figma ;
-   confirmer le périmètre ;
-   confirmer les langues ;
-   confirmer les pages ;
-   créer les questions ouvertes.

### Phase 1 --- Bootstrap

-   React Router v8 ;
-   Vite ;
-   TypeScript ;
-   SSR ;
-   Tailwind ;
-   daisyUI.

### Phase 2 --- Cursor

-   AGENTS.md ;
-   Rules ;
-   Skills ;
-   Figma MCP ;
-   Playwright MCP.

### Phase 3 --- Architecture

-   routes ;
-   layouts ;
-   components ;
-   content ;
-   data ;
-   i18n ;
-   server boundaries.

### Phase 4 --- Audit Figma

-   pages ;
-   sections ;
-   composants ;
-   variants ;
-   tokens ;
-   responsive ;
-   assets ;
-   interactions ;
-   ambiguïtés.

### Phase 5 --- Design System

-   tokens validés ;
-   primitives ;
-   composants ;
-   variantes.

### Phase 6 --- Layout

-   root ;
-   header ;
-   navigation ;
-   footer.

### Phase 7 --- Pages

Pour chaque page :

``` txt
Figma
 ↓
structure
 ↓
loader
 ↓
contenu
 ↓
composants
 ↓
responsive
 ↓
SEO
 ↓
tests
 ↓
validation
```

### Phase 8 --- Multilingue

-   routes ;
-   contenu ;
-   navigation ;
-   metadata ;
-   canonical ;
-   hreflang.

### Phase 9 --- SEO

-   metadata ;
-   sitemap ;
-   robots ;
-   structured data selon besoin validé.

### Phase 10 --- QA

-   SSR ;
-   browser ;
-   responsive ;
-   accessibilité ;
-   performance ;
-   comparaison Figma.

### Phase 11 --- Validation finale

Aucune divergence Figma non validée.

### Phase 12 --- Plus tard

``` txt
Directus
PostgreSQL
R2
Cloudflare
CI/CD
```

## Definition of Done

``` txt
[ ] correspond au Figma validé
[ ] responsive validé
[ ] contenu séparé de l'UI
[ ] traductions prévues
[ ] SSR correct
[ ] logique serveur hors composant
[ ] TypeScript valide
[ ] lint valide
[ ] build valide
[ ] tests pertinents passants
[ ] aucune erreur console
[ ] accessibilité vérifiée
[ ] SEO vérifié
[ ] comparaison visuelle effectuée
[ ] validation humaine effectuée
```

## Décisions actuellement validées

  Sujet           Décision
  --------------- ------------------------------------
  Framework       React Router v8
  Mode            Framework Mode
  Rendering       SSR
  CSR             uniquement lorsque nécessaire
  Langage         TypeScript
  Build           Vite
  CSS             Tailwind CSS
  UI              daisyUI
  Design system   MSK custom
  Contenu         séparé
  Données         séparées
  Multilingue     prévu dès V1
  CMS             aucun en V1
  Backend         aucun en V1
  Figma           source de vérité
  IA              assistant, jamais décideur produit

## Décisions volontairement non prises

``` txt
langues finales
structure exacte des pages
breakpoints finaux
tokens exacts
palette exacte
typographies exactes
animations
comportements mobiles ambigus
assets finaux
contenus SEO
formulaires éventuels
hébergement final
Directus
R2
Cloudflare
```

## Règle finale

> Nous ne construisons pas le site que nous imaginons. Nous construisons
> le site qui a été conçu et validé dans Figma.

Lorsqu'un élément manque :

``` txt
ON NE DEVINE PAS.
ON LE REMONTE.
ON PROPOSE SI NÉCESSAIRE.
ON FAIT VALIDER.
PUIS ON CODE.
```

## Première étape opérationnelle

Avant de développer les pages :

1.  récupérer le fichier/lien Figma ;
2.  analyser toutes les pages ;
3.  établir `FIGMA_INVENTORY.md` ;
4.  identifier les composants ;
5.  identifier les tokens ;
6.  identifier le responsive ;
7.  identifier les assets ;
8.  créer `FIGMA_OPEN_QUESTIONS.md` ;
9.  faire valider les ambiguïtés ;
10. seulement ensuite construire le frontend.
