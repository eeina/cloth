'use client';

import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/ui/ProductCard';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

// Sample products data by category
const productsByCategory: { [key: string]: any[] } = {
  hijab: [
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
      id: '5',
      name: 'Cotton Everyday Hijab',
      name_ar: 'حجاب قطني يومي',
      price: 45,
      image: 'https://images.pexels.com/photos/8442924/pexels-photo-8442924.jpeg',
      category: 'hijab',
      sizes: ['One Size'],
      colors: ['White', 'Black', 'Gray', 'Beige'],
      inStock: true,
    },
  ],
  abaya: [
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
      id: '6',
      name: 'Embroidered Abaya',
      name_ar: 'عباءة مطرزة',
      price: 399,
      image: 'https://images.pexels.com/photos/7034219/pexels-photo-7034219.jpeg',
      category: 'abaya',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'Navy', 'Brown'],
      inStock: true,
    },
  ],
  dresses: [
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
  ],
  niqab: [
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
  ],
  accessories: [
    {
      id: '7',
      name: 'Elegant Brooch Set',
      name_ar: 'طقم بروش أنيق',
      price: 75,
      image: 'https://images.pexels.com/photos/1162983/pexels-photo-1162983.jpeg',
      category: 'accessories',
      sizes: ['One Size'],
      colors: ['Gold', 'Silver'],
      inStock: true,
    },
  ],
};

const categoryNames: { [key: string]: { en: string; ar: string } } = {
  hijab: { en: 'Hijab', ar: 'حجاب' },
  abaya: { en: 'Abaya', ar: 'عباءة' },
  dresses: { en: 'Modest Dresses', ar: 'فساتين محتشمة' },
  niqab: { en: 'Niqab', ar: 'نقاب' },
  accessories: { en: 'Accessories', ar: 'إكسسوارات' },
};

export default function CategoryPage() {
  const params = useParams();
  const t = useTranslations();
  const locale = useLocale();
  const category = params.category as string;

  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const products = productsByCategory[category] || [];
  const categoryName = categoryNames[category];

  if (!categoryName) {
    return <div>Category not found</div>;
  }

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return locale === 'ar' 
          ? a.name_ar.localeCompare(b.name_ar)
          : a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600 mb-8">
          <a href={`/${locale}`} className="hover:text-rose-600">
            {t('navigation.home')}
          </a>
          <span>/</span>
          <a href={`/${locale}/categories`} className="hover:text-rose-600">
            {t('navigation.categories')}
          </a>
          <span>/</span>
          <span className="text-gray-900">
            {locale === 'ar' ? categoryName.ar : categoryName.en}
          </span>
        </nav>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {locale === 'ar' ? categoryName.ar : categoryName.en}
            </h1>
            <p className="text-gray-600">
              {products.length} {locale === 'ar' ? 'منتج' : 'products'}
            </p>
          </div>

          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <SlidersHorizontal size={16} />
              <span>{locale === 'ar' ? 'تصفية' : 'Filter'}</span>
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            >
              <option value="featured">
                {locale === 'ar' ? 'مميز' : 'Featured'}
              </option>
              <option value="price-low">
                {locale === 'ar' ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}
              </option>
              <option value="price-high">
                {locale === 'ar' ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}
              </option>
              <option value="name">
                {locale === 'ar' ? 'الاسم' : 'Name'}
              </option>
            </select>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  {locale === 'ar' ? 'السعر' : 'Price'}
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 rtl:ml-2" />
                    <span className="text-sm">
                      {locale === 'ar' ? 'أقل من 100 ريال' : 'Under 100 SAR'}
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 rtl:ml-2" />
                    <span className="text-sm">100 - 300 SAR</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 rtl:ml-2" />
                    <span className="text-sm">
                      {locale === 'ar' ? 'أكثر من 300 ريال' : 'Over 300 SAR'}
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  {locale === 'ar' ? 'اللون' : 'Color'}
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 rtl:ml-2" />
                    <span className="text-sm">
                      {locale === 'ar' ? 'أسود' : 'Black'}
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 rtl:ml-2" />
                    <span className="text-sm">
                      {locale === 'ar' ? 'كحلي' : 'Navy'}
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 rtl:ml-2" />
                    <span className="text-sm">
                      {locale === 'ar' ? 'بيج' : 'Beige'}
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  {locale === 'ar' ? 'المقاس' : 'Size'}
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 rtl:ml-2" />
                    <span className="text-sm">S</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 rtl:ml-2" />
                    <span className="text-sm">M</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 rtl:ml-2" />
                    <span className="text-sm">L</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 rtl:ml-2" />
                    <span className="text-sm">XL</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  {locale === 'ar' ? 'التوفر' : 'Availability'}
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 rtl:ml-2" />
                    <span className="text-sm">
                      {locale === 'ar' ? 'متوفر' : 'In Stock'}
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 rtl:ml-2" />
                    <span className="text-sm">
                      {locale === 'ar' ? 'غير متوفر' : 'Out of Stock'}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {locale === 'ar' 
                ? 'لا توجد منتجات في هذه الفئة حالياً'
                : 'No products available in this category'
              }
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}