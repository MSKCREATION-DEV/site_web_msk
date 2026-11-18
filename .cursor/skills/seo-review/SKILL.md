---
name: seo-review
description: Vérifier meta SSR, H1, canonical, hreflang, alt images pour une route MSK.
---

# SEO Review — MSK

Spec : `docs/design/SEO_STRUCTURED_DATA.md`. Helpers : `app/lib/seo`.

Checklist par page :

- [ ] `title` et `description` depuis content (pas inventés)
- [ ] canonical correct pour la locale
- [ ] hreflang fr + en (+ x-default si défini)
- [ ] un seul H1 aligné Figma
- [ ] landmarks sémantiques
- [ ] images avec `alt` content
- [ ] HTML initial SSR contient le contenu critique
- [ ] `og:site_name`, `og:image`, `twitter:image` présents (URL absolue)
- [ ] Image partage = asset Figma/`public` documenté (default : hero `slide-01`)
- [ ] JSON-LD SSR (`script type="application/ld+json"`) :
  - home : Organization + WebSite + Person (équipe)
  - fiche : CreativeWork (+ ImageObject cover)
- [ ] `sameAs` uniquement depuis `footer.social` (pas d’URL inventée) ; pas de bios inventées (Q21)
- [ ] Alts équipe : `{name}, {role} · {brand}`
- [ ] `/robots.txt` pointe vers `/sitemap.xml`
- [ ] `/sitemap.xml` liste home FR/EN + fiches deck 7 × 2 locales
- [ ] `VITE_SITE_ORIGIN` = origine prod en déploiement

Outillage :

```bash
npm run build
# ou npm run dev puis :
# view-source:/fr → meta + JSON-LD
# curl -s http://localhost:5173/sitemap.xml
# curl -s http://localhost:5173/robots.txt
npm run check:copy
```

Playwright / Lighthouse CI = phase ultérieure (P2).
