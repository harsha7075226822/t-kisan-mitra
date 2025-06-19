
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { ShoppingCart, Plus, Minus, Package, Check, CreditCard, Smartphone, Banknote, ArrowLeft } from 'lucide-react';

interface Seed {
  id: string;
  name: string;
  weight: number;
  price: number;
  description: string;
  image: string;
}

interface CartItem {
  id: string;
  type: string;
  name: string;
  weight: string | number;
  price: number;
  quantity: number;
  image: string;
  description: string;
}

interface DeliveryForm {
  name: string;
  village: string;
  mandal: string;
  district: string;
  pincode: string;
  phone: string;
}

const Seeds = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderStep, setOrderStep] = useState<'cart' | 'aadhaar' | 'otp' | 'address' | 'payment' | 'success'>('cart');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const { toast } = useToast();

  const form = useForm<DeliveryForm>({
    defaultValues: {
      name: '',
      village: '',
      mandal: '',
      district: '',
      pincode: '',
      phone: ''
    }
  });

  // Load cart from localStorage on component mount
  useEffect(() => {
    const loadCart = () => {
      const savedCart = JSON.parse(localStorage.getItem('farmCart') || '[]');
      setCart(savedCart);
    };

    loadCart();

    // Listen for cart updates from other components
    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

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

  const addToCart = (seed: Seed, quantity: number) => {
    if (quantity <= 0) return;
    
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('farmCart') || '[]');
    
    // Add new item to cart
    const cartItem: CartItem = {
      id: `seed_${seed.id}`,
      type: 'seed',
      name: seed.name,
      weight: `${seed.weight} kg`,
      price: seed.price,
      quantity: quantity,
      image: seed.image,
      description: seed.description
    };
    
    // Check if item already exists
    const existingItemIndex = existingCart.findIndex((item: CartItem) => item.id === cartItem.id);
    
    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }
    
    // Save to localStorage
    localStorage.setItem('farmCart', JSON.stringify(existingCart));
    setCart(existingCart);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    
    toast({
      title: "Added to Cart",
      description: `${quantity} bag(s) of ${seed.name} added successfully`,
    });
  };

  const updateQuantity = (id: string, change: number) => {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[];
    
    setCart(updatedCart);
    localStorage.setItem('farmCart', JSON.stringify(updatedCart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart Empty",
        description: "Please add items to cart before placing order",
      });
      return;
    }
    setOrderStep('aadhaar');
  };

  const handleAadhaarSubmit = () => {
    if (aadhaarNumber.length !== 12) {
      toast({
        title: "Invalid Aadhaar",
        description: "Please enter a valid 12-digit Aadhaar number",
      });
      return;
    }
    setOrderStep('otp');
    toast({
      title: "OTP Sent",
      description: "Verification code sent to your registered mobile",
    });
  };

  const handleOtpVerify = () => {
    if (otpValue.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit verification code",
      });
      return;
    }
    setOrderStep('address');
    toast({
      title: "Aadhaar Verified",
      description: "Identity verification successful",
    });
  };

  const handleAddressSubmit = (data: DeliveryForm) => {
    setOrderStep('payment');
  };

  const handlePaymentConfirm = () => {
    if (!selectedPayment) {
      toast({
        title: "Select Payment Method",
        description: "Please choose a payment option to continue",
      });
      return;
    }
    
    setOrderStep('success');
    toast({
      title: "Order Placed Successfully!",
      description: `Order for ${getTotalItems()} items worth ₹${getTotalPrice()} confirmed`,
    });
    
    // Reset after success
    setTimeout(() => {
      setCart([]);
      localStorage.setItem('farmCart', JSON.stringify([]));
      setOrderStep('cart');
      setIsCartOpen(false);
      setAadhaarNumber('');
      setOtpValue('');
      setSelectedPayment('');
      form.reset();
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    }, 3000);
  };

  const SeedCard = ({ seed }: { seed: Seed }) => {
    const [quantity, setQuantity] = useState(1);

    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="text-center">
          <div className="text-4xl mb-2">{seed.image}</div>
          <CardTitle className="text-lg">{seed.name}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-gray-600 mb-4">{seed.description}</p>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Weight per bag:</span>
              <span className="font-medium">{seed.weight} kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Price per bag:</span>
              <span className="font-bold text-green-600">₹{seed.price}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            >
              <Minus className="w-3 h-3" />
            </Button>
            <span className="font-medium">{quantity} bags</span>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          
          <div className="mb-4 p-2 bg-gray-50 rounded">
            <span className="text-sm text-gray-600">Total: </span>
            <span className="font-bold text-green-600">₹{seed.price * quantity}</span>
          </div>
          
          <Button 
            onClick={() => addToCart(seed, quantity)}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Package className="w-8 h-8 mr-3 text-green-600" />
              Seeds Services
            </h1>
            <p className="text-gray-600 mt-2">Purchase certified seeds with full details</p>
          </div>
          
          {/* Cart Icon */}
          <div className="relative">
            <Button 
              onClick={() => setIsCartOpen(true)}
              className="bg-green-600 hover:bg-green-700"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              View Cart
              {getTotalItems() > 0 && (
                <Badge className="ml-2 bg-red-500 text-white">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Seeds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seedsData.map((seed) => (
            <SeedCard key={seed.id} seed={seed} />
          ))}
        </div>

        {/* Order Flow Dialog */}
        <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {orderStep === 'cart' && 'Shopping Cart'}
                {orderStep === 'aadhaar' && 'Aadhaar Verification'}
                {orderStep === 'otp' && 'OTP Verification'}
                {orderStep === 'address' && 'Delivery Address'}
                {orderStep === 'payment' && 'Payment Method'}
                {orderStep === 'success' && 'Order Confirmed'}
              </DialogTitle>
            </DialogHeader>

            {/* Cart Step */}
            {orderStep === 'cart' && (
              <div className="space-y-4">
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Your cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div key={item.id} className="border-b pb-3">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <span className="text-2xl mr-2">{item.image}</span>
                              <div>
                                <h3 className="font-medium">{item.name}</h3>
                                <p className="text-sm text-gray-600">{item.weight} • {item.type}</p>
                              </div>
                            </div>
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
                              <span className="font-medium">{item.quantity} units</span>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            <span className="text-sm text-gray-600">₹{item.price} per unit</span>
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
                        onClick={handlePlaceOrder}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        Place Order
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Aadhaar Step */}
            {orderStep === 'aadhaar' && (
              <div className="space-y-4">
                <p className="text-gray-600">Please enter your Aadhaar number for verification</p>
                <Input
                  placeholder="Enter 12-digit Aadhaar number"
                  value={aadhaarNumber}
                  onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                  maxLength={12}
                />
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setOrderStep('cart')}>
                    Back
                  </Button>
                  <Button onClick={handleAadhaarSubmit} className="flex-1">
                    Send OTP
                  </Button>
                </div>
              </div>
            )}

            {/* OTP Step */}
            {orderStep === 'otp' && (
              <div className="space-y-4 text-center">
                <p className="text-gray-600">Enter the 6-digit OTP sent to your registered mobile</p>
                <div className="flex justify-center">
                  <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setOrderStep('aadhaar')}>
                    Back
                  </Button>
                  <Button onClick={handleOtpVerify} className="flex-1">
                    Verify OTP
                  </Button>
                </div>
              </div>
            )}

            {/* Address Step */}
            {orderStep === 'address' && (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAddressSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="village"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Village</FormLabel>
                          <FormControl>
                            <Input placeholder="Village name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="mandal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mandal</FormLabel>
                          <FormControl>
                            <Input placeholder="Mandal name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="district"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>District</FormLabel>
                          <FormControl>
                            <Input placeholder="District name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="pincode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>PIN Code</FormLabel>
                          <FormControl>
                            <Input placeholder="6-digit PIN code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="10-digit mobile number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex space-x-2">
                    <Button type="button" variant="outline" onClick={() => setOrderStep('otp')}>
                      Back
                    </Button>
                    <Button type="submit" className="flex-1">
                      Continue to Payment
                    </Button>
                  </div>
                </form>
              </Form>
            )}

            {/* Payment Step */}
            {orderStep === 'payment' && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Order Summary</h3>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Total Items:</span>
                      <span>{getTotalItems()} items</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total Amount:</span>
                      <span>₹{getTotalPrice()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium">Select Payment Method</h3>
                  
                  <div className="space-y-2">
                    <Button
                      variant={selectedPayment === 'upi' ? 'default' : 'outline'}
                      className="w-full justify-start"
                      onClick={() => setSelectedPayment('upi')}
                    >
                      <Smartphone className="w-4 h-4 mr-2" />
                      UPI (PhonePe, GPay, Paytm)
                    </Button>
                    
                    <Button
                      variant={selectedPayment === 'cod' ? 'default' : 'outline'}
                      className="w-full justify-start"
                      onClick={() => setSelectedPayment('cod')}
                    >
                      <Banknote className="w-4 h-4 mr-2" />
                      Cash on Delivery (COD)
                    </Button>
                    
                    <Button
                      variant={selectedPayment === 'card' ? 'default' : 'outline'}
                      className="w-full justify-start"
                      onClick={() => setSelectedPayment('card')}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Card Payment
                    </Button>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setOrderStep('address')}>
                    Back
                  </Button>
                  <Button onClick={handlePaymentConfirm} className="flex-1">
                    Confirm Order
                  </Button>
                </div>
              </div>
            )}

            {/* Success Step */}
            {orderStep === 'success' && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-green-600">Order Confirmed!</h3>
                <p className="text-gray-600">
                  Your order for {getTotalItems()} items worth ₹{getTotalPrice()} has been placed successfully.
                </p>
                <p className="text-sm text-gray-500">
                  You will receive delivery updates on your registered mobile number.
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Seeds;
