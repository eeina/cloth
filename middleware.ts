import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ar'],

  // Used when no locale matches
  defaultLocale: 'en',

  // The locale prefix for the default locale
  localePrefix: 'always'
});

export const config = {
  // Match all request paths except for the ones starting with:
  // - api (API routes)
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  matcher: [
    // Match all pathnames except for the ones starting with the specified patterns
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    // Explicitly match the root path
    '/',
    // Match all locale paths
    '/(ar|en)/:path*'
  ]
};