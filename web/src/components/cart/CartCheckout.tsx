'use client';

import { useRouter } from 'next/navigation';
import { useState, type ChangeEvent, type FormEvent } from 'react';

import wilayasData from '@/data/wilayas.json';
import type { CartLine } from '@/lib/cart/types';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionary';
import { localePath } from '@/lib/i18n/routing';
import { saveOrderReceipt } from '@/lib/order-receipt';

/**
 * Formulaire de commande du panier : mêmes champs, mêmes règles et même
 * route (/api/orders) que celui de la fiche produit, mais pour TOUTES les
 * lignes du panier. Le bouton « Commander » du récapitulatif le soumet
 * (attribut `form`). Les prix ne sont jamais envoyés : Strapi les relit.
 */
export function CartCheckout({
  locale,
  dict,
  lines,
  subtotal,
  onSent,
}: {
  locale: Locale;
  dict: Dictionary;
  lines: CartLine[];
  subtotal: number;
  onSent: () => void;
}) {
  const router = useRouter();
  const f = dict.product.form;

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    wilaya: '',
    commune: '',
    deliveryMethod: '',
    deliveryCompany: '',
    deliveryAddress: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const wilaya = wilayasData.find((w) => w.id === data.wilaya);
  const communes = wilaya ? wilaya.communes : [];

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'wilaya' && { commune: '' }),
      ...(name === 'deliveryMethod' && value === 'main' && { deliveryCompany: '', deliveryAddress: '' }),
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    const req = f.required;
    if (!data.firstName.trim()) next.firstName = req;
    if (!data.lastName.trim()) next.lastName = req;
    if (!data.phone.trim()) next.phone = req;
    else if (!/^0[567][0-9]{8}$/.test(data.phone.replace(/\s+/g, ''))) next.phone = f.phoneInvalid;
    if (!data.wilaya) next.wilaya = req;
    if (!data.commune) next.commune = req;
    if (!data.deliveryMethod) next.deliveryMethod = req;
    if (data.deliveryMethod === 'societe' && !data.deliveryAddress.trim()) next.deliveryAddress = req;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting || lines.length === 0 || !validate()) return;
    setSubmitting(true);
    const communeName = communes.find((c) => c.id === data.commune)?.name ?? '';

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'product-form',
          locale,
          customer: {
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            wilaya: wilaya?.name ?? '',
            commune: communeName,
            deliveryMethod: data.deliveryMethod === 'societe' ? 'societe' : 'main',
            deliveryCompany: data.deliveryCompany || undefined,
            deliveryAddress: data.deliveryAddress || undefined,
          },
          items: lines.map((l) => ({
            productSlug: l.productSlug,
            variantId: l.variantId,
            quantity: l.quantity,
          })),
        }),
      });

      if (!res.ok) {
        setErrors((prev) => ({ ...prev, submit: dict.product.orderError }));
        setSubmitting(false);
        return;
      }

      const payload = (await res.json().catch(() => null)) as { reference?: unknown } | null;
      const first = lines[0];
      saveOrderReceipt({
        firstName: data.firstName.trim(),
        productName: first.name,
        brandName: first.brandName,
        imageUrl: first.imageUrl,
        imageSrcset: null,
        volumeMl: first.volumeMl,
        quantity: lines.reduce((n, l) => n + l.quantity, 0),
        total: subtotal,
        currency: 'DZD',
        wilaya: wilaya?.name ?? '',
        commune: communeName,
        deliveryMethod: data.deliveryMethod === 'societe' ? 'societe' : 'main',
        reference: typeof payload?.reference === 'string' ? payload.reference : null,
        lines: lines.map((l) => ({
          name: l.name,
          brandName: l.brandName,
          quantity: l.quantity,
          total: l.unitPrice * l.quantity,
        })),
      });

      router.push(localePath(locale, '/merci'));
      onSent();
    } catch {
      setErrors((prev) => ({ ...prev, submit: dict.product.orderServerError }));
      setSubmitting(false);
    }
  };

  const arrow =
    "appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23ebd4a4%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1em] bg-[right_1rem_center] bg-no-repeat pr-10";
  const input =
    'w-full rounded-sm border border-smoke-2 bg-noir-2 px-4 py-3 text-sm text-ivory placeholder-ivory/30 outline-none transition-[border-color,box-shadow] duration-200 focus:border-gold focus:ring-2 focus:ring-gold/30 disabled:opacity-50 disabled:cursor-not-allowed';
  const label = 'mb-2 block text-3xs font-semibold tracking-(--tracking-label) text-ivory/60 uppercase';
  const err = 'mt-1.5 text-xs text-danger';

  return (
    <form id="cart-checkout" onSubmit={submit} noValidate className="ds-cartp__form">
      <h2 id="commande" className="ds-cartp__formtitle">
        {f.title}
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="cc-lastName" className={label}>{f.lastName}</label>
          <input id="cc-lastName" name="lastName" value={data.lastName} onChange={onChange}
            placeholder={f.lastNamePlaceholder} autoComplete="family-name" className={input} />
          {errors.lastName && <p className={err}>{errors.lastName}</p>}
        </div>
        <div>
          <label htmlFor="cc-firstName" className={label}>{f.firstName}</label>
          <input id="cc-firstName" name="firstName" value={data.firstName} onChange={onChange}
            placeholder={f.firstNamePlaceholder} autoComplete="given-name" className={input} />
          {errors.firstName && <p className={err}>{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="cc-phone" className={label}>{f.phone}</label>
          <input id="cc-phone" name="phone" type="tel" dir="ltr" value={data.phone} onChange={onChange}
            placeholder="05 XX XX XX XX" autoComplete="tel" className={input} />
          {errors.phone && <p className={err}>{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="cc-wilaya" className={label}>{f.wilaya}</label>
          <select id="cc-wilaya" name="wilaya" value={data.wilaya} onChange={onChange} className={`${input} ${arrow}`}>
            <option value="" disabled>{f.selectWilaya}</option>
            {wilayasData.map((w) => (
              <option key={w.id} value={w.id}>{w.id} - {w.name}</option>
            ))}
          </select>
          {errors.wilaya && <p className={err}>{errors.wilaya}</p>}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="cc-commune" className={label}>{f.commune}</label>
          <select id="cc-commune" name="commune" value={data.commune} onChange={onChange}
            disabled={!data.wilaya} className={`${input} ${arrow}`}>
            <option value="" disabled>{data.wilaya ? f.selectCommune : f.selectWilayaFirst}</option>
            {communes.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          {errors.commune && <p className={err}>{errors.commune}</p>}
        </div>
      </div>

      <h3 className="ds-cartp__formsub">{f.delivery}</h3>
      <div className="grid gap-4 md:grid-cols-2" role="radiogroup" aria-label={f.delivery}>
        {(['main', 'societe'] as const).map((value) => (
          <label
            key={value}
            className={`relative flex cursor-pointer items-center justify-between rounded-sm border p-4 text-sm font-medium text-ivory transition-colors duration-200 hover:border-gold/60 ${
              data.deliveryMethod === value ? 'border-gold bg-gold/5' : 'border-smoke-2 bg-noir-2'
            }`}
          >
            <input type="radio" name="deliveryMethod" value={value}
              checked={data.deliveryMethod === value} onChange={onChange} className="sr-only" />
            <span>{value === 'main' ? f.byHand : f.byCompany}</span>
            <span aria-hidden="true" className={`flex size-4 items-center justify-center rounded-full border ${data.deliveryMethod === value ? 'border-gold' : 'border-smoke-2'}`}>
              {data.deliveryMethod === value && <span className="size-2 rounded-full bg-gold" />}
            </span>
          </label>
        ))}
      </div>
      {errors.deliveryMethod && <p className={err}>{errors.deliveryMethod}</p>}

      {data.deliveryMethod === 'societe' && (
        <div className="mt-6 grid gap-6">
          <div>
            <label htmlFor="cc-company" className={label}>{f.company} ({f.optional})</label>
            <select id="cc-company" name="deliveryCompany" value={data.deliveryCompany}
              onChange={onChange} className={`${input} ${arrow}`}>
              <option value="">{f.selectCompany}</option>
              <option value="Yalidine">Yalidine Express</option>
              <option value="ZR Express">ZR Express</option>
              <option value="Maystro Delivery">Maystro Delivery</option>
            </select>
          </div>
          <div>
            <label htmlFor="cc-address" className={label}>{f.address}</label>
            <textarea id="cc-address" name="deliveryAddress" rows={3} value={data.deliveryAddress}
              onChange={onChange} placeholder={f.addressPlaceholder} className={`${input} resize-none`} />
            {errors.deliveryAddress && <p className={err}>{errors.deliveryAddress}</p>}
          </div>
        </div>
      )}

      {errors.submit && (
        <p role="alert" className={err}>
          {errors.submit}
        </p>
      )}
      {submitting && <p className="sr-only" role="status">{dict.loading.label}</p>}
    </form>
  );
}
