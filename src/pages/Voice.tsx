
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import VoiceAI from '@/components/VoiceAI';

const Voice = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation title="Voice AI Assistant" />
      <div className="py-8">
        <VoiceAI language={language} />
      </div>
    </div>
  );
};

export default Voice;
