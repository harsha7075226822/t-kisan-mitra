import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mic, Globe, Settings, User, Sprout, Package, Truck, Camera, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showMyOrders, setShowMyOrders] = useState(false);
  const [showTrackOrder, setShowTrackOrder] = useState(false);
  const [showProfileUpload, setShowProfileUpload] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [profileImage, setProfileImage] = useState('');
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

  // Mock orders data
  const mockOrders = [
    {
      id: 'KM001',
      seedName: 'Paddy Seeds 1010',
      quantity: 2,
      date: '2024-01-15',
      status: 'Delivered',
      total: 900
    },
    {
      id: 'KM002',
      seedName: 'Cotton Seeds RCH659',
      quantity: 1,
      date: '2024-01-18',
      status: 'In Transit',
      total: 700
    },
    {
      id: 'KM003',
      seedName: 'Groundnut Seeds TMV7',
      quantity: 3,
      date: '2024-01-20',
      status: 'Pending',
      total: 1560
    }
  ];

  // Mock tracking data
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

            {/* New Features - Show only when logged in */}
            {isDashboard && userData.name && (
              <>
                {/* My Orders Button */}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowMyOrders(true)}
                  className="text-green-700 border-green-300"
                >
                  <Package className="w-4 h-4 mr-2" />
                  My Orders
                </Button>

                {/* Track Order Button */}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowTrackOrder(true)}
                  className="text-green-700 border-green-300"
                >
                  <Truck className="w-4 h-4 mr-2" />
                  Track Order
                </Button>

                {/* Profile Picture Upload */}
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowProfileUpload(true)}
                  className="p-1"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profileImage || userData.profilePhoto || ''} />
                    <AvatarFallback className="bg-green-100 text-green-800">
                      {userData.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </>
            )}

            {/* Profile Section - Show only on dashboard */}
            {isDashboard && userData.name && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 p-2">
                    <Settings className="w-4 h-4" />
                    <span className="text-sm font-medium text-gray-700">Settings</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white" align="end">
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      localStorage.removeItem('kisanUser');
                      window.location.href = '/login';
                    }}
                    className="text-red-600"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
            
            {isDashboard && userData.name && (
              <div className="border-t border-gray-200 mt-2 pt-2">
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
                    setShowTrackOrder(true);
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-green-50"
                >
                  <Truck className="w-4 h-4 mr-2" />
                  Track Order
                </button>
                <div className="flex items-center px-3 py-2">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src={profileImage || userData.profilePhoto || ''} />
                    <AvatarFallback className="bg-green-100 text-green-800">
                      {userData.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-700">{userData.name}</span>
                </div>
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>My Orders</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {mockOrders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{order.seedName}</h3>
                    <p className="text-sm text-gray-600">Order ID: {order.id}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Quantity:</span>
                    <p className="font-medium">{order.quantity} bags</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Date:</span>
                    <p className="font-medium">{order.date}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Total:</span>
                    <p className="font-medium">₹{order.total}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setTrackingId(order.id);
                    setShowMyOrders(false);
                    setShowTrackOrder(true);
                  }}
                >
                  Track Order
                </Button>
              </div>
            ))}
          </div>
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
