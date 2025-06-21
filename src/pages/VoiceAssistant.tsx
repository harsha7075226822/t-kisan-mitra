
import React from 'react';
import VoiceAI from '@/components/VoiceAI';
import AgricultureChatbot from '@/components/AgricultureChatbot';
import Navigation from '@/components/Navigation';

const VoiceAssistant = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-cream-50">
      <Navigation title="Voice AI Assistant" />
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <VoiceAI language="en" />
      </div>
      
      {/* Include the chatbot on this page as well */}
      <AgricultureChatbot />
    </div>
  );
};

export default VoiceAssistant;
