'use client';

import { useEffect, useRef } from 'react';

import { trackViewContent } from '@/lib/pixel';

interface TrackViewContentProps {
  id: string;
  name: string;
  price: number;
  currency?: string;
}

/**
 * Déclenche l'événement Meta Pixel ViewContent lors de l'affichage
 * d'une fiche produit parfum.
 *
 * Les données proviennent directement de la fiche produit (aucun codage en dur).
 */
export function TrackViewContent({
  id,
  name,
  price,
  currency = 'DZD',
}: TrackViewContentProps) {
  const trackedIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (trackedIdRef.current === id) return;
    trackedIdRef.current = id;

    trackViewContent({
      content_ids: [id],
      content_name: name,
      content_type: 'product',
      value: price,
      currency,
    });
  }, [id, name, price, currency]);

  return null;
}
