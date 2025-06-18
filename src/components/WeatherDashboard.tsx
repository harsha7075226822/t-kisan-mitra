
import React from 'react';
import { Cloud, MapPin, Thermometer, Droplets, Wind, Sun } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const WeatherDashboard = () => {
  const currentWeather = {
    location: 'Hyderabad, Telangana',
    temperature: 32,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    uvIndex: 7,
    rainfall: 0,
    forecast: [
      { day: 'Today', temp: '32°/26°', condition: 'Partly Cloudy', icon: '⛅', rain: '10%' },
      { day: 'Tomorrow', temp: '34°/28°', condition: 'Sunny', icon: '☀️', rain: '5%' },
      { day: 'Thu', temp: '29°/24°', condition: 'Rainy', icon: '🌧️', rain: '80%' },
      { day: 'Fri', temp: '31°/25°', condition: 'Cloudy', icon: '☁️', rain: '20%' },
      { day: 'Sat', temp: '33°/27°', condition: 'Sunny', icon: '☀️', rain: '0%' },
    ]
  };

  const soilData = [
    { sensor: 'Field A - Cotton', moisture: 45, status: 'Optimal', location: 'Sector 1' },
    { sensor: 'Field B - Rice', moisture: 72, status: 'High', location: 'Sector 2' },
    { sensor: 'Field C - Tomato', moisture: 35, status: 'Low', location: 'Sector 3' },
    { sensor: 'Field D - Wheat', moisture: 55, status: 'Optimal', location: 'Sector 4' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Optimal': return 'bg-green-100 text-green-800';
      case 'High': return 'bg-blue-100 text-blue-800';
      case 'Low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Weather */}
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Cloud className="w-6 h-6 text-blue-600" />
            <span>Current Weather</span>
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{currentWeather.location}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">⛅</div>
              <div className="text-3xl font-bold text-blue-800">{currentWeather.temperature}°C</div>
              <div className="text-gray-600">{currentWeather.condition}</div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Humidity: {currentWeather.humidity}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wind className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Wind: {currentWeather.windSpeed} km/h</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Sun className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">UV Index: {currentWeather.uvIndex}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Cloud className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Rainfall: {currentWeather.rainfall} mm</span>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-sm font-medium text-yellow-800">Farming Alert</div>
              <div className="text-xs text-yellow-700 mt-1">
                Good conditions for irrigation. UV levels high - protect crops.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5-Day Forecast */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle>5-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {currentWeather.forecast.map((day, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="font-medium text-gray-800">{day.day}</div>
                <div className="text-3xl my-2">{day.icon}</div>
                <div className="text-sm font-medium">{day.temp}</div>
                <div className="text-xs text-gray-600 mt-1">{day.condition}</div>
                <div className="text-xs text-blue-600 mt-1">Rain: {day.rain}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Soil Monitoring */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="text-xl">🌱</div>
            <span>IoT Soil Monitoring</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {soilData.map((field, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-medium text-gray-800">{field.sensor}</div>
                    <div className="text-sm text-gray-600">{field.location}</div>
                  </div>
                  <Badge className={getStatusColor(field.status)}>
                    {field.status}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Soil Moisture</span>
                      <span>{field.moisture}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          field.moisture < 40 ? 'bg-red-500' :
                          field.moisture > 60 ? 'bg-blue-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${field.moisture}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-2xl">
                    {field.moisture < 40 ? '🏜️' : field.moisture > 60 ? '💧' : '🌱'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherDashboard;
