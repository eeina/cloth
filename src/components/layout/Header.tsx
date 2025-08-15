'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { ShoppingCart, User, Menu, X, Search, Globe } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';
import { useCart } from '@/components/providers/CartProvider';
import { LanguageToggle } from './LanguageToggle';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const t = useTranslations();
  const locale = useLocale();
  const { user, signOut } = useAuth();
  const { getItemCount, loading } = useCart();

  const isRTL = locale === 'ar';

  const categories = [
    { key: 'hijab', href: '/categories/hijab' },
    { key: 'niqab', href: '/categories/niqab' },
    { key: 'abaya', href: '/categories/abaya' },
    { key: 'dresses', href: '/categories/dresses' },
    { key: 'accessories', href: '/categories/accessories' },
  ];

  const handleSignOut = () => {
    signOut();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      {/* Top bar */}
      <div className="bg-rose-50 border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10 text-sm">
            <div className="text-rose-700">
              {t('homepage.newsletter')}
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <LanguageToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {locale === 'ar' ? 'أناقة' : 'Elegant'}
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <Link
              href={`/${locale}`}
              className="text-gray-700 hover:text-rose-600 transition-colors"
            >
              {t('navigation.home')}
            </Link>
            {categories.map((category) => (
              <Link
                key={category.key}
                href={`/${locale}${category.href}`}
                className="text-gray-700 hover:text-rose-600 transition-colors"
              >
                {t(`navigation.${category.key}`)}
              </Link>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
            >
              <Search size={20} />
            </button>

            <Link
              href={`/${locale}/cart`}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
            >
              <ShoppingCart size={20} />
              {!loading && getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Link
                  href={user.role === 'ADMIN' ? `/${locale}/admin` : `/${locale}/account`}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                >
                  <User size={20} />
                </Link>
                {user.role === 'ADMIN' && (
                  <Link
                    href={`/${locale}/admin`}
                    className="text-sm text-rose-600 hover:text-rose-700 font-medium"
                  >
                    {t('navigation.admin')}
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  {t('navigation.logout')}
                </button>
              </div>
            ) : (
              <Link
                href={`/${locale}/auth/login`}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                <User size={20} />
              </Link>
            )}
          </div>
        </div>

        {/* Search bar */}
        {isSearchOpen && (
          <div className="pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder={t('common.search')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
              <Search className="absolute right-3 rtl:left-3 rtl:right-auto top-2.5 text-gray-400" size={20} />
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            <Link
              href={`/${locale}`}
              className="block px-3 py-2 text-gray-700 hover:text-rose-600 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navigation.home')}
            </Link>
            {categories.map((category) => (
              <Link
                key={category.key}
                href={`/${locale}${category.href}`}
                className="block px-3 py-2 text-gray-700 hover:text-rose-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {t(`navigation.${category.key}`)}
              </Link>
            ))}
            {user && (
              <>
                <Link
                  href={user.role === 'ADMIN' ? `/${locale}/admin` : `/${locale}/account`}
                  className="block px-3 py-2 text-gray-700 hover:text-rose-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {user.role === 'ADMIN' ? t('navigation.admin') : t('navigation.account')}
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-rose-600 hover:bg-gray-50 rounded-md"
                >
                  {t('navigation.logout')}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}