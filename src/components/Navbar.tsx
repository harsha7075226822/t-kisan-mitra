import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mic, Globe, Settings, User, Sprout, Package, Truck, Camera, Upload, Home, Wallet } from 'lucide-react';
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
import MyOrders from './MyOrders';
import MyAddress from './MyAddress';
import MyWallet from './MyWallet';

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
  
  // Mock data states
  const [orders, setOrders] = useState([
    {
      id: 'KM001',
      productName: 'Paddy Seeds 1010',
      quantity: 2,
      orderDate: '2024-01-15T10:30:00Z',
      deliveryAddress: 'Village: Kompally, Mandal: Quthbullapur, District: Rangareddy, PIN: 500014',
      totalAmount: 900,
      status: 'Delivered' as const,
      productType: 'seeds' as const
    },
    {
      id: 'KM002',
      productName: 'Cotton Seeds RCH659',
      quantity: 1,
      orderDate: '2024-01-18T14:20:00Z',
      deliveryAddress: 'Village: KPHB, Mandal: Kukatpally, District: Hyderabad, PIN: 500072',
      totalAmount: 700,
      status: 'Dispatched' as const,
      productType: 'seeds' as const
    },
    {
      id: 'KM003',
      productName: 'Groundnut Seeds TMV7',
      quantity: 3,
      orderDate: '2024-01-20T09:15:00Z',
      deliveryAddress: 'Village: Shamirpet, Mandal: Shamirpet, District: Rangareddy, PIN: 500078',
      totalAmount: 1560,
      status: 'Pending' as const,
      productType: 'seeds' as const
    }
  ]);

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

  // Get user data from localStorage if on dashboard
  const userData = isDashboard ? JSON.parse(localStorage.getItem('kisanUser') || '{}') : null;

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
    const trackingSteps = [
      { status: 'Ordered', date: '2024-01-18', completed: true },
      { status: 'Packed', date: '2024-01-19', completed: true },
      { status: 'Out for Delivery', date: '2024-01-20', completed: false },
      { status: 'Delivered', date: '', completed: false }
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
      });
      return;
    }
    
    toast({
      title: "Order Found",
      description: `Tracking order ${trackingId}`,
    });
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
    toast({
      title: "Order Details",
      description: `Viewing details for order ${orderId}`,
    });
  };

  const handleTrackOrderFromList = (orderId: string) => {
    setTrackingId(orderId);
    setShowMyOrders(false);
    setShowTrackOrder(true);
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '🌾' },
    { name: 'Weather', path: '/weather', icon: '🌤️' },
    { name: 'Market Insights', path: '/market', icon: '📊' },
    { name: 'Education', path: '/education', icon: '📚' },
    { name: 'Government Schemes', path: '/schemes', icon: '🏛️' },
    { name: 'Online Mandi', path: '/mandi', icon: '🛒' },
    { name: 'Voice Assistant', path: '/voice', icon: '🎤' },
    { name: 'Crop Scanner', path: '/scanner', icon: '📷' },
    { name: 'Seeds Container', path: '/seeds', icon: '🌱' },
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
              <span className="text-xl font-bold text-green-800">Smart AgriConnect</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.slice(0, 4).map((item) => (
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
            {/* Global Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="text-green-700 border-green-300">
                  <Globe className="w-4 h-4 mr-2" />
                  {selectedLanguage}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang.name)}
                    className="cursor-pointer"
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Voice Assistant Button */}
            <Link to="/voice">
              <Button variant="outline" size="sm">
                <Mic className="w-4 h-4" />
              </Button>
            </Link>

            {/* Seeds Container Button */}
            <Link to="/seeds">
              <Button variant="outline" size="sm">
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
                      My Orders
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
                      Track Order
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
                      className="flex items-center w-full px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-md"
                    >
                      Logout
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
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
            {navItems.map((item) => (
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
            
            {/* Mobile Language Options */}
            <div className="border-t border-gray-200 mt-2 pt-2">
              <div className="px-3 py-2 text-sm font-medium text-gray-500">Language</div>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setSelectedLanguage(lang.name);
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-green-50"
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                </button>
              ))}
            </div>
            
            {/* Mobile User Menu */}
            {isDashboard && userData.name && (
              <div className="border-t border-gray-200 mt-2 pt-2">
                <div className="flex items-center px-3 py-2 bg-green-50 rounded-lg mx-2 mb-2">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src={profileImage || userData.profilePhoto || ''} />
                    <AvatarFallback className="bg-green-100 text-green-800">
                      {userData.name.charAt(0).toUpperCase()}
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
                  My Orders
                </button>
                
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
                  Track Order
                </button>
                <button
                  onClick={() => {
                    setShowProfileUpload(true);
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-green-50"
                >
                  <Camera className="w-4 h-4 mr-2" />
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
                <Camera className="w-4 h-4 mr-2" />
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
