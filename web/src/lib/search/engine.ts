/**
 * Moteur de recherche intelligent pour Dar Safia
 */

import aliasesData from './aliases.json';
import { decodeArabizi, hasArabicScript, transliterateArabic } from './arabic';
import { isTypoMatch } from './levenshtein';
import { normalizeText, tokenize, toUnspaced } from './normalizer';
import { encodePhonetic, isPhoneticMatch } from './phonetics';
import type {
  IndexedFieldToken,
  IndexedItem,
  MatchDetail,
  SearchableItem,
  SearchEngineResult,
  SearchResult,
} from './types';
import { DEFAULT_WEIGHTS } from './types';

interface AliasDictionary {
  brands: Record<string, string>;
  concentrations: Record<string, string>;
  genders: Record<string, string>;
  popularNames: Record<string, string>;
  notesAndFamilies: Record<string, string>;
}

const aliases: AliasDictionary = aliasesData as AliasDictionary;

/**
 * Crée un token indexé avec sa version normalisée et phonétique
 */
function createIndexedToken(raw: string): IndexedFieldToken {
  const normalized = normalizeText(raw);
  return {
    raw,
    normalized,
    phonetic: encodePhonetic(normalized),
  };
}

export interface RawProductLike {
  id?: string | number;
  slug?: string;
  name?: string;
  brand?: string | { name: string; slug?: string };
  gender?: string;
  concentration?: string;
  family?: string;
  secondaryFamilies?: string[];
  notes?: Array<string | { note?: { name?: string } }>;
  headlineNote?: string;
  badge?: string;
  description?: string;
}

/**
 * Convertit un Product (domaine) ou ShopProduct (client) en SearchableItem universel
 */
export function toSearchableItem(p: RawProductLike): SearchableItem {
  const brandName = typeof p.brand === 'string' ? p.brand : p.brand?.name ?? '';

  let notes: string[] = [];
  if (Array.isArray(p.notes)) {
    notes = p.notes.map((n) => (typeof n === 'string' ? n : n?.note?.name ?? ''));
  } else if (p.headlineNote) {
    notes = [p.headlineNote];
  }

  const secondary = Array.isArray(p.secondaryFamilies) ? p.secondaryFamilies : [];

  return {
    id: String(p.id ?? p.slug),
    name: p.name ?? '',
    brand: brandName,
    gender: p.gender ?? '',
    concentration: p.concentration ?? '',
    family: p.family ?? '',
    secondaryFamilies: secondary,
    notes: notes.filter(Boolean),
    badge: p.badge ?? '',
    description: p.description ?? '',
    original: p,
  };
}

/**
 * Indexe un SearchableItem pour des recherches répétées ultrarapides (< 1ms par requête)
 */
export function indexItem(item: SearchableItem): IndexedItem {
  const tokenizeField = (text?: string): IndexedFieldToken[] => {
    if (!text) return [];
    return tokenize(text).map(createIndexedToken);
  };

  const nameTokens = tokenizeField(item.name);
  const brandTokens = tokenizeField(item.brand);
  const concentrationTokens = tokenizeField(item.concentration);
  const familyTokens = tokenizeField(
    [item.family, ...(item.secondaryFamilies ?? [])].filter(Boolean).join(' ')
  );
  const noteTokens = (item.notes ?? []).flatMap((n) => tokenizeField(n));
  const genderTokens = tokenizeField(item.gender);
  const badgeTokens = tokenizeField(item.badge);
  const descriptionTokens = tokenizeField(item.description);

  const allTokens = [
    ...nameTokens,
    ...brandTokens,
    ...concentrationTokens,
    ...familyTokens,
    ...noteTokens,
    ...genderTokens,
    ...badgeTokens,
  ];

  return {
    item,
    unspacedName: toUnspaced(item.name),
    unspacedBrandName: toUnspaced(`${item.brand} ${item.name}`),
    nameTokens,
    brandTokens,
    concentrationTokens,
    familyTokens,
    noteTokens,
    genderTokens,
    badgeTokens,
    descriptionTokens,
    allTokens,
  };
}

/**
 * Cache d'indexation pour éviter de recalculer les index à chaque frappe
 */
const indexCache = new WeakMap<object, IndexedItem[]>();

export function getOrCreateIndex<T extends object>(products: T[]): IndexedItem[] {
  let cached = indexCache.get(products);
  if (!cached) {
    cached = products.map((p) => indexItem(toSearchableItem(p as RawProductLike)));
    indexCache.set(products, cached);
  }
  return cached;
}

