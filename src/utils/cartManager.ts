
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
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error('Error loading cart:', error);
      return [];
    }
  }

  static addToCart(item: Omit<CartItem, 'quantity'> & { quantity?: number }): void {
    const cart = this.getCart();
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += item.quantity || 1;
    } else {
      cart.push({ ...item, quantity: item.quantity || 1 });
    }
    
    this.saveCart(cart);
    this.notifyCartUpdate();
  }

  static updateQuantity(id: string, quantity: number): void {
    const cart = this.getCart();
    const itemIndex = cart.findIndex(item => item.id === id);
    
    if (itemIndex >= 0) {
      if (quantity <= 0) {
        cart.splice(itemIndex, 1);
      } else {
        cart[itemIndex].quantity = quantity;
      }
      this.saveCart(cart);
      this.notifyCartUpdate();
    }
  }

  static removeFromCart(id: string): void {
    const cart = this.getCart().filter(item => item.id !== id);
    this.saveCart(cart);
    this.notifyCartUpdate();
  }

  static clearCart(): void {
    localStorage.removeItem(this.CART_KEY);
    this.notifyCartUpdate();
  }

  static getTotalItems(): number {
    return this.getCart().reduce((total, item) => total + item.quantity, 0);
  }

  static getTotalPrice(): number {
    return this.getCart().reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  private static saveCart(cart: CartItem[]): void {
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
  }

  private static notifyCartUpdate(): void {
    window.dispatchEvent(new CustomEvent('universalCartUpdated'));
  }
}
