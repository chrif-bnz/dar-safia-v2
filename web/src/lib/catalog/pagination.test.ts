import { describe, expect, it } from 'vitest';

import {
  PERFUMES_PER_PAGE,
  buildPageUrl,
  getPaginationRange,
  getTotalPages,
  paginateItems,
  parsePageParam,
} from './pagination';

describe('Pagination logic', () => {
  describe('PERFUMES_PER_PAGE constant', () => {
    it('is set to 12', () => {
      expect(PERFUMES_PER_PAGE).toBe(12);
    });
  });

  describe('getTotalPages', () => {
    it('returns 1 when there are 0 or negative items', () => {
      expect(getTotalPages(0)).toBe(1);
      expect(getTotalPages(-5)).toBe(1);
    });

    it('returns 1 when items fit in a single page', () => {
      expect(getTotalPages(1)).toBe(1);
      expect(getTotalPages(12)).toBe(1);
    });

    it('returns correct page count for multiple pages', () => {
      expect(getTotalPages(13)).toBe(2);
      expect(getTotalPages(24)).toBe(2);
      expect(getTotalPages(25)).toBe(3);
      expect(getTotalPages(45)).toBe(4);
    });

    it('supports custom pageSize', () => {
      expect(getTotalPages(10, 5)).toBe(2);
      expect(getTotalPages(11, 5)).toBe(3);
    });
  });

  describe('parsePageParam', () => {
    it('falls back to 1 for missing or empty param', () => {
      expect(parsePageParam(null, 5)).toBe(1);
      expect(parsePageParam(undefined, 5)).toBe(1);
      expect(parsePageParam('', 5)).toBe(1);
      expect(parsePageParam('   ', 5)).toBe(1);
    });

    it('falls back to 1 for non-numeric or invalid input', () => {
      expect(parsePageParam('abc', 5)).toBe(1);
      expect(parsePageParam('page1', 5)).toBe(1);
      expect(parsePageParam('1.5', 5)).toBe(1);
      expect(parsePageParam('NaN', 5)).toBe(1);
    });

    it('falls back to 1 for values < 1', () => {
      expect(parsePageParam('0', 5)).toBe(1);
      expect(parsePageParam('-1', 5)).toBe(1);
      expect(parsePageParam('-99', 5)).toBe(1);
    });

    it('parses valid page numbers within range', () => {
      expect(parsePageParam('1', 5)).toBe(1);
      expect(parsePageParam('2', 5)).toBe(2);
      expect(parsePageParam('5', 5)).toBe(5);
    });

    it('clamps values above the last page to the last page', () => {
      expect(parsePageParam('6', 5)).toBe(5);
      expect(parsePageParam('999', 5)).toBe(5);
      expect(parsePageParam('10', 1)).toBe(1);
    });

    it('handles totalPages <= 0 safely by clamping to 1', () => {
      expect(parsePageParam('10', 0)).toBe(1);
      expect(parsePageParam('10', -2)).toBe(1);
    });
  });

  describe('paginateItems', () => {
    const items = Array.from({ length: 45 }, (_, i) => `item-${i + 1}`);

    it('slices the first page correctly', () => {
      const page1 = paginateItems(items, 1, 12);
      expect(page1).toHaveLength(12);
      expect(page1[0]).toBe('item-1');
      expect(page1[11]).toBe('item-12');
    });

    it('slices intermediate pages correctly', () => {
      const page2 = paginateItems(items, 2, 12);
      expect(page2).toHaveLength(12);
      expect(page2[0]).toBe('item-13');
      expect(page2[11]).toBe('item-24');
    });

    it('slices the final partial page correctly', () => {
      const page4 = paginateItems(items, 4, 12);
      expect(page4).toHaveLength(9);
      expect(page4[0]).toBe('item-37');
      expect(page4[8]).toBe('item-45');
    });

    it('returns empty array if page is beyond items', () => {
      const page5 = paginateItems(items, 5, 12);
      expect(page5).toEqual([]);
    });

    it('handles empty items array', () => {
      expect(paginateItems([], 1, 12)).toEqual([]);
    });
  });

  describe('getPaginationRange', () => {
    it('returns [1] when totalPages <= 1', () => {
      expect(getPaginationRange(1, 1)).toEqual([1]);
      expect(getPaginationRange(1, 0)).toEqual([1]);
    });

    it('returns all pages when totalPages <= 7', () => {
      expect(getPaginationRange(1, 4)).toEqual([1, 2, 3, 4]);
      expect(getPaginationRange(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    it('collapses with ellipsis at the end when near start', () => {
      expect(getPaginationRange(1, 12)).toEqual([1, 2, 3, 4, 5, 'ellipsis', 12]);
      expect(getPaginationRange(4, 12)).toEqual([1, 2, 3, 4, 5, 'ellipsis', 12]);
    });

    it('collapses with ellipsis at start and end when in middle', () => {
      // Prompt example: 1 … 4 5 6 … 12
      expect(getPaginationRange(5, 12)).toEqual([1, 'ellipsis', 4, 5, 6, 'ellipsis', 12]);
      expect(getPaginationRange(6, 12)).toEqual([1, 'ellipsis', 5, 6, 7, 'ellipsis', 12]);
      expect(getPaginationRange(8, 12)).toEqual([1, 'ellipsis', 7, 8, 9, 'ellipsis', 12]);
    });

    it('collapses with ellipsis at start when near end', () => {
      expect(getPaginationRange(9, 12)).toEqual([1, 'ellipsis', 8, 9, 10, 11, 12]);
      expect(getPaginationRange(12, 12)).toEqual([1, 'ellipsis', 8, 9, 10, 11, 12]);
    });
  });

  describe('buildPageUrl', () => {
    it('adds page parameter to clean pathname', () => {
      expect(buildPageUrl('/fr/parfums', '', 2)).toBe('/fr/parfums?page=2');
    });

    it('updates existing page parameter', () => {
      expect(buildPageUrl('/fr/parfums', 'page=1', 3)).toBe('/fr/parfums?page=3');
    });

    it('preserves existing filter parameters and only updates page', () => {
      const searchParams = new URLSearchParams('gender=femme&family=Floral&page=1');
      const url = buildPageUrl('/fr/parfums', searchParams, 2);
      expect(url).toBe('/fr/parfums?gender=femme&family=Floral&page=2');
    });

    it('works when searchParams object has toString', () => {
      const searchParams = {
        toString: () => 'sort=price-asc',
      };
      expect(buildPageUrl('/ar/parfums', searchParams, 4)).toBe('/ar/parfums?sort=price-asc&page=4');
    });
  });
});
