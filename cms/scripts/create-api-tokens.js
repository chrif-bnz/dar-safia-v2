/**
 * Crée les deux jetons d'API du site, avec les droits MINIMAUX, et les affiche
 * UNE fois (Strapi ne les montre plus ensuite : seul un hash est stocké).
 *
 *   STRAPI_API_TOKEN   lecture seule du catalogue (marques, notes, parfums,
 *                      collections) — utilisé au rendu serveur du site.
 *   STRAPI_FORMS_TOKEN création seule de commandes et de messages de contact —
 *                      utilisé uniquement par les routes /api du site.
 *
 * À copier dans le .env du SITE (jamais commité, jamais préfixé NEXT_PUBLIC_).
 * Relancer le script ne recrée pas un jeton existant : il faut d'abord le
 * supprimer dans l'admin (Réglages → Jetons d'API) pour en obtenir un nouveau.
 */
const { boot } = require('./_boot');

const TOKENS = [
  {
    name: 'site-catalog-read',
    env: 'STRAPI_API_TOKEN',
    description: 'Site Next.js — lecture du catalogue',
    actions: ['brand', 'fragrance-note', 'product', 'collection'].flatMap((n) => [
      `api::${n}.${n}.find`,
      `api::${n}.${n}.findOne`,
    ]),
  },
  {
    name: 'site-forms-create',
    env: 'STRAPI_FORMS_TOKEN',
    description: 'Site Next.js — enregistrement des commandes et messages',
    actions: ['api::order.order.create', 'api::contact-message.contact-message.create'],
  },
];

async function main() {
  const app = await boot();
  const service = app.service('admin::api-token');
  for (const t of TOKENS) {
    if (await service.exists({ name: t.name })) {
      console.log(`${t.env}: déjà créé (${t.name}) — supprimez-le dans l'admin pour en émettre un autre.`);
      continue;
    }
    const created = await service.create({
      name: t.name,
      description: t.description,
      type: 'custom',
      lifespan: null,
      permissions: t.actions,
    });
    console.log(`${t.env}=${created.accessKey}`);
  }
  await app.destroy();
}

main().then(
  () => process.exit(0),
  (error) => {
    console.error(error);
    process.exit(1);
  }
);
