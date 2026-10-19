/**
 * ══════════════════════════════════════════════════════════════
 *   IMPLÉMENTATION STRAPI DU CATALOGUE
 * ══════════════════════════════════════════════════════════════
 *
 * Même interface que l'implémentation statique. On bascule dans index.ts via
 * CATALOG_SOURCE=strapi.
 *
 * Stratégie : charger TOUT le catalogue en une requête (populate profond),
 * mapper vers le domaine, puis déléguer le filtrage/tri/recherche à la
 * logique partagée (query.ts). Le comportement est donc identique à celui de
 * l'implémentation statique — les mêmes tests valident les deux.
 *
 * 45 parfums : un seul appel HTTP, mis en cache par Next (revalidate). Pas de
 * pagination Strapi à gérer, pas de N+1.
 */

import qs from 'qs';

import type { Locale } from '@/lib/i18n/config';

import { localizeProduct, SOURCE_LOCALE, type CatalogTranslations } from './localize';
import { queryProducts, relatedProducts } from './query';
import { mapCollection, mapProduct } from './strapi-mapper';
import type {
  StrapiCollection,
  StrapiNote,
  StrapiProduct,
  StrapiResponse,
} from './strapi-types';
import type {
  Brand,
  CatalogRepository,
  Collection,
  Paginated,
  Product,
  ProductQuery,
} from './types';

const STRAPI_URL = process.env.STRAPI_URL ?? 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN ?? '';

/** Durée de cache Next, en secondes. Surchargée par STRAPI_REVALIDATE. */
const REVALIDATE = Number(process.env.STRAPI_REVALIDATE ?? 300);

/** Populate profond des parfums. */
const PRODUCT_POPULATE = {
  brand: { populate: ['logo'] },
  notes: { populate: { note: { populate: ['image'] } } },
  variants: { populate: ['price', 'compareAtPrice'] },
  images: true,
  video: true,
  seo: { populate: ['ogImage'] },
} as const;

const COLLECTION_POPULATE = {
  heroMedia: true,
  seo: { populate: ['ogImage'] },
} as const;

function buildQuery(params: Record<string, unknown>): string {
  return qs.stringify(params, { encodeValuesOnly: true });
}

async function strapiFetch<T>(path: string): Promise<T | null> {
  const url = `${STRAPI_URL.replace(/\/$/, '')}/api/${path}`;
  try {
    const res = await fetch(url, {
      headers: STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {},
      next: { revalidate: REVALIDATE, tags: ['catalog'] },
    });
    if (!res.ok) {
      console.error(`[Strapi] ${res.status} ${res.statusText} sur ${path}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (error) {
    console.error(`[Strapi] échec de la requête ${path}`, error);
    return null;
  }
}

/**
 * Toutes les pages d'une collection. Strapi plafonne `pageSize` à 100 : sans
 * boucle, un catalogue plus gros (les 254 notes, demain 100+ parfums) serait
 * tronqué en silence.
 */
async function fetchAllPages<T>(path: string, params: Record<string, unknown>): Promise<T[]> {
  const out: T[] = [];
  let page = 1;
  let pageCount = 1;
  do {
    const query = buildQuery({ ...params, pagination: { page, pageSize: 100 } });
    const response = await strapiFetch<StrapiResponse<T[]>>(`${path}?${query}`);
    if (!response?.data) break;
    out.push(...response.data);
    pageCount = response.meta?.pagination?.pageCount ?? 1;
    page += 1;
  } while (page <= pageCount);
  return out;
}

// ── Cache mémoire par rendu ────────────────────────────────────
// Next met déjà `fetch` en cache ; ce cache-ci évite en plus de re-mapper les
// 45 produits à chaque méthode appelée dans un même rendu.

const productsPromise = new Map<Locale, Promise<Product[]>>();

/** Contenu français : l'entrée par défaut de Strapi (la langue source du site). */
function loadSourceProducts(): Promise<Product[]> {
  let promise = productsPromise.get(SOURCE_LOCALE);
  if (!promise) {
    promise = fetchAllPages<StrapiProduct>('products', { populate: PRODUCT_POPULATE }).then((entries) =>
      entries
        .map((entry) => mapProduct(entry, STRAPI_URL))
        .filter((p): p is Product => p !== null)
    );
    productsPromise.set(SOURCE_LOCALE, promise);
  }
  return promise;
}

/**
 * Textes d'une autre langue, lus sur les entrées localisées de Strapi
 * (`?locale=en`). Seuls les champs traduisibles sont demandés. Si la langue
 * n'existe pas côté Strapi, ou si l'appel échoue, on renvoie une table vide :
 * le site retombe sur le français, il ne casse pas.
 */
async function loadTranslations(locale: Locale): Promise<CatalogTranslations> {
  const [products, notes] = await Promise.all([
    fetchAllPages<StrapiProduct>('products', {
      locale,
      fields: ['slug', 'description', 'story', 'badge', 'concentration'],
    }),
    fetchAllPages<StrapiNote>('fragrance-notes', { locale, fields: ['slug', 'name'] }),
  ]);

  const out: CatalogTranslations = { products: {}, notes: {} };
  for (const entry of products) {
    if (typeof entry.slug !== 'string') continue;
    out.products[entry.slug] = {
      description: entry.description ?? undefined,
      story: entry.story ?? undefined,
      badge: entry.badge ?? undefined,
      concentration: entry.concentration ?? undefined,
    };
  }
  for (const entry of notes) {
    if (typeof entry.slug === 'string' && typeof entry.name === 'string') {
      out.notes[entry.slug] = entry.name;
    }
  }
  return out;
}

function loadProducts(locale: Locale = SOURCE_LOCALE): Promise<Product[]> {
  if (locale === SOURCE_LOCALE) return loadSourceProducts();
  let promise = productsPromise.get(locale);
  if (!promise) {
    promise = Promise.all([loadSourceProducts(), loadTranslations(locale)]).then(([base, t]) =>
      base.map((p) => localizeProduct(p, t))
    );
    productsPromise.set(locale, promise);
  }
  return promise;
}

/** À appeler après une revalidation pour forcer un rechargement. */
export function resetStrapiCache(): void {
  productsPromise.clear();
}

/** Slugs des parfums membres d'une collection donnée. */
async function collectionProductSlugs(slug: string): Promise<Set<string>> {
  const query = buildQuery({
    filters: { slug: { $eq: slug } },
    populate: { products: { fields: ['slug'] } },
  });
  const response = await strapiFetch<StrapiResponse<StrapiCollection[]>>(
    `collections?${query}`
  );
  const products = response?.data?.[0]?.products ?? [];
  return new Set(
    products.map((p) => p.slug).filter((s): s is string => typeof s === 'string')
  );
}

// ── Repository ─────────────────────────────────────────────────

export const strapiCatalogRepository: CatalogRepository = {
  async listProducts(query: ProductQuery = {}): Promise<Paginated<Product>> {
    const all = await loadProducts(query.locale);

    if (query.collectionSlug) {
      const slugs = await collectionProductSlugs(query.collectionSlug);
      const { collectionSlug: _drop, ...rest } = query;
      void _drop;
      return queryProducts(all.filter((p) => slugs.has(p.slug)), rest);
    }

    return queryProducts(all, query);
  },

  async getProductBySlug(slug: string, locale?: Locale): Promise<Product | null> {
    const all = await loadProducts(locale);
    return all.find((p) => p.slug === slug) ?? null;
  },

  async getRelatedProducts(slug: string, limit = 3, locale?: Locale): Promise<Product[]> {
    const all = await loadProducts(locale);
    return relatedProducts(all, slug, limit);
  },

  async listBrands(): Promise<Brand[]> {
    const all = await loadProducts();
    const bySlug = new Map<string, Brand>();
    for (const product of all) {
      if (!bySlug.has(product.brand.slug)) {
        bySlug.set(product.brand.slug, product.brand);
      }
    }
    return [...bySlug.values()].sort((a, b) => a.name.localeCompare(b.name, 'fr'));
  },

  async getBrandBySlug(slug: string): Promise<Brand | null> {
    const brands = await this.listBrands();
    return brands.find((b) => b.slug === slug) ?? null;
  },

  async listCollections(): Promise<Collection[]> {
    const query = buildQuery({ populate: COLLECTION_POPULATE });
    const response = await strapiFetch<StrapiResponse<StrapiCollection[]>>(
      `collections?${query}`
    );
    if (!response?.data) return [];
    return response.data
      .map((entry) => mapCollection(entry, STRAPI_URL))
      .filter((c): c is Collection => c !== null);
  },

  async getCollectionBySlug(slug: string): Promise<Collection | null> {
    const query = buildQuery({
      filters: { slug: { $eq: slug } },
      populate: COLLECTION_POPULATE,
    });
    const response = await strapiFetch<StrapiResponse<StrapiCollection[]>>(
      `collections?${query}`
    );
    const entry = response?.data?.[0];
    return entry ? mapCollection(entry, STRAPI_URL) : null;
  },
};
