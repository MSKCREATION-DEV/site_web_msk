# Contact — design backend (Q23)

**Statut :** design documenté, **pas d’envoi réel** en V1.  
Le formulaire Figma reste CSR (validation + états loading/succès) pour ne pas tromper avec un faux backend productisé.

---

## État actuel

- UI : `ContactSection` (Figma Desktop).
- Validation partagée : `app/lib/validation/contact.ts` (réutilisable dans une `action`).
- Succès : stub `setTimeout` client — **à remplacer** dès qu’un provider est validé.
- Options Service / Budget : **vides** jusqu’à Q03.

---

## Décisions produit à valider (humain)

| Choix | Options | Bloquant |
|-------|---------|----------|
| Provider email | Resend, Postmark, SMTP, Formspree, … | Oui |
| Destinataire | `contact@mskcreation.net` (content) ou autre | Oui |
| Anti-spam | honeypot, Turnstile/hCaptcha, rate-limit IP | Recommandé |
| Stockage | email only vs log / CRM | Non |
| i18n erreurs serveur | messages génériques FR/EN (pas de stack) | Oui |

Ne pas committer de clés API. Utiliser env (`RESEND_API_KEY`, etc.) hors dépôt.

---

## Cible technique (quand Q23 fermée)

1. `action` sur route home (ou resource `routes/api.contact.ts`) — Framework Mode SSR.
2. Valider avec `validateContactFields` + taille max champs.
3. Rate-limit basique (mémoire / Upstash) si hébergeur le permet.
4. Envoyer via provider ; répondre `{ ok: true }` ou erreur générique.
5. UI : `useFetcher` — garder labels / layout Figma ; brancher pending/success sur fetcher.

Hors scope tant que non validé : fake “envoyé” long terme en prod, inventer options selects.

---

## Lien SEO / sécu

- Headers sécu déjà sur `root` (`app/lib/security/headers.ts`).
- `form-action 'self'` en CSP prod : l’action doit rester same-origin.
