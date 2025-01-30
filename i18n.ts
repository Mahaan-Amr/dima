import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { locales, type Locale } from './app/config';

export default getRequestConfig(async ({ requestLocale }) => {
  // Get the current locale
  const locale = await requestLocale;
  const currentLocale = locale || 'fa';

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(currentLocale as Locale)) notFound();

  let messages;
  try {
    messages = (await import(`./messages/${currentLocale}.json`)).default;
  } catch (error) {
    console.error('❌ i18n - Error loading messages:', error);
    notFound();
  }

  return {
    messages,
    timeZone: 'Asia/Tehran',
    locale: currentLocale
  };
}); 