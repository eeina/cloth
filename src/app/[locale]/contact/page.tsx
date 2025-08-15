'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations();
  const locale = useLocale();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: locale === 'ar' ? 'الهاتف' : 'Phone',
      details: ['+966 50 123 4567', '+966 11 234 5678'],
    },
    {
      icon: Mail,
      title: locale === 'ar' ? 'البريد الإلكتروني' : 'Email',
      details: ['info@elegant.sa', 'support@elegant.sa'],
    },
    {
      icon: MapPin,
      title: locale === 'ar' ? 'العنوان' : 'Address',
      details: [
        locale === 'ar' 
          ? 'الرياض، المملكة العربية السعودية'
          : 'Riyadh, Saudi Arabia'
      ],
    },
    {
      icon: Clock,
      title: locale === 'ar' ? 'ساعات العمل' : 'Working Hours',
      details: [
        locale === 'ar' 
          ? 'الأحد - الخميس: 9:00 ص - 10:00 م'
          : 'Sunday - Thursday: 9:00 AM - 10:00 PM',
        locale === 'ar'
          ? 'الجمعة - السبت: 2:00 م - 11:00 م'
          : 'Friday - Saturday: 2:00 PM - 11:00 PM'
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {locale === 'ar' ? 'تواصلي معنا' : 'Contact Us'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {locale === 'ar'
              ? 'نحن هنا لمساعدتك. تواصلي معنا لأي استفسار أو طلب مساعدة'
              : 'We are here to help you. Contact us for any questions or assistance'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {locale === 'ar' ? 'معلومات التواصل' : 'Contact Information'}
            </h2>

            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className="flex items-center justify-center w-12 h-12 bg-rose-100 rounded-lg flex-shrink-0">
                      <Icon size={24} className="text-rose-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {info.title}
                      </h3>
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-gray-600">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* FAQ Section */}
            <div className="mt-12">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {locale === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
              </h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {locale === 'ar' ? 'كم تستغرق عملية التوصيل؟' : 'How long does delivery take?'}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {locale === 'ar'
                      ? 'عادة ما يستغرق التوصيل من 2-5 أيام عمل داخل المملكة'
                      : 'Delivery usually takes 2-5 business days within Saudi Arabia'
                    }
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {locale === 'ar' ? 'هل يمكنني إرجاع المنتج؟' : 'Can I return a product?'}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {locale === 'ar'
                      ? 'نعم، يمكنك إرجاع المنتج خلال 30 يوماً من تاريخ الشراء'
                      : 'Yes, you can return products within 30 days of purchase'
                    }
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {locale === 'ar' ? 'ما هي طرق الدفع المتاحة؟' : 'What payment methods are available?'}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {locale === 'ar'
                      ? 'نقبل الدفع عند الاستلام والتحويل البنكي'
                      : 'We accept cash on delivery and bank transfer'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {locale === 'ar' ? 'أرسلي لنا رسالة' : 'Send us a Message'}
            </h2>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {locale === 'ar' ? 'تم إرسال رسالتك بنجاح!' : 'Message sent successfully!'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'ar'
                    ? 'شكراً لتواصلك معنا. سنرد عليك في أقرب وقت ممكن.'
                    : 'Thank you for contacting us. We will get back to you as soon as possible.'
                  }
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 text-rose-600 border border-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                >
                  {locale === 'ar' ? 'إرسال رسالة أخرى' : 'Send Another Message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'ar' ? 'الاسم' : 'Name'} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      placeholder={locale === 'ar' ? 'اسمك الكامل' : 'Your full name'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'ar' ? 'رقم الهاتف' : 'Phone'} *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      placeholder={locale === 'ar' ? 'رقم هاتفك' : 'Your phone number'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'ar' ? 'البريد الإلكتروني' : 'Email'} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder={locale === 'ar' ? 'بريدك الإلكتروني' : 'Your email address'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'ar' ? 'الموضوع' : 'Subject'} *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">
                      {locale === 'ar' ? 'اختاري الموضوع' : 'Select a subject'}
                    </option>
                    <option value="general">
                      {locale === 'ar' ? 'استفسار عام' : 'General Inquiry'}
                    </option>
                    <option value="order">
                      {locale === 'ar' ? 'استفسار عن طلب' : 'Order Inquiry'}
                    </option>
                    <option value="return">
                      {locale === 'ar' ? 'إرجاع أو استبدال' : 'Return or Exchange'}
                    </option>
                    <option value="complaint">
                      {locale === 'ar' ? 'شكوى' : 'Complaint'}
                    </option>
                    <option value="suggestion">
                      {locale === 'ar' ? 'اقتراح' : 'Suggestion'}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {locale === 'ar' ? 'الرسالة' : 'Message'} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                    placeholder={locale === 'ar' ? 'اكتبي رسالتك هنا...' : 'Write your message here...'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-rose-600 text-white font-semibold rounded-full hover:bg-rose-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2 rtl:space-x-reverse"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>{locale === 'ar' ? 'جاري الإرسال...' : 'Sending...'}</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>{locale === 'ar' ? 'إرسال الرسالة' : 'Send Message'}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}