---
name: seo-review
description: Vérifier meta SSR, H1, canonical, hreflang, alt images pour une route MSK.
---

# SEO Review — MSK

Checklist par page :

- [ ] `title` et `description` depuis content (pas inventés)
- [ ] canonical correct pour la locale
- [ ] hreflang fr + en (+ x-default si défini)
- [ ] un seul H1 aligné Figma
- [ ] landmarks sémantiques
- [ ] images avec `alt` content
- [ ] HTML initial SSR contient le contenu critique

Outillage : `npm run build` puis inspection HTML, ou Playwright plus tard.
