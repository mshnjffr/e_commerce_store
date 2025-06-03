import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, CartState, Laptop, Product, OrderCreate } from '../types/api';
import apiService from '../services/api';
import { useAuth } from './AuthContext';

interface CartContextType extends CartState {
  addToCart: (product: Product, type: 'laptop' | 'mice', quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  checkout: () => Promise<{ success: boolean; orderId?: number; error?: string }>;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  // Calculate totals
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        setItems(cartData);
      } catch (error) {
        console.error('Failed to parse cart data:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, type: 'laptop' | 'mice', quantity: number = 1) => {
    const itemId = `${type}-${product.id}`;
    
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === itemId);
      
      if (existingItem) {
        // Update quantity of existing item
        return prevItems.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        return [...prevItems, { id: itemId, type, product, quantity }];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const checkout = async (): Promise<{ success: boolean; orderId?: number; error?: string }> => {
    if (!isAuthenticated) {
      return { success: false, error: 'Please login to checkout' };
    }

    if (items.length === 0) {
      return { success: false, error: 'Cart is empty' };
    }

    // Backend now supports both laptops and mice!

    setIsLoading(true);
    try {
      const orderData: OrderCreate = {
        items: items.map(item => ({
          laptop_id: item.type === 'laptop' ? item.product.id : undefined,
          mice_id: item.type === 'mice' ? item.product.id : undefined,
          quantity: item.quantity
        }))
      };

      const order = await apiService.createOrder(orderData);
      clearCart(); // Clear cart after successful order
      
      return { success: true, orderId: order.id };
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || 'Checkout failed';
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalAmount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        checkout,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
