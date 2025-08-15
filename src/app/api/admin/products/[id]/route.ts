import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = await db.product.findUnique({
      where: { id },
      include: {
        category: true
      }
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

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

    return NextResponse.json(transformedProduct);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const product = await db.product.update({
      where: { id },
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

    return NextResponse.json(transformedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await db.product.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}