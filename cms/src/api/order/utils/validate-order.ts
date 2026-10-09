/**
 * Validation d'une demande de commande. Pure (aucune dépendance Strapi) :
 * testable seule. Le corps vient du site, donc d'un navigateur : on ne lui
 * fait pas confiance — chaque champ est relu, borné et nettoyé. Les PRIX ne
 * font pas partie de l'entrée : ils sont relus dans le catalogue.
 */

export const LOCALES = ['fr', 'ar', 'en'] as const;
export type OrderLocale = (typeof LOCALES)[number];

export interface OrderLineInput {
  productSlug: string;
  variantId: string;
  quantity: number;
}

export interface OrderInput {
  source: 'product-form' | 'cart';
  locale: OrderLocale;
  customer?: {
    firstName: string;
    lastName: string;
    phone: string;
    wilaya: string;
    commune: string;
    deliveryMethod: 'main' | 'societe';
    deliveryCompany?: string;
    deliveryAddress?: string;
  };
  items: OrderLineInput[];
}

export type Result<T> = { ok: true; value: T } | { ok: false; error: string };

const MAX_LINES = 30;
const PHONE = /^0[567][0-9]{8}$/;

/** Retire les caractères de contrôle, replie les espaces, borne la longueur. */
export function clean(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\u0000-\u001f\u007f]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}

function record(value: unknown): Record<string, unknown> | null {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

export function validateOrder(body: unknown): Result<OrderInput> {
  const raw = record(body);
  if (!raw) return { ok: false, error: 'Corps invalide.' };

  const source = raw.source;
  if (source !== 'product-form' && source !== 'cart') {
    return { ok: false, error: 'Source inconnue.' };
  }

  const locale: OrderLocale = (LOCALES as readonly unknown[]).includes(raw.locale)
    ? (raw.locale as OrderLocale)
    : 'fr';

  if (!Array.isArray(raw.items) || raw.items.length === 0 || raw.items.length > MAX_LINES) {
    return { ok: false, error: 'Panier vide ou trop long.' };
  }
  const items: OrderLineInput[] = [];
  for (const entry of raw.items) {
    const line = record(entry);
    const productSlug = clean(line?.productSlug, 160);
    const variantId = clean(line?.variantId, 64);
    const quantity = line?.quantity;
    if (
      !productSlug ||
      !variantId ||
      typeof quantity !== 'number' ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 99
    ) {
      return { ok: false, error: 'Ligne de commande invalide.' };
    }
    items.push({ productSlug, variantId, quantity });
  }

  let customer: OrderInput['customer'];
  if (source === 'product-form') {
    const c = record(raw.customer);
    if (!c) return { ok: false, error: 'Coordonnées manquantes.' };
    const phone = clean(c.phone, 20).replace(/\s+/g, '');
    const firstName = clean(c.firstName, 80);
    const lastName = clean(c.lastName, 80);
    const wilaya = clean(c.wilaya, 80);
    const commune = clean(c.commune, 120);
    const deliveryMethod = c.deliveryMethod;
    if (!firstName || !lastName || !wilaya || !commune) {
      return { ok: false, error: 'Coordonnées incomplètes.' };
    }
    if (!PHONE.test(phone)) return { ok: false, error: 'Numéro de téléphone invalide.' };
    if (deliveryMethod !== 'main' && deliveryMethod !== 'societe') {
      return { ok: false, error: 'Mode de livraison invalide.' };
    }
    const deliveryAddress = clean(c.deliveryAddress, 400);
    if (deliveryMethod === 'societe' && !deliveryAddress) {
      return { ok: false, error: 'Adresse de livraison manquante.' };
    }
    customer = {
      firstName,
      lastName,
      phone,
      wilaya,
      commune,
      deliveryMethod,
      deliveryCompany: clean(c.deliveryCompany, 120) || undefined,
      deliveryAddress: deliveryAddress || undefined,
    };
  }

  return { ok: true, value: { source, locale, customer, items } };
}

/** Référence lisible, sans caractères ambigus (0/O, 1/I). */
export function newReference(now: Date = new Date(), random: () => number = Math.random): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let suffix = '';
  for (let i = 0; i < 5; i++) suffix += alphabet[Math.floor(random() * alphabet.length)];
  const y = String(now.getUTCFullYear()).slice(2);
  const m = String(now.getUTCMonth() + 1).padStart(2, '0');
  const d = String(now.getUTCDate()).padStart(2, '0');
  return `DS-${y}${m}${d}-${suffix}`;
}
