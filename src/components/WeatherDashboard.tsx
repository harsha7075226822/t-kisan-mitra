
import React, { useState, useEffect } from 'react';
import { Cloud, MapPin, Thermometer, Droplets, Wind, Sun, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const WeatherDashboard = () => {
  const [selectedCity, setSelectedCity] = useState('Hyderabad');
  const [inputCity, setInputCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeatherData = async (city) => {
    if (!city || city.trim() === '') {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=914201012eec468b088da3b4d6e806f3`
      );
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('City not found. Please check the spelling and try again.');
        }
        throw new Error('Weather data not available');
      }
      
      const data = await response.json();
      setWeatherData(data);
      console.log('Weather data fetched:', data);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data. Please try again.');
      console.error('Weather API error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(selectedCity);
  }, [selectedCity]);

  const handleGetWeather = () => {
    if (inputCity.trim()) {
      setSelectedCity(inputCity.trim());
    } else {
      setError('Please enter a city name');
    }
  };

  const handleInputChange = (e) => {
    setInputCity(e.target.value);
    if (error && e.target.value.trim()) {
      setError(''); // Clear error when user starts typing
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGetWeather();
    }
  };

  const getWeatherIcon = (condition) => {
    const conditionLower = condition?.toLowerCase() || '';
    if (conditionLower.includes('rain')) return '🌧️';
    if (conditionLower.includes('cloud')) return '☁️';
    if (conditionLower.includes('clear') || conditionLower.includes('sun')) return '☀️';
    if (conditionLower.includes('snow')) return '❄️';
    if (conditionLower.includes('thunderstorm')) return '⛈️';
    if (conditionLower.includes('mist') || conditionLower.includes('fog')) return '🌫️';
    return '🌤️';
  };

  const soilData = [
    { sensor: 'Field A', crop: 'Cotton', moisture: 65, status: 'Optimal', location: 'North Field' },
    { sensor: 'Field B', crop: 'Cotton', moisture: 35, status: 'Low', location: 'South Field' },
    { sensor: 'Field C', crop: 'Wheat', moisture: 55, status: 'Optimal', location: 'East Field' },
    { sensor: 'Field D', crop: 'Sugarcane', moisture: 75, status: 'High', location: 'West Field' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Optimal': return 'text-green-600';
      case 'High': return 'text-blue-600';
      case 'Low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Optimal': return 'bg-green-100 text-green-800 border-green-200';
      case 'High': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Low': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getFarmingAlert = (temp, humidity, windSpeed) => {
    if (temp > 35) return "High temperature - provide shade for crops and increase irrigation";
    if (humidity < 30) return "Low humidity - consider mulching to retain soil moisture";
    if (windSpeed > 20) return "High winds - secure tall crops and check for damage";
    if (temp >= 25 && temp <= 30 && humidity >= 50) return "Ideal conditions for most crops - good time for field activities";
    return "Monitor weather conditions regularly for optimal farming decisions";
  };

  const cropRecommendations = [
    { crop: 'Cotton', status: 'Recommended', reason: 'Suitable for current temperature range' },
    { crop: 'Wheat', status: 'Recommended', reason: 'Good soil moisture levels detected' },
    { crop: 'Maize', status: 'Recommended', reason: 'Optimal humidity conditions' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* City Input Section */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span>Select City</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-3">
              <Input
                type="text"
                placeholder="vikarabad"
                value={inputCity}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="flex-1 h-10"
              />
              <Button 
                onClick={handleGetWeather}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 px-6"
              >
                Get Weather
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Weather Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weather Cards Row */}
            {loading ? (
              <Card className="shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl mb-2">🔄</div>
                  <p>Fetching weather data...</p>
                </CardContent>
              </Card>
            ) : error ? (
              <Card className="shadow-sm border-red-200 bg-red-50">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl mb-2">⚠️</div>
                  <p className="text-red-700">{error}</p>
                </CardContent>
              </Card>
            ) : weatherData ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="shadow-sm">
                    <CardContent className="p-4 text-center">
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Current Location</div>
                      <div className="text-lg font-semibold">{weatherData.name}</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-sm">
                    <CardContent className="p-4 text-center">
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Active Fields</div>
                      <div className="text-lg font-semibold">4</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-sm">
                    <CardContent className="p-4 text-center">
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Temperature</div>
                      <div className="text-lg font-semibold">{Math.round(weatherData.main.temp - 1)}°C</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-sm">
                    <CardContent className="p-4 text-center">
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Soil Moisture</div>
                      <div className="text-lg font-semibold">58%</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Current Weather Main Card */}
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Current Weather</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-5xl mb-2">{Math.round(weatherData.main.temp - 1)}°C</div>
                        <div className="text-gray-600 capitalize mb-4">{weatherData.weather[0].description}</div>
                        <div className="text-sm text-green-600 font-medium">
                          Weather conditions favorable for farming
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <Droplets className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                          <div className="text-xs text-gray-500">Humidity</div>
                          <div className="font-semibold">{weatherData.main.humidity}%</div>
                        </div>
                        
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <Wind className="w-5 h-5 text-gray-500 mx-auto mb-1" />
                          <div className="text-xs text-gray-500">Wind Speed</div>
                          <div className="font-semibold">{weatherData.wind.speed} km/h</div>
                        </div>
                        
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <Thermometer className="w-5 h-5 text-red-500 mx-auto mb-1" />
                          <div className="text-xs text-gray-500">Feels Like</div>
                          <div className="font-semibold">{Math.round(weatherData.main.feels_like - 1)}°C</div>
                        </div>
                        
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <Sun className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                          <div className="text-xs text-gray-500">Visibility</div>
                          <div className="font-semibold">{weatherData.visibility ? (weatherData.visibility / 1000).toFixed(1) : 'N/A'} km</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : null}

            {/* Active Farming Alerts */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  Active Farming Alerts (1)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium text-red-800 mb-1">Low Soil Moisture - Alert</div>
                      <div className="text-sm text-red-700">1 field(s) need immediate irrigation (South Field)</div>
                      <div className="text-xs text-red-600 mt-1">Active: See irrigation →</div>
                    </div>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-xs">
                      See Action
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* AI Crop Recommendations */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <span className="text-orange-500 mr-2">🤖</span>
                  AI Crop Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600 mb-4">Recommended Crops</div>
                {cropRecommendations.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium">{item.crop}</div>
                      <Badge className="bg-green-100 text-green-800 text-xs">Recommended</Badge>
                    </div>
                    <div className="text-xs text-gray-600">{item.reason}</div>
                  </div>
                ))}
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                  <div className="text-sm font-medium text-yellow-800 mb-1">Farming Tips</div>
                  <div className="text-xs text-yellow-700 space-y-1">
                    <div>• Soil nutrients detection</div>
                    <div>• Detect market demand</div>
                    <div>• Calculate for recommendations</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Planting Calendar */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Planting Calendar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium mb-1">Next Planting Window</div>
                  <div className="text-xs text-gray-600">Based on weather forecast</div>
                  <div className="text-lg font-semibold text-blue-600">2-5 days</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-1">Harvest Season</div>
                  <div className="text-xs text-gray-600">Estimated timeline</div>
                  <div className="text-lg font-semibold text-green-600">90-120 days</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* IoT Soil Monitoring */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <span className="text-green-600 mr-2">🌱</span>
              IoT Soil Monitoring
            </CardTitle>
            <p className="text-sm text-gray-600">Real-time soil moisture levels across your fields</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {soilData.map((field, index) => (
                <Card key={index} className="shadow-sm border">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-medium text-sm">{field.sensor}</div>
                        <div className="text-xs text-gray-600">Crop: {field.crop}</div>
                        <div className="text-xs text-gray-500">{field.location}</div>
                      </div>
                      <Badge className={`text-xs border ${getStatusBadgeColor(field.status)}`}>
                        {field.status}
                      </Badge>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Soil Moisture</span>
                        <span className="font-medium">{field.moisture}%</span>
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
                    
                    <Button 
                      size="sm" 
                      className={`w-full text-xs ${
                        field.status === 'Low' ? 'bg-red-600 hover:bg-red-700' :
                        field.status === 'High' ? 'bg-blue-600 hover:bg-blue-700' :
                        'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      {field.status === 'Low' ? 'Trigger Now' :
                       field.status === 'High' ? 'Reduce Water' :
                       'Maintain Level'}
                    </Button>
                    
                    <div className="text-center mt-2">
                      <div className="text-lg font-bold">{index === 1 ? '1' : index === 0 ? '2' : '1'}</div>
                      <div className="text-xs text-gray-500">
                        {index === 1 ? 'Needs Irrigation' : index === 0 ? 'Fields Optimal' : 'Excess Moisture'}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WeatherDashboard;
