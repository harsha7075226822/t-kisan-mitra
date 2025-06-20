
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { 
  TrendingUp, 
  BookOpen, 
  Building2, 
  ShoppingCart,
  Beaker,
  Sprout,
  CloudSun
} from 'lucide-react';

const ServicesGrid: React.FC = () => {
  const navigate = useNavigate();

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
    }
  ], []);

  const handleModuleClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="mb-6 sm:mb-8">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
        Services
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
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
  );
};

export default ServicesGrid;
