import React, { useState, useEffect } from 'react';
import { Cloud, MapPin, Thermometer, Droplets, Wind, Sun, Search, Heart, Zap } from 'lucide-react';
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
      setError('');
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
      case 'Optimal': return 'text-emerald-600';
      case 'High': return 'text-blue-600';
      case 'Low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Optimal': return 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border-emerald-200';
      case 'High': return 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200';
      case 'Low': return 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border-red-200';
      default: return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200';
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
    { crop: '🌾 Cotton', status: 'Recommended', reason: 'Perfect for current temperature range', color: 'bg-gradient-to-r from-yellow-50 to-orange-50 border-orange-200' },
    { crop: '🌱 Wheat', status: 'Recommended', reason: 'Excellent soil moisture detected', color: 'bg-gradient-to-r from-green-50 to-emerald-50 border-emerald-200' },
    { crop: '🌽 Maize', status: 'Recommended', reason: 'Optimal humidity conditions', color: 'bg-gradient-to-r from-blue-50 to-indigo-50 border-indigo-200' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* City Input Section */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-white via-blue-50 to-indigo-50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-3 text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              <MapPin className="w-6 h-6 text-blue-600 animate-pulse" />
              <span className="font-bold">🌍 Discover Your City's Weather</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Input
                type="text"
                placeholder="Enter your dream destination..."
                value={inputCity}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="flex-1 h-12 text-lg border-2 border-blue-200 focus:border-purple-400 rounded-xl bg-white/80 backdrop-blur-sm"
              />
              <Button 
                onClick={handleGetWeather}
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 h-12 rounded-xl font-semibold text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Search className="w-5 h-5 mr-2" />
                Explore Weather
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Weather Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Weather Cards Row */}
            {loading ? (
              <Card className="shadow-xl border-0 bg-gradient-to-r from-yellow-100 to-orange-100">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4 animate-spin">🌟</div>
                  <p className="text-lg font-semibold text-orange-800">Fetching magical weather data...</p>
                </CardContent>
              </Card>
            ) : error ? (
              <Card className="shadow-xl border-0 bg-gradient-to-r from-red-100 to-pink-100">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">⚠️</div>
                  <p className="text-red-700 font-semibold text-lg">{error}</p>
                </CardContent>
              </Card>
            ) : weatherData ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-100 to-pink-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <div className="text-xs text-purple-600 uppercase tracking-wider mb-2 font-bold">📍 Current Location</div>
                      <div className="text-xl font-bold text-purple-800">{weatherData.name}</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-lg border-0 bg-gradient-to-br from-green-100 to-emerald-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <div className="text-xs text-emerald-600 uppercase tracking-wider mb-2 font-bold">🌾 Active Fields</div>
                      <div className="text-xl font-bold text-emerald-800">4</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-100 to-red-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <div className="text-xs text-orange-600 uppercase tracking-wider mb-2 font-bold">🌡️ Temperature</div>
                      <div className="text-xl font-bold text-orange-800">{Math.round(weatherData.main.temp - 1)}°C</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-100 to-cyan-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <div className="text-xs text-blue-600 uppercase tracking-wider mb-2 font-bold">💧 Soil Moisture</div>
                      <div className="text-xl font-bold text-blue-800">58%</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Current Weather Main Card */}
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-white via-blue-50 to-indigo-100 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <CardTitle className="text-2xl font-bold flex items-center">
                      <Sun className="w-8 h-8 mr-3 animate-pulse" />
                      Current Weather Magic ✨
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="text-center bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-6">
                        <div className="text-7xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
                          {Math.round(weatherData.main.temp - 1)}°C
                        </div>
                        <div className="text-gray-700 capitalize mb-4 text-lg font-semibold">
                          {getWeatherIcon(weatherData.weather[0].main)} {weatherData.weather[0].description}
                        </div>
                        <div className="text-sm text-emerald-600 font-bold bg-emerald-100 px-4 py-2 rounded-full">
                          🌱 Perfect farming weather ahead!
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl shadow-md hover:shadow-lg transition-all">
                          <Droplets className="w-8 h-8 text-blue-500 mx-auto mb-2 animate-bounce" />
                          <div className="text-xs text-blue-600 font-bold">💧 Humidity</div>
                          <div className="font-bold text-lg text-blue-800">{weatherData.main.humidity}%</div>
                        </div>
                        
                        <div className="text-center p-4 bg-gradient-to-br from-gray-100 to-slate-100 rounded-xl shadow-md hover:shadow-lg transition-all">
                          <Wind className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                          <div className="text-xs text-gray-600 font-bold">💨 Wind Speed</div>
                          <div className="font-bold text-lg text-gray-800">{weatherData.wind.speed} km/h</div>
                        </div>
                        
                        <div className="text-center p-4 bg-gradient-to-br from-red-100 to-pink-100 rounded-xl shadow-md hover:shadow-lg transition-all">
                          <Thermometer className="w-8 h-8 text-red-500 mx-auto mb-2" />
                          <div className="text-xs text-red-600 font-bold">🌡️ Feels Like</div>
                          <div className="font-bold text-lg text-red-800">{Math.round(weatherData.main.feels_like - 1)}°C</div>
                        </div>
                        
                        <div className="text-center p-4 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-xl shadow-md hover:shadow-lg transition-all">
                          <Sun className="w-8 h-8 text-yellow-500 mx-auto mb-2 animate-pulse" />
                          <div className="text-xs text-yellow-600 font-bold">👁️ Visibility</div>
                          <div className="font-bold text-lg text-yellow-800">{weatherData.visibility ? (weatherData.visibility / 1000).toFixed(1) : 'N/A'} km</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : null}

            {/* Active Farming Alerts */}
            <Card className="shadow-xl border-0 bg-gradient-to-r from-red-50 to-pink-50">
              <CardHeader className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-t-lg">
                <CardTitle className="text-xl font-bold flex items-center">
                  <Heart className="w-6 h-6 mr-3 animate-pulse" />
                  🚨 Passionate Farming Alerts (1)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-gradient-to-r from-red-100 to-rose-100 border-2 border-red-300 rounded-xl p-6 shadow-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-red-800 mb-2 text-lg flex items-center">
                        <Zap className="w-5 h-5 mr-2 animate-pulse" />
                        💧 Critical: Low Soil Moisture Alert!
                      </div>
                      <div className="text-sm text-red-700 font-semibold">1 field desperately needs irrigation (South Field) 🌾</div>
                      <div className="text-xs text-red-600 mt-2 font-bold">⚡ Immediate action required →</div>
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-sm font-bold shadow-lg transform hover:scale-105 transition-all">
                      Take Action Now! 🚀
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* AI Crop Recommendations */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-orange-50 to-yellow-50">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-t-lg">
                <CardTitle className="text-xl font-bold flex items-center">
                  <span className="text-2xl mr-3">🤖</span>
                  AI Crop Recommendations ✨
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="text-sm text-gray-700 mb-4 font-semibold">🌟 Recommended Passionate Crops</div>
                {cropRecommendations.map((item, index) => (
                  <div key={index} className={`border-2 rounded-xl p-4 shadow-md hover:shadow-lg transition-all transform hover:scale-105 ${item.color}`}>
                    <div className="flex justify-between items-start mb-3">
                      <div className="font-bold text-lg">{item.crop}</div>
                      <Badge className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 text-sm font-bold border-emerald-300">
                        ✅ Recommended
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-700 font-semibold">{item.reason}</div>
                  </div>
                ))}
                
                <div className="bg-gradient-to-r from-yellow-100 to-amber-100 border-2 border-yellow-300 rounded-xl p-4 mt-6 shadow-lg">
                  <div className="text-lg font-bold text-yellow-800 mb-2 flex items-center">
                    <span className="mr-2">💡</span>
                    Passionate Farming Tips
                  </div>
                  <div className="text-sm text-yellow-700 space-y-2 font-semibold">
                    <div className="flex items-center">
                      <span className="mr-2">🧪</span>
                      Advanced soil nutrients detection
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">📈</span>
                      Real-time market demand analysis
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">🎯</span>
                      AI-powered yield predictions
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Planting Calendar */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
                <CardTitle className="text-xl font-bold flex items-center">
                  <span className="mr-3">📅</span>
                  Planting Calendar Magic
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl p-4 shadow-md">
                  <div className="text-lg font-bold mb-2 text-blue-800 flex items-center">
                    <span className="mr-2">🌱</span>
                    Next Planting Window
                  </div>
                  <div className="text-sm text-blue-600 font-semibold">Based on passionate weather forecast</div>
                  <div className="text-2xl font-bold text-blue-700 mt-2">2-5 days ⏰</div>
                </div>
                
                <div className="bg-gradient-to-r from-emerald-100 to-green-100 rounded-xl p-4 shadow-md">
                  <div className="text-lg font-bold mb-2 text-emerald-800 flex items-center">
                    <span className="mr-2">🌾</span>
                    Harvest Season
                  </div>
                  <div className="text-sm text-emerald-600 font-semibold">Estimated golden timeline</div>
                  <div className="text-2xl font-bold text-emerald-700 mt-2">90-120 days 🎉</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* IoT Soil Monitoring */}
        <Card className="shadow-2xl border-0 bg-gradient-to-br from-white via-green-50 to-emerald-50">
          <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold flex items-center">
              <span className="text-3xl mr-4">🌱</span>
              IoT Soil Monitoring Paradise
            </CardTitle>
            <p className="text-green-100 font-semibold">Real-time passionate soil monitoring across your dream fields</p>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {soilData.map((field, index) => (
                <Card key={index} className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="font-bold text-lg text-gray-800">{field.sensor}</div>
                        <div className="text-sm text-gray-600 font-semibold">🌾 Crop: {field.crop}</div>
                        <div className="text-sm text-gray-500">{field.location}</div>
                      </div>
                      <Badge className={`text-sm border-2 font-bold ${getStatusBadgeColor(field.status)}`}>
                        {field.status}
                      </Badge>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-bold text-gray-700">💧 Soil Moisture</span>
                        <span className="font-bold text-lg">{field.moisture}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                        <div 
                          className={`h-3 rounded-full shadow-lg transition-all duration-500 ${
                            field.moisture < 40 ? 'bg-gradient-to-r from-red-400 to-red-600' :
                            field.moisture > 60 ? 'bg-gradient-to-r from-blue-400 to-blue-600' : 'bg-gradient-to-r from-green-400 to-green-600'
                          }`}
                          style={{ width: `${field.moisture}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      className={`w-full text-sm font-bold shadow-lg transform hover:scale-105 transition-all duration-200 ${
                        field.status === 'Low' ? 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700' :
                        field.status === 'High' ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700' :
                        'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                      }`}
                    >
                      {field.status === 'Low' ? '🚀 Trigger Now!' :
                       field.status === 'High' ? '💧 Reduce Water' :
                       '✨ Maintain Perfect Level'}
                    </Button>
                    
                    <div className="text-center mt-4 bg-gradient-to-r from-gray-100 to-slate-100 rounded-lg p-3">
                      <div className="text-2xl font-bold text-gray-800">{index === 1 ? '1' : index === 0 ? '2' : '1'}</div>
                      <div className="text-xs text-gray-600 font-semibold">
                        {index === 1 ? '⚡ Needs Irrigation' : index === 0 ? '🌟 Fields Optimal' : '💧 Excess Moisture'}
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
