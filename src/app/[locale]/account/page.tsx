'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/components/providers/AuthProvider';
import { User, Package, MapPin, Settings, LogOut } from 'lucide-react';

export default function AccountPage() {
  const t = useTranslations();
  const locale = useLocale();
  const { user, signOut } = useAuth();

  if (!user) {
    return <div>Please log in to access your account.</div>;
  }

  const menuItems = [
    {
      icon: User,
      title: t('account.profile'),
      description: locale === 'ar' ? 'إدارة معلوماتك الشخصية' : 'Manage your personal information',
      href: `/account/profile`,
    },
    {
      icon: Package,
      title: t('account.orders'),
      description: locale === 'ar' ? 'تتبع طلباتك وتاريخ المشتريات' : 'Track your orders and purchase history',
      href: `/account/orders`,
    },
    {
      icon: MapPin,
      title: t('account.addresses'),
      description: locale === 'ar' ? 'إدارة عناوين الشحن المحفوظة' : 'Manage your saved shipping addresses',
      href: `/account/addresses`,
    },
    {
      icon: Settings,
      title: t('account.settings'),
      description: locale === 'ar' ? 'تخصيص تفضيلات حسابك' : 'Customize your account preferences',
      href: `/account/settings`,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {locale === 'ar' 
                  ? `مرحباً، ${user.user_metadata?.first_name || 'عزيزتي العميلة'}`
                  : `Welcome, ${user.user_metadata?.first_name || 'Dear Customer'}`
                }
              </h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <button
              onClick={() => signOut()}
              className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span>{t('navigation.logout')}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="p-3 bg-rose-100 rounded-lg">
                    <Icon size={24} className="text-rose-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-2xl font-bold text-rose-600 mb-1">12</div>
            <div className="text-sm text-gray-600">
              {locale === 'ar' ? 'إجمالي الطلبات' : 'Total Orders'}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-2xl font-bold text-rose-600 mb-1">3,450</div>
            <div className="text-sm text-gray-600">
              {locale === 'ar' ? 'إجمالي المبلغ (ريال)' : 'Total Spent (SAR)'}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-2xl font-bold text-rose-600 mb-1">5</div>
            <div className="text-sm text-gray-600">
              {locale === 'ar' ? 'العناوين المحفوظة' : 'Saved Addresses'}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}