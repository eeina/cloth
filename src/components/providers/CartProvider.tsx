'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db } from '@/lib/db';
import { useAuth } from './AuthProvider';

interface CartItem {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => Promise<void>;
  removeItem: (id: string, size: string, color: string) => Promise<void>;
  updateQuantity: (id: string, size: string, color: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotal: () => number;
  getItemCount: () => number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Load cart items from database when user changes
  useEffect(() => {
    const loadCartItems = async () => {
      if (!user) {
        setItems([]);
        setLoading(false);
        return;
      }

      try {
        const cartItems = await db.cartItem.findMany({
          where: { userId: user.id },
          include: {
            product: true
          }
        });

        const transformedItems = cartItems.map(item => ({
          id: item.product.id,
          name: item.product.name,
          nameAr: item.product.nameAr,
          price: item.product.price,
          image: item.product.image || '',
          size: item.size,
          color: item.color,
          quantity: item.quantity
        }));

        setItems(transformedItems);
      } catch (error) {
        console.error('Error loading cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCartItems();
  }, [user]);

  const addItem = async (newItem: Omit<CartItem, 'quantity'>) => {
    if (!user) return;

    try {
      // Check if item already exists in cart
      const existingCartItem = await db.cartItem.findUnique({
        where: {
          userId_productId_size_color: {
            userId: user.id,
            productId: newItem.id,
            size: newItem.size,
            color: newItem.color
          }
        }
      });

      if (existingCartItem) {
        // Update quantity if item exists
        await db.cartItem.update({
          where: { id: existingCartItem.id },
          data: { quantity: existingCartItem.quantity + 1 }
        });
      } else {
        // Create new cart item
        await db.cartItem.create({
          data: {
            userId: user.id,
            productId: newItem.id,
            size: newItem.size,
            color: newItem.color,
            quantity: 1
          }
        });
      }

      // Refresh cart items
      const cartItems = await db.cartItem.findMany({
        where: { userId: user.id },
        include: {
          product: true
        }
      });

      const transformedItems = cartItems.map(item => ({
        id: item.product.id,
        name: item.product.name,
        nameAr: item.product.nameAr,
        price: item.product.price,
        image: item.product.image || '',
        size: item.size,
        color: item.color,
        quantity: item.quantity
      }));

      setItems(transformedItems);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const removeItem = async (id: string, size: string, color: string) => {
    if (!user) return;

    try {
      await db.cartItem.deleteMany({
        where: {
          userId: user.id,
          productId: id,
          size,
          color
        }
      });

      setItems(currentItems =>
        currentItems.filter(
          item => !(item.id === id && item.size === size && item.color === color)
        )
      );
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const updateQuantity = async (id: string, size: string, color: string, quantity: number) => {
    if (!user) return;

    if (quantity <= 0) {
      await removeItem(id, size, color);
      return;
    }

    try {
      await db.cartItem.updateMany({
        where: {
          userId: user.id,
          productId: id,
          size,
          color
        },
        data: { quantity }
      });

      setItems(currentItems =>
        currentItems.map(item =>
          item.id === id && item.size === size && item.color === color
            ? { ...item, quantity }
            : item
        )
      );
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      await db.cartItem.deleteMany({
        where: { userId: user.id }
      });
      setItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const getTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
    loading,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}