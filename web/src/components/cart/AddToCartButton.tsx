'use client';

import { useI18n } from '@/components/i18n/I18nProvider';
import type { CartLine } from '@/lib/cart/types';

import { useCart } from './CartProvider';

/**
 * Bouton d'ajout au panier.
 *
 * Reçoit un instantané déjà construit côté serveur plutôt qu'un objet Product
 * complet : cela évite de sérialiser 45 champs vers le client pour n'en
 * afficher que cinq.
 */
export function AddToCartButton({
  line,
  className,
}: {
  line: Omit<CartLine, 'quantity'>;
  className?: string;
}) {
  const { addLine } = useCart();
  const { dict } = useI18n();

  return (
    <button
      type="button"
      onClick={() => addLine(line)}
      className={
        className ??
        'ds-btn-slide inline-flex w-full items-center justify-center gap-2 rounded-sm sm:w-auto border border-smoke-2 px-6 py-3.5 text-sm font-semibold tracking-(--tracking-label) text-ivory uppercase transition-colors duration-300 hover:border-gold'
      }
    >
      <span className="relative z-10">{dict.product.addToCart}</span>
    </button>
  );
}
