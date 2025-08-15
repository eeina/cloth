'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/ui/ProductCard';
import { useCart } from '@/components/providers/CartProvider';
import { Star, Heart, ShoppingCart, Minus, Plus } from 'lucide-react';

// Sample product data (in real app, this would come from API/database)
const sampleProducts = [
  {
    id: '1',
    name: 'Elegant Black Abaya',
    name_ar: 'عباءة سوداء أنيقة',
    price: 299,
    image: 'https://images.pexels.com/photos/7034217/pexels-photo-7034217.jpeg',
    images: [
      'https://images.pexels.com/photos/7034217/pexels-photo-7034217.jpeg',
      'https://images.pexels.com/photos/7034219/pexels-photo-7034219.jpeg',
      'https://images.pexels.com/photos/7034221/pexels-photo-7034221.jpeg',
    ],
    category: 'abaya',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy'],
    inStock: true,
    description: 'Premium quality abaya made from the finest fabrics. Perfect for everyday wear and special occasions.',
    description_ar: 'عباءة فاخرة مصنوعة من أجود الأقمشة. مثالية للارتداء اليومي والمناسبات الخاصة.',
    rating: 4.8,
    reviews: 24,
  },
];

export default function ProductPage() {
  const params = useParams();
  const t = useTranslations();
  const locale = useLocale();
  const { addItem } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Find product by ID (in real app, fetch from API)
  const product = sampleProducts.find(p => p.id === params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const productName = locale === 'ar' ? product.name_ar : product.name;
  const productDescription = locale === 'ar' ? product.description_ar : product.description;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert(locale === 'ar' ? 'يرجى اختيار المقاس واللون' : 'Please select size and color');
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: productName,
        price: product.price,
        image: product.images[0],
        size: selectedSize,
        color: selectedColor,
      });
    }

    alert(locale === 'ar' ? 'تم إضافة المنتج إلى السلة' : 'Product added to cart');
  };

  // Related products (excluding current product)
  const relatedProducts = sampleProducts.filter(p => 
    p.category === product.category && p.id !== product.id
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-white">
              <Image
                src={product.images[selectedImage]}
                alt={productName}
                fill
                className="object-cover product-image-zoom"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg ${
                    selectedImage === index ? 'ring-2 ring-rose-600' : ''
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${productName} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {productName}
              </h1>
              
              <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 rtl:mr-2 text-sm text-gray-600">
                    {product.rating} ({product.reviews} {locale === 'ar' ? 'تقييم' : 'reviews'})
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  {product.price}
                </span>
                <span className="text-lg text-gray-600">
                  {t('common.currency')}
                </span>
              </div>

              {product.inStock ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {t('product.inStock')}
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                  {t('product.outOfStock')}
                </span>
              )}
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {t('product.size')}
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-4 border rounded-lg text-center font-medium transition-all ${
                      selectedSize === size
                        ? 'border-rose-600 bg-rose-600 text-white'
                        : 'border-gray-300 text-gray-700 hover:border-rose-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {t('product.color')}
              </h3>
              <div className="flex space-x-3 rtl:space-x-reverse">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-lg font-medium transition-all ${
                      selectedColor === color
                        ? 'border-rose-600 bg-rose-600 text-white'
                        : 'border-gray-300 text-gray-700 hover:border-rose-600'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {t('cart.quantity')}
              </h3>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 border border-gray-300 rounded-lg min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 rtl:space-x-reverse">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-rose-600 text-white font-semibold rounded-full hover:bg-rose-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300"
              >
                <ShoppingCart className="mr-2 rtl:ml-2" size={20} />
                {t('product.addToCart')}
              </button>
              
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-3 border rounded-full transition-all ${
                  isWishlisted
                    ? 'border-rose-600 bg-rose-600 text-white'
                    : 'border-gray-300 text-gray-700 hover:border-rose-600'
                }`}
              >
                <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
              </button>
            </div>

            {/* Description */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {t('product.description')}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {productDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 border-t pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {t('product.relatedProducts')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}