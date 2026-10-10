# Dar Safia — CMS (Strapi 5)

Contenu et enregistrements du site. Le site (`web/`) ne lui parle que par HTTP.

## Démarrer

```bash
cd cms
cp .env.example .env      # remplacer les valeurs « tobemodified » par des chaînes aléatoires
npm install
npm run develop           # http://localhost:1337/admin — créer le premier compte admin
```

Puis, une fois, depuis `web/` : `npm run prepare-assets` (génère `web/src/data/`), et depuis `cms/` :

```bash
npm run seed              # importe 21 marques, 254 notes, 45 parfums (idempotent)
npm run tokens:create     # affiche STRAPI_API_TOKEN et STRAPI_FORMS_TOKEN, UNE seule fois
```

Reporter les deux jetons dans le `.env` **du site** (`web/.env.local` ou le `.env` racine), avec `STRAPI_URL=http://localhost:1337` et `CATALOG_SOURCE=strapi`.

## Modèle

| Type | Rôle | Accès REST |
|---|---|---|
| `product` (Parfum) | Fiche catalogue : marque, notes (pyramide), formats + prix, images, SEO. Brouillon / publié. | lecture (jeton catalogue) |
| `brand`, `fragrance-note`, `collection` | Référentiels du catalogue. Brouillon / publié. | lecture (jeton catalogue) |
| `order` (Commande) | Demande de commande reçue du site. Statut : new → confirmed → shipped → delivered / cancelled. | **création seule** (jeton formulaires) |
| `contact-message` | Message « écrire à la maison » ou collaboration. Statut : new / read / answered / archived. | **création seule** (jeton formulaires) |

Composants : `shared.money`, `shared.seo`, `catalog.variant` (format vendu), `catalog.product-note` (note + étage + position), `orders.order-item`.

Les noms de champs de `product`, `brand`, `fragrance-note`, `collection` suivent `web/src/lib/catalog/strapi-types.ts` : les modifier impose de modifier le mapper du site.

## Règles de sécurité

- Rien n'est public. Deux jetons à droits minimaux (voir `scripts/create-api-tokens.js`) : lecture du catalogue ; création de commandes et de messages.
- `order` et `contact-message` n'exposent que `create` : on les consulte et on les traite **dans l'admin** (Content Manager), jamais par l'API.
- Une commande ne transporte pas de prix : le contrôleur relit nom, contenance et prix dans le catalogue publié, et calcule le sous-total. Téléphone, longueurs et lignes sont revalidés (`api/order/utils/validate-order.ts`).
- Le navigateur ne parle jamais à Strapi : il passe par `/api/orders` et `/api/contact` du site (même origine, limiteur de débit, pot de miel), qui portent le jeton côté serveur.
- Aucun secret n'est commité (`cms/.env` est ignoré).

## À savoir

- Les photos des parfums sont versionnées dans `perfumes/Photos site web/` ; `npm run seed` les téléverse dans Strapi (médiathèque) et les rattache à chaque parfum. Relancer le seed complète les parfums déjà importés qui n'ont pas encore d'image. Une photo ajoutée ou remplacée dans l'admin (Parfum → Images) est servie par le site telle quelle.
- SQLite en local ; PostgreSQL en production via `DATABASE_CLIENT=postgres` et les variables `DATABASE_*` (voir `.env.example`).
- Après modification d'un schéma : `npx strapi ts:generate-types` et commiter `types/generated/`.

## Brancher le site sur Strapi

Vérifié : avec `CATALOG_SOURCE=strapi`, les 50 pages testées (accueil, liste en FR/EN/AR, diagnostic, 45 fiches) affichent exactement les mêmes textes, prix et notes qu'avec les données statiques ; les images viennent de `/uploads` de Strapi.

Dans l'environnement du SITE (jamais commité) :

```
CATALOG_SOURCE=strapi
STRAPI_URL=https://<votre-strapi>        # URL publique, sans « / » final
STRAPI_API_TOKEN=<jeton lecture>         # npm run tokens:create
STRAPI_FORMS_TOKEN=<jeton création>
```

Sans `CATALOG_SOURCE`, le site garde les données statiques : rien ne change tant que Strapi n'est pas hébergé et ces variables posées.

## Mise en ligne de Strapi (à faire une fois)

Le site déployé (Netlify) ne peut lire que PAR HTTP un Strapi accessible publiquement ; celui de `localhost` ne lui sert à rien.

1. Héberger `cms/` (Render, Railway, VPS…) avec **PostgreSQL** (`DATABASE_CLIENT=postgres`, `DATABASE_*`) et de **vraies** valeurs pour `APP_KEYS`, `*_SALT`, `*_SECRET`, `ENCRYPTION_KEY` (le `.env` d'exemple porte « tobemodified »).
2. Les images doivent survivre aux redéploiements : disque persistant monté sur `public/uploads`, ou fournisseur d'upload distant (Cloudinary, S3).
3. Sur le serveur : `npm run build`, puis `npm run start`, créer le compte admin, `npm run seed`, `npm run tokens:create`.
4. Poser les quatre variables ci-dessus dans Netlify, puis redéployer.

Un changement fait dans l'admin n'apparaît sur le site qu'au prochain déploiement (les 155 pages sont générées au build) : ajouter un webhook Strapi → build hook Netlify pour le déclencher automatiquement.
