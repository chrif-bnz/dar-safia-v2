'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

/**
 * Filet de progression de navigation.
 *
 * Next ne dit pas « une navigation commence » : on l'infère du clic sur un
 * lien interne (même origine, autre chemin, aucune touche modificatrice), et
 * on la voit se terminer quand le chemin change. Le filet avance en
 * s'asymptotant vers 85 % — il ne ment pas sur la durée — puis termine et
 * s'efface. Une page statique, déjà préchargée, ne le laisse presque pas voir :
 * c'est voulu, il ne sert que quand l'attente est réelle.
 *
 * Écrit en impératif (style direct sur un nœud) : un état React redessinerait
 * à chaque pas, pour un trait de 2 px.
 */
export function RouteProgress() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | null>(null);
  const value = useRef(0);
  const active = useRef(false);

  const set = (v: number, opacity = 1) => {
    const bar = barRef.current;
    if (!bar) return;
    value.current = v;
    bar.style.opacity = String(opacity);
    bar.style.transform = `scaleX(${v})`;
  };

  const stop = () => {
    if (timer.current !== null) window.clearInterval(timer.current);
    timer.current = null;
  };

  // Fin : le chemin a changé.
  useEffect(() => {
    if (!active.current) return;
    active.current = false;
    stop();
    set(1);
    const done = window.setTimeout(() => set(1, 0), 220);
    const reset = window.setTimeout(() => {
      const bar = barRef.current;
      if (!bar) return;
      bar.style.transition = 'none';
      set(0, 0);
      void bar.offsetWidth;
      bar.style.transition = '';
    }, 700);
    return () => {
      window.clearTimeout(done);
      window.clearTimeout(reset);
    };
  }, [pathname]);

  // Début : clic sur un lien interne.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;
      active.current = true;
      stop();
      set(0.08);
      timer.current = window.setInterval(() => {
        set(value.current + (0.85 - value.current) * 0.08);
      }, 120);
    };
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
      stop();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-[2px]"
    >
      <div
        ref={barRef}
        className="ds-shine-x h-full origin-left opacity-0 transition-[transform,opacity] duration-300 ease-out rtl:origin-right"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
