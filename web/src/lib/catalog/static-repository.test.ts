import { describe, expect, it } from 'vitest';

import productsJson from '@/data/products.json';

import { catalog, lowestPrice } from './index';

/** Taille réelle du catalogue migré : le catalogue grossit (imports), les tests ne figent pas un nombre. */
const COUNT = productsJson.length;

/**
 * Teste l'implémentation statique contre les données réellement migrées
 * (web/src/data/*.json). Fait aussi office de garde-fou sur la sortie du
 * script de migration : un slug cassé ou une référence orpheline échouerait
 * ici plutôt qu'en production.
 */

describe('listProducts', () => {
  it('renvoie tous les parfums du catalogue', async () => {
    const { items, total } = await catalog.listProducts();
    expect(total).toBe(COUNT);
    expect(items).toHaveLength(COUNT);
  });

  it('hydrate chaque produit : marque résolue, au moins une note, un format', async () => {
    const { items } = await catalog.listProducts();
    for (const product of items) {
      expect(product.brand.name).toBeTruthy();
      expect(product.notes.length).toBeGreaterThan(0);
      expect(product.notes[0].note.name).toBeTruthy();
      expect(product.variants.length).toBeGreaterThan(0);
    }
  });

  it('tous les slugs sont uniques et compatibles URL', async () => {
    const { items } = await catalog.listProducts();
    const slugs = items.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it('filtre par genre', async () => {
    const { items } = await catalog.listProducts({ gender: 'femme' });
    expect(items.length).toBeGreaterThan(0);
    expect(items.every((p) => p.gender === 'femme')).toBe(true);
  });

  it('le filtre par famille inclut les familles secondaires', async () => {
    const { items } = await catalog.listProducts({ family: 'woody' });
    expect(
      items.every(
        (p) => p.family === 'woody' || p.secondaryFamilies.includes('woody')
      )
    ).toBe(true);
  });

  it('la recherche exige tous les mots', async () => {
    const { items } = await catalog.listProducts({ search: 'dior sauvage' });
    expect(items.length).toBeGreaterThan(0);
    // La recherche porte sur nom, marque, description et notes : chaque mot doit
    // se trouver quelque part dans ces champs (le catalogue grossit, un mot
    // peut apparaître dans une description sans être dans le nom).
    const haystack = (p: (typeof items)[number]) =>
      `${p.name} ${p.brand.name} ${p.description} ${p.notes.map((n) => n.note.name).join(' ')}`
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
    expect(items.every((p) => ['dior', 'sauvage'].every((w) => haystack(p).includes(w)))).toBe(true);
    // et la requête restreint réellement : moins de résultats qu'un seul mot
    const dior = await catalog.listProducts({ search: 'dior' });
    expect(items.length).toBeLessThanOrEqual(dior.total);
  });

  it('tri par prix croissant', async () => {
    const { items } = await catalog.listProducts({ sort: 'price-asc' });
    const prices = items.map(lowestPrice);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  it('pagine via offset / limit sans changer le total', async () => {
    const page = await catalog.listProducts({ offset: 10, limit: 5 });
    expect(page.items).toHaveLength(5);
    expect(page.total).toBe(COUNT);
  });

  it('aucun produit ne porte de note agrégée (aucun avis réel)', async () => {
    const { items } = await catalog.listProducts();
    expect(items.every((p) => p.rating === undefined)).toBe(true);
  });
});

describe('getProductBySlug', () => {
  it('trouve un parfum connu', async () => {
    const product = await catalog.getProductBySlug('prada-paradoxe');
    expect(product?.name).toBe('Prada Paradoxe');
  });

  it('renvoie null pour un slug inconnu', async () => {
    expect(await catalog.getProductBySlug('nexiste-pas')).toBeNull();
  });
});

describe('getRelatedProducts', () => {
  it('exclut le parfum lui-même et respecte la limite', async () => {
    const related = await catalog.getRelatedProducts('prada-paradoxe', 3);
    expect(related).toHaveLength(3);
    expect(related.every((p) => p.slug !== 'prada-paradoxe')).toBe(true);
  });

  it('privilégie la même famille ou la même marque', async () => {
    const base = await catalog.getProductBySlug('prada-paradoxe');
    const related = await catalog.getRelatedProducts('prada-paradoxe', 3);
    expect(
      related.some(
        (p) =>
          p.family === base!.family || p.brand.slug === base!.brand.slug
      )
    ).toBe(true);
  });
});

describe('collections', () => {
  it('renvoie une liste vide tant que Strapi n’existe pas', async () => {
    expect(await catalog.listCollections()).toEqual([]);
    expect(await catalog.getCollectionBySlug('x')).toBeNull();
  });
});
