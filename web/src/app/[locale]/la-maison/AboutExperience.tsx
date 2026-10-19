'use client';

import Link from 'next/link';
import { useRef } from 'react';

import { PerfumeExperience, type FeaturedProduct } from '@/components/perfume/PerfumeExperience';
import { HouseFigures } from '@/components/home/HouseFigures';
import { useReveal } from '@/components/motion/useReveal';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionary';
import { localePath } from '@/lib/i18n/routing';
import { whatsappUrl } from '@/lib/whatsapp';

/**
 * ══════════════════════════════════════════════════════════════
 *   LA MAISON — L'EXPÉRIENCE
 * ══════════════════════════════════════════════════════════════
 *
 * Une page de parti pris, pas une notice « à propos » : ce qu'on garde,
 * pourquoi, et sur quels critères. Aucune histoire inventée — ni fondateur,
 * ni date, ni atelier tant qu'ils ne sont pas confirmés.
 *
 * Un seul moment « 3D » : le film du flacon (`PerfumeExperience`), cinq
 * chapitres sur une timeline maîtresse liée au défilement. Il porte le texte de
 * la maison (parti pris, trois exigences) ; le reste de la page se tient —
 * mêmes deux gestes que l'accueil (`useReveal`).
 */
export function AboutExperience({
  locale,
  dict,
  figures,
  product,
}: {
  locale: Locale;
  dict: Dictionary;
  figures: { creations: number; houses: number; wilayas: number };
  product: FeaturedProduct | null;
}) {
  const a = dict.about;
  const rootRef = useRef<HTMLDivElement>(null);
  useReveal(rootRef);

  const conciergeUrl = whatsappUrl(dict.common.conciergeMessage);

  return (
    <div ref={rootRef}>
      {/* ── Le film : flacon, caméra, lumière et texte, sur une seule timeline ── */}
      <PerfumeExperience locale={locale} dict={dict} product={product} />

      {/* ── La maison en chiffres (composant partagé, données réelles) ── */}
      <HouseFigures
        creations={figures.creations}
        houses={figures.houses}
        wilayas={figures.wilayas}
        locale={locale}
        dict={dict}
      />

      {/* ── La conciergerie ── */}
      <section
        aria-labelledby="conciergerie"
        className="border-t border-smoke-2 bg-wine px-6 py-28 md:px-12 md:py-36 lg:px-20"
      >
        <div className="mx-auto max-w-(--container-site) md:grid md:grid-cols-12 md:gap-10">
          <h2 id="conciergerie" className="font-body font-light text-ivory md:col-span-5">
            <span className="block overflow-hidden">
              <span
                data-rise
                className="block text-[clamp(1.75rem,3.6vw,2.8rem)] leading-[1.1] tracking-[-0.015em]"
              >
                {a.conciergeTitle}
              </span>
            </span>
          </h2>

          <div className="mt-8 md:col-span-6 md:col-start-7 md:mt-0">
            <p
              data-fade
              className="font-body text-[clamp(1.15rem,1.5vw,1.4rem)] leading-[1.62] text-ivory/70"
            >
              {a.conciergeBody}
            </p>

            {conciergeUrl && (
              <a
                data-fade
                href={conciergeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mt-8 inline-flex pb-1.5 font-ui text-2xs tracking-[0.2em] text-ivory uppercase"
              >
                {a.conciergeCta}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-100 bg-gold transition-transform duration-500 ease-(--ease-lux) group-hover:scale-x-0"
                />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── Clôture ── */}
      <section
        aria-labelledby="maison-cloture"
        className="relative overflow-hidden bg-wine-deep px-6 py-32 md:px-12 md:py-44 lg:px-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(55% 45% at 50% 80%, rgba(184,134,43,0.12) 0%, transparent 70%)',
          }}
        />
        <div className="relative mx-auto max-w-(--container-site)">
          <h2 id="maison-cloture" className="font-body font-light text-ivory">
            {a.closingTitle.map((line) => (
              <span key={line} className="block overflow-hidden">
                <span
                  data-rise
                  className="block text-[clamp(2.4rem,7vw,6rem)] leading-[1.03] tracking-[-0.02em]"
                >
                  {line}
                </span>
              </span>
            ))}
          </h2>

          <div
            data-fade
            className="mt-14 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10"
          >
            <Link
              href={localePath(locale, '/parfums')}
              className="group relative inline-flex pb-1.5 font-ui text-2xs tracking-[0.22em] text-ivory uppercase"
            >
              {a.closingCta}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-100 bg-gold transition-transform duration-500 ease-(--ease-lux) group-hover:scale-x-0"
              />
            </Link>
            <Link
              href={localePath(locale, '/trouver')}
              className="ds-navlink font-ui text-2xs tracking-[0.14em] text-ivory/45 uppercase transition-colors hover:text-gold"
            >
              {a.closingSecondary}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
