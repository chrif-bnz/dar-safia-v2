import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';

import { PlaceholderPhoneBanner } from '@/components/PlaceholderPhoneBanner';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { CartProvider } from '@/components/cart/CartProvider';
import { I18nProvider } from '@/components/i18n/I18nProvider';
import { InlineScript } from '@/components/InlineScript';
import { Cursor } from '@/components/motion/Cursor';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { DIRECTION, LOCALES, isLocale } from '@/lib/i18n/config';
import { introGuardScript } from '@/lib/intro-guard';
import { getDictionary } from '@/lib/i18n/dictionaries';

import '../globals.css';

/**
 * Polices auto-hébergées par next/font (fichiers servis depuis notre domaine,
 * pas de requête Google Fonts, pas de décalage au chargement).
 *
 * Latin : Cinzel Decorative / Cinzel / Cormorant / Montserrat.
 * Arabe : Noto Naskh Arabic (titres, équivalent serif) et Cairo (interface).
 * Les deux jeux sont toujours chargés ; le CSS choisit selon `dir`.
 */
const cinzelDecorative = localFont({
  src: [
    { path: '../../fonts/cinzel-decorative-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../../fonts/cinzel-decorative-700-normal.woff2', weight: '700', style: 'normal' }
  ],
  variable: '--font-cinzel-decorative',
  display: 'swap',
});

const cinzel = localFont({
  src: [
    { path: '../../fonts/cinzel-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../../fonts/cinzel-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../../fonts/cinzel-600-normal.woff2', weight: '600', style: 'normal' },
    { path: '../../fonts/cinzel-700-normal.woff2', weight: '700', style: 'normal' }
  ],
  variable: '--font-cinzel',
  display: 'swap',
});

const cormorant = localFont({
  src: [
    { path: '../../fonts/cormorant-garamond-300-normal.woff2', weight: '300', style: 'normal' },
    { path: '../../fonts/cormorant-garamond-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../../fonts/cormorant-garamond-400-italic.woff2', weight: '400', style: 'italic' },
    { path: '../../fonts/cormorant-garamond-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../../fonts/cormorant-garamond-600-normal.woff2', weight: '600', style: 'normal' }
  ],
  variable: '--font-cormorant',
  display: 'swap',
});

const montserrat = localFont({
  src: [
    { path: '../../fonts/montserrat-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../../fonts/montserrat-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../../fonts/montserrat-600-normal.woff2', weight: '600', style: 'normal' },
    { path: '../../fonts/montserrat-700-normal.woff2', weight: '700', style: 'normal' }
  ],
  variable: '--font-montserrat',
  display: 'swap',
});

const notoNaskh = localFont({
  src: [
    { path: '../../fonts/noto-naskh-arabic-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../../fonts/noto-naskh-arabic-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../../fonts/noto-naskh-arabic-600-normal.woff2', weight: '600', style: 'normal' },
    { path: '../../fonts/noto-naskh-arabic-700-normal.woff2', weight: '700', style: 'normal' }
  ],
  variable: '--font-arabic-serif',
  preload: false, // arabe seulement : ne pèse pas sur les pages FR / EN
  display: 'swap',
});

const cairo = localFont({
  src: [
    { path: '../../fonts/cairo-300-normal.woff2', weight: '300', style: 'normal' },
    { path: '../../fonts/cairo-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../../fonts/cairo-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../../fonts/cairo-600-normal.woff2', weight: '600', style: 'normal' },
    { path: '../../fonts/cairo-700-normal.woff2', weight: '700', style: 'normal' }
  ],
  variable: '--font-arabic-sans',
  preload: false, // arabe seulement : ne pèse pas sur les pages FR / EN
  display: 'swap',
});

const FONT_VARS = [
  cinzelDecorative.variable,
  cinzel.variable,
  cormorant.variable,
  montserrat.variable,
  notoNaskh.variable,
  cairo.variable
].join(' ');

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    default: 'Dar Safia — Maison de Haute Parfumerie',
    template: '%s | Dar Safia',
  },
  description:
    "Parfums niche et signatures d'exception, sélectionnés et livrés dans les 58 wilayas.",
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const dir = DIRECTION[locale];

  return (
    // `suppressHydrationWarning` : le script de garde modifie <html> avant
    // l'hydratation. Il ne couvre QUE les attributs de cet élément.
    <html lang={locale} dir={dir} className={FONT_VARS} data-dir={dir} suppressHydrationWarning>
      <head>
        {/* Exécuté pendant l'analyse du HTML, avant la première peinture :
            c'est le seul moment où l'en-tête peut être voilé sans flash. */}
        <InlineScript html={introGuardScript} />
      </head>
      <body className="min-h-screen antialiased overflow-x-clip">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:z-50 focus:bg-gold focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-noir focus:start-0"
        >
          {dict.nav.skipToContent}
        </a>

        <I18nProvider locale={locale} dict={dict}>
          {/* Le provider n'englobe que du contexte : les pages restent
              des composants serveur. */}
          <CartProvider>
            <SmoothScroll />
            <Cursor />
            <SiteHeader locale={locale} dict={dict} />
            {children}
            <SiteFooter locale={locale} dict={dict} />
            <CartDrawer />
            <PlaceholderPhoneBanner dict={dict} />
          </CartProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
