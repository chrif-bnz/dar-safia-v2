import { factories } from '@strapi/strapi';

// Seul `create` est exposé en REST : la lecture et le suivi se font dans l'admin.
export default factories.createCoreRouter('api::contact-message.contact-message', { only: ['create'] });
