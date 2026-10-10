'use client';

import { ProductImage } from '@/components/ProductImage';
import Link from 'next/link';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

import { useReveal } from '@/components/motion/useReveal';
import { formatFamily, formatPrice } from '@/lib/format';
import type { SignatureProduct } from '@/lib/home/signatures';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionary';
import { interpolate } from '@/lib/i18n/dictionary';
import { localePath } from '@/lib/i18n/routing';

/**
 * ══════════════════════════════════════════════════════════════
 *   LES SIGNATURES — LA SÉQUENCE
 * ══════════════════════════════════════════════════════════════
 *
 * Scène épinglée (sticky) présentant les parfums signatures un à un.
 * - Moitié gauche (≤ 46%) : bloc texte ancré de manière stable sous « Les signatures ».
 * - Moitié droite (≥ 50%) : photo du produit en object-contain, centrée verticalement,
 *   avec fondu doux sur les bords gauche et droit via mask-image.
 */

const PRODUCT_CONFIGS: Record<
  string,
  {
    opacity?: number;
    brightness?: number;
    contrast?: number;
    saturate?: number;
    fadeEdge?: string;
  }
> = {
  'burberry-my-burberry-eau-de-parfum': {
    opacity: 0.72,
    fadeEdge: 'var(--signature-fade-edge, 12%)',
  },
  'givenchy-gentleman-society-ambree': {
    opacity: 0.72,
    fadeEdge: 'var(--signature-fade-edge, 12%)',
  },
  'christian-dior-dior-sauvage-elixir-100ml': {
    opacity: 0.72,
    fadeEdge: 'var(--signature-fade-edge, 12%)',
  },
  'christian-dior-dior-sauvage-le-parfum': {
    opacity: 0.72,
    fadeEdge: 'var(--signature-fade-edge, 12%)',
  },
  'valentino-donna-born-in-roma': {
    opacity: 0.72,
    fadeEdge: 'var(--signature-fade-edge, 12%)',
  },
  'prada-paradoxe': {
    opacity: 0.72,
    fadeEdge: 'var(--signature-fade-edge, 12%)',
  },
};

