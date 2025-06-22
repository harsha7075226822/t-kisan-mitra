
import React from 'react';
import VoiceAI from '@/components/VoiceAI';
import AgricultureChatbot from '@/components/AgricultureChatbot';
import Navigation from '@/components/Navigation';

const VoiceAssistant = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-cream-50">
      <Navigation title="Voice AI Assistant" />
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Main Voice AI Component */}
        <VoiceAI language="en" />
        
        {/* Informational Section */}
        <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">How to Use Voice Assistant</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">🎤 Voice Input</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Click the microphone button to start speaking</li>
                <li>• Speak clearly in English or Telugu</li>
                <li>• Ask about farming, weather, crops, or prices</li>
                <li>• Wait for the AI response and audio playback</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-2">🤖 AI Modes</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <strong>Local AI:</strong> Built-in agricultural knowledge</li>
                <li>• <strong>ChatGPT:</strong> Advanced AI with broader knowledge</li>
                <li>• Configure in settings with your OpenAI API key</li>
                <li>• Automatic text-to-speech in selected language</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Include the chatbot on this page as well */}
      <AgricultureChatbot />
    </div>
  );
};

export default VoiceAssistant;
