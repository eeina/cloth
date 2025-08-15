'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Heart, Award, Truck, Shield } from 'lucide-react';

export default function AboutPage() {
  const t = useTranslations();
  const locale = useLocale();

  const values = [
    {
      icon: Heart,
      title: locale === 'ar' ? 'الجودة والأناقة' : 'Quality & Elegance',
      description: locale === 'ar' 
        ? 'نحن ملتزمون بتقديم أجود المنتجات التي تجمع بين الجودة العالية والأناقة المحتشمة'
        : 'We are committed to providing the finest products that combine high quality with modest elegance',
    },
    {
      icon: Award,
      title: locale === 'ar' ? 'خبرة وثقة' : 'Experience & Trust',
      description: locale === 'ar'
        ? 'بخبرة تمتد لسنوات في عالم الأزياء المحتشمة، نفهم احتياجات المرأة السعودية العصرية'
        : 'With years of experience in modest fashion, we understand the needs of the modern Saudi woman',
    },
    {
      icon: Truck,
      title: locale === 'ar' ? 'توصيل سريع' : 'Fast Delivery',
      description: locale === 'ar'
        ? 'نوفر خدمة توصيل سريعة وآمنة لجميع أنحاء المملكة العربية السعودية'
        : 'We provide fast and secure delivery service throughout Saudi Arabia',
    },
    {
      icon: Shield,
      title: locale === 'ar' ? 'ضمان الجودة' : 'Quality Guarantee',
      description: locale === 'ar'
        ? 'نضمن جودة جميع منتجاتنا مع إمكانية الإرجاع والاستبدال خلال 30 يوماً'
        : 'We guarantee the quality of all our products with return and exchange options within 30 days',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {locale === 'ar' ? 'عن أناقة' : 'About Elegant'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {locale === 'ar'
              ? 'نحن متجر متخصص في الأزياء المحتشمة للمرأة السعودية، نقدم مجموعة متنوعة من المنتجات عالية الجودة التي تجمع بين الأناقة والاحتشام'
              : 'We are a store specialized in modest fashion for Saudi women, offering a diverse range of high-quality products that combine elegance and modesty'
            }
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {locale === 'ar' ? 'قصتنا' : 'Our Story'}
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                {locale === 'ar'
                  ? 'بدأت رحلتنا من إيمان عميق بأن كل امرأة تستحق أن تشعر بالجمال والثقة في ملابسها. في عالم يتطور باستمرار، أردنا أن نقدم للمرأة السعودية خيارات أزياء تعكس شخصيتها وتحترم قيمها في الوقت نفسه.'
                  : 'Our journey began with a deep belief that every woman deserves to feel beautiful and confident in her clothing. In a constantly evolving world, we wanted to provide Saudi women with fashion choices that reflect their personality while respecting their values.'
                }
              </p>
              <p>
                {locale === 'ar'
                  ? 'منذ تأسيسنا، نحن نعمل بلا كلل لنكون الوجهة الأولى للأزياء المحتشمة في المملكة. نختار كل قطعة بعناية فائقة لضمان الجودة والأناقة والراحة.'
                  : 'Since our founding, we have worked tirelessly to become the premier destination for modest fashion in the Kingdom. We carefully select each piece to ensure quality, elegance, and comfort.'
                }
              </p>
            </div>
          </div>
          <div className="relative">
            <Image
              src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg"
              alt="Our Story"
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'ar' ? 'قيمنا' : 'Our Values'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {locale === 'ar'
                ? 'القيم التي نؤمن بها وتوجه عملنا كل يوم'
                : 'The values we believe in and that guide our work every day'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-center w-12 h-12 bg-rose-100 rounded-lg mb-4">
                    <Icon size={24} className="text-rose-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg p-8 md:p-12 shadow-sm">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {locale === 'ar' ? 'رسالتنا' : 'Our Mission'}
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
              {locale === 'ar'
                ? 'رسالتنا هي تمكين المرأة السعودية من التعبير عن أناقتها وشخصيتها من خلال أزياء محتشمة عالية الجودة، مع توفير تجربة تسوق استثنائية تجمع بين الراحة والثقة والجمال.'
                : 'Our mission is to empower Saudi women to express their elegance and personality through high-quality modest fashion, while providing an exceptional shopping experience that combines comfort, confidence, and beauty.'
              }
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {locale === 'ar' ? 'تواصلي معنا' : 'Get in Touch'}
          </h2>
          <p className="text-gray-600 mb-8">
            {locale === 'ar'
              ? 'نحن هنا لمساعدتك في أي استفسار أو طلب'
              : 'We are here to help you with any questions or requests'
            }
          </p>
          <a
            href={`/${locale}/contact`}
            className="inline-flex items-center px-8 py-3 bg-rose-600 text-white font-semibold rounded-full hover:bg-rose-700 transition-colors"
          >
            {locale === 'ar' ? 'اتصلي بنا' : 'Contact Us'}
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}