
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import WeatherDashboard from '@/components/WeatherDashboard';

const Weather = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Weather & IoT Monitoring</h1>
          <p className="text-gray-600 mt-2">Real-time weather data and soil monitoring for informed farming decisions</p>
        </div>
        <WeatherDashboard />
      </div>
    </div>
  );
};

export default Weather;
