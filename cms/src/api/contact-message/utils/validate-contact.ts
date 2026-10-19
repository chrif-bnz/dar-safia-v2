import { clean, LOCALES, type OrderLocale, type Result } from '../../order/utils/validate-order';

export interface ContactInput {
  kind: 'personal' | 'collaboration';
  locale: OrderLocale;
  name?: string;
  city?: string;
  house?: string;
  role?: string;
  subject?: string;
  message: string;
}

/** Corps reçu du site : jamais cru, toujours relu et borné. */
export function validateContact(body: unknown): Result<ContactInput> {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return { ok: false, error: 'Corps invalide.' };
  }
  const raw = body as Record<string, unknown>;

  if (raw.kind !== 'personal' && raw.kind !== 'collaboration') {
    return { ok: false, error: 'Type de message inconnu.' };
  }
  const message = clean(raw.message, 4000);
  if (!message) return { ok: false, error: 'Message vide.' };

  const locale: OrderLocale = (LOCALES as readonly unknown[]).includes(raw.locale)
    ? (raw.locale as OrderLocale)
    : 'fr';

  return {
    ok: true,
    value: {
      kind: raw.kind,
      locale,
      name: clean(raw.name, 120) || undefined,
      city: clean(raw.city, 120) || undefined,
      house: clean(raw.house, 160) || undefined,
      role: clean(raw.role, 160) || undefined,
      subject: clean(raw.subject, 200) || undefined,
      message,
    },
  };
}
