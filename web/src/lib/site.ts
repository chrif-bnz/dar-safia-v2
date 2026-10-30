import type { Metadata } from 'next';

import { DEFAULT_LOCALE, LOCALES, type Locale } from '@/lib/i18n/config';
import { localePath } from '@/lib/i18n/routing';

/**
 * ══════════════════════════════════════════════════════════════
 *   SITE — URL PUBLIQUE ET ALTERNATES SEO
 * ══════════════════════════════════════════════════════════════
 *
 * Aucun domaine n'est écrit en dur : il vient de l'environnement.
 *   1. NEXT_PUBLIC_SITE_URL — à définir en production (valeur publique) ;
 *   2. URL / DEPLOY_PRIME_URL — fournies par Netlify au build ;
 *   3. http://localhost:3000 — développement local.
 */
export function siteUrl(): URL {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.URL ||
    process.env.DEPLOY_PRIME_URL ||
    'http://localhost:3000';
  try {
    return new URL(raw);
  } catch {
    return new URL('http://localhost:3000');
  }
}

/** URL absolue d'un chemin du site (ou d'un chemin déjà absolu, renvoyé tel quel). */
export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl()).toString();
}

/** Balise `og:locale` par langue. */
export const OG_LOCALE: Record<Locale, string> = {
  fr: 'fr_DZ',
  ar: 'ar_DZ',
  en: 'en_US',
};

/**
 * Canonical + hreflang d'une page. `path` est le chemin SANS langue
 * ('/', '/parfums', '/parfums/prada-paradoxe'). La langue par défaut sert
 * aussi d'`x-default`.
 */
export function localeAlternates(locale: Locale, path: string): NonNullable<Metadata['alternates']> {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[l] = localePath(l, path);
  languages['x-default'] = localePath(DEFAULT_LOCALE, path);
  return { canonical: localePath(locale, path), languages };
}
