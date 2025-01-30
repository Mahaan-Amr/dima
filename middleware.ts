import createMiddleware from 'next-intl/middleware';
import { locales } from './app/config';

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale: 'en'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|fa)/:path*']
}; 