'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { usePrefersReducedMotion } from '@/components/motion/usePrefersReducedMotion';
import type { Dictionary } from '@/lib/i18n/dictionary';

/**
 * ══════════════════════════════════════════════════════════════
 *   TEASER — LE FILM DE LA MAISON
 * ══════════════════════════════════════════════════════════════
 *
 * Le teaser est un plan VERTICAL (1080 × 1920, tourné au téléphone, avec son).
 * L'ancienne mise en page le recadrait en paysage plein cadre : on n'en voyait
 * qu'une bande. Il a désormais deux compositions, chacune faite pour un plan
 * vertical :
 *
 *   - Bureau : texte à gauche, le film à droite dans un cadre vertical entier
 *     (jamais rogné), qui se redresse et s'agrandit au défilement.
 *   - Téléphone : le plan est déjà aux proportions de l'écran. Il s'ouvre du
 *     cadre au plein écran, le texte se pose par-dessus.
 *
 * Dans les deux cas, un fond flou tiré de l'image du film prolonge la scène :
 * pas de bandes noires, pas d'aplat.
 *
 * Son : jamais d'autoplay avec le son. Le plan tourne muet quand il est à
 * l'écran, s'arrête quand il en sort ; le son est un choix du visiteur.
 *
 * Fichiers (voir scripts/optimize-video.sh pour les regénérer depuis le master) :
 *   public/video/teaser-720.mp4  bureau   (≈ 8 Mo)
 *   public/video/teaser-540.mp4  mobile   (≈ 5 Mo)
 *   public/poster/teaser.webp    image d'attente et fond flou
 */
const TEASER_SRC = '/video/teaser-720.mp4';
const TEASER_SRC_SMALL = '/video/teaser-540.mp4';
const TEASER_POSTER = '/poster/teaser.webp';

