import aliasesData from './aliases.json' with { type: 'json' };
import { matchToken } from './distance';
import { canonicalizeQuery, collapseSpaces, normalizeText, tokenize } from './normalizer';
import { fragrancePhonetic, matchPhonetic } from './phonetics';

export interface SearchProductLike {
  slug: string;
  name: string;
  brand: { name: string };
  gender: string;
  family?: string;
  concentration?: string;
  badge?: string;
  headlineNote?: string;
  noteTags?: string[];
  olfactoryFamilies?: string[];
  notesAll?: string[];
  description?: string;
}

export interface IndexedField {
  type: 'name' | 'brand' | 'concentration' | 'family' | 'notes' | 'gender' | 'badge' | 'description';
  text: string;
  tokens: string[];
  phoneticTokens: string[];
  weight: number;
}

export interface IndexedProduct<T extends SearchProductLike> {
  original: T;
  originalIndex: number;
  fullName: string;
  cleanFullName: string;
  collapsed: string;
  brandName: string;
  productName: string;
  fields: IndexedField[];
}

export interface SearchResult<T extends SearchProductLike> {
  results: T[];
  suggestion: string | null;
  fallbackResults: T[];
  totalMatches: number;
}

const FAMILY_FRENCH_MAP: Record<string, string[]> = {
  floral: ['floral', 'fleuri', 'fleurs', 'rose', 'jasmin'],
  woody: ['boise', 'bois', 'cedre', 'santal', 'vetiver'],
  amber: ['ambre', 'ambree', 'oriental'],
  fresh: ['frais', 'fraicheur', 'aquatique', 'marine', 'agrumes', 'hesperide'],
  gourmand: ['gourmand', 'sucre', 'vanille', 'caramel', 'chocolat'],
  spicy: ['epice', 'epicee', 'poivre', 'cannelle', 'cardamome']
};

/**
 * Prépare et indexe un produit pour la recherche rapide en mémoire.
 */
function indexProduct<T extends SearchProductLike>(product: T, index: number): IndexedProduct<T> {
  const brandName = product.brand?.name ?? '';
  const productName = product.name ?? '';
  const fullName = `${brandName} ${productName}`;
  const cleanFullName = `${brandName} ${productName}`
    .replace(/\b(\w+)\s+\1\b/gi, '$1')
    .trim();
  const collapsed = collapseSpaces(cleanFullName);

  const fields: IndexedField[] = [];

  const addField = (
    type: IndexedField['type'],
    rawText: string | undefined,
    weight: number
  ) => {
    if (!rawText) return;
    const norm = normalizeText(rawText);
    if (!norm) return;
    const tokens = tokenize(norm);
    const phoneticTokens = tokens.map(fragrancePhonetic).filter(Boolean);
    fields.push({ type, text: norm, tokens, phoneticTokens, weight });
  };

  // 1. Nom du produit (Poids 100)
  addField('name', productName, 100);

  // 2. Marque (Poids 90)
  addField('brand', brandName, 90);

  // 3. Nom complet dédoublonné (Poids 95)
  addField('name', cleanFullName, 95);

  // 4. Concentration (Poids 60)
  if (product.concentration) {
    addField('concentration', product.concentration, 60);
  }

  // 5. Familles olfactives (Poids 50)
  const families: string[] = [];
  if (product.family) {
    families.push(product.family);
    if (FAMILY_FRENCH_MAP[product.family]) {
      families.push(...FAMILY_FRENCH_MAP[product.family]);
    }
  }
  if (product.olfactoryFamilies && Array.isArray(product.olfactoryFamilies)) {
    families.push(...product.olfactoryFamilies);
    for (const f of product.olfactoryFamilies) {
      if (FAMILY_FRENCH_MAP[f]) families.push(...FAMILY_FRENCH_MAP[f]);
    }
  }
  if (families.length > 0) {
    addField('family', families.join(' '), 50);
  }

  // 6. Notes olfactives (Poids 50)
  const notesList: string[] = [];
  if (product.headlineNote) notesList.push(product.headlineNote);
  if (product.noteTags && Array.isArray(product.noteTags)) notesList.push(...product.noteTags);
  if (product.notesAll && Array.isArray(product.notesAll)) notesList.push(...product.notesAll);
  if (notesList.length > 0) {
    addField('notes', notesList.join(' '), 50);
  }

  // 7. Genre (Poids 40)
  if (product.gender) {
    addField('gender', product.gender, 40);
  }

  // 8. Badge (Poids 20)
  if (product.badge) {
    addField('badge', product.badge, 20);
  }

  // 9. Description (Poids 15)
  if (product.description) {
    addField('description', product.description, 15);
  }

  return {
    original: product,
    originalIndex: index,
    fullName,
    cleanFullName,
    collapsed,
    brandName,
    productName,
    fields
  };
}

