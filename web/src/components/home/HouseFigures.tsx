'use client';

import { useEffect, useRef } from 'react';

import { BCP47, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionary';

/**
 * ══════════════════════════════════════════════════════════════
 *   LA MAISON EN QUELQUES CHIFFRES
 * ══════════════════════════════════════════════════════════════
 *
 * Trois chiffres, tous vérifiables : créations et maisons viennent du
 * catalogue (passés en props par la page, composant serveur) ; les 58 wilayas
 * sont le périmètre de livraison affiché partout sur le site. Aucune
 * statistique inventée.
 *
 * Section sombre, comme le reste du site : dégradé brun, halo doré derrière le
 * chiffre central, grain léger, monogramme en filigrane qui dérive lentement.
 *
 * Mouvement : IntersectionObserver, une seule fois. Les colonnes entrent en
 * décalé (opacité + translateY), les filets se dessinent (scaleX), le titre se
 * révèle mot à mot (masque), les chiffres comptent de 0 à leur valeur.
 * Seuls `transform` et `opacity` sont animés. Sans JavaScript ou sous
 * `prefers-reduced-motion`, rien n'est armé : valeurs finales, tout visible.
 */
const COUNT_MS = 1600;

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
  const f = dict.figures;
  const nf = new Intl.NumberFormat(BCP47[locale]);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const counters = [...root.querySelectorAll<HTMLElement>('[data-count]')];
    const format = new Intl.NumberFormat(BCP47[locale]);
    let frame = 0;
    let started = false;

    // Armer : états de départ (masqués), puis révélation à l'arrivée.
    counters.forEach((el) => {
      el.textContent = format.format(0);
    });
    root.dataset.armed = 'true';

    const run = () => {
      if (started) return;
      started = true;
      root.dataset.in = 'true';

      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / COUNT_MS);
        const eased = 1 - Math.pow(1 - p, 3);
        counters.forEach((el) => {
          el.textContent = format.format(Math.round(Number(el.dataset.count) * eased));
        });
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      delete root.dataset.armed;
      delete root.dataset.in;
      // Valeurs finales si le composant est remonté sans nouvelle animation.
      counters.forEach((el) => {
        el.textContent = format.format(Number(el.dataset.count));
      });
    };
  }, [locale, creations, houses, wilayas]);

  const rows = [
    { value: creations, label: f.creations },
    { value: houses, label: f.houses },
    { value: wilayas, label: f.wilayas },
  ];
  const words = f.title.split(' ');

  return (
    <section ref={ref} aria-labelledby="chiffres" className="ds-figs">
      <div aria-hidden="true" className="ds-figs__halo" />
      <div aria-hidden="true" className="ds-figs__grain" />
      {/* eslint-disable-next-line @next/next/no-img-element -- filigrane décoratif, un seul fichier statique */}
      <img
        src="/img/logo/logo-dr/monogramme-filigrane.png"
        alt=""
        aria-hidden="true"
        width={1100}
        height={912}
        loading="lazy"
        decoding="async"
        className="ds-figs__mark"
      />

      <div className="ds-figs__inner">
        <h2 id="chiffres" className="ds-figs__title">
          {words.map((word, i) => (
            <span key={`${word}-${i}`} className="ds-figs__mask">
              <span className="ds-figs__word" style={{ ['--i' as string]: i }}>
                {word}
              </span>
              {i < words.length - 1 ? ' ' : null}
            </span>
          ))}
        </h2>

        <dl className="ds-figs__grid">
          {rows.map((row, i) => (
            <div key={row.label} className="ds-figs__col" style={{ ['--d' as string]: `${i * 150}ms` }}>
              <span className="ds-figs__rule" aria-hidden="true" />
              <dd className="ds-figs__value">
                <span data-count={row.value}>{nf.format(row.value)}</span>
              </dd>
              <dt className="ds-figs__label">{row.label}</dt>
            </div>
          ))}
        </dl>

        <p className="ds-figs__note">{f.note}</p>
      </div>
    </section>
  );
}
