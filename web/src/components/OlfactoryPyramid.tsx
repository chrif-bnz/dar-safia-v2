'use client';

import { useEffect, useRef, useState } from 'react';
import type { NoteLayer, ProductNote } from '@/lib/catalog';
import type { Dictionary } from '@/lib/i18n/dictionary';

/**
 * Pyramide olfactive redessinée en trois niveaux progressifs (tête, cœur, fond)
 * avec axe vertical doré et animations d'apparition au défilement.
 */
export function OlfactoryPyramid({
  notes,
  dict,
}: {
  notes: ProductNote[];
  dict: Dictionary;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsInView(true);
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const layers: { key: NoteLayer; label: string; caption: string; baseDelay: number }[] = [
    { key: 'top', label: dict.product.pyramid.top, caption: dict.product.pyramid.topCaption, baseDelay: 100 },
    { key: 'heart', label: dict.product.pyramid.heart, caption: dict.product.pyramid.heartCaption, baseDelay: 280 },
    { key: 'base', label: dict.product.pyramid.base, caption: dict.product.pyramid.baseCaption, baseDelay: 460 },
  ];

  const byLayer = (layer: NoteLayer) =>
    notes.filter((n) => n.layer === layer).sort((a, b) => a.position - b.position);

  return (
    <section aria-labelledby="pyramide" className="mt-14">
      <h2 id="pyramide" className="font-serif text-xl text-ivory">
        {dict.product.pyramidTitle}
      </h2>

      <div
        ref={containerRef}
        data-in-view={isInView ? 'true' : undefined}
        className="ds-pyramid-container mt-6"
      >
        {/* Fil doré vertical (axe central de la pyramide) */}
        <div aria-hidden="true" className="ds-pyramid-axis" />

        <dl className="w-full flex flex-col items-center gap-4">
          {layers.map(({ key, label, caption, baseDelay }) => {
            const layerNotes = byLayer(key);
            if (layerNotes.length === 0) return null;

            return (
              <div
                key={key}
                data-layer={key}
                className="ds-pyramid-tier"
              >
                <dt className="ds-pyramid-tier-header">
                  <span className="block text-3xs font-semibold tracking-(--tracking-eyebrow) text-[var(--universe-light)] uppercase">
                    {label}
                  </span>
                  <span className="mt-1 block text-2xs text-ivory/58">{caption}</span>
                </dt>
                <dd className="ds-pyramid-chips">
                  {layerNotes.map(({ note }, noteIndex) => (
                    <span
                      key={note.slug}
                      className="ds-pyramid-chip"
                      style={{
                        '--chip-base-delay': `${baseDelay}ms`,
                        '--chip-idx': noteIndex,
                      } as React.CSSProperties}
                    >
                      {note.name}
                    </span>
                  ))}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

