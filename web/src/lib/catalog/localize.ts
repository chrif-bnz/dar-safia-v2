/**
 * ══════════════════════════════════════════════════════════════
 *   TEXTES DU CATALOGUE PAR LANGUE
 * ══════════════════════════════════════════════════════════════
 *
 * Le français est la langue source : c'est lui que porte le `Product` de base.
 * Pour une autre langue, on SUPERPOSE les champs traduits (description, récit,
 * badge, format, nom des notes). Un champ non traduit garde sa valeur
 * française : une fiche n'est jamais vide parce qu'une traduction manque.
 *
 * Même fonction pour les deux sources (données statiques, Strapi) : elles se
 * comportent donc à l'identique.
 */

import type { Locale } from '@/lib/i18n/config';

import type { Product } from './types';

export interface ProductTranslation {
  description?: string;
  story?: string;
  badge?: string;
  concentration?: string;
}

export interface CatalogTranslations {
  /** Par slug de parfum. */
  products: Record<string, ProductTranslation>;
  /** Nom d'une note par slug de note. */
  notes: Record<string, string>;
}

/** Langue du contenu d'origine. */
export const SOURCE_LOCALE: Locale = 'fr';

const filled = (value: string | null | undefined): value is string =>
  typeof value === 'string' && value.trim().length > 0;

export function localizeProduct(product: Product, t: CatalogTranslations | undefined): Product {
  if (!t) return product;
  const own = t.products[product.slug];
  const noteNames = t.notes;
  const hasNotes = product.notes.some((n) => filled(noteNames[n.note.slug]));
  if (!own && !hasNotes) return product;

  const description = filled(own?.description) ? own.description : product.description;
  return {
    ...product,
    description,
    story: filled(own?.story) ? own.story : product.story,
    badge: filled(own?.badge) ? own.badge : product.badge,
    concentration: filled(own?.concentration) ? own.concentration : product.concentration,
    // La méta-description reprenait la description française : elle suit la langue.
    seo: product.seo ? { ...product.seo, description: description.slice(0, 200) } : product.seo,
    notes: product.notes.map((n) =>
      filled(noteNames[n.note.slug]) ? { ...n, note: { ...n.note, name: noteNames[n.note.slug] } } : n
    ),
  };
}
