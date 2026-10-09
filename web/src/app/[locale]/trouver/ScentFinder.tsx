'use client';

import Link from 'next/link';
import { useState, useTransition, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { useI18n } from '@/components/i18n/I18nProvider';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionary';
import { localePath } from '@/lib/i18n/routing';
import { QUIZ_STEPS, type QuizAnswers, type QuizStepKey } from '@/lib/quiz/types';
import { whatsappUrl } from '@/lib/whatsapp';
import { diagnoseScent, type ScentDiagnosis } from './actions';

type Phase =
  | { name: 'question'; step: number }
  | { name: 'loading' }
  | { name: 'result'; diagnosis: ScentDiagnosis }
  | { name: 'error' };

const primaryButton =
  'ds-btn rounded-sm border border-gold bg-burgundy px-6 py-3 text-2xs font-semibold tracking-(--tracking-label) text-ivory uppercase transition-colors hover:border-gold-light hover:bg-burgundy-2';
const secondaryButton =
  'ds-btn-ghost mt-2 inline-block rounded-sm border border-smoke-2 px-6 py-3 text-2xs font-semibold tracking-(--tracking-label) text-ivory/75 uppercase transition-colors hover:border-gold hover:text-noir';

const ANIM_CONFIG = {
  distanceX: 110,
  initialDuration: 1.3,
  standardDuration: 0.8,
  initialStagger: 0.14,
  standardStagger: 0.1,
  ease: 'power3.out',
  exitDuration: 0.35,
  pulseDuration: 0.3,
  ritualDuration: 1600,
};

const HALO_COLORS = [
  'rgba(212,175,55,0.12)', // Step 1: Warm amber
  'rgba(128,0,32,0.15)',   // Step 2: Bordeaux
  'rgba(240,230,140,0.1)', // Step 3: Pale gold
  'rgba(255,140,0,0.12)',  // Step 4: Deep amber
];

export function ScentFinder() {
  const { locale, dict, fill } = useI18n();
  const sf = dict.scentFinder;

  const [phase, setPhase] = useState<Phase>({ name: 'question', step: 0 });
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = sessionStorage.getItem('sf_answers');
        if (saved) return JSON.parse(saved);
      } catch (e) {}
    }
    return {};
  });
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const [, startTransition] = useTransition();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const titleWords = sf.title.split(' ');

  // Sauvegarde des réponses
  useEffect(() => {
    sessionStorage.setItem('sf_answers', JSON.stringify(answers));
  }, [answers]);

  useGSAP(() => {
    if (phase.name === 'loading') {
      gsap.fromTo('.sf-ritual-chip', { opacity: 0, y: 15 }, { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: 'power2.out' });
      return;
    }

    if (phase.name !== 'question' || isExiting) return;

    const isFirstLoad = phase.step === 0 && Object.keys(answers).length === 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const duration = isFirstLoad ? ANIM_CONFIG.initialDuration : ANIM_CONFIG.standardDuration;
    const stagger = isFirstLoad ? ANIM_CONFIG.initialStagger : ANIM_CONFIG.standardStagger;
    const distance = prefersReducedMotion ? 0 : window.innerWidth < 640 ? 40 : ANIM_CONFIG.distanceX;
    
    const tl = gsap.timeline({
      onStart: () => gsap.set('.sf-cards', { pointerEvents: 'none' }),
      onComplete: () => {
        if (!isExiting) gsap.set('.sf-cards', { clearProps: 'pointerEvents' });
        // Focus la nouvelle question pour l'accessibilité si pas le premier load
        if (!isFirstLoad) {
           document.getElementById('sf-question-legend')?.focus();
        }
      }
    });

    if (isFirstLoad) {
      tl.fromTo('.sf-label', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: ANIM_CONFIG.ease }, 0.1)
        .fromTo('.sf-title-word', { y: '100%' }, { y: '0%', duration: 0.8, stagger: 0.06, ease: ANIM_CONFIG.ease }, 0.2)
        .fromTo('.sf-title', { letterSpacing: '0.02em' }, { letterSpacing: 'normal', duration: 0.8 }, 0.2)
        .fromTo('.sf-intro', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: ANIM_CONFIG.ease }, 0.5)
        .fromTo('.sf-progress', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: duration * 0.6, ease: ANIM_CONFIG.ease }, 0.7)
        .fromTo('.sf-question-content', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: duration * 0.6, ease: ANIM_CONFIG.ease }, 0.8)
        .fromTo('.sf-btn-left', { opacity: 0, x: -distance, filter: prefersReducedMotion ? 'none' : 'blur(6px)', scale: prefersReducedMotion ? 1 : 0.97 }, { opacity: 1, x: 0, filter: 'blur(0px)', scale: 1, duration, stagger, ease: ANIM_CONFIG.ease }, 0.9)
        .fromTo('.sf-btn-right', { opacity: 0, x: distance, filter: prefersReducedMotion ? 'none' : 'blur(6px)', scale: prefersReducedMotion ? 1 : 0.97 }, { opacity: 1, x: 0, filter: 'blur(0px)', scale: 1, duration, stagger, ease: ANIM_CONFIG.ease }, 0.9);
    } else {
      const dirMult = direction === 'forward' ? 1 : -1;
      tl.fromTo('.sf-progress', { opacity: 0, y: 8 * dirMult }, { opacity: 1, y: 0, duration: duration * 0.6, ease: ANIM_CONFIG.ease }, 0)
        .fromTo('.sf-question-content', { opacity: 0, y: 8 * dirMult }, { opacity: 1, y: 0, duration: duration * 0.6, ease: ANIM_CONFIG.ease }, 0.1)
        .fromTo('.sf-btn-left', { opacity: 0, x: -distance, filter: prefersReducedMotion ? 'none' : 'blur(6px)', scale: prefersReducedMotion ? 1 : 0.97 }, { opacity: 1, x: 0, filter: 'blur(0px)', scale: 1, duration, stagger, ease: ANIM_CONFIG.ease }, 0.2)
        .fromTo('.sf-btn-right', { opacity: 0, x: distance, filter: prefersReducedMotion ? 'none' : 'blur(6px)', scale: prefersReducedMotion ? 1 : 0.97 }, { opacity: 1, x: 0, filter: 'blur(0px)', scale: 1, duration, stagger, ease: ANIM_CONFIG.ease }, 0.2)
        .fromTo('.sf-nav', { opacity: 0 }, { opacity: 1, duration: 0.4, ease: ANIM_CONFIG.ease }, 0.5);
    }
  }, { scope: containerRef, dependencies: [phase.name === 'question' ? phase.step : null, phase.name] });

  // Accessibilité clavier
  useEffect(() => {
    if (phase.name !== 'question' || isExiting) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const step = QUIZ_STEPS[phase.step];
      if (['1', '2', '3', '4'].includes(e.key)) {
        const index = parseInt(e.key) - 1;
        if (step.options[index]) {
          choose(step.key, step.options[index] as never);
        }
      } else if (e.key === 'Backspace' || e.key === 'ArrowLeft') {
        goBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, isExiting, answers]);

  function choose<K extends QuizStepKey>(key: K, value: QuizAnswers[K]) {
    if (isExiting) return;
    setSelectedOption(value);
    setIsExiting(true);
    setDirection('forward');
    gsap.set('.sf-cards', { pointerEvents: 'none' });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pulseDur = prefersReducedMotion ? 0 : ANIM_CONFIG.pulseDuration;
    const exitDur = prefersReducedMotion ? 0.15 : ANIM_CONFIG.exitDuration;
    const distance = prefersReducedMotion ? 0 : window.innerWidth < 640 ? 40 : ANIM_CONFIG.distanceX;

    const tl = gsap.timeline();
    const btnId = `#btn-${value}`;
    const otherBtns = `.sf-btn:not(${btnId})`;
    
    if (!prefersReducedMotion) {
      // Animation pulse gérée par CSS via la classe sf-btn-selected
      tl.to(otherBtns, { opacity: 0.25, filter: 'blur(4px)', duration: pulseDur }, 0);
    }
    
    tl.to('.sf-btn-left', { x: -distance, opacity: 0, duration: exitDur, ease: 'power2.in' }, pulseDur)
      .to('.sf-btn-right', { x: distance, opacity: 0, duration: exitDur, ease: 'power2.in' }, pulseDur)
      .to('.sf-question-content', { opacity: 0, y: -10, duration: exitDur }, pulseDur)
      .to('.sf-nav', { opacity: 0, duration: exitDur }, pulseDur)
      .call(() => {
        const next = { ...answers, [key]: value };
        setAnswers(next);
        
        const stepIndex = QUIZ_STEPS.findIndex((s) => s.key === key);
        if (stepIndex < QUIZ_STEPS.length - 1) {
          setPhase({ name: 'question', step: stepIndex + 1 });
        } else {
          setPhase({ name: 'loading' });
          startTransition(async () => {
            const [diagnosis] = await Promise.all([
              diagnoseScent(next, locale),
              new Promise(r => setTimeout(r, ANIM_CONFIG.ritualDuration))
            ]);
            setPhase(diagnosis ? { name: 'result', diagnosis } : { name: 'error' });
          });
        }
        setSelectedOption(null);
        setIsExiting(false);
      });
  }

  function goBack() {
    if (isExiting || phase.name !== 'question' || phase.step === 0) return;
    setDirection('backward');
    setIsExiting(true);
    gsap.set('.sf-cards', { pointerEvents: 'none' });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const exitDur = prefersReducedMotion ? 0.15 : ANIM_CONFIG.exitDuration;
    const distance = prefersReducedMotion ? 0 : window.innerWidth < 640 ? 40 : ANIM_CONFIG.distanceX;

    const tl = gsap.timeline();
    tl.to('.sf-btn-left', { x: -distance, opacity: 0, duration: exitDur, ease: 'power2.in' }, 0)
      .to('.sf-btn-right', { x: distance, opacity: 0, duration: exitDur, ease: 'power2.in' }, 0)
      .to('.sf-question-content', { opacity: 0, y: 10, duration: exitDur }, 0)
      .to('.sf-nav', { opacity: 0, duration: exitDur }, 0)
      .call(() => {
        setPhase({ name: 'question', step: phase.step - 1 });
        setIsExiting(false);
      });
  }

  function restart() {
    setAnswers({});
    sessionStorage.removeItem('sf_answers');
    setPhase({ name: 'question', step: 0 });
    setSelectedOption(null);
    setIsExiting(false);
  }

  // Tilt Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    gsap.to(e.currentTarget, { rotateX, rotateY, transformPerspective: 1000, ease: 'power2.out', duration: 0.4 });
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' });
  };

  useEffect(() => {
    if (phase.name === 'result') {
      startTransition(async () => {
        const diagnosis = await diagnoseScent(answers, locale);
        if (diagnosis) setPhase({ name: 'result', diagnosis });
      });
    }
  }, [locale]);

  const currentStep = phase.name === 'question' ? phase.step : 0;
  const step = QUIZ_STEPS[currentStep];
  const question = (sf.questions as Record<string, string>)?.[step?.key];
  const options = sf.options as Record<string, { label: string; hint: string }>;

  const haloColor = HALO_COLORS[currentStep] || HALO_COLORS[0];
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const showParticles = typeof window !== 'undefined' && !reducedMotion && navigator.hardwareConcurrency > 4;

  return (
    <div ref={containerRef} className="relative z-10 min-h-[500px]">
      <style>{`
        .sf-particle {
          position: absolute;
          bottom: -10%;
          width: 8px;
          height: 8px;
          background: #d4af37;
          border-radius: 50%;
          filter: blur(8px);
          animation: floatUp 20s infinite linear;
          animation-delay: calc(var(--i) * -3s);
          left: calc(10% + var(--i) * 11%);
        }
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.6; }
          80% { opacity: 0.6; }
          100% { transform: translateY(-80vh) scale(2); opacity: 0; }
        }
        .sf-card-hover:hover .sf-arrow {
          transform: translateX(8px);
          opacity: 1;
        }
        .sf-card-hover:hover .sf-sweep {
          animation: sweep 1.5s ease-out;
        }
        @keyframes sweep {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        .ken-burns {
          animation: kenBurns 15s ease-out forwards;
        }
        @keyframes kenBurns {
          0% { transform: scale(1.0); }
          100% { transform: scale(1.08); }
        }
        @keyframes card-select-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.55); transform: scale(1); border-color: #d4af37; }
          60%  { box-shadow: 0 0 0 10px rgba(212, 175, 55, 0); transform: scale(1.02); border-color: #d4af37; }
          100% { box-shadow: 0 0 0 10px rgba(212, 175, 55, 0); transform: scale(1.02); border-color: #d4af37; }
        }
        .sf-btn-selected {
          animation: card-select-pulse 0.35s ease-out forwards;
          border-color: #d4af37 !important;
        }
        .sf-btn-selected .sf-btn-label {
          color: #d4af37 !important;
        }
      `}</style>

      {phase.name === 'question' && (
        <AmbientBackground step={currentStep} reducedMotion={reducedMotion} showParticles={showParticles} />
      )}

      {phase.name === 'loading' && (
        <div className="py-32 text-center flex flex-col items-center justify-center h-full min-h-[400px]">
           <p className="font-serif text-2xl text-gold mb-10 animate-pulse">{sf.loading || 'Composing your signature...'}</p>
           <div className="flex flex-wrap gap-4 justify-center max-w-lg" aria-live="polite">
             {Object.values(answers).map((ans, i) => (
               <span key={i} className="sf-ritual-chip opacity-0 px-5 py-2.5 border border-gold/40 rounded-full text-xs tracking-wider text-ivory bg-noir-2 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                 {(sf.options as any)[ans]?.label}
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
          <div className="sf-header-anim">
            <p className="sf-label opacity-0 text-3xs font-semibold tracking-(--tracking-eyebrow) text-gold uppercase">
              {sf.eyebrow}
            </p>
            <h1 className="sf-title mt-4 font-serif text-display-md text-balance text-ivory overflow-hidden pb-2">
              {titleWords.map((w, i) => (
                <span key={i} className="inline-block mr-2 overflow-hidden align-bottom">
                  <span className="sf-title-word inline-block">{w}</span>
                </span>
              ))}
            </h1>
            <p className="sf-intro opacity-0 mt-4 max-w-md font-body text-xl leading-relaxed text-ivory/65">
              {sf.intro}
            </p>
          </div>

          <div className="mt-0">
            <div className="sf-progress opacity-0">
              <span className="text-3xs tracking-(--tracking-eyebrow) text-gold uppercase" aria-live="polite">
                {fill(sf.stepLabel, { current: currentStep + 1, total: QUIZ_STEPS.length })}
              </span>
              <div className="mt-3 flex h-1 w-full gap-1" role="presentation">
                {QUIZ_STEPS.map((_, i) => (
                  <div key={i} className="h-full flex-1 bg-smoke-2 overflow-hidden rounded-full">
                    <div
                      className="h-full bg-gold transition-all duration-700 ease-out origin-left"
                      style={{ transform: i <= currentStep ? 'scaleX(1)' : 'scaleX(0)' }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <fieldset className="mt-6 md:mt-8">
              <legend id="sf-question-legend" tabIndex={-1} className="sf-question-content opacity-0 font-serif text-display-sm text-balance text-ivory outline-none">
                {question}
              </legend>

              <div key={currentStep} className="sf-cards mt-7 grid gap-4 sm:grid-cols-2" role="radiogroup">
                {step.options.map((value, index) => {
                  const isLeft = index % 2 === 0;
                  const isSelected = selectedOption === value;
                  return (
                    <button
                      key={value}
                      id={`btn-${value}`}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => choose(step.key, value as never)}
                      className={`sf-btn sf-btn-${isLeft ? 'left' : 'right'} opacity-0 sf-card-hover group relative flex flex-col items-start rounded-md border border-smoke-2 bg-noir-2 p-6 text-start transition-[border-color,box-shadow,transform] duration-250 hover:border-gold hover:-translate-y-[3px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold active:scale-95 ${isSelected ? 'sf-btn-selected' : ''}`}
                    >
                      <div className="absolute inset-0 overflow-hidden rounded-md pointer-events-none">
                         <div className="sf-sweep absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transform -translate-x-full skew-x-[-15deg]" />
                      </div>
                      
                      <div className="relative z-10 w-full flex justify-between items-center">
                        <span className="sf-btn-label font-serif text-lg transition-colors duration-250 text-ivory group-hover:text-gold">
                          {options[value]?.label ?? value}
                        </span>
                        <span className="sf-arrow opacity-0 text-gold transition-all duration-300 transform -translate-x-2 shrink-0">→</span>
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
                <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span> {sf.previous.replace(/^[←\s]+/, '')}
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
  const expl = (sf as any).explanation;
  const { match, alternatives } = diagnosis;

  const parts: string[] = [];
  if (match.matchedCriteria.family && answers.family) {
    parts.push(fill(expl.family, { family: (sf.options as any)[answers.family].label.toLowerCase() }));
  }
  if (match.matchedCriteria.moment && answers.moment) {
    parts.push(fill(expl.moment, { moment: (sf.options as any)[answers.moment].label.toLowerCase() }));
  }
  if (match.matchedCriteria.intensity && answers.intensity) {
    parts.push(fill(expl.intensity, { intensity: (sf.options as any)[answers.intensity].label.toLowerCase() }));
  }

  let explanationStr = "";
  if (parts.length > 0) {
    if (parts.length === 1) {
      explanationStr = `${expl.base} ${parts[0]}.`;
    } else if (parts.length === 2) {
      explanationStr = `${expl.base} ${parts[0]} ${expl.and} ${parts[1]}.`;
    } else {
      explanationStr = `${expl.base} ${parts[0]}, ${parts[1]} ${expl.and} ${parts[2]}.`;
    }
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
    <div className="animate-in fade-in duration-1000">
      <p className="text-3xs tracking-(--tracking-eyebrow) text-gold uppercase">
        {sf.resultEyebrow}
      </p>

      <div className="mt-8 grid gap-10 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:items-center">
        <div className="overflow-hidden rounded-md border border-smoke-2 bg-noir-2">
          {match.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={match.imageUrl}
              srcSet={match.imageSrcset ?? undefined}
              sizes="(max-width: 640px) 90vw, 320px"
              alt={`${match.name} — ${match.brandName}`}
              decoding="async"
              className="sf-result-img ken-burns aspect-4/5 w-full object-cover"
            />
          )}
        </div>

        <div>
          <span className="text-3xs tracking-(--tracking-label) text-gold uppercase">
            {match.brandName}
          </span>
          <h2 className="mt-3 font-serif text-display-sm text-balance text-ivory">
            {match.name}
          </h2>
          <p className="mt-3 text-2xs text-ivory/50">
            {fill(sf.compatibility, { percent: match.compatibility })}
          </p>
          {explanationStr && (
            <p className="mt-5 text-sm leading-relaxed text-ivory/80">
              {explanationStr}
            </p>
          )}
          <p className="mt-6 font-serif text-xl text-gold-light tabular-nums">
            {match.priceLabel}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={localePath(locale, `/parfums/${match.slug}`)}
              className={primaryButton}
            >
              {sf.seeProduct}
            </Link>
            {orderUrl && (
              <a
                href={orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={secondaryButton}
              >
                {sf.order}
              </a>
            )}
          </div>
        </div>
      </div>

      {alternatives.length > 0 && (
        <div className="mt-16">
          <h3 className="border-b border-smoke-2 pb-4 text-2xs tracking-(--tracking-label) text-ivory/60 uppercase">
            {sf.alsoLike}
          </h3>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2">
            {alternatives.map((alt) => (
              <li key={alt.slug}>
                <Link
                  href={localePath(locale, `/parfums/${alt.slug}`)}
                  className="ds-card group flex gap-4 rounded-md border border-smoke-2 bg-noir-2 p-4 transition-colors hover:border-gold/50"
                >
                  {alt.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={alt.imageUrl}
                      alt=""
                      width={64}
                      height={80}
                      loading="lazy"
                      decoding="async"
                      className="h-[80px] w-16 shrink-0 rounded-xs object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="min-w-0 flex flex-col justify-center">
                    <span className="text-3xs tracking-(--tracking-label) text-gold uppercase">
                      {alt.brandName}
                    </span>
                    <span className="mt-1 block truncate font-serif text-md text-ivory group-hover:text-gold-light transition-colors">
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
        className="ds-navlink group mt-12 flex items-center gap-2 text-2xs tracking-(--tracking-label) text-ivory/58 uppercase transition-colors hover:text-gold"
      >
        <span className="transition-transform duration-300 group-hover:-rotate-180">↺</span> {sf.redo}
      </button>
    </div>
  );
}

function AmbientBackground({ step, reducedMotion, showParticles }: { step: number; reducedMotion: boolean; showParticles: boolean }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || reducedMotion) return null;

  const haloColorsA = [
    'rgba(212,175,55,0.08)',
    'rgba(128,0,32,0.1)',
    'rgba(240,230,140,0.06)',
    'rgba(255,140,0,0.08)',
  ];
  const haloColorsB = [
    'rgba(180,140,30,0.05)',
    'rgba(80,0,20,0.08)',
    'rgba(200,190,100,0.04)',
    'rgba(200,100,0,0.06)',
  ];

  const colorA = haloColorsA[step] || haloColorsA[0];
  const colorB = haloColorsB[step] || haloColorsB[0];

  return createPortal(
    <div className="fixed inset-0 w-screen h-dvh pointer-events-none overflow-clip" style={{ zIndex: 0 }}>
      <div 
        className="absolute transition-colors duration-1000"
        style={{
          width: '140vw',
          height: '140vh',
          left: '-20vw',
          top: '-20vh',
          background: `
            radial-gradient(60% 45% at 50% 38%, ${colorA} 0%, transparent 70%),
            radial-gradient(40% 35% at 25% 70%, ${colorB} 0%, transparent 70%)
          `
        }}
      />
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      {showParticles && Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="sf-particle" style={{ '--i': i } as any} />
      ))}
    </div>,
    document.body
  );
}
