import { NextResponse, type NextRequest } from 'next/server';

import { guard } from '@/lib/forms/route-guard';

/**
 * POST /api/orders — enregistre une demande de commande dans Strapi.
 */
export async function POST(request: NextRequest) {
  const checked = await guard(request);
  if ('response' in checked) return checked.response;

  const body = checked.body;
  body.source = 'product-form';

  const strapiUrl = process.env.STRAPI_URL || 'http://localhost:1337';

  try {
    const res = await fetch(`${strapiUrl}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: body }),
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      let errorMessage = 'Erreur lors de la création de la commande.';
      try {
        const errData = await res.json();
        if (errData?.error?.message) {
          errorMessage = errData.error.message;
        }
      } catch {
        // Ignore parse error
      }
      return NextResponse.json({ ok: false, error: errorMessage }, { status: res.status });
    }

    const data = (await res.json()) as { data?: { reference?: unknown } };
    const reference = data?.data?.reference;
    
    return NextResponse.json(
      { ok: true, stored: true, reference: typeof reference === 'string' ? reference : null },
      { status: 201 }
    );
  } catch (error) {
    console.error(`[orders] échec de l'envoi vers Strapi`, error);
    return NextResponse.json({ ok: false, error: 'Serveur indisponible.' }, { status: 502 });
  }
}
