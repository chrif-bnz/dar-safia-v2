'use client';

import { useEffect, useRef, useState } from 'react';

import { encodeAssetPath } from '@/lib/asset-url';

/**
 * Image de parfum avec repli de marque.
 *
 * Une photo absente ou illisible (fichier manquant, réseau coupé) ne doit pas
 * laisser le texte alternatif déborder sur la fiche : on affiche à la place la
 * plaque du monogramme DS — l'actif de la maison, jamais une image inventée.
 *
 * `onError` ne se déclenche pas si l'image a déjà échoué avant l'hydratation
 * (HTML serveur) : on relit donc `complete` / `naturalWidth` au montage.
 */
const FALLBACK = '/img/logo/LOGO%20WEBP4.webp';

/** Les URL héritées contiennent des espaces : invalides dans un `srcset`. */
const encodeSrcset = (srcset: string) =>
  srcset
    .split(/,\s*(?=\/|https?:)/)
    .map((candidate) => {
      const i = candidate.lastIndexOf(' ');
      return i === -1
        ? encodeAssetPath(candidate)
        : `${encodeAssetPath(candidate.slice(0, i))}${candidate.slice(i)}`;
    })
    .join(', ');

export function ProductImage({
  src,
  srcSet,
  sizes,
  alt,
  className,
  loading,
  fetchPriority,
  /** `none` : rien à la place (image décorative en fond). */
  fallback = 'plate',
}: {
  src: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  fallback?: 'plate' | 'none';
}) {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    if (fallback === 'none') return null;
    return (
      // eslint-disable-next-line @next/next/no-img-element -- plaque de repli, actif statique
      <img src={FALLBACK} alt="" decoding="async" className={`${className ?? ''} opacity-80`} />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- pipeline d'images maison (srcset responsive)
    <img
      ref={ref}
      src={encodeAssetPath(src)}
      srcSet={srcSet ? encodeSrcset(srcSet) : undefined}
      sizes={sizes}
      alt={alt}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
