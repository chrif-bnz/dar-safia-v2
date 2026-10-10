import { describe, expect, it } from 'vitest';

import ar from './dictionaries/ar.json';
import en from './dictionaries/en.json';
import fr from './dictionaries/fr.json';

/**
 * Règle du projet : toute clé ajoutée l'est dans les trois langues. Ce test
 * l'applique — une clé manquante ou en trop, un `{placeholder}` qui diffère,
 * une valeur vide, ou un arabe resté en lettres latines font échouer le build.
 */
function flatten(value: unknown, prefix = ''): Record<string, string> {
  if (typeof value === 'string') return { [prefix]: value };
  if (Array.isArray(value)) {
    return Object.assign({}, ...value.map((v, i) => flatten(v, `${prefix}[${i}]`)));
  }
  if (value && typeof value === 'object') {
    return Object.assign(
      {},
      ...Object.entries(value).map(([k, v]) => flatten(v, prefix ? `${prefix}.${k}` : k))
    );
  }
  return {};
}

const base = flatten(fr);
const placeholders = (s: string) => [...s.matchAll(/\{\w+\}/g)].map((m) => m[0]).sort();

describe.each([
  ['en', en],
  ['ar', ar],
] as const)('dictionnaire %s', (code, dict) => {
  const flat = flatten(dict);

  it('a exactement les mêmes clés que le français', () => {
    expect(Object.keys(flat).sort()).toEqual(Object.keys(base).sort());
  });

  it('n’a aucune valeur vide', () => {
    const empty = Object.entries(flat).filter(([, v]) => v.trim() === '');
    expect(empty).toEqual([]);
  });

  it('garde les mêmes {variables} que le français', () => {
    const bad = Object.keys(base).filter(
      (k) => k in flat && placeholders(flat[k]).join() !== placeholders(base[k]).join()
    );
    expect(bad).toEqual([]);
  });

  if (code === 'ar') {
    it('est écrit en arabe (hors variables, marques, unités et URL)', () => {
      const allowed = new Set([
        'common.brandName',
        'cart.orderLine',
        'phoneBanner.missing',
        'contact.signatureNameOnly',
        'contact.signatureCityOnly',
      ]);
      const latin = Object.entries(flat).filter(([k, v]) => {
        if (allowed.has(k)) return false;
        const text = v.replace(/\{\w+\}/g, '').replace(/https?:\S+/g, '');
        return /[A-Za-z]{3,}/.test(text);
      });
      expect(latin.map(([k]) => k)).toEqual([]);
    });
  }
});