/**
 * Prétraite la requête utilisateur :
 * - détection arabe & translittération
 * - arabizi
 * - normalisation
 * - expansion des alias (triplets, paires, singles)
 */
export function preprocessQuery(query: string): {
  normalized: string;
  tokens: string[];
  unspaced: string;
} {
  let text = query.trim();
  if (!text) {
    return { normalized: '', tokens: [], unspaced: '' };
  }

  // 1. Arabe
  if (hasArabicScript(text)) {
    text = transliterateArabic(text);
  }

  // 2. Arabizi
  text = decodeArabizi(text);

  // 3. Normalisation texte
  const normalized = normalizeText(text);

  // 4. Découpage en tokens
  const rawTokens = tokenize(normalized);

  // 5. Expansion des alias (ex: "d et g" -> "dolce gabbana", "ysl" -> "yves saint laurent")
  const expanded: string[] = [];
  let i = 0;
  while (i < rawTokens.length) {
    // Vérification de quadruplets d'abord (ex: "la vie est belle")
    if (i < rawTokens.length - 3) {
      const quad = `${rawTokens[i]} ${rawTokens[i + 1]} ${rawTokens[i + 2]} ${rawTokens[i + 3]}`;
      const brandAlias = aliases.brands[quad];
      const popAlias = aliases.popularNames[quad];
      if (brandAlias) {
        expanded.push(...tokenize(brandAlias));
        i += 4;
        continue;
      }
      if (popAlias) {
        expanded.push(...tokenize(popAlias));
        i += 4;
        continue;
      }
    }

    // Vérification de triplets d'abord (ex: "d et g", "born in roma")
    if (i < rawTokens.length - 2) {
      const triplet = `${rawTokens[i]} ${rawTokens[i + 1]} ${rawTokens[i + 2]}`;
      const brandAlias = aliases.brands[triplet];
      const popAlias = aliases.popularNames[triplet];
      if (brandAlias) {
        expanded.push(...tokenize(brandAlias));
        i += 3;
        continue;
      }
      if (popAlias) {
        expanded.push(...tokenize(popAlias));
        i += 3;
        continue;
      }
    }

    // Vérification de paires de mots (ex: "1 million", "le male", "dolce gabbana")
    if (i < rawTokens.length - 1) {
      const pair = `${rawTokens[i]} ${rawTokens[i + 1]}`;
      const brandAlias = aliases.brands[pair];
      const popAlias = aliases.popularNames[pair];
      const genderAlias = aliases.genders[pair];
      if (brandAlias) {
        expanded.push(...tokenize(brandAlias));
        i += 2;
        continue;
      }
      if (popAlias) {
        expanded.push(...tokenize(popAlias));
        i += 2;
        continue;
      }
      if (genderAlias) {
        expanded.push(genderAlias);
        i += 2;
        continue;
      }
    }

    // Mot simple
    const single = rawTokens[i];
    const brandAlias = aliases.brands[single];
    const concAlias = aliases.concentrations[single];
    const genderAlias = aliases.genders[single];
    const popAlias = aliases.popularNames[single];
    const noteAlias = aliases.notesAndFamilies[single];

    if (brandAlias) {
      expanded.push(...tokenize(brandAlias));
    } else if (concAlias) {
      expanded.push(...tokenize(concAlias));
    } else if (genderAlias) {
      expanded.push(genderAlias);
    } else if (popAlias) {
      expanded.push(...tokenize(popAlias));
    } else if (noteAlias) {
      expanded.push(noteAlias);
    } else {
      expanded.push(single);
    }
    i++;
  }

  const tokens = expanded.filter(Boolean);
  const unspaced = toUnspaced(normalized);

  return { normalized, tokens, unspaced };
}

/**
 * Score un token de requête contre une liste de tokens d'un champ
 */
function matchTokenAgainstField(
  queryToken: string,
  fieldTokens: IndexedFieldToken[],
  isLastQueryToken: boolean,
  allowFuzzy: boolean = true
): { matched: boolean; scoreMultiplier: number; matchType: MatchDetail['matchType'] } {
  if (fieldTokens.length === 0) {
    return { matched: false, scoreMultiplier: 0, matchType: 'exact' };
  }

  const queryPhonetic = encodePhonetic(queryToken);

  let bestMultiplier = 0;
  let bestType: MatchDetail['matchType'] = 'exact';

  for (const target of fieldTokens) {
    // 1. Correspondance exacte
    if (target.normalized === queryToken) {
      return { matched: true, scoreMultiplier: 1.0, matchType: 'exact' };
    }

    // 2. Préfixe
    if (target.normalized.startsWith(queryToken)) {
      const mult = isLastQueryToken ? 0.9 : 0.8;
      if (mult > bestMultiplier) {
        bestMultiplier = mult;
        bestType = 'prefix';
      }
    }

    // Gestion du pluriel (ex: utilisateur tape "sauvages" au pluriel, cible "sauvage")
    if (
      queryToken === target.normalized + 's' ||
      queryToken === target.normalized + 'es' ||
      queryToken === target.normalized + 'x'
    ) {
      const mult = 0.85;
      if (mult > bestMultiplier) {
        bestMultiplier = mult;
        bestType = 'prefix';
      }
    }

    if (allowFuzzy) {
      // 3. Fautes d'orthographe (Damerau-Levenshtein)
      const typo = isTypoMatch(queryToken, target.normalized);
      if (typo.isMatch) {
        const mult = 0.75 * typo.scoreMultiplier;
        if (mult > bestMultiplier) {
          bestMultiplier = mult;
          bestType = 'typo';
        }
      }

      // 4. Phonétique (si longueur suffisante)
      if (queryPhonetic.length >= 3 && target.phonetic.length >= 3) {
        if (queryPhonetic === target.phonetic || isPhoneticMatch(queryToken, target.normalized)) {
          const mult = 0.6;
          if (mult > bestMultiplier) {
            bestMultiplier = mult;
            bestType = 'phonetic';
          }
        }
      }
    }
  }

  return {
    matched: bestMultiplier > 0,
    scoreMultiplier: bestMultiplier,
    matchType: bestType,
  };
}

/**
 * Évalue la correspondance globale d'un produit pour une requête
 */
function scoreItem(
  indexed: IndexedItem,
  tokens: string[],
  unspacedQuery: string
): { isMatch: boolean; totalScore: number; matches: MatchDetail[] } {
  if (tokens.length === 0) {
    return { isMatch: true, totalScore: 0, matches: [] };
  }

  // 1. Détection des mots collés / mots coupés (ex: "bleudechanel" ou "sau vage")
  if (unspacedQuery.length >= 5) {
    if (
      indexed.unspacedBrandName.includes(unspacedQuery) ||
      indexed.unspacedName.includes(unspacedQuery)
    ) {
      return {
        isMatch: true,
        totalScore: 500 + unspacedQuery.length * 10,
        matches: [
          {
            matchedWord: unspacedQuery,
            targetField: 'name',
            matchType: 'glued',
            score: 500,
          },
        ],
      };
    }
  }

  const fields: {
    key: keyof typeof DEFAULT_WEIGHTS;
    tokens: IndexedFieldToken[];
    allowFuzzy: boolean;
  }[] = [
    { key: 'name', tokens: indexed.nameTokens, allowFuzzy: true },
    { key: 'brand', tokens: indexed.brandTokens, allowFuzzy: true },
    { key: 'concentration', tokens: indexed.concentrationTokens, allowFuzzy: true },
    { key: 'family', tokens: indexed.familyTokens, allowFuzzy: true },
    { key: 'notes', tokens: indexed.noteTokens, allowFuzzy: false },
    { key: 'gender', tokens: indexed.genderTokens, allowFuzzy: true },
    { key: 'badge', tokens: indexed.badgeTokens, allowFuzzy: true },
    { key: 'description', tokens: indexed.descriptionTokens, allowFuzzy: false },
  ];

  let totalScore = 0;
  const matches: MatchDetail[] = [];

  // Chaque mot de la requête doit trouver au moins un champ correspondant
  for (let tIdx = 0; tIdx < tokens.length; tIdx++) {
    const token = tokens[tIdx];
    const isLast = tIdx === tokens.length - 1;

    let tokenMatched = false;
    let highestFieldScore = 0;
    let bestDetail: MatchDetail | null = null;

    for (const field of fields) {
      const match = matchTokenAgainstField(token, field.tokens, isLast, field.allowFuzzy);
      if (match.matched) {
        tokenMatched = true;
        const fieldWeight = DEFAULT_WEIGHTS[field.key];
        const fieldScore = fieldWeight * match.scoreMultiplier;

        if (fieldScore > highestFieldScore) {
          highestFieldScore = fieldScore;
          bestDetail = {
            matchedWord: token,
            targetField: field.key,
            matchType: match.matchType,
            score: fieldScore,
          };
        }
      }
    }

    if (!tokenMatched) {
      // Un mot de la requête n'apparaît nulle part
      return { isMatch: false, totalScore: 0, matches: [] };
    }

    if (bestDetail) {
      totalScore += highestFieldScore;
      matches.push(bestDetail);
    }
  }

  // Bonus : si la marque ET le nom contiennent des correspondances
  const hasBrand = matches.some((m) => m.targetField === 'brand');
  const hasName = matches.some((m) => m.targetField === 'name');
  if (hasBrand && hasName) totalScore += 100;

  // Bonus : correspondance exacte du nom complet
  if (indexed.item.name.toLowerCase().includes(tokens.join(' '))) {
    totalScore += 150;
  }

  return { isMatch: true, totalScore, matches };
}

/**
 * Calcule une suggestion « Vous vouliez dire... ? » en trouvant le nom de parfum
 * ou de marque le plus proche
 */
export function getSearchSuggestion<T extends object>(products: T[], rawQuery: string): string | undefined {
  const q = normalizeText(rawQuery);
  if (!q || q.length < 3) return undefined;

  const indexedList = getOrCreateIndex(products);

  let bestCandidate = '';
  let bestDist = 999;

  for (const item of indexedList) {
    const nameNorm = normalizeText(item.item.name);
    const brandNorm = normalizeText(item.item.brand);

    // Comparaison avec le nom du parfum
    const distName = isTypoMatch(q, nameNorm);
    if (distName.isMatch && distName.distance < bestDist) {
      bestDist = distName.distance;
      bestCandidate = item.item.name;
    }

    // Comparaison avec les mots individuels du nom
    for (const token of item.nameTokens) {
      const distToken = isTypoMatch(q, token.normalized);
      if (distToken.isMatch && distToken.distance < bestDist) {
        bestDist = distToken.distance;
        bestCandidate = token.raw;
      }
    }

    // Comparaison avec la marque
    const distBrand = isTypoMatch(q, brandNorm);
    if (distBrand.isMatch && distBrand.distance < bestDist) {
      bestDist = distBrand.distance;
      bestCandidate = item.item.brand;
    }
  }

  if (bestCandidate && normalizeText(bestCandidate) !== q) {
    return bestCandidate;
  }

  return undefined;
}

/**
 * Fonction principale de recherche de parfums
 */
export function searchProducts<T extends object = RawProductLike>(
  products: T[],
  query: string
): SearchEngineResult<T> {
  if (!query || !query.trim()) {
    return {
      items: products,
      total: products.length,
    };
  }

  const { tokens, unspaced } = preprocessQuery(query);
  if (tokens.length === 0) {
    return {
      items: products,
      total: products.length,
    };
  }

  const indexedList = getOrCreateIndex(products);
  const scoredResults: SearchResult<T>[] = [];

  for (let i = 0; i < indexedList.length; i++) {
    const indexed = indexedList[i];
    const { isMatch, totalScore, matches } = scoreItem(indexed, tokens, unspaced);

    if (isMatch) {
      scoredResults.push({
        item: products[i],
        score: totalScore,
        matches,
      });
    }
  }

  // Tri par pertinence décroissante. À score égal, ordre d'origine préservé.
  scoredResults.sort((a, b) => b.score - a.score);

  const matchedItems = scoredResults.map((r) => r.item);

  // Suggestion si 0 résultat ou confiance faible
  let didYouMean: string | undefined;
  let fallbackRecommendations: T[] | undefined;

  if (matchedItems.length === 0) {
    didYouMean = getSearchSuggestion(products, query);

    // Recommandations des 4 parfums les plus proches au lieu d'un écran vide
    // en utilisant une recherche assouplie (n'importe quel token qui matche)
    const relaxed: { item: T; score: number }[] = [];
    for (let i = 0; i < indexedList.length; i++) {
      const indexed = indexedList[i];
      let itemScore = 0;
      for (const t of tokens) {
        for (const token of indexed.allTokens) {
          const match = isTypoMatch(t, token.normalized);
          if (match.isMatch) itemScore += match.scoreMultiplier * 20;
          if (isPhoneticMatch(t, token.normalized)) itemScore += 15;
        }
      }
      if (itemScore > 0) relaxed.push({ item: products[i], score: itemScore });
    }

    relaxed.sort((a, b) => b.score - a.score);
    fallbackRecommendations = relaxed.slice(0, 4).map((r) => r.item);
  }

  return {
    items: matchedItems,
    total: matchedItems.length,
    didYouMean,
    fallbackRecommendations,
  };
}
