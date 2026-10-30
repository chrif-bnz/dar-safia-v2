'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';

import { usePrefersReducedMotion } from '@/components/motion/usePrefersReducedMotion';
import type { FragranceFamily } from '@/lib/catalog';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionary';
import { localePath } from '@/lib/i18n/routing';
import { formatFamily, formatPrice } from '@/lib/format';

import {
  CHAPTER_COUNT,
  CHAPTER_SCROLL_VH,
  SCRUB,
  TEXT_IN,
  TEXT_OUT,
  type Layout,
} from './choreography';
import { createFrameState, createRig, qualityFor } from './runtime';

/**
 * ══════════════════════════════════════════════════════════════
 *   LA MAISON — L'EXPÉRIENCE CINÉMATIQUE
 * ══════════════════════════════════════════════════════════════
 *
 *   ScrollTrigger (scrub, calé sur Lenis par SmoothScroll)
 *        └─ timeline maîtresse GSAP
 *             ├─ rig.p : 0 → 5          → flacon, caméra, cible, lumières,
 *             │                            environnement, brume, DOF
 *             │                            (échantillonnés par choreography.ts)
 *             ├─ texte de chaque chapitre (entrée / sortie, qui se chevauchent)
 *             └─ repères de chapitre
 *
 * Le canvas est collé (sticky) dans une piste haute de 5 chapitres : il reste
 * à l'écran tout du long. Rien ne lit `window.scrollY`, rien ne passe par
 * `setState` pendant le défilement.
 *
 * Le texte est celui de la page « La maison » (dictionnaire) : rien d'inventé.
 */

const PerfumeScene = dynamic(() => import('./PerfumeScene'), { ssr: false });

export interface FeaturedProduct {
  slug: string;
  name: string;
  brand: string;
  family: FragranceFamily;
  priceFrom: number;
  description: string;
  concentration?: string;
}

const noSubscribe = () => () => {};

/** Le format se choisit au montage (jamais au rendu serveur) et suit la fenêtre. */
function useLayout(): Layout | null {
  const subscribe = (cb: () => void) => {
    const queries = [window.matchMedia('(min-width: 1024px)'), window.matchMedia('(min-width: 768px)')];
    queries.forEach((q) => q.addEventListener('change', cb));
    return () => queries.forEach((q) => q.removeEventListener('change', cb));
  };
  const snapshot = (): Layout =>
    window.matchMedia('(min-width: 1024px)').matches
      ? 'desktop'
      : window.matchMedia('(min-width: 768px)').matches
        ? 'tablet'
        : 'mobile';
  return useSyncExternalStore(subscribe, snapshot, () => null);
}

const SCROLL_HEIGHT = (vh: number) => `${CHAPTER_COUNT * vh + 100}svh`;

/** Ligne de texte animée par la timeline (`data-line`). */
function Line({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <span data-line className={`block ${className}`}>
      {children}
    </span>
  );
}

const EYEBROW = 'font-ui text-2xs tracking-(--tracking-eyebrow) text-gold uppercase';
const TITLE = 'font-body font-light text-ivory';
const BODY = 'font-body text-ivory/72 leading-[1.6]';

