
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const Market = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('telugu');
  const [marketData, setMarketData] = useState([]);

  useEffect(() => {
    // Mock market data - in real app, fetch from mandi API
    const mockData = [
      {
        crop: { telugu: 'వరి', english: 'Paddy' },
        price: 2850,
        previousPrice: 2800,
        unit: 'quintal',
        market: 'Hyderabad APMC'
      },
      {
        crop: { telugu: 'పత్తి', english: 'Cotton' },
        price: 6200,
        previousPrice: 6100,
        unit: 'quintal',
        market: 'Karimnagar'
      },
      {
        crop: { telugu: 'పసుపు', english: 'Turmeric' },
        price: 14500,
        previousPrice: 14800,
        unit: 'quintal',
        market: 'Nizamabad'
      },
      {
        crop: { telugu: 'మొక్కజొన్న', english: 'Maize' },
        price: 2200,
        previousPrice: 2150,
        unit: 'quintal',
        market: 'Warangal'
      },
      {
        crop: { telugu: 'రెడ్ గ్రామ్', english: 'Red Gram' },
        price: 7800,
        previousPrice: 7750,
        unit: 'quintal',
        market: 'Mahbubnagar'
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-cream-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            {selectedLanguage === 'telugu' ? 'మార్కెట్ ధరలు' : 'Market Prices'}
          </h1>
          <p className="text-green-600">
            {selectedLanguage === 'telugu' 
              ? 'నేటి మండి ధరలు - తెలంగాణ & ఆంధ్రప్రదేశ్'
              : 'Today\'s Mandi Rates - Telangana & Andhra Pradesh'
            }
          </p>
        </div>

        {/* Language Toggle */}
        <div className="flex space-x-2 mb-6">
          <Button
            variant={selectedLanguage === 'telugu' ? 'default' : 'outline'}
            onClick={() => setSelectedLanguage('telugu')}
            className="bg-green-600 hover:bg-green-700"
          >
            తెలుగు
          </Button>
          <Button
            variant={selectedLanguage === 'english' ? 'default' : 'outline'}
            onClick={() => setSelectedLanguage('english')}
            className="bg-green-600 hover:bg-green-700"
          >
            English
          </Button>
        </div>

        {/* Market Data Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketData.map((item, index) => (
            <Card key={index} className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>{item.crop[selectedLanguage]}</span>
                  {getPriceIcon(item.price, item.previousPrice)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getPriceColor(item.price, item.previousPrice)}`}>
                      ₹{item.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      {selectedLanguage === 'telugu' ? 'ప్రతి క్వింటల్' : `per ${item.unit}`}
                    </div>
                  </div>
                  
                  <div className="text-center border-t pt-3">
                    <div className="text-sm text-gray-600">
                      {selectedLanguage === 'telugu' ? 'మార్కెట్:' : 'Market:'}
                    </div>
                    <div className="font-medium">{item.market}</div>
                  </div>
                  
                  <div className="text-center text-xs text-gray-500">
                    {selectedLanguage === 'telugu' ? 'గత ధర:' : 'Previous:'} ₹{item.previousPrice.toLocaleString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Last Updated */}
        <div className="text-center mt-8 text-sm text-gray-600">
          {selectedLanguage === 'telugu' 
            ? 'చివరిగా అప్డేట్ చేయబడింది: నేడు 2:00 PM'
            : 'Last updated: Today 2:00 PM'
          }
        </div>
      </div>
    </div>
  );
};

export default Market;
