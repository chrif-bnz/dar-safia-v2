'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import {
  buildPageUrl,
  getPaginationRange,
} from '@/lib/catalog/pagination';
import type { Dictionary } from '@/lib/i18n/dictionary';
import { interpolate } from '@/lib/i18n/dictionary';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  dict: Dictionary;
  onPageChange?: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  dict,
  onPageChange,
  className = '',
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const p = dict.catalog.pagination;
  const range = getPaginationRange(currentPage, totalPages);

  return (
    <nav
      aria-label={p.label}
      className={`ds-pagination ${className}`.trim()}
    >
      {currentPage > 1 ? (
        <Link
          href={buildPageUrl(pathname, searchParams, currentPage - 1)}
          className="ds-pagination__nav"
          scroll={false}
          onClick={() => onPageChange?.(currentPage - 1)}
        >
          {p.previous}
        </Link>
      ) : (
        <span aria-disabled="true" className="ds-pagination__nav">
          {p.previous}
        </span>
      )}

      <ul className="ds-pagination__list">
        {range.map((item, index) => (
          <li
            key={typeof item === 'number' ? `page-${item}` : `ellipsis-${index}`}
            className="ds-pagination__item"
          >
            {item === 'ellipsis' ? (
              <span aria-hidden="true" className="ds-pagination__ellipsis">
                …
              </span>
            ) : item === currentPage ? (
              <Link
                href={buildPageUrl(pathname, searchParams, item)}
                aria-current="page"
                aria-label={interpolate(p.page, { page: item })}
                className="ds-pagination__link"
                scroll={false}
              >
                {item}
              </Link>
            ) : (
              <Link
                href={buildPageUrl(pathname, searchParams, item)}
                aria-label={interpolate(p.page, { page: item })}
                className="ds-pagination__link"
                scroll={false}
                onClick={() => onPageChange?.(item)}
              >
                {item}
              </Link>
            )}
          </li>
        ))}
      </ul>

      {currentPage < totalPages ? (
        <Link
          href={buildPageUrl(pathname, searchParams, currentPage + 1)}
          className="ds-pagination__nav"
          scroll={false}
          onClick={() => onPageChange?.(currentPage + 1)}
        >
          {p.next}
        </Link>
      ) : (
        <span aria-disabled="true" className="ds-pagination__nav">
          {p.next}
        </span>
      )}
    </nav>
  );
}
