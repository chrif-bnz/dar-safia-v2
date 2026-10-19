import { NextResponse, type NextRequest } from 'next/server';

import { guard } from '@/lib/forms/route-guard';
import { relayToStrapi } from '@/lib/forms/strapi-forms';

/**
 * POST /api/orders — enregistre une demande de commande dans Strapi.
 *
 * Deux appelants : la fiche produit (avec les coordonnées du client, et qui
 * attend la confirmation) et le panier (sans coordonnées, tire-et-oublie).
 * La validation de fond (téléphone, lignes, prix) est faite par Strapi, source
 * de vérité ; ici on filtre l'abus (voir route-guard) et on porte le jeton
 * d'écriture côté serveur.
 */
export async function POST(request: NextRequest) {
  const checked = await guard(request);
  if ('response' in checked) return checked.response;

  const body = checked.body;
  // La fiche produit n'envoie pas `source` : elle se reconnaît à ses coordonnées.
  if (body.source !== 'product-form' && body.source !== 'cart') {
    body.source = body.customer ? 'product-form' : 'cart';
  }

  const result = await relayToStrapi('orders', body);
  if (!result.ok) {
    // 400 / 422 : la saisie est refusée ; le reste, c'est le serveur qui manque.
    const status = result.status === 400 || result.status === 422 ? 400 : 502;
    return NextResponse.json({ ok: false }, { status });
  }

  const reference = (result.data as { data?: { reference?: unknown } }).data?.reference;
  const sheetUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (sheetUrl) {
    try {
      await fetch(sheetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference, ...body }),
        cache: 'no-store',
        signal: AbortSignal.timeout(5000),
      });
    } catch (error) {
      // The order is already saved in Strapi; a sheet failure must not fail the customer.
      console.error('[orders] échec de l’envoi vers Google Sheet', error);
    }
  }
  return NextResponse.json(
    { ok: true, stored: true, reference: typeof reference === 'string' ? reference : null },
    { status: 201 }
  );
}
