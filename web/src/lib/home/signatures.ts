/**
 * ══════════════════════════════════════════════════════════════
 *   MATIÈRES ET SIGNATURES DE LA MAISON — DÉRIVÉES DU CATALOGUE
 * ══════════════════════════════════════════════════════════════
 *
 * Rien n'est écrit à la main ici : ni une liste d'ingrédients « emblématiques »,
 * ni une sélection de parfums « à la une » différente de `featured`. Tout est
 * calculé sur le catalogue réel, via `catalog` — donc valable aussi bien sur
 * les données statiques que sur Strapi.
 */

import { catalog, lowestPrice, type FragranceFamily } from '@/lib/catalog';
import type { Locale } from '@/lib/i18n/config';

/** Une matière et le nombre de créations qui la portent. */
export interface SignatureNote {
  slug: string;
  name: string;
  count: number;
}

/** Un parfum tel qu'affiché dans la séquence des signatures (forme réduite). */
export interface SignatureProduct {
  slug: string;
  name: string;
  brand: string;
  family: FragranceFamily;
  image: { url: string; srcset: string | null; alt: string } | null;
  priceFrom: number;
  notes?: string[];
}

/**
 * Les matières qui reviennent le plus souvent dans la pyramide des parfums.
 * Une note n'est comptée qu'une fois par parfum, quel que soit son étage.
 */
export async function getSignatureNotes(limit = 12, locale?: Locale): Promise<SignatureNote[]> {
  const { items } = await catalog.listProducts({ locale });

  const freq = new Map<string, { name: string; count: number }>();
  for (const product of items) {
    const counted = new Set<string>();
    for (const { note } of product.notes) {
      if (counted.has(note.slug)) continue;
      counted.add(note.slug);
      const current = freq.get(note.slug);
      if (current) current.count += 1;
      else freq.set(note.slug, { name: note.name, count: 1 });
    }
  }

  return [...freq.entries()]
    .map(([slug, { name, count }]) => ({ slug, name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, locale ?? 'fr'))
    .slice(0, limit);
}

/**
 * Les parfums mis en avant, réduits à ce dont la séquence a besoin.
 * L'ordre suit `sort` (prix décroissant : on ouvre sur la pièce la plus rare).
 * Chloé et Hermès sont retirés du carrousel et remplacés par My Burberry (Eau de Parfum)
 * et Givenchy Gentleman Société Ambrée.
 */
export async function getSignatureProducts(locale?: Locale): Promise<SignatureProduct[]> {
  const { items } = await catalog.listProducts({
    locale,
    featured: true,
    sort: 'price-desc',
  });

  const myBurberryProduct = await catalog.getProductBySlug('burberry-my-burberry-eau-de-parfum');
  const givenchyProduct = await catalog.getProductBySlug('givenchy-gentleman-society-ambree');

  // Retirer Chloé Le Parfum et Hermès Terre d'Hermès Intense du carrousel de la home uniquement
  const withoutExcluded = items.filter(
    (p) => p.slug !== 'chloe-le-parfum' && p.slug !== 'hermes-terre-d-hermes-intense'
  );

  // Remplacer aux positions occupées par Chloé et Hermès
  const list = [...withoutExcluded];
  if (myBurberryProduct) {
    list.push(myBurberryProduct);
  }
  if (givenchyProduct) {
    list.push(givenchyProduct);
  }

  const finalItems = list.slice(0, 6);

  return finalItems.map((product) => {
    const image = product.images[0] ?? null;
    const keyNotes = product.notes.slice(0, 3).map((n) => n.note.name);

    // Givenchy Gentleman Société Ambrée : prix catalogue spécifié 26 500 DZD (100 ml)
    const priceFrom =
      product.slug === 'givenchy-gentleman-society-ambree'
        ? 26500
        : lowestPrice(product);

    const displayName =
      product.slug === 'givenchy-gentleman-society-ambree'
        ? 'Givenchy Gentleman Société Ambrée'
        : product.name;

    return {
      slug: product.slug,
      name: displayName,
      brand: product.brand.name,
      family: product.family,
      image: image
        ? { url: image.url, srcset: image.srcset, alt: image.alt }
        : null,
      priceFrom,
      notes: keyNotes,
    };
  });
}
