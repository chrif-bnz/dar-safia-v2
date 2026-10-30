'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

import { useI18n } from '@/components/i18n/I18nProvider';
import { localePath } from '@/lib/i18n/routing';

import { useCart } from './CartProvider';

/**
 * Déclencheur du panier, avec compteur.
 *
 * Le compteur n'est rendu qu'après hydratation : afficher 0 au rendu serveur
 * puis 3 au montage provoquerait une divergence d'hydratation.
 */
export function CartButton() {
  const { count, hydrated } = useCart();
  const { locale, dict, plural } = useI18n();
  const badge = useRef<HTMLSpanElement>(null);
  const previous = useRef<number | null>(null);

  // Petit rebond du badge quand la quantité change (ajout ou suppression).
  useEffect(() => {
    if (!hydrated) return;
    const before = previous.current;
    previous.current = count;
    if (before === null || before === count) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    badge.current?.animate(
      [
        { transform: 'scale(1)' },
        { transform: 'scale(1.45)', offset: 0.35 },
        { transform: 'scale(0.9)', offset: 0.65 },
        { transform: 'scale(1)' },
      ],
      { duration: 420, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
    );
  }, [count, hydrated]);

  return (
    <Link
      href={localePath(locale, '/panier')}
      aria-label={
        hydrated && count > 0
          ? plural(dict.nav.cartWithCount, count)
          : dict.nav.cart
      }
      className="relative flex size-11 items-center justify-center rounded-xs text-ivory/75 transition-colors hover:text-gold"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>

      {hydrated && count > 0 && (
        <span ref={badge} className="absolute -top-0.5 -end-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-gold px-1 text-3xs font-bold text-noir tabular-nums">
          {count}
        </span>
      )}
    </Link>
  );
}
