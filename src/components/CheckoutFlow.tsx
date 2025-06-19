
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { CartManager, CartItem } from '@/utils/cartManager';
import { 
  MapPin, 
  Phone, 
  User, 
  CreditCard, 
  Wallet, 
  Truck, 
  CheckCircle,
  ArrowRight,
  Package,
  IndianRupee,
  Clock
} from 'lucide-react';

interface Address {
  id: string;
  name: string;
  phone: string;
  village: string;
  mandal: string;
  district: string;
  pincode: string;
  landmark?: string;
  isDefault: boolean;
}

interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  address: Address;
  paymentMethod: 'upi' | 'cod' | 'wallet';
  status: 'confirmed' | 'packed' | 'shipped' | 'delivered';
  orderDate: string;
  estimatedDelivery: string;
}

interface CheckoutFlowProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
}

const CheckoutFlow: React.FC<CheckoutFlowProps> = ({ isOpen, onClose, cart }) => {
  const [step, setStep] = useState<'cart' | 'address' | 'payment' | 'confirmation'>('cart');
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    village: '',
    mandal: '',
    district: '',
    pincode: '',
    landmark: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'wallet'>('cod');
  const [order, setOrder] = useState<Order | null>(null);
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load saved addresses from localStorage
    const addresses = localStorage.getItem('savedAddresses');
    if (addresses) {
      setSavedAddresses(JSON.parse(addresses));
    }
  }, []);

  const saveAddress = (address: Omit<Address, 'id'>) => {
    const newId = Date.now().toString();
    const addressWithId = { ...address, id: newId };
    const updatedAddresses = [...savedAddresses, addressWithId];
    setSavedAddresses(updatedAddresses);
    localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
    return addressWithId;
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    setStep('address');
  };

  const handleAddressNext = () => {
    if (!selectedAddress && !newAddress.name) {
      toast({
        title: "Address Required",
        description: "Please select or add a delivery address",
        variant: "destructive",
      });
      return;
    }

    if (!selectedAddress) {
      const savedAddr = saveAddress({
        ...newAddress,
        isDefault: savedAddresses.length === 0
      });
      setSelectedAddress(savedAddr);
    }

    setStep('payment');
  };

  const handlePaymentNext = () => {
    const newOrder: Order = {
      id: `ORD${Date.now()}`,
      items: [...cart],
      totalAmount: CartManager.getTotalPrice(),
      address: selectedAddress!,
      paymentMethod,
      status: 'confirmed',
      orderDate: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
    };

    // Save order to localStorage
    const existingOrders = localStorage.getItem('myOrders');
    const orders = existingOrders ? JSON.parse(existingOrders) : [];
    orders.unshift(newOrder);
    localStorage.setItem('myOrders', JSON.stringify(orders));

    setOrder(newOrder);
    CartManager.clearCart();
    setStep('confirmation');

    toast({
      title: "🎉 Order Placed Successfully!",
      description: `Order ${newOrder.id} has been confirmed`,
    });
  };

  const handleClose = () => {
    setStep('cart');
    setSelectedAddress(null);
    setNewAddress({ name: '', phone: '', village: '', mandal: '', district: '', pincode: '', landmark: '' });
    setPaymentMethod('cod');
    setOrder(null);
    onClose();
  };

  const totalAmount = CartManager.getTotalPrice();

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {step === 'cart' && <><Package className="w-5 h-5" /> Review Cart</>}
            {step === 'address' && <><MapPin className="w-5 h-5" /> Delivery Address</>}
            {step === 'payment' && <><CreditCard className="w-5 h-5" /> Payment Method</>}
            {step === 'confirmation' && <><CheckCircle className="w-5 h-5 text-green-600" /> Order Confirmed</>}
          </DialogTitle>
        </DialogHeader>

        {/* Step Indicator */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          {['cart', 'address', 'payment', 'confirmation'].map((stepName, index) => (
            <div key={stepName} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === stepName ? 'bg-green-600 text-white' : 
                ['cart', 'address', 'payment', 'confirmation'].indexOf(step) > index ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'
              }`}>
                {index + 1}
              </div>
              {index < 3 && <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />}
            </div>
          ))}
        </div>

        {/* Cart Review Step */}
        {step === 'cart' && (
          <div className="space-y-4">
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {cart.map((item) => (
                <Card key={item.id} className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{item.image}</span>
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.weight} • Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-green-600 font-bold">
                      <IndianRupee className="w-4 h-4" />
                      <span>{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg">Total Amount:</span>
                <div className="flex items-center font-bold text-xl text-green-600">
                  <IndianRupee className="w-5 h-5" />
                  <span>{totalAmount.toLocaleString()}</span>
                </div>
              </div>
              <Button onClick={handlePlaceOrder} className="w-full bg-green-600 hover:bg-green-700" size="lg">
                📝 Place Order
              </Button>
            </div>
          </div>
        )}

        {/* Address Step */}
        {step === 'address' && (
          <div className="space-y-4">
            {savedAddresses.length > 0 && (
              <div>
                <h3 className="font-medium mb-3">Saved Addresses</h3>
                <div className="space-y-2">
                  {savedAddresses.map((address) => (
                    <Card key={address.id} className={`p-3 cursor-pointer border-2 ${
                      selectedAddress?.id === address.id ? 'border-green-500 bg-green-50' : 'border-gray-200'
                    }`} onClick={() => setSelectedAddress(address)}>
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{address.name}</h4>
                          <p className="text-sm text-gray-600">{address.phone}</p>
                          <p className="text-sm text-gray-600">
                            {address.village}, {address.mandal}, {address.district} - {address.pincode}
                          </p>
                          {address.landmark && <p className="text-sm text-gray-500">Near: {address.landmark}</p>}
                        </div>
                        {address.isDefault && <Badge>Default</Badge>}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="font-medium mb-3">Add New Address</h3>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="Full Name"
                  value={newAddress.name}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, name: e.target.value }))}
                />
                <Input
                  placeholder="Phone Number"
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, phone: e.target.value }))}
                />
                <Input
                  placeholder="Village"
                  value={newAddress.village}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, village: e.target.value }))}
                />
                <Input
                  placeholder="Mandal"
                  value={newAddress.mandal}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, mandal: e.target.value }))}
                />
                <Input
                  placeholder="District"
                  value={newAddress.district}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, district: e.target.value }))}
                />
                <Input
                  placeholder="PIN Code"
                  value={newAddress.pincode}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, pincode: e.target.value }))}
                />
              </div>
              <Input
                placeholder="Landmark (Optional)"
                className="mt-3"
                value={newAddress.landmark}
                onChange={(e) => setNewAddress(prev => ({ ...prev, landmark: e.target.value }))}
              />
            </div>

            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setStep('cart')} className="flex-1">
                Back to Cart
              </Button>
              <Button onClick={handleAddressNext} className="flex-1 bg-green-600 hover:bg-green-700">
                Continue to Payment
              </Button>
            </div>
          </div>
        )}

        {/* Payment Step */}
        {step === 'payment' && (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium mb-2">Delivery Address</h3>
              <p className="text-sm text-gray-600">
                {selectedAddress?.name} • {selectedAddress?.phone}<br />
                {selectedAddress?.village}, {selectedAddress?.mandal}, {selectedAddress?.district} - {selectedAddress?.pincode}
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-3">Select Payment Method</h3>
              <div className="space-y-3">
                <Card className={`p-3 cursor-pointer border-2 ${
                  paymentMethod === 'cod' ? 'border-green-500 bg-green-50' : 'border-gray-200'
                }`} onClick={() => setPaymentMethod('cod')}>
                  <div className="flex items-center space-x-3">
                    <Truck className="w-5 h-5 text-green-600" />
                    <div>
                      <h4 className="font-medium">Cash on Delivery</h4>
                      <p className="text-sm text-gray-600">Pay when your order arrives</p>
                    </div>
                  </div>
                </Card>

                <Card className={`p-3 cursor-pointer border-2 ${
                  paymentMethod === 'upi' ? 'border-green-500 bg-green-50' : 'border-gray-200'
                }`} onClick={() => setPaymentMethod('upi')}>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="font-medium">UPI Payment</h4>
                      <p className="text-sm text-gray-600">Pay instantly via UPI</p>
                    </div>
                  </div>
                </Card>

                <Card className={`p-3 cursor-pointer border-2 ${
                  paymentMethod === 'wallet' ? 'border-green-500 bg-green-50' : 'border-gray-200'
                }`} onClick={() => setPaymentMethod('wallet')}>
                  <div className="flex items-center space-x-3">
                    <Wallet className="w-5 h-5 text-purple-600" />
                    <div>
                      <h4 className="font-medium">Wallet Payment</h4>
                      <p className="text-sm text-gray-600">Pay from your wallet balance</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Amount:</span>
                <div className="flex items-center font-bold text-green-600">
                  <IndianRupee className="w-4 h-4" />
                  <span>{totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setStep('address')} className="flex-1">
                Back to Address
              </Button>
              <Button onClick={handlePaymentNext} className="flex-1 bg-green-600 hover:bg-green-700">
                Place Order
              </Button>
            </div>
          </div>
        )}

        {/* Confirmation Step */}
        {step === 'confirmation' && order && (
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-green-600">Order Placed Successfully!</h2>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="font-medium">Order ID: {order.id}</p>
              <p className="text-sm text-gray-600">
                Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Amount:</span>
                <div className="flex items-center font-bold">
                  <IndianRupee className="w-4 h-4" />
                  <span>{order.totalAmount.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span className="capitalize">{order.paymentMethod}</span>
              </div>
            </div>

            <Button onClick={handleClose} className="w-full bg-green-600 hover:bg-green-700">
              Continue Shopping
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutFlow;
