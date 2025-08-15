'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useCart } from '@/components/providers/CartProvider';
import { useAuth } from '@/components/providers/AuthProvider';
import { CreditCard, Truck } from 'lucide-react';

export default function CheckoutPage() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const { items, getTotal, clearCart } = useCart();
  const { user } = useAuth();

  const [checkoutType, setCheckoutType] = useState<'guest' | 'member'>('guest');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank'>('cod');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const shipping = 25;
  const total = getTotal() + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would submit to your backend/Supabase
    console.log('Order submitted:', {
      items,
      total,
      paymentMethod,
      shippingAddress: formData,
      customerType: checkoutType,
    });

    alert(locale === 'ar' ? 'تم تأكيد طلبك بنجاح!' : 'Order placed successfully!');
    clearCart();
    router.push(`/${locale}/account/orders`);
  };

  if (items.length === 0) {
    router.push(`/${locale}/cart`);
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {t('checkout.title')}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            {/* Checkout Type */}
            {!user && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {locale === 'ar' ? 'نوع الطلب' : 'Checkout Type'}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setCheckoutType('guest')}
                    className={`p-4 border rounded-lg text-center transition-all ${
                      checkoutType === 'guest'
                        ? 'border-rose-600 bg-rose-50 text-rose-600'
                        : 'border-gray-300 text-gray-700 hover:border-rose-600'
                    }`}
                  >
                    {t('checkout.guestCheckout')}
                  </button>
                  <button
                    onClick={() => setCheckoutType('member')}
                    className={`p-4 border rounded-lg text-center transition-all ${
                      checkoutType === 'member'
                        ? 'border-rose-600 bg-rose-50 text-rose-600'
                        : 'border-gray-300 text-gray-700 hover:border-rose-600'
                    }`}
                  >
                    {t('checkout.memberCheckout')}
                  </button>
                </div>
              </div>
            )}

            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t('checkout.shippingAddress')}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder={t('auth.firstName')}
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder={t('auth.lastName')}
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder={t('auth.email')}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder={t('auth.phone')}
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />

                <textarea
                  name="address"
                  placeholder={locale === 'ar' ? 'العنوان الكامل' : 'Full Address'}
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder={locale === 'ar' ? 'المدينة' : 'City'}
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    name="postalCode"
                    placeholder={locale === 'ar' ? 'الرمز البريدي' : 'Postal Code'}
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>

                {/* Payment Method */}
                <div className="bg-gray-50 rounded-lg p-4 mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('checkout.paymentMethod')}
                  </h3>
                  
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value as 'cod' | 'bank')}
                        className="w-4 h-4 text-rose-600"
                      />
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Truck size={20} className="text-gray-600" />
                        <span>{t('checkout.cashOnDelivery')}</span>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={paymentMethod === 'bank'}
                        onChange={(e) => setPaymentMethod(e.target.value as 'cod' | 'bank')}
                        className="w-4 h-4 text-rose-600"
                      />
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <CreditCard size={20} className="text-gray-600" />
                        <span>{t('checkout.bankTransfer')}</span>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 px-6 py-4 bg-rose-600 text-white font-semibold rounded-full hover:bg-rose-700 transition-colors"
                >
                  {t('checkout.placeOrder')}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {locale === 'ar' ? 'ملخص الطلب' : 'Order Summary'}
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="relative w-12 h-12 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {item.size} | {item.color} | Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-semibold">
                      {item.price * item.quantity} {t('common.currency')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('cart.subtotal')}</span>
                  <span>{getTotal()} {t('common.currency')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('cart.shipping')}</span>
                  <span>{shipping} {t('common.currency')}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>{t('cart.total')}</span>
                  <span className="text-rose-600">
                    {total} {t('common.currency')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}