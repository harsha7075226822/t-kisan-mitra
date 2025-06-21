
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, Mic } from 'lucide-react';

interface NavigationProps {
  showBackButton?: boolean;
  title?: string;
}

const Navigation: React.FC<NavigationProps> = ({ showBackButton = true, title }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
      <div className="flex items-center space-x-3">
        {showBackButton && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}
        {title && (
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate('/dashboard')}
          className="hover:bg-green-50"
        >
          <Home className="w-4 h-4 mr-2" />
          Dashboard
        </Button>
        
        {location.pathname !== '/voice' && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/voice')}
            className="hover:bg-green-50"
          >
            <Mic className="w-4 h-4 mr-2" />
            Voice AI
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navigation;
