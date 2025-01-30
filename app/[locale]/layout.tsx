import type { Metadata } from 'next';
import { Inter, Vazirmatn } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { locales } from '../config';
import { ThemeProvider } from '../components/ThemeProvider';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-vazirmatn',
});

export const metadata: Metadata = {
  title: 'Specialty Coffee Showcase',
  description: 'Discover our premium selection of specialty coffee beans',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Enable static rendering
  unstable_setRequestLocale(params.locale);

  return (
    <html lang={params.locale} dir={params.locale === 'fa' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className={`${inter.variable} ${vazirmatn.variable} font-sans`}>
        <NextIntlClientProvider locale={params.locale}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 