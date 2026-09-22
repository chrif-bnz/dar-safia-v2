# Dar Safia — v2

Maison de haute parfumerie (Algérie). Boutique et expérience digitale :
parfums niche, importés et curation de luxe.

Application **Next.js 16** (App Router, TypeScript, Tailwind 4, GSAP + Lenis),
en trois langues — français (source), arabe (RTL) et anglais.

## Démarrer

```bash
npm install            # racine : sharp, pour la chaîne d'images
npm ci --prefix web    # l'application
npm run dev            # http://localhost:3000
```

Deux installations, et c'est voulu : `scripts/` vit à la racine, donc Node y
résout ses dépendances (`sharp`) — pas dans `web/node_modules`.

`predev` et `prebuild` exécutent d'abord `prepare-assets`, qui lance les deux
scripts de la racine : catalogue et images dérivées sont régénérés avant
chaque lancement.

```bash
npm run build          # build de production
npm test               # Vitest
npm run lint           # ESLint
```

Les scripts de la racine ne font que déléguer à `web/`.

## Structure

| Chemin | Rôle |
|---|---|
| `web/` | L'application Next.js. Tout le code du site. |
| `catalog-data.js` | **Source** du catalogue (45 parfums). |
| `scripts/migrate-catalog.mjs` | En dérive `web/src/data/*.json` (généré, non versionné). |
| `scripts/optimize-images.mjs` | Dérive les images responsives dans `web/public/img/` (généré, non versionné). |
| `perfumes/`, `branding images/`, `logo/` | Masters des images. Seule source à versionner. |
| `design-system/` | Jetons de design (`tokens.json`) et leur documentation. |

Deux dossiers sont **générés** et volontairement absents du dépôt —
`web/src/data/` et `web/public/img/`. Les régénérer :

```bash
npm run prepare-assets --prefix web
```

## Contenu

- Accueil cinématique (film d'ouverture, révélations au défilement).
- Catalogue filtrable, 45 fiches produit × 3 langues, rendues statiquement.
- Page « La maison » avec une scène 3D (three.js) : flacon en verre, jus
  animé, prise en main à la souris.
- Diagnostic olfactif (le score tourne côté serveur ; le catalogue n'est
  jamais envoyé au navigateur).
- Panier et commande via la conciergerie WhatsApp — aucune donnée n'est
  conservée côté serveur, le lien `wa.me` est construit dans le navigateur.

## Configuration

Voir `.env.example`. Le catalogue vient par défaut des JSON statiques ;
`CATALOG_SOURCE=strapi` bascule vers l'API Strapi, qui ne vit pas dans ce
dépôt. Seul `web/src/lib/catalog/index.ts` connaît cette bascule.

⚠️ Tout ce qui est préfixé `NEXT_PUBLIC_` est public dans le bundle client.
