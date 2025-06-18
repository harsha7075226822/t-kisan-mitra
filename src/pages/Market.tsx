
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus, RefreshCw, ArrowLeft } from 'lucide-react';

const Market = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [marketData, setMarketData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Listen for global language changes
  useEffect(() => {
    const handleLanguageChange = (event) => {
      setSelectedLanguage(event.detail);
    };
    
    // Set initial language from localStorage
    const savedLanguage = localStorage.getItem('appLanguage') || 'english';
    setSelectedLanguage(savedLanguage);
    
    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  useEffect(() => {
    // Enhanced mock market data with real-time simulation
    const mockData = [
      {
        crop: { telugu: 'వరి', english: 'Paddy (Rice)' },
        price: 2850,
        previousPrice: 2800,
        unit: 'quintal',
        market: 'Hyderabad APMC',
        quality: 'Grade A',
        trend: 'up'
      },
      {
        crop: { telugu: 'పత్తి', english: 'Cotton' },
        price: 6200,
        previousPrice: 6100,
        unit: 'quintal',
        market: 'Karimnagar',
        quality: 'Medium Staple',
        trend: 'up'
      },
      {
        crop: { telugu: 'పసుపు', english: 'Turmeric' },
        price: 14500,
        previousPrice: 14800,
        unit: 'quintal',
        market: 'Nizamabad',
        quality: 'Salem Quality',
        trend: 'down'
      },
      {
        crop: { telugu: 'మొక్కజొన్న', english: 'Maize (Corn)' },
        price: 2200,
        previousPrice: 2150,
        unit: 'quintal',
        market: 'Warangal',
        quality: 'Yellow Corn',
        trend: 'up'
      },
      {
        crop: { telugu: 'కందుల', english: 'Red Gram (Tur)' },
        price: 7800,
        previousPrice: 7750,
        unit: 'quintal',
        market: 'Mahbubnagar',
        quality: 'FAQ',
        trend: 'up'
      },
      {
        crop: { telugu: 'సోయాబీన్', english: 'Soybean' },
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

  const text = {
    title: {
      english: 'Market Prices',
      telugu: 'మార్కెట్ ధరలు'
    },
    subtitle: {
      english: "Today's Mandi Rates - Telangana & Andhra Pradesh",
      telugu: 'నేటి మండి ధరలు - తెలంగాణ & ఆంధ్రప్రదేశ్'
    },
    perQuintal: {
      english: 'per quintal',
      telugu: 'ప్రతి క్వింటల్'
    },
    market: {
      english: 'Market:',
      telugu: 'మార్కెట్:'
    },
    quality: {
      english: 'Quality:',
      telugu: 'నాణ్యత:'
    },
    previous: {
      english: 'Previous:',
      telugu: 'గత ధర:'
    },
    change: {
      english: 'Change:',
      telugu: 'మార్పు:'
    },
    lastUpdated: {
      english: 'Last updated:',
      telugu: 'చివరిగా అప్డేట్ చేయబడింది:'
    },
    refresh: {
      english: 'Refresh Prices',
      telugu: 'ధరలను రిఫ్రెష్ చేయండి'
    }
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
                {text.title[selectedLanguage]}
              </h1>
              <p className="text-green-600">
                {text.subtitle[selectedLanguage]}
              </p>
            </div>
            <Button onClick={refreshData} className="bg-green-600 hover:bg-green-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              {text.refresh[selectedLanguage]}
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
                      {item.crop[selectedLanguage]}
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
                        {text.perQuintal[selectedLanguage]}
                      </div>
                    </div>
                    
                    <div className="text-center border-t pt-3">
                      <div className="text-sm text-gray-600">
                        {text.market[selectedLanguage]}
                      </div>
                      <div className="font-medium">{item.market}</div>
                    </div>
                    
                    <div className="text-center text-xs">
                      <div className="text-gray-500">
                        {text.previous[selectedLanguage]} ₹{item.previousPrice.toLocaleString()}
                      </div>
                      <div className={`font-medium ${priceChange.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {text.change[selectedLanguage]} {priceChange.change >= 0 ? '+' : ''}₹{Math.round(priceChange.change)} ({priceChange.percentage}%)
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
              {selectedLanguage === 'english' ? 'Market Information' : 'మార్కెట్ సమాచారం'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-blue-700 mb-2">
                  {selectedLanguage === 'english' 
                    ? '• Prices are for Grade A quality unless specified'
                    : '• ధరలు గ్రేడ్ A నాణ్యతకు తప్ప వేరుగా పేర్కొనబడనంత వరకు'
                  }
                </p>
                <p className="text-blue-700">
                  {selectedLanguage === 'english' 
                    ? '• Rates may vary based on quality and quantity'
                    : '• ధరలు నాణ్యత మరియు పరిమాణం ఆధారంగా మారవచ్చు'
                  }
                </p>
              </div>
              <div className="text-right">
                <p className="text-blue-600 text-xs">
                  {text.lastUpdated[selectedLanguage]} {lastUpdated.toLocaleTimeString()}
                </p>
                <p className="text-blue-600 text-xs">
                  {selectedLanguage === 'english' 
                    ? 'Data source: APMC & Telangana Mandi Board'
                    : 'డేటా మూలం: APMC & తెలంగాణ మండి బోర్డ్'
                  }
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
