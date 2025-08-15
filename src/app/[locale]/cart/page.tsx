'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useCart } from '@/components/providers/CartProvider';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const t = useTranslations();
  const locale = useLocale();
  const { items, updateQuantity, removeItem, getTotal } = useCart();

  const shipping = 25; // Fixed shipping cost in SAR

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {t('cart.empty')}
            </h1>
            <p className="text-gray-600 mb-8">
              {t('cart.emptyMessage')}
            </p>
            <Link
              href={`/${locale}`}
              className="inline-flex items-center px-6 py-3 bg-rose-600 text-white font-semibold rounded-full hover:bg-rose-700 transition-colors"
            >
              {t('cart.continueShopping')}
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {t('cart.title')}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t('product.size')}: {item.size} | {t('product.color')}: {item.color}
                    </p>
                    <p className="text-lg font-bold text-rose-600">
                      {item.price} {t('common.currency')}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                      className="p-1 border border-gray-300 rounded hover:bg-gray-50"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-3 py-1 border border-gray-300 rounded min-w-[40px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                      className="p-1 border border-gray-300 rounded hover:bg-gray-50"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id, item.size, item.color)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {t('cart.orderSummary')}
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('cart.subtotal')}</span>
                  <span className="font-semibold">
                    {getTotal()} {t('common.currency')}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">{t('cart.shipping')}</span>
                  <span className="font-semibold">
                    {shipping} {t('common.currency')}
                  </span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>{t('cart.total')}</span>
                    <span className="text-rose-600">
                      {getTotal() + shipping} {t('common.currency')}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/${locale}/checkout`}
                  className="w-full block text-center px-6 py-3 bg-rose-600 text-white font-semibold rounded-full hover:bg-rose-700 transition-colors"
                >
                  {t('cart.proceedToCheckout')}
                </Link>

                <Link
                  href={`/${locale}`}
                  className="w-full block text-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition-colors"
                >
                  {t('cart.continueShopping')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}