'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { db } from '@/lib/db';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Plus, Minus } from 'lucide-react';

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product?: any; // For editing existing products
}

interface Category {
  id: string;
  name: string;
  nameAr: string;
}

export function ProductForm({ isOpen, onClose, onSuccess, product }: ProductFormProps) {
  const t = useTranslations();
  const locale = useLocale();
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    nameAr: '',
    description: '',
    descriptionAr: '',
    price: '',
    image: '',
    categoryId: '',
    sizes: [''],
    colors: [''],
    inStock: true,
    featured: false
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        nameAr: product.name_ar || '',
        description: product.description || '',
        descriptionAr: product.descriptionAr || '',
        price: product.price?.toString() || '',
        image: product.image || '',
        categoryId: product.categoryId || '',
        sizes: product.sizes || [''],
        colors: product.colors || [''],
        inStock: product.inStock !== false,
        featured: product.featured || false
      });
    }
  }, [product]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await db.category.findMany({
          orderBy: { name: 'asc' }
        });
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        sizes: formData.sizes.filter(size => size.trim() !== ''),
        colors: formData.colors.filter(color => color.trim() !== '')
      };

      const url = product 
        ? `/api/admin/products/${product.id}`
        : '/api/admin/products';
      
      const method = product ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        onSuccess();
        onClose();
        // Reset form
        setFormData({
          name: '',
          nameAr: '',
          description: '',
          descriptionAr: '',
          price: '',
          image: '',
          categoryId: '',
          sizes: [''],
          colors: [''],
          inStock: true,
          featured: false
        });
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const addSize = () => {
    setFormData(prev => ({
      ...prev,
      sizes: [...prev.sizes, '']
    }));
  };

  const removeSize = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index)
    }));
  };

  const updateSize = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.map((size, i) => i === index ? value : size)
    }));
  };

  const addColor = () => {
    setFormData(prev => ({
      ...prev,
      colors: [...prev.colors, '']
    }));
  };

  const removeColor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index)
    }));
  };

  const updateColor = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.map((color, i) => i === index ? value : color)
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product 
              ? (locale === 'ar' ? 'تحرير المنتج' : 'Edit Product')
              : (locale === 'ar' ? 'إضافة منتج جديد' : 'Add New Product')
            }
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                {locale === 'ar' ? 'اسم المنتج (إنجليزي)' : 'Product Name (English)'} *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nameAr">
                {locale === 'ar' ? 'اسم المنتج (عربي)' : 'Product Name (Arabic)'} *
              </Label>
              <Input
                id="nameAr"
                value={formData.nameAr}
                onChange={(e) => setFormData(prev => ({ ...prev, nameAr: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">
                {locale === 'ar' ? 'السعر' : 'Price'} *
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoryId">
                {locale === 'ar' ? 'الفئة' : 'Category'} *
              </Label>
              <Select value={formData.categoryId} onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder={locale === 'ar' ? 'اختر الفئة' : 'Select category'} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {locale === 'ar' ? category.nameAr : category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">
                {locale === 'ar' ? 'رابط الصورة' : 'Image URL'}
              </Label>
              <Input
                id="image"
                type="url"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inStock"
                  checked={formData.inStock}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, inStock: !!checked }))}
                />
                <Label htmlFor="inStock">
                  {locale === 'ar' ? 'متوفر في المخزون' : 'In Stock'}
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: !!checked }))}
                />
                <Label htmlFor="featured">
                  {locale === 'ar' ? 'منتج مميز' : 'Featured'}
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              {locale === 'ar' ? 'الوصف (إنجليزي)' : 'Description (English)'}
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descriptionAr">
              {locale === 'ar' ? 'الوصف (عربي)' : 'Description (Arabic)'}
            </Label>
            <Textarea
              id="descriptionAr"
              value={formData.descriptionAr}
              onChange={(e) => setFormData(prev => ({ ...prev, descriptionAr: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>
              {locale === 'ar' ? 'المقاسات' : 'Sizes'}
            </Label>
            <div className="space-y-2">
              {formData.sizes.map((size, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={size}
                    onChange={(e) => updateSize(index, e.target.value)}
                    placeholder={locale === 'ar' ? 'المقاس' : 'Size'}
                  />
                  {formData.sizes.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeSize(index)}
                    >
                      <Minus size={16} />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addSize}
                className="w-full"
              >
                <Plus size={16} className="mr-2" />
                {locale === 'ar' ? 'إضافة مقاس' : 'Add Size'}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>
              {locale === 'ar' ? 'الألوان' : 'Colors'}
            </Label>
            <div className="space-y-2">
              {formData.colors.map((color, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={color}
                    onChange={(e) => updateColor(index, e.target.value)}
                    placeholder={locale === 'ar' ? 'اللون' : 'Color'}
                  />
                  {formData.colors.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeColor(index)}
                    >
                      <Minus size={16} />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addColor}
                className="w-full"
              >
                <Plus size={16} className="mr-2" />
                {locale === 'ar' ? 'إضافة لون' : 'Add Color'}
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {locale === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading 
                ? (locale === 'ar' ? 'جاري الحفظ...' : 'Saving...')
                : (locale === 'ar' ? 'حفظ' : 'Save')
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}