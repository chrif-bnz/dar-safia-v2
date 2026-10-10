/**
 * ══════════════════════════════════════════════════════════════
 *   REÇU DE COMMANDE — PASSAGE FORMULAIRE → PAGE DE REMERCIEMENT
 * ══════════════════════════════════════════════════════════════
 *
 * Les coordonnées du client ne transitent jamais par l'URL. Le formulaire
 * dépose ici un résumé minimal (sessionStorage : propre à l'onglet, effacé à
 * sa fermeture) et la page /merci le relit. Sans résumé — rechargement dans
 * un autre onglet, accès direct — la page reste correcte, en version générique.
 */

const KEY = 'darsafia.order';

export interface OrderReceipt {
  firstName: string;
  productName: string;
  brandName: string;
  imageUrl: string;
  imageSrcset: string | null;
  volumeMl: number;
  quantity: number;
  total: number;
  currency: 'DZD';
  wilaya: string;
  commune: string;
  deliveryMethod: 'main' | 'societe';
  reference: string | null;
}

export function saveOrderReceipt(receipt: OrderReceipt): void {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(receipt));
  } catch {
    // Stockage indisponible (navigation privée stricte) : la page sera générique.
  }
}

export function readOrderReceiptRaw(): string | null {
  try {
    return sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
}

/** Relit un résumé et rejette tout ce qui n'a pas la forme attendue. */
export function parseOrderReceipt(raw: string | null): OrderReceipt | null {
  if (!raw) return null;
  try {
    const v: unknown = JSON.parse(raw);
    if (!v || typeof v !== 'object') return null;
    const r = v as Record<string, unknown>;
    if (
      typeof r.productName !== 'string' ||
      typeof r.brandName !== 'string' ||
      typeof r.total !== 'number' ||
      typeof r.quantity !== 'number'
    ) {
      return null;
    }
    return {
      firstName: typeof r.firstName === 'string' ? r.firstName : '',
      productName: r.productName,
      brandName: r.brandName,
      imageUrl: typeof r.imageUrl === 'string' ? r.imageUrl : '',
      imageSrcset: typeof r.imageSrcset === 'string' ? r.imageSrcset : null,
      volumeMl: typeof r.volumeMl === 'number' ? r.volumeMl : 0,
      quantity: r.quantity,
      total: r.total,
      currency: 'DZD',
      wilaya: typeof r.wilaya === 'string' ? r.wilaya : '',
      commune: typeof r.commune === 'string' ? r.commune : '',
      deliveryMethod: r.deliveryMethod === 'societe' ? 'societe' : 'main',
      reference: typeof r.reference === 'string' ? r.reference : null,
    };
  } catch {
    return null;
  }
}
