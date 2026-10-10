'use client';

import { useEffect, useRef } from 'react';

/**
 * ══════════════════════════════════════════════════════════════
 *   CURSEUR
 * ══════════════════════════════════════════════════════════════
 *
 * Un point d'or qui colle au pointeur et un anneau qui le suit avec du retard.
 * Il n'y a que trois états, et chacun dit quelque chose :
 *   - repos        : anneau fin, discret
 *   - lien/bouton  : l'anneau s'ouvre et se teinte d'or — « on peut agir ici »
 *   - appui        : l'anneau se resserre — l'accusé de réception du clic
 *   - texte        : un filet vertical, comme un curseur d'insertion
 *
 * Et les boutons (`.ds-btn`, `.ds-btn-ghost`, `[data-magnetic]`) sont légèrement ATTIRÉS
 * par le pointeur : quelques pixels, jamais plus.
 *
 * Réservé au pointeur fin, hors `prefers-reduced-motion`. Sur tactile, rien
 * n'est monté. Décoratif : `aria-hidden`, aucun événement capté.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    let disposed = false;
    let teardown: (() => void) | null = null;

    void (async () => {
      const { gsap } = await import('gsap');
      if (disposed) return;
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (!dot || !ring) return;

      const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' });
      const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' });
      const ringX = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3.out' });
      const ringY = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3.out' });

      document.documentElement.classList.add('has-custom-cursor');
      let shown = false;
      let magnet: HTMLElement | null = null;

      const interactive = 'a, button, [role="button"], summary, label, select';
      const field = 'input, textarea, [contenteditable]';

      const setState = (state: string) => {
        if (ring.dataset.state !== state) ring.dataset.state = state;
      };
      const hide = () => {
        shown = false;
        gsap.to([dot, ring], { opacity: 0, duration: 0.25, overwrite: 'auto' });
      };

      const release = () => {
        if (!magnet) return;
        gsap.to(magnet, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)', overwrite: 'auto' });
        magnet = null;
      };

      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return;
        if (!shown) {
          shown = true;
          // Première apparition : aucune traînée depuis le coin de l'écran.
          gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
          gsap.to([dot, ring], { opacity: 1, duration: 0.3, overwrite: 'auto' });
          gsap.set(dot, { opacity: 1 });
        }
        dotX(e.clientX);
        dotY(e.clientY);
        ringX(e.clientX);
        ringY(e.clientY);

        const target = e.target instanceof Element ? e.target : null;
        if (target?.closest(field)) {
          setState('text');
        } else if (target?.closest(interactive)) {
          setState('link');
        } else {
          setState('idle');
        }

        // Attraction magnétique : le bouton se déplace d'un quart de l'écart.
        const el = target?.closest<HTMLElement>('.ds-btn, .ds-btn-ghost, [data-magnetic]') ?? null;
        if (el !== magnet) release();
        if (el) {
          magnet = el;
          const r = el.getBoundingClientRect();
          const mx = (e.clientX - (r.left + r.width / 2)) * 0.22;
          const my = (e.clientY - (r.top + r.height / 2)) * 0.3;
          gsap.to(el, { x: mx, y: my, duration: 0.45, ease: 'power3.out', overwrite: 'auto' });
        }
      };
      const onDown = () => ring.dataset.state !== 'text' && setState('press');
      const onUp = (e: PointerEvent) => {
        const target = e.target instanceof Element ? e.target : null;
        setState(target?.closest(interactive) ? 'link' : 'idle');
      };

      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerdown', onDown);
      window.addEventListener('pointerup', onUp);
      document.addEventListener('pointerleave', hide);
      window.addEventListener('blur', hide);

      teardown = () => {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerdown', onDown);
        window.removeEventListener('pointerup', onUp);
        document.removeEventListener('pointerleave', hide);
        window.removeEventListener('blur', hide);
        release();
        gsap.killTweensOf([dot, ring]);
        document.documentElement.classList.remove('has-custom-cursor');
      };
    })();

    return () => {
      disposed = true;
      teardown?.();
    };
  }, []);

  return (
    <>
      <div ref={ringRef} aria-hidden="true" className="ds-cursor-ring" />
      <div ref={dotRef} aria-hidden="true" className="ds-cursor-dot" />
    </>
  );
}
