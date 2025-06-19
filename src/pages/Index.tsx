import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, BarChart3, Mic, Globe, Shield, Award } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Mic,
      title: "Voice Assistant",
      description: "AI-powered voice support in Telugu & English",
      badge: "Multilingual"
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Crop monitoring, weather forecasts & market insights",
      badge: "Live Data"
    },
    {
      icon: Users,
      title: "Government Dashboard", 
      description: "State-wide agricultural insights for policy making",
      badge: "Policy Tools"
    },
    {
      icon: Globe,
      title: "IoT Integration",
      description: "Smart sensors for soil moisture & environmental monitoring",
      badge: "Smart Farming"
    }
  ];

  const stats = [
    { number: "2.5M+", label: "Farmers in Telangana", icon: "👨‍🌾" },
    { number: "85%", label: "Rural Population", icon: "🌾" },
    { number: "12M", label: "Hectares Cultivated", icon: "🚜" },
    { number: "24/7", label: "AI Support", icon: "🤖" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="text-8xl animate-bounce">🌾</div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Smart <span className="text-green-600">AgriConnect</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-4">
              AI-Powered Farming Assistant for Telangana
            </p>
            
            <p className="text-lg text-gray-500 mb-8 max-w-3xl mx-auto">
              <span className="font-semibold">కృషి में तकनीक का साथ</span> • 
              Voice-enabled farming assistance in Telugu & English with real-time IoT monitoring
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg">
                  किसान लॉगिन / Farmer Login
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/analytics">
                <Button variant="outline" size="lg" className="border-green-600 text-green-600 px-8 py-4 text-lg">
                  Government Portal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-y border-green-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-green-600 mb-1">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Empowering Farmers with AI Technology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bridging the digital divide with voice-first, multilingual agricultural assistance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-green-200 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <Badge variant="outline" className="text-green-700 border-green-300 mb-2">
                    {feature.badge}
                  </Badge>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of farmers already using Smart AgriConnect
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="text-2xl">🌾</div>
                <span className="text-xl font-bold">Smart AgriConnect</span>
              </div>
              <p className="text-gray-400">
                Government of Telangana initiative for digital agriculture transformation
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-gray-400">
                <p>📞 Helpline: 1800-XXX-XXXX</p>
                <p>📧 support@smartagriconnect.telangana.gov.in</p>
                <p>🕒 24/7 AI Voice Support</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Languages</h3>
              <div className="space-y-2 text-gray-400">
                <p>🗣️ Telugu / తెలుగు</p>
                <p>🗣️ English</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Government of Telangana. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
