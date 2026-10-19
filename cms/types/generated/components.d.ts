import type { Schema, Struct } from '@strapi/strapi';

export interface CatalogProductNote extends Struct.ComponentSchema {
  collectionName: 'components_catalog_product_notes';
  info: {
    description: 'Une note dans la pyramide olfactive.';
    displayName: 'Note du parfum';
    icon: 'leaf';
  };
  attributes: {
    layer: Schema.Attribute.Enumeration<['top', 'heart', 'base']> &
      Schema.Attribute.Required;
    note: Schema.Attribute.Relation<
      'oneToOne',
      'api::fragrance-note.fragrance-note'
    >;
    position: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
  };
}

export interface CatalogVariant extends Struct.ComponentSchema {
  collectionName: 'components_catalog_variants';
  info: {
    description: 'Un format vendu : contenance, prix, stock.';
    displayName: 'Format';
    icon: 'database';
  };
  attributes: {
    compareAtPrice: Schema.Attribute.Component<'shared.money', false>;
    price: Schema.Attribute.Component<'shared.money', false> &
      Schema.Attribute.Required;
    sku: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 64;
      }>;
    stock: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    volumeMl: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
  };
}

export interface OrdersOrderItem extends Struct.ComponentSchema {
  collectionName: 'components_orders_order_items';
  info: {
    description: "Instantan\u00E9 d'une ligne : nom et prix relus c\u00F4t\u00E9 serveur.";
    displayName: 'Ligne de commande';
    icon: 'shoppingCart';
  };
  attributes: {
    productName: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    productSlug: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    quantity: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 99;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1>;
    unitPrice: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    variantId: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 64;
      }>;
    volumeMl: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
  };
}

export interface SharedMoney extends Struct.ComponentSchema {
  collectionName: 'components_shared_money';
  info: {
    description: "Montant en unit\u00E9 enti\u00E8re (le dinar n'est pas subdivis\u00E9).";
    displayName: 'Money';
    icon: 'coins';
  };
  attributes: {
    amount: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    currency: Schema.Attribute.Enumeration<['DZD']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'DZD'>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seo';
  info: {
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'catalog.product-note': CatalogProductNote;
      'catalog.variant': CatalogVariant;
      'orders.order-item': OrdersOrderItem;
      'shared.money': SharedMoney;
      'shared.seo': SharedSeo;
    }
  }
}
