
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus, RefreshCw, ArrowLeft } from 'lucide-react';

const Market = () => {
  const navigate = useNavigate();
  const [marketData, setMarketData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // Enhanced mock market data with real-time simulation
    const mockData = [
      {
        crop: 'Paddy (Rice)',
        price: 2850,
        previousPrice: 2800,
        unit: 'quintal',
        market: 'Hyderabad APMC',
        quality: 'Grade A',
        trend: 'up'
      },
      {
        crop: 'Cotton',
        price: 6200,
        previousPrice: 6100,
        unit: 'quintal',
        market: 'Karimnagar',
        quality: 'Medium Staple',
        trend: 'up'
      },
      {
        crop: 'Turmeric',
        price: 14500,
        previousPrice: 14800,
        unit: 'quintal',
        market: 'Nizamabad',
        quality: 'Salem Quality',
        trend: 'down'
      },
      {
        crop: 'Maize (Corn)',
        price: 2200,
        previousPrice: 2150,
        unit: 'quintal',
        market: 'Warangal',
        quality: 'Yellow Corn',
        trend: 'up'
      },
      {
        crop: 'Red Gram (Tur)',
        price: 7800,
        previousPrice: 7750,
        unit: 'quintal',
        market: 'Mahbubnagar',
        quality: 'FAQ',
        trend: 'up'
      },
      {
        crop: 'Soybean',
        price: 4200,
        previousPrice: 4300,
        unit: 'quintal',
        market: 'Adilabad',
        quality: 'Yellow',
        trend: 'down'
      }
    ];
    setMarketData(mockData);
  }, []);

  const getPriceIcon = (current, previous) => {
    if (current > previous) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (current < previous) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-600" />;
  };

  const getPriceColor = (current, previous) => {
    if (current > previous) return 'text-green-600';
    if (current < previous) return 'text-red-600';
    return 'text-gray-600';
  };

  const getPriceChange = (current, previous) => {
    const change = current - previous;
    const percentage = ((change / previous) * 100).toFixed(2);
    return { change, percentage };
  };

  const refreshData = () => {
    setLastUpdated(new Date());
    // Simulate slight price changes
    setMarketData(prev => prev.map(item => ({
      ...item,
      previousPrice: item.price,
      price: item.price + (Math.random() - 0.5) * 100
    })));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-cream-50 p-6">
      <div className="max-w-6xl mx-auto">
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
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-green-800 mb-2">
                Market Prices
              </h1>
              <p className="text-green-600">
                Today's Mandi Rates - Telangana & Andhra Pradesh
              </p>
            </div>
            <Button onClick={refreshData} className="bg-green-600 hover:bg-green-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Prices
            </Button>
          </div>
        </div>

        {/* Market Data Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {marketData.map((item, index) => {
            const priceChange = getPriceChange(item.price, item.previousPrice);
            return (
              <Card key={index} className="border-green-200 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg">
                      {item.crop}
                    </CardTitle>
                    {getPriceIcon(item.price, item.previousPrice)}
                  </div>
                  <Badge variant="outline" className="text-blue-700 border-blue-300 w-fit">
                    {item.quality}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getPriceColor(item.price, item.previousPrice)}`}>
                        ₹{Math.round(item.price).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        per quintal
                      </div>
                    </div>
                    
                    <div className="text-center border-t pt-3">
                      <div className="text-sm text-gray-600">
                        Market:
                      </div>
                      <div className="font-medium">{item.market}</div>
                    </div>
                    
                    <div className="text-center text-xs">
                      <div className="text-gray-500">
                        Previous: ₹{item.previousPrice.toLocaleString()}
                      </div>
                      <div className={`font-medium ${priceChange.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        Change: {priceChange.change >= 0 ? '+' : ''}₹{Math.round(priceChange.change)} ({priceChange.percentage}%)
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Market Information */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              Market Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-blue-700 mb-2">
                  • Prices are for Grade A quality unless specified
                </p>
                <p className="text-blue-700">
                  • Rates may vary based on quality and quantity
                </p>
              </div>
              <div className="text-right">
                <p className="text-blue-600 text-xs">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </p>
                <p className="text-blue-600 text-xs">
                  Data source: APMC & Telangana Mandi Board
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Market;
