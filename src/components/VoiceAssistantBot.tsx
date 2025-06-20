
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, Bot, User, Settings, X, RotateCcw } from 'lucide-react';
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
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'te' | 'hi'>(language);
  const [lastResponse, setLastResponse] = useState<Message | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const responseEngine = new AIResponseEngine();

  const { startListening, stopListening, transcript, isSupported } = useVoiceRecognition({
    language: selectedLanguage,
    continuous: false,
    onResult: handleVoiceResult,
  });

  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇺🇸', voiceLang: 'en-US' },
    { code: 'te' as const, name: 'తెలుగు', flag: '🇮🇳', voiceLang: 'te-IN' },
    { code: 'hi' as const, name: 'हिंदी', flag: '🇮🇳', voiceLang: 'hi-IN' }
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
    const currentHour = new Date().getHours();
    const timeGreeting = currentHour < 12 ? 'Good morning' : currentHour < 17 ? 'Good afternoon' : 'Good evening';
    
    const welcomeTexts = {
      en: `${timeGreeting} ${user.name || 'Farmer'}! I'm your voice assistant. How can I help you today?`,
      te: `${timeGreeting === 'Good morning' ? 'శుభోదయం' : timeGreeting === 'Good afternoon' ? 'శుభ మధ్యాహ్నం' : 'శుభ సాయంత్రం'} ${user.name || 'రైతు గారు'}! నేను మీ వాయిస్ అసిస్టెంట్. నేడు మీకు ఎలా సహాయం చేయగలను?`,
      hi: `${timeGreeting === 'Good morning' ? 'सुप्रभात' : timeGreeting === 'Good afternoon' ? 'नमस्कार' : 'शुभ संध्या'} ${user.name || 'किसान जी'}! मैं आपका वॉइस असिस्टेंट हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?`
    };

    const welcomeMessage: Message = {
      id: Date.now().toString(),
      type: 'assistant',
      text: welcomeTexts[selectedLanguage as keyof typeof welcomeTexts] || welcomeTexts.en,
      language: selectedLanguage,
      timestamp: new Date()
    };

    setMessages([welcomeMessage]);
    setLastResponse(welcomeMessage);
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
      setLastResponse(assistantMessage);
      speakMessage(response, selectedLanguage);
    } catch (error) {
      console.error('Error processing user input:', error);
      const errorMessage = getErrorMessage();
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        text: errorMessage,
        language: selectedLanguage,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
      setLastResponse(errorResponse);
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

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value as 'en' | 'te' | 'hi';
    setSelectedLanguage(newLanguage);
  };

  const replayLastResponse = () => {
    if (lastResponse) {
      speakMessage(lastResponse.text, lastResponse.language);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl h-[700px] flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Bot className="w-6 h-6 text-green-600" />
              <span>Voice Assistant</span>
              {isSpeaking && <Badge variant="secondary" className="animate-pulse">Speaking</Badge>}
              {isListening && <Badge variant="destructive" className="animate-pulse">Listening</Badge>}
            </CardTitle>
            <div className="flex items-center space-x-2">
              <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="px-2 py-1 border rounded text-sm"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
              {lastResponse && (
                <Button variant="ghost" size="sm" onClick={replayLastResponse}>
                  <RotateCcw className="w-4 h-4" />
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Live Transcription Display */}
          {transcript && isListening && (
            <div className="bg-blue-50 border-b p-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Live Transcription:</span>
              </div>
              <p className="text-blue-700 font-medium mt-1">"{transcript}"</p>
            </div>
          )}

          {/* Conversation Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-lg shadow-sm ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                      : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === 'assistant' && <Bot className="w-5 h-5 mt-0.5 text-green-600 flex-shrink-0" />}
                    {message.type === 'user' && <User className="w-5 h-5 mt-0.5 flex-shrink-0" />}
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs opacity-75">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                        {message.type === 'assistant' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 h-auto hover:bg-white/20"
                            onClick={() => speakMessage(message.text, message.language)}
                          >
                            <Volume2 className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Commands */}
          <div className="border-t p-4 bg-gray-50">
            <p className="text-sm text-gray-600 mb-3 font-medium">Quick Commands:</p>
            <div className="grid grid-cols-1 gap-2">
              {(quickCommands[selectedLanguage as keyof typeof quickCommands] || quickCommands.en)
                .slice(0, 2).map((command, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs justify-start hover:bg-green-50 hover:border-green-300"
                  onClick={() => handleQuickCommand(command)}
                >
                  💬 {command}
                </Button>
              ))}
            </div>
          </div>

          {/* Voice Controls */}
          <div className="border-t p-4 bg-white">
            <div className="flex items-center justify-center space-x-4">
              <Button
                size="lg"
                className={`w-16 h-16 rounded-full transition-all duration-300 ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse scale-110' 
                    : 'bg-green-600 hover:bg-green-700 hover:scale-105'
                } shadow-lg`}
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
            <p className="text-center text-sm text-gray-600 mt-3 font-medium">
              {isListening 
                ? '🎤 Listening... Speak now' 
                : '👆 Tap to speak or use quick commands'
              }
            </p>
            {!isSupported && (
              <p className="text-center text-xs text-red-500 mt-1">
                Voice recognition not supported in this browser
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceAssistantBot;