// Cache d'index par tableau de produits (référence mémoire)
const indexCache = new WeakMap<object, unknown>();

export function getOrCreateIndex<T extends SearchProductLike>(products: T[]): IndexedProduct<T>[] {
  let cached = indexCache.get(products) as IndexedProduct<T>[] | undefined;
  if (!cached) {
    cached = products.map((p, i) => indexProduct(p, i));
    indexCache.set(products, cached);
  }
  return cached;
}

interface ScoredProduct<T extends SearchProductLike> {
  item: IndexedProduct<T>;
  score: number;
  matchedTokensCount: number;
}

/**
 * Score un produit par rapport à une liste de tokens de recherche.
 */
function scoreProduct<T extends SearchProductLike>(
  item: IndexedProduct<T>,
  queryTokens: string[],
  normalizedQuery: string,
  collapsedQuery: string
): ScoredProduct<T> {
  let totalScore = 0;
  let matchedCount = 0;

  // 1. Bonus immédiat si correspondance effondrée (mots collés : ex "bleudechanel" ou "sauvage")
  if (collapsedQuery.length >= 4 && item.collapsed.includes(collapsedQuery)) {
    totalScore += 250;
    matchedCount = queryTokens.length; // Tous les mots sont implicitement couverts
  }

  // 2. Bonus si la requête exacte entière apparaît dans le nom ou la marque
  const normFull = normalizeText(item.fullName);
  const normCleanFull = normalizeText(item.cleanFullName);
  if (normFull.includes(normalizedQuery) || normCleanFull.includes(normalizedQuery)) {
    totalScore += 300;
  }

  let matchedProductName = false;
  let matchedBrandName = false;

  // 3. Évaluation token par token (ordre libre)
  for (let i = 0; i < queryTokens.length; i++) {
    const qToken = queryTokens[i];
    const isLastToken = i === queryTokens.length - 1;
    let bestTokenScore = 0;
    let bestFieldType = '';

    for (const field of item.fields) {
      for (const targetToken of field.tokens) {
        // Comparaison orthographique / distance
        const res = matchToken(qToken, targetToken, isLastToken);
        if (res.matched) {
          const s = (res.score * field.weight) / 100;
          if (s > bestTokenScore) {
            bestTokenScore = s;
            bestFieldType = field.type;
          }
        }
      }

      // Si pas encore de match fort, test phonétique
      if (bestTokenScore < 50 && qToken.length >= 3) {
        for (const targetToken of field.tokens) {
          if (matchPhonetic(qToken, targetToken)) {
            const s = (45 * field.weight) / 100;
            if (s > bestTokenScore) {
              bestTokenScore = s;
              bestFieldType = field.type;
            }
          }
        }
      }
    }

    if (bestTokenScore > 0) {
      matchedCount++;
      totalScore += bestTokenScore;
      if (bestFieldType === 'name') matchedProductName = true;
      if (bestFieldType === 'brand') matchedBrandName = true;
    }
  }

  // Bonus si la recherche combine marque ET nom du parfum
  if (matchedProductName && matchedBrandName) {
    totalScore += 150;
  }

  return { item, score: totalScore, matchedTokensCount: matchedCount };
}

/**
 * Recherche intelligente principale de parfums :
 * - Tolérance aux fautes (Damerau-Levenshtein)
 * - Phonétique bilingue
 * - Synonymes et alias (marques, abréviations, genres, concentrations)
 * - Translittération arabe et arabizi
 * - Ordre libre des mots
 * - Mots collés et coupés
 * - Pondération par champs
 * - Suggestion « Vous vouliez dire : ... ? »
 * - 4 parfums de repli si 0 résultat
 */
export function searchProducts<T extends SearchProductLike>(
  products: T[],
  query: string
): SearchResult<T> {
  const trimmed = query.trim();
  if (!trimmed) {
    return {
      results: products,
      suggestion: null,
      fallbackResults: [],
      totalMatches: products.length
    };
  }

  const index = getOrCreateIndex(products);

  // 1. Normalisation et résolution canonique des alias
  const { normalized: normalizedQuery, tokens: canonicalTokens } = canonicalizeQuery(trimmed);
  if (canonicalTokens.length === 0) {
    return {
      results: products,
      suggestion: null,
      fallbackResults: [],
      totalMatches: products.length
    };
  }

  const collapsedQuery = collapseSpaces(normalizedQuery);

  // 2. Calcul du score pour chaque produit
  const scoredItems: ScoredProduct<T>[] = [];
  const requiredTokensCount = canonicalTokens.length;

  for (const item of index) {
    const scored = scoreProduct(item, canonicalTokens, normalizedQuery, collapsedQuery);

    // Un produit est retenu si :
    // - Soit tous les tokens canoniques ont trouvé une correspondance
    // - Soit la version sans espaces a trouvé un match collé complet
    if (scored.matchedTokensCount >= requiredTokensCount || (collapsedQuery.length >= 5 && item.collapsed.includes(collapsedQuery))) {
      scoredItems.push(scored);
    }
  }

  // 3. Tri par score décroissant, conservation de l'ordre d'origine en cas d'égalité
  scoredItems.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.item.originalIndex - b.item.originalIndex;
  });

  // Élimination du bruit parasite en cas de match fort sur le nom/marque
  const topScore = scoredItems[0]?.score ?? 0;
  const filteredScored = topScore >= 200
    ? scoredItems.filter((s) => s.score >= topScore * 0.45)
    : scoredItems;

  const results = filteredScored.map((s) => s.item.original);

  // 4. Calcul de suggestion (« Vous vouliez dire : ... ? »)
  let suggestion: string | null = null;
  const rawNorm = normalizeText(trimmed);
  const hasExactPhraseMatch = scoredItems.some(
    (s) =>
      normalizeText(s.item.fullName).includes(rawNorm) ||
      normalizeText(s.item.productName) === rawNorm
  );

  if (results.length === 0 || !hasExactPhraseMatch) {
    const candidate = computeBestSuggestion(trimmed, index);
    if (candidate && normalizeText(candidate) !== rawNorm) {
      suggestion = candidate;
    }
  }

  // 5. Si aucun résultat même après filtrage, calcul des 4 parfums les plus proches (repli élégant)
  let fallbackResults: T[] = [];
  if (results.length === 0) {
    // On score sans imposer que TOUS les tokens soient présents
    const looseScored = index
      .map((item) => scoreProduct(item, canonicalTokens, normalizedQuery, collapsedQuery))
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score || a.item.originalIndex - b.item.originalIndex);

    fallbackResults = looseScored.slice(0, 4).map((s) => s.item.original);

    // Si même le scoring partiel est vide, on prend les 4 premiers produits par défaut
    if (fallbackResults.length === 0) {
      fallbackResults = products.slice(0, 4);
    }
  }

  return {
    results,
    suggestion,
    fallbackResults,
    totalMatches: results.length
  };
}

/**
 * Calcule la meilleure suggestion orthographique ou de titre de parfum.
 */
function computeBestSuggestion<T extends SearchProductLike>(
  query: string,
  index: IndexedProduct<T>[]
): string | null {
  const normQ = normalizeText(query);
  if (!normQ) return null;

  // 1. Vérifier si un nom populaire ou une marque connue dans les alias correspond
  const popular = aliasesData.popularNames as Record<string, string>;
  for (const [alias, canonical] of Object.entries(popular)) {
    const normAlias = normalizeText(alias);
    if (normAlias === normQ || matchToken(normQ, normAlias).matched || matchPhonetic(normQ, normAlias)) {
      return canonical;
    }
  }

  const brands = aliasesData.brands as Record<string, string>;
  for (const [alias, canonical] of Object.entries(brands)) {
    const normAlias = normalizeText(alias);
    if (normAlias === normQ || matchToken(normQ, normAlias).matched || matchPhonetic(normQ, normAlias)) {
      return canonical;
    }
  }

  // 2. Recherche parmi les noms de parfums du catalogue
  let bestCandidate: string | null = null;
  let bestDist = 999;

  for (const item of index) {
    const normName = normalizeText(item.productName);
    const normFull = normalizeText(item.fullName);

    // Test sur nom de produit
    const res = matchToken(normQ, normName);
    if (res.matched && res.distance < bestDist) {
      bestDist = res.distance;
      bestCandidate = item.productName;
    }

    // Test phonétique
    if (!bestCandidate && (matchPhonetic(normQ, normName) || matchPhonetic(normQ, normFull))) {
      bestCandidate = item.productName;
    }
  }

  return bestCandidate;
}
