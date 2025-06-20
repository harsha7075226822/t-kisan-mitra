
import { useState, useEffect, useCallback } from 'react';
import { cartManager } from '@/utils/cartManager';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'seeds' | 'crop' | 'product';
  image?: string;
}

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Memoized functions to prevent unnecessary re-renders
  const updateCartState = useCallback(() => {
    try {
      const currentCart = cartManager.getCart();
      const items = cartManager.getTotalItems();
      const price = cartManager.getTotalPrice();
      
      setCart(currentCart);
      setTotalItems(items);
      setTotalPrice(price);
    } catch (error) {
      console.error('Error updating cart state:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addItem = useCallback((item: CartItem) => {
    try {
      cartManager.addItem(item);
      updateCartState();
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  }, [updateCartState]);

  const removeItem = useCallback((itemId: string) => {
    try {
      cartManager.removeItem(itemId);
      updateCartState();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  }, [updateCartState]);

  const clearCart = useCallback(() => {
    try {
      cartManager.clearCart();
      updateCartState();
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  }, [updateCartState]);

  // Initialize cart on mount
  useEffect(() => {
    updateCartState();
  }, [updateCartState]);

  return {
    cart,
    isLoading,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    clearCart,
    refreshCart: updateCartState
  };
};
