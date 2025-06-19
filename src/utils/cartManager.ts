
export interface CartItem {
  id: string;
  type: 'seeds' | 'pesticides' | 'tools' | 'fertilizers';
  name: string;
  weight: string | number;
  price: number;
  quantity: number;
  image: string;
  description: string;
  category?: string;
  brand?: string;
}

export class CartManager {
  private static CART_KEY = 'universalFarmCart';

  static getCart(): CartItem[] {
    try {
      const cart = localStorage.getItem(this.CART_KEY);
      const cartItems = cart ? JSON.parse(cart) : [];
      console.log('CartManager.getCart() - Retrieved cart:', cartItems);
      return cartItems;
    } catch (error) {
      console.error('Error loading cart:', error);
      return [];
    }
  }

  static addToCart(item: Omit<CartItem, 'quantity'> & { quantity?: number }): void {
    const cart = this.getCart();
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
    
    console.log('CartManager.addToCart() - Adding item:', item);
    console.log('CartManager.addToCart() - Existing item index:', existingItemIndex);
    
    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += item.quantity || 1;
      console.log('CartManager.addToCart() - Updated existing item quantity:', cart[existingItemIndex].quantity);
    } else {
      const newItem = { ...item, quantity: item.quantity || 1 };
      cart.push(newItem);
      console.log('CartManager.addToCart() - Added new item:', newItem);
    }
    
    this.saveCart(cart);
    this.notifyCartUpdate();
  }

  static updateQuantity(id: string, quantity: number): void {
    const cart = this.getCart();
    const itemIndex = cart.findIndex(item => item.id === id);
    
    console.log('CartManager.updateQuantity() - Updating item:', id, 'to quantity:', quantity);
    
    if (itemIndex >= 0) {
      if (quantity <= 0) {
        cart.splice(itemIndex, 1);
        console.log('CartManager.updateQuantity() - Removed item:', id);
      } else {
        cart[itemIndex].quantity = quantity;
        console.log('CartManager.updateQuantity() - Updated item quantity:', cart[itemIndex]);
      }
      this.saveCart(cart);
      this.notifyCartUpdate();
    }
  }

  static removeFromCart(id: string): void {
    const cart = this.getCart().filter(item => item.id !== id);
    console.log('CartManager.removeFromCart() - Removed item:', id);
    console.log('CartManager.removeFromCart() - New cart:', cart);
    this.saveCart(cart);
    this.notifyCartUpdate();
  }

  static clearCart(): void {
    console.log('CartManager.clearCart() - Clearing cart');
    localStorage.removeItem(this.CART_KEY);
    this.notifyCartUpdate();
  }

  static getTotalItems(): number {
    const total = this.getCart().reduce((total, item) => total + item.quantity, 0);
    console.log('CartManager.getTotalItems() - Total items:', total);
    return total;
  }

  static getTotalPrice(): number {
    const total = this.getCart().reduce((total, item) => total + (item.price * item.quantity), 0);
    console.log('CartManager.getTotalPrice() - Total price:', total);
    return total;
  }

  private static saveCart(cart: CartItem[]): void {
    console.log('CartManager.saveCart() - Saving cart:', cart);
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
  }

  private static notifyCartUpdate(): void {
    console.log('CartManager.notifyCartUpdate() - Notifying cart update');
    window.dispatchEvent(new CustomEvent('universalCartUpdated'));
  }
}
