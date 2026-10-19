'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  useSyncExternalStore,
  useTransition,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { createPortal } from 'react-dom';

import { useI18n } from '@/components/i18n/I18nProvider';
import { LoadingMark } from '@/components/LoadingMark';
import { usePrefersReducedMotion } from '@/components/motion/usePrefersReducedMotion';
import { ProductImage } from '@/components/ProductImage';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionary';
import { localePath } from '@/lib/i18n/routing';
import { QUIZ_STEPS, type QuizAnswers, type QuizStepKey } from '@/lib/quiz/types';
import { whatsappUrl } from '@/lib/whatsapp';

import { diagnoseScent, type ScentDiagnosis } from './actions';

/**
 * ══════════════════════════════════════════════════════════════
 *   TROUVER VOTRE PARFUM — LE DIAGNOSTIC
 * ══════════════════════════════════════════════════════════════
 *
 * Ce qui a changé dans le mouvement (la logique du diagnostic, elle, est
 * intacte) :
 *
 *  - TRANSFORM + OPACITY SEULEMENT. Les anciennes cartes animaient `filter:
 *    blur()` : un flou recalculé par image, sur quatre cartes, c'est ce qui
 *    saccadait. Plus aucun filtre animé.
 *  - Une seule courbe (`EASE`) et une cadence : la question se lève mot à
 *    mot derrière un masque, les cartes arrivent de côté en s'échelonnant.
 *  - Le choix a un GESTE : la carte choisie se remplit d'or de gauche à droite,
 *    les autres s'éteignent, PUIS tout part vers le haut. Avant, le contenu
 *    disparaissait pendant que l'état changeait.
 *  - Le décor ne saute plus : quatre nappes de lumière, une par étape, en
 *    fondu enchaîné (un dégradé ne se « transitionne » pas en CSS — l'ancien
 *    fond claquait d'une teinte à l'autre). Une lueur suit le pointeur avec
 *    inertie. Plus de texture chargée depuis un site tiers.
 *  - L'inclinaison des cartes passe par `quickTo` : un seul tween réutilisé,
 *    au lieu d'un nouveau à chaque mouvement de souris.
 *  - Le résultat se dévoile (cadre qui s'ouvre, image qui se pose, lignes
 *    échelonnées, pourcentage qui monte).
 */

type Phase =
  | { name: 'question'; step: number }
  | { name: 'loading' }
  | { name: 'result'; diagnosis: ScentDiagnosis }
  | { name: 'error' };

interface OptionCopy {
  label: string;
  hint: string;
}

const primaryButton =
  'ds-btn rounded-sm border border-gold bg-burgundy px-6 py-3 text-2xs font-semibold tracking-(--tracking-label) text-ivory uppercase transition-colors hover:border-gold-light hover:bg-burgundy-2';
const secondaryButton =
  'ds-btn-ghost mt-2 inline-block rounded-sm border border-smoke-2 px-6 py-3 text-2xs font-semibold tracking-(--tracking-label) text-ivory/75 uppercase transition-colors hover:border-gold hover:text-noir';

/** La courbe de la maison — la même que l'intro de l'accueil. */
const EASE = 'power3.out';
const EASE_IN_OUT = 'power3.inOut';
/** Durée minimale du « rituel » entre la dernière réponse et le résultat. */
const RITUAL_MS = 2200;

const reducedNow = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Distance latérale d'entrée des cartes : discrète sur téléphone. */
const sideDistance = () => (window.innerWidth < 640 ? 22 : 54);

export function ScentFinder() {
  const { locale, dict, fill } = useI18n();
  const sf = dict.scentFinder;
  const reduced = usePrefersReducedMotion();

  const [phase, setPhase] = useState<Phase>({ name: 'question', step: 0 });
  // Les réponses sont relues du sessionStorage à l'initialisation : un
  // rechargement en cours de route ne fait pas tout recommencer.
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const saved = window.sessionStorage.getItem('sf_answers');
      return saved ? (JSON.parse(saved) as Partial<QuizAnswers>) : {};
    } catch {
      return {};
    }
  });
  const [selected, setSelected] = useState<string | null>(null);

  const [, startTransition] = useTransition();
  const containerRef = useRef<HTMLDivElement>(null);
  /** Verrou de transition : une seule à la fois, sans repasser par un rendu. */
  const busy = useRef(false);
  const direction = useRef<1 | -1>(1);

  const titleWords = sf.title.split(' ');
  const step = phase.name === 'question' ? QUIZ_STEPS[phase.step] : QUIZ_STEPS[0];
  const currentStep = phase.name === 'question' ? phase.step : 0;
  const question = (sf.questions as Record<string, string>)[step.key] ?? '';
  const options = sf.options as Record<string, OptionCopy>;

  useEffect(() => {
    try {
      window.sessionStorage.setItem('sf_answers', JSON.stringify(answers));
    } catch {
      // Navigation privée : le diagnostic fonctionne sans mémoire.
    }
  }, [answers]);

  // ── Entrées ───────────────────────────────────────────────
  useGSAP(
    () => {
      if (reducedNow()) {
        // Mouvement réduit : tout est posé à l'état final, sans trajet.
        gsap.set(
          '.sf-label, .sf-intro, .sf-progress, .sf-btn, .sf-nav, .sf-q-word, .sf-title-word, .sf-ritual-chip, .sf-res-eyebrow, .sf-res-frame, .sf-res-line, .sf-alt',
          { opacity: 1, x: 0, y: 0, yPercent: 0, scale: 1, clipPath: 'none' }
        );
        gsap.set('.sf-bar-fill', { scaleX: (i) => (phase.name === 'question' && i <= phase.step ? 1 : 0) });
        busy.current = false;
        return;
      }
      if (phase.name === 'loading') {
        gsap.fromTo(
          '.sf-ritual-chip',
          { opacity: 0, y: 16, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.16, duration: 0.7, ease: EASE, delay: 0.2 }
        );
        return;
      }
      if (phase.name !== 'question') return;

      const first = phase.step === 0 && Object.keys(answers).length === 0;
      const dir = direction.current;
      const side = reducedNow() ? 0 : sideDistance();
      const tl = gsap.timeline({
        onComplete: () => {
          busy.current = false;
          gsap.set('.sf-btn', { clearProps: 'transform' });
          if (!first) document.getElementById('sf-question-legend')?.focus({ preventScroll: true });
        },
      });
      busy.current = true;

      if (!first) gsap.set('.sf-label, .sf-intro, .sf-title-word', { opacity: 1 });
      if (first) {
        tl.set('.sf-title-word', { opacity: 1 }, 0)
          .fromTo('.sf-label', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: EASE }, 0.05)
          .fromTo(
            '.sf-title-word',
            { yPercent: 110 },
            { yPercent: 0, duration: 1.0, stagger: 0.07, ease: 'power4.out' },
            0.1
          )
          .fromTo('.sf-intro', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8, ease: EASE }, 0.4);
      }

      const base = first ? 0.55 : 0;
      tl.fromTo('.sf-progress', { opacity: 0, y: 8 * dir }, { opacity: 1, y: 0, duration: 0.6, ease: EASE }, base)
        // Les segments : ceux déjà franchis sont pleins, le courant se remplit.
        .set('.sf-bar-fill', { scaleX: (i) => (i < phase.step ? 1 : 0) }, 0)
        .to('.sf-bar-fill', { scaleX: (i) => (i <= phase.step ? 1 : 0), duration: 0.9, ease: EASE_IN_OUT }, base + 0.1)
        .fromTo(
          '.sf-q-word',
          { yPercent: 115 * dir, opacity: 1 },
          { yPercent: 0, duration: 0.85, stagger: 0.045, ease: 'power4.out' },
          base + 0.05
        )
        .fromTo(
          '.sf-btn',
          { opacity: 0, y: 30 * dir, x: (i) => (i % 2 === 0 ? -side : side) * 0.5, scale: 0.97 },
          { opacity: 1, y: 0, x: 0, scale: 1, duration: 0.95, stagger: 0.09, ease: 'power3.out' },
          base + 0.2
        )
        .fromTo('.sf-nav', { opacity: 0 }, { opacity: 1, duration: 0.5, ease: EASE }, base + 0.55);
    },
    {
      scope: containerRef,
      dependencies: [phase.name === 'question' ? phase.step : -1, phase.name],
    }
  );

  // Le résultat se dévoile.
  useGSAP(
    () => {
      if (phase.name !== 'result') return;
      const pct = containerRef.current?.querySelector<HTMLElement>('.sf-res-pct');
      const target = phase.diagnosis.match.compatibility;
      const counter = { v: 0 };

      const tl = gsap.timeline({ defaults: { ease: EASE } });
      tl.fromTo('.sf-res-eyebrow', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 0)
        .fromTo(
          '.sf-res-frame',
          { clipPath: 'inset(14% 14% 14% 14%)', opacity: 0 },
          { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 1.3, ease: 'power4.out' },
          0.1
        )
        .fromTo('.sf-res-img', { scale: 1.22 }, { scale: 1, duration: 2.2, ease: 'power3.out' }, 0.1)
        .fromTo(
          '.sf-res-line',
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.09 },
          0.45
        )
        .to(
          counter,
          {
            v: target,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: () => {
              if (pct) pct.textContent = fill(sf.compatibility, { percent: Math.round(counter.v) });
            },
          },
          0.7
        )
        .fromTo('.sf-alt', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, 1.0);
    },
    { scope: containerRef, dependencies: [phase.name] }
  );

  // ── Choix et retour ────────────────────────────────────────
  function choose<K extends QuizStepKey>(key: K, value: QuizAnswers[K]) {
    if (busy.current || phase.name !== 'question') return;
    busy.current = true;
    direction.current = 1;
    setSelected(value);

    const still = reducedNow();
    const tl = gsap.timeline();
    const chosen = `#btn-${value}`;
    if (!still) {
      tl.to(`.sf-btn:not(${chosen})`, { opacity: 0.22, scale: 0.98, duration: 0.3, ease: 'power2.out' }, 0)
        // L'or monte dans la carte choisie, de gauche à droite.
        .fromTo(`${chosen} .sf-fill`, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: EASE_IN_OUT }, 0)
        .to(chosen, { scale: 1.015, duration: 0.25, ease: 'power2.out' }, 0.1);
    }
    tl.to(
      '.sf-btn',
      { y: still ? 0 : -22, opacity: 0, duration: still ? 0.15 : 0.45, stagger: still ? 0 : 0.04, ease: 'power2.in' },
      still ? 0 : 0.5
    )
      .to('.sf-q-word', { yPercent: still ? 0 : -115, opacity: still ? 0 : 1, duration: still ? 0.15 : 0.4, ease: 'power2.in' }, still ? 0 : 0.5)
      .to('.sf-nav', { opacity: 0, duration: 0.25 }, still ? 0 : 0.5)
      .call(() => {
        const next = { ...answers, [key]: value };
        setAnswers(next);
        setSelected(null);
        const index = QUIZ_STEPS.findIndex((s) => s.key === key);
        if (index < QUIZ_STEPS.length - 1) {
          setPhase({ name: 'question', step: index + 1 });
          return;
        }
        setPhase({ name: 'loading' });
        startTransition(async () => {
          const [diagnosis] = await Promise.all([
            diagnoseScent(next, locale),
            new Promise((resolve) => setTimeout(resolve, RITUAL_MS)),
          ]);
          // Le rituel s'efface avant le résultat : un fondu, pas un saut.
          await new Promise<void>((resolve) => {
            gsap.to('.sf-loading', { opacity: 0, y: -14, duration: 0.5, ease: 'power2.in', onComplete: resolve });
          });
          busy.current = false;
          setPhase(diagnosis ? { name: 'result', diagnosis } : { name: 'error' });
        });
      });
  }

  function goBack() {
    if (busy.current || phase.name !== 'question' || phase.step === 0) return;
    busy.current = true;
    direction.current = -1;
    const still = reducedNow();
    gsap
      .timeline()
      .to('.sf-btn', { y: still ? 0 : 22, opacity: 0, duration: still ? 0.15 : 0.35, stagger: still ? 0 : 0.03, ease: 'power2.in' }, 0)
      .to('.sf-q-word', { yPercent: still ? 0 : 115, opacity: still ? 0 : 1, duration: still ? 0.15 : 0.35, ease: 'power2.in' }, 0)
      .to('.sf-nav', { opacity: 0, duration: 0.2 }, 0)
      .call(() => setPhase({ name: 'question', step: phase.step - 1 }));
  }

  function restart() {
    direction.current = 1;
    busy.current = false;
    setAnswers({});
    try {
      window.sessionStorage.removeItem('sf_answers');
    } catch {
      // sans mémoire : rien à effacer
    }
    setPhase({ name: 'question', step: 0 });
    setSelected(null);
  }

  // Les raccourcis clavier lisent toujours l'état courant sans réabonner.
  const onKey = useEffectEvent((e: KeyboardEvent) => {
    if (phase.name !== 'question') return;
    if (['1', '2', '3', '4'].includes(e.key)) {
      const option = QUIZ_STEPS[phase.step].options[Number(e.key) - 1];
      if (option) choose(QUIZ_STEPS[phase.step].key, option as never);
    } else if (e.key === 'Backspace' || e.key === 'ArrowLeft') {
      goBack();
    }
  });
  useEffect(() => {
    const handler = (e: KeyboardEvent) => onKey(e);
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Changement de langue sur le résultat : on recalcule les libellés.
  const refreshResult = useEffectEvent(() => {
    startTransition(async () => {
      const diagnosis = await diagnoseScent(answers, locale);
      if (diagnosis) setPhase({ name: 'result', diagnosis });
    });
  });
  const phaseName = phase.name;
  useEffect(() => {
    if (phaseName === 'result') refreshResult();
  }, [locale, phaseName]);

  // ── Inclinaison + lueur des cartes (un seul tween réutilisé par carte) ──
  const tiltRefs = useRef(new WeakMap<HTMLElement, { rx: gsap.QuickToFunc; ry: gsap.QuickToFunc }>());
  const onCardMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== 'mouse' || reduced) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    let q = tiltRefs.current.get(el);
    if (!q) {
      gsap.set(el, { transformPerspective: 900 });
      q = {
        rx: gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3.out' }),
        ry: gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3.out' }),
      };
      tiltRefs.current.set(el, q);
    }
    q.rx((ny - 0.5) * -6);
    q.ry((nx - 0.5) * 6);
    // La lueur suit le curseur : variables CSS, rien d'animé en JS.
    el.style.setProperty('--mx', `${nx * 100}%`);
    el.style.setProperty('--my', `${ny * 100}%`);
  };
  const onCardLeave = (e: ReactPointerEvent<HTMLButtonElement>) => {
    const q = tiltRefs.current.get(e.currentTarget);
    q?.rx(0);
    q?.ry(0);
  };

  const tone = phase.name === 'result' ? 0 : phase.name === 'loading' ? 3 : currentStep;

  return (
    <div ref={containerRef} className="relative z-10 min-h-[500px]">
      <AmbientBackground tone={tone} reduced={reduced} />

      {phase.name === 'loading' && (
        <div className="sf-loading flex min-h-[420px] flex-col items-center justify-center py-24 text-center">
          <LoadingMark />
          <p className="mt-8 font-serif text-2xl text-gold" aria-live="polite">
            {sf.loading}
          </p>
          <div className="mt-8 flex max-w-lg flex-wrap justify-center gap-3">
            {Object.values(answers).map((answer, i) => (
              <span
                key={i}
                className="sf-ritual-chip rounded-full border border-gold/40 bg-noir-2 px-5 py-2.5 text-xs tracking-wider text-ivory opacity-0 shadow-[0_0_15px_rgba(212,175,55,0.1)]"
              >
                {options[answer]?.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {phase.name === 'error' && (
        <div className="py-16 text-center">
          <p className="font-body text-xl text-ivory/70">{sf.error}</p>
          <button type="button" onClick={restart} className={secondaryButton}>
            {sf.restart}
          </button>
        </div>
      )}

      {phase.name === 'result' && (
        <ScentResultView
          diagnosis={phase.diagnosis}
          answers={answers}
          onRestart={restart}
          locale={locale}
          dict={dict}
          fill={fill}
        />
      )}

      {phase.name === 'question' && (
        <div className="relative z-10">
          <div>
            <p className="sf-label text-3xs opacity-0 font-semibold tracking-(--tracking-eyebrow) text-gold uppercase">
              {sf.eyebrow}
            </p>
            <h1 className="sf-title mt-4 pb-2 font-serif text-display-md text-balance text-ivory">
              {titleWords.map((word, i) => (
                <span key={i} className="me-2 inline-block overflow-hidden align-bottom">
                  <span className="sf-title-word inline-block opacity-0">{word}</span>
                </span>
              ))}
            </h1>
            <p className="sf-intro mt-4 opacity-0 max-w-md font-body text-xl leading-relaxed text-ivory/65">
              {sf.intro}
            </p>
          </div>

          <div>
            <div className="sf-progress opacity-0">
              <span
                className="text-3xs tracking-(--tracking-eyebrow) text-gold uppercase"
                aria-live="polite"
              >
                {fill(sf.stepLabel, { current: currentStep + 1, total: QUIZ_STEPS.length })}
              </span>
              <div className="mt-3 flex h-px w-full gap-1.5" role="presentation">
                {QUIZ_STEPS.map((_, i) => (
                  <div key={i} className="h-full flex-1 overflow-hidden bg-smoke-2">
                    <div className="sf-bar-fill h-full origin-left bg-gold" />
                  </div>
                ))}
              </div>
            </div>

            <fieldset className="mt-8 md:mt-10">
              <legend
                id="sf-question-legend"
                tabIndex={-1}
                className="font-serif text-display-sm text-balance text-ivory outline-none"
              >
                {/* Le masque est PAR MOT : la question se lève mot à mot. */}
                {question.split(' ').map((word, i) => (
                  <span key={`${currentStep}-${i}`} className="me-[0.28em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                    <span className="sf-q-word inline-block opacity-0">{word}</span>
                  </span>
                ))}
              </legend>

              <div key={currentStep} className="mt-8 grid gap-4 sm:grid-cols-2" role="radiogroup">
                {step.options.map((value) => {
                  const isSelected = selected === value;
                  return (
                    <button
                      key={value}
                      id={`btn-${value}`}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onPointerMove={onCardMove}
                      onPointerLeave={onCardLeave}
                      onClick={() => choose(step.key, value as never)}
                      style={{ '--mx': '50%', '--my': '50%' } as CSSProperties}
                      className="sf-btn group relative flex flex-col items-start overflow-hidden rounded-md border border-smoke-2 bg-noir-2 p-6 text-start opacity-0 transition-[border-color] duration-300 hover:border-gold/70 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                    >
                      {/* Lueur au curseur */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          background:
                            'radial-gradient(220px circle at var(--mx) var(--my), rgba(214,171,90,0.16), transparent 70%)',
                        }}
                      />
                      {/* L'or qui monte au choix */}
                      <span
                        aria-hidden="true"
                        className="sf-fill pointer-events-none absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-gold/35 via-gold/20 to-gold/5 rtl:origin-right"
                      />
                      <div className="relative z-10 flex w-full items-center justify-between">
                        <span className="font-serif text-lg text-ivory transition-colors duration-300 group-hover:text-gold-light">
                          {options[value]?.label ?? value}
                        </span>
                        <span
                          aria-hidden="true"
                          className="shrink-0 -translate-x-2 text-gold opacity-0 transition-[opacity,transform] duration-500 ease-(--ease-lux) group-hover:translate-x-0 group-hover:opacity-100 rtl:translate-x-2 rtl:rotate-180 rtl:group-hover:translate-x-0"
                        >
                          →
                        </span>
                      </div>
                      <span className="relative z-10 mt-2 text-2xs text-ivory/50">
                        {options[value]?.hint}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {currentStep > 0 && (
              <button
                type="button"
                onClick={goBack}
                className="sf-nav opacity-0 ds-navlink group mt-8 flex items-center gap-2 text-2xs tracking-(--tracking-label) text-ivory/58 uppercase transition-colors hover:text-gold"
              >
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1 rtl:rotate-180">
                  ←
                </span>{' '}
                {sf.previous.replace(/^[←\s]+/, '')}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

type Fill = (t: string, p?: Record<string, string | number>) => string;

function ScentResultView({
  diagnosis,
  answers,
  onRestart,
  locale,
  dict,
  fill,
}: {
  diagnosis: ScentDiagnosis;
  answers: Partial<QuizAnswers>;
  onRestart: () => void;
  locale: Locale;
  dict: Dictionary;
  fill: Fill;
}) {
  const sf = dict.scentFinder;
  const expl = sf.explanation;
  const opts = sf.options as Record<string, OptionCopy>;
  const { match, alternatives } = diagnosis;

  const parts: string[] = [];
  if (match.matchedCriteria.family && answers.family) {
    parts.push(fill(expl.family, { family: opts[answers.family].label.toLowerCase() }));
  }
  if (match.matchedCriteria.moment && answers.moment) {
    parts.push(fill(expl.moment, { moment: opts[answers.moment].label.toLowerCase() }));
  }
  if (match.matchedCriteria.intensity && answers.intensity) {
    parts.push(fill(expl.intensity, { intensity: opts[answers.intensity].label.toLowerCase() }));
  }

  let explanationStr = '';
  if (parts.length === 1) explanationStr = `${expl.base} ${parts[0]}.`;
  else if (parts.length === 2) explanationStr = `${expl.base} ${parts[0]} ${expl.and} ${parts[1]}.`;
  else if (parts.length > 2) {
    explanationStr = `${expl.base} ${parts[0]}, ${parts[1]} ${expl.and} ${parts[2]}.`;
  }

  const orderUrl = whatsappUrl(
    [
      dict.common.orderGreeting,
      '',
      sf.orderIntro,
      `• ${match.name} (${match.brandName})`,
      `• ${match.priceLabel}`,
      '',
      sf.orderOutro,
    ].join('\n')
  );

  return (
    <div>
      <p className="opacity-0 sf-res-eyebrow text-3xs tracking-(--tracking-eyebrow) text-gold uppercase">
        {sf.resultEyebrow}
      </p>

      <div className="mt-8 grid gap-10 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:items-center">
        <div className="opacity-0 sf-res-frame overflow-hidden rounded-md border border-smoke-2 bg-noir-2">
          {match.imageUrl && (
            <ProductImage
              src={match.imageUrl}
              srcSet={match.imageSrcset ?? undefined}
              sizes="(max-width: 640px) 90vw, 320px"
              alt={`${match.name} — ${match.brandName}`}
              className="sf-res-img aspect-4/5 w-full object-cover will-change-transform"
            />
          )}
        </div>

        <div>
          <span className="opacity-0 sf-res-line block text-3xs tracking-(--tracking-label) text-gold uppercase">
            {match.brandName}
          </span>
          <h2 className="opacity-0 sf-res-line mt-3 font-serif text-display-sm text-balance text-ivory">
            {match.name}
          </h2>
          <p className="opacity-0 sf-res-line sf-res-pct mt-3 text-2xs text-ivory/50 tabular-nums">
            {fill(sf.compatibility, { percent: match.compatibility })}
          </p>
          {explanationStr && (
            <p className="opacity-0 sf-res-line mt-5 text-sm leading-relaxed text-ivory/80">
              {explanationStr}
            </p>
          )}
          <p className="opacity-0 sf-res-line mt-6 font-serif text-xl text-gold-light tabular-nums">
            {match.priceLabel}
          </p>

          <div className="opacity-0 sf-res-line mt-8 flex flex-wrap gap-4">
            <Link href={localePath(locale, `/parfums/${match.slug}`)} className={primaryButton}>
              {sf.seeProduct}
            </Link>
            {orderUrl && (
              <a href={orderUrl} target="_blank" rel="noopener noreferrer" className={secondaryButton}>
                {sf.order}
              </a>
            )}
          </div>
        </div>
      </div>

      {alternatives.length > 0 && (
        <div className="mt-16">
          <h3 className="opacity-0 sf-alt border-b border-smoke-2 pb-4 text-2xs tracking-(--tracking-label) text-ivory/60 uppercase">
            {sf.alsoLike}
          </h3>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2">
            {alternatives.map((alt) => (
              <li key={alt.slug} className="sf-alt opacity-0">
                <Link
                  href={localePath(locale, `/parfums/${alt.slug}`)}
                  className="ds-card group flex gap-4 rounded-md border border-smoke-2 bg-noir-2 p-4 transition-colors hover:border-gold/50"
                >
                  {alt.imageUrl && (
                    <ProductImage
                      src={alt.imageUrl}
                      alt=""
                      loading="lazy"
                      className="h-[80px] w-16 shrink-0 rounded-xs object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="flex min-w-0 flex-col justify-center">
                    <span className="text-3xs tracking-(--tracking-label) text-gold uppercase">
                      {alt.brandName}
                    </span>
                    <span className="mt-1 block truncate font-serif text-md text-ivory transition-colors group-hover:text-gold-light">
                      {alt.name}
                    </span>
                    <span className="mt-1 block text-2xs text-ivory/58 tabular-nums">
                      {alt.priceLabel} · {alt.compatibility}%
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="button"
        onClick={onRestart}
        className="opacity-0 sf-alt ds-navlink group mt-12 flex items-center gap-2 text-2xs tracking-(--tracking-label) text-ivory/58 uppercase transition-colors hover:text-gold"
      >
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:-rotate-180">↺</span>{' '}
        {sf.redo}
      </button>
    </div>
  );
}

// ── Décor ──────────────────────────────────────────────────────

/** Une nappe de lumière par étape : chaude → bordeaux → or pâle → ambre. */
const AURAS: { a: string; b: string }[] = [
  { a: 'rgba(212,175,55,0.10)', b: 'rgba(180,140,30,0.06)' },
  { a: 'rgba(150,20,45,0.14)', b: 'rgba(80,0,20,0.10)' },
  { a: 'rgba(240,230,140,0.07)', b: 'rgba(200,190,100,0.05)' },
  { a: 'rgba(255,140,0,0.11)', b: 'rgba(200,100,0,0.08)' },
];

/** Grain fin, en data-URI : plus de requête vers un site tiers. */
const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.9'/></svg>\")";

const subscribeNone = () => () => {};

function AmbientBackground({ tone, reduced }: { tone: number; reduced: boolean }) {
  // Monté côté client seulement : le portail vise `document.body`.
  const mounted = useSyncExternalStore(
    subscribeNone,
    () => true,
    () => false
  );
  const glowRef = useRef<HTMLDivElement>(null);

  // La lueur suit le pointeur avec inertie (un quickTo par axe, pas un tween par événement).
  useEffect(() => {
    const glow = glowRef.current;
    if (!glow || reduced || window.matchMedia('(pointer: coarse)').matches) return;
    const x = gsap.quickTo(glow, 'x', { duration: 1.4, ease: 'power3.out' });
    const y = gsap.quickTo(glow, 'y', { duration: 1.4, ease: 'power3.out' });
    const onMove = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [mounted, reduced]);

  if (!mounted) return null;

  return createPortal(
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-dvh w-screen overflow-clip">
      {AURAS.map((c, i) => (
        <div
          key={i}
          className="absolute -inset-[20%] transition-opacity duration-[1600ms] ease-in-out"
          style={{
            opacity: tone === i ? 1 : 0,
            background: `radial-gradient(60% 45% at 50% 38%, ${c.a} 0%, transparent 70%), radial-gradient(40% 35% at 25% 70%, ${c.b} 0%, transparent 70%)`,
          }}
        />
      ))}
      {!reduced && (
        <>
          <div
            ref={glowRef}
            className="absolute start-0 top-0 -ms-[260px] -mt-[260px] size-[520px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(214,171,90,0.10) 0%, transparent 65%)',
              willChange: 'transform',
            }}
          />
          <div className="sf-orb absolute start-[12%] top-[58%] size-[38vmax] rounded-full" />
          {Array.from({ length: 9 }, (_, i) => (
            <i key={i} className="sf-mote" style={{ '--i': i } as CSSProperties} />
          ))}
        </>
      )}
      <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: GRAIN }} />
      <style>{`
        .sf-orb {
          background: radial-gradient(circle, rgba(184,134,43,0.07) 0%, transparent 62%);
          animation: sf-orb 26s ease-in-out infinite alternate;
          will-change: transform;
        }
        @keyframes sf-orb {
          from { transform: translate3d(0, 0, 0) scale(1); }
          to   { transform: translate3d(38vw, -28vh, 0) scale(1.25); }
        }
        .sf-mote {
          position: absolute;
          bottom: -4%;
          left: calc(8% + var(--i) * 10.5%);
          width: 5px;
          height: 5px;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(255,226,170,0.9) 0%, rgba(214,171,90,0) 70%);
          opacity: 0;
          animation: sf-mote calc(15s + var(--i) * 1.7s) linear infinite;
          animation-delay: calc(var(--i) * -2.3s);
          will-change: transform, opacity;
        }
        @keyframes sf-mote {
          0%   { transform: translate3d(0, 0, 0) scale(1); opacity: 0; }
          15%  { opacity: 0.7; }
          85%  { opacity: 0.5; }
          100% { transform: translate3d(calc((var(--i) - 4) * 9px), -92dvh, 0) scale(2.2); opacity: 0; }
        }
      `}</style>
    </div>,
    document.body
  );
}
