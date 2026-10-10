import { describe, expect, it } from 'vitest';

import { localizeProduct, type CatalogTranslations } from './localize';
import { staticCatalogRepository as repo } from './static-repository';
import type { Product } from './types';

const base: Product = {
  id: '1',
  slug: 'demo',
  name: 'Demo',
  brand: { id: 'b', slug: 'b', name: 'B' },
  description: 'Description française.',
  story: 'Récit français.',
  gender: 'femme',
  family: 'floral',
  secondaryFamilies: [],
  notes: [{ layer: 'top', position: 0, note: { id: 'n', slug: 'bergamote', name: 'Bergamote' } }],
  variants: [],
  images: [],
  badge: 'Culte',
  concentration: 'Eau de Parfum',
  seasons: [],
  occasions: [],
  featured: false,
  newArrival: false,
  bestseller: false,
  seo: { title: 'Demo', description: 'Description française.' },
};

describe('localizeProduct', () => {
  const t: CatalogTranslations = {
    products: { demo: { description: 'English description.', badge: 'Cult' } },
    notes: { bergamote: 'Bergamot' },
  };

  it('superpose les champs traduits et la méta-description', () => {
    const out = localizeProduct(base, t);
    expect(out.description).toBe('English description.');
    expect(out.badge).toBe('Cult');
    expect(out.seo?.description).toBe('English description.');
    expect(out.notes[0].note.name).toBe('Bergamot');
  });

  it('garde le français pour un champ non traduit', () => {
    const out = localizeProduct(base, t);
    expect(out.story).toBe('Récit français.');
    expect(out.concentration).toBe('Eau de Parfum');
  });

  it('ignore une traduction vide ou blanche', () => {
    const out = localizeProduct(base, { products: { demo: { description: '  ', badge: '' } }, notes: {} });
    expect(out.description).toBe('Description française.');
    expect(out.badge).toBe('Culte');
  });

  it('renvoie le produit tel quel sans traduction', () => {
    expect(localizeProduct(base, undefined)).toBe(base);
    expect(localizeProduct(base, { products: {}, notes: {} })).toBe(base);
  });

  it('ne touche ni au prix, ni aux variantes, ni au slug', () => {
    const out = localizeProduct(base, t);
    expect(out.slug).toBe(base.slug);
    expect(out.variants).toBe(base.variants);
    expect(out.name).toBe(base.name);
  });
});

describe('catalogue statique par langue', () => {
  it('sert le français par défaut', async () => {
    const fr = await repo.getProductBySlug('prada-paradoxe');
    expect(fr?.description).toMatch(/Une célébration/);
  });

  it('sert l’anglais et l’arabe sans changer prix ni formats', async () => {
    const fr = await repo.getProductBySlug('prada-paradoxe', 'fr');
    const en = await repo.getProductBySlug('prada-paradoxe', 'en');
    const ar = await repo.getProductBySlug('prada-paradoxe', 'ar');
    expect(en?.description).toMatch(/celebration/i);
    expect(ar?.description).toMatch(/[؀-ۿ]/);
    expect(en?.variants).toEqual(fr?.variants);
    expect(ar?.variants).toEqual(fr?.variants);
  });

  it('traduit les noms de notes dans la pyramide', async () => {
    const fr = await repo.getProductBySlug('prada-paradoxe', 'fr');
    const en = await repo.getProductBySlug('prada-paradoxe', 'en');
    expect(fr?.notes.map((n) => n.note.name)).not.toEqual(en?.notes.map((n) => n.note.name));
  });

  it('traduit TOUS les parfums et toutes les notes (aucun repli silencieux)', async () => {
    const fr = (await repo.listProducts({ locale: 'fr' })).items;
    for (const locale of ['en', 'ar'] as const) {
      const loc = (await repo.listProducts({ locale })).items;
      expect(loc).toHaveLength(fr.length);
      loc.forEach((p, i) => {
        expect(p.description, `${locale}:${p.slug}`).not.toBe(fr[i].description);
        expect(p.story, `${locale}:${p.slug}`).not.toBe(fr[i].story);
        p.notes.forEach((n) => {
          expect(n.note.name, `${locale}:${p.slug}:${n.note.slug}`).not.toBe('');
          if (locale === 'ar') expect(n.note.name).toMatch(/[؀-ۿ]/);
        });
      });
    }
  });

  it('la recherche suit la langue', async () => {
    const en = await repo.listProducts({ locale: 'en', search: 'jasmine' });
    expect(en.total).toBeGreaterThan(0);
    const fr = await repo.listProducts({ locale: 'fr', search: 'jasmine' });
    expect(fr.total).toBe(0);
  });
});
