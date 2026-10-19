/**
 * Enregistrement côté navigateur. VOLONTAIREMENT « tire et oublie » :
 * la commande part toujours sur WhatsApp (c'est le canal réel de la maison),
 * l'enregistrement dans Strapi s'y ajoute. S'il échoue — Strapi arrêté, réseau
 * coupé — le client n'en voit rien et sa commande n'est pas bloquée.
 *
 * `keepalive` laisse la requête aboutir même quand l'onglet WhatsApp prend le focus.
 */
import type { ContactRequest, OrderRequest } from './types';

function send(url: string, payload: unknown): void {
  try {
    void fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Jamais d'erreur visible pour l'enregistrement.
  }
}

export function recordOrder(order: OrderRequest): void {
  send('/api/orders', order);
}

export function recordContact(message: ContactRequest): void {
  send('/api/contact', message);
}

export async function submitContact(
  message: ContactRequest
): Promise<{ ok: boolean; status?: number }> {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });
    return { ok: res.ok, status: res.status };
  } catch {
    return { ok: false, status: 500 };
  }
}

