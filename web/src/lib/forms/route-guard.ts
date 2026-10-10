import { NextResponse, type NextRequest } from 'next/server';

import { createRateLimiter } from './rate-limit';

const MAX_BODY_BYTES = 20_000;
const allow = createRateLimiter(8, 60_000);

/**
 * Contrôles communs aux routes d'enregistrement : même origine, débit,
 * taille, JSON, pot de miel. Renvoie soit une réponse d'erreur, soit le corps.
 *
 * Le pot de miel (`website`) est un champ invisible que seul un robot remplit :
 * on répond « ok » sans rien enregistrer, pour ne rien lui apprendre.
 */
export async function guard(
  request: NextRequest
): Promise<{ response: NextResponse } | { body: Record<string, unknown> }> {
  const origin = request.headers.get('origin');
  if (origin) {
    const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
    let originHost = '';
    try {
      originHost = new URL(origin).host;
    } catch {
      originHost = '';
    }
    if (originHost !== host && origin !== request.nextUrl.origin) {
      return { response: NextResponse.json({ ok: false }, { status: 403 }) };
    }
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  if (!allow(ip)) {
    return { response: NextResponse.json({ ok: false }, { status: 429 }) };
  }

  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) {
    return { response: NextResponse.json({ ok: false }, { status: 413 }) };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { response: NextResponse.json({ ok: false }, { status: 400 }) };
  }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    return { response: NextResponse.json({ ok: false }, { status: 400 }) };
  }

  const body = parsed as Record<string, unknown>;
  if (typeof body.website === 'string' && body.website !== '') {
    return { response: NextResponse.json({ ok: true, stored: false }) };
  }
  delete body.website;
  return { body };
}