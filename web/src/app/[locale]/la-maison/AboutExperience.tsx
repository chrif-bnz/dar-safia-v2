'use client';

import Link from 'next/link';
import { useRef, type ReactNode } from 'react';

import { FlaconScene } from '@/components/three/FlaconScene';
import { HouseFigures } from '@/components/home/HouseFigures';
import { usePrefersReducedMotion } from '@/components/motion/usePrefersReducedMotion';
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
 * Le seul endroit du site où le flacon 3D occupe la page. Cinq chapitres
 * portés par UNE timeline maîtresse (`FlaconScene` + `about-timeline.ts`) :
 *   I   l'arrivée      — le hero, étiquette de face
 *   II  le flacon      — le parti pris ; la caméra orbite
 *   III l'essence      — les exigences ; un tour complet du flacon
 *   IV  le gros plan   — la provenance ; dolly serrée sur le monogramme
 *   V   le produit     — la clôture et les liens vers la collection
 * Le texte est du HTML ordinaire ; chaque bloc `[data-chapter]` est entré et
 * sorti par la timeline. Sous `prefers-reduced-motion`, la piste n'est plus
 * collante : le flacon est une image posée, les chapitres sont des sections
 * lisibles les unes sous les autres.
 *
 * Le reste de la page (chiffres, conciergerie) se tient — mêmes deux gestes
 * que l'accueil (`useReveal`).
 */

type Side = 'start' | 'end' | 'center';

/** Un chapitre : soit calé sur le cadre collant, soit posé dans le flux. */
function Chapter({
  id,
  index,
  side,
  stacked,
  hidden,
  children,
}: {
  id: string;
  index: number;
  side: Side;
  stacked: boolean;
  hidden: boolean;
  children: ReactNode;
}) {
  const placement =
    side === 'end' ? 'md:ms-auto' : side === 'center' ? 'md:mx-auto md:max-w-3xl md:text-center' : '';
  return (
    <div
      data-chapter={id}
      className={
        stacked
          ? 'relative border-t border-smoke-2 px-6 py-20 md:px-12 lg:px-20'
          : `pointer-events-none absolute inset-0 flex items-end ${side === 'center' ? '' : 'md:items-center'} ${
              hidden ? 'invisible opacity-0' : ''
            }`
      }
    >
      {!stacked && (
        <div
          aria-hidden="true"
          className={`absolute inset-y-0 w-full md:w-[62%] ${
            side === 'end'
              ? 'end-0 bg-linear-to-r from-transparent via-noir/70 to-noir/92'
              : side === 'center'
                ? 'inset-x-0 !w-full bg-linear-to-t from-noir/90 via-noir/55 to-transparent'
                : 'start-0 bg-linear-to-r from-noir/92 via-noir/70 to-transparent'
          } max-md:inset-x-0 max-md:!w-full max-md:bg-linear-to-t max-md:from-noir/94 max-md:via-noir/70 max-md:to-transparent`}
        />
      )}
      <div className={`relative mx-auto w-full max-w-(--container-site) px-6 pb-10 md:px-12 ${side === 'center' ? 'md:pb-14' : 'md:pb-0'} lg:px-20`}>
        <div className={`pointer-events-auto ${side === 'center' ? '' : 'max-w-[34rem]'} ${placement}`}>
          <p
            aria-hidden="true"
            className="mb-5 font-ui text-2xs tracking-(--tracking-eyebrow) text-gold-light uppercase tabular-nums"
          >
            {String(index).padStart(2, '0')} <span className="text-ivory/40">/ 05</span>
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}

const chapterTitle = 'font-body font-light text-ivory text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.06] tracking-[-0.015em]';
const chapterBody = 'font-body text-[clamp(1.02rem,1.5vw,1.3rem)] leading-[1.55] text-ivory/78';

export function AboutExperience({
  locale,
  dict,
  figures,
}: {
  locale: Locale;
  dict: Dictionary;
  figures: { creations: number; houses: number; wilayas: number };
}) {
  const a = dict.about;
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  useReveal(rootRef);

  const conciergeUrl = whatsappUrl(dict.common.conciergeMessage);
  const [pure, lasting, provenance] = a.requirements;

  const chapters = (
    <>
      {/* ── I · L'arrivée ── */}
      <div
        data-chapter="arrival"
        className={
          reduced
            ? 'relative px-6 pt-36 pb-20 md:px-12 lg:px-20'
            : 'pointer-events-none absolute inset-0 flex items-end'
        }
      >
        <div className="relative mx-auto w-full max-w-(--container-site) px-6 pb-14 md:px-12 md:pb-24 lg:px-20">
          <p className="font-ui text-2xs tracking-(--tracking-eyebrow) text-gold-light uppercase">
            {a.eyebrow}
          </p>
          <h1 id="maison-titre" className="mt-5 font-body font-light text-ivory">
            {a.title.map((line) => (
              <span key={line} className="block text-[clamp(2.6rem,7vw,5.5rem)] leading-[1.02] tracking-[-0.02em]">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-8 max-w-[46ch] font-body text-[clamp(1.1rem,1.7vw,1.45rem)] leading-[1.6] text-ivory/75">
            {a.lead}
          </p>
        </div>
      </div>

      {/* ── II · Le flacon (le parti pris) ── */}
      <Chapter id="bottle" index={2} side="end" stacked={reduced} hidden>
        <h2 className={chapterTitle}>{a.stanceTitle}</h2>
        <p className={`mt-6 ${chapterBody}`}>{a.stanceBody}</p>
        <p className="mt-6 max-w-xs font-ui text-2xs leading-[1.9] text-ivory/60 max-md:hidden">
          {a.stanceAside}
        </p>
      </Chapter>

      {/* ── III · L'essence (deux premières exigences) ── */}
      <Chapter id="essence" index={3} side="start" stacked={reduced} hidden>
        <h2 className={chapterTitle}>{a.requirementsTitle}</h2>
        <dl className="mt-7 space-y-6">
          {[pure, lasting].map((req) => (
            <div key={req.term} className="border-t border-gold/30 pt-4">
              <dt className="font-body text-[clamp(1.2rem,2vw,1.6rem)] leading-[1.2] text-ivory">
                {req.term}
              </dt>
              <dd className="mt-2 font-body text-[clamp(0.98rem,1.3vw,1.15rem)] leading-[1.5] text-ivory/70">
                {req.detail}
              </dd>
            </div>
          ))}
        </dl>
      </Chapter>

      {/* ── IV · Le gros plan (la provenance) ── */}
      <Chapter id="closeup" index={4} side="end" stacked={reduced} hidden>
        <dl>
          <dt className={chapterTitle}>{provenance.term}</dt>
          <dd className={`mt-6 ${chapterBody}`}>{provenance.detail}</dd>
        </dl>
      </Chapter>

      {/* ── V · Le produit (clôture) ── */}
      <Chapter id="final" index={5} side="center" stacked={reduced} hidden>
        <h2 className="font-body font-light text-ivory">
          {a.closingTitle.map((line) => (
            <span
              key={line}
              className="block text-[clamp(2.2rem,6vw,4.6rem)] leading-[1.04] tracking-[-0.02em]"
            >
              {line}
            </span>
          ))}
        </h2>
        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-9 md:justify-center">
          <Link
            href={localePath(locale, '/parfums')}
            className="ds-btn inline-flex items-center justify-center rounded-sm border border-gold bg-burgundy px-7 py-3.5 font-ui text-2xs font-semibold tracking-(--tracking-label) text-ivory uppercase transition-colors hover:border-gold-light hover:bg-burgundy-2"
          >
            {a.closingCta}
          </Link>
          <Link
            href={localePath(locale, '/trouver')}
            className="ds-navlink font-ui text-2xs tracking-(--tracking-label) text-ivory/70 uppercase transition-colors hover:text-gold-light"
          >
            {a.closingSecondary}
          </Link>
        </div>
      </Chapter>
    </>
  );

  return (
    <div ref={rootRef}>
      {/* Si JavaScript est absent, les blocs ne seraient jamais révélés. */}
      <noscript>
        <style>{'[data-chapter]{visibility:visible!important;opacity:1!important;transform:none!important}'}</style>
      </noscript>

      {reduced ? (
        // Mouvement réduit : une image posée, puis les chapitres en lecture.
        <section aria-labelledby="maison-titre" className="relative border-b border-smoke-2 bg-noir">
          <div className="relative h-[70svh]">
            <FlaconScene className="absolute inset-0" />
          </div>
          <p className="sr-only">{a.sceneCaption}</p>
          {chapters}
        </section>
      ) : (
        // La piste de défilement : plusieurs écrans, un cadre COLLANT qui tient
        // le canvas et les cinq blocs de texte pendant que la timeline joue.
        // Surtout pas d'`overflow-hidden` sur la section : il en ferait son
        // propre conteneur de défilement et le plan cesserait de coller. Le
        // recadrage se fait dans le cadre collant.
        <section
          data-scene-track
          aria-labelledby="maison-titre"
          className="relative border-b border-smoke-2 bg-noir"
        >
          <div className="pointer-events-none sticky top-0 h-svh overflow-hidden">
            <FlaconScene className="absolute inset-0" />
            {chapters}
          </div>
          <p className="sr-only">{a.sceneCaption}</p>
          {/* La course : ~5,6 écrans de défilement pour cinq chapitres. */}
          <div aria-hidden="true" className="h-[480svh] md:h-[560svh]" />
        </section>
      )}

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
        className="border-t border-smoke-2 bg-noir px-6 py-28 md:px-12 md:py-36 lg:px-20"
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
    </div>
  );
}
