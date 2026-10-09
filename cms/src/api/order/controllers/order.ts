import { factories } from '@strapi/strapi';

import { newReference, validateOrder } from '../utils/validate-order';

interface PricedVariant {
  sku?: string | null;
  volumeMl?: number | null;
  price?: { amount?: number | null } | null;
}

interface PricedProduct {
  slug: string;
  name: string;
  variants?: PricedVariant[] | null;
}

export default factories.createCoreController('api::order.order', ({ strapi }) => ({
  /**
   * POST /api/orders — enregistre une demande de commande.
   *
   * Le client n'envoie que des identifiants et des quantités. Nom, contenance
   * et PRIX sont relus dans le catalogue publié : un navigateur ne décide
   * jamais d'un montant. La réponse ne renvoie que la référence.
   */
  async create(ctx) {
    const parsed = validateOrder((ctx.request.body as { data?: unknown } | undefined)?.data);
    if (!parsed.ok) return ctx.badRequest(parsed.error);
    const input = parsed.value;

    const slugs = [...new Set(input.items.map((i) => i.productSlug))];
    const products = (await strapi.documents('api::product.product').findMany({
      filters: { slug: { $in: slugs } },
      populate: { variants: { populate: ['price'] } },
      limit: slugs.length,
    })) as unknown as PricedProduct[];
    const bySlug = new Map(products.map((p) => [p.slug, p]));

    const items: {
      productSlug: string;
      productName: string;
      variantId: string;
      volumeMl: number;
      unitPrice: number;
      quantity: number;
    }[] = [];
    for (const line of input.items) {
      const product = bySlug.get(line.productSlug);
      const variants = product?.variants ?? [];
      // Même identifiant que le site : le SKU, sinon `<slug>-<index>`.
      const index = variants.findIndex(
        (v, i) => (v.sku ?? `${line.productSlug}-${i}`) === line.variantId
      );
      const variant = index >= 0 ? variants[index] : undefined;
      const unitPrice = variant?.price?.amount;
      if (!product || !variant || typeof unitPrice !== 'number') {
        return ctx.unprocessableEntity(`Article introuvable : ${line.productSlug}`);
      }
      items.push({
        productSlug: product.slug,
        productName: product.name,
        variantId: line.variantId,
        volumeMl: variant.volumeMl ?? 0,
        unitPrice,
        quantity: line.quantity,
      });
    }

    const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

    let created: { reference?: string | null } | null = null;
    for (let attempt = 0; attempt < 3 && !created; attempt++) {
      try {
        created = (await strapi.documents('api::order.order').create({
          data: {
            reference: newReference(),
            status: 'new',
            source: input.source,
            ...input.customer,
            items,
            subtotal,
            currency: 'DZD',
            locale: input.locale,
          },
        })) as { reference?: string | null };
      } catch (error) {
        // Collision de référence (contrainte unique) : on retente, sinon on remonte.
        if (attempt === 2) throw error;
      }
    }

    ctx.status = 201;
    ctx.body = { data: { reference: created?.reference ?? null, subtotal } };
  },
}));
