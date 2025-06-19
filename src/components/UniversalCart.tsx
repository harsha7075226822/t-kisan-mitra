
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Plus, Minus, Trash2, ShoppingCart, IndianRupee, Package } from 'lucide-react';
import { CartManager, CartItem } from '@/utils/cartManager';
import { useToast } from '@/hooks/use-toast';
import CheckoutFlow from './CheckoutFlow';

interface UniversalCartProps {
  isMobile?: boolean;
}

const UniversalCart: React.FC<UniversalCartProps> = ({ isMobile = false }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadCart = () => {
      setCart(CartManager.getCart());
    };

    loadCart();

    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener('universalCartUpdated', handleCartUpdate);
    return () => window.removeEventListener('universalCartUpdated', handleCartUpdate);
  }, []);

  const updateQuantity = (id: string, change: number) => {
    const item = cart.find(item => item.id === id);
    if (item) {
      CartManager.updateQuantity(id, item.quantity + change);
    }
  };

  const removeItem = (id: string) => {
    CartManager.removeFromCart(id);
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart",
    });
  };

  const handleCheckout = () => {
    setIsOpen(false);
    setShowCheckout(true);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'seeds': return '🌱';
      case 'pesticides': return '🧪';
      case 'tools': return '🔧';
      case 'fertilizers': return '🌿';
      default: return '📦';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'seeds': return 'bg-green-100 text-green-700';
      case 'pesticides': return 'bg-rose-100 text-rose-700';
      case 'tools': return 'bg-blue-100 text-blue-700';
      case 'fertilizers': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const CartTrigger = () => (
    <Button variant="outline" size="sm" className="relative" onClick={() => setIsOpen(true)}>
      <ShoppingCart className="w-4 h-4 mr-2" />
      {!isMobile && "Cart"}
      {CartManager.getTotalItems() > 0 && (
        <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full p-0 flex items-center justify-center">
          {CartManager.getTotalItems()}
        </Badge>
      )}
    </Button>
  );

  const CartContent = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Shopping Cart</h3>
        <Badge variant="secondary">{CartManager.getTotalItems()} items</Badge>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-8">
          <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Your cart is empty</p>
          <p className="text-sm text-gray-400 mt-2">Add some products to get started!</p>
        </div>
      ) : (
        <>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {cart.map((item) => (
              <Card key={item.id} className="p-3">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{getTypeIcon(item.type)}</div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-600">{item.weight} • {item.description}</p>
                        <Badge className={`text-xs mt-1 ${getTypeColor(item.type)}`}>
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </Badge>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-50"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-50"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center text-green-600 font-bold">
                        <IndianRupee className="w-4 h-4" />
                        <span>{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Subtotal:</span>
              <div className="flex items-center font-bold text-lg">
                <IndianRupee className="w-4 h-4" />
                <span>{CartManager.getTotalPrice().toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Delivery charges:</span>
              <span className="text-green-600">Free delivery</span>
            </div>
            
            <div className="border-t pt-2 flex justify-between items-center">
              <span className="font-bold">Total:</span>
              <div className="flex items-center font-bold text-xl text-green-600">
                <IndianRupee className="w-5 h-5" />
                <span>{CartManager.getTotalPrice().toLocaleString()}</span>
              </div>
            </div>
            
            <Button 
              onClick={handleCheckout}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              size="lg"
            >
              <Package className="w-4 h-4 mr-2" />
              📝 Place Order
            </Button>
          </div>
        </>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <CartTrigger />
          </SheetTrigger>
          <SheetContent className="w-full sm:w-96">
            <SheetHeader>
              <SheetTitle>Shopping Cart</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <CartContent />
            </div>
          </SheetContent>
        </Sheet>

        <CheckoutFlow
          isOpen={showCheckout}
          onClose={() => setShowCheckout(false)}
          cart={cart}
        />
      </>
    );
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Shopping Cart</DialogTitle>
          </DialogHeader>
          <CartContent />
        </DialogContent>
      </Dialog>

      <CartTrigger />

      <CheckoutFlow
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        cart={cart}
      />
    </>
  );
};

export default UniversalCart;
