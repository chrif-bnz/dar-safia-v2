'use client';

import { useLayoutEffect, useRef } from 'react';

import { ProductCard, type ProductCardData } from '@/components/ProductCard';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionary';

import type { ShopProduct } from './shop-product';

/** `ShopProduct` (forme aplatie côté client) → la forme que `ProductCard` attend. */
function toCardData(product: ShopProduct): ProductCardData {
  return {
    slug: product.slug,
    name: product.name,
    gender: product.gender,
    family: product.family,
    badge: product.badge,
    brand: product.brand,
    images: product.image ? [product.image] : [],
    notes: product.headlineNote ? [{ note: { name: product.headlineNote } }] : [],
    variants: [
      {
        id: product.slug,
        volumeMl: product.volumeMl,
        price: { amount: product.priceFrom, currency: 'DZD' },
        stock: 0,
      },
    ],
  };
}

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

/**
 * Grille des parfums.
 *
 * Mouvement (transform + opacity seulement) :
 *   - première mise en ordre mélangé, ou nouveau mélange : les cartes
 *     glissent à leur nouvelle place (FLIP, 500 ms) ;
 *   - cartes qui apparaissent (premier ordre mélangé, filtre) : fondu +
 *     translateY 20 px, 600 ms, décalage de 40 ms.
 * Sous `prefers-reduced-motion`, aucun mouvement.
 *
 * L'inclinaison 3D au survol (3° max) n'est active qu'à la souris.
 */
export function PerfumeGrid({
  products,
  locale,
  dict,
  shuffleKey,
}: {
  products: ShopProduct[];
  locale: Locale;
  dict: Dictionary;
  /** Change à chaque (re)mélange ; `null` tant que l'ordre d'origine est affiché. */
  shuffleKey: number | null;
}) {
  const gridRef = useRef<HTMLDivElement>(null);
  const rects = useRef<Map<string, DOMRect>>(new Map());
  const lastKey = useRef<number | null>(null);

  // Avant la peinture : FLIP si l'ordre vient de changer, cascade pour les entrants.
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cards = [...grid.querySelectorAll<HTMLElement>('[data-slug]')];

    // Premier passage, ordre d'origine : on mémorise seulement les positions.
    // L'entrée en cascade attend l'ordre mélangé, pour ne pas jouer deux fois.
    if (rects.current.size === 0 && shuffleKey === null) {
      rects.current = new Map(cards.map((c) => [c.dataset.slug as string, c.getBoundingClientRect()]));
      return;
    }

    const reordered = shuffleKey !== lastKey.current && lastKey.current !== undefined;
    const first = lastKey.current === null && shuffleKey !== null;
    lastKey.current = shuffleKey;

    if (!reduced) {
      let n = 0;
      cards.forEach((card) => {
        const slug = card.dataset.slug as string;
        const before = rects.current.get(slug);
        const after = card.getBoundingClientRect();

        if (before && reordered && !first) {
          // FLIP : inverser puis rejouer vers la place réelle.
          const dx = before.left - after.left;
          const dy = before.top - after.top;
          if (dx || dy) {
            card.animate(
              [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'translate(0, 0)' }],
              { duration: 500, easing: EASE }
            );
          }
        } else if (first || !before) {
          // Entrée en cascade.
          card.animate(
            [
              { opacity: 0, transform: 'translateY(20px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ],
            { duration: 600, delay: Math.min(n, 24) * 40, easing: EASE, fill: 'backwards' }
          );
          n++;
        }
      });
    }

    // Positions de référence pour le prochain changement.
    rects.current = new Map(cards.map((c) => [c.dataset.slug as string, c.getBoundingClientRect()]));
  });

  // Inclinaison 3D légère : souris seulement, une écriture par image.
  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    const card = event.currentTarget;
    const r = card.getBoundingClientRect();
    const px = (event.clientX - r.left) / r.width - 0.5;
    const py = (event.clientY - r.top) / r.height - 0.5;
    card.style.setProperty('--ry', `${(px * 6).toFixed(2)}deg`);
    card.style.setProperty('--rx', `${(-py * 6).toFixed(2)}deg`);
  };
  const onLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.removeProperty('--rx');
    event.currentTarget.style.removeProperty('--ry');
  };

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-3 xl:grid-cols-4"
    >
      {products.map((product) => (
        <div
          key={product.slug}
          data-slug={product.slug}
          className="ds-shop-card"
          onPointerMove={onMove}
          onPointerLeave={onLeave}
        >
          <ProductCard product={toCardData(product)} locale={locale} dict={dict} />
          <span aria-hidden="true" className="ds-shop-card__ring" />
        </div>
      ))}
    </div>
  );
}
