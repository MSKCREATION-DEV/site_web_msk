# Google Search Console — guide pas à pas (MSK Création)

Guide opérationnel pour indexer le site vitrine SSR. À exécuter **par un humain** (compte Google propriétaire du domaine).  
Références code : `app/lib/seo/*`, routes `/robots.txt` et `/sitemap.xml`, spec [`docs/design/SEO_STRUCTURED_DATA.md`](../design/SEO_STRUCTURED_DATA.md).

---

## 0. Prérequis

1. Site déployé en **HTTPS** (preview Vercel ou prod).
2. Variable de build **`VITE_SITE_ORIGIN`** = origine exacte du déploiement **sans slash final** (ex. `https://www.mskcreation.net`).  
   Canonical, hreflang, `og:image`, JSON-LD et `Sitemap:` dans robots dépendent de cette valeur.
3. Vérifier avant soumission :

```bash
# Remplacer par l’origine réelle
ORIGIN=https://www.mskcreation.net

curl -sS "$ORIGIN/robots.txt"
curl -sS "$ORIGIN/sitemap.xml" | head -80

# Local (dev) si besoin
curl -sS http://localhost:5173/robots.txt
curl -sS http://localhost:5173/sitemap.xml | head -80
```

`robots.txt` doit contenir `Sitemap: {ORIGIN}/sitemap.xml`.  
Le sitemap doit lister home FR/EN, équipe FR/EN, et les 7 fiches × 2 locales.

---

## 1. Créer (ou ouvrir) une propriété

1. Ouvrir [Google Search Console](https://search.google.com/search-console).
2. **Ajouter une propriété**.
3. Choisir le type selon le contexte :

| Contexte | Type de propriété | Quand l’utiliser |
|----------|-------------------|------------------|
| **Production** (domaine final) | **Préfixe de domaine** (`mskcreation.net`) | Recommandé : couvre `www` / apex / http / https après DNS |
| **Production** (une seule URL) | **Préfixe d’URL** (`https://www.mskcreation.net`) | Si vous ne gérez que le `www` HTTPS |
| **Preview Vercel** | **Préfixe d’URL** (`https://….vercel.app`) | Tests crawl / inspection uniquement. **Ne pas** traiter comme source de vérité SEO prod |

Conseil MSK : en prod, préférer la propriété **domaine** une fois le DNS sous contrôle.

---

## 2. Vérifier la propriété

### 2.a Propriété domaine (DNS)

1. Search Console affiche un enregistrement **TXT** à poser chez le registrar / DNS.
2. Ajouter le TXT à l’apex (ou selon les instructions Google).
3. Attendre la propagation DNS (minutes → 48 h).
4. Cliquer **Vérifier**.

Pas besoin de balise HTML pour ce mode.

### 2.b Préfixe d’URL (HTML ou autre)

Options courantes :

1. **Balise HTML** `meta name="google-site-verification"` dans `<head>`  
   - Côté MSK : à brancher **uniquement** si produit valide une balise dédiée (ne pas inventer en silence).  
   - Alternative temporaire : fichier HTML de vérification à la racine `public/` si Google le propose.
2. **Fichier HTML** téléchargé → placer dans `public/` → déployer → vérifier.
3. **Google Analytics / Tag Manager** : seulement si déjà en place (hors scope V1 MSK).

Après succès : la propriété passe à l’état vérifié.

---

## 3. Preview vs production — quoi faire où

| Action | Preview (`*.vercel.app`) | Production (domaine final) |
|--------|--------------------------|----------------------------|
| Vérifier la propriété | Optionnel (préfixe URL) | **Oui** (domaine ou préfixe URL prod) |
| Soumettre le sitemap | Utile pour tester le format | **Oui** (sitemap prod) |
| Inspection d’URL | Smoke test meta / SSR | **Oui** (URLs canoniques) |
| Attendre ranking / rapports | Non pertinent | Oui |
| `VITE_SITE_ORIGIN` | URL preview exacte | `https://www.mskcreation.net` (ou domaine final) |

Important : un sitemap preview qui pointe vers `*.vercel.app` **n’aide pas** l’indexation du domaine prod. Toujours soumettre le sitemap de l’origine que Google doit indexer.

---

## 4. Soumettre le sitemap

1. Search Console → propriété **prod** (ou preview si test).
2. Menu **Sitemaps**.
3. Champ « Ajouter un sitemap » : saisir uniquement le chemin relatif :

```text
sitemap.xml
```

4. **Envoyer**.
5. Statut attendu après crawl : **Opérationnel** (ou succès avec URLs découvertes).  
   Erreurs fréquentes : `VITE_SITE_ORIGIN` faux au build, 404 sur `/sitemap.xml`, URLs en `http://localhost`.

URLs typiques à connaître :

```text
https://www.mskcreation.net/robots.txt
https://www.mskcreation.net/sitemap.xml
https://www.mskcreation.net/fr
https://www.mskcreation.net/en
https://www.mskcreation.net/fr/travaux/{slug}
https://www.mskcreation.net/en/projects/{slug}
```

Slugs deck (7) : `prosperity`, `thoy-art`, `koundji-services`, `bomoyi`, `ecosol`, `elvi-creation`, `akwaba` (confirmer via le sitemap live).

---

## 5. Inspection d’URL (smoke SEO)

Pour chaque locale critique (`/fr`, `/en`, une fiche) :

1. Outil **Inspection de l’URL** → coller l’URL absolue.
2. **Tester l’URL en direct** (pas seulement la version indexée).
3. Contrôler :
   - HTTP 200
   - Canonical déclaré = URL attendue
   - HTML initial contient title, meta description, H1, contenu (SSR)
   - Pas de `noindex` involontaire
4. Si OK et propriété prod : **Demander une indexation** (quota limité : prioriser home + 1–2 fiches).

Vérification manuelle complémentaire :

```bash
ORIGIN=https://www.mskcreation.net
curl -sS "$ORIGIN/fr" | rg -n "og:title|og:image|application/ld\+json|rel=\"canonical\""
```

---

## 6. Couverture & suivi (après quelques jours)

1. **Pages** / **Indexation** : URLs valides vs exclues.
2. Corriger les 404 / redirections / canonical croisés FR↔EN.
3. **Améliorations** : Core Web Vitals = phase ultérieure (Lighthouse CI P2).
4. Ne **pas** ajouter de balise `meta keywords` : Google l’ignore ; le signal utile = title, H1, description, alts, contenu SSR, JSON-LD.

---

## 7. Checklist go-live SEO

- [ ] `VITE_SITE_ORIGIN` prod = HTTPS domaine final (sans `/` final)
- [ ] `npm run check:origin -- --strict` OK avec l’origine prod
- [ ] `https://{domaine}/robots.txt` → `Sitemap: https://{domaine}/sitemap.xml`
- [ ] Sitemap liste home + équipe + 14 fiches (7×2)
- [ ] Propriété Search Console vérifiée (domaine ou préfixe URL)
- [ ] Sitemap soumis sur la propriété **prod**
- [ ] Inspection live OK sur `/fr` et `/en`
- [ ] OG / JSON-LD présents dans le HTML initial

---

## 8. Liens utiles

- [Search Console](https://search.google.com/search-console)
- Preview Vercel MSK : [`VERCEL_PREVIEW.md`](./VERCEL_PREVIEW.md)
- Spec structured data : [`SEO_STRUCTURED_DATA.md`](../design/SEO_STRUCTURED_DATA.md)
- Gate origin : `npm run check:origin`
