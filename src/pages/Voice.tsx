
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
import VoiceAssistant from '@/components/VoiceAssistant';

const Voice = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('common.backToDashboard')}
          </Button>
          <LanguageSelector />
        </div>
        
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">{t('voice.title')}</h1>
          <p className="text-gray-600 mt-2">{t('voice.subtitle')}</p>
        </div>
        <VoiceAssistant />
      </div>
    </div>
  );
};

export default Voice;
