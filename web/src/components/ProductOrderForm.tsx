'use client';

import React, { useState } from 'react';
import type { Media, Product, ProductVariant } from '@/lib/catalog';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import type { Locale } from '@/lib/i18n/config';
import { AddToCartButton } from '@/components/cart/AddToCartButton';
import wilayasData from '@/data/wilayas.json';

interface ProductOrderFormProps {
  product: Product;
  variant: ProductVariant;
  priceAmount: number;
  image: Media | undefined;
  locale: Locale;
  dict: Dictionary;
  hasOrderUrl: boolean;
}

export function ProductOrderForm({
  product,
  variant,
  priceAmount,
  image,
  locale,
  dict,
  hasOrderUrl,
}: ProductOrderFormProps) {
  const [formData, setFormData] = useState({
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const selectedWilayaData = wilayasData.find((w) => w.id === formData.wilaya);
  const communes = selectedWilayaData ? selectedWilayaData.communes : [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset commune when wilaya changes
      ...(name === 'wilaya' && { commune: '' }),
      // Reset conditional fields when delivery method changes
      ...(name === 'deliveryMethod' && value === 'main' && { deliveryCompany: '', deliveryAddress: '' }),
    }));
    // Clear error when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const reqMsg = 'Ce champ est obligatoire';
    
    if (!formData.firstName.trim()) newErrors.firstName = reqMsg;
    if (!formData.lastName.trim()) newErrors.lastName = reqMsg;
    if (!formData.phone.trim()) {
      newErrors.phone = reqMsg;
    } else if (!/^0[567][0-9]{8}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }
    if (!formData.wilaya) newErrors.wilaya = reqMsg;
    if (!formData.commune) newErrors.commune = reqMsg;
    if (!formData.deliveryMethod) newErrors.deliveryMethod = reqMsg;
    
    if (formData.deliveryMethod === 'societe') {
      if (!formData.deliveryAddress.trim()) newErrors.deliveryAddress = reqMsg;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      
      try {
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            locale,
            customer: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              phone: formData.phone,
              wilaya: selectedWilayaData?.name ?? '',
              commune: communes.find((c) => c.id === formData.commune)?.name ?? '',
              deliveryMethod: formData.deliveryMethod === 'societe' ? 'societe' : 'main',
              deliveryCompany: formData.deliveryCompany || undefined,
              deliveryAddress: formData.deliveryAddress || undefined,
            },
            items: [{ productSlug: product.slug, variantId: variant.id, quantity: 1 }],
          }),
        });

                if (!res.ok) {
          setErrors((prev) => ({ ...prev, submit: dict.product.orderError }));
          setIsSubmitting(false);
          return;
        }

        setIsSubmitting(false);
        setSubmitSuccess(true);
      } catch {
        setErrors((prev) => ({ ...prev, submit: dict.product.orderServerError }));
        setIsSubmitting(false);
      }
    }
  };

  const inputClass = "w-full rounded-sm border border-smoke-2 bg-noir-2 px-4 py-3 text-sm text-ivory placeholder-ivory/30 outline-none transition-all duration-200 focus:border-gold focus:ring-1 focus:ring-gold/30 disabled:opacity-50 disabled:cursor-not-allowed";
  const labelClass = "mb-2 block text-3xs font-semibold tracking-(--tracking-label) text-ivory/60 uppercase";
  const errorClass = "mt-1.5 text-xs text-danger";

  return (
    <form onSubmit={handleSubmit} className="mt-12 border-t border-smoke-2 pt-10">
      <div className="mb-6">
        <h3 className="text-sm font-semibold tracking-(--tracking-eyebrow) text-gold uppercase">Vos informations</h3>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="lastName" className={labelClass}>Nom</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Votre nom"
            className={inputClass}
          />
          {errors.lastName && <p className={errorClass}>{errors.lastName}</p>}
        </div>

        <div>
          <label htmlFor="firstName" className={labelClass}>Prénom</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Votre prénom"
            className={inputClass}
          />
          {errors.firstName && <p className={errorClass}>{errors.firstName}</p>}
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>Téléphone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="05 XX XX XX XX"
            className={inputClass}
            dir="ltr"
          />
          {errors.phone && <p className={errorClass}>{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="wilaya" className={labelClass}>Wilaya</label>
          <select
            id="wilaya"
            name="wilaya"
            value={formData.wilaya}
            onChange={handleInputChange}
            className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23ebd4a4%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1em] bg-[right_1rem_center] bg-no-repeat pr-10`}
          >
            <option value="" disabled>Sélectionner une wilaya</option>
            {wilayasData.map((w) => (
              <option key={w.id} value={w.id}>{w.id} - {w.name}</option>
            ))}
          </select>
          {errors.wilaya && <p className={errorClass}>{errors.wilaya}</p>}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="commune" className={labelClass}>Commune</label>
          <select
            id="commune"
            name="commune"
            value={formData.commune}
            onChange={handleInputChange}
            disabled={!formData.wilaya}
            className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23ebd4a4%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1em] bg-[right_1rem_center] bg-no-repeat pr-10`}
          >
            <option value="" disabled>
              {formData.wilaya ? 'Sélectionner une commune' : "Sélectionnez d'abord une wilaya"}
            </option>
            {communes.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          {errors.commune && <p className={errorClass}>{errors.commune}</p>}
        </div>
      </div>

      <div className="mt-10 mb-6">
        <h3 className="text-sm font-semibold tracking-(--tracking-eyebrow) text-gold uppercase">Livraison</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className={`relative flex cursor-pointer rounded-sm border p-4 transition-all duration-200 hover:border-gold/50 ${formData.deliveryMethod === 'main' ? 'border-gold bg-gold/5' : 'border-smoke-2 bg-noir-2'}`}>
          <input
            type="radio"
            name="deliveryMethod"
            value="main"
            checked={formData.deliveryMethod === 'main'}
            onChange={handleInputChange}
            className="sr-only"
          />
          <div className="flex w-full items-center justify-between">
            <span className="text-sm font-medium text-ivory">Main à main</span>
            <div className={`flex h-4 w-4 items-center justify-center rounded-full border ${formData.deliveryMethod === 'main' ? 'border-gold' : 'border-smoke-2'}`}>
              {formData.deliveryMethod === 'main' && <div className="h-2 w-2 rounded-full bg-gold" />}
            </div>
          </div>
        </label>

        <label className={`relative flex cursor-pointer rounded-sm border p-4 transition-all duration-200 hover:border-gold/50 ${formData.deliveryMethod === 'societe' ? 'border-gold bg-gold/5' : 'border-smoke-2 bg-noir-2'}`}>
          <input
            type="radio"
            name="deliveryMethod"
            value="societe"
            checked={formData.deliveryMethod === 'societe'}
            onChange={handleInputChange}
            className="sr-only"
          />
          <div className="flex w-full items-center justify-between">
            <span className="text-sm font-medium text-ivory">Livraison par société</span>
            <div className={`flex h-4 w-4 items-center justify-center rounded-full border ${formData.deliveryMethod === 'societe' ? 'border-gold' : 'border-smoke-2'}`}>
              {formData.deliveryMethod === 'societe' && <div className="h-2 w-2 rounded-full bg-gold" />}
            </div>
          </div>
        </label>
      </div>
      {errors.deliveryMethod && <p className={errorClass}>{errors.deliveryMethod}</p>}

      <div className={`grid gap-6 transition-all duration-500 ease-in-out ${formData.deliveryMethod === 'societe' ? 'mt-6 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="grid gap-6">
            <div>
              <label htmlFor="deliveryCompany" className={labelClass}>Société de livraison (Optionnel)</label>
              <select
                id="deliveryCompany"
                name="deliveryCompany"
                value={formData.deliveryCompany}
                onChange={handleInputChange}
                className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23ebd4a4%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1em] bg-[right_1rem_center] bg-no-repeat pr-10`}
              >
                <option value="">Sélectionner une société</option>
                <option value="Yalidine">Yalidine Express</option>
                <option value="ZR Express">ZR Express</option>
                <option value="Maystro Delivery">Maystro Delivery</option>
              </select>
            </div>

            <div>
              <label htmlFor="deliveryAddress" className={labelClass}>Adresse / lieu de livraison</label>
              <textarea
                id="deliveryAddress"
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleInputChange}
                placeholder="Adresse, quartier, repère..."
                rows={3}
                className={`${inputClass} resize-none`}
              />
              {errors.deliveryAddress && <p className={errorClass}>{errors.deliveryAddress}</p>}
            </div>
          </div>
        </div>
      </div>
      
      {errors.submit && <p className={errorClass}>{errors.submit}</p>}

      <div className="mt-10 flex flex-wrap gap-3">
        {submitSuccess ? (
          <p className="rounded-sm border border-smoke-2 px-5 py-3.5 text-sm text-ivory/50">
            {dict.product.orderConfirmed}
          </p>
        ) : hasOrderUrl ? (
          <button
            type="submit"
            disabled={isSubmitting}
            className="ds-btn inline-flex w-full items-center justify-center gap-2.5 rounded-sm border sm:w-auto border-gold bg-burgundy px-7 py-3.5 text-sm font-semibold tracking-(--tracking-label) text-ivory uppercase transition-colors duration-200 hover:border-gold-light hover:bg-burgundy-2 disabled:opacity-70"
          >
            {dict.product.orderNow}
          </button>
        ) : (
          <p className="rounded-sm border border-smoke-2 px-5 py-3.5 text-sm text-ivory/50">
            {dict.product?.orderUnavailable ?? 'Commande indisponible'}
          </p>
        )}

        <AddToCartButton
          line={{
            productSlug: product.slug,
            variantId: variant.id,
            name: product.name,
            brandName: product.brand.name,
            imageUrl: image?.url ?? '',
            volumeMl: variant.volumeMl,
            unitPrice: priceAmount,
            currency: 'DZD',
          }}
        />
      </div>
    </form>
  );
}
