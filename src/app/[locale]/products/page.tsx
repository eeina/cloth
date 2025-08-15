'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/ui/ProductCard';
import { Filter, SlidersHorizontal, Search } from 'lucide-react';
import { useState } from 'react';

// All products data
const allProducts = [
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
  {
    id: '8',
    name: 'Casual Day Dress',
    name_ar: 'فستان يومي كاجوال',
    price: 189,
    image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
    category: 'dresses',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Gray', 'Beige', 'Navy'],
    inStock: true,
  },
];

export default function ProductsPage() {
  const t = useTranslations();
  const locale = useLocale();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  // Filter products based on search and filters
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name_ar.includes(searchTerm);
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    const matchesPrice = priceRange === 'all' || 
      (priceRange === 'under-100' && product.price < 100) ||
      (priceRange === '100-300' && product.price >= 100 && product.price <= 300) ||
      (priceRange === 'over-300' && product.price > 300);

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
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
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {locale === 'ar' ? 'جميع المنتجات' : 'All Products'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {locale === 'ar' 
              ? 'اكتشفي مجموعتنا الكاملة من الأزياء المحتشمة عالية الجودة'
              : 'Discover our complete collection of high-quality modest fashion'
            }
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 rtl:right-3 rtl:left-auto top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={locale === 'ar' ? 'ابحث عن المنتجات...' : 'Search products...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 rtl:pr-10 rtl:pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>

            {/* Controls */}
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
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    {locale === 'ar' ? 'الفئة' : 'Category'}
                  </h3>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="all">
                      {locale === 'ar' ? 'جميع الفئات' : 'All Categories'}
                    </option>
                    <option value="hijab">
                      {locale === 'ar' ? 'حجاب' : 'Hijab'}
                    </option>
                    <option value="abaya">
                      {locale === 'ar' ? 'عباءة' : 'Abaya'}
                    </option>
                    <option value="dresses">
                      {locale === 'ar' ? 'فساتين' : 'Dresses'}
                    </option>
                    <option value="niqab">
                      {locale === 'ar' ? 'نقاب' : 'Niqab'}
                    </option>
                    <option value="accessories">
                      {locale === 'ar' ? 'إكسسوارات' : 'Accessories'}
                    </option>
                  </select>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    {locale === 'ar' ? 'السعر' : 'Price Range'}
                  </h3>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="all">
                      {locale === 'ar' ? 'جميع الأسعار' : 'All Prices'}
                    </option>
                    <option value="under-100">
                      {locale === 'ar' ? 'أقل من 100 ريال' : 'Under 100 SAR'}
                    </option>
                    <option value="100-300">100 - 300 SAR</option>
                    <option value="over-300">
                      {locale === 'ar' ? 'أكثر من 300 ريال' : 'Over 300 SAR'}
                    </option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      setPriceRange('all');
                      setSortBy('featured');
                    }}
                    className="w-full px-4 py-2 text-rose-600 border border-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                  >
                    {locale === 'ar' ? 'مسح الفلاتر' : 'Clear Filters'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {locale === 'ar' 
              ? `عرض ${sortedProducts.length} من ${allProducts.length} منتج`
              : `Showing ${sortedProducts.length} of ${allProducts.length} products`
            }
          </p>
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">
              {locale === 'ar' 
                ? 'لم يتم العثور على منتجات تطابق البحث'
                : 'No products found matching your search'
              }
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setPriceRange('all');
              }}
              className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
            >
              {locale === 'ar' ? 'مسح البحث' : 'Clear Search'}
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}