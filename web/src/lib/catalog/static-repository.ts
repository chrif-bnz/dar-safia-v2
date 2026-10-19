/**
 * ══════════════════════════════════════════════════════════════
 *   IMPLÉMENTATION STATIQUE DU CATALOGUE
 * ══════════════════════════════════════════════════════════════
 *
 * Sert les 45 parfums depuis les JSON produits par scripts/migrate-catalog.mjs.
 *
 * La StrapiCatalogRepository (strapi-repository.ts) implémente la MÊME
 * interface ; on bascule dans index.ts via une variable d'environnement.
 * Aucun composant ne change — c'est tout l'intérêt de la couture.
 *
 * L'interface est asynchrone alors que ces données sont locales : c'est
 * volontaire. Une interface synchrone obligerait à réécrire tous les
 * appelants le jour où la source devient distante.
 */

import brandsJson from '@/data/brands.json';
import notesJson from '@/data/notes.json';
import productsJson from '@/data/products.json';
import translationsJson from '@/data/translations.json';

import type { Locale } from '@/lib/i18n/config';

import { localizeProduct, SOURCE_LOCALE, type CatalogTranslations } from './localize';
import { queryProducts, relatedProducts } from './query';
import type {
  Brand,
  CatalogRepository,
  Collection,
  FragranceNote,
  Paginated,
  Product,
  ProductNote,
  ProductQuery,
} from './types';
import type { WireBrand, WireNote, WireProduct } from './wire';

const wireProducts = productsJson as WireProduct[];
const wireBrands = brandsJson as WireBrand[];
const wireNotes = notesJson as WireNote[];

// ── Index de résolution ────────────────────────────────────────

const brandBySlug = new Map<string, Brand>(
  wireBrands.map((b) => [b.slug, { ...b } satisfies Brand])
);

const noteBySlug = new Map<string, FragranceNote>(
  wireNotes.map((n) => [n.slug, { ...n } satisfies FragranceNote])
);

/**
 * Hydrate un produit stocké en produit de domaine : les références de marque
 * et de notes deviennent les objets correspondants.
 *
 * Une référence orpheline est ignorée plutôt que de faire échouer la page :
 * une fois les données dans un CMS, une note supprimée ne doit pas mettre
 * toute une fiche produit hors service.
 */
function hydrate(wire: WireProduct): Product {
  const brand = brandBySlug.get(wire.brandSlug);
  if (!brand) {
    throw new Error(
      `Marque introuvable « ${wire.brandSlug} » pour le parfum « ${wire.slug} ». ` +
        `Relancer: node scripts/migrate-catalog.mjs`
    );
  }

  const notes: ProductNote[] = wire.notes.flatMap((ref) => {
    const note = noteBySlug.get(ref.noteSlug);
    if (!note) return [];
    return [{ note, layer: ref.layer, position: ref.position }];
  });

  return {
    ...wire,
    brand,
    notes,
    variants: wire.variants.map((v) => ({
      ...v,
      // Le domaine exige un nombre ; les formats sans contenance lisible
      // (coffrets) sont ramenés à 0 et filtrables comme tels.
      volumeMl: v.volumeMl ?? 0,
    })),
    longevityHours: wire.longevityHours ?? undefined,
  };
}

const allProducts: Product[] = wireProducts.map(hydrate);

const translations = translationsJson as Partial<Record<Locale, CatalogTranslations>>;

/** Catalogue dans une langue : français = les données d'origine, sinon la superposition. */
const byLocale = new Map<Locale, { list: Product[]; bySlug: Map<string, Product> }>();
function forLocale(locale: Locale = SOURCE_LOCALE) {
  let entry = byLocale.get(locale);
  if (!entry) {
    const list =
      locale === SOURCE_LOCALE
        ? allProducts
        : allProducts.map((p) => localizeProduct(p, translations[locale]));
    entry = { list, bySlug: new Map(list.map((p) => [p.slug, p])) };
    byLocale.set(locale, entry);
  }
  return entry;
}

// Ré-export : nombre d'appelants importent lowestPrice depuis le repository.
export { lowestPrice } from './query';

// ── Repository ─────────────────────────────────────────────────

export const staticCatalogRepository: CatalogRepository = {
  async listProducts(query: ProductQuery = {}): Promise<Paginated<Product>> {
    // Aucune collection dans les données statiques : un filtre par collection
    // ne peut rien retourner.
    if (query.collectionSlug) {
      return { items: [], total: 0, offset: query.offset ?? 0, limit: query.limit ?? 0 };
    }
    return queryProducts(forLocale(query.locale).list, query);
  },

  async getProductBySlug(slug: string, locale?: Locale): Promise<Product | null> {
    return forLocale(locale).bySlug.get(slug) ?? null;
  },

  async getRelatedProducts(slug: string, limit = 3, locale?: Locale): Promise<Product[]> {
    return relatedProducts(forLocale(locale).list, slug, limit);
  },

  async listBrands(): Promise<Brand[]> {
    return [...brandBySlug.values()];
  },

  async getBrandBySlug(slug: string): Promise<Brand | null> {
    return brandBySlug.get(slug) ?? null;
  },

  // Les collections n'existent pas dans les données statiques : elles ne
  // vivent que dans Strapi. On renvoie une liste vide plutôt qu'un jeu de
  // données inventé.
  async listCollections(): Promise<Collection[]> {
    return [];
  },

  async getCollectionBySlug(): Promise<Collection | null> {
    return null;
  },
};
