
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, Bot, User, Settings, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useVoiceRecognition } from '@/hooks/useVoiceRecognition';
import { AIResponseEngine } from '@/utils/aiResponseEngine';

interface VoiceAssistantBotProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  text: string;
  language: string;
  timestamp: Date;
  audioUrl?: string;
}

const VoiceAssistantBot: React.FC<VoiceAssistantBotProps> = ({ isOpen, onClose }) => {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const responseEngine = new AIResponseEngine();

  const { startListening, stopListening, transcript, isSupported } = useVoiceRecognition({
    language: selectedLanguage,
    continuous: false,
    onResult: handleVoiceResult,
  });

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', voiceLang: 'en-US' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳', voiceLang: 'te-IN' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳', voiceLang: 'hi-IN' }
  ];

  const quickCommands = {
    en: [
      "What's the weather today?",
      "When should I plant tomatoes?",
      "How to control pests in cotton?",
      "Set a reminder for watering crops"
    ],
    te: [
      "నేడు వాతావరణం ఎలా ఉంది?",
      "టమాటోలు ఎప్పుడు నాటాలి?",
      "పత్తిలో చీడపీడలను ఎలా నియంత్రించాలి?",
      "పంటలకు నీరు పెట్టడానికి రిమైండర్ సెట్ చేయండి"
    ],
    hi: [
      "आज मौसम कैसा है?",
      "टमाटर कब लगाना चाहिए?",
      "कपास में कीट नियंत्रण कैसे करें?",
      "फसल सिंचाई के लिए रिमाइंडर सेट करें"
    ]
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addWelcomeMessage();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addWelcomeMessage = () => {
    const user = JSON.parse(localStorage.getItem('kisanUser') || '{}');
    const welcomeTexts = {
      en: `Hello ${user.name || 'Farmer'}! I'm your voice assistant. How can I help you today?`,
      te: `నమస్కారం ${user.name || 'రైతు గారు'}! నేను మీ వాయిస్ అసిస్టెంట్. నేడు మీకు ఎలా సహాయం చేయగలను?`,
      hi: `नमस्ते ${user.name || 'किसान जी'}! मैं आपका वॉइस असिस्टेंट हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?`
    };

    const welcomeMessage: Message = {
      id: Date.now().toString(),
      type: 'assistant',
      text: welcomeTexts[selectedLanguage as keyof typeof welcomeTexts] || welcomeTexts.en,
      language: selectedLanguage,
      timestamp: new Date()
    };

    setMessages([welcomeMessage]);
    speakMessage(welcomeMessage.text, selectedLanguage);
  };

  function handleVoiceResult(transcript: string) {
    if (transcript.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        text: transcript,
        language: selectedLanguage,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      processUserInput(transcript);
    }
  }

  const processUserInput = async (input: string) => {
    try {
      const response = await responseEngine.generateResponse(input, selectedLanguage);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        text: response,
        language: selectedLanguage,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      speakMessage(response, selectedLanguage);
    } catch (error) {
      console.error('Error processing user input:', error);
      const errorMessage = getErrorMessage();
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        text: errorMessage,
        language: selectedLanguage,
        timestamp: new Date()
      }]);
    }
  };

  const getErrorMessage = () => {
    const errorTexts = {
      en: "Sorry, I couldn't understand that. Please try again.",
      te: "క్షమించండి, నేను అర్థం చేసుకోలేకపోయాను. దయచేసి మళ్లీ ప్రయత్నించండి.",
      hi: "माफ करें, मैं समझ नहीं पाया। कृपया फिर से कोशिश करें।"
    };
    return errorTexts[selectedLanguage as keyof typeof errorTexts] || errorTexts.en;
  };

  const speakMessage = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      const langMap = { en: 'en-US', te: 'te-IN', hi: 'hi-IN' };
      utterance.lang = langMap[lang as keyof typeof langMap] || 'en-US';
      utterance.rate = 0.8;
      utterance.pitch = 1;
      
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
      setIsListening(false);
    } else {
      startListening();
      setIsListening(true);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuickCommand = (command: string) => {
    handleVoiceResult(command);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl h-[600px] flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Bot className="w-6 h-6 text-green-600" />
              <span>{t('voice.title')}</span>
              {isSpeaking && <Badge variant="secondary" className="animate-pulse">Speaking</Badge>}
            </CardTitle>
            <div className="flex items-center space-x-2">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-2 py-1 border rounded text-sm"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === 'assistant' && <Bot className="w-4 h-4 mt-0.5 text-green-600" />}
                    {message.type === 'user' && <User className="w-4 h-4 mt-0.5" />}
                    <div>
                      <p className="text-sm">{message.text}</p>
                      <span className="text-xs opacity-75">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                  {message.type === 'assistant' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 p-1 h-auto"
                      onClick={() => speakMessage(message.text, message.language)}
                    >
                      <Volume2 className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Commands */}
          <div className="border-t p-4">
            <p className="text-sm text-gray-600 mb-2">Quick Commands:</p>
            <div className="grid grid-cols-1 gap-2">
              {(quickCommands[selectedLanguage as keyof typeof quickCommands] || quickCommands.en)
                .slice(0, 2).map((command, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs justify-start"
                  onClick={() => handleQuickCommand(command)}
                >
                  {command}
                </Button>
              ))}
            </div>
          </div>

          {/* Voice Controls */}
          <div className="border-t p-4">
            <div className="flex items-center justify-center space-x-4">
              <Button
                size="lg"
                className={`w-16 h-16 rounded-full ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
                onClick={toggleListening}
                disabled={!isSupported}
              >
                {isListening ? (
                  <MicOff className="w-8 h-8 text-white" />
                ) : (
                  <Mic className="w-8 h-8 text-white" />
                )}
              </Button>
            </div>
            <p className="text-center text-sm text-gray-600 mt-2">
              {isListening 
                ? 'Listening... Speak now' 
                : 'Tap to speak or use quick commands'
              }
            </p>
            {transcript && (
              <p className="text-center text-sm text-blue-600 mt-1">
                "{transcript}"
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceAssistantBot;
