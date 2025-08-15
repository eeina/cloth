import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
const locales = ['en', 'ar'];

export default getRequestConfig(async ({ requestLocale }) => {
  // This can either be defined statically at the top-level if your locale
  // can be determined from `headers()` or `cookies()`, or alternatively
  // read from the URL
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !locales.includes(locale as any)) {
    locale = 'en'; // fallback to default locale
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});