'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">
              {locale === 'ar' ? 'أناقة' : 'Elegant'}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {locale === 'ar' 
                ? 'أزياء محتشمة وأنيقة للمرأة السعودية العصرية. نقدم أجود المنتجات بأفضل الأسعار.'
                : 'Elegant modest fashion for the modern Saudi woman. Premium quality products at the best prices.'
              }
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <Facebook size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t('navigation.categories')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}/categories/hijab`} className="text-gray-300 hover:text-white transition-colors">{t('navigation.hijab')}</Link></li>
              <li><Link href={`/${locale}/categories/abaya`} className="text-gray-300 hover:text-white transition-colors">{t('navigation.abaya')}</Link></li>
              <li><Link href={`/${locale}/categories/dresses`} className="text-gray-300 hover:text-white transition-colors">{t('navigation.dresses')}</Link></li>
              <li><Link href={`/${locale}/categories/accessories`} className="text-gray-300 hover:text-white transition-colors">{t('navigation.accessories')}</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">
              {locale === 'ar' ? 'خدمة العملاء' : 'Customer Service'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}/about`} className="text-gray-300 hover:text-white transition-colors">{locale === 'ar' ? 'عن الشركة' : 'About Us'}</Link></li>
              <li><Link href={`/${locale}/contact`} className="text-gray-300 hover:text-white transition-colors">{locale === 'ar' ? 'اتصل بنا' : 'Contact Us'}</Link></li>
              <li><Link href={`/${locale}/shipping`} className="text-gray-300 hover:text-white transition-colors">{locale === 'ar' ? 'الشحن والتوصيل' : 'Shipping'}</Link></li>
              <li><Link href={`/${locale}/returns`} className="text-gray-300 hover:text-white transition-colors">{locale === 'ar' ? 'الإرجاع والاستبدال' : 'Returns'}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">
              {locale === 'ar' ? 'تواصل معنا' : 'Contact Info'}
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone size={16} className="text-gray-400" />
                <span className="text-gray-300">+966 50 123 4567</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail size={16} className="text-gray-400" />
                <span className="text-gray-300">info@elegant.sa</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <MapPin size={16} className="text-gray-400" />
                <span className="text-gray-300">
                  {locale === 'ar' ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            © 2025 {locale === 'ar' ? 'أناقة' : 'Elegant'}. 
            {locale === 'ar' ? ' جميع الحقوق محفوظة.' : ' All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}