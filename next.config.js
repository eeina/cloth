/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

const nextConfig = {
  images: {
    domains: ['images.pexels.com', 'images.unsplash.com'],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = withNextIntl(nextConfig);