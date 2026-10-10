import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CartPage, type CartProductMeta } from '@/components/cart/CartPage';
import { catalog } from '@/lib/catalog';
import { LOCALES, isLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

/**
 * Page panier. Le contenu du panier vit côté client (localStorage, voir
 * lib/cart/store) ; le serveur ne fournit que de quoi compléter l'affichage :
 * famille et photo de repli de chaque parfum, relues depuis le catalogue.
 *
 * Jamais indexée : le contenu est propre au visiteur.
 */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/panier'>): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return { title: dict.cart.yourCart, robots: { index: false, follow: true } };
}

export default async function CartRoute({ params }: PageProps<'/[locale]/panier'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const [dict, { items }] = await Promise.all([
    getDictionary(locale),
    catalog.listProducts({ locale }),
  ]);

  const meta: Record<string, CartProductMeta> = {};
  for (const product of items) {
    const image = product.images[0];
    meta[product.slug] = {
      family: product.family,
      imageUrl: image?.url ?? '',
      imageSrcset: image?.srcset ?? null,
    };
  }

  return <CartPage locale={locale} dict={dict} meta={meta} />;
}
