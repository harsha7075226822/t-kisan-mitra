
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface WelcomeSectionProps {
  user: any;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ user }) => {
  const navigate = useNavigate();

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
  );
};

export default WelcomeSection;
