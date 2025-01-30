import createMiddleware from 'next-intl/middleware';
import { locales } from './app/config';
import { NextRequest } from 'next/server';

// Get the default locale from the list
const defaultLocale = 'fa';

// Create a custom middleware function to add logging
const middleware = createMiddleware({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale,

  // Always prefix all pages with the locale
  localePrefix: 'always',

  // Enable locale detection
  localeDetection: true
});

// Wrap the middleware to add logging
export default async function debugMiddleware(request: NextRequest) {
  console.log('🔍 Middleware - Incoming request:', {
    url: request.url,
    method: request.method,
    headers: Object.fromEntries(request.headers),
    nextUrl: {
      pathname: request.nextUrl.pathname,
      locale: request.nextUrl.locale,
      search: request.nextUrl.search
    }
  });

  const response = await middleware(request);
  
  console.log('🔄 Middleware - Response:', {
    status: response.status,
    headers: Object.fromEntries(response.headers),
    redirected: response.redirected,
    url: response.url
  });

  return response;
}

// Configure redirects
export const config = {
  // Match all pathnames except for
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /static (inside /public)
  // - .*\\..*\$ (files)
  matcher: [
    // Match all pathnames except for
    // - /api (API routes)
    // - /_next (Next.js internals)
    // - /static (inside /public)
    // - .*\\..*\$ (files)
    '/((?!api|_next|static|.*\\..*).*)']
}; 