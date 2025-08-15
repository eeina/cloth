'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = locale === 'ar' ? 'en' : 'ar';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-1 rtl:space-x-reverse text-rose-700 hover:text-rose-800 transition-colors"
    >
      <Globe size={16} />
      <span className="text-sm font-medium">
        {locale === 'ar' ? 'English' : 'العربية'}
      </span>
    </button>
  );
}