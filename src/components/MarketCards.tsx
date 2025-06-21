
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Phone, 
  Navigation, 
  IndianRupee, 
  Clock,
  Wifi,
  WifiOff 
} from 'lucide-react';

interface Market {
  id: number;
  name: string;
  distance: number;
  crops: string[];
  latestPrice: string;
  priceItem: string;
  location: string;
  contact: string;
  coordinates: { lat: number; lng: number };
  isOnline: boolean;
  lastUpdated: string;
}

const MarketCards = () => {
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationError, setLocationError] = useState<string>('');
  const [markets, setMarkets] = useState<Market[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // Mock market data with live pricing simulation
  const mockMarkets: Market[] = [
    {
      id: 1,
      name: 'KPHB Agricultural Market',
      distance: 3.2,
      crops: ['Paddy', 'Cotton', 'Turmeric'],
      latestPrice: '₹2,850',
      priceItem: 'Paddy',
      location: 'KPHB Colony, Hyderabad',
      contact: 'Market Officer: 9876543210',
      coordinates: { lat: 17.4875, lng: 78.3953 },
      isOnline: true,
      lastUpdated: 'Just now'
    },
    {
      id: 2,
      name: 'Kompally Mandi',
      distance: 5.7,
      crops: ['Maize', 'Cotton', 'Chilli'],
      latestPrice: '₹3,200',
      priceItem: 'Maize',
      location: 'Kompally, Medchal District',
      contact: 'Helpdesk: 1800-XXX-1234',
      coordinates: { lat: 17.5373, lng: 78.4891 },
      isOnline: true,
      lastUpdated: 'Just now'
    },
    {
      id: 3,
      name: 'Secunderabad Market Yard',
      distance: 8.1,
      crops: ['Vegetables', 'Fruits', 'Grains'],
      latestPrice: '₹4,100',
      priceItem: 'Mixed Vegetables',
      location: 'Secunderabad, Telangana',
      contact: 'Market Officer: 9988776655',
      coordinates: { lat: 17.4399, lng: 78.4983 },
      isOnline: true,
      lastUpdated: 'Just now'
    },
    {
      id: 4,
      name: 'Shamirpet Agricultural Hub',
      distance: 12.3,
      crops: ['Rice', 'Sugarcane', 'Cotton'],
      latestPrice: '₹2,950',
      priceItem: 'Rice',
      location: 'Shamirpet, Rangareddy District',
      contact: 'Helpdesk: 1800-XXX-5678',
      coordinates: { lat: 17.5167, lng: 78.2167 },
      isOnline: false,
      lastUpdated: 'Just now'
    },
    {
      id: 5,
      name: 'Medchal Crop Exchange',
      distance: 6.8,
      crops: ['Wheat', 'Soybean', 'Groundnut'],
      latestPrice: '₹3,450',
      priceItem: 'Wheat',
      location: 'Medchal, Medchal District',
      contact: 'Market Officer: 9123456789',
      coordinates: { lat: 17.6243, lng: 78.4829 },
      isOnline: true,
      lastUpdated: 'Just now'
    },
    {
      id: 6,
      name: 'Gajularamaram Mandi',
      distance: 4.5,
      crops: ['Jowar', 'Bajra', 'Redgram'],
      latestPrice: '₹2,750',
      priceItem: 'Jowar',
      location: 'Gajularamaram, Hyderabad',
      contact: 'Helpdesk: 1800-XXX-9012',
      coordinates: { lat: 17.5104, lng: 78.3808 },
      isOnline: true,
      lastUpdated: 'Just now'
    }
  ];

  useEffect(() => {
    requestLocation();
    const interval = setInterval(refreshMarketData, 10 * 60 * 1000); // Refresh every 10 minutes
    return () => clearInterval(interval);
  }, []);

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationError('');
          loadMarkets();
        },
        (error) => {
          setLocationError('📍 Enable location to find the nearest agricultural markets with live crop prices.');
          loadMarkets();
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    } else {
      setLocationError('Location services not supported on this device.');
      loadMarkets();
    }
  };

  const loadMarkets = () => {
    setIsLoading(true);
    // Simulate API call with mock data
    setTimeout(() => {
      const sortedMarkets = mockMarkets.sort((a, b) => a.distance - b.distance);
      setMarkets(sortedMarkets);
      setIsLoading(false);
      setLastRefresh(new Date());
    }, 1000);
  };

  const refreshMarketData = () => {
    // Simulate price updates
    const updatedMarkets = markets.map(market => ({
      ...market,
      latestPrice: generateRandomPrice(),
      lastUpdated: 'Just now',
      isOnline: Math.random() > 0.1 // 90% chance to be online
    }));
    setMarkets(updatedMarkets);
    setLastRefresh(new Date());
  };

  const generateRandomPrice = () => {
    const basePrice = 2500 + Math.floor(Math.random() * 2000);
    return `₹${basePrice.toLocaleString()}`;
  };

  const handleCall = (contact: string) => {
    const phoneNumber = contact.match(/\d{10}/);
    if (phoneNumber) {
      window.open(`tel:${phoneNumber[0]}`);
    }
  };

  const handleDirections = (coordinates: {lat: number, lng: number}) => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${coordinates.lat},${coordinates.lng}`;
      window.open(url, '_blank');
    } else {
      const url = `https://www.google.com/maps/search/${coordinates.lat},${coordinates.lng}`;
      window.open(url, '_blank');
    }
  };

  const enableLocation = () => {
    requestLocation();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <Navigation className="w-5 h-5 mr-2 text-green-600" />
            Nearest Agricultural Markets
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
          <Navigation className="w-5 h-5 mr-2 text-green-600" />
          Nearest Agricultural Markets
        </h3>
        <div className="flex items-center gap-3">
          {userLocation && (
            <Badge variant="outline" className="text-green-700 border-green-300">
              📍 Location Enabled
            </Badge>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refreshMarketData}
            className="text-blue-600 border-blue-300"
          >
            <Clock className="w-4 h-4 mr-1" />
            Refresh Prices
          </Button>
        </div>
      </div>

      {/* Location Error */}
      {locationError && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-4">📍</div>
            <p className="text-orange-700 font-medium mb-4">{locationError}</p>
            <Button 
              onClick={enableLocation}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Enable Location
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Last Refresh Info */}
      <div className="text-sm text-gray-500 text-center">
        Last updated: {lastRefresh.toLocaleTimeString()} • Next auto-refresh in 10 minutes
      </div>

      {/* Market Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {markets.map((market, index) => (
          <Card 
            key={market.id} 
            className={`hover:shadow-lg transition-all duration-200 ${
              index === 0 ? 'ring-2 ring-green-200 border-green-300' : 'border-gray-200'
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg text-gray-900 mb-1 flex items-center">
                    🏪 {market.name}
                    {!market.isOnline && (
                      <WifiOff className="w-4 h-4 ml-2 text-red-500" />
                    )}
                  </CardTitle>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Navigation className="w-4 h-4 mr-1 text-green-600" />
                    <span className="font-medium">{market.distance} km away</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  {index === 0 && (
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      Nearest
                    </Badge>
                  )}
                  <div className="flex items-center text-xs text-gray-500">
                    {market.isOnline ? (
                      <Wifi className="w-3 h-3 mr-1 text-green-500" />
                    ) : (
                      <WifiOff className="w-3 h-3 mr-1 text-red-500" />
                    )}
                    {market.lastUpdated}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0 space-y-4">
              {/* Crops Available */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">🌾 Crops Available:</div>
                <div className="flex flex-wrap gap-1">
                  {market.crops.map((crop, cropIndex) => (
                    <Badge key={cropIndex} variant="secondary" className="text-xs">
                      {crop}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Latest Price */}
              <div className={`rounded-lg p-3 ${market.isOnline ? 'bg-green-50' : 'bg-gray-50'}`}>
                <div className="flex items-center mb-1">
                  <IndianRupee className="w-4 h-4 mr-1 text-green-600" />
                  <span className="text-sm font-medium text-gray-700 mr-2">Latest Price:</span>
                  <span className={`font-bold ${market.isOnline ? 'text-green-700' : 'text-gray-500'}`}>
                    {market.latestPrice}/quintal
                  </span>
                </div>
                <div className="text-xs text-gray-500 ml-5">({market.priceItem})</div>
                {!market.isOnline && (
                  <div className="text-xs text-red-500 ml-5 mt-1">
                    ⚠️ Offline - Prices may be outdated
                  </div>
                )}
              </div>

              {/* Location */}
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600 leading-relaxed">{market.location}</span>
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
                  className="flex-1 text-xs h-9 border-blue-300 text-blue-600 hover:bg-blue-50"
                  onClick={() => handleCall(market.contact)}
                >
                  <Phone className="w-3 h-3 mr-1" />
                  Call
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 text-xs h-9 bg-green-600 hover:bg-green-700"
                  onClick={() => handleDirections(market.coordinates)}
                >
                  <Navigation className="w-3 h-3 mr-1" />
                  Directions
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MarketCards;