const noSubscribe = () => () => {};
const readReduced = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function SignatureStage({
  products,
  locale,
  dict,
}: {
  products: SignatureProduct[];
  locale: Locale;
  dict: Dictionary;
}) {
  const reduced = useSyncExternalStore(noSubscribe, readReduced, () => false);
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useReveal(sectionRef);

  useEffect(() => {
    if (reduced || products.length < 2) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    let disposed = false;
    let teardown: (() => void) | null = null;

    void (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      if (disposed || !wrapRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const count = products.length;
      const st = ScrollTrigger.create({
        trigger: wrapRef.current,
        start: 'top top',
        end: 'bottom bottom',
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const i = Math.min(count - 1, Math.floor(self.progress * count));
          setActive((prev) => (prev === i ? prev : i));
        },
      });
      ScrollTrigger.refresh();
      teardown = () => st.kill();
    })();

    return () => {
      disposed = true;
      teardown?.();
    };
  }, [reduced, products.length]);

  const s = dict.signature;

  if (products.length === 0) return null;

  const heading = (
    <div className="flex items-baseline justify-between gap-6">
      <h2 id="signatures" className="font-body font-light text-ivory">
        <span className="block overflow-hidden">
          <span
            data-rise
            className="block text-[clamp(1.75rem,3.6vw,2.8rem)] leading-[1.1] tracking-[-0.015em]"
          >
            {s.title}
          </span>
        </span>
      </h2>
      <p
        data-fade
        className="shrink-0 font-ui text-2xs tracking-[0.24em] text-gold/70 uppercase"
      >
        {s.intro}
      </p>
    </div>
  );

  // ── Mode réduit : liste éditoriale ──
  if (reduced) {
    return (
      <section
        ref={sectionRef}
        aria-labelledby="signatures"
        className="border-t border-smoke-2 bg-noir px-6 py-24 md:px-12 md:py-28 lg:px-20"
      >
        <div className="mx-auto max-w-(--container-site)">
          {heading}
          <ol className="mt-8">
            {products.map((product) => (
              <li
                key={product.slug}
                data-universe={product.family}
                data-fade
                className="border-t border-smoke-2 py-14 md:py-16"
              >
                <PanelBody product={product} locale={locale} dict={dict} />
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  // ── Mode complet : la scène épinglée ──
  const current = products[active];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="signatures"
      className="relative border-t border-smoke-2 bg-noir"
    >
      <div ref={wrapRef} style={{ height: `${products.length * 100}vh` }}>
        <div className="sticky top-0 h-svh min-h-[clamp(750px,100svh,980px)] overflow-hidden">
          {/* Calques par slide : ambiance, photo nette fondue à droite, et halo d'univers */}
          {products.map((product, i) => {
            const config = PRODUCT_CONFIGS[product.slug] ?? {
              opacity: 0.72,
              fadeEdge: 'var(--signature-fade-edge, 12%)',
            };
            const isCurrent = i === active;
            const transitionClass = isCurrent
              ? 'opacity-100 transition-opacity duration-700 ease-(--ease-lux)'
              : 'opacity-0 transition-opacity duration-500 ease-(--ease-lux)';

            return (
              <div
                key={product.slug}
                data-universe={product.family}
                aria-hidden="true"
                className={`absolute inset-0 pointer-events-none ${transitionClass}`}
                style={{ opacity: isCurrent ? 1 : 0 }}
              >
                {/* 1. Calque d'ambiance flouté en fond */}
                {product.image && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                      className="absolute inset-0 h-full w-full scale-115 opacity-20"
                      style={{
                        filter: 'blur(56px) brightness(0.32) saturate(1.2)',
                      }}
                    >
                      <ProductImage
                        fallback="none"
                        src={product.image.url}
                        srcSet={product.image.srcset ?? undefined}
                        sizes="100vw"
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'radial-gradient(65% 55% at 65% 42%, var(--universe-glow) 0%, transparent 72%)',
                      }}
                    />
                    <div className="absolute inset-0 bg-noir/45" />
                  </div>
                )}

                {/* 2. Photo du produit nette, À DROITE (réduite de 20%, fondu gauche et droite) */}
                {product.image && (
                  <div className="absolute inset-y-0 right-0 w-full lg:w-[50%] flex items-center justify-center lg:justify-end px-6 md:px-12 lg:px-20 pointer-events-none">
                    <div
                      className="relative w-[288px] h-[288px] sm:w-[374px] sm:h-[374px] md:w-[442px] md:h-[442px] lg:w-[500px] lg:h-[500px] max-h-[70vh] max-w-[85vw] flex items-center justify-center origin-center"
                      style={{
                        transformOrigin: 'center',
                        WebkitMaskImage: `linear-gradient(to right, transparent 0%, #000 ${config.fadeEdge ?? 'var(--signature-fade-edge, 12%)'}, #000 calc(100% - ${config.fadeEdge ?? 'var(--signature-fade-edge, 12%)'}), transparent 100%)`,
                        maskImage: `linear-gradient(to right, transparent 0%, #000 ${config.fadeEdge ?? 'var(--signature-fade-edge, 12%)'}, #000 calc(100% - ${config.fadeEdge ?? 'var(--signature-fade-edge, 12%)'}), transparent 100%)`,
                        opacity: `var(--signature-img-opacity, ${config.opacity ?? 0.72})`,
                        filter:
                          config.brightness !== undefined && config.brightness !== 1
                            ? `brightness(var(--signature-img-brightness, ${config.brightness})) contrast(${config.contrast ?? 1.05}) saturate(${config.saturate ?? 0.9})`
                            : undefined,
                      }}
                    >
                      <ProductImage
                        fallback="none"
                        src={product.image.url}
                        srcSet={product.image.srcset ?? undefined}
                        sizes="(max-width: 768px) 70vw, 500px"
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-contain select-none"
                      />
                    </div>
                  </div>
                )}

                {/* 3. Dégradé sombre à gauche derrière le texte uniquement */}
                <div
                  className="absolute inset-y-0 left-0 w-full lg:w-[58%] pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to right, rgba(26, 18, 15, 0.95) 0%, rgba(26, 18, 15, 0.82) 48%, rgba(26, 18, 15, 0.3) 78%, transparent 100%)',
                  }}
                />
              </div>
            );
          })}

          {/* Contenu textuel principal : z-10 opaque au-dessus des calques d'image */}
          <div
            data-universe={current.family}
            className="relative z-10 mx-auto flex h-full max-w-(--container-site) flex-col justify-between px-6 py-16 md:px-12 md:py-20 lg:px-20"
          >
            {heading}

            {/* Zone de contenu textuel des slides : ancrage stable sous « Les signatures » avec ≥ 32px */}
            <div className="relative flex-1">
              {products.map((product, i) => (
                <div
                  key={product.slug}
                  inert={i !== active ? true : undefined}
                  className="absolute inset-0 flex flex-col justify-start pt-8 lg:pt-10 transition-opacity duration-500 ease-(--ease-lux)"
                  style={{ opacity: i === active ? 1 : 0 }}
                >
                  <PanelBody product={product} locale={locale} dict={dict} />
                </div>
              ))}
            </div>

            <div className="flex items-center gap-5">
              <span className="font-ui text-2xs tracking-[0.22em] text-ivory/58 tabular-nums">
                {interpolate(s.of, {
                  current: active + 1,
                  total: products.length,
                })}
              </span>
              <span
                aria-hidden="true"
                className="relative h-px flex-1 overflow-hidden bg-smoke-2"
              >
                <span
                  className="absolute inset-y-0 left-0 w-full origin-left bg-[var(--universe-accent)] transition-transform duration-[900ms] ease-(--ease-lux)"
                  style={{
                    transform: `scaleX(${(active + 1) / products.length})`,
                  }}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PanelBody({
  product,
  locale,
  dict,
}: {
  product: SignatureProduct;
  locale: Locale;
  dict: Dictionary;
}) {
  const s = dict.signature;
  return (
    <div className="w-full max-w-xl lg:max-w-[46%]">
      <p className="font-ui text-2xs tracking-[0.24em] text-gold uppercase">
        {product.brand}
      </p>

      <p className="mt-6 font-body font-light text-ivory">
        <span className="block text-[clamp(2.3rem,6vw,4.8rem)] leading-[1.04] tracking-[-0.02em]">
          {product.name}
        </span>
      </p>

      <p className="mt-5 font-body text-lg text-ivory/65">
        <span>{formatFamily(product.family, dict)}</span>
        {product.notes && product.notes.length > 0 && (
          <>
            <span className="mx-3 text-ivory/58">·</span>
            <span className="text-ivory/55">{product.notes.join(', ')}</span>
          </>
        )}
        <span className="mx-3 text-ivory/58">·</span>
        <span className="text-ivory/90 font-medium">
          {formatPrice({ amount: product.priceFrom, currency: 'DZD' }, locale)}
        </span>
      </p>

      <Link
        href={localePath(locale, `/parfums/${product.slug}`)}
        className="ds-tap group relative mt-8 inline-flex pb-1 font-ui text-2xs tracking-[0.2em] text-ivory/85 uppercase transition-colors hover:text-[var(--universe-light)]"
      >
        {s.discover}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-100 bg-[var(--universe-accent)] transition-transform duration-500 ease-(--ease-lux) group-hover:scale-x-0"
        />
      </Link>
    </div>
  );
}
