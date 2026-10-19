import type {
  Gender,
  IntensityTag,
  MoodTag,
  NoteTag,
  OlfactoryFamilyTag,
  SeasonTag,
} from '@/lib/catalog';

import type { ShopProduct } from './shop-product';

export type FilterCategory = 'query' | 'gender' | 'family' | 'notes' | 'intensity' | 'season' | 'mood';

/** Sélection courante par axe. Un axe vide = aucun filtre sur cet axe. */
export interface ShopFilters {
  query: string;
  gender: Gender[];
  family: OlfactoryFamilyTag[];
  notes: NoteTag[];
  intensity: IntensityTag[];
  season: SeasonTag[];
  mood: MoodTag[];
}

export const EMPTY_FILTERS: ShopFilters = {
  query: '',
  gender: [],
  family: [],
  notes: [],
  intensity: [],
  season: [],
  mood: [],
};

export function hasActiveFilters(filters: ShopFilters): boolean {
  if (filters.query.trim().length > 0) return true;
  return Object.values(filters).some((values) => Array.isArray(values) && values.length > 0);
}

import { searchProducts } from '@/lib/search';

/**
 * Vérifie la correspondance des facettes (genre, famille, notes, intensité, saison, ambiance)
 */
export function matchesFacets(product: ShopProduct, filters: ShopFilters): boolean {
  const { gender, family, notes, intensity, season, mood } = filters;

  if (gender.length > 0 && !gender.includes(product.gender)) return false;
  if (family.length > 0 && !family.some((f) => product.olfactoryFamilies.includes(f))) {
    return false;
  }
  if (notes.length > 0 && !notes.some((n) => product.noteTags.includes(n))) return false;
  if (
    intensity.length > 0 &&
    (product.intensity === undefined || !intensity.includes(product.intensity))
  ) {
    return false;
  }
  if (season.length > 0 && !season.some((s) => product.seasons.includes(s))) return false;
  if (mood.length > 0 && !mood.some((m) => product.moods.includes(m))) return false;

  return true;
}

/**
 * ET entre les axes, OU à l'intérieur d'un axe : cocher « Boisé » et
 * « Ambré » élargit, cocher Genre ET Famille restreint.
 */
export function matchesFilters(product: ShopProduct, filters: ShopFilters): boolean {
  if (!matchesFacets(product, filters)) return false;

  if (filters.query.trim().length > 0) {
    const { results } = searchProducts([product], filters.query);
    if (results.length === 0) return false;
  }

  return true;
}

export function toggleValue<T>(values: T[], value: T): T[] {
  return values.includes(value) ? values.filter((v) => v !== value) : [...values, value];
}
