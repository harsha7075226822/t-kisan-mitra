
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, BarChart3, Mic, Globe, Shield, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';

const Index = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Mic,
      title: t('features.voice.title'),
      description: t('features.voice.description'),
      badge: t('features.voice.badge')
    },
    {
      icon: BarChart3,
      title: t('features.analytics.title'),
      description: t('features.analytics.description'),
      badge: t('features.analytics.badge')
    },
    {
      icon: Users,
      title: t('features.government.title'), 
      description: t('features.government.description'),
      badge: t('features.government.badge')
    },
    {
      icon: Globe,
      title: t('features.iot.title'),
      description: t('features.iot.description'),
      badge: t('features.iot.badge')
    }
  ];

  const stats = [
    { number: "2.5M+", label: t('stats.farmers'), icon: "👨‍🌾" },
    { number: "85%", label: t('stats.rural'), icon: "🌾" },
    { number: "12M", label: t('stats.hectares'), icon: "🚜" },
    { number: "24/7", label: t('stats.support'), icon: "🤖" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50">
      {/* Language Selector - Positioned in top right */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSelector />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="text-8xl animate-bounce">🌾</div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('hero.title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-4">
              {t('hero.subtitle')}
            </p>
            
            <p className="text-lg text-gray-500 mb-8 max-w-3xl mx-auto">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg">
                  {t('hero.farmerLogin')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/analytics">
                <Button variant="outline" size="lg" className="border-green-600 text-green-600 px-8 py-4 text-lg">
                  {t('hero.governmentPortal')}
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
              {t('features.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('features.subtitle')}
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
            {t('cta.title')}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {t('cta.subtitle')}
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg">
              {t('hero.getStarted')}
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
                <span className="text-xl font-bold">{t('hero.title')}</span>
              </div>
              <p className="text-gray-400">
                {t('footer.description')}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('footer.support')}</h3>
              <div className="space-y-2 text-gray-400">
                <p>📞 {t('footer.helpline')}</p>
                <p>📧 {t('footer.email')}</p>
                <p>🕒 {t('footer.aiSupport')}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('footer.languages')}</h3>
              <div className="space-y-2 text-gray-400">
                <p>🗣️ {t('footer.teluguEnglish')}</p>
                <p>🗣️ {t('footer.voiceAvailable')}</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
