import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { Providers } from '@/components/providers/Providers';
import '../globals.css';

const locales = ['en', 'ar'];

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params
}: Props) {
  // Await the params object as required by Next.js 15
  const { locale } = await params;
  
  // Debug: Log the locale parameter
  console.log('DEBUG: Layout received locale:', locale);
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();

  // Try to get messages using the standard approach
  const messages = await getMessages();
  
  // Debug: Log the messages being loaded
  console.log('DEBUG: getMessages() returned keys:', Object.keys(messages));
  console.log('DEBUG: Sample navigation keys:', Object.keys(messages.navigation || {}));
  console.log('DEBUG: Sample homepage keys:', Object.keys(messages.homepage || {}));

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${locale === 'ar' ? 'font-arabic' : 'font-english'} antialiased bg-background`}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}