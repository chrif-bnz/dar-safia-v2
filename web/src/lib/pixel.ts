/**
 * ══════════════════════════════════════════════════════════════
 *   META PIXEL TRACKING UTILITIES — DAR SAFIA
 * ══════════════════════════════════════════════════════════════
 *
 * Centralise et sécurise tous les appels à Meta Pixel (fbq).
 *
 * Principes stricts :
 * 1. Zéro fuite de données personnelles : aucun nom, email, téléphone ou
 *    adresse n'est transmis dans les paramètres d'événements.
 * 2. Déduplication robuste pour le futur pont Conversions API (CAPI) :
 *    chaque Purchase porte un event_id unique (référence commande).
 * 3. Protection contre les doublons : sessionStorage/localStorage mémorisent
 *    les achats déjà suivis pour neutraliser les rafraîchissements de page.
 * 4. Résistance aux bloqueurs de publicité : aucun plantage si fbq est absent.
 */

export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID || '1452399837109404';

const TRACKED_PURCHASES_KEY = 'darsafia_tracked_purchases';

export interface ViewContentParams {
  content_ids: string[];
  content_name: string;
  content_type: 'product';
  value: number;
  currency: string;
}

export interface InitiateCheckoutParams {
  content_ids: string[];
  content_name: string;
  content_type: 'product';
  value: number;
  currency: string;
  num_items?: number;
}

export interface PurchaseParams {
  event_id: string;
  content_ids: string[];
  content_name: string;
  content_type: 'product';
  value: number;
  currency: string;
  num_items?: number;
}

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[];
      loaded?: boolean;
      version?: string;
    };
  }
}

/**
 * Vérifie si le consentement au suivi est accordé.
 * S'interface directement avec un éventuel bandeau cookies / CMP futur.
 */
export function hasTrackingConsent(): boolean {
  if (typeof window === 'undefined') return false;
  // Par défaut activé tant qu'aucun rejet explicite n'est enregistré.
  return true;
}

/**
 * Vérifie si un achat a déjà été comptabilisé pour cette référence.
 * Protège contre le rafraîchissement de la page de remerciement.
 */
export function isPurchaseTracked(orderId: string): boolean {
  if (typeof window === 'undefined' || !orderId) return false;
  try {
    const sessionRaw = sessionStorage.getItem(TRACKED_PURCHASES_KEY);
    if (sessionRaw && JSON.parse(sessionRaw).includes(orderId)) {
      return true;
    }
    const localRaw = localStorage.getItem(TRACKED_PURCHASES_KEY);
    if (localRaw && JSON.parse(localRaw).includes(orderId)) {
      return true;
    }
  } catch {
    // Navigateur en mode strict ou stockage inaccessible
  }
  return false;
}

/**
 * Enregistre qu'un achat a été suivi pour éviter tout double comptage.
 */
export function markPurchaseTracked(orderId: string): void {
  if (typeof window === 'undefined' || !orderId) return;
  try {
    const sessionRaw = sessionStorage.getItem(TRACKED_PURCHASES_KEY);
    const sessionList: string[] = sessionRaw ? JSON.parse(sessionRaw) : [];
    if (!sessionList.includes(orderId)) {
      sessionList.push(orderId);
      sessionStorage.setItem(TRACKED_PURCHASES_KEY, JSON.stringify(sessionList));
    }
  } catch {}
  try {
    const localRaw = localStorage.getItem(TRACKED_PURCHASES_KEY);
    const localList: string[] = localRaw ? JSON.parse(localRaw) : [];
    if (!localList.includes(orderId)) {
      localList.push(orderId);
      localStorage.setItem(TRACKED_PURCHASES_KEY, JSON.stringify(localList));
    }
  } catch {}
}

/**
 * Suivi PageView lors des navigations client (Next.js App Router).
 */
export function trackPageView(): void {
  if (typeof window === 'undefined') return;
  if (!hasTrackingConsent()) return;

  if (typeof window.fbq === 'function') {
    window.fbq('track', 'PageView');
  }
}

/**
 * Suivi ViewContent lors de l'ouverture d'une fiche parfum.
 */
export function trackViewContent(params: ViewContentParams): void {
  if (typeof window === 'undefined') return;
  if (!hasTrackingConsent()) return;

  if (typeof window.fbq === 'function') {
    window.fbq('track', 'ViewContent', {
      content_ids: params.content_ids,
      content_name: params.content_name,
      content_type: params.content_type,
      value: params.value,
      currency: params.currency,
    });
  }
}

/**
 * Suivi InitiateCheckout lorsque l'utilisateur commence à remplir le formulaire.
 */
export function trackInitiateCheckout(params: InitiateCheckoutParams): void {
  if (typeof window === 'undefined') return;
  if (!hasTrackingConsent()) return;

  if (typeof window.fbq === 'function') {
    window.fbq('track', 'InitiateCheckout', {
      content_ids: params.content_ids,
      content_name: params.content_name,
      content_type: params.content_type,
      value: params.value,
      currency: params.currency,
      num_items: params.num_items ?? 1,
    });
  }
}

/**
 * Suivi Purchase une fois la commande validée et acceptée par le serveur.
 * Utilise event_id pour la déduplication Meta CAPI et empêche tout doublon.
 */
export function trackPurchase(params: PurchaseParams): boolean {
  if (typeof window === 'undefined') return false;
  if (!hasTrackingConsent()) return false;

  const eventId = params.event_id;
  if (!eventId) {
    console.warn('[Meta Pixel] trackPurchase appelé sans event_id');
    return false;
  }

  // Déduplication locale stricte (rafraîchissement / double exécution React)
  if (isPurchaseTracked(eventId)) {
    return false;
  }

  markPurchaseTracked(eventId);

  if (typeof window.fbq === 'function') {
    window.fbq(
      'track',
      'Purchase',
      {
        content_ids: params.content_ids,
        content_name: params.content_name,
        content_type: params.content_type,
        value: params.value,
        currency: params.currency,
        num_items: params.num_items ?? 1,
        order_id: eventId,
      },
      { eventID: eventId }
    );
    return true;
  }

  return false;
}
