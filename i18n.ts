import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Can be imported from a shared config
const locales = ['en', 'fa'] as const;
type Locale = typeof locales[number];

export default getRequestConfig(async ({locale: requestLocale}) => {
  const locale = requestLocale as Locale;
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
    timeZone: 'Asia/Tehran'
  };
}); 