import { NextResponse, type NextRequest } from 'next/server';

import { relayToStrapi } from '@/lib/forms/strapi-forms';
import { guard } from '@/lib/forms/route-guard';

/** POST /api/contact — enregistre un message de la page Contact dans Strapi. */
export async function POST(request: NextRequest) {
  const checked = await guard(request);
  if ('response' in checked) return checked.response;

  const result = await relayToStrapi('contact-messages', checked.body);
  if (!result.ok) {
    return NextResponse.json({ ok: false }, { status: result.status === 400 ? 400 : 502 });
  }
  return NextResponse.json({ ok: true, stored: true }, { status: 201 });
}
