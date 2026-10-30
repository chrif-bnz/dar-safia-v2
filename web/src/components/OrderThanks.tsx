'use client';

import Link from 'next/link';
import { useMemo, useSyncExternalStore } from 'react';

import { ProductImage } from '@/components/ProductImage';
import { formatPrice, formatVolume } from '@/lib/format';
import type { Locale } from '@/lib/i18n/config';
import { interpolate, type Dictionary } from '@/lib/i18n/dictionary';
import { localePath } from '@/lib/i18n/routing';
import { parseOrderReceipt, readOrderReceiptRaw } from '@/lib/order-receipt';
import { whatsappUrl } from '@/lib/whatsapp';

const subscribe = () => () => {};

/**
 * Page de remerciement. Le résumé vient de sessionStorage (voir
 * lib/order-receipt) : rendu générique côté serveur, enrichi après hydratation.
 */
export function OrderThanks({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.thanks;
  const raw = useSyncExternalStore(subscribe, readOrderReceiptRaw, () => null);
  const receipt = useMemo(() => parseOrderReceipt(raw), [raw]);

  const name = receipt?.firstName.trim();
  const place = receipt ? [receipt.commune, receipt.wilaya].filter(Boolean).join(', ') : '';
  const chat = whatsappUrl(
    receipt?.reference ? `${t.reference} ${receipt.reference}` : (receipt?.productName ?? '')
  );

  return (
    <main
      id="contenu"
      tabIndex={-1}
      className="ds-thanks relative isolate overflow-hidden px-5 pt-32 pb-24 md:px-8 md:pt-40"
    >
      <div aria-hidden="true" className="ds-thanks__glow" />

      <div className="mx-auto max-w-(--container-site)">
        <header className="ds-thanks__head">
          <svg className="ds-thanks__seal" viewBox="0 0 120 120" aria-hidden="true">
            <circle className="ds-thanks__ring" cx="60" cy="60" r="54" pathLength="1" />
            <circle className="ds-thanks__ring-inner" cx="60" cy="60" r="46" pathLength="1" />
            <path className="ds-thanks__tick" d="M38 62 L54 77 L84 44" pathLength="1" />
          </svg>

          <p className="ds-thanks__eyebrow">{t.eyebrow}</p>
          <h1 className="ds-thanks__title">
            {name ? (
              <>
                {t.titleNamed.split('{name}')[0]}
                <bdi>{name}</bdi>
                {t.titleNamed.split('{name}')[1]}
              </>
            ) : (
              t.title
            )}
          </h1>
          <p className="ds-thanks__lead">{receipt ? t.lead : t.leadGeneric}</p>
        </header>

        <div className="ds-thanks__grid">
          {receipt && (
            <section aria-labelledby="thanks-summary" className="ds-thanks__card">
              <h2 id="thanks-summary" className="ds-thanks__label">
                {t.summaryTitle}
              </h2>

              {receipt.lines && receipt.lines.length > 1 ? (
                <ul className="ds-thanks__lines">
                  {receipt.lines.map((line, i) => (
                    <li key={`${line.name}-${i}`}>
                      <span className="ds-thanks__linename">
                        <span className="ds-thanks__brand">{line.brandName}</span>
                        <span>{line.name}</span>
                      </span>
                      <span className="ds-thanks__lineqty">
                        × {line.quantity}
                        <span className="ds-thanks__sub">
                          {formatPrice({ amount: line.total, currency: 'DZD' }, locale)}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
              <div className="ds-thanks__product">
                {receipt.imageUrl && (
                  <div className="ds-thanks__thumb">
                    <ProductImage
                      src={receipt.imageUrl}
                      srcSet={receipt.imageSrcset ?? undefined}
                      sizes="120px"
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="ds-thanks__brand">{receipt.brandName}</p>
                  <p className="ds-thanks__name">{receipt.productName}</p>
                  {receipt.volumeMl > 0 && (
                    <p className="ds-thanks__meta">
                      {formatVolume(receipt.volumeMl, locale, dict)}
                    </p>
                  )}
                </div>
              </div>
              )}

              <dl className="ds-thanks__rows">
                <div>
                  <dt>{t.quantity}</dt>
                  <dd>{receipt.quantity}</dd>
                </div>
                <div>
                  <dt>{t.delivery}</dt>
                  <dd>
                    {receipt.deliveryMethod === 'societe'
                      ? dict.product.form.byCompany
                      : dict.product.form.byHand}
                    {place && (
                      <span className="ds-thanks__sub">
                        {interpolate(t.deliveredTo, { place })}
                      </span>
                    )}
                  </dd>
                </div>
                <div className="ds-thanks__total">
                  <dt>{t.total}</dt>
                  <dd>
                    {formatPrice({ amount: receipt.total, currency: receipt.currency }, locale)}
                  </dd>
                </div>
                {receipt.reference && (
                  <div>
                    <dt>{t.reference}</dt>
                    <dd dir="ltr" className="ds-thanks__ref">
                      {receipt.reference}
                    </dd>
                  </div>
                )}
              </dl>
            </section>
          )}

          <section aria-labelledby="thanks-steps" className="ds-thanks__steps">
            <h2 id="thanks-steps" className="ds-thanks__label">
              {t.stepsTitle}
            </h2>
            <ol>
              {t.steps.map((step, i) => (
                <li key={step.term} className={i === 0 ? 'is-done' : undefined}>
                  <span className="ds-thanks__n" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="ds-thanks__term">{step.term}</p>
                    <p className="ds-thanks__detail">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <div className="ds-thanks__actions">
          <Link href={localePath(locale, '/parfums')} className="ds-btn-buy ds-btn-buy-order">
            <span className="relative z-10">{t.continue}</span>
          </Link>
          {chat && (
            <a
              href={chat}
              target="_blank"
              rel="noopener noreferrer"
              className="ds-btn-buy ds-btn-buy-cart"
            >
              {t.whatsapp}
            </a>
          )}
          <Link href={localePath(locale, '/')} className="ds-thanks__home ds-navlink">
            {t.home}
          </Link>
        </div>
      </div>
    </main>
  );
}
