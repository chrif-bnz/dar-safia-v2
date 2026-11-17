export interface SearchFieldWeights {
  name: number;
  brand: number;
  concentration: number;
  family: number;
  notes: number;
  gender: number;
  badge: number;
  description: number;
}

export const DEFAULT_WEIGHTS: SearchFieldWeights = {
  name: 100,
  brand: 90,
  concentration: 50,
  family: 40,
  notes: 40,
  gender: 30,
  badge: 15,
  description: 10,
};

export interface IndexedFieldToken {
  raw: string;
  normalized: string;
  phonetic: string;
}

export interface SearchableItem {
  id: string;
  name: string;
  brand: string;
  gender?: string;
  concentration?: string;
  family?: string;
  secondaryFamilies?: string[];
  notes?: string[];
  badge?: string;
  description?: string;
  original: unknown; // original Product or ShopProduct
}

export interface IndexedItem {
  item: SearchableItem;
  unspacedName: string;
  unspacedBrandName: string;
  nameTokens: IndexedFieldToken[];
  brandTokens: IndexedFieldToken[];
  concentrationTokens: IndexedFieldToken[];
  familyTokens: IndexedFieldToken[];
  noteTokens: IndexedFieldToken[];
  genderTokens: IndexedFieldToken[];
  badgeTokens: IndexedFieldToken[];
  descriptionTokens: IndexedFieldToken[];
  allTokens: IndexedFieldToken[];
}

export interface MatchDetail {
  matchedWord: string;
  targetField: keyof SearchFieldWeights;
  matchType: 'exact' | 'prefix' | 'typo' | 'phonetic' | 'glued' | 'alias';
  score: number;
}

export interface SearchResult<T = unknown> {
  item: T;
  score: number;
  matches: MatchDetail[];
}

export interface SearchEngineResult<T = unknown> {
  items: T[];
  total: number;
  didYouMean?: string;
  fallbackRecommendations?: T[];
}
