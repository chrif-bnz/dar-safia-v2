import { describe, expect, it } from 'vitest';
import { staticCatalogRepository as repo } from '@/lib/catalog/static-repository';

interface TestCase {
  query: string;
  expectedDescription: string;
  matcher: (product: { name: string; brand: { name: string } }) => boolean;
}

export const REAL_QUERY_TEST_CASES: TestCase[] = [
  {
    query: 'sovage',
    expectedDescription: 'Sauvage (Dior)',
    matcher: (p) => /sauvage/i.test(p.name) && /dior/i.test(p.brand.name),
  },
  {
    query: 'sau vage',
    expectedDescription: 'Sauvage (Dior)',
    matcher: (p) => /sauvage/i.test(p.name) && /dior/i.test(p.brand.name),
  },
  {
    query: 'sauvgae',
    expectedDescription: 'Sauvage (Dior)',
    matcher: (p) => /sauvage/i.test(p.name) && /dior/i.test(p.brand.name),
  },
  {
    query: 'diore',
    expectedDescription: 'Dior (au moins un parfum Dior)',
    matcher: (p) => /dior/i.test(p.brand.name),
  },
  {
    query: 'bleudechanel',
    expectedDescription: 'Bleu de Chanel',
    matcher: (p) => /bleu de chanel/i.test(p.name),
  },
  {
    query: 'bleu chanel',
    expectedDescription: 'Bleu de Chanel',
    matcher: (p) => /bleu de chanel/i.test(p.name),
  },
  {
    query: 'chanelle',
    expectedDescription: 'Chanel',
    matcher: (p) => /chanel/i.test(p.brand.name),
  },
  {
    query: 'linterdit',
    expectedDescription: "L'Interdit (Givenchy)",
    matcher: (p) => /l'?interdit/i.test(p.name),
  },
  {
    query: 'l interdit',
    expectedDescription: "L'Interdit (Givenchy)",
    matcher: (p) => /l'?interdit/i.test(p.name),
  },
  {
    query: 'givanchi',
    expectedDescription: 'Givenchy',
    matcher: (p) => /givenchy/i.test(p.brand.name),
  },
  {
    query: 'irezistibl',
    expectedDescription: 'Irrésistible (Givenchy)',
    matcher: (p) => /irresistible|irrésistible/i.test(p.name),
  },
  {
    query: 'ysl',
    expectedDescription: 'Yves Saint Laurent',
    matcher: (p) => /saint laurent/i.test(p.brand.name),
  },
  {
    query: 'yves saint laurent',
    expectedDescription: 'Yves Saint Laurent',
    matcher: (p) => /saint laurent/i.test(p.brand.name),
  },
  {
    query: 'gerlin',
    expectedDescription: 'Guerlain',
    matcher: (p) => /guerlain/i.test(p.brand.name),
  },
  {
    query: 'guerlin',
    expectedDescription: 'Guerlain',
    matcher: (p) => /guerlain/i.test(p.brand.name),
  },
  {
    query: 'versasse',
    expectedDescription: 'Versace',
    matcher: (p) => /versace/i.test(p.brand.name),
  },
  {
    query: '1 million',
    expectedDescription: 'One Million (Paco Rabanne)',
    matcher: (p) => /1 million|one million/i.test(p.name),
  },
  {
    query: '1million',
    expectedDescription: 'One Million (Paco Rabanne)',
    matcher: (p) => /1 million|one million/i.test(p.name),
  },
  {
    query: 'one milion',
    expectedDescription: 'One Million (Paco Rabanne)',
    matcher: (p) => /1 million|one million/i.test(p.name),
  },
  {
    query: 'paco rabane',
    expectedDescription: 'Paco Rabanne',
    matcher: (p) => /rabanne/i.test(p.brand.name),
  },
  {
    query: 'invictus',
    expectedDescription: 'Invictus (Paco Rabanne)',
    matcher: (p) => /invictus/i.test(p.name),
  },
  {
    query: 'scandal',
    expectedDescription: 'Scandal (Jean Paul Gaultier)',
    matcher: (p) => /scandal/i.test(p.name),
  },
  {
    query: 'jpg',
    expectedDescription: 'Jean Paul Gaultier',
    matcher: (p) => /gaultier/i.test(p.brand.name),
  },
  {
    query: 'jean paul gotier',
    expectedDescription: 'Jean Paul Gaultier',
    matcher: (p) => /gaultier/i.test(p.brand.name),
  },
  {
    query: 'la vie est belle',
    expectedDescription: 'La Vie Est Belle (Lancôme)',
    matcher: (p) => /la vie est belle/i.test(p.name) || /lancôme|lancome/i.test(p.brand.name),
  },
  {
    query: 'si armani',
    expectedDescription: 'Sì (Giorgio Armani)',
    matcher: (p) => /sì|si\b/i.test(p.name) && /armani/i.test(p.brand.name),
  },
  {
    query: 'libre',
    expectedDescription: 'Libre (YSL)',
    matcher: (p) => /libre/i.test(p.name) || /saint laurent/i.test(p.brand.name),
  },
  {
    query: 'black opium',
    expectedDescription: 'Black Opium (YSL)',
    matcher: (p) => /black opium/i.test(p.name) || /saint laurent/i.test(p.brand.name),
  },
  {
    query: 'عطر ديور',
    expectedDescription: 'Dior',
    matcher: (p) => /dior/i.test(p.brand.name),
  },
  {
    query: 'سوفاج',
    expectedDescription: 'Sauvage (Dior)',
    matcher: (p) => /sauvage/i.test(p.name),
  },
];

describe('Jeu de test des 30 requêtes réelles (Phase 4)', () => {
  it('atteint au moins 90% de succès dans le Top 3', async () => {
    let successCount = 0;
    const results: { query: string; expected: string; rank: number | null; topMatch: string | null }[] = [];

    for (const testCase of REAL_QUERY_TEST_CASES) {
      const res = await repo.listProducts({ search: testCase.query });
      const top3 = res.items.slice(0, 3);
      const matchIndex = top3.findIndex((p) => testCase.matcher(p));

      if (matchIndex !== -1) {
        successCount++;
        results.push({
          query: testCase.query,
          expected: testCase.expectedDescription,
          rank: matchIndex + 1,
          topMatch: `${top3[matchIndex].name} (${top3[matchIndex].brand.name})`,
        });
      } else {
        const firstMatchIndex = res.items.findIndex((p) => testCase.matcher(p));
        results.push({
          query: testCase.query,
          expected: testCase.expectedDescription,
          rank: firstMatchIndex !== -1 ? firstMatchIndex + 1 : null,
          topMatch: res.items[0] ? `${res.items[0].name} (${res.items[0].brand.name})` : null,
        });
      }
    }

    for (const r of results) {
      console.log(`Query: "${r.query}" | Expected: ${r.expected} | Rank: ${r.rank} | Top: ${r.topMatch}`);
    }

    const successRate = (successCount / REAL_QUERY_TEST_CASES.length) * 100;
    console.log(`Taux de succès Top 3: ${successCount}/${REAL_QUERY_TEST_CASES.length} (${successRate.toFixed(1)}%)`);

    expect(successCount).toBeGreaterThanOrEqual(27); // >= 90%
  });
});
