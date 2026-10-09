import { NextResponse, type NextRequest } from 'next/server';

import { relayToStrapi } from '@/lib/forms/strapi-forms';
import { guard } from '@/lib/forms/route-guard';

/**
 * POST /api/orders — enregistre une demande de commande dans Strapi.
 * La validation de fond (téléphone, lignes, prix) est faite par Strapi, qui
 * est la source de vérité ; ici on filtre l'abus (voir route-guard).
 */
export async function POST(request: NextRequest) {
  const checked = await guard(request);
  if ('response' in checked) return checked.response;

  const result = await relayToStrapi('orders', checked.body);
  if (!result.ok) {
    return NextResponse.json({ ok: false }, { status: result.status === 400 ? 400 : 502 });
  }
  const reference = (result.data as { data?: { reference?: unknown } }).data?.reference;
  return NextResponse.json(
    { ok: true, stored: true, reference: typeof reference === 'string' ? reference : null },
    { status: 201 }
  );
}