export function TeaserFilm({ dict }: { dict: Dictionary }) {
  const t = dict.teaser;
  const reduced = usePrefersReducedMotion();

  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  const [playing, setPlaying] = useState(false);
  const [sound, setSound] = useState(false);
  const userPaused = useRef(false);
  const inView = useRef(false);

  const play = useCallback(() => {
    void videoRef.current?.play().catch(() => {});
  }, []);

  // Source adaptée au gabarit (et à l'économie de données), posée avant le premier octet.
  // La source n'est posée que lorsque la scène approche de l'écran : le teaser
  // pèse 5 à 8 Mo et se trouve bien plus bas que le hero — jusque-là, seul le
  // poster (image) est chargé.
  useEffect(() => {
    const v = videoRef.current;
    const stage = stageRef.current;
    if (!v || !stage) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const small = window.matchMedia('(max-width: 767px)').matches || conn?.saveData === true;
    const src = small ? TEASER_SRC_SMALL : TEASER_SRC;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        v.src = src;
        v.load();
        // La scène a pu devenir visible avant l'arrivée des données : le
        // `play()` du second observateur serait alors resté sans effet.
        v.addEventListener(
          'canplay',
          () => {
            if (inView.current && !userPaused.current && !reduced) play();
          },
          { once: true }
        );
      },
      { rootMargin: '900px 0px' }
    );
    io.observe(stage);
    return () => io.disconnect();
  }, [play, reduced]);

  // Il tourne tant que la scène est à l'écran (muet), sauf si le visiteur l'a arrêté.
  useEffect(() => {
    const v = videoRef.current;
    const stage = stageRef.current;
    if (!v || !stage) return;
    const io = new IntersectionObserver(
      ([e]) => {
        inView.current = e.isIntersecting;
        if (e.isIntersecting) {
          if (!userPaused.current && !reduced) play();
        } else {
          v.pause();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(stage);
    return () => io.disconnect();
  }, [play, reduced]);

  // Filet de progression : transform seul, mis à jour à chaque `timeupdate`.
  useEffect(() => {
    const v = videoRef.current;
    const bar = barRef.current;
    if (!v || !bar) return;
    const onTime = () => {
      if (v.duration > 0) bar.style.transform = `scaleX(${Math.min(1, v.currentTime / v.duration)})`;
    };
    v.addEventListener('timeupdate', onTime);
    return () => v.removeEventListener('timeupdate', onTime);
  }, []);

  // Chorégraphie au défilement + inclinaison au pointeur (bureau).
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

      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        // ── Bureau : le cadre vertical se redresse et grandit ──
        mm.add('(min-width: 768px)', () => {
          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: track, start: 'top top', end: 'bottom bottom', scrub: 0.9 },
          });
          tl.fromTo(
            '[data-frame]',
            { scale: 0.74, yPercent: 10, rotate: 3.2, opacity: 0.2 },
            { scale: 1, yPercent: 0, rotate: 0, opacity: 1, duration: 0.42, ease: 'power3.out' },
            0
          )
            .fromTo('[data-teaser-video]', { scale: 1.2 }, { scale: 1, duration: 0.6 }, 0)
            .fromTo('[data-ghost]', { x: 0, y: 0, opacity: 0 }, { x: 22, y: 22, opacity: 1, duration: 0.45 }, 0.08)
            .fromTo('[data-backdrop]', { yPercent: -7 }, { yPercent: 7, duration: 1 }, 0)
            .fromTo(
              '[data-teaser-line]',
              { yPercent: 112 },
              { yPercent: 0, duration: 0.2, stagger: 0.05, ease: 'power3.out' },
              0.06
            )
            .fromTo(
              '[data-teaser-fade]',
              { opacity: 0, y: 18 },
              { opacity: 1, y: 0, duration: 0.18, stagger: 0.05, ease: 'power2.out' },
              0.16
            );

          // Inclinaison douce : un quickTo par axe, sur un enveloppeur à part
          // (la chronologie ci-dessus tient déjà le transform du cadre).
          const tilt = track.querySelector<HTMLElement>('[data-tilt]');
          if (!tilt || !window.matchMedia('(pointer: fine)').matches) return;
          gsap.set(tilt, { transformPerspective: 1100 });
          const rx = gsap.quickTo(tilt, 'rotationX', { duration: 0.8, ease: 'power3.out' });
          const ry = gsap.quickTo(tilt, 'rotationY', { duration: 0.8, ease: 'power3.out' });
          const onMove = (e: PointerEvent) => {
            const r = tilt.getBoundingClientRect();
            const nx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
            const ny = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
            ry(nx * 9);
            rx(-ny * 7);
          };
          window.addEventListener('pointermove', onMove, { passive: true });
          return () => window.removeEventListener('pointermove', onMove);
        });

        // ── Téléphone : le cadre s'ouvre jusqu'au plein écran ──
        mm.add('(max-width: 767px)', () => {
          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: track, start: 'top top', end: 'bottom bottom', scrub: 0.8 },
          });
          tl.fromTo(
            '[data-frame]',
            { clipPath: 'inset(16% 7% 16% 7%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.5, ease: 'power2.inOut' },
            0
          )
            .fromTo('[data-teaser-video]', { scale: 1.22 }, { scale: 1, duration: 0.7 }, 0)
            .fromTo(
              '[data-teaser-line]',
              { yPercent: 112 },
              { yPercent: 0, duration: 0.18, stagger: 0.05, ease: 'power3.out' },
              0.5
            )
            .fromTo(
              '[data-teaser-fade]',
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0, duration: 0.16, stagger: 0.04, ease: 'power2.out' },
              0.6
            );
        });
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
      // Piste de défilement : la scène collante reste à l'écran pendant que le
      // film se pose. Sous mouvement réduit, une simple plaque.
      className={reduced ? 'relative bg-noir py-20' : 'relative h-[230svh] bg-noir md:h-[250svh]'}
    >
      <div
        ref={stageRef}
        className={reduced ? 'relative' : 'sticky top-0 h-svh overflow-hidden'}
      >
        {/* ── Le fond : l'image du film, très floue, qui dérive ── */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div data-backdrop className="absolute -inset-[12%]">
            {/* eslint-disable-next-line @next/next/no-img-element -- décor flou, une seule image */}
            <img
              src={TEASER_POSTER}
              alt=""
              className="h-full w-full scale-125 object-cover opacity-45 blur-[70px] saturate-125"
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(70% 60% at 72% 50%, rgba(184,134,43,0.14) 0%, transparent 70%),' +
                'linear-gradient(to right, rgba(61,15,20,0.92) 0%, rgba(61,15,20,0.55) 55%, rgba(61,15,20,0.78) 100%)',
            }}
          />
        </div>

        <div
          className={
            reduced
              ? 'relative mx-auto grid max-w-(--container-site) gap-12 px-6 md:grid-cols-12 md:items-center md:px-12 lg:px-20'
              : 'relative h-full md:mx-auto md:grid md:max-w-(--container-site) md:grid-cols-12 md:items-center md:gap-10 md:px-12 md:pt-20 lg:px-20'
          }
        >
          {/* ── Le film : vertical, jamais rogné ── */}
          <div
            className={
              reduced
                ? 'relative mx-auto aspect-[9/16] w-[min(78vw,24rem)] md:order-2 md:col-span-6'
                : 'absolute inset-0 md:relative md:order-2 md:col-span-6 md:flex md:justify-center'
            }
          >
            <div data-tilt className="relative h-full w-full md:h-auto md:w-auto">
              <div
                data-frame
                className="relative h-full w-full overflow-hidden md:h-[min(70svh,48rem)] md:w-auto md:aspect-[9/16] md:rounded-[2px] md:border md:border-gold/30"
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
                {/* Voile bas : tient le texte lisible sur téléphone ; discret sur bureau. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 md:opacity-15"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(61,15,20,0.9) 0%, rgba(61,15,20,0.4) 36%, rgba(61,15,20,0) 64%)',
                  }}
                />
              </div>
              {/* Un second cadre, en retrait : la profondeur d'une épreuve encadrée. */}
              <div
                aria-hidden="true"
                data-ghost
                className="pointer-events-none absolute inset-0 hidden border border-gold/20 md:block"
              />
            </div>
          </div>

          {/* ── Le texte ── */}
          <div
            className={
              reduced
                ? 'md:order-1 md:col-span-6'
                : 'absolute inset-x-0 bottom-0 z-10 px-6 pb-12 md:static md:order-1 md:col-span-6 md:px-0 md:pb-0'
            }
          >
            <p
              data-teaser-fade
              className="font-ui text-3xs tracking-[0.28em] text-gold-light uppercase"
            >
              {t.eyebrow}
            </p>
            <h2 className="mt-4 font-body font-light text-ivory">
              <span className="-mx-[0.08em] block overflow-hidden px-[0.08em] pb-[0.12em]">
                <span
                  data-teaser-line
                  className="ds-text-glow block text-[clamp(2.1rem,5.6vw,5rem)] leading-[1.04] tracking-[-0.02em]"
                >
                  {t.title}
                </span>
              </span>
            </h2>
            <p
              data-teaser-fade
              className="mt-5 max-w-[30rem] font-serif text-base text-ivory/78 italic md:text-lg"
            >
              {t.body}
            </p>

            <div data-teaser-fade className="mt-8 flex max-w-[30rem] items-center gap-4">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? t.pause : t.play}
                className="ds-btn-ghost flex size-12 shrink-0 items-center justify-center rounded-full border border-ivory/35 text-ivory"
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
                className="ds-btn-ghost flex size-12 shrink-0 items-center justify-center rounded-full border border-ivory/35 text-ivory"
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
              {/* Le temps qui passe : un filet doré, rien de plus. */}
              <span
                aria-hidden="true"
                className="block h-px min-w-12 flex-1 overflow-hidden bg-ivory/20"
              >
                <span
                  ref={barRef}
                  className="block h-full origin-left bg-gold transition-transform duration-300 ease-linear rtl:origin-right"
                  style={{ transform: 'scaleX(0)' }}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
