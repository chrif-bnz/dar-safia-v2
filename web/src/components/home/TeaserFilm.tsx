'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { usePrefersReducedMotion } from '@/components/motion/usePrefersReducedMotion';
import type { Dictionary } from '@/lib/i18n/dictionary';

/**
 * ══════════════════════════════════════════════════════════════
 *   TEASER — LE FILM DE LA MAISON
 * ══════════════════════════════════════════════════════════════
 *
 * Le teaser du projet a sa propre scène. Il entre CADRÉ, petit, au milieu de
 * la nuit ; le défilement l'ouvre jusqu'au plein cadre (un seul geste, tenu
 * par la position de la page), puis le titre se pose par-dessus.
 *
 * Son : jamais d'autoplay avec le son. Le plan tourne muet quand il est à
 * l'écran, s'arrête quand il en sort ; le son est un choix du visiteur.
 *
 * ⚠️ TEMPORAIRE : le fichier est le plan d'ouverture du hero (le teaser
 * officiel est trop lourd pour le dépôt). Pour le remplacer : déposer le
 * fichier dans `public/video/` et changer ces deux constantes.
 */
const TEASER_SRC = '/video/hero.mp4';
const TEASER_SRC_SMALL = '/video/hero-mobile.mp4';
const TEASER_POSTER = '/poster/teaser.webp';

export function TeaserFilm({ dict }: { dict: Dictionary }) {
  const t = dict.teaser;
  const reduced = usePrefersReducedMotion();

  const trackRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [playing, setPlaying] = useState(false);
  const [sound, setSound] = useState(false);
  const userPaused = useRef(false);

  const play = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    void v.play().catch(() => {});
  }, []);

  // Source adaptée au gabarit, posée avant le premier octet.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.src = window.matchMedia('(max-width: 767px)').matches ? TEASER_SRC_SMALL : TEASER_SRC;
    v.load();
  }, []);

  // Il tourne tant qu'il est visible (muet), sauf si le visiteur l'a arrêté.
  useEffect(() => {
    const v = videoRef.current;
    const track = trackRef.current;
    if (!v || !track) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!userPaused.current && !reduced) play();
        } else {
          v.pause();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(track);
    return () => io.disconnect();
  }, [play, reduced]);

  // L'ouverture du cadre et l'entrée du titre.
  useEffect(() => {
    const track = trackRef.current;
    const frame = frameRef.current;
    if (!track || !frame || reduced) return;

    let disposed = false;
    let teardown: (() => void) | null = null;

    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();
        mm.add(
          { wide: '(min-width: 768px)', narrow: '(max-width: 767px)' },
          (c) => {
            const wide = Boolean(c.conditions?.wide);
            const tl = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: track,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.9,
              },
            });
            // Le cadre s'ouvre sur les 55 premiers % de la piste, puis tient.
            tl.fromTo(
              frame,
              { clipPath: wide ? 'inset(16% 14% 16% 14%)' : 'inset(24% 7% 24% 7%)' },
              { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.55, ease: 'power2.inOut' },
              0
            )
              .fromTo('[data-teaser-video]', { scale: 1.22 }, { scale: 1, duration: 0.7 }, 0)
              .fromTo(
                '[data-teaser-line]',
                { yPercent: 110 },
                { yPercent: 0, duration: 0.18, stagger: 0.05, ease: 'power3.out' },
                0.58
              )
              .fromTo(
                '[data-teaser-fade]',
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.16, stagger: 0.04, ease: 'power2.out' },
                0.68
              );
          }
        );
      }, track);

      teardown = () => ctx.revert();
    })();

    return () => {
      disposed = true;
      teardown?.();
    };
  }, [reduced]);

  const onPlayState = () => setPlaying(!videoRef.current?.paused);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      play();
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setSound(!v.muted);
    if (v.paused && !v.muted) {
      userPaused.current = false;
      play();
    }
  };

  return (
    <section
      ref={trackRef}
      aria-label={t.label}
      // Piste de défilement : le cadre collant reste à l'écran pendant que le
      // film s'ouvre. Sous mouvement réduit, une simple plaque.
      className={reduced ? 'relative bg-noir py-20' : 'relative h-[230svh] bg-noir md:h-[260svh]'}
    >
      <div className={reduced ? 'relative' : 'sticky top-0 h-svh overflow-hidden'}>
        <div
          ref={frameRef}
          className={
            reduced
              ? 'relative mx-auto aspect-video w-[min(92vw,70rem)] overflow-hidden'
              : 'absolute inset-0'
          }
        >
          <video
            ref={videoRef}
            data-teaser-video
            className="h-full w-full object-cover will-change-transform"
            muted
            loop
            playsInline
            preload="metadata"
            poster={TEASER_POSTER}
            aria-label={t.label}
            onPlay={onPlayState}
            onPause={onPlayState}
          />
          {/* Voile bas : tient le titre lisible sans voiler le flacon. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(16,11,9,0.88) 0%, rgba(16,11,9,0.35) 34%, rgba(16,11,9,0) 62%)',
            }}
          />

          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 px-6 pb-12 md:flex-row md:items-end md:justify-between md:px-12 md:pb-16 lg:px-20">
            <div className="max-w-[34rem]">
              <p
                data-teaser-fade
                className="font-ui text-3xs tracking-[0.28em] text-gold-light uppercase"
              >
                {t.eyebrow}
              </p>
              <h2 className="mt-4 font-body font-light text-ivory">
                <span className="block overflow-hidden">
                  <span
                    data-teaser-line
                    className="ds-text-glow block text-[clamp(2rem,5.4vw,4.5rem)] leading-[1.05] tracking-[-0.015em]"
                  >
                    {t.title}
                  </span>
                </span>
              </h2>
              <p
                data-teaser-fade
                className="mt-4 max-w-[28rem] font-serif text-base text-ivory/75 italic"
              >
                {t.body}
              </p>
            </div>

            <div data-teaser-fade className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? t.pause : t.play}
                className="ds-btn-ghost flex size-12 items-center justify-center rounded-full border border-ivory/35 text-ivory"
              >
                {playing ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                    <path d="M3 1h2.6v12H3zM8.4 1H11v12H8.4z" fill="currentColor" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                    <path d="M3 1.2v11.6L12.6 7z" fill="currentColor" />
                  </svg>
                )}
              </button>
              <button
                type="button"
                onClick={toggleSound}
                aria-pressed={sound}
                aria-label={sound ? t.soundOff : t.soundOn}
                className="ds-btn-ghost flex size-12 items-center justify-center rounded-full border border-ivory/35 text-ivory"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M2 7h3l4-3.2v10.4L5 11H2z" fill="currentColor" />
                  {sound ? (
                    <path
                      d="M12 6.2a4 4 0 0 1 0 5.6M14 4a7 7 0 0 1 0 10"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  ) : (
                    <path
                      d="M12.2 6.6l4 4.8M16.2 6.6l-4 4.8"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
