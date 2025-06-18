
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Plus, Minus, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Seed {
  id: string;
  name: string;
  weight: number;
  price: number;
  description: string;
  image: string;
}

interface CartItem extends Seed {
  quantity: number;
}

const Seeds = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  const seedsData: Seed[] = [
    {
      id: '1',
      name: 'Paddy Seeds 1010',
      weight: 5,
      price: 450,
      description: 'High-yield paddy variety suitable for Telangana climate',
      image: '🌾'
    },
    {
      id: '2',
      name: 'Cotton Seeds RCH659',
      weight: 2,
      price: 700,
      description: 'Premium cotton seeds with excellent fiber quality',
      image: '🌸'
    },
    {
      id: '3',
      name: 'Bajra Hybrid Pearl Millet',
      weight: 3,
      price: 360,
      description: 'Drought-resistant millet variety',
      image: '🌾'
    },
    {
      id: '4',
      name: 'Red Gram (Toor Dal) Seeds',
      weight: 1,
      price: 120,
      description: 'High protein pulse variety',
      image: '🫘'
    },
    {
      id: '5',
      name: 'Groundnut Seeds TMV7',
      weight: 4,
      price: 520,
      description: 'Disease-resistant groundnut variety',
      image: '🥜'
    },
    {
      id: '6',
      name: 'Maize Hybrid Seeds',
      weight: 2,
      price: 380,
      description: 'High-yield corn variety for all seasons',
      image: '🌽'
    }
  ];

  const addToCart = (seed: Seed) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === seed.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === seed.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...seed, quantity: 1 }];
      }
    });
    
    toast({
      title: "Added to Cart",
      description: `${seed.name} added successfully`,
    });
  };

  const updateQuantity = (id: string, change: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const placeOrder = () => {
    toast({
      title: "Order Placed",
      description: `Order for ${getTotalItems()} items worth ₹${getTotalPrice()} placed successfully!`,
    });
    setCart([]);
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Package className="w-8 h-8 mr-3 text-green-600" />
              Seeds Container
            </h1>
            <p className="text-gray-600 mt-2">Quality seeds for better harvest</p>
          </div>
          
          {/* Cart Icon */}
          <div className="relative">
            <Button 
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="bg-green-600 hover:bg-green-700"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Cart
              {getTotalItems() > 0 && (
                <Badge className="ml-2 bg-red-500 text-white">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Seeds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {seedsData.map((seed) => (
            <Card key={seed.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="text-4xl mb-2">{seed.image}</div>
                <CardTitle className="text-lg">{seed.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-600 mb-4">{seed.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Weight:</span>
                    <span className="font-medium">{seed.weight} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Price:</span>
                    <span className="font-bold text-green-600">₹{seed.price}</span>
                  </div>
                </div>
                <Button 
                  onClick={() => addToCart(seed)}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cart Sidebar */}
        {isCartOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsCartOpen(false)}>
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Shopping Cart</h2>
                  <Button variant="ghost" onClick={() => setIsCartOpen(false)}>×</Button>
                </div>

                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center">Your cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cart.map((item) => (
                        <div key={item.id} className="border-b pb-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium text-sm">{item.name}</h3>
                            <span className="font-bold">₹{item.price * item.quantity}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="font-medium">{item.quantity}</span>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            <span className="text-sm text-gray-600">₹{item.price} each</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-bold text-lg">Total:</span>
                        <span className="font-bold text-lg text-green-600">₹{getTotalPrice()}</span>
                      </div>
                      <Button 
                        onClick={placeOrder}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        Place Order
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Seeds;
