
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
  Bell
} from 'lucide-react';

const KisanDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('kisanUser');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const modules = [
    {
      title: 'बाजार जानकारी',
      subtitle: 'Market Insights',
      description: 'Crop prices and market trends',
      icon: TrendingUp,
      color: 'bg-blue-500',
      path: '/market'
    },
    {
      title: 'कृषि शिक्षा',
      subtitle: 'Education',
      description: 'Agricultural knowledge and training',
      icon: BookOpen,
      color: 'bg-green-500',
      path: '/education'
    },
    {
      title: 'मौसम अपडेट',
      subtitle: 'Weather',
      description: 'Localized alerts and forecasts',
      icon: Cloud,
      color: 'bg-sky-500',
      path: '/weather'
    },
    {
      title: 'सरकारी योजनाएं',
      subtitle: 'Government Schemes',
      description: 'Subsidy & benefits information',
      icon: Building2,
      color: 'bg-purple-500',
      path: '/schemes'
    },
    {
      title: 'ऑनलाइन मंडी',
      subtitle: 'Online Mandi',
      description: 'Buy and sell crops online',
      icon: ShoppingCart,
      color: 'bg-orange-500',
      path: '/mandi'
    },
    {
      title: 'आवाज सहायक',
      subtitle: 'Voice AI',
      description: 'Get help using voice (Telugu/Urdu)',
      icon: Mic,
      color: 'bg-red-500',
      path: '/voice'
    },
    {
      title: 'फसल स्कैनर',
      subtitle: 'Crop Scanner',
      description: 'Diagnose crop diseases via image',
      icon: Camera,
      color: 'bg-indigo-500',
      path: '/scanner'
    }
  ];

  const quickStats = [
    { label: 'आज का मौसम', value: '28°C', subtitle: 'Partly Cloudy', icon: '🌤️' },
    { label: 'धान की कीमत', value: '₹2,850', subtitle: 'per quintal', icon: '🌾' },
    { label: 'नई योजना', value: '3', subtitle: 'Available', icon: '📋' },
    { label: 'मंडी दूरी', value: '12 km', subtitle: 'Nearest', icon: '🚜' }
  ];

  const handleModuleClick = (path: string) => {
    navigate(path);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🌾</div>
          <h2 className="text-xl text-gray-600">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-cream-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🌾</div>
              <div>
                <h1 className="text-2xl font-bold text-green-800">Kisan Mitra AI</h1>
                <p className="text-sm text-green-600">कृषि में तकनीक का साथ – Telangana</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">अलर्ट</span>
              </Button>
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">सहायता</span>
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  स्वागत है, {user.name}! / Welcome, {user.name}!
                </h2>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>📱 {user.mobile}</span>
                  <span>🆔 आधार: {user.aadhaar}</span>
                  <Badge variant="outline" className="text-green-700 border-green-300">
                    सत्यापित किसान / Verified Farmer
                  </Badge>
                </div>
              </div>
              <div className="text-6xl opacity-20">👨‍🌾</div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="font-bold text-lg">{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.subtitle}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Modules */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            सेवाएं / Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {modules.map((module, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-shadow cursor-pointer border-gray-200 hover:border-green-300"
                onClick={() => handleModuleClick(module.path)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${module.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <module.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">{module.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{module.subtitle}</p>
                  <p className="text-xs text-gray-500">{module.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center border-t border-gray-200 pt-8">
          <div className="text-sm text-gray-600 space-y-2">
            <p>📞 सहायता हेल्पलाइन: 1800-XXX-XXXX (निःशुल्क)</p>
            <p>🌐 Support: support@kisanmitra.telangana.gov.in</p>
            <p className="text-xs">तेलंगाना सरकार की एक पहल / An initiative by Government of Telangana</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KisanDashboard;
