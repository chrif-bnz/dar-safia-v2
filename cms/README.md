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

- Les photos des 45 parfums ne sont pas dans le dépôt : le seed les ignore. Les ajouter depuis l'admin (Parfum → Images) ; le site les affichera.
- SQLite en local ; PostgreSQL en production via `DATABASE_CLIENT=postgres` et les variables `DATABASE_*` (voir `.env.example`).
- Après modification d'un schéma : `npx strapi ts:generate-types` et commiter `types/generated/`.
