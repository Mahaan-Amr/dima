import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import { locales, type Locale } from './app/config';

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) notFound();

  let messages;
  try {
    messages = (await import(`./messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return {
    locale,
    messages,
    timeZone: 'Asia/Tehran'
  };
}); 