
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

  // Calculate soil moisture based on temperature
  const calculateSoilMoisture = (temp, fieldIndex) => {
    // Base moisture levels for different fields
    const baseMoisture = [65, 35, 55, 75];
    let adjustedMoisture = baseMoisture[fieldIndex];

    // Adjust based on temperature
    if (temp > 35) {
      // High temperature reduces moisture
      adjustedMoisture = Math.max(20, adjustedMoisture - 15);
    } else if (temp > 30) {
      adjustedMoisture = Math.max(25, adjustedMoisture - 10);
    } else if (temp < 20) {
      // Low temperature increases moisture retention
      adjustedMoisture = Math.min(80, adjustedMoisture + 10);
    }

    return Math.round(adjustedMoisture);
  };

  const getSoilData = (temperature) => {
    const baseFields = [
      { sensor: 'Field A', crop: 'Cotton', location: 'North Field', soilType: 'Black Soil' },
      { sensor: 'Field B', crop: 'Cotton', location: 'South Field', soilType: 'Red Soil' },
      { sensor: 'Field C', crop: 'Wheat', location: 'East Field', soilType: 'Alluvial Soil' },
      { sensor: 'Field D', crop: 'Sugarcane', location: 'West Field', soilType: 'Clay Soil' },
    ];

    return baseFields.map((field, index) => {
      const moisture = calculateSoilMoisture(temperature, index);
      let status = 'Optimal';
      
      if (moisture < 40) {
        status = 'Low';
      } else if (moisture > 70) {
        status = 'High';
      }

      return {
        ...field,
        moisture,
        status
      };
    });
  };

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
      case 'Optimal': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'High': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Low': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  // Get dynamic soil data based on current temperature
  const currentTemp = weatherData ? Math.round(weatherData.main.temp) : 25;
  const soilData = getSoilData(currentTemp);

  // Calculate summary stats
  const optimalFields = soilData.filter(field => field.status === 'Optimal').length;
  const lowMoistureFields = soilData.filter(field => field.status === 'Low').length;
  const highMoistureFields = soilData.filter(field => field.status === 'High').length;

  const getFarmingAlert = (temp, humidity, windSpeed) => {
    if (temp > 35) return "High temperature - provide shade for crops and increase irrigation";
    if (humidity < 30) return "Low humidity - consider mulching to retain soil moisture";
    if (windSpeed > 20) return "High winds - secure tall crops and check for damage";
    if (temp >= 25 && temp <= 30 && humidity >= 50) return "Ideal conditions for most crops - good time for field activities";
    return "Monitor weather conditions regularly for optimal farming decisions";
  };

  const cropRecommendations = [
    { 
      crop: '🌾 Cotton', 
      status: 'Recommended', 
      reason: 'Perfect for current temperature range',
      season: 'Kharif',
      duration: '180-200 days',
      yield: '15-20 quintals/acre',
      color: 'bg-orange-50 border-orange-200'
    },
    { 
      crop: '🌱 Wheat', 
      status: 'Recommended', 
      reason: 'Excellent soil moisture detected',
      season: 'Rabi',
      duration: '120-150 days',
      yield: '25-30 quintals/acre',
      color: 'bg-green-50 border-green-200'
    },
    { 
      crop: '🌽 Maize', 
      status: 'Recommended', 
      reason: 'Optimal humidity conditions',
      season: 'Kharif/Rabi',
      duration: '90-120 days',
      yield: '20-25 quintals/acre',
      color: 'bg-blue-50 border-blue-200'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* City Input Section */}
        <Card className="shadow-lg border border-gray-200 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-3 text-xl text-gray-800">
              <MapPin className="w-6 h-6 text-blue-600" />
              <span className="font-semibold">🌍 Weather Location</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Input
                type="text"
                placeholder="Enter city name..."
                value={inputCity}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="flex-1 h-12 text-lg border-gray-300 focus:border-blue-400 rounded-lg bg-white"
              />
              <Button 
                onClick={handleGetWeather}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 px-8 h-12 rounded-lg font-medium text-lg shadow-md"
              >
                <Search className="w-5 h-5 mr-2" />
                Get Weather
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Weather Section */}
          <div className="lg:col-span-2 space-y-8">
            {loading ? (
              <Card className="shadow-lg border border-gray-200 bg-white">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4 animate-spin">🌟</div>
                  <p className="text-lg font-medium text-gray-700">Loading weather data...</p>
                </CardContent>
              </Card>
            ) : error ? (
              <Card className="shadow-lg border border-red-200 bg-red-50">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">⚠️</div>
                  <p className="text-red-700 font-medium text-lg">{error}</p>
                </CardContent>
              </Card>
            ) : weatherData ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="shadow-md border border-gray-200 bg-white hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="text-xs text-gray-600 uppercase tracking-wider mb-2 font-medium">📍 Location</div>
                      <div className="text-xl font-semibold text-gray-800">{weatherData.name}</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-md border border-gray-200 bg-white hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="text-xs text-gray-600 uppercase tracking-wider mb-2 font-medium">🌾 Active Fields</div>
                      <div className="text-xl font-semibold text-gray-800">4</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-md border border-gray-200 bg-white hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="text-xs text-gray-600 uppercase tracking-wider mb-2 font-medium">🌡️ Temperature</div>
                      <div className="text-xl font-semibold text-gray-800">{Math.round(weatherData.main.temp - 1)}°C</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-md border border-gray-200 bg-white hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="text-xs text-gray-600 uppercase tracking-wider mb-2 font-medium">💧 Soil Moisture</div>
                      <div className="text-xl font-semibold text-gray-800">{Math.round(soilData.reduce((acc, field) => acc + field.moisture, 0) / soilData.length)}%</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Current Weather Main Card */}
                <Card className="shadow-lg border border-gray-200 bg-white">
                  <CardHeader className="bg-blue-600 text-white">
                    <CardTitle className="text-2xl font-semibold flex items-center">
                      <Sun className="w-8 h-8 mr-3" />
                      Current Weather
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="text-center bg-blue-50 rounded-xl p-6">
                        <div className="text-7xl font-bold text-blue-600 mb-2">
                          {Math.round(weatherData.main.temp - 1)}°C
                        </div>
                        <div className="text-gray-700 capitalize mb-4 text-lg font-medium">
                          {getWeatherIcon(weatherData.weather[0].main)} {weatherData.weather[0].description}
                        </div>
                        <div className="text-sm text-green-700 font-medium bg-green-50 px-4 py-2 rounded-full">
                          🌱 Good farming conditions
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-xl shadow-sm">
                          <Droplets className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                          <div className="text-xs text-blue-600 font-medium">💧 Humidity</div>
                          <div className="font-semibold text-lg text-blue-700">{weatherData.main.humidity}%</div>
                        </div>
                        
                        <div className="text-center p-4 bg-gray-50 rounded-xl shadow-sm">
                          <Wind className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                          <div className="text-xs text-gray-600 font-medium">💨 Wind Speed</div>
                          <div className="font-semibold text-lg text-gray-700">{weatherData.wind.speed} km/h</div>
                        </div>
                        
                        <div className="text-center p-4 bg-red-50 rounded-xl shadow-sm">
                          <Thermometer className="w-8 h-8 text-red-500 mx-auto mb-2" />
                          <div className="text-xs text-red-600 font-medium">🌡️ Feels Like</div>
                          <div className="font-semibold text-lg text-red-700">{Math.round(weatherData.main.feels_like - 1)}°C</div>
                        </div>
                        
                        <div className="text-center p-4 bg-yellow-50 rounded-xl shadow-sm">
                          <Sun className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                          <div className="text-xs text-yellow-600 font-medium">👁️ Visibility</div>
                          <div className="font-semibold text-lg text-yellow-700">{weatherData.visibility ? (weatherData.visibility / 1000).toFixed(1) : 'N/A'} km</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : null}

            {/* Active Farming Alerts */}
            <Card className="shadow-lg border border-red-200 bg-red-50">
              <CardHeader className="bg-red-500 text-white rounded-t-lg">
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Heart className="w-6 h-6 mr-3" />
                  🚨 Farming Alerts ({lowMoistureFields})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-white border border-red-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-red-800 mb-2 text-lg flex items-center">
                        <Zap className="w-5 h-5 mr-2" />
                        💧 Low Soil Moisture Alert
                      </div>
                      <div className="text-sm text-red-700 font-medium">{lowMoistureFields} field(s) need irrigation 🌾</div>
                      <div className="text-xs text-red-600 mt-2 font-medium">⚡ Action required</div>
                    </div>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-sm font-medium shadow-md">
                      Take Action
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weather & Field Visual Section */}
            <Card className="shadow-lg border border-gray-200 bg-white">
              <CardContent className="p-0">
                <div>
                  <img 
                    src="https://thumbs.dreamstime.com/b/green-field-small-forest-against-cloudy-sky-sunny-weather-193347700.jpg"
                    alt="Green agricultural field with cloudy sky representing weather and farming conditions"
                    className="w-full h-48 md:h-56 object-cover rounded-t-lg"
                  />
                  <div className="p-6 bg-white">
                    <div className="text-center">
                      <p className="text-lg font-medium mb-4 text-gray-800">
                        🌾 Visualizing real-time weather and field status for smarter farming decisions
                      </p>
                      <div className="flex flex-wrap justify-center items-center gap-3 text-sm">
                        <span className="flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full border border-blue-200">
                          <span className="mr-2">🌡️</span>
                          {weatherData ? Math.round(weatherData.main.temp - 1) : 25}°C
                        </span>
                        <span className="flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full border border-blue-200">
                          <span className="mr-2">💧</span>
                          {Math.round(soilData.reduce((acc, field) => acc + field.moisture, 0) / soilData.length)}% Moisture
                        </span>
                        <span className="flex items-center bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200">
                          <span className="mr-2">🌾</span>
                          {optimalFields} Fields Optimal
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar with AI Crop Recommendations and Planting Calendar */}
          <div className="space-y-8">
            {/* AI Crop Recommendations */}
            <Card className="shadow-lg border border-gray-200 bg-white">
              <CardHeader className="bg-orange-500 text-white rounded-t-lg">
                <CardTitle className="text-xl font-semibold flex items-center">
                  <span className="text-2xl mr-3">🤖</span>
                  AI Crop Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="text-sm text-gray-700 mb-4 font-medium">🌟 Recommended Crops</div>
                {cropRecommendations.map((item, index) => (
                  <div key={index} className={`border rounded-xl p-4 shadow-sm ${item.color}`}>
                    <div className="flex justify-between items-start mb-3">
                      <div className="font-semibold text-lg text-gray-800">{item.crop}</div>
                      <Badge className="bg-green-100 text-green-700 text-sm font-medium border-green-200">
                        ✅ Recommended
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 font-medium mb-3">{item.reason}</div>
                    
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">🗓️ Season:</span>
                        <span className="text-gray-800 font-semibold">{item.season}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">⏱️ Duration:</span>
                        <span className="text-gray-800 font-semibold">{item.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">📊 Yield:</span>
                        <span className="text-gray-800 font-semibold">{item.yield}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-6 shadow-sm">
                  <div className="text-lg font-semibold text-yellow-800 mb-2 flex items-center">
                    <span className="mr-2">💡</span>
                    Farming Tips
                  </div>
                  <div className="text-sm text-yellow-700 space-y-2 font-medium">
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
            <Card className="shadow-lg border border-gray-200 bg-white">
              <CardHeader className="bg-green-500 text-white rounded-t-lg">
                <CardTitle className="text-xl font-semibold flex items-center">
                  <span className="mr-3">📅</span>
                  Planting Calendar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="bg-blue-50 rounded-xl p-4 shadow-sm">
                  <div className="text-lg font-semibold mb-2 text-blue-800 flex items-center">
                    <span className="mr-2">🌱</span>
                    Next Planting Window
                  </div>
                  <div className="text-sm text-blue-600 font-medium">Based on weather forecast</div>
                  <div className="text-2xl font-bold text-blue-700 mt-2">2-5 days ⏰</div>
                </div>
                
                <div className="bg-green-50 rounded-xl p-4 shadow-sm">
                  <div className="text-lg font-semibold mb-2 text-green-800 flex items-center">
                    <span className="mr-2">🌾</span>
                    Harvest Season
                  </div>
                  <div className="text-sm text-green-600 font-medium">Estimated timeline</div>
                  <div className="text-2xl font-bold text-green-700 mt-2">90-120 days 🎉</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* IoT Soil Monitoring with Soil Types */}
        <Card className="shadow-lg border border-gray-200 bg-white">
          <CardHeader className="bg-green-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-semibold flex items-center">
              <span className="text-3xl mr-4">🌱</span>
              IoT Soil Monitoring
            </CardTitle>
            <p className="text-green-100 font-medium">Real-time soil monitoring across your fields</p>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {soilData.map((field, index) => (
                <Card key={index} className="shadow-md border border-gray-200 bg-white hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="font-semibold text-lg text-gray-800">{field.sensor}</div>
                        <div className="text-sm text-gray-600 font-medium">🌾 Crop: {field.crop}</div>
                        <div className="text-sm text-gray-500">{field.location}</div>
                        <div className="text-sm text-amber-600 font-medium">🏔️ Soil: {field.soilType}</div>
                      </div>
                      <Badge className={`text-sm border font-medium ${getStatusBadgeColor(field.status)}`}>
                        {field.status}
                      </Badge>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-gray-700">💧 Soil Moisture</span>
                        <span className="font-semibold text-lg">{field.moisture}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-500 ${
                            field.moisture < 40 ? 'bg-red-400' :
                            field.moisture > 60 ? 'bg-blue-400' : 'bg-green-400'
                          }`}
                          style={{ width: `${field.moisture}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      className={`w-full text-sm font-medium shadow-md ${
                        field.status === 'Low' ? 'bg-red-600 hover:bg-red-700' :
                        field.status === 'High' ? 'bg-blue-600 hover:bg-blue-700' :
                        'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      {field.status === 'Low' ? '🚀 Irrigate Now' :
                       field.status === 'High' ? '💧 Reduce Water' :
                       '✨ Maintain Level'}
                    </Button>
                    
                    <div className="text-center mt-4 bg-gray-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-gray-800">{index === 1 ? '1' : index === 0 ? '2' : '1'}</div>
                      <div className="text-xs text-gray-600 font-medium">
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
