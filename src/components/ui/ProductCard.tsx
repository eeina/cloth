'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/components/providers/CartProvider';

interface Product {
  id: string;
  name: string;
  name_ar: string;
  price: number;
  image: string;
  category: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const locale = useLocale();
  const t = useTranslations();
  const { addItem } = useCart();

  const productName = locale === 'ar' ? product.name_ar : product.name;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    await addItem({
      id: product.id,
      name: product.name,
      nameAr: product.name_ar,
      price: product.price,
      image: product.image,
      size: product.sizes[0] || 'M',
      color: product.colors[0] || 'Black',
    });
  };

  return (
    <Link href={`/${locale}/products/${product.id}`}>
      <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={product.image}
            alt={productName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold px-3 py-1 bg-gray-800 rounded">
                {t('product.outOfStock')}
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {productName}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <span className="text-lg font-bold text-gray-900">
                {product.price}
              </span>
              <span className="text-sm text-gray-600">
                {t('common.currency')}
              </span>
            </div>

            {product.inStock && (
              <button
                onClick={handleAddToCart}
                className="p-2 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition-colors"
              >
                <ShoppingCart size={16} />
              </button>
            )}
          </div>

          {product.inStock && (
            <div className="mt-2 text-xs text-gray-500">
              {product.sizes.length > 0 && (
                <span>
                  {t('product.size')}: {product.sizes.join(', ')}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}