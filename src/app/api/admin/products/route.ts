import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search');
    const category = searchParams.get('category');

    const skip = (page - 1) * limit;

    let where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { nameAr: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    if (category) {
      where.category = {
        name: category
      };
    }

    const [products, total] = await Promise.all([
      db.product.findMany({
        where,
        include: {
          category: true
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit
      }),
      db.product.count({ where })
    ]);

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
      categoryId: product.categoryId,
      sizes: JSON.parse(product.sizes || '[]'),
      colors: JSON.parse(product.colors || '[]'),
      inStock: product.inStock,
      featured: product.featured,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }));

    return NextResponse.json({
      products: transformedProducts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      nameAr,
      description,
      descriptionAr,
      price,
      image,
      categoryId,
      sizes,
      colors,
      inStock,
      featured
    } = body;

    // Validate required fields
    if (!name || !nameAr || !price || !categoryId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const product = await db.product.create({
      data: {
        name,
        nameAr,
        description,
        descriptionAr,
        price: parseFloat(price),
        image,
        categoryId,
        sizes: JSON.stringify(sizes || []),
        colors: JSON.stringify(colors || []),
        inStock: inStock !== undefined ? inStock : true,
        featured: featured || false
      },
      include: {
        category: true
      }
    });

    // Transform product to match expected format
    const transformedProduct = {
      id: product.id,
      name: product.name,
      name_ar: product.nameAr,
      description: product.description,
      descriptionAr: product.descriptionAr,
      price: product.price,
      image: product.image,
      category: product.category.name,
      categoryId: product.categoryId,
      sizes: JSON.parse(product.sizes || '[]'),
      colors: JSON.parse(product.colors || '[]'),
      inStock: product.inStock,
      featured: product.featured,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    };

    return NextResponse.json(transformedProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}