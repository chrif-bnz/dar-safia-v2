/**
 * Relais serveur vers Strapi pour les écritures (commandes, messages).
 *
 * Le jeton STRAPI_FORMS_TOKEN n'a que le droit de CRÉER ces deux types ; il
 * reste côté serveur (jamais NEXT_PUBLIC_). Le navigateur ne parle donc jamais
 * à Strapi : il passe par /api/orders et /api/contact, qui filtrent d'abord.
 */

const STRAPI_URL = process.env.STRAPI_URL ?? '';
const TOKEN = process.env.STRAPI_FORMS_TOKEN ?? '';

export const formsConfigured = STRAPI_URL !== '' && TOKEN !== '';

export type RelayResult =
  | { ok: true; data: unknown }
  | { ok: false; status: number };

export async function relayToStrapi(
  collection: 'orders' | 'contact-messages',
  data: unknown
): Promise<RelayResult> {
  if (!formsConfigured) return { ok: false, status: 503 };
  try {
    const res = await fetch(`${STRAPI_URL.replace(/\/$/, '')}/api/${collection}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
      body: JSON.stringify({ data }),
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return { ok: false, status: res.status };
    return { ok: true, data: (await res.json()) as unknown };
  } catch (error) {
    console.error(`[forms] échec de l'envoi vers Strapi (${collection})`, error);
    return { ok: false, status: 502 };
  }
}
