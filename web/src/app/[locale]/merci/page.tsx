import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { OrderThanks } from '@/components/OrderThanks';
import { LOCALES, isLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

/**
 * Page de remerciement après une commande depuis la fiche produit.
 * Jamais indexée : elle n'a de sens qu'à la suite d'une commande, et son
 * contenu (résumé) ne vient pas de l'URL.
 */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/merci'>): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return { title: dict.thanks.metaTitle, robots: { index: false, follow: false } };
}

export default async function ThanksPage({ params }: PageProps<'/[locale]/merci'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  return <OrderThanks locale={locale} dict={dict} />;
}
