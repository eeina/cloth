import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Hijab',
        nameAr: 'حجاب',
        description: 'Modest headscarves for everyday wear',
        descriptionAr: 'أغطية رأس محتشمة للاستخدام اليومي',
        image: 'https://images.pexels.com/photos/8442924/pexels-photo-8442924.jpeg'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Niqab',
        nameAr: 'نقاب',
        description: 'Face veils for complete modesty',
        descriptionAr: 'غطاء الوجه للحشمة الكاملة',
        image: 'https://images.pexels.com/photos/8442876/pexels-photo-8442876.jpeg'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Abaya',
        nameAr: 'عباءة',
        description: 'Elegant full-length dresses',
        descriptionAr: 'فساتين طويلة أنيقة',
        image: 'https://images.pexels.com/photos/7034217/pexels-photo-7034217.jpeg'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Dresses',
        nameAr: 'فساتين',
        description: 'Modest dresses for special occasions',
        descriptionAr: 'فساتين محتشمة للمناسبات الخاصة',
        image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Accessories',
        nameAr: 'إكسسوارات',
        description: 'Complementary accessories for modest fashion',
        descriptionAr: 'إكسسوارات مكملة للأزياء المحتشمة',
        image: 'https://images.pexels.com/photos/1162983/pexels-photo-1162983.jpeg'
      }
    })
  ]);

  console.log(`✅ Created ${categories.length} categories`);

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: {
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
      }
    }),
    prisma.product.create({
      data: {
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
      }
    }),
    prisma.product.create({
      data: {
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
      }
    }),
    prisma.product.create({
      data: {
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
      }
    }),
    prisma.product.create({
      data: {
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
      }
    }),
    prisma.product.create({
      data: {
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
    })
  ]);

  console.log(`✅ Created ${products.length} products`);

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@elegant.sa',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN'
    }
  });

  console.log(`✅ Created admin user: ${adminUser.email}`);

  // Create test customer user
  const customerPassword = await bcrypt.hash('customer123', 10);
  const customerUser = await prisma.user.create({
    data: {
      email: 'customer@elegant.sa',
      password: customerPassword,
      firstName: 'Customer',
      lastName: 'Test',
      phone: '+966501234567',
      role: 'CUSTOMER'
    }
  });

  console.log(`✅ Created customer user: ${customerUser.email}`);

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