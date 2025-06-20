import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mic, Settings, User, Sprout, Package, Truck, Upload, Home, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';
import MyOrders from './MyOrders';
import MyAddress from './MyAddress';
import MyWallet from './MyWallet';
import UniversalCart from './UniversalCart';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  orderId?: string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showMyOrders, setShowMyOrders] = useState(false);
  const [showMyAddress, setShowMyAddress] = useState(false);
  const [showMyWallet, setShowMyWallet] = useState(false);
  const [showTrackOrder, setShowTrackOrder] = useState(false);
  const [showProfileUpload, setShowProfileUpload] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  
  // Orders state - load from localStorage
  const [orders, setOrders] = useState([]);

  const [addresses, setAddresses] = useState([
    {
      id: '1',
      name: 'Ravi Kumar',
      village: 'Kompally',
      mandal: 'Quthbullapur',
      district: 'Rangareddy',
      pincode: '500014',
      landmark: 'Near Government School',
      mobile: '9876543210',
      isDefault: true
    }
  ]);

  const [walletData, setWalletData] = useState<{
    balance: number;
    pendingPayments: number;
    transactions: Transaction[];
  }>({
    balance: 15750,
    pendingPayments: 2400,
    transactions: [
      {
        id: '1',
        type: 'credit',
        amount: 2850,
        description: 'Payment for Paddy sale',
        date: '2024-01-15T10:30:00Z',
        status: 'completed',
        orderId: 'KM001'
      },
      {
        id: '2',
        type: 'debit',
        amount: 500,
        description: 'Withdrawal to UPI',
        date: '2024-01-12T16:45:00Z',
        status: 'completed'
      },
      {
        id: '3',
        type: 'credit',
        amount: 1200,
        description: 'Government subsidy credit',
        date: '2024-01-10T11:20:00Z',
        status: 'completed'
      }
    ]
  });

  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  const { toast } = useToast();
  const { t } = useLanguage();

  // Get user data from localStorage if on dashboard
  const userData = isDashboard ? JSON.parse(localStorage.getItem('kisanUser') || '{}') : null;

  // Load orders from localStorage
  const loadOrders = () => {
    console.log('Loading orders from localStorage...');
    const savedOrders = localStorage.getItem('myOrders');
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders);
      console.log('Loaded orders:', parsedOrders);
      setOrders(parsedOrders);
    } else {
      console.log('No orders found in localStorage');
      setOrders([]);
    }
  };

  // Load orders on component mount
  useEffect(() => {
    loadOrders();
  }, []);

  // Listen for order updates
  useEffect(() => {
    const handleOrderUpdate = () => {
      console.log('Order update event received, reloading orders...');
      loadOrders();
    };

    window.addEventListener('orderUpdated', handleOrderUpdate);
    return () => window.removeEventListener('orderUpdated', handleOrderUpdate);
  }, []);

  // Load profile image from localStorage
  useEffect(() => {
    const savedImage = localStorage.getItem('userProfileImage');
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  // Set global language in localStorage for other components to use
  useEffect(() => {
    localStorage.setItem('appLanguage', selectedLanguage.toLowerCase());
    // Dispatch custom event to notify other components of language change
    window.dispatchEvent(new CustomEvent('languageChange', { detail: selectedLanguage.toLowerCase() }));
  }, [selectedLanguage]);

  const getTrackingInfo = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) {
      return [
        { status: 'Order not found', date: '', completed: false }
      ];
    }

    // Generate tracking steps based on order status
    const trackingSteps = [
      { status: 'Order Placed', date: new Date(order.orderDate).toLocaleDateString(), completed: true },
      { status: 'Order Confirmed', date: new Date(order.orderDate).toLocaleDateString(), completed: true },
      { status: 'Packed', date: order.status !== 'Pending' ? new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString() : '', completed: order.status !== 'Pending' },
      { status: 'Out for Delivery', date: order.status === 'Dispatched' || order.status === 'Delivered' ? new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString() : '', completed: order.status === 'Dispatched' || order.status === 'Delivered' },
      { status: 'Delivered', date: order.status === 'Delivered' ? new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString() : '', completed: order.status === 'Delivered' }
    ];
    return trackingSteps;
  };

  const handleProfileImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setProfileImage(imageUrl);
        localStorage.setItem('userProfileImage', imageUrl);
        toast({
          title: "Profile Updated",
          description: "Your profile picture has been updated successfully",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTrackOrder = () => {
    if (!trackingId) {
      toast({
        title: "Enter Order ID",
        description: "Please enter a valid order ID to track",
        variant: "destructive",
      });
      return;
    }
    
    const order = orders.find(o => o.id === trackingId);
    if (order) {
      toast({
        title: "Order Found",
        description: `Tracking order ${trackingId} - Status: ${order.status}`,
      });
    } else {
      toast({
        title: "Order Not Found",
        description: `No order found with ID: ${trackingId}`,
        variant: "destructive",
      });
    }
  };

  // Address management functions
  const handleAddAddress = (address: any) => {
    const newAddress = {
      ...address,
      id: Date.now().toString()
    };
    setAddresses(prev => prev.map(addr => ({ ...addr, isDefault: false })).concat(newAddress));
  };

  const handleEditAddress = (id: string, updatedAddress: any) => {
    setAddresses(prev => prev.map(addr => 
      addr.id === id ? { ...updatedAddress, id } : addr
    ));
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  // Wallet functions
  const handleWithdraw = (withdrawalData: any) => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'debit',
      amount: Number(withdrawalData.amount),
      description: `Withdrawal via ${withdrawalData.method.toUpperCase()}`,
      date: new Date().toISOString(),
      status: 'pending'
    };

    setWalletData(prev => ({
      ...prev,
      balance: prev.balance - Number(withdrawalData.amount),
      transactions: [newTransaction, ...prev.transactions]
    }));
  };

  // Order functions
  const handleViewOrderDetails = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      toast({
        title: "Order Details",
        description: `${order.productName} - ₹${order.totalAmount} - ${order.status}`,
      });
    }
  };

  const handleTrackOrderFromList = (orderId: string) => {
    setTrackingId(orderId);
    setShowMyOrders(false);
    setShowTrackOrder(true);
  };

  const navItems = [
    { name: t('nav.dashboard'), path: '/dashboard', icon: '🏠' },
    { name: t('nav.leafScanner'), path: '/leaf-scanner', icon: '🌿' },
    { name: t('nav.weather'), path: '/weather', icon: '🌤️' },
    { name: t('nav.market'), path: '/market', icon: '📊' },
    { name: t('nav.education'), path: '/education', icon: '📚' },
    { name: t('nav.schemes'), path: '/schemes', icon: '🏛️' },
    { name: t('nav.mandi'), path: '/mandi', icon: '🛒' },
    { name: t('nav.voice'), path: '/voice', icon: '🎤' },
    { name: t('nav.seeds'), path: '/seeds', icon: '🌱' },
    { name: t('nav.pesticides'), path: '/pesticides', icon: '🧪' }
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'te', name: 'Telugu', flag: '🇮🇳' }
  ];

  return (
    <nav className="bg-white shadow-lg border-b-2 border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-2xl">🌾</div>
              <span className="text-xl font-bold text-green-800">{t('hero.title')}</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {[
              { name: t('nav.dashboard'), path: '/dashboard', icon: '🏠' },
              { name: t('nav.weather'), path: '/weather', icon: '🌤️' },
              { name: t('nav.market'), path: '/market', icon: '📊' },
              { name: t('nav.education'), path: '/education', icon: '📚' }
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-green-100 text-green-800'
                    : 'text-gray-700 hover:text-green-800 hover:bg-green-50'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {/* Universal Cart Button */}
            <UniversalCart />

            {/* Language Selector */}
            <LanguageSelector />

            {/* Voice Assistant Button */}
            <Link to="/voice">
              <Button variant="outline" size="sm" title={t('nav.voice')}>
                <Mic className="w-4 h-4" />
              </Button>
            </Link>

            {/* Seeds Container Button */}
            <Link to="/seeds">
              <Button variant="outline" size="sm" title={t('nav.seeds')}>
                <Sprout className="w-4 h-4" />
              </Button>
            </Link>

            {/* Hamburger Menu for logged-in users */}
            {isDashboard && userData.name && (
              <Popover open={isHamburgerOpen} onOpenChange={setIsHamburgerOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="text-green-700 border-green-300">
                    <Menu className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 bg-white shadow-lg border border-gray-200 z-50" align="end">
                  <div className="space-y-2">
                    {/* Profile Section */}
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={profileImage || userData.profilePhoto || ''} />
                        <AvatarFallback className="bg-green-100 text-green-800">
                          {userData.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{userData.name}</p>
                        <button
                          onClick={() => {
                            setShowProfileUpload(true);
                            setIsHamburgerOpen(false);
                          }}
                          className="text-xs text-green-600 hover:text-green-800"
                        >
                          Change Photo
                        </button>
                      </div>
                    </div>

                    <DropdownMenuSeparator />

                    {/* Menu Items */}
                    <button
                      onClick={() => {
                        setShowMyOrders(true);
                        setIsHamburgerOpen(false);
                      }}
                      className="flex items-center w-full px-3 py-2 text-left text-gray-700 hover:bg-green-50 rounded-md"
                    >
                      <Package className="w-4 h-4 mr-3" />
                      {t('orders.title')}
                      {orders.length > 0 && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full ml-auto">
                          {orders.length}
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setShowMyAddress(true);
                        setIsHamburgerOpen(false);
                      }}
                      className="flex items-center w-full px-3 py-2 text-left text-gray-700 hover:bg-green-50 rounded-md"
                    >
                      <Home className="w-4 h-4 mr-3" />
                      My Address
                    </button>

                    <button
                      onClick={() => {
                        setShowMyWallet(true);
                        setIsHamburgerOpen(false);
                      }}
                      className="flex items-center w-full px-3 py-2 text-left text-gray-700 hover:bg-green-50 rounded-md"
                    >
                      <Wallet className="w-4 h-4 mr-3" />
                      My Wallet
                    </button>

                    <button
                      onClick={() => {
                        setShowTrackOrder(true);
                        setIsHamburgerOpen(false);
                      }}
                      className="flex items-center w-full px-3 py-2 text-left text-gray-700 hover:bg-green-50 rounded-md"
                    >
                      <Truck className="w-4 h-4 mr-3" />
                      {t('orders.trackOrder')}
                    </button>

                    <button className="flex items-center w-full px-3 py-2 text-left text-gray-700 hover:bg-green-50 rounded-md">
                      <User className="w-4 h-4 mr-3" />
                      View Profile
                    </button>

                    <DropdownMenuSeparator />

                    <button className="flex items-center w-full px-3 py-2 text-left text-gray-700 hover:bg-green-50 rounded-md">
                      <Settings className="w-4 h-4 mr-3" />
                      Settings
                    </button>

                    <button
                      onClick={() => {
                        localStorage.removeItem('kisanUser');
                        window.location.href = '/login';
                      }}
                      className="flex items-center w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                    >
                      Logout
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Universal Cart Button */}
            <UniversalCart isMobile />

            {/* Mobile Language Selector */}
            <LanguageSelector showLabel={false} />

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {[
              { name: t('nav.dashboard'), path: '/dashboard', icon: '🏠' },
              { name: t('nav.leafScanner'), path: '/leaf-scanner', icon: '🌿' },
              { name: t('nav.weather'), path: '/weather', icon: '🌤️' },
              { name: t('nav.market'), path: '/market', icon: '📊' },
              { name: t('nav.education'), path: '/education', icon: '📚' },
              { name: t('nav.schemes'), path: '/schemes', icon: '🏛️' },
              { name: t('nav.mandi'), path: '/mandi', icon: '🛒' },
              { name: t('nav.voice'), path: '/voice', icon: '🎤' },
              { name: t('nav.seeds'), path: '/seeds', icon: '🌱' },
              { name: t('nav.pesticides'), path: '/pesticides', icon: '🧪' }
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? 'bg-green-100 text-green-800'
                    : 'text-gray-700 hover:text-green-800 hover:bg-green-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
            
            {/* Mobile User Menu */}
            {isDashboard && userData.name && (
              <div className="border-t border-gray-200 mt-2 pt-2">
                <div className="flex items-center px-3 py-2 bg-green-50 rounded-lg mx-2 mb-2">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src={profileImage || userData.profilePhoto || ''} />
                    <AvatarFallback className="bg-green-100 text-green-800 text-2xl">
                      {userData.name.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-700">{userData.name}</span>
                </div>
                
                <button 
                  onClick={() => {
                    setShowMyOrders(true);
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-green-50"
                >
                  <Package className="w-4 h-4 mr-2" />
                  {t('orders.title')}
                  {orders.length > 0 && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full ml-auto">
                      {orders.length}
                    </span>
                  )}
                </button>
                
                {/* Mobile Address, Wallet, Track Order, and other buttons */}
                <button 
                  onClick={() => {
                    setShowMyAddress(true);
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-green-50"
                >
                  <Home className="w-4 h-4 mr-2" />
                  My Address
                </button>
                
                <button 
                  onClick={() => {
                    setShowMyWallet(true);
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-green-50"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  My Wallet
                </button>
                
                <button 
                  onClick={() => {
                    setShowTrackOrder(true);
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-green-50"
                >
                  <Truck className="w-4 h-4 mr-2" />
                  {t('orders.trackOrder')}
                </button>
                <button
                  onClick={() => {
                    setShowProfileUpload(true);
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-green-50"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Change Photo
                </button>
                <button className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-green-50">
                  <User className="w-4 h-4 mr-2" />
                  View Profile
                </button>
                <button className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-green-50">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem('kisanUser');
                    window.location.href = '/login';
                  }}
                  className="flex items-center w-full px-3 py-2 text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* My Orders Dialog */}
      <Dialog open={showMyOrders} onOpenChange={setShowMyOrders}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>My Orders</DialogTitle>
          </DialogHeader>
          <MyOrders
            orders={orders}
            onViewDetails={handleViewOrderDetails}
            onTrackOrder={handleTrackOrderFromList}
          />
        </DialogContent>
      </Dialog>

      {/* My Address Dialog */}
      <Dialog open={showMyAddress} onOpenChange={setShowMyAddress}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>My Addresses</DialogTitle>
          </DialogHeader>
          <MyAddress
            addresses={addresses}
            onAddAddress={handleAddAddress}
            onEditAddress={handleEditAddress}
            onDeleteAddress={handleDeleteAddress}
            onSetDefault={handleSetDefaultAddress}
          />
        </DialogContent>
      </Dialog>

      {/* My Wallet Dialog */}
      <Dialog open={showMyWallet} onOpenChange={setShowMyWallet}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>My Wallet</DialogTitle>
          </DialogHeader>
          <MyWallet
            balance={walletData.balance}
            transactions={walletData.transactions}
            pendingPayments={walletData.pendingPayments}
            onWithdraw={handleWithdraw}
          />
        </DialogContent>
      </Dialog>

      {/* Track Order Dialog */}
      <Dialog open={showTrackOrder} onOpenChange={setShowTrackOrder}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Track Your Order</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Enter Order ID</label>
              <Input
                placeholder="e.g., KM001"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
              />
            </div>
            
            {trackingId && (
              <div className="space-y-3">
                <h3 className="font-medium">Order Status for {trackingId}</h3>
                <div className="space-y-2">
                  {getTrackingInfo(trackingId).map((step, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        step.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                      }`} />
                      <div className="flex-1">
                        <p className={`font-medium ${step.completed ? 'text-green-800' : 'text-gray-600'}`}>
                          {step.status}
                        </p>
                        {step.date && (
                          <p className="text-xs text-gray-500">{step.date}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Delivery Contact:</strong> +91 98765 43210
                  </p>
                </div>
              </div>
            )}
            
            <Button onClick={handleTrackOrder} className="w-full">
              Track Order
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Profile Upload Dialog */}
      <Dialog open={showProfileUpload} onOpenChange={setShowProfileUpload}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Profile Picture</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profileImage || userData?.profilePhoto || ''} />
                <AvatarFallback className="bg-green-100 text-green-800 text-2xl">
                  {userData?.name?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="profile-upload" className="cursor-pointer">
                <Button variant="outline" className="w-full" asChild>
                  <span>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photo
                  </span>
                </Button>
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleProfileImageUpload}
                className="hidden"
              />
              
              <Button variant="outline" className="w-full">
                Take Photo
              </Button>
            </div>
            
            <p className="text-xs text-gray-500">
              Supported formats: JPG, PNG, GIF (Max 5MB)
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default Navbar;
