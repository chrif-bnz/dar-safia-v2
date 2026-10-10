'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { ProductImage } from '@/components/ProductImage';
import { cartCount, lineTotal, type CartLine } from '@/lib/cart/types';
import type { FragranceFamily } from '@/lib/catalog';
import { formatFamily, formatVolume } from '@/lib/format';
import type { Locale } from '@/lib/i18n/config';
import { interpolate, pluralize, type Dictionary } from '@/lib/i18n/dictionary';
import { localePath } from '@/lib/i18n/routing';

import { CartCheckout } from './CartCheckout';
import { useCart } from './CartProvider';

/** Informations d'affichage fournies par le serveur (catalogue), par slug. */
export interface CartProductMeta {
  family: FragranceFamily;
  imageUrl: string;
  imageSrcset: string | null;
}

/** Prix au format de la maison pour le panier : « DZD 25,500 ». */
function dzd(amount: number): string {
  return `DZD ${new Intl.NumberFormat('en-US').format(amount)}`;
}

const lineKey = (l: Pick<CartLine, 'productSlug' | 'variantId'>) => `${l.productSlug}::${l.variantId}`;

/**
 * Page panier.
 *
 * La logique de stockage reste celle du magasin existant (lib/cart/store) :
 * cette page ne fait que l'afficher et appeler ses mutations.
 */
export function CartPage({
  locale,
  dict,
  meta,
}: {
  locale: Locale;
  dict: Dictionary;
  meta: Record<string, CartProductMeta>;
}) {
  const { lines, subtotal, hydrated, changeQuantity, removeLine, clear } = useCart();
  const c = dict.cart;
  const count = cartCount(lines);

  // Lignes en cours de sortie : elles se referment avant d'être retirées.
  const [leaving, setLeaving] = useState<ReadonlySet<string>>(new Set());
  const timers = useRef<number[]>([]);
  // Commande envoyée : on évite d'afficher l'état vide pendant la navigation.
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((t) => window.clearTimeout(t));
  }, []);

  const remove = (line: CartLine) => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      removeLine(line.productSlug, line.variantId);
      return;
    }
    const key = lineKey(line);
    setLeaving((prev) => new Set(prev).add(key));
    timers.current.push(
      window.setTimeout(() => {
        removeLine(line.productSlug, line.variantId);
        setLeaving((prev) => {
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
      }, 350)
    );
  };

  const titleWords = c.yourCart.split(' ');
  const empty = hydrated && lines.length === 0 && !sent;

  return (
    <main id="contenu" tabIndex={-1} className="ds-cartp">
      <div aria-hidden="true" className="ds-cartp__halo" />
      {/* eslint-disable-next-line @next/next/no-img-element -- filigrane décoratif statique */}
      <img
        src="/img/logo/logo-dr/monogramme-filigrane.png"
        alt=""
        aria-hidden="true"
        width={1100}
        height={912}
        loading="lazy"
        decoding="async"
        className="ds-cartp__mark"
      />

      <div className="ds-cartp__inner">
        <nav aria-label={dict.product.breadcrumbLabel} className="ds-cartp__crumbs">
          <ol>
            <li>
              <Link href={localePath(locale, '/')} className="ds-navlink">
                {dict.product.breadcrumbHome}
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li>
              <Link href={localePath(locale, '/parfums')} className="ds-navlink">
                {dict.product.breadcrumbCatalog}
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li aria-current="page">{c.title}</li>
          </ol>
        </nav>

        <header className="ds-cartp__head">
          <h1 className="ds-cartp__title" aria-label={c.yourCart}>
            {titleWords.map((word, i) => (
              <span key={`${word}-${i}`} className="ds-cartp__mask" aria-hidden="true">
                <span className="ds-cartp__word" style={{ ['--i' as string]: i }}>
                  {word}
                </span>
                {i < titleWords.length - 1 ? ' ' : null}
              </span>
            ))}
          </h1>
          {hydrated && count > 0 && (
            <p className="ds-cartp__count" aria-live="polite">
              {pluralize(c.items, count)}
            </p>
          )}
        </header>

        {!hydrated ? (
          <p className="ds-cartp__loading" role="status">
            {dict.loading.label}…
          </p>
        ) : empty ? (
          <EmptyState locale={locale} dict={dict} />
        ) : sent ? (
          <p className="ds-cartp__loading" role="status">
            {dict.thanks.eyebrow}…
          </p>
        ) : (
          <div className="ds-cartp__layout">
            <div className="ds-cartp__main">
              <ul className="ds-cartp__list">
                {lines.map((line, index) => {
                  const m = meta[line.productSlug];
                  const key = lineKey(line);
                  const imageUrl = line.imageUrl || m?.imageUrl || '';
                  return (
                    <li
                      key={key}
                      className="ds-cartp__row"
                      data-leaving={leaving.has(key) ? 'true' : undefined}
                      style={{ ['--i' as string]: Math.min(index, 8) }}
                    >
                      <div className="ds-cartp__rowfit">
                        <article className="ds-cartp__item">
                          <div className="ds-cartp__photo">
                            {imageUrl && (
                              <ProductImage
                                src={imageUrl}
                                srcSet={line.imageUrl ? undefined : (m?.imageSrcset ?? undefined)}
                                sizes="140px"
                                alt={line.name}
                                loading="lazy"
                                className="h-full w-full object-contain"
                              />
                            )}
                          </div>

                          <div className="ds-cartp__info">
                            <p className="ds-cartp__brand">{line.brandName}</p>
                            <h2 className="ds-cartp__name">
                              <Link href={localePath(locale, `/parfums/${line.productSlug}`)}>
                                {line.name}
                              </Link>
                            </h2>
                            <p className="ds-cartp__meta">
                              {formatVolume(line.volumeMl, locale, dict)}
                              {m && ` · ${formatFamily(m.family, dict)}`}
                            </p>
                            <p className="ds-cartp__unit">
                              <span>{c.unitPrice}</span> {dzd(line.unitPrice)}
                            </p>
                          </div>

                          <div className="ds-cartp__side">
                            <p className="ds-cartp__linetotal">{dzd(lineTotal(line))}</p>
                            <div
                              className="ds-cartp__qty"
                              role="group"
                              aria-label={interpolate(c.quantityFor, { name: line.name })}
                            >
                              <button
                                type="button"
                                onClick={() => changeQuantity(line.productSlug, line.variantId, -1)}
                                aria-label={c.decrease}
                              >
                                −
                              </button>
                              <span aria-live="polite">{line.quantity}</span>
                              <button
                                type="button"
                                onClick={() => changeQuantity(line.productSlug, line.variantId, 1)}
                                aria-label={c.increase}
                              >
                                +
                              </button>
                            </div>
                            <button
                              type="button"
                              className="ds-cartp__remove"
                              onClick={() => remove(line)}
                              aria-label={`${c.remove} — ${line.name}`}
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M3 6h18" />
                                <path d="M8 6V4h8v2" />
                                <path d="m6 6 1 14h10l1-14" />
                                <path d="M10 11v5M14 11v5" />
                              </svg>
                            </button>
                          </div>
                        </article>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <CartCheckout
                locale={locale}
                dict={dict}
                lines={lines}
                subtotal={subtotal}
                onSent={() => {
                  setSent(true);
                  clear();
                }}
              />
            </div>

            <aside className="ds-cartp__summary" aria-label={c.summary}>
              <h2 className="ds-cartp__sumtitle">{c.summary}</h2>
              <dl>
                <div>
                  <dt>{pluralize(c.items, count)}</dt>
                  <dd>{dzd(subtotal)}</dd>
                </div>
                <div>
                  <dt>{c.shipping}</dt>
                  <dd className="ds-cartp__ship">{c.deliveryNote}</dd>
                </div>
                <div className="ds-cartp__sumtotal">
                  <dt>{c.total}</dt>
                  <dd>
                    <span key={subtotal} className="ds-cartp__tick">
                      {dzd(subtotal)}
                    </span>
                  </dd>
                </div>
              </dl>

              <button
                type="submit"
                form="cart-checkout"
                className="ds-cartp__order"
                onClick={() =>
                  document
                    .getElementById('commande')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }
              >
                <span>{dict.product.orderNow}</span>
              </button>
              <Link href={localePath(locale, '/parfums')} className="ds-cartp__continue">
                {c.continueShopping}
              </Link>
              <button type="button" onClick={clear} className="ds-cartp__clear">
                {c.clear}
              </button>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

function EmptyState({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const c = dict.cart;
  return (
    <div className="ds-cartp__empty">
      {/* eslint-disable-next-line @next/next/no-img-element -- monogramme statique */}
      <img
        src="/img/logo/logo-dr/logo-navbar-monogramme.png"
        alt=""
        aria-hidden="true"
        width={460}
        height={381}
        className="ds-cartp__emptymark"
      />
      <p className="ds-cartp__emptytitle">{c.empty}</p>
      <p className="ds-cartp__emptylead">{c.emptyLead}</p>
      <Link href={localePath(locale, '/parfums')} className="ds-cartp__order ds-cartp__order--inline">
        <span>{c.emptyCta}</span>
      </Link>
    </div>
  );
}
