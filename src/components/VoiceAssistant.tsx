import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('telugu');
  const [conversation, setConversation] = useState([
    {
      type: 'assistant',
      message: 'నమస్కారం! నేను మీ వ్యవసాయ సహాయకుడను. మీకు ఎలా సహాయం చేయగలను?',
      translation: 'Hello! I am your farming assistant. How can I help you?'
    }
  ]);

  const languages = [
    { code: 'telugu', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'english', name: 'English', flag: '🇺🇸' }
  ];

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate listening
      setTimeout(() => {
        setIsListening(false);
        const newMessage = {
          type: 'user',
          message: 'నా దగ్గరున్న టమాటో మొక్కలపై చుక్కలు కనిపిస్తున్నాయి',
          translation: 'I see spots on my tomato plants'
        };
        setConversation(prev => [...prev, newMessage]);
        
        // Simulate AI response
        setTimeout(() => {
          const aiResponse = {
            type: 'assistant',
            message: 'టమాటో మొక్కలపై చుక్కలు బ్లైట్ వ్యాధికి సంకేతాలు. కాపర్ బేస్డ్ ఫంగిసైడ్ చల్లండి మరియు నీటిపారుదల తగ్గించండి.',
            translation: 'Spots on tomato plants indicate blight disease. Apply copper-based fungicide and reduce watering.'
          };
          setConversation(prev => [...prev, aiResponse]);
        }, 1500);
      }, 3000);
    }
  };

  const speakMessage = (message: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = selectedLanguage === 'telugu' ? 'te-IN' : selectedLanguage === 'urdu' ? 'ur-PK' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6">
      {/* Language Selection */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Languages className="w-5 h-5 text-green-600" />
            <span>Select Language / భాష ఎంచుకోండి</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={selectedLanguage === lang.code ? "default" : "outline"}
                className={`p-4 h-auto flex flex-col items-center space-y-2 ${
                  selectedLanguage === lang.code ? 'bg-green-600 hover:bg-green-700' : 'border-green-200 hover:bg-green-50'
                }`}
                onClick={() => setSelectedLanguage(lang.code)}
              >
                <span className="text-2xl">{lang.flag}</span>
                <span className="text-sm font-medium">{lang.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Voice Interface */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-center">
            Voice Assistant / వాయిస్ అసిస్టెంట్
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="relative">
            <Button
              size="lg"
              className={`w-32 h-32 rounded-full text-white transition-all duration-300 ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
              onClick={toggleListening}
            >
              {isListening ? (
                <MicOff className="w-12 h-12" />
              ) : (
                <Mic className="w-12 h-12" />
              )}
            </Button>
            
            {isListening && (
              <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
            )}
          </div>
          
          <p className="text-gray-600">
            {isListening 
              ? 'Listening... / వింటున్నాను...' 
              : 'Tap to speak / మాట్లాడటానికి నొక్కండి'
            }
          </p>
        </CardContent>
      </Card>

      {/* Conversation History */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle>Conversation / సంభాషణ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {conversation.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-sm p-4 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="font-medium">{message.message}</p>
                  {message.translation && (
                    <p className="text-sm opacity-75 mt-1 italic">
                      {message.translation}
                    </p>
                  )}
                  {message.type === 'assistant' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 p-1"
                      onClick={() => speakMessage(message.message)}
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceAssistant;
