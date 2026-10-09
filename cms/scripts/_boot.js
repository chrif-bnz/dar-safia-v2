/**
 * Démarre Strapi en mode script (sans serveur HTTP) : même base, mêmes
 * services que l'application. Utilisé par seed-catalog.js et
 * create-api-tokens.js.
 */
const path = require('node:path');
const { createStrapi, compileStrapi } = require('@strapi/strapi');

async function boot() {
  process.chdir(path.resolve(__dirname, '..'));
  const context = await compileStrapi();
  const app = await createStrapi(context).load();
  app.log.level = 'error';
  return app;
}

module.exports = { boot };
