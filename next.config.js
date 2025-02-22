const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  typescript: {
    // !! WARN !!
    // This is a temporary workaround for the type error
    // Remove this when the issue is fixed in Next.js
    ignoreBuildErrors: true,
  }
};

module.exports = withNextIntl(nextConfig); 