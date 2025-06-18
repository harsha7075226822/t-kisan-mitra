
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, Cloud, BarChart3, Smartphone, Users, TrendingUp } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Mic,
      title: 'Voice Assistant in Telugu & Urdu',
      description: 'Get farming advice in your native language through AI-powered voice interactions',
      stat: '25K+ voice interactions daily'
    },
    {
      icon: Cloud,
      title: 'Weather & IoT Integration',
      description: 'Real-time soil moisture, weather data, and smart irrigation recommendations',
      stat: '1,250+ IoT sensors deployed'
    },
    {
      icon: BarChart3,
      title: 'AI-Powered Predictions',
      description: 'Pest outbreak alerts, market price forecasts, and crop yield optimization',
      stat: '85% prediction accuracy'
    },
    {
      icon: Smartphone,
      title: 'Mobile-First Design',
      description: 'Designed for low-literacy users with icon-based navigation and audio guidance',
      stat: '77K+ registered farmers'
    },
    {
      icon: Users,
      title: 'Government Dashboard',
      description: 'Real-time agricultural insights for policy making and resource allocation',
      stat: '5 districts covered'
    },
    {
      icon: TrendingUp,
      title: 'Improved Yields',
      description: 'Data-driven farming recommendations leading to better crop productivity',
      stat: '30% water savings achieved'
    }
  ];

  const impact = [
    { metric: '77,200+', label: 'Farmers Registered', icon: '👨‍🌾' },
    { metric: '125K', label: 'Acres Monitored', icon: '🌾' },
    { metric: '₹14.8Cr', label: 'Subsidies Disbursed', icon: '💰' },
    { metric: '80.4%', label: 'Average Yield Improvement', icon: '📈' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="text-6xl mb-6">🌾</div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Smart <span className="text-green-600">AgriConnect</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              AI-Powered Vernacular Farming Assistant for Telangana
            </p>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Empowering farmers with voice-based AI assistance in Telugu & Urdu, 
              real-time IoT monitoring, and data-driven agricultural insights.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg">
                  <Smartphone className="w-5 h-5 mr-2" />
                  Farmer Dashboard
                </Button>
              </Link>
              <Link to="/voice">
                <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 text-lg">
                  <Mic className="w-5 h-5 mr-2" />
                  Voice Assistant
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 text-4xl animate-bounce">🌱</div>
        <div className="absolute top-32 right-10 text-4xl animate-bounce delay-1000">☀️</div>
        <div className="absolute bottom-20 left-20 text-4xl animate-bounce delay-500">💧</div>
      </div>

      {/* Impact Metrics */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact in Telangana</h2>
            <p className="text-lg text-gray-600">Real numbers, real impact on farming communities</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {impact.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-3xl font-bold text-green-600 mb-2">{item.metric}</div>
                <div className="text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Features</h2>
            <p className="text-lg text-gray-600">Comprehensive agricultural technology designed for Telangana farmers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <feature.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full inline-block">
                    {feature.stat}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powered by Advanced Technology</h2>
            <p className="text-lg text-gray-300">Built with cutting-edge AI and IoT technologies</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl">🤖</div>
              <div className="font-medium">AI & Machine Learning</div>
              <div className="text-sm text-gray-400">OpenAI GPT, TensorFlow</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">📱</div>
              <div className="font-medium">Mobile Technology</div>
              <div className="text-sm text-gray-400">React Native, PWA</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">🌐</div>
              <div className="font-medium">IoT Integration</div>
              <div className="text-sm text-gray-400">Arduino, ESP32, Sensors</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">☁️</div>
              <div className="font-medium">Cloud Infrastructure</div>
              <div className="text-sm text-gray-400">Firebase, Node.js</div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Join the Agricultural Revolution in Telangana
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Experience the future of farming with AI-powered assistance, 
            real-time monitoring, and data-driven insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg">
                Start Farming Smarter
              </Button>
            </Link>
            <Link to="/analytics">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-green-700 px-8 py-4 text-lg">
                View Analytics
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
