'use client';

import { useEffect, useRef, type CSSProperties } from 'react';

import { useReveal } from '@/components/motion/useReveal';
import type { Dictionary } from '@/lib/i18n/dictionary';

/**
 * ══════════════════════════════════════════════════════════════
 *   MANIFESTE
 * ══════════════════════════════════════════════════════════════
 *
 * Le moment qui suit le film. Il doit tenir l'élan : la déclaration se
 * pose, puis le texte « s'allume » mot à mot au rythme du défilement (la
 * lecture est le mouvement), trois exigences se tracent l'une après l'autre,
 * et deux bandes de maisons passent en sens contraire sous le tout.
 *
 * Rien n'est inventé : les trois exigences sont celles que la phrase d'appui
 * énonçait déjà ; les noms des bandes sont les maisons réellement au
 * catalogue.
 */
export function Manifesto({ dict, houses }: { dict: Dictionary; houses: string[] }) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const m = dict.manifesto;
  const words = m.body.split(' ');

  // Mouvements adossés au défilement : mots qui s'allument, filets qui se
  // tracent, lueurs qui dérivent.
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let disposed = false;
    let teardown: (() => void) | null = null;

    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // Le texte s'allume : chaque mot passe de l'ombre à la lumière.
        gsap.fromTo(
          '[data-lit]',
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.12,
            scrollTrigger: {
              trigger: '[data-lit-block]',
              start: 'top 82%',
              end: 'bottom 48%',
              scrub: 0.6,
            },
          }
        );

        // Trois exigences : le filet se trace, le chiffre et le titre suivent.
        gsap.utils.toArray<HTMLElement>('[data-pillar]').forEach((el) => {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 62%', scrub: 0.7 },
          });
          tl.fromTo(el.querySelector('[data-rule]'), { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0)
            .fromTo(
              el.querySelectorAll('[data-pillar-in]'),
              { opacity: 0, y: 22 },
              { opacity: 1, y: 0, ease: 'none', stagger: 0.15 },
              0.1
            );
        });

        // Les lueurs dérivent à des vitesses différentes : de la profondeur.
        gsap.utils.toArray<HTMLElement>('[data-orb]').forEach((el, i) => {
          gsap.fromTo(
            el,
            { yPercent: i % 2 ? 18 : -14 },
            {
              yPercent: i % 2 ? -22 : 20,
              ease: 'none',
              scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
            }
          );
        });

        // Les bandes accélèrent un peu quand on défile : elles répondent à la main.
        const rows = gsap.utils.toArray<HTMLElement>('[data-marquee-row]');
        rows.forEach((row, i) => {
          gsap.fromTo(
            row,
            { xPercent: i % 2 ? -8 : 0 },
            {
              xPercent: i % 2 ? 0 : -8,
              ease: 'none',
              scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
            }
          );
        });
      }, root);

      teardown = () => ctx.revert();
    })();

    return () => {
      disposed = true;
      teardown?.();
    };
  }, []);

  const roman = ['I', 'II', 'III'];

  return (
    <section
      ref={ref}
      aria-labelledby="manifeste"
      style={{ '--seam-from': 'var(--color-noir)' } as CSSProperties}
      className="ds-seam ds-grain relative overflow-hidden bg-burgundy px-6 pt-28 pb-0 md:px-12 md:pt-40 lg:px-20"
    >
      {/* Le bordeaux n'est pas un aplat : une lumière chaude le traverse en
          diagonale, une ombre d'espresso le tient aux bords. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 55% at 78% 28%, rgba(79,26,33,0.95) 0%, transparent 70%),' +
            'radial-gradient(45% 40% at 8% 92%, rgba(184,134,43,0.12) 0%, transparent 70%),' +
            'linear-gradient(to bottom, rgba(76,24,30,0.55) 0%, transparent 28%, transparent 78%, rgba(76,24,30,0.5) 100%)',
        }}
      />
      {/* Deux lueurs qui dérivent au défilement. */}
      <div
        aria-hidden="true"
        data-orb
        className="pointer-events-none absolute -end-[12%] top-[8%] size-[46vmax] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(214,171,90,0.13) 0%, transparent 62%)' }}
      />
      <div
        aria-hidden="true"
        data-orb
        className="pointer-events-none absolute -start-[14%] top-[46%] size-[40vmax] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(150,40,55,0.4) 0%, transparent 64%)' }}
      />

      <div className="mx-auto max-w-(--container-site)">
        <h2 id="manifeste" className="font-body font-light text-ivory">
          {m.lines.map((line) => (
            <span key={line} className="block overflow-hidden">
              <span
                data-rise
                className="block text-[clamp(2.6rem,9vw,8rem)] leading-[1.0] tracking-[-0.025em]"
              >
                {line}
              </span>
            </span>
          ))}
        </h2>

        {/* Le corps s'allume mot à mot. */}
        <div className="mt-14 md:mt-24">
          <p
            data-lit-block
            className="max-w-[46rem] font-body text-[clamp(1.35rem,2.6vw,2.4rem)] leading-[1.35] font-light text-ivory md:ms-[25%]"
          >
            {words.map((w, i) => (
              <span key={i} data-lit className="inline-block opacity-100">
                {w}
                {i < words.length - 1 ? ' ' : ''}
              </span>
            ))}
          </p>
        </div>

        {/* Les trois exigences, tracées l'une après l'autre. */}
        <ol className="mt-20 grid gap-0 md:mt-32 md:grid-cols-3 md:gap-10">
          {m.pillars.map((title, i) => (
            <li key={title} data-pillar className="pt-6 pb-8 md:pb-0">
              <span
                data-rule
                aria-hidden="true"
                className="block h-px origin-left bg-gradient-to-r from-gold via-gold-light to-gold/10 rtl:origin-right"
              />
              <span
                data-pillar-in
                className="mt-5 block font-serif text-2xl text-gold-light italic"
                aria-hidden="true"
              >
                {roman[i]}
              </span>
              <span
                data-pillar-in
                className="mt-2 block font-body text-xl font-light text-ivory md:text-2xl"
              >
                {title}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Les maisons, en deux bandes de sens contraire — décor, donc masqué
          aux lecteurs d'écran (la liste vit dans le catalogue). */}
      <div aria-hidden="true" className="ds-marquee relative mt-24 -mx-6 pb-16 md:-mx-12 md:mt-36 md:pb-24 lg:-mx-20">
        {[0, 1].map((row) => (
          <div key={row} className="ds-marquee__mask overflow-hidden">
            <div data-marquee-row>
            <div className={`ds-marquee__track ${row ? 'ds-marquee__track--rev' : ''}`}>
              {[0, 1].map((copy) => (
                <ul key={copy} className="flex shrink-0 items-center">
                  {(row ? [...houses].reverse() : houses).map((h) => (
                    <li
                      key={h}
                      className={`flex items-center whitespace-nowrap font-body text-[clamp(2.2rem,6.5vw,5.5rem)] leading-[1.15] font-light tracking-[-0.01em] ${
                        row ? 'text-ivory/80' : 'ds-outline-text'
                      }`}
                    >
                      {h}
                      <span className="mx-[0.55em] text-[0.4em] text-gold">◆</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
