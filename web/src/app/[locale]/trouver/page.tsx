import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { isLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { localeAlternates } from '@/lib/site';

import { ScentFinder } from './ScentFinder';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/trouver'>): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.scentFinder.title,
    description: dict.scentFinder.intro,
    alternates: localeAlternates(locale, '/trouver'),
  };
}

/**
 * Page « Trouver votre parfum ». Coquille serveur : elle pose le décor et
 * monte le composant client du diagnostic. Le score tourne dans une Server
 * Action.
 */
export default async function ScentFinderPage({
  params,
}: PageProps<'/[locale]/trouver'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <main
      id="contenu"
      tabIndex={-1}
      className="mx-auto max-w-3xl px-5 pt-10 pb-14 md:px-8 md:pt-16 md:pb-20"
    >
      <ScentFinder />
    </main>
  );
}
