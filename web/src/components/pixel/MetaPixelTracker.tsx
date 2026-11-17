'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { trackPageView } from '@/lib/pixel';

/**
 * Composant client écoutant les navigations SPA de Next.js (App Router).
 *
 * Le script racine dans <head> émet le PageView initial lors du premier
 * chargement HTML. Ce composant ignore donc le premier montage (évitant tout
 * doublon) et émet PageView à chaque changement d'URL ultérieur.
 */
export function MetaPixelTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    trackPageView();
  }, [pathname, searchParams]);

  return null;
}
