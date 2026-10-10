import type { MetadataRoute } from 'next';

import { catalog } from '@/lib/catalog';
import { DEFAULT_LOCALE, LOCALES } from '@/lib/i18n/config';
import { localePath } from '@/lib/i18n/routing';
import { absoluteUrl } from '@/lib/site';

/** Pages statiques de chaque langue (chemins sans préfixe de langue). */
const STATIC_PATHS = ['/', '/parfums', '/la-maison', '/trouver', '/contact'] as const;

function entry(path: string): MetadataRoute.Sitemap[number][] {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[l] = absoluteUrl(localePath(l, path));
  languages['x-default'] = absoluteUrl(localePath(DEFAULT_LOCALE, path));

  return LOCALES.map((locale) => ({
    url: absoluteUrl(localePath(locale, path)),
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { items } = await catalog.listProducts();
  return [
    ...STATIC_PATHS.flatMap((path) => entry(path)),
    ...items.flatMap((product) => entry(`/parfums/${product.slug}`)),
  ];
}
