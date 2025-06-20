
import { useState, useEffect, useCallback } from 'react';
import { CartManager, CartItem } from '@/utils/cartManager';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Memoized functions to prevent unnecessary re-renders
  const updateCartState = useCallback(() => {
    try {
      const currentCart = CartManager.getCart();
      const items = CartManager.getTotalItems();
      const price = CartManager.getTotalPrice();
      
      setCart(currentCart);
      setTotalItems(items);
      setTotalPrice(price);
    } catch (error) {
      console.error('Error updating cart state:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addItem = useCallback((item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    try {
      CartManager.addToCart(item);
      updateCartState();
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  }, [updateCartState]);

  const removeItem = useCallback((itemId: string) => {
    try {
      CartManager.removeFromCart(itemId);
      updateCartState();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  }, [updateCartState]);

  const clearCart = useCallback(() => {
    try {
      CartManager.clearCart();
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
