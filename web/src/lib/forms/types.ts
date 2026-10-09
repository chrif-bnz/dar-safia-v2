/**
 * Formes échangées entre le navigateur, les routes /api du site et Strapi.
 * Elles décrivent UNE intention du visiteur — jamais un montant : les prix
 * sont relus par Strapi dans le catalogue.
 */
import type { Locale } from '@/lib/i18n/config';

export interface OrderLineRequest {
  productSlug: string;
  variantId: string;
  quantity: number;
}

export interface OrderCustomer {
  firstName: string;
  lastName: string;
  phone: string;
  /** Libellés (nom de la wilaya, de la commune), pas des codes. */
  wilaya: string;
  commune: string;
  deliveryMethod: 'main' | 'societe';
  deliveryCompany?: string;
  deliveryAddress?: string;
}

export interface OrderRequest {
  source: 'product-form' | 'cart';
  locale: Locale;
  /** Absent pour le panier : les coordonnées sont prises sur WhatsApp. */
  customer?: OrderCustomer;
  items: OrderLineRequest[];
}

export interface ContactRequest {
  kind: 'personal' | 'collaboration';
  locale: Locale;
  name?: string;
  city?: string;
  house?: string;
  role?: string;
  subject?: string;
  message: string;
}
