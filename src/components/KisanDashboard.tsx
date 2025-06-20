
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LoadingSpinner from '@/components/LoadingSpinner';
import HealYourCrop from '@/components/HealYourCrop';
import SmartCropAssistant from '@/components/SmartCropAssistant';
import MarketCards from '@/components/MarketCards';
import MachinerySubsidyStore from '@/components/MachinerySubsidyStore';
import FloatingVoiceButton from '@/components/FloatingVoiceButton';
import { 
  TrendingUp, 
  BookOpen, 
  Building2, 
  ShoppingCart, 
  Phone,
  Beaker,
  Sprout,
  CloudSun,
  Wrench
} from 'lucide-react';

const KisanDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showMachineryStore, setShowMachineryStore] = useState(false);
  const navigate = useNavigate();

  // Memoized modules data
  const modules = useMemo(() => [
    {
      title: 'Weather Insights',
      description: 'Live weather & soil monitoring',
      icon: CloudSun,
      color: 'bg-sky-500',
      path: '/weather'
    },
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
      title: 'Seeds Container',
      description: 'Quality seeds with pricing',
      icon: Sprout,
      color: 'bg-emerald-500',
      path: '/seeds'
    },
    {
      title: 'Pesticides',
      description: 'Quality pesticides for crop protection',
      icon: Beaker,
      color: 'bg-rose-500',
      path: '/pesticides'
    },
    {
      title: 'Machinery Subsidy Store',
      description: 'Government-subsidized farm machinery',
      icon: Wrench,
      color: 'bg-amber-500',
      path: null, // No navigation, opens modal instead
      action: 'machinery-store'
    }
  ], []);

  useEffect(() => {
    let mounted = true;

    const initializeDashboard = async () => {
      try {
        // Get user data from localStorage
        const userData = localStorage.getItem('kisanUser');
        if (userData && mounted) {
          setUser(JSON.parse(userData));
        }
        
        if (mounted) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Dashboard initialization error:', error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  const handleModuleClick = (path: string | null, action?: string) => {
    if (action === 'machinery-store') {
      setShowMachineryStore(true);
    } else if (path) {
      navigate(path);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <LoadingSpinner size="lg" text="Loading your dashboard..." />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🌾</div>
          <h2 className="text-xl text-gray-600">Please log in to continue</h2>
          <Button 
            onClick={() => navigate('/login')} 
            className="mt-4 bg-green-600 hover:bg-green-700"
          >
            Go to Login
          </Button>
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

        {/* Heal Your Crop Section */}
        <HealYourCrop />

        {/* Smart Crop Assistant Section */}
        <SmartCropAssistant />

        {/* Services Section */}
        <div className="mb-6 sm:mb-8">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
            Services
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {modules.map((module, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all duration-200 cursor-pointer border-gray-200 hover:border-green-300 hover:scale-105 active:scale-95"
                onClick={() => handleModuleClick(module.path, module.action)}
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

        {/* Agricultural Markets Section */}
        <div className="mb-6 sm:mb-8">
          <MarketCards />
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

      {/* Floating Voice Assistant Button */}
      <FloatingVoiceButton />

      {/* Machinery Subsidy Store Modal */}
      {showMachineryStore && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Machinery Subsidy Store</h2>
              <Button 
                variant="outline" 
                onClick={() => setShowMachineryStore(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕ Close
              </Button>
            </div>
            <div className="p-4">
              <MachinerySubsidyStore />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KisanDashboard;
