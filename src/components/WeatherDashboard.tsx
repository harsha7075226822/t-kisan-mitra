
import React, { useState, useEffect } from 'react';
import { Cloud, MapPin, Thermometer, Droplets, Wind, Sun } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const WeatherDashboard = () => {
  const [selectedCity, setSelectedCity] = useState('Hyderabad');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const cities = [
    'Hyderabad',
    'Warangal', 
    'Nizamabad',
    'Karimnagar',
    'Khammam',
    'Nalgonda',
    'Mahabubnagar',
    'Adilabad',
    'Sangareddy',
    'Siddipet'
  ];

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=914201012eec468b088da3b4d6e806f3`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not available');
      }
      
      const data = await response.json();
      setWeatherData(data);
      console.log('Weather data fetched:', data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Weather API error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(selectedCity);
  }, [selectedCity]);

  const handleCityChange = (city) => {
    setSelectedCity(city);
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
    { sensor: 'Field A - Cotton', moisture: 45, status: 'Optimal', location: 'Sector 1' },
    { sensor: 'Field B - Rice', moisture: 72, status: 'High', location: 'Sector 2' },
    { sensor: 'Field C - Tomato', moisture: 35, status: 'Low', location: 'Sector 3' },
    { sensor: 'Field D - Wheat', moisture: 55, status: 'Optimal', location: 'Sector 4' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Optimal': return 'bg-green-100 text-green-800';
      case 'High': return 'bg-blue-100 text-blue-800';
      case 'Low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFarmingAlert = (temp, humidity, windSpeed) => {
    if (temp > 35) return "High temperature - provide shade for crops and increase irrigation";
    if (humidity < 30) return "Low humidity - consider mulching to retain soil moisture";
    if (windSpeed > 20) return "High winds - secure tall crops and check for damage";
    if (temp >= 25 && temp <= 30 && humidity >= 50) return "Ideal conditions for most crops - good time for field activities";
    return "Monitor weather conditions regularly for optimal farming decisions";
  };

  return (
    <div className="space-y-6">
      {/* City Selector */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-green-600" />
            <span>Select City</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedCity} onValueChange={handleCityChange}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder="Choose your city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Live Weather Data */}
      {loading ? (
        <Card className="border-blue-200">
          <CardContent className="p-6 text-center">
            <div className="text-2xl mb-2">🔄</div>
            <p>Fetching weather data...</p>
          </CardContent>
        </Card>
      ) : error ? (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6 text-center">
            <div className="text-2xl mb-2">⚠️</div>
            <p className="text-red-700">{error}</p>
          </CardContent>
        </Card>
      ) : weatherData ? (
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Cloud className="w-6 h-6 text-blue-600" />
              <span>Live Weather - {weatherData.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">
                  {getWeatherIcon(weatherData.weather[0].description)}
                </div>
                <div className="text-3xl font-bold text-blue-800">
                  {Math.round(weatherData.main.temp)}°C
                </div>
                <div className="text-gray-600 capitalize">
                  {weatherData.weather[0].description}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Humidity: {weatherData.main.humidity}%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Thermometer className="w-4 h-4 text-red-500" />
                  <span className="text-sm">
                    Feels like: {Math.round(weatherData.main.feels_like)}°C
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Wind className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Wind: {weatherData.wind.speed} m/s</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sun className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">
                    Visibility: {weatherData.visibility ? (weatherData.visibility / 1000).toFixed(1) : 'N/A'} km
                  </span>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="text-sm font-medium text-yellow-800 mb-2">Farming Alert</div>
                <div className="text-xs text-yellow-700">
                  {getFarmingAlert(weatherData.main.temp, weatherData.main.humidity, weatherData.wind.speed)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* 5-Day Forecast - Static for now */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle>5-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { day: 'Today', temp: '32°/26°', condition: 'Partly Cloudy', icon: '⛅', rain: '10%' },
              { day: 'Tomorrow', temp: '34°/28°', condition: 'Sunny', icon: '☀️', rain: '5%' },
              { day: 'Thu', temp: '29°/24°', condition: 'Rainy', icon: '🌧️', rain: '80%' },
              { day: 'Fri', temp: '31°/25°', condition: 'Cloudy', icon: '☁️', rain: '20%' },
              { day: 'Sat', temp: '33°/27°', condition: 'Sunny', icon: '☀️', rain: '0%' },
            ].map((day, index) => (
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
