'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  TrendingUp,
  Plus,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

export default function AdminDashboard() {
  const t = useTranslations();
  const locale = useLocale();

  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    {
      title: locale === 'ar' ? 'إجمالي المبيعات' : 'Total Sales',
      value: '45,230',
      suffix: t('common.currency'),
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
    {
      title: locale === 'ar' ? 'الطلبات' : 'Orders',
      value: '1,234',
      change: '+8.2%',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      title: locale === 'ar' ? 'المنتجات' : 'Products',
      value: '456',
      change: '+5.1%',
      icon: Package,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
    },
    {
      title: locale === 'ar' ? 'العملاء' : 'Customers',
      value: '2,890',
      change: '+15.3%',
      icon: Users,
      color: 'text-rose-600',
      bg: 'bg-rose-100',
    },
  ];

  const recentOrders = [
    { id: '#1234', customer: 'Sara Ahmed', total: 299, status: 'completed' },
    { id: '#1235', customer: 'Fatima Ali', total: 156, status: 'processing' },
    { id: '#1236', customer: 'Noura Hassan', total: 890, status: 'shipped' },
    { id: '#1237', customer: 'Maryam Omar', total: 234, status: 'pending' },
  ];

  const sampleProducts = [
    { id: '1', name: 'Elegant Black Abaya', name_ar: 'عباءة سوداء أنيقة', price: 299, stock: 45, category: 'Abaya' },
    { id: '2', name: 'Premium Silk Hijab', name_ar: 'حجاب حريري فاخر', price: 89, stock: 123, category: 'Hijab' },
    { id: '3', name: 'Modest Evening Dress', name_ar: 'فستان سهرة محتشم', price: 459, stock: 23, category: 'Dresses' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: { ar: string; en: string } } = {
      completed: { ar: 'مكتمل', en: 'Completed' },
      processing: { ar: 'قيد المعالجة', en: 'Processing' },
      shipped: { ar: 'تم الشحن', en: 'Shipped' },
      pending: { ar: 'معلق', en: 'Pending' },
    };
    return statusMap[status]?.[locale] || status;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {t('admin.dashboard')}
            </h2>
            
            <nav className="space-y-2">
              {[
                { key: 'dashboard', icon: BarChart3 },
                { key: 'products', icon: Package },
                { key: 'orders', icon: ShoppingCart },
                { key: 'users', icon: Users },
                { key: 'analytics', icon: TrendingUp },
              ].map(({ key, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-lg transition-colors ${
                    activeTab === key
                      ? 'bg-rose-100 text-rose-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span>{t(`admin.${key}`)}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {locale === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
                </h1>
                <p className="text-gray-600">
                  {locale === 'ar' ? 'نظرة عامة على أداء المتجر' : 'Overview of your store performance'}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                      <div className="flex items-center">
                        <div className={`p-3 rounded-lg ${stat.bg}`}>
                          <Icon size={24} className={stat.color} />
                        </div>
                        <div className="ml-4 rtl:mr-4">
                          <h3 className="text-sm font-medium text-gray-600">
                            {stat.title}
                          </h3>
                          <div className="flex items-center">
                            <span className="text-2xl font-bold text-gray-900">
                              {stat.value}
                            </span>
                            {stat.suffix && (
                              <span className="text-sm text-gray-600 ml-1 rtl:mr-1">
                                {stat.suffix}
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-green-600">{stat.change}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {locale === 'ar' ? 'الطلبات الأخيرة' : 'Recent Orders'}
                  </h2>
                  <button className="text-rose-600 hover:text-rose-700 text-sm font-medium">
                    {locale === 'ar' ? 'عرض الكل' : 'View All'}
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left rtl:text-right py-3 text-sm font-medium text-gray-600">
                          {locale === 'ar' ? 'رقم الطلب' : 'Order ID'}
                        </th>
                        <th className="text-left rtl:text-right py-3 text-sm font-medium text-gray-600">
                          {locale === 'ar' ? 'العميل' : 'Customer'}
                        </th>
                        <th className="text-left rtl:text-right py-3 text-sm font-medium text-gray-600">
                          {locale === 'ar' ? 'المبلغ' : 'Total'}
                        </th>
                        <th className="text-left rtl:text-right py-3 text-sm font-medium text-gray-600">
                          {locale === 'ar' ? 'الحالة' : 'Status'}
                        </th>
                        <th className="text-left rtl:text-right py-3 text-sm font-medium text-gray-600">
                          {locale === 'ar' ? 'الإجراءات' : 'Actions'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-100">
                          <td className="py-4 text-sm font-medium text-gray-900">
                            {order.id}
                          </td>
                          <td className="py-4 text-sm text-gray-700">
                            {order.customer}
                          </td>
                          <td className="py-4 text-sm text-gray-700">
                            {order.total} {t('common.currency')}
                          </td>
                          <td className="py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {getStatusText(order.status)}
                            </span>
                          </td>
                          <td className="py-4">
                            <div className="flex space-x-2 rtl:space-x-reverse">
                              <button className="text-blue-600 hover:text-blue-800">
                                <Eye size={16} />
                              </button>
                              <button className="text-rose-600 hover:text-rose-800">
                                <Edit size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">
                  {t('admin.products')}
                </h1>
                <button className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors">
                  <Plus size={20} />
                  <span>{locale === 'ar' ? 'إضافة منتج' : 'Add Product'}</span>
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left rtl:text-right px-6 py-3 text-sm font-medium text-gray-600">
                          {locale === 'ar' ? 'المنتج' : 'Product'}
                        </th>
                        <th className="text-left rtl:text-right px-6 py-3 text-sm font-medium text-gray-600">
                          {locale === 'ar' ? 'الفئة' : 'Category'}
                        </th>
                        <th className="text-left rtl:text-right px-6 py-3 text-sm font-medium text-gray-600">
                          {locale === 'ar' ? 'السعر' : 'Price'}
                        </th>
                        <th className="text-left rtl:text-right px-6 py-3 text-sm font-medium text-gray-600">
                          {locale === 'ar' ? 'المخزون' : 'Stock'}
                        </th>
                        <th className="text-left rtl:text-right px-6 py-3 text-sm font-medium text-gray-600">
                          {locale === 'ar' ? 'الإجراءات' : 'Actions'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleProducts.map((product) => (
                        <tr key={product.id} className="border-b border-gray-100">
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">
                              {locale === 'ar' ? product.name_ar : product.name}
                            </div>
                            <div className="text-sm text-gray-600">ID: {product.id}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">
                            {product.category}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">
                            {product.price} {t('common.currency')}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              product.stock > 20 ? 'bg-green-100 text-green-800' :
                              product.stock > 5 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {product.stock} {locale === 'ar' ? 'قطعة' : 'items'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2 rtl:space-x-reverse">
                              <button className="text-blue-600 hover:text-blue-800">
                                <Eye size={16} />
                              </button>
                              <button className="text-rose-600 hover:text-rose-800">
                                <Edit size={16} />
                              </button>
                              <button className="text-red-600 hover:text-red-800">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">
                  {t('admin.orders')}
                </h1>
              </div>

              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left rtl:text-right px-6 py-3 text-sm font-medium text-gray-600">
                          {locale === 'ar' ? 'رقم الطلب' : 'Order ID'}
                        </th>
                        <th className="text-left rtl:text-right px-6 py-3 text-sm font-medium text-gray-600">
                          {locale === 'ar' ? 'العميل' : 'Customer'}
                        </th>
                        <th className="text-left rtl:text-right px-6 py-3 text-sm font-medium text-gray-600">
                          {locale === 'ar' ? 'المبلغ' : 'Total'}
                        </th>
                        <th className="text-left rtl:text-right px-6 py-3 text-sm font-medium text-gray-600">
                          {locale === 'ar' ? 'الحالة' : 'Status'}
                        </th>
                        <th className="text-left rtl:text-right px-6 py-3 text-sm font-medium text-gray-600">
                          {locale === 'ar' ? 'الإجراءات' : 'Actions'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-100">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">
                            {order.customer}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">
                            {order.total} {t('common.currency')}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {getStatusText(order.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2 rtl:space-x-reverse">
                              <button className="text-blue-600 hover:text-blue-800">
                                <Eye size={16} />
                              </button>
                              <button className="text-rose-600 hover:text-rose-800">
                                <Edit size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}