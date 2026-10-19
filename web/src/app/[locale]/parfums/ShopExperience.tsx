'use client';

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  getTotalPages,
  paginateItems,
  parsePageParam,
  PERFUMES_PER_PAGE,
  type Gender,
  type IntensityTag,
  type MoodTag,
  type NoteTag,
  type OlfactoryFamilyTag,
  type SeasonTag,
} from '@/lib/catalog';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionary';
import { pluralize } from '@/lib/i18n/dictionary';
import {
  getServerShuffleSeed,
  getShuffleSeed,
  reshuffle,
  shuffleWithSeed,
  subscribeShuffle,
} from '@/lib/shuffle';

import { Pagination } from '@/components/Pagination';
import { searchProducts } from '@/lib/search';
import { FilterSidebar } from './FilterSidebar';
import { EMPTY_FILTERS, matchesFacets, toggleValue, type FilterCategory } from './filters';
import { PerfumeGrid } from './PerfumeGrid';
import type { ShopProduct } from './shop-product';

/**
 * ══════════════════════════════════════════════════════════════
 *   BOUTIQUE — FILTRAGE CLIENT & PAGINATION
 * ══════════════════════════════════════════════════════════════
 *
 * Le catalogue arrive du serveur ; le filtrage s'exécute en mémoire
 * puis la liste filtrée est découpée par page (12 par page).
 * Le numéro de page est lu depuis l'URL (?page=...).
 * Tout changement de filtre réinitialise la page à 1 dans le gestionnaire.
 */
export function ShopExperience({
  products,
  locale,
  dict,
}: {
  products: ShopProduct[];
  locale: Locale;
  dict: Dictionary;
}) {
  const c = dict.catalog;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const gridTopRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  // Ordre d'affichage : liste d'origine au rendu serveur et à l'hydratation,
  // puis mélangée au montage. On mélange la liste COMPLÈTE avant de filtrer :
  // changer de filtre ne remélange donc rien.
  const seed = useSyncExternalStore(subscribeShuffle, getShuffleSeed, getServerShuffleSeed);
  const ordered = useMemo(
    () => (seed === null ? products : shuffleWithSeed(products, seed)),
    [products, seed]
  );

  const facetFiltered = useMemo(
    () => ordered.filter((p) => matchesFacets(p, filters)),
    [ordered, filters]
  );

  const searchOutput = useMemo(() => {
    if (!filters.query.trim()) {
      return {
        results: facetFiltered,
        suggestion: null,
        fallbackResults: [] as ShopProduct[],
        totalMatches: facetFiltered.length,
      };
    }
    return searchProducts(facetFiltered, filters.query);
  }, [facetFiltered, filters.query]);

  const filtered = searchOutput.results;
  const suggestion = searchOutput.suggestion;
  const fallbackResults = searchOutput.fallbackResults;

  const totalPages = useMemo(
    () => getTotalPages(filtered.length, PERFUMES_PER_PAGE),
    [filtered.length]
  );

  const currentPage = useMemo(
    () => parsePageParam(searchParams.get('page'), totalPages),
    [searchParams, totalPages]
  );

  const paginated = useMemo(
    () => paginateItems(filtered, currentPage, PERFUMES_PER_PAGE),
    [filtered, currentPage]
  );

  function resetPage() {
    const pageParam = searchParams.get('page');
    if (pageParam && pageParam !== '1') {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', '1');
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }

  function handleToggle(category: FilterCategory, value: string) {
    resetPage();
    setFilters((prev) => {
      switch (category) {
        case 'gender':
          return { ...prev, gender: toggleValue(prev.gender, value as Gender) };
        case 'family':
          return { ...prev, family: toggleValue(prev.family, value as OlfactoryFamilyTag) };
        case 'notes':
          return { ...prev, notes: toggleValue(prev.notes, value as NoteTag) };
        case 'intensity':
          return {
            ...prev,
            intensity: toggleValue(prev.intensity, Number(value) as IntensityTag),
          };
        case 'season':
          return { ...prev, season: toggleValue(prev.season, value as SeasonTag) };
        case 'mood':
          return { ...prev, mood: toggleValue(prev.mood, value as MoodTag) };
        case 'query':
          return { ...prev, query: value };
        default:
          return prev;
      }
    });
  }

  function handleClear() {
    resetPage();
    setFilters(EMPTY_FILTERS);
  }

  function scrollToGrid() {
    gridTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const prevPageRef = useRef(currentPage);
  useEffect(() => {
    if (prevPageRef.current !== currentPage) {
      prevPageRef.current = currentPage;
      scrollToGrid();
    }
  }, [currentPage]);

  return (
    <div className="mt-10 lg:grid lg:grid-cols-[240px_1fr] lg:items-start lg:gap-12">
      <FilterSidebar
        filters={filters}
        onToggle={handleToggle}
        onClear={handleClear}
        dict={dict}
      />

      <div>
        <div ref={gridTopRef} className="scroll-mt-32" />
        <div className="mt-6 flex items-center justify-between gap-4 lg:mt-0">
          <p className="text-2xs text-ivory/58" aria-live="polite">
            {pluralize(c.count, filtered.length)}
          </p>
          <button type="button" onClick={reshuffle} className="ds-shuffle" aria-label={c.shuffle}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M16 3h5v5" />
              <path d="M4 20 21 3" />
              <path d="M21 16v5h-5" />
              <path d="m15 15 6 6" />
              <path d="m4 4 5 5" />
            </svg>
            <span>{c.shuffle}</span>
          </button>
        </div>

        {suggestion && (
          <div className="mt-3 text-xs text-ivory/70" role="status" aria-live="polite">
            <span className="opacity-80">
              {c.didYouMean.split('{suggestion}')[0]}
            </span>
            <button
              type="button"
              onClick={() => handleToggle('query', suggestion)}
              className="cursor-pointer font-medium text-gold underline underline-offset-2 transition-colors hover:text-gold-light"
            >
              {suggestion}
            </button>
            <span className="opacity-80">
              {c.didYouMean.split('{suggestion}')[1] || ''}
            </span>
          </div>
        )}

        {filtered.length > 0 ? (
          <div className="mt-6">
            <PerfumeGrid products={paginated} locale={locale} dict={dict} shuffleKey={seed} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              dict={dict}
              onPageChange={scrollToGrid}
            />
          </div>
        ) : (
          <div className="mt-10 rounded-md border border-smoke-2 bg-noir-2 px-6 py-12 text-center">
            <p className="font-serif text-lg text-ivory">{c.empty}</p>
            <p className="mt-2 text-2xs text-ivory/50">{c.emptyHint}</p>

            {fallbackResults.length > 0 && (
              <div className="mt-8 text-left">
                <p className="mb-4 font-ui text-2xs uppercase tracking-(--tracking-label) text-gold">
                  {c.closestMatches}
                </p>
                <PerfumeGrid products={fallbackResults} locale={locale} dict={dict} shuffleKey={seed} />
              </div>
            )}

            <button
              type="button"
              onClick={handleClear}
              className="ds-btn-ghost mt-8 inline-block rounded-sm border border-gold px-5 py-2.5 text-2xs font-semibold tracking-(--tracking-label) text-gold uppercase transition-colors hover:text-noir"
            >
              {c.emptyCta}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

