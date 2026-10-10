'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { usePrefersReducedMotion } from '@/components/motion/usePrefersReducedMotion';
import { useReveal } from '@/components/motion/useReveal';
import type { Dictionary } from '@/lib/i18n/dictionary';
import { interpolate } from '@/lib/i18n/dictionary';
import { TESTIMONIALS, type Testimonial } from '@/lib/home/testimonials';

/**
 * ══════════════════════════════════════════════════════════════
 *   LES VOIX — TÉMOIGNAGES
 * ══════════════════════════════════════════════════════════════
 *
 * Une scène, pas une grille. UN témoignage à la fois, très grand, révélé ligne
 * par ligne derrière un masque (SplitText) ; le suivant arrive quand le filet
 * d'or en bas a fini sa course. Les noms servent de navigation, le filet de
 * minuteur : une seule barre dit « où l'on en est » et « quand ça change ».
 *
 * Contrôles : flèches, noms cliquables, balayage au doigt, flèches du clavier.
 * L'avance automatique s'arrête au survol, au focus, quand l'onglet est caché
 * et dès que la personne agit elle-même — on ne vole jamais la lecture.
 *
 * Contenu : les mots réels de clients, repris de l'ancien site, jamais traduits
 * (`lang="fr"` sur la citation) — voir `lib/home/testimonials.ts`.
 *
 * Mouvement réduit : aucune animation, aucune avance — la liste complète,
 * posée, lisible.
 */

const INTERVAL = 7.5; // secondes par témoignage
const EASE = 'cubic-bezier(0.76, 0, 0.24, 1)';

export function Voices({ dict }: { dict: Dictionary }) {
  const reduced = usePrefersReducedMotion();
  if (TESTIMONIALS.length === 0) return null;
  return reduced ? <VoicesStatic dict={dict} /> : <VoicesStage dict={dict} />;
}

/** Version posée : toutes les voix, sans mouvement. */
function VoicesStatic({ dict }: { dict: Dictionary }) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const v = dict.voices;

  return (
    <section
      ref={ref}
      aria-label={v.region}
      className="border-t border-gold/20 bg-noir px-6 py-24 md:px-12 md:py-32 lg:px-20"
    >
      <div className="mx-auto max-w-(--container-site)">
        <h2 className="font-body text-[clamp(1.5rem,2.8vw,2.2rem)] leading-[1.15] font-light text-ivory/80">
          {v.title}
        </h2>
        <div className="mt-14 grid gap-x-12 gap-y-16 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <figure key={`${t.name}-${t.city}`}>
              <blockquote
                lang="fr"
                className="font-body text-[clamp(1.3rem,2vw,1.7rem)] leading-[1.5] text-ivory/85"
              >
                {t.quote}
              </blockquote>
              <Caption t={t} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Caption({ t }: { t: Testimonial }) {
  return (
    <figcaption className="mt-6 flex items-center gap-3 font-ui text-2xs tracking-[0.14em] text-ivory/70 uppercase">
      <span className="text-gold-light">{t.name}</span>
      <span aria-hidden="true" className="h-px w-6 bg-gold/40" />
      <span>{t.city}</span>
    </figcaption>
  );
}

type Splitter = { lines: Element[]; revert: () => void };

function VoicesStage({ dict }: { dict: Dictionary }) {
  const v = dict.voices;
  const total = TESTIMONIALS.length;
  const [active, setActive] = useState(0);

  const rootRef = useRef<HTMLElement>(null);
  const quoteRefs = useRef<(HTMLQuoteElement | null)[]>([]);
  const capRefs = useRef<(HTMLElement | null)[]>([]);
  const barRef = useRef<HTMLSpanElement>(null);
  const goRef = useRef<(to: number, manual?: boolean) => void>(() => {});
  const activeRef = useRef(0);

  // ── Orchestration ──────────────────────────────────────────
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let disposed = false;
    let teardown: (() => void) | null = null;
    const inner: { fn: (() => void) | null } = { fn: null };

    void (async () => {
      const [{ gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
        import('gsap/SplitText'),
      ]);
      if (disposed || !rootRef.current) return;
      gsap.registerPlugin(ScrollTrigger, SplitText);

      const ctx = gsap.context(() => {
        const quotes = quoteRefs.current.filter((q): q is HTMLQuoteElement => Boolean(q));
        const caps = capRefs.current.filter((c): c is HTMLElement => Boolean(c));

        // Chaque citation est découpée en lignes masquées : la ligne monte
        // depuis sous son masque, elle ne « fond » pas.
        const splits: Splitter[] = quotes.map(
          (q) => SplitText.create(q, { type: 'lines', mask: 'lines', autoSplit: true }) as Splitter
        );

        // État de départ : seul le premier est là, mais pas encore révélé.
        quotes.forEach((q, i) => gsap.set(q, { autoAlpha: i === 0 ? 1 : 0 }));
        caps.forEach((c, i) => gsap.set(c, { autoAlpha: i === 0 ? 1 : 0 }));
        gsap.set(splits[0].lines, { yPercent: 108 });
        gsap.set(caps[0], { y: 14, autoAlpha: 0 });

        const bar = barRef.current;
        let timer: gsap.core.Tween | null = null;
        let hovering = false;
        let started = false;

        const runTimer = () => {
          timer?.kill();
          if (!bar) return;
          gsap.set(bar, { scaleX: 0 });
          timer = gsap.to(bar, {
            scaleX: 1,
            duration: INTERVAL,
            ease: 'none',
            onComplete: () => goRef.current((activeRef.current + 1) % total),
          });
          if (hovering || document.hidden) timer.pause();
        };

        const show = (index: number, direction: 1 | -1) => {
          const incoming = splits[index].lines;
          gsap.fromTo(
            incoming,
            { yPercent: 108 * direction },
            { yPercent: 0, duration: 1.15, stagger: 0.09, ease: EASE, overwrite: true }
          );
          gsap.fromTo(
            caps[index],
            { y: 14 * direction, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.9, delay: 0.35, ease: EASE, overwrite: true }
          );
        };

        const go = (to: number, manual = false) => {
          if (to === activeRef.current || !started) return;
          const from = activeRef.current;
          const direction: 1 | -1 = to > from || (from === total - 1 && to === 0) ? 1 : -1;
          activeRef.current = to;
          setActive(to);

          // Sortie : les lignes sortent de l'autre côté de leur masque.
          gsap.to(splits[from].lines, {
            yPercent: -108 * direction,
            duration: 0.6,
            stagger: 0.04,
            ease: 'power3.in',
            overwrite: true,
            onComplete: () => {
              gsap.set(quotes[from], { autoAlpha: 0 });
            },
          });
          gsap.to(caps[from], { autoAlpha: 0, y: -10 * direction, duration: 0.4, overwrite: true });

          // Entrée, juste après le départ de la précédente.
          gsap.delayedCall(0.5, () => {
            if (activeRef.current !== to) return;
            gsap.set(quotes[to], { autoAlpha: 1 });
            show(to, direction);
          });
          runTimer();
          if (manual) hovering = false;
        };
        goRef.current = go;

        // Entrée de la section : le premier témoignage se lève quand on arrive.
        ScrollTrigger.create({
          trigger: root,
          start: 'top 70%',
          once: true,
          onEnter: () => {
            started = true;
            show(0, 1);
            runTimer();
          },
        });

        // Le grand guillemet dérive plus lentement que la page : un plan lointain.
        const glyph = root.querySelector('[data-glyph]');
        if (glyph) {
          gsap.fromTo(
            glyph,
            { yPercent: -12 },
            {
              yPercent: 14,
              ease: 'none',
              scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true },
            }
          );
        }

        // La lueur suit le témoignage : un bordeaux qui respire, jamais un aplat.
        const glow = root.querySelector('[data-glow]');
        if (glow) {
          gsap.to(glow, {
            xPercent: 8,
            yPercent: -6,
            duration: 14,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          });
        }

        // Le minuteur s'arrête quand on lit (survol, focus) ou qu'on quitte l'onglet.
        const pause = () => {
          hovering = true;
          timer?.pause();
        };
        const resume = () => {
          hovering = false;
          if (!document.hidden) timer?.resume();
        };
        const onVisibility = () => {
          if (document.hidden) timer?.pause();
          else if (!hovering) timer?.resume();
        };
        root.addEventListener('pointerenter', pause);
        root.addEventListener('pointerleave', resume);
        root.addEventListener('focusin', pause);
        root.addEventListener('focusout', resume);
        document.addEventListener('visibilitychange', onVisibility);

        // Balayage au doigt.
        let startX = 0;
        let dragging = false;
        const stage = root.querySelector<HTMLElement>('[data-stage]');
        const down = (e: PointerEvent) => {
          if (e.pointerType === 'mouse') return;
          dragging = true;
          startX = e.clientX;
        };
        const up = (e: PointerEvent) => {
          if (!dragging) return;
          dragging = false;
          const dx = e.clientX - startX;
          if (Math.abs(dx) < 48) return;
          const rtl = document.documentElement.dir === 'rtl';
          const forward = rtl ? dx > 0 : dx < 0;
          go((activeRef.current + (forward ? 1 : total - 1)) % total, true);
        };
        stage?.addEventListener('pointerdown', down);
        stage?.addEventListener('pointerup', up);
        stage?.addEventListener('pointercancel', () => (dragging = false));

        inner.fn = () => {
          root.removeEventListener('pointerenter', pause);
          root.removeEventListener('pointerleave', resume);
          root.removeEventListener('focusin', pause);
          root.removeEventListener('focusout', resume);
          document.removeEventListener('visibilitychange', onVisibility);
          stage?.removeEventListener('pointerdown', down);
          stage?.removeEventListener('pointerup', up);
          timer?.kill();
          splits.forEach((s) => s.revert());
        };
      }, root);

      teardown = () => {
        inner.fn?.();
        ctx.revert();
      };
    })();

    return () => {
      disposed = true;
      teardown?.();
      goRef.current = () => {};
    };
  }, [total]);

  const step = useCallback(
    (delta: number) => goRef.current((activeRef.current + delta + total) % total, true),
    [total]
  );

  const onKey = (e: React.KeyboardEvent) => {
    const rtl = document.documentElement.dir === 'rtl';
    if (e.key === 'ArrowRight') step(rtl ? -1 : 1);
    else if (e.key === 'ArrowLeft') step(rtl ? 1 : -1);
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label={v.region}
      onKeyDown={onKey}
      className="relative overflow-hidden border-t border-gold/20 bg-noir px-6 py-28 md:px-12 md:py-40 lg:px-20"
    >
      {/* Lumière bordeaux, très lente : elle se déplace derrière la citation. */}
      <div
        aria-hidden="true"
        data-glow
        className="pointer-events-none absolute -inset-[10%]"
        style={{
          background:
            'radial-gradient(48% 46% at 68% 44%, rgba(79,26,33,0.85) 0%, transparent 70%),' +
            'radial-gradient(34% 34% at 12% 88%, rgba(184,134,43,0.10) 0%, transparent 70%)',
        }}
      />
      {/* Le grand guillemet : un repère typographique, à peine visible. */}
      <span
        aria-hidden="true"
        data-glyph
        className="pointer-events-none absolute start-[4%] top-[6%] font-display text-[clamp(12rem,30vw,26rem)] leading-none text-gold/[0.07] select-none"
      >
        “
      </span>

      <div className="relative mx-auto max-w-(--container-site)">
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-body text-[clamp(1.5rem,2.8vw,2.2rem)] leading-[1.15] font-light text-ivory/80">
            {v.title}
          </h2>
          <div className="flex items-center gap-5">
            <span
              aria-hidden="true"
              className="font-ui text-2xs tracking-[0.2em] text-ivory/60 tabular-nums"
            >
              <span className="text-gold-light">{pad(active + 1)}</span> / {pad(total)}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label={v.prev}
                className="ds-btn-ghost flex size-11 items-center justify-center rounded-full border border-gold/40 text-ivory transition-colors hover:text-noir"
              >
                <Arrow flip />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label={v.next}
                className="ds-btn-ghost flex size-11 items-center justify-center rounded-full border border-gold/40 text-ivory transition-colors hover:text-noir"
              >
                <Arrow />
              </button>
            </div>
          </div>
        </div>

        {/* La scène : toutes les citations sont dans le DOM (lecteurs d'écran,
            SEO), une seule est visible. La hauteur est celle de la plus longue,
            pour que rien ne saute au changement. */}
        <div data-stage className="relative mt-14 md:mt-20" style={{ touchAction: 'pan-y' }}>
          <div className="grid">
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={`${t.name}-${t.city}`}
                aria-hidden={i !== active}
                aria-roledescription="slide"
                aria-label={interpolate(v.goTo, { n: i + 1, total })}
                className="col-start-1 row-start-1 max-w-[62rem]"
              >
                <blockquote
                  ref={(el) => {
                    quoteRefs.current[i] = el;
                  }}
                  lang="fr"
                  className="font-body text-[clamp(1.6rem,3.5vw,3.1rem)] leading-[1.28] font-light tracking-[-0.01em] text-ivory"
                >
                  {t.quote}
                </blockquote>
                <figcaption
                  ref={(el) => {
                    capRefs.current[i] = el;
                  }}
                  className="mt-8 flex items-center gap-4 font-ui text-2xs tracking-[0.18em] text-ivory/75 uppercase"
                >
                  <span className="text-gold-light">{t.name}</span>
                  <span aria-hidden="true" className="h-px w-10 bg-gold/50" />
                  <span>{t.city}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Minuteur et navigation en une seule barre. */}
        <div className="mt-16 md:mt-24">
          <div aria-hidden="true" className="relative h-px w-full bg-ivory/15">
            <span
              ref={barRef}
              className="absolute inset-0 origin-left bg-gold rtl:origin-right"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
            {TESTIMONIALS.map((t, i) => (
              <li key={`${t.name}-${t.city}-nav`}>
                <button
                  type="button"
                  onClick={() => goRef.current(i, true)}
                  aria-label={interpolate(v.goTo, { n: i + 1, total })}
                  aria-current={i === active ? 'true' : undefined}
                  className="ds-tap font-ui text-2xs tracking-[0.16em] text-ivory/50 uppercase transition-colors duration-500 hover:text-gold-light aria-[current=true]:text-ivory"
                >
                  {t.name}
                  <span className="ms-2 text-ivory/40">{t.city}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Arrow({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`${flip ? 'rotate-180' : ''} rtl:-scale-x-100`}
    >
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}
