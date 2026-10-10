'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

import 'lenis/dist/lenis.css';

/**
 * ══════════════════════════════════════════════════════════════
 *   DÉFILEMENT FLUIDE (Lenis) + SYNCHRO ScrollTrigger + PROGRESSION
 * ══════════════════════════════════════════════════════════════
 *
 * Lenis interpole le défilement ; ScrollTrigger doit donc lire SA position
 * plutôt que celle du navigateur, sinon les deux dérivent et les animations
 * se déclenchent au mauvais moment.
 *
 * Réglage : `lerp` (rattrapage proportionnel) plutôt qu'une durée fixe. Une
 * durée fixe rejoue la même courbe quelle que soit la vitesse de la molette —
 * un coup sec et un geste lent se ressemblent. Le rattrapage proportionnel
 * suit l'ÉLAN : il glisse et s'arrête comme un objet pesant, sans le retard
 * d'une animation qu'on attend de voir finir.
 *
 * Sous `prefers-reduced-motion`, Lenis n'est pas monté du tout : le
 * défilement natif reste le plus prévisible, et c'est ce que demande la
 * préférence.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const progressRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<{ scrollTo: (n: number, o?: { immediate?: boolean }) => void } | null>(
    null
  );

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Sans Lenis : la progression suit tout de même le défilement natif.
      const bar = progressRef.current;
      if (!bar) return;
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener('scroll', onScroll);
    }

    let disposed = false;
    let teardown: (() => void) | null = null;

    void (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);
      // Une barre d'adresse mobile qui rentre ne doit pas relancer tous les
      // calculs de ScrollTrigger (saut visible de la page).
      ScrollTrigger.config({ ignoreMobileResize: true });

      const lenis = new Lenis({
        lerp: 0.085,
        wheelMultiplier: 0.9,
        smoothWheel: true,
        // Le tactile garde l'inertie du système : la surcharger donne
        // toujours une sensation de flottement sur mobile.
        touchMultiplier: 1.4,
        anchors: true,
      });
      lenisRef.current = lenis;

      const bar = progressRef.current;
      lenis.on('scroll', (e: { progress: number }) => {
        ScrollTrigger.update();
        if (bar) bar.style.transform = `scaleX(${e.progress})`;
      });

      // Une seule boucle d'animation : GSAP pilote Lenis, plutôt que deux
      // rAF concurrents qui se disputeraient la frame.
      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      // Les polices et les images changent la hauteur de la page : les points
      // de déclenchement doivent être recalculés une fois la mise en page posée.
      void document.fonts?.ready.then(() => {
        if (!disposed) ScrollTrigger.refresh();
      });

      teardown = () => {
        lenisRef.current = null;
        gsap.ticker.remove(raf);
        lenis.destroy();
      };
    })();

    return () => {
      disposed = true;
      teardown?.();
    };
  }, []);

  // Changement de page : on repart du haut, sans glisser depuis l'ancienne
  // position (Lenis garde sa cible interne, Next remet seulement le défilement
  // natif à zéro).
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return <div ref={progressRef} aria-hidden="true" className="ds-progress" />;
}
