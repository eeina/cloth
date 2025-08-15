import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create categories (check if they exist first)
  const categoryData = [
    {
      name: 'Hijab',
      nameAr: 'حجاب',
      description: 'Modest headscarves for everyday wear',
      descriptionAr: 'أغطية رأس محتشمة للاستخدام اليومي',
      image: 'https://images.pexels.com/photos/8442924/pexels-photo-8442924.jpeg'
    },
    {
      name: 'Niqab',
      nameAr: 'نقاب',
      description: 'Face veils for complete modesty',
      descriptionAr: 'غطاء الوجه للحشمة الكاملة',
      image: 'https://images.pexels.com/photos/8442876/pexels-photo-8442876.jpeg'
    },
    {
      name: 'Abaya',
      nameAr: 'عباءة',
      description: 'Elegant full-length dresses',
      descriptionAr: 'فساتين طويلة أنيقة',
      image: 'https://images.pexels.com/photos/7034217/pexels-photo-7034217.jpeg'
    },
    {
      name: 'Dresses',
      nameAr: 'فساتين',
      description: 'Modest dresses for special occasions',
      descriptionAr: 'فساتين محتشمة للمناسبات الخاصة',
      image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg'
    },
    {
      name: 'Accessories',
      nameAr: 'إكسسوارات',
      description: 'Complementary accessories for modest fashion',
      descriptionAr: 'إكسسوارات مكملة للأزياء المحتشمة',
      image: 'https://images.pexels.com/photos/1162983/pexels-photo-1162983.jpeg'
    }
  ];

  const categories = [];
  for (const catData of categoryData) {
    const existingCategory = await prisma.category.findFirst({
      where: { name: catData.name }
    });

    if (existingCategory) {
      categories.push(existingCategory);
    } else {
      const newCategory = await prisma.category.create({
        data: catData
      });
      categories.push(newCategory);
    }
  }

  console.log(`✅ Created/updated ${categories.length} categories`);

  // Create products (check if they exist first)
  const productData = [
    {
      name: 'Elegant Black Abaya',
      nameAr: 'عباءة سوداء أنيقة',
      description: 'A timeless black abaya made from premium fabric',
      descriptionAr: 'عباءة سوداء كلاسيكية مصنوعة من قماش فاخر',
      price: 299,
      image: 'https://images.pexels.com/photos/7034217/pexels-photo-7034217.jpeg',
      categoryId: categories[2].id, // Abaya category
      sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
      colors: JSON.stringify(['Black', 'Navy']),
      featured: true
    },
    {
      name: 'Premium Silk Hijab',
      nameAr: 'حجاب حريري فاخر',
      description: 'Luxurious silk hijab with beautiful drape',
      descriptionAr: 'حجاب حريري فاخر بتداعب جميل',
      price: 89,
      image: 'https://images.pexels.com/photos/8442924/pexels-photo-8442924.jpeg',
      categoryId: categories[0].id, // Hijab category
      sizes: JSON.stringify(['One Size']),
      colors: JSON.stringify(['Beige', 'Rose', 'Navy', 'Black']),
      featured: true
    },
    {
      name: 'Modest Evening Dress',
      nameAr: 'فستان سهرة محتشم',
      description: 'Elegant evening dress perfect for special occasions',
      descriptionAr: 'فستان سهرة أنيق مثالي للمناسبات الخاصة',
      price: 459,
      image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
      categoryId: categories[3].id, // Dresses category
      sizes: JSON.stringify(['S', 'M', 'L']),
      colors: JSON.stringify(['Burgundy', 'Navy', 'Black']),
      featured: true
    },
    {
      name: 'Traditional Niqab',
      nameAr: 'نقاب تقليدي',
      description: 'Traditional niqab with comfortable fit',
      descriptionAr: 'نقاب تقليدي بمقاس مريح',
      price: 45,
      image: 'https://images.pexels.com/photos/8442876/pexels-photo-8442876.jpeg',
      categoryId: categories[1].id, // Niqab category
      sizes: JSON.stringify(['One Size']),
      colors: JSON.stringify(['Black']),
      featured: false
    },
    {
      name: 'Floral Print Hijab',
      nameAr: 'حجاب بورود زهور',
      description: 'Beautiful floral print hijab for spring',
      descriptionAr: 'حجاب بطبعة زهور جميلة للربيع',
      price: 65,
      image: 'https://images.pexels.com/photos/8442924/pexels-photo-8442924.jpeg',
      categoryId: categories[0].id, // Hijab category
      sizes: JSON.stringify(['One Size']),
      colors: JSON.stringify(['Pink', 'Blue', 'Green']),
      featured: false
    },
    {
      name: 'Embroidered Abaya',
      nameAr: 'عباءة مطرزة',
      description: 'Beautifully embroidered abaya for special occasions',
      descriptionAr: 'عباءة مطرزة بشكل جميل للمناسبات الخاصة',
      price: 399,
      image: 'https://images.pexels.com/photos/7034217/pexels-photo-7034217.jpeg',
      categoryId: categories[2].id, // Abaya category
      sizes: JSON.stringify(['M', 'L', 'XL']),
      colors: JSON.stringify(['Black', 'Dark Green']),
      featured: true
    }
  ];

  const products = [];
  for (const prodData of productData) {
    const existingProduct = await prisma.product.findFirst({
      where: { name: prodData.name }
    });

    if (existingProduct) {
      products.push(existingProduct);
    } else {
      const newProduct = await prisma.product.create({
        data: prodData
      });
      products.push(newProduct);
    }
  }

  console.log(`✅ Created/updated ${products.length} products`);

  // Create admin user (using upsert since email is unique)
  const hashedAdminPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@elegant.sa' },
    update: {
      password: hashedAdminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN'
    },
    create: {
      email: 'admin@elegant.sa',
      password: hashedAdminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN'
    }
  });

  console.log(`✅ Created/updated admin user: ${adminUser.email}`);

  // Create test customer user (using upsert since email is unique)
  const hashedCustomerPassword = await bcrypt.hash('customer123', 10);
  const customerUser = await prisma.user.upsert({
    where: { email: 'customer@elegant.sa' },
    update: {
      password: hashedCustomerPassword,
      firstName: 'Customer',
      lastName: 'Test',
      phone: '+966501234567',
      role: 'CUSTOMER'
    },
    create: {
      email: 'customer@elegant.sa',
      password: hashedCustomerPassword,
      firstName: 'Customer',
      lastName: 'Test',
      phone: '+966501234567',
      role: 'CUSTOMER'
    }
  });

  console.log(`✅ Created/updated customer user: ${customerUser.email}`);

  console.log('🎉 Database seeded successfully!');
  console.log('\n📝 Test Credentials:');
  console.log('Admin: admin@elegant.sa / admin123');
  console.log('Customer: customer@elegant.sa / customer123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });