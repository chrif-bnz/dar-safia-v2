'use client';

import { useEffect, useRef } from 'react';

import { useReveal } from '@/components/motion/useReveal';
import { BCP47, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionary';

/**
 * ══════════════════════════════════════════════════════════════
 *   LA MAISON EN CHIFFRES
 * ══════════════════════════════════════════════════════════════
 *
 * Trois chiffres, tous vérifiables : le nombre de créations et de maisons
 * vient du catalogue (passé en props par la page, composant serveur), les
 * 58 wilayas sont le périmètre de livraison affiché partout sur le site.
 * Aucune statistique inventée — pas de « clients satisfaits », pas d'années
 * d'existence.
 *
 * Le chiffre domine, le libellé se tient en dessous, discret. Pas d'icône.
 *
 * Seule section CLAIRE de l'accueil (ivoire, texte bordeaux) : le rythme de la
 * page — sombre, sombre, sombre — a besoin d'un souffle. Elle n'arrive pas d'un
 * coup : le panneau s'ouvre à l'entrée (clip-path piloté par le défilement),
 * puis les chiffres comptent jusqu'à leur valeur réelle. Sous
 * `prefers-reduced-motion`, rien ne bouge : valeurs finales, panneau plein.
 */
export function HouseFigures({
  creations,
  houses,
  wilayas,
  locale,
  dict,
}: {
  creations: number;
  houses: number;
  wilayas: number;
  locale: Locale;
  dict: Dictionary;
}) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, [creations, houses, wilayas]);

  const f = dict.figures;
  const nf = new Intl.NumberFormat(BCP47[locale]);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let disposed = false;
    let teardown: (() => void) | null = null;

    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (disposed || !ref.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // Le panneau s'ouvre : il entre en retrait, arrondi, et se déploie
        // jusqu'aux bords pendant qu'on le rejoint.
        gsap.fromTo(
          root,
          { clipPath: 'inset(9% 5% 0% 5% round 28px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 0px)',
            ease: 'none',
            scrollTrigger: { trigger: root, start: 'top 98%', end: 'top 38%', scrub: true },
          }
        );

        // Les chiffres comptent une fois, à l'arrivée.
        root.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
          const target = Number(el.dataset.count);
          const counter = { v: 0 };
          el.textContent = nf.format(0);
          gsap.to(counter, {
            v: target,
            duration: 2.2,
            ease: 'power3.out',
            snap: { v: 1 },
            onUpdate: () => {
              el.textContent = nf.format(counter.v);
            },
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          });
        });
      }, root);

      teardown = () => ctx.revert();
    })();

    return () => {
      disposed = true;
      teardown?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- nf dérive de `locale`
  }, [locale, creations, houses, wilayas]);


  const rows = [
    { value: creations, label: f.creations },
    { value: houses, label: f.houses },
    { value: wilayas, label: f.wilayas },
  ];

  return (
    <section
      ref={ref}
      aria-labelledby="chiffres"
      className="bg-ivory px-6 py-24 md:px-12 md:py-32 lg:px-20"
    >
      <div className="mx-auto max-w-(--container-site)">
        <h2
          id="chiffres"
          className="font-body font-light text-burgundy"
        >
          <span className="block overflow-hidden">
            <span
              data-rise
              className="block text-[clamp(1.5rem,2.8vw,2.2rem)] leading-[1.15] tracking-[-0.01em]"
            >
              {f.title}
            </span>
          </span>
        </h2>

        <dl className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-3 md:mt-20">
          {rows.map((row) => (
            <div key={row.label} data-fade className="border-t border-burgundy/25 pt-6">
              <dd className="font-body font-light text-burgundy tabular-nums">
                <span data-count={row.value} className="block text-[clamp(3rem,7vw,5.5rem)] leading-none">
                  {nf.format(row.value)}
                </span>
              </dd>
              <dt className="mt-4 max-w-[16ch] font-ui text-2xs leading-[1.7] tracking-[0.08em] text-noir-2/75">
                {row.label}
              </dt>
            </div>
          ))}
        </dl>

        <p data-fade className="mt-14 font-ui text-3xs tracking-[0.06em] text-noir-2/65">
          {f.note}
        </p>
      </div>
    </section>
  );
}
