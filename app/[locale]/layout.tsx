import type { Metadata } from 'next';
import { Inter, Vazirmatn } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '../config';
import { ThemeProvider } from '../components/ThemeProvider';
import { notFound } from 'next/navigation';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  variable: '--font-vazirmatn',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: 'Specialty Coffee Showcase',
  description: 'Discover our premium selection of specialty coffee beans',
};

export function generateStaticParams() {
  const params = locales.map((locale) => ({ locale }));
  console.log('📝 Layout - Generated static params:', params);
  return params;
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export default async function RootLayout({
  children,
  params
}: Props) {
  console.log('🌐 Layout - Rendering with params:', params);

  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Validate locale
  if (!locales.includes(locale)) {
    console.error('❌ Layout - Invalid locale:', locale);
    notFound();
  }

  try {
    // Get messages for the current locale
    const messages = await getMessages();
    console.log('💬 Layout - Loaded messages:', {
      locale,
      messageKeys: Object.keys(messages)
    });

    return (
      <html lang={locale} dir={locale === 'fa' ? 'rtl' : 'ltr'} suppressHydrationWarning>
        <body className={`${inter.variable} ${vazirmatn.variable} ${locale === 'fa' ? vazirmatn.className : inter.className}`}>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    );
  } catch (error) {
    console.error('❌ Layout - Error:', error);
    throw error;
  }
} 