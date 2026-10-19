import { factories } from '@strapi/strapi';

import { validateContact } from '../utils/validate-contact';

export default factories.createCoreController(
  'api::contact-message.contact-message',
  ({ strapi }) => ({
    /** POST /api/contact-messages — valide, nettoie, enregistre. Renvoie un simple accusé. */
    async create(ctx) {
      const parsed = validateContact(
        (ctx.request.body as { data?: unknown } | undefined)?.data
      );
      if (!parsed.ok) return ctx.badRequest(parsed.error);

      await strapi.documents('api::contact-message.contact-message').create({
        data: { ...parsed.value, status: 'new' },
      });

      ctx.status = 201;
      ctx.body = { data: { received: true } };
    },
  })
);
