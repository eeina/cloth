'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { ProductCard } from '../../components/ui/ProductCard';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Sample product data
const sampleProducts = [
  {
    id: '1',
    name: 'Elegant Black Abaya',
    name_ar: 'عباءة سوداء أنيقة',
    price: 299,
    image: 'https://images.pexels.com/photos/7034217/pexels-photo-7034217.jpeg',
    category: 'abaya',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy'],
    inStock: true,
  },
  {
    id: '2',
    name: 'Premium Silk Hijab',
    name_ar: 'حجاب حريري فاخر',
    price: 89,
    image: 'https://images.pexels.com/photos/8442924/pexels-photo-8442924.jpeg',
    category: 'hijab',
    sizes: ['One Size'],
    colors: ['Beige', 'Rose', 'Navy', 'Black'],
    inStock: true,
  },
  {
    id: '3',
    name: 'Modest Evening Dress',
    name_ar: 'فستان سهرة محتشم',
    price: 459,
    image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
    category: 'dresses',
    sizes: ['S', 'M', 'L'],
    colors: ['Burgundy', 'Navy', 'Black'],
    inStock: true,
  },
  {
    id: '4',
    name: 'Traditional Niqab',
    name_ar: 'نقاب تقليدي',
    price: 45,
    image: 'https://images.pexels.com/photos/8442876/pexels-photo-8442876.jpeg',
    category: 'niqab',
    sizes: ['One Size'],
    colors: ['Black'],
    inStock: true,
  },
];

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const categories = [
    {
      name: t('navigation.hijab'),
      href: '/categories/hijab',
      image: 'https://images.pexels.com/photos/8442924/pexels-photo-8442924.jpeg',
    },
    {
      name: t('navigation.abaya'),
      href: '/categories/abaya',
      image: 'https://images.pexels.com/photos/7034217/pexels-photo-7034217.jpeg',
    },
    {
      name: t('navigation.dresses'),
      href: '/categories/dresses',
      image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
    },
    {
      name: t('navigation.accessories'),
      href: '/categories/accessories',
      image: 'https://images.pexels.com/photos/1162983/pexels-photo-1162983.jpeg',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg"
          alt="Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('homepage.heroTitle')}
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
              {t('homepage.heroSubtitle')}
            </p>
            <Link
              href={`/${locale}/categories`}
              className="inline-flex items-center px-8 py-4 bg-rose-600 text-white font-semibold rounded-full hover:bg-rose-700 transition-all duration-300 transform hover:scale-105"
            >
              {t('homepage.shopNow')}
              {isRTL ? <ChevronLeft className="ml-2" size={20} /> : <ChevronRight className="ml-2" size={20} />}
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('homepage.categories')}
            </h2>
            <div className="w-24 h-1 bg-rose-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/${locale}${category.href}`}
                className="group relative overflow-hidden rounded-lg aspect-square"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white font-semibold text-lg md:text-xl text-center px-4">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('homepage.featuredProducts')}
            </h2>
            <div className="w-24 h-1 bg-rose-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center px-6 py-3 border border-rose-600 text-rose-600 font-semibold rounded-full hover:bg-rose-600 hover:text-white transition-all duration-300"
            >
              {t('homepage.viewAllProducts')}
              {isRTL ? <ChevronLeft className="ml-2" size={20} /> : <ChevronRight className="ml-2" size={20} />}
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 bg-gradient-to-r from-rose-500 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            {t('homepage.offers')}
          </h2>
          <p className="text-lg mb-8 opacity-90">
            {t('homepage.offersText')}
          </p>
          <Link
            href={`/${locale}/offers`}
            className="inline-flex items-center px-8 py-4 bg-white text-rose-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            {t('homepage.shopOffers')}
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('homepage.newsletter')}
          </h2>
          <p className="text-gray-600 mb-8">
            {t('homepage.newsletterText')}
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('homepage.enterEmail')}
              className={`flex-1 px-4 py-3 border border-gray-300 rounded-l-full ${isRTL ? 'rounded-r-full rounded-l-none' : ''} focus:ring-2 focus:ring-rose-500 focus:border-transparent`}
            />
            <button
              className={`px-6 py-3 bg-rose-600 text-white font-semibold rounded-r-full ${isRTL ? 'rounded-l-full rounded-r-none' : ''} hover:bg-rose-700 transition-colors`}
            >
              {t('homepage.subscribe')}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}