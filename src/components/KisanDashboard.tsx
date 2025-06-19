import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  BookOpen, 
  Cloud, 
  Building2, 
  ShoppingCart, 
  Mic, 
  Camera,
  Phone,
  LogOut,
  Bell,
  Sprout,
  MapPin,
  Navigation,
  IndianRupee
} from 'lucide-react';

const KisanDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationError, setLocationError] = useState<string>('');
  const navigate = useNavigate();

  // Mock data for nearest markets
  const nearestMarkets = [
    {
      id: 1,
      name: 'KPHB Agricultural Market',
      distance: 3.2,
      crops: ['Paddy', 'Cotton', 'Turmeric'],
      latestPrice: '₹2,850/quintal',
      priceItem: 'Paddy',
      address: 'KPHB Colony, Hyderabad',
      contact: 'Market Officer: 9876543210',
      coordinates: { lat: 17.4875, lng: 78.3953 }
    },
    {
      id: 2,
      name: 'Kompally Mandi',
      distance: 5.7,
      crops: ['Maize', 'Cotton', 'Chilli'],
      latestPrice: '₹3,200/quintal',
      priceItem: 'Maize',
      address: 'Kompally, Medchal District',
      contact: 'Helpdesk: 1800-XXX-1234',
      coordinates: { lat: 17.5373, lng: 78.4891 }
    },
    {
      id: 3,
      name: 'Secunderabad Market Yard',
      distance: 8.1,
      crops: ['Vegetables', 'Fruits', 'Grains'],
      latestPrice: '₹4,100/quintal',
      priceItem: 'Mixed Vegetables',
      address: 'Secunderabad, Telangana',
      contact: 'Market Officer: 9988776655',
      coordinates: { lat: 17.4399, lng: 78.4983 }
    },
    {
      id: 4,
      name: 'Shamirpet Agricultural Hub',
      distance: 12.3,
      crops: ['Rice', 'Sugarcane', 'Cotton'],
      latestPrice: '₹2,950/quintal',
      priceItem: 'Rice',
      address: 'Shamirpet, Rangareddy District',
      contact: 'Helpdesk: 1800-XXX-5678',
      coordinates: { lat: 17.5167, lng: 78.2167 }
    }
  ];

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('kisanUser');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Request location permission
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationError('');
        },
        (error) => {
          console.log('Location error:', error);
          setLocationError('Turn on location to find nearest markets.');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    } else {
      setLocationError('Location services not supported on this device.');
    }
  }, []);

  const modules = [
    {
      title: 'Market Insights',
      description: 'Crop prices and market trends',
      icon: TrendingUp,
      color: 'bg-blue-500',
      path: '/market'
    },
    {
      title: 'Education',
      description: 'Agricultural knowledge and training',
      icon: BookOpen,
      color: 'bg-green-500',
      path: '/education'
    },
    {
      title: 'Weather',
      description: 'Localized alerts and forecasts',
      icon: Cloud,
      color: 'bg-sky-500',
      path: '/weather'
    },
    {
      title: 'Government Schemes',
      description: 'Subsidy & benefits information',
      icon: Building2,
      color: 'bg-purple-500',
      path: '/schemes'
    },
    {
      title: 'Online Mandi',
      description: 'Buy and sell crops online',
      icon: ShoppingCart,
      color: 'bg-orange-500',
      path: '/mandi'
    },
    {
      title: 'Voice AI',
      description: 'Get help using voice (Telugu/English)',
      icon: Mic,
      color: 'bg-red-500',
      path: '/voice'
    },
    {
      title: 'Crop Scanner',
      description: 'Diagnose crop diseases via image',
      icon: Camera,
      color: 'bg-indigo-500',
      path: '/scanner'
    },
    {
      title: 'Seeds Container',
      description: 'Quality seeds with pricing',
      icon: Sprout,
      color: 'bg-emerald-500',
      path: '/seeds'
    }
  ];

  const handleModuleClick = (path: string) => {
    navigate(path);
  };

  const handleMarketCall = (contact: string) => {
    const phoneNumber = contact.match(/\d{10}/);
    if (phoneNumber) {
      window.open(`tel:${phoneNumber[0]}`);
    }
  };

  const handleGetDirections = (coordinates: {lat: number, lng: number}) => {
    if (location) {
      const url = `https://www.google.com/maps/dir/${location.lat},${location.lng}/${coordinates.lat},${coordinates.lng}`;
      window.open(url, '_blank');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🌾</div>
          <h2 className="text-xl text-gray-600">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-cream-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-green-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Welcome, {user.name}!
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">📱 {user.mobile}</span>
                  <span className="flex items-center gap-1">🆔 Aadhaar: {user.aadhaar}</span>
                  <Badge variant="outline" className="text-green-700 border-green-300 w-fit">
                    Verified Farmer
                  </Badge>
                </div>
              </div>
              <div className="text-4xl sm:text-6xl opacity-20 self-center sm:self-auto">👨‍🌾</div>
            </div>
          </div>
        </div>

        {/* Nearest Markets Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center">
              <Navigation className="w-5 h-5 mr-2 text-green-600" />
              Nearest Agricultural Markets
            </h3>
            {location && (
              <Badge variant="outline" className="text-green-700 border-green-300 w-fit">
                📍 Location Enabled
              </Badge>
            )}
          </div>

          {locationError ? (
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="text-3xl sm:text-4xl mb-4">📍</div>
                <p className="text-orange-700 font-medium text-sm sm:text-base">{locationError}</p>
                <p className="text-xs sm:text-sm text-orange-600 mt-2">
                  Enable location services to see markets sorted by distance
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {nearestMarkets.map((market) => (
                <Card key={market.id} className="border-green-200 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base sm:text-lg text-gray-900 mb-1 truncate">
                          🏪 {market.name}
                        </CardTitle>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <Navigation className="w-4 h-4 mr-1 text-green-600 flex-shrink-0" />
                          <span className="font-medium">{market.distance} km away</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-green-700 border-green-300 text-xs flex-shrink-0">
                        Nearest
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0 space-y-3">
                    {/* Crops Available */}
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-2">🌾 Crops Available:</div>
                      <div className="flex flex-wrap gap-1">
                        {market.crops.map((crop, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {crop}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Latest Price */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center mb-1">
                        <IndianRupee className="w-4 h-4 mr-1 text-green-600" />
                        <span className="text-sm font-medium text-gray-700 mr-2">Latest Price:</span>
                        <span className="font-bold text-green-700">{market.latestPrice}</span>
                      </div>
                      <div className="text-xs text-gray-500 ml-5">({market.priceItem})</div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600 leading-relaxed">{market.address}</span>
                    </div>

                    {/* Contact */}
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span className="text-sm text-gray-600 truncate">{market.contact}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 text-xs h-9"
                        onClick={() => handleMarketCall(market.contact)}
                      >
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1 text-xs h-9 bg-green-600 hover:bg-green-700"
                        onClick={() => handleGetDirections(market.coordinates)}
                        disabled={!location}
                      >
                        <Navigation className="w-3 h-3 mr-1" />
                        Directions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Main Modules */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
            Services
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {modules.map((module, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all duration-200 cursor-pointer border-gray-200 hover:border-green-300 hover:scale-105 active:scale-95"
                onClick={() => handleModuleClick(module.path)}
              >
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 ${module.color} rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                    <module.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base leading-tight">
                    {module.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed hidden sm:block">
                    {module.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 sm:mt-12 text-center border-t border-gray-200 pt-6 sm:pt-8">
          <div className="text-sm text-gray-600 space-y-2">
            <p className="flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              Help Helpline: 1800-XXX-XXXX (Toll Free)
            </p>
            <p className="flex items-center justify-center gap-2">
              <span>🌐</span>
              Support: support@kisanmitra.telangana.gov.in
            </p>
            <p className="text-xs text-gray-500 px-4">
              An initiative by Government of Telangana
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KisanDashboard;