export function PerfumeExperience({
  locale,
  dict,
  product,
}: {
  locale: Locale;
  dict: Dictionary;
  product: FeaturedProduct | null;
}) {
  const a = dict.about;
  const layout = useLayout();
  const reduced = usePrefersReducedMotion();
  const hydrated = useSyncExternalStore(noSubscribe, () => true, () => false);

  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // L'état de scène vit dans des objets mutables, hors de React.
  const rig = useMemo(() => createRig(reduced ? 0.5 : 0), [reduced]);
  const frame = useMemo(() => createFrameState(), []);
  const quality = useMemo(() => qualityFor(layout ?? 'desktop'), [layout]);

  // Le seul état React : ces deux booléens changent une fois, pas à chaque image.
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  // Hors écran, la boucle de rendu s'arrête.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: '150px 0px',
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ── La timeline maîtresse ──
  useEffect(() => {
    const track = trackRef.current;
    if (!track || reduced) return;

    let disposed = false;
    let teardown: (() => void) | null = null;

    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);

      const chapters = gsap.utils.toArray<HTMLElement>('[data-chapter]', track);
      const ticks = gsap.utils.toArray<HTMLElement>('[data-tick]', track);
      const last = CHAPTER_COUNT - 1;

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: track,
          start: 'top top',
          end: 'bottom bottom',
          // `scrub` numérique : la timeline rattrape le défilement (déjà lissé
          // par Lenis) avec un léger retard, ce qui gomme les à-coups.
          scrub: SCRUB,
          invalidateOnRefresh: true,
        },
      });

      // Une seule progression, linéaire : c'est la chorégraphie (spline
      // d'Hermite) qui donne le mouvement, pas un easing par segment.
      tl.to(rig, { p: CHAPTER_COUNT, duration: CHAPTER_COUNT }, 0);

      chapters.forEach((chapter, i) => {
        const lines = chapter.querySelectorAll('[data-line]');
        if (i > 0) {
          tl.fromTo(
            lines,
            { autoAlpha: 0, y: 44, filter: 'blur(10px)' },
            { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.26, stagger: 0.045, ease: 'power2.out' },
            i + TEXT_IN
          );
        }
        if (i < last) {
          tl.to(
            lines,
            { autoAlpha: 0, y: -34, filter: 'blur(8px)', duration: 0.2, stagger: 0.02, ease: 'power2.in' },
            i + TEXT_OUT
          );
        }
      });

      ticks.forEach((tick, i) => {
        if (i > 0) tl.fromTo(tick, { opacity: 0.28, scaleX: 0.35 }, { opacity: 1, scaleX: 1, duration: 0.12 }, i);
        if (i < last) tl.to(tick, { opacity: 0.28, scaleX: 0.35, duration: 0.12 }, i + 0.9);
      });

      teardown = () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    })();

    return () => {
      disposed = true;
      teardown?.();
    };
  }, [rig, reduced]);

  const productHref = product ? localePath(locale, `/parfums/${product.slug}`) : null;
  const details = product
    ? [
        product.brand,
        formatFamily(product.family, dict),
        ...(product.concentration ? [product.concentration] : []),
      ]
    : [];

  // ── Chapitres (le texte est dans le DOM dès le rendu serveur) ──
  const chapters = [
    // 1 — Arrivée
    <div key="arrival" className="flex h-full items-end pb-14 md:pb-20">
      <div className="max-w-2xl">
        <Line className={EYEBROW}>{a.eyebrow}</Line>
        <h1 id="maison-titre" className={`${TITLE} mt-5`}>
          {a.title.map((l) => (
            <Line key={l} className="text-[clamp(2.6rem,7vw,5.5rem)] leading-[1.02] tracking-[-0.02em]">
              {l}
            </Line>
          ))}
        </h1>
        <Line className={`${BODY} mt-7 max-w-[46ch] text-[clamp(1.1rem,1.6vw,1.4rem)]`}>{a.lead}</Line>
      </div>
    </div>,

    // 2 — Le flacon (texte à gauche, le flacon passe à droite)
    <div key="bottle" className="flex h-full items-end pb-14 md:items-center md:pb-0">
      <div className="max-w-xl md:w-5/12">
        <Line className={EYEBROW}>02</Line>
        <h2 className={`${TITLE} mt-5 text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.06] tracking-[-0.015em]`}>
          <Line>{a.stanceTitle}</Line>
        </h2>
        <Line className={`${BODY} mt-6 text-[clamp(1.05rem,1.4vw,1.3rem)]`}>{a.stanceBody}</Line>
        <Line className="mt-6 max-w-xs font-ui text-2xs leading-[1.9] text-ivory/45">{a.stanceAside}</Line>
      </div>
    </div>,

    // 3 — L'essence (texte à droite, le flacon traverse vers la gauche)
    <div key="essence" className="flex h-full items-end pb-14 md:items-center md:justify-end md:pb-0">
      <div className="max-w-xl md:w-5/12">
        <Line className={EYEBROW}>{a.requirementsTitle}</Line>
        {a.requirements.slice(0, 2).map((req, i) => (
          <div key={req.term} className={i === 0 ? 'mt-5' : 'mt-7 md:mt-9'}>
            <Line className={`${TITLE} text-[clamp(1.5rem,2.8vw,2.3rem)] leading-[1.12]`}>{req.term}</Line>
            <Line className={`${BODY} mt-2 text-[clamp(1rem,1.2vw,1.15rem)] text-ivory/62`}>{req.detail}</Line>
          </div>
        ))}
      </div>
    </div>,

    // 4 — Gros plan : presque pas de texte, le produit parle.
    <div key="closeup" className="flex h-full items-end pb-14 md:pb-20">
      <div className="max-w-md">
        <Line className={EYEBROW}>04</Line>
        <Line className={`${TITLE} mt-4 text-[clamp(1.6rem,3vw,2.5rem)] leading-[1.1]`}>
          {a.requirements[2].term}
        </Line>
        <Line className={`${BODY} mt-3 text-[clamp(1rem,1.2vw,1.15rem)] text-ivory/62`}>
          {a.requirements[2].detail}
        </Line>
      </div>
    </div>,

    // 5 — Le produit
    <div key="product" className="flex h-full items-end pb-10 md:pb-14">
      <div className="grid w-full gap-6 md:grid-cols-12 md:items-end md:gap-10">
        <div className="md:col-span-5">
          {product && (
            <>
              <Line className={EYEBROW}>{details.join(' · ')}</Line>
              <h2 className={`${TITLE} mt-3 text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.04] tracking-[-0.015em]`}>
                <Line>{product.name}</Line>
              </h2>
            </>
          )}
        </div>
        <div className="md:col-span-4">
          {product && (
            <Line className={`${BODY} text-[clamp(1rem,1.15vw,1.15rem)] text-ivory/65`}>
              <span className="line-clamp-3">{product.description}</span>
            </Line>
          )}
        </div>
        <div className="flex items-center justify-between gap-6 md:col-span-3 md:flex-col md:items-end md:gap-5">
          {product && (
            <Line className={`${TITLE} text-[clamp(1.4rem,2.2vw,1.9rem)]`}>
              {formatPrice({ amount: product.priceFrom, currency: 'DZD' }, locale)}
            </Line>
          )}
          <Line className="pointer-events-auto">
            <Link
              href={productHref ?? localePath(locale, '/parfums')}
              className="group relative inline-flex pb-1.5 font-ui text-2xs tracking-[0.22em] text-ivory uppercase"
            >
              {product ? dict.signature.discover : a.closingCta}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-100 bg-gold transition-transform duration-500 ease-(--ease-lux) group-hover:scale-x-0"
              />
            </Link>
          </Line>
        </div>
      </div>
    </div>,
  ];

  // ── Mouvement réduit : une image fixe, puis le même texte, posé. ──
  if (reduced) {
    return (
      <section aria-labelledby="maison-titre" className="relative bg-wine">
        <div ref={stageRef} className="relative h-[70svh] overflow-hidden">
          {layout && (
            <PerfumeScene
              rig={rig}
              frame={frame}
              quality={quality}
              reduced
              active={visible}
              onReady={() => setReady(true)}
            />
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-wine transition-opacity duration-700"
            style={{ opacity: ready ? 0 : 1 }}
          />
        </div>
        <p className="sr-only">{a.sceneCaption}</p>
        <div className="mx-auto max-w-(--container-site) space-y-20 px-6 py-20 md:px-12 lg:px-20">
          {chapters.map((c, i) => (
            <div key={i} className="[&_[data-line]]:!opacity-100 [&_[data-line]]:!visible">
              {c}
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={trackRef}
      aria-labelledby="maison-titre"
      className="relative h-(--track-m) bg-wine md:h-(--track-t) lg:h-(--track-d)"
      style={
        {
          '--track-m': SCROLL_HEIGHT(CHAPTER_SCROLL_VH.mobile),
          '--track-t': SCROLL_HEIGHT(CHAPTER_SCROLL_VH.tablet),
          '--track-d': SCROLL_HEIGHT(CHAPTER_SCROLL_VH.desktop),
        } as React.CSSProperties
      }
    >
      <div ref={stageRef} className="sticky top-0 h-svh overflow-hidden bg-wine">
        {/* Le plan 3D (chargé côté client seulement). */}
        <div
          className="absolute inset-0 transition-opacity duration-[1400ms] ease-(--ease-lux)"
          style={{ opacity: ready ? 1 : 0 }}
        >
          {hydrated && layout && (
            <PerfumeScene
              rig={rig}
              frame={frame}
              quality={quality}
              reduced={false}
              active={visible}
              onReady={() => setReady(true)}
            />
          )}
        </div>

        {/* Lisibilité : un voile bordeaux en bas, pas un aplat. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 md:h-2/5"
          style={{
            background:
              'linear-gradient(to top, rgba(29,10,13,0.92) 2%, rgba(61,15,20,0.5) 45%, transparent 100%)',
          }}
        />

        {/* Texte : une couche par chapitre, toutes superposées, pilotées par la timeline. */}
        <div className="pointer-events-none absolute inset-0">
          {chapters.map((c, i) => (
            <div
              key={i}
              data-chapter={i}
              className="absolute inset-0 mx-auto w-full max-w-(--container-site) px-6 md:px-12 lg:px-20"
            >
              <div className={i > 0 ? '[&_[data-line]]:opacity-0 h-full' : 'h-full'}>{c}</div>
            </div>
          ))}
        </div>

        {/* Repères de chapitre, à droite. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-5 hidden -translate-y-1/2 flex-col items-end gap-3 md:flex lg:right-8"
        >
          {Array.from({ length: CHAPTER_COUNT }, (_, i) => (
            <span
              key={i}
              data-tick
              className="block h-px w-8 origin-right bg-gold"
              style={{ opacity: i === 0 ? 1 : 0.28, transform: i === 0 ? undefined : 'scaleX(0.35)' }}
            />
          ))}
        </div>

        <p className="sr-only">{a.sceneCaption}</p>
      </div>
    </section>
  );
}
