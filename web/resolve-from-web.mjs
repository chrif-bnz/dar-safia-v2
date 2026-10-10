/**
 * Netlify construit avec base = "web" : seules les dépendances de `web/` sont
 * installées. Les scripts de `../scripts/` résolvent leurs paquets depuis la
 * racine du dépôt et ne trouvent donc pas `sharp`. Ce hook de résolution
 * retente, en cas d'échec, depuis `web/node_modules`.
 *
 * Usage : node --import ./resolve-from-web.mjs ../scripts/optimize-images.mjs
 */
import { register } from 'node:module';

const WEB_PARENT = new URL('./package.json', import.meta.url).href;

const hooks = `
export async function resolve(specifier, context, nextResolve) {
  try {
    return await nextResolve(specifier, context);
  } catch (error) {
    if (error?.code !== 'ERR_MODULE_NOT_FOUND') throw error;
    return nextResolve(specifier, { ...context, parentURL: ${JSON.stringify(WEB_PARENT)} });
  }
}
`;

register(`data:text/javascript,${encodeURIComponent(hooks)}`);
