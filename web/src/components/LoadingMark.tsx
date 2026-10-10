'use client';

import { useI18n } from '@/components/i18n/I18nProvider';

/**
 * Le monogramme de la maison en train de « respirer », avec un filet d'or.
 * Même masque que le rideau d'ouverture : un seul visage pour l'attente.
 * `compact` : version réduite pour les zones (scène 3D, grille) qui chargent
 * à l'intérieur d'une page déjà affichée.
 */
export function LoadingMark({ compact = false }: { compact?: boolean }) {
  const { dict } = useI18n();
  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center gap-6">
      <div
        aria-hidden="true"
        className={`ds-loading-mark ${compact ? 'size-16' : 'size-28 md:size-36'}`}
      />
      <span aria-hidden="true" className="block h-px w-24 overflow-hidden bg-ivory/15">
        <span className="ds-loading-rule block h-full w-1/2 bg-gold" />
      </span>
      <span className="sr-only">{dict.loading.label}</span>
    </div>
  );
}
