# DAR SAFIA — Instructions projet

Boutique et expérience digitale de haute parfumerie (Algérie) : parfums niche,
importés et curation de luxe. Le site doit donner la sensation d'entrer dans une
**maison de parfum digitale**, pas dans un ecommerce générique.

## Règle n°1 — Planifier avant de construire

Ne jamais lancer une réécriture majeure d'emblée. Pour toute tâche importante :

`ANALYSER → PLANIFIER → IMPLÉMENTER → TESTER → RELIRE → OPTIMISER`

Explorer le code existant, identifier dépendances / actifs réutilisables /
risques, proposer un plan et les fichiers touchés, **puis** implémenter.
Ne jamais réécrire du code qui fonctionne sans raison.

## État actuel

Ce dépôt est le site Next.js et rien d'autre. L'ancien site vanilla (Vite) et
la maquette `admin.html` restent dans le dépôt `dar-safia` ; ils ne sont pas
repris ici.

| Répertoire | Rôle |
|---|---|
| `web/` | Application Next.js 16 (App Router, TS, Tailwind 4). Toutes routes sous `/[locale]/` (FR/AR/EN + RTL). Accueil, catalogue filtrable, 45 fiches produit × 3 langues (SSG), panier + commande WhatsApp, diagnostic olfactif, page « La maison » (three.js). Tests Vitest. |
| `catalog-data.js` | Source du catalogue (45 parfums). `scripts/migrate-catalog.mjs` en dérive `web/src/data/` (gitignoré). |
| `scripts/` | `migrate-catalog.mjs` (catalogue) et `optimize-images.mjs` (images responsives vers `web/public/img/`, gitignoré). Lancés par `prepare-assets` avant chaque `dev` / `build`. |
| `perfumes/`, `branding images/`, `logo/` | Masters des images. Seule source à versionner ; les dérivés sont régénérés. |
| `cms/` | Projet Strapi 5 (TypeScript, SQLite en local, PostgreSQL en cible). Schémas : parfums, marques, notes, collections (lecture) ; commandes et messages de contact (création seule). Voir `cms/README.md`. Le site ne lui parle que par HTTP, derrière `web/src/lib/catalog/index.ts`. |
| `design-system/` | Jetons (`tokens.json`) que reflète `web/src/app/globals.css`. |

Ces deux dossiers sont **générés**, jamais édités à la main ni commités :
`web/src/data/` et `web/public/img/`. Éditer un JSON généré serait perdu au
prochain lancement.

**Règle de couture :** dans `web/`, les composants importent uniquement
`@/lib/catalog`, jamais `products.json` ni une implémentation concrète.
Remplacer le repository statique par Strapi ne doit toucher que
`web/src/lib/catalog/index.ts`. Le CMS ne vit pas dans ce dépôt : on ne lui
parle que par HTTP, derrière cette couture.

Next 16 postdate l'entraînement : lire `web/node_modules/next/dist/docs/`
avant d'écrire du code Next.

## Architecture cible

Next.js · TypeScript · Tailwind · GSAP · Strapi · PostgreSQL.
Évolution **incrémentale**, jamais aveugle. Ne pas coupler les composants UI aux
données statiques temporaires : garder des abstractions de données propres pour
Strapi. L'i18n (FR / AR / EN, avec RTL pour l'arabe) est déjà en place et doit
le rester — toute clé ajoutée l'est dans les trois langues.

## Design

Cinématique, éditorial, minimal, immersif. **Le luxe vient de la retenue.**

- Préférer : typographie forte, photographie plein écran, whitespace généreux,
  transitions élégantes, hiérarchie visuelle maîtrisée.
- Éviter : layouts SaaS génériques, cards trop arrondies, gradients cheap,
  glassmorphism aléatoire, ombres excessives, bruit visuel.
- **Ne pas remplacer l'identité visuelle et les couleurs existantes** sans
  consigne explicite.
- Ne pas ajouter d'élément visuel juste parce qu'il reste de l'espace vide.

### Univers olfactifs

Les fiches produit peuvent porter une atmosphère propre à la famille (boisé =
textures profondes / ombres chaudes ; floral = mouvement délicat ; frais =
fluidité, verre, reflets ; oriental = fumée, or, lumière cinématique).
Piloté par les données produit (famille, notes, saison, occasion, humeur).
Expériences immersives réservées aux **produits mis en avant** ; les autres
gardent une fiche premium optimisée.

## Animation

Trois niveaux : micro-interactions → motion d'expérience → moments « wow »
(rares et choisis). Ne jamais animer pour démontrer une compétence technique :
**si tout bouge, rien n'est spécial.** WebGL/Three.js uniquement si valeur réelle.

## Contraintes non négociables

- **Son** : jamais d'autoplay. Désactivé par défaut, contrôlé par l'utilisateur.
- **Performance** : images optimisées et formats modernes, lazy loading, pas de
  layout shift, mobile prioritaire. Le luxe ne justifie pas un site lent.
- **Mobile** : expérience de premier ordre, pensée pour le tactile — jamais un
  desktop compressé.
- **Accessibilité** : navigation clavier, focus visibles, contrastes, HTML
  sémantique, `prefers-reduced-motion`.
- **SEO** : métadonnées dynamiques, données structurées, URLs propres.
- **Sécurité** : jamais de secret en dur ni de `.env` commité ; ne jamais faire
  confiance à une saisie client ; échapper toute donnée utilisateur avant
  insertion HTML.
- **Contenu** : ne jamais inventer produits, prix, avis, statistiques ni
  histoire de la maison (fondateur, dates, atelier). Ces éléments viennent du
  client, ou ne sont pas écrits.

## Configuration

Les valeurs d'environnement passent par `.env` (modèle : `.env.example`).
⚠️ Tout ce qui est préfixé `NEXT_PUBLIC_` est **public** dans le bundle : aucun
secret. `STRAPI_API_TOKEN` n'en porte donc pas le préfixe.

## TypeScript

Pas de `any`, pas d'assertions inutiles, interfaces explicites, types de domaine
réutilisables, réponses API typées.

## Avant de déclarer une tâche terminée

Vérifier : erreurs, warnings console, TypeScript, responsive, états de
chargement / erreur / vide, mobile, accessibilité. Puis se relire successivement
comme **ingénieur frontend senior**, **designer UX** et **ingénieur performance**,
et corriger les faiblesses importantes.

## Git

Commits logiques et séparés. Vérifier l'état du dépôt avant un gros changement ;
ne pas écraser du travail non lié.
