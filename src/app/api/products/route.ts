import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');

    let where: any = {};
    
    if (featured === 'true') {
      where.featured = true;
    }
    
    if (category) {
      where.category = {
        name: category
      };
    }

    const products = await db.product.findMany({
      where,
      include: {
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit ? parseInt(limit) : undefined
    });

    // Transform products to match expected format
    const transformedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      name_ar: product.nameAr,
      description: product.description,
      descriptionAr: product.descriptionAr,
      price: product.price,
      image: product.image,
      category: product.category.name,
      sizes: JSON.parse(product.sizes || '[]'),
      colors: JSON.parse(product.colors || '[]'),
      inStock: product.inStock,
      featured: product.featured,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }));

    return NextResponse.json(transformedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}