import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { OlfactoryPyramid } from '@/components/OlfactoryPyramid';
import { ProductCard } from '@/components/ProductCard';
import { ProductImage } from '@/components/ProductImage';
import { ProductOrderForm } from '@/components/ProductOrderForm';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { catalog, lowestPrice } from '@/lib/catalog';
import {
  formatFamily,
  formatGender,
  formatLongevity,
  formatSillage,
  formatVolume,
} from '@/lib/format';
import { LOCALES, isLocale } from '@/lib/i18n/config';
import { getDictionary, interpolate } from '@/lib/i18n/dictionaries';
import { localePath } from '@/lib/i18n/routing';
import { orderMessage, whatsappUrl } from '@/lib/whatsapp';

/**
 * Fiche produit. Prégénérée pour chaque parfum × chaque langue : HTML complet,
 * indexable — l'ancien site rendait la fiche en JavaScript depuis un fragment
 * d'URL, invisible au crawl.
 *
 * Le contenu du parfum (description, récit, badge, notes) suit la langue de la
 * page ; un champ non traduit retombe sur le français (voir lib/catalog/localize).
 */
export async function generateStaticParams() {
  const { items } = await catalog.listProducts();
  return LOCALES.flatMap((locale) =>
    items.map((product) => ({ locale, slug: product.slug }))
  );
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/parfums/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await catalog.getProductBySlug(slug, isLocale(locale) ? locale : undefined);
  if (!product) return {};

  const image = product.images[0];
  return {
    title: product.seo?.title ?? `${product.name} — ${product.brand.name}`,
    description: product.seo?.description ?? product.description.slice(0, 155),
    openGraph: {
      title: `${product.name} — ${product.brand.name}`,
      description: product.description.slice(0, 155),
      type: 'website',
      images: image ? [{ url: image.url, alt: image.alt }] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: PageProps<'/[locale]/parfums/[slug]'>) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const [dict, product] = await Promise.all([
    getDictionary(locale),
    catalog.getProductBySlug(slug, locale),
  ]);
  if (!product) notFound();

  const related = await catalog.getRelatedProducts(slug, 4, locale);
  const p = dict.product;
  const image = product.images[0];
  const variant = product.variants[0];
  const price = { amount: lowestPrice(product), currency: 'DZD' as const };
  const formattedPrice = `DZD ${new Intl.NumberFormat('en-US').format(price.amount)}`;
  const orderUrl = whatsappUrl(orderMessage(product, locale, dict));

  const titleWords = product.name.split(' ');

  const metrics = [
    { label: p.metrics.longevity, value: formatLongevity(product.longevityHours, dict) },
    { label: p.metrics.sillage, value: formatSillage(product.sillage, dict) },
    { label: p.metrics.family, value: formatFamily(product.family, dict) },
  ].filter((m): m is { label: string; value: string } => m.value !== null);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    brand: { '@type': 'Brand', name: product.brand.name },
    description: product.description,
    image: image ? [image.url] : undefined,
    offers: {
      '@type': 'Offer',
      price: price.amount,
      priceCurrency: price.currency,
      availability:
        variant.stock > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/PreOrder',
    },
  };

  return (
    <main id="contenu" tabIndex={-1} data-universe={product.family}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 70% 0%, var(--universe-glow) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-(--container-site) px-5 pt-28 pb-10 md:px-8 md:pt-32 md:pb-14">
        <nav aria-label={p.breadcrumbLabel} className="text-2xs text-ivory/58">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href={localePath(locale, '/')} className="ds-gold-underline">
                {p.breadcrumbHome}
              </Link>
            </li>
            <li aria-hidden="true">◆</li>
            <li>
              <Link href={localePath(locale, '/parfums')} className="ds-gold-underline">
                {p.breadcrumbCatalog}
              </Link>
            </li>
            <li aria-hidden="true">◆</li>
            <li className="text-ivory/70" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          {/* ── Visuel ── */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div
              className="group/photo relative overflow-hidden rounded-md border border-smoke-2 bg-noir-2 transition-[border-color,box-shadow] duration-500 hover:border-gold/50"
              style={{ boxShadow: '0 24px 60px -24px var(--universe-glow)' }}
            >
              {/* Halo doré doux en arrière-plan au survol */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-4 rounded-xl bg-gold/15 opacity-0 blur-2xl transition-opacity duration-500 group-hover/photo:opacity-100"
              />
              {image && (
                <div className="overflow-hidden">
                  <ProductImage
                    src={image.url}
                    srcSet={image.srcset ?? undefined}
                    sizes="(max-width: 1024px) 92vw, 520px"
                    alt={image.alt}
                    fetchPriority="high"
                    className="aspect-4/5 w-full object-cover transition-transform duration-700 ease-(--ease-lux) group-hover/photo:scale-[1.03]"
                  />
                </div>
              )}
            </div>

            <ScrollReveal delay={120}>
              <dl
                className="mt-4 grid gap-2.5"
                style={{ gridTemplateColumns: `repeat(${metrics.length}, minmax(0, 1fr))` }}
              >
                {metrics.map(({ label, value }) => (
                  <div
                    key={label}
                    className="ds-metric-card cursor-default rounded-md border border-smoke-2 bg-noir-2 px-3 py-4 text-center"
                  >
                    <dt className="text-3xs tracking-(--tracking-label) text-ivory/58 uppercase">
                      {label}
                    </dt>
                    <dd className="mt-1.5 font-serif text-md text-[var(--universe-light)]">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </ScrollReveal>
          </div>

          {/* ── Informations ── */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="ds-stagger-item text-3xs font-semibold tracking-(--tracking-eyebrow) text-gold uppercase"
                style={{ animationDelay: '0ms' }}
              >
                {product.brand.name}
              </span>
              <span
                className="ds-stagger-item rounded-xs border border-smoke-2 px-2 py-0.5 text-3xs tracking-(--tracking-label) text-ivory/60 uppercase"
                style={{ animationDelay: '80ms' }}
              >
                {formatGender(product.gender, dict)}
              </span>
              {product.concentration && (
                <span
                  className="ds-stagger-item text-3xs text-ivory/58"
                  style={{ animationDelay: '160ms' }}
                >
                  {product.concentration}
                </span>
              )}
            </div>

            <h1 className="mt-3 font-serif text-display-md leading-tight text-balance text-ivory">
              {titleWords.map((word, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden align-top me-[0.28em] last:me-0"
                >
                  <span
                    className="ds-word-reveal"
                    style={{ animationDelay: `${240 + i * 80}ms` }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            <div
              className="ds-stagger-item mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-y border-smoke-2 py-5"
              style={{ animationDelay: `${240 + titleWords.length * 80}ms` }}
            >
              <span className="font-serif text-2xl text-[var(--universe-light)] tabular-nums">
                {formattedPrice}
              </span>
              <span className="text-2xs text-ivory/50">
                {formatVolume(variant.volumeMl, locale, dict)}
              </span>
              <span className="ms-auto text-2xs text-ivory/50">
                {variant.stock > 0
                  ? interpolate(p.inStock, { count: variant.stock })
                  : p.onOrder}
              </span>
            </div>

            <p
              className="ds-stagger-item mt-6 font-body text-xl leading-relaxed text-ivory/80"
              style={{ animationDelay: `${320 + titleWords.length * 80}ms` }}
            >
              {product.description}
            </p>

            <ScrollReveal className="mt-[clamp(24px,4vh,48px)]">
              <ProductOrderForm
                product={product}
                variant={variant}
                priceAmount={price.amount}
                image={image}
                locale={locale}
                dict={dict}
                hasOrderUrl={!!orderUrl}
              />
            </ScrollReveal>

            <ScrollReveal className="mt-[clamp(24px,4vh,48px)]">
              <OlfactoryPyramid notes={product.notes} dict={dict} />
            </ScrollReveal>
          </div>
        </div>

        {/* ── Histoire du flacon (hors conteneur sticky) ── */}
        {product.story && (
          <ScrollReveal className="mt-[clamp(24px,4vh,48px)]">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
              <div className="hidden lg:block"></div>
              <div>
                <section aria-labelledby="histoire">
                  <h2 id="histoire" className="font-serif text-xl text-ivory">
                    {p.storyTitle}
                  </h2>
                  <p className="mt-4 font-body text-xl leading-relaxed text-ivory/70">
                    {product.story}
                  </p>
                </section>
              </div>
            </div>
          </ScrollReveal>
        )}

        {related.length > 0 && (
          <ScrollReveal className="mt-[clamp(32px,5vh,64px)]">
            <section aria-labelledby="similaires">
              <h2
                id="similaires"
                className="border-b border-smoke-2 pb-4 font-serif text-xl text-ivory"
              >
                {p.relatedTitle}
              </h2>
              <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                {related.map((item) => (
                  <ProductCard key={item.slug} product={item} locale={locale} dict={dict} />
                ))}
              </div>
            </section>
          </ScrollReveal>
        )}
      </div>
    </main>
  );
}
