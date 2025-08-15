'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/ui/ProductCard';

// Sample categories data
const categories = [
  {
    id: 'hijab',
    name: 'Hijab',
    name_ar: 'حجاب',
    image: 'https://images.pexels.com/photos/8442924/pexels-photo-8442924.jpeg',
    description: 'Premium quality hijabs in various styles and colors',
    description_ar: 'حجابات عالية الجودة بأساليب وألوان متنوعة',
    productCount: 45,
  },
  {
    id: 'abaya',
    name: 'Abaya',
    name_ar: 'عباءة',
    image: 'https://images.pexels.com/photos/7034217/pexels-photo-7034217.jpeg',
    description: 'Elegant abayas for every occasion',
    description_ar: 'عباءات أنيقة لكل مناسبة',
    productCount: 32,
  },
  {
    id: 'dresses',
    name: 'Modest Dresses',
    name_ar: 'فساتين محتشمة',
    image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
    description: 'Beautiful modest dresses for special occasions',
    description_ar: 'فساتين محتشمة جميلة للمناسبات الخاصة',
    productCount: 28,
  },
  {
    id: 'niqab',
    name: 'Niqab',
    name_ar: 'نقاب',
    image: 'https://images.pexels.com/photos/8442876/pexels-photo-8442876.jpeg',
    description: 'Traditional and modern niqab styles',
    description_ar: 'أساليب نقاب تقليدية وعصرية',
    productCount: 15,
  },
  {
    id: 'accessories',
    name: 'Accessories',
    name_ar: 'إكسسوارات',
    image: 'https://images.pexels.com/photos/1162983/pexels-photo-1162983.jpeg',
    description: 'Complete your modest look with our accessories',
    description_ar: 'أكملي إطلالتك المحتشمة مع إكسسواراتنا',
    productCount: 67,
  },
];

// Sample featured products
const featuredProducts = [
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

export default function CategoriesPage() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('navigation.categories')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {locale === 'ar' 
              ? 'اكتشفي مجموعتنا المتنوعة من الأزياء المحتشمة المصممة خصيصاً للمرأة السعودية العصرية'
              : 'Discover our diverse collection of modest fashion designed specifically for the modern Saudi woman'
            }
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${locale}/categories/${category.id}`}
              className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={category.image}
                  alt={locale === 'ar' ? category.name_ar : category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300" />
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-gray-900">
                    {category.productCount} {locale === 'ar' ? 'منتج' : 'items'}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {locale === 'ar' ? category.name_ar : category.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {locale === 'ar' ? category.description_ar : category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Products */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('homepage.featuredProducts')}
            </h2>
            <div className="w-24 h-1 bg-rose-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}