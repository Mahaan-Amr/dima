import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { locales } from '../config';
import { ThemeProvider } from '../components/ThemeProvider';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Specialty Coffee Showcase',
  description: 'Discover our premium selection of specialty coffee beans',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: {
    locale: typeof locales[number];
  };
};

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  return (
    <html lang={params.locale} dir={params.locale === 'fa' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider locale={params.locale}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 