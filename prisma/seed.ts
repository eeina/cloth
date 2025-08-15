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
      image: 'https://via.placeholder.com/400x600/8B4513/FFFFFF?text=Hijab'
    },
    {
      name: 'Niqab',
      nameAr: 'نقاب',
      description: 'Face veils for complete modesty',
      descriptionAr: 'غطاء الوجه للحشمة الكاملة',
      image: 'https://via.placeholder.com/400x600/000000/FFFFFF?text=Niqab'
    },
    {
      name: 'Abaya',
      nameAr: 'عباءة',
      description: 'Elegant full-length dresses',
      descriptionAr: 'فساتين طويلة أنيقة',
      image: 'https://via.placeholder.com/400x600/2F4F4F/FFFFFF?text=Abaya'
    },
    {
      name: 'Dresses',
      nameAr: 'فساتين',
      description: 'Modest dresses for special occasions',
      descriptionAr: 'فساتين محتشمة للمناسبات الخاصة',
      image: 'https://via.placeholder.com/400x600/800080/FFFFFF?text=Dresses'
    },
    {
      name: 'Accessories',
      nameAr: 'إكسسوارات',
      description: 'Complementary accessories for modest fashion',
      descriptionAr: 'إكسسوارات مكملة للأزياء المحتشمة',
      image: 'https://via.placeholder.com/400x600/FFD700/FFFFFF?text=Accessories'
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
      description: 'A timeless black abaya made from premium fabric with intricate embroidery details',
      descriptionAr: 'عباءة سوداء كلاسيكية مصنوعة من قماش فاخر مع تفاصيل تطريز دقيقة',
      price: 299,
      image: 'https://via.placeholder.com/400x600/000000/FFFFFF?text=Black+Abaya',
      categoryId: categories[2].id, // Abaya category
      sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
      colors: JSON.stringify(['Black', 'Navy']),
      featured: true
    },
    {
      name: 'Premium Silk Hijab',
      nameAr: 'حجاب حريري فاخر',
      description: 'Luxurious silk hijab with beautiful drape, perfect for special occasions',
      descriptionAr: 'حجاب حريري فاخر بتداعب جميل، مثالي للمناسبات الخاصة',
      price: 89,
      image: 'https://via.placeholder.com/400x600/FFC0CB/FFFFFF?text=Silk+Hijab',
      categoryId: categories[0].id, // Hijab category
      sizes: JSON.stringify(['One Size']),
      colors: JSON.stringify(['Beige', 'Rose', 'Navy', 'Black']),
      featured: true
    },
    {
      name: 'Modest Evening Dress',
      nameAr: 'فستان سهرة محتشم',
      description: 'Elegant evening dress with modest design, perfect for weddings and formal events',
      descriptionAr: 'فستان سهرة أنيق بتصميم محتشم، مثالي للأعراس والمناسبات الرسمية',
      price: 459,
      image: 'https://via.placeholder.com/400x600/800080/FFFFFF?text=Evening+Dress',
      categoryId: categories[3].id, // Dresses category
      sizes: JSON.stringify(['S', 'M', 'L']),
      colors: JSON.stringify(['Burgundy', 'Navy', 'Black']),
      featured: true
    },
    {
      name: 'Traditional Niqab',
      nameAr: 'نقاب تقليدي',
      description: 'Traditional niqab with comfortable fit and breathable fabric',
      descriptionAr: 'نقاب تقليدي بمقاس مريح وقماش قابل للتنفس',
      price: 45,
      image: 'https://via.placeholder.com/400x600/000000/FFFFFF?text=Niqab',
      categoryId: categories[1].id, // Niqab category
      sizes: JSON.stringify(['One Size']),
      colors: JSON.stringify(['Black']),
      featured: false
    },
    {
      name: 'Floral Print Hijab',
      nameAr: 'حجاب بورود زهور',
      description: 'Beautiful floral print hijab for spring and summer seasons',
      descriptionAr: 'حجاب بطبعة زهور جميلة لفصلي الربيع والصيف',
      price: 65,
      image: 'https://via.placeholder.com/400x600/FF69B4/FFFFFF?text=Floral+Hijab',
      categoryId: categories[0].id, // Hijab category
      sizes: JSON.stringify(['One Size']),
      colors: JSON.stringify(['Pink', 'Blue', 'Green']),
      featured: false
    },
    {
      name: 'Embroidered Abaya',
      nameAr: 'عباءة مطرزة',
      description: 'Beautifully embroidered abaya with traditional Saudi patterns',
      descriptionAr: 'عباءة مطرزة بشكل جميل بأنماط سعودية تقليدية',
      price: 399,
      image: 'https://via.placeholder.com/400x600/2F4F4F/FFFFFF?text=Embroidered+Abaya',
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