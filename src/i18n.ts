import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

// Can be imported from a shared config
const locales = ['en', 'ar'];

export default getRequestConfig(async ({ requestLocale }) => {
  // This can either be defined statically at the top-level if your locale
  // can be determined from `headers()` or `cookies()`, or alternatively
  // read from the URL
  let locale = await requestLocale;

  // If locale is not detected from requestLocale, try to extract it from the URL
  if (!locale || !locales.includes(locale as any)) {
    const headersList = headers();
    const url = headersList.get('x-url') || '';
    const urlMatch = url.match(/^\/([a-z]{2})(\/|$)/);
    
    if (urlMatch && locales.includes(urlMatch[1])) {
      locale = urlMatch[1];
    } else {
      locale = 'en'; // fallback to default locale
    }
  }

  // Ensure that a valid locale is used
  if (!locale || !locales.includes(locale as any)) {
    locale = 'en'; // fallback to default locale
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});