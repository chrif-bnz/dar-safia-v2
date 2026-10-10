'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';

import { useReveal } from '@/components/motion/useReveal';
import { submitContact } from '@/lib/forms/client';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionary';
import { interpolate } from '@/lib/i18n/dictionary';
import { localePath } from '@/lib/i18n/routing';
import { whatsappUrl } from '@/lib/whatsapp';

/**
 * ══════════════════════════════════════════════════════════════
 *   CONTACT
 * ══════════════════════════════════════════════════════════════
 *
 * Une page = une action. Elle montrait tout à la fois : titre démesuré, FAQ
 * collante de six questions, onglets, lettre, aperçu du message « tel qu'il
 * partira dans WhatsApp », coordonnées, faits, lien du diagnostic. Le visiteur
 * ne savait plus par où commencer.
 *
 * Désormais, dans l'ordre où l'on en a besoin :
 *   1. Le formulaire — un seul bloc, le message d'abord, deux champs
 *      facultatifs ensuite. C'est l'action principale.
 *   2. À côté : l'autre canal (WhatsApp), avec ce qui rassure en trois lignes.
 *   3. En bas, replié : les questions fréquentes.
 *
 * Après l'envoi, le formulaire laisse la place à une confirmation (il ne reste
 * pas là, rempli, à faire douter que « ça a marché »).
 *
 * L'aperçu WhatsApp n'a plus lieu d'être : l'envoi enregistre le message chez
 * la maison ; WhatsApp n'est qu'un canal alternatif, et le message qu'on y
 * ouvre est celui qu'on vient d'écrire.
 *
 * La FAQ ne répond QUE ce que le site affirme déjà ailleurs. Aucun délai
 * chiffré : il n'est pas connu, donc il n'est pas écrit.
 */

type Tab = 'personal' | 'collab';
type Status = 'idle' | 'loading' | 'success' | 'error';

const MAX_MESSAGE = 4000;

/** La zone épouse son contenu : elle ne défile jamais sur elle-même. */
function grow(el: HTMLTextAreaElement | null) {
  if (!el) return;
  el.style.height = 'auto';
  el.style.height = `${el.scrollHeight}px`;
}

/** Champ sur filet — la même ligne partout, qui s'allume au focus. */
function Field({
  id,
  name,
  label,
  hint,
  value,
  onChange,
  autoComplete,
  maxLength = 120,
}: {
  id: string;
  name: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  maxLength?: number;
}) {
  return (
    <div className="group">
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 font-body text-md text-ivory/65">
        <span>{label}</span>
        {hint && <span className="font-ui text-3xs tracking-[0.14em] text-ivory/58 uppercase">{hint}</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type="text"
          autoComplete={autoComplete}
          maxLength={maxLength}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="peer mt-1 block min-h-12 w-full border-b border-smoke-2 bg-transparent pb-1.5 font-body text-lg text-ivory transition-colors group-hover:border-gold/40 focus:outline-none focus-visible:outline-none"
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-px h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-500 ease-(--ease-lux) peer-focus:scale-x-100 rtl:origin-right"
        />
      </div>
    </div>
  );
}

export function ContactExperience({
  locale,
  dict,
  phoneDisplay,
}: {
  locale: Locale;
  dict: Dictionary;
  phoneDisplay: string;
}) {
  const c = dict.contact;
  const rootRef = useRef<HTMLDivElement>(null);
  useReveal(rootRef);
  const uid = useId();

  const [tab, setTab] = useState<Tab>('personal');

  // Écrire à la maison
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');

  // Proposer une collaboration
  const [house, setHouse] = useState('');
  const [role, setRole] = useState('');
  const [collabCity, setCollabCity] = useState('');
  const [subject, setSubject] = useState(c.collab.subjects[0]);
  const [proposal, setProposal] = useState('');

  const [status, setStatus] = useState<Status>('idle');
  const [touched, setTouched] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const body = tab === 'personal' ? message : proposal;
  const missing = touched && !body.trim();
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const confirmRef = useRef<HTMLDivElement>(null);

  // ── WhatsApp : l'autre canal ──
  // Message neutre tant que rien n'est écrit ; sinon, ce que la personne vient
  // de rédiger (jamais le texte d'exemple).
  const waText = (() => {
    const typed = body.trim();
    if (!typed) return dict.common.conciergeMessage;
    const head = [dict.common.orderGreeting, ''];
    if (tab === 'collab') {
      const k = c.collab;
      head.push(k.intro);
      if (house.trim()) head.push(interpolate(k.lineHouse, { house: house.trim() }));
      if (role.trim()) head.push(interpolate(k.lineRole, { role: role.trim() }));
      if (collabCity.trim()) head.push(interpolate(k.lineCity, { city: collabCity.trim() }));
      head.push(interpolate(k.lineSubject, { subject }), '');
    }
    return [...head, typed].join('\n');
  })();
  const waHref = whatsappUrl(waText);

  // ── Envoi ──
  const send = async (e?: FormEvent) => {
    e?.preventDefault();
    if (status === 'loading') return;
    if (!body.trim()) {
      setTouched(true);
      messageRef.current?.focus();
      return;
    }
    setStatus('loading');
    const result = await submitContact(
      tab === 'personal'
        ? {
            kind: 'personal',
            locale,
            name: name.trim() || undefined,
            city: city.trim() || undefined,
            message: body.trim(),
          }
        : {
            kind: 'collaboration',
            locale,
            house: house.trim() || undefined,
            role: role.trim() || undefined,
            city: collabCity.trim() || undefined,
            subject,
            message: body.trim(),
          }
    );
    setStatus(result.ok ? 'success' : 'error');
  };

  // Ctrl/⌘ + Entrée envoie, comme dans toute messagerie.
  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) void send();
  };

  const reset = () => {
    setMessage('');
    setProposal('');
    setStatus('idle');
    setTouched(false);
  };

  // La confirmation prend la place du formulaire : elle reçoit le focus (le
  // lecteur d'écran l'annonce) et se pose en douceur.
  useEffect(() => {
    if (status !== 'success') return;
    const node = confirmRef.current;
    node?.focus({ preventScroll: false });
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cancelled = false;
    void import('gsap').then(({ gsap }) => {
      if (cancelled) return;
      gsap.fromTo(
        node.querySelectorAll('[data-confirm]'),
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );
    });
    return () => {
      cancelled = true;
    };
  }, [status]);

  // Le basculement d'onglet se fait aux flèches, comme un contrôle segmenté.
  const onTabKeys = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    setTab((t) => (t === 'personal' ? 'collab' : 'personal'));
  };

  const tabs: { key: Tab; label: string; hint: string }[] = [
    { key: 'personal', label: c.tabs.personal.label, hint: c.tabs.personal.hint },
    { key: 'collab', label: c.tabs.collab.label, hint: c.tabs.collab.hint },
  ];
  const titleLines = c.title.split('\n');
  const left = MAX_MESSAGE - body.length;
  const errId = `${uid}-err`;

  return (
    <div ref={rootRef} className="relative mx-auto max-w-(--container-site) overflow-x-clip">
      <div
        aria-hidden="true"
        className="ds-ambient pointer-events-none absolute inset-x-0 -top-40 h-[30rem]"
      />

      {/* ── Titre : posé, pas démesuré ── */}
      <header className="relative max-w-3xl">
        <p data-fade className="font-ui text-3xs font-semibold tracking-(--tracking-eyebrow) text-gold uppercase">
          {c.eyebrow}
        </p>
        <h1 className="mt-5 font-body font-light text-ivory">
          {titleLines.map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <span
                data-rise
                className="block text-[clamp(2.4rem,5.6vw,4.4rem)] leading-[1.02] tracking-[-0.02em]"
              >
                {line}
              </span>
            </span>
          ))}
        </h1>
        <p data-fade className="mt-6 max-w-[46ch] font-body text-[clamp(1.1rem,1.4vw,1.28rem)] leading-[1.6] text-ivory/65">
          {c.lead}
        </p>
      </header>

      <div className="relative mt-14 grid gap-8 lg:mt-20 lg:grid-cols-12 lg:items-start lg:gap-10">
        {/* ── Le formulaire : l'action principale ── */}
        <div data-fade className="lg:col-span-7">
          <div className="border border-gold/20 bg-noir-2/60 p-6 transition-colors duration-500 focus-within:border-gold/45 md:p-9">
            {status === 'success' ? (
              <div
                ref={confirmRef}
                tabIndex={-1}
                role="status"
                className="flex min-h-[22rem] flex-col items-start justify-center outline-none"
              >
                <svg data-confirm width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
                  <circle cx="28" cy="28" r="26" stroke="var(--color-gold)" strokeWidth="1.2" opacity="0.5" />
                  <path
                    className="ds-check"
                    d="M17 29.5l7.5 7.5L40 20"
                    stroke="var(--color-gold-light)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h2 data-confirm className="mt-7 font-body text-[clamp(1.8rem,3vw,2.4rem)] font-light text-ivory">
                  {c.successTitle}
                </h2>
                <p data-confirm className="mt-3 max-w-[40ch] font-body text-lg leading-relaxed text-ivory/65">
                  {c.successMessage}
                </p>
                <button
                  data-confirm
                  type="button"
                  onClick={reset}
                  className="ds-btn-ghost mt-8 rounded-sm border border-gold/40 px-6 py-3 font-ui text-2xs font-semibold tracking-(--tracking-label) text-gold-light uppercase transition-colors hover:border-gold hover:text-noir"
                >
                  {c.writeAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={send} noValidate>
                {/* Contrôle segmenté : deux intentions, un seul choix à faire. */}
                <div
                  role="tablist"
                  aria-label={c.eyebrow}
                  onKeyDown={onTabKeys}
                  className="relative grid grid-cols-2 rounded-sm border border-smoke-2 p-1"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-1 w-[calc(50%-0.25rem)] rounded-[0.1875rem] bg-gold/15 ring-1 ring-gold/40 transition-[inset-inline-start] duration-500 ease-(--ease-lux)"
                    style={{ insetInlineStart: tab === 'collab' ? 'calc(50%)' : '0.25rem' }}
                  />
                  {tabs.map(({ key, label }) => (
                    <button
                      key={key}
                      type="button"
                      role="tab"
                      id={`${uid}-tab-${key}`}
                      aria-selected={tab === key}
                      aria-controls={`${uid}-panel`}
                      tabIndex={tab === key ? 0 : -1}
                      onClick={() => setTab(key)}
                      className="relative z-10 min-h-11 px-3 py-2 text-center font-body text-md text-ivory/65 transition-colors duration-300 hover:text-ivory aria-selected:text-ivory"
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <p className="mt-3 font-body text-md text-ivory/58">
                  {tab === 'personal' ? c.tabs.personal.hint : c.tabs.collab.hint}
                </p>

                <div
                  role="tabpanel"
                  id={`${uid}-panel`}
                  aria-labelledby={`${uid}-tab-${tab}`}
                  className="mt-7"
                >
                  {tab === 'collab' && (
                    <>
                      <div className="grid gap-6 sm:grid-cols-2">
                        <Field
                          id={`${uid}-house`}
                          name="house"
                          label={c.collab.houseLabel}
                          hint={c.optional}
                          value={house}
                          onChange={setHouse}
                          autoComplete="organization"
                        />
                        <Field
                          id={`${uid}-role`}
                          name="role"
                          label={c.collab.roleLabel}
                          hint={c.optional}
                          value={role}
                          onChange={setRole}
                          autoComplete="organization-title"
                        />
                      </div>
                      <fieldset className="mt-7">
                        <legend className="font-body text-md text-ivory/65">{c.collab.subjectLabel}</legend>
                        <div className="mt-3 flex flex-wrap gap-2.5">
                          {c.collab.subjects.map((s) => (
                            <button
                              key={s}
                              type="button"
                              aria-pressed={subject === s}
                              onClick={() => setSubject(s)}
                              className="ds-btn-ghost min-h-11 rounded-full border border-smoke-2 px-4 py-1.5 font-body text-md text-ivory/65 transition-colors hover:border-gold hover:text-noir aria-pressed:border-gold aria-pressed:bg-gold/10 aria-pressed:text-gold-light"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </fieldset>
                      <div className="my-7 h-px bg-smoke-2" />
                    </>
                  )}

                  {/* Le message : le premier champ, et le plus grand. */}
                  <label htmlFor={`${uid}-message`} className="block font-body text-md text-ivory/65">
                    {tab === 'personal' ? c.messageLabel : c.collab.messageLabel}
                  </label>
                  <textarea
                    ref={messageRef}
                    id={`${uid}-message`}
                    name="message"
                    value={body}
                    maxLength={MAX_MESSAGE}
                    onChange={(e) => {
                      if (tab === 'personal') setMessage(e.target.value);
                      else setProposal(e.target.value);
                      grow(e.target);
                    }}
                    onKeyDown={onKeyDown}
                    rows={5}
                    placeholder={tab === 'personal' ? c.messagePlaceholder : c.collab.messagePlaceholder}
                    aria-invalid={missing || undefined}
                    aria-describedby={missing ? errId : undefined}
                    className={`mt-2 block min-h-[9rem] w-full resize-none border bg-noir/40 p-4 font-body text-[1.2rem] leading-[1.6] text-ivory transition-colors placeholder:text-ivory/45 focus:border-gold/60 focus:outline-none ${
                      missing ? 'border-rose-300/70' : 'border-smoke-2'
                    }`}
                  />
                  <div className="mt-2 flex items-start justify-between gap-4">
                    <p id={errId} role="alert" className="min-h-5 font-body text-md text-rose-300">
                      {missing ? c.messageRequired : ''}
                    </p>
                    {left < 400 && (
                      <p className="shrink-0 font-ui text-3xs tracking-[0.12em] text-ivory/58 tabular-nums">
                        {interpolate(c.charsLeft, { count: left })}
                      </p>
                    )}
                  </div>

                  {tab === 'personal' ? (
                    <div className="mt-5 grid gap-6 sm:grid-cols-2">
                      <Field
                        id={`${uid}-name`}
                        name="name"
                        label={c.nameLabel}
                        hint={c.optional}
                        value={name}
                        onChange={setName}
                        autoComplete="given-name"
                      />
                      <Field
                        id={`${uid}-city`}
                        name="city"
                        label={c.cityLabel}
                        hint={c.optional}
                        value={city}
                        onChange={setCity}
                        autoComplete="address-level2"
                      />
                    </div>
                  ) : (
                    <div className="mt-5 max-w-sm">
                      <Field
                        id={`${uid}-ccity`}
                        name="city"
                        label={c.collab.cityLabel}
                        hint={c.optional}
                        value={collabCity}
                        onChange={setCollabCity}
                        autoComplete="address-level2"
                      />
                    </div>
                  )}
                </div>

                <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="ds-btn inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-sm border border-gold bg-burgundy px-8 py-4 font-ui text-2xs font-semibold tracking-(--tracking-label) whitespace-nowrap text-ivory uppercase transition-colors hover:border-gold-light hover:bg-burgundy-2 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
                  >
                    {status === 'loading' && (
                      <span aria-hidden="true" className="size-3.5 animate-spin rounded-full border border-ivory/30 border-t-ivory" />
                    )}
                    {status === 'loading' ? c.sending : tab === 'personal' ? c.send : c.sendCollab}
                  </button>
                  <p className="max-w-[34ch] font-body text-md leading-snug text-ivory/58">
                    {tab === 'personal' ? c.hint : c.hintCollab}
                  </p>
                </div>

                {status === 'error' && (
                  <div role="alert" className="mt-6 border-s border-rose-300/60 ps-4">
                    <p className="font-body text-md leading-relaxed text-rose-300">{c.errorMessage}</p>
                    {waHref && (
                      <a
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ds-inklink mt-2 inline-block font-body text-md text-ivory/85"
                      >
                        {c.fallbackWhatsApp}
                      </a>
                    )}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>

        {/* ── L'autre canal ── */}
        <aside data-fade className="lg:sticky lg:top-28 lg:col-span-5" aria-label={c.whatsappTitle}>
          <div className="border border-gold/15 p-6 md:p-8">
            <h2 className="font-body text-[clamp(1.5rem,2.2vw,1.9rem)] font-light text-ivory">{c.whatsappTitle}</h2>
            <p className="mt-3 max-w-[38ch] font-body text-lg leading-relaxed text-ivory/62">{c.whatsappBody}</p>
            {waHref ? (
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="ds-btn-ghost mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-sm border border-gold/50 px-6 py-3 font-ui text-2xs font-semibold tracking-(--tracking-label) text-gold-light uppercase transition-colors hover:border-gold hover:text-noir sm:w-auto"
              >
                {c.whatsappCta}
              </a>
            ) : (
              <p className="mt-6 font-body text-md text-ivory/58">{c.unavailable}</p>
            )}
            {phoneDisplay && waHref && (
              <p className="mt-4 font-ui text-2xs tracking-[0.1em] text-ivory/58">
                <span className="sr-only">{c.phoneLabel} : </span>
                <span dir="ltr">{phoneDisplay}</span>
              </p>
            )}

            <ul className="mt-8 grid gap-3 border-t border-gold/15 pt-6">
              {[c.facts.hours, c.facts.delivery, c.facts.payment].map((fact) => (
                <li key={fact} className="flex items-baseline gap-3 font-body text-md leading-snug text-ivory/65">
                  <span aria-hidden="true" className="text-[0.6em] text-gold">◆</span>
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-5 font-body text-md leading-relaxed text-ivory/58">
            {c.undecidedText}{' '}
            <Link href={localePath(locale, '/trouver')} className="ds-inklink text-ivory/85">
              {c.undecidedLink}
            </Link>
          </p>
        </aside>
      </div>

      {/* ── Questions fréquentes : repliées, en bas ── */}
      <section aria-labelledby="faq-titre" className="relative mt-20 border-t border-gold/15 pt-12 lg:mt-28">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <h2 id="faq-titre" className="font-body text-[clamp(1.6rem,2.6vw,2.1rem)] font-light leading-[1.15] text-ivory">
              {c.faqTitle}
            </h2>
            <p className="mt-3 max-w-[32ch] font-body text-md leading-relaxed text-ivory/58">{c.faqToggleHint}</p>
          </div>

          <ul className="lg:col-span-8">
            {c.faq.map((item, i) => {
              const open = openFaq === i;
              return (
                <li key={item.q} className="border-t border-gold/15 last:border-b">
                  <h3>
                    <button
                      type="button"
                      id={`faq-q-${i}`}
                      aria-expanded={open}
                      aria-controls={`faq-r-${i}`}
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="group flex min-h-14 w-full items-center justify-between gap-6 py-4 text-start"
                    >
                      <span
                        className={`font-body text-[clamp(1.1rem,1.4vw,1.28rem)] leading-snug transition-colors ${
                          open ? 'text-ivory' : 'text-ivory/72 group-hover:text-ivory'
                        }`}
                      >
                        {item.q}
                      </span>
                      <span aria-hidden="true" className="relative block size-3 shrink-0">
                        <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gold" />
                        <span
                          className="absolute inset-y-0 start-1/2 w-px bg-gold transition-transform duration-500 ease-(--ease-lux)"
                          style={{ transform: `translateX(-50%) scaleY(${open ? 0 : 1})` }}
                        />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-r-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    className="ds-panel"
                    data-open={open || undefined}
                  >
                    <div>
                      <p className="max-w-[56ch] pb-6 font-body text-lg leading-[1.65] text-ivory/62">{item.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <p className="mt-8 max-w-[44ch] font-body text-md leading-relaxed text-ivory/58 lg:ms-[33.333%] lg:ps-3">
          {c.faqFootnote}
        </p>
      </section>
    </div>
  );
}
