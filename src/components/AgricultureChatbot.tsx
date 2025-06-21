
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  MessageCircle, 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  Globe,
  Bot,
  User
} from 'lucide-react';
import { AIResponseEngine } from '@/utils/aiResponseEngine';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  language: 'en' | 'te';
}

const AgricultureChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [language, setLanguage] = useState<'en' | 'te'>('en');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const aiEngine = useRef(new AIResponseEngine());

  // Language configuration
  const translations = {
    en: {
      title: '🌾 Agri Mitra – Your Farming Assistant',
      placeholder: 'Ask about crops, fertilizers, diseases...',
      listening: 'Listening...',
      typing: 'Type your farming question...',
      voiceUnsupported: 'Voice input not supported in this browser',
      welcomeMessage: 'Hello! I\'m your farming assistant. Ask me anything about agriculture, crops, fertilizers, or farming techniques.'
    },
    te: {
      title: '🌾 అగ్రి మిత్ర - మీ వ్యవసాయ సహాయకుడు',
      placeholder: 'పంటలు, ఎరువులు, వ్యాధుల గురించి అడగండి...',
      listening: 'వింటున్నాను...',
      typing: 'మీ వ్యవసాయ ప్రశ్నను టైప్ చేయండి...',
      voiceUnsupported: 'ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ మద్దతు లేదు',
      welcomeMessage: 'నమస్కారం! నేను మీ వ్యవసాయ సహాయకుడను. వ్యవసాయం, పంటలు, ఎరువులు లేదా వ్యవసాయ సాంకేతికతల గురించి ఏదైనా అడగండి.'
    }
  };

  const t = translations[language];

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMsg: Message = {
        id: Date.now().toString(),
        text: t.welcomeMessage,
        isUser: false,
        timestamp: new Date(),
        language: language
      };
      setMessages([welcomeMsg]);
    }
  }, [isOpen, language]);

  // Handle text input submission
  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
      language: language
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // Generate AI response
      const aiResponse = await aiEngine.current.generateResponse(inputText, language);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
        language: language
      };

      setMessages(prev => [...prev, botMessage]);
      
      // Speak the response
      speakText(aiResponse, language);
    } catch (error) {
      console.error('Error generating AI response:', error);
      const errorMessage = language === 'te' 
        ? 'క్షమించండి, దోషం సంభవించింది. దయచేసి మళ్ళీ ప్రయత్నించండి.'
        : 'Sorry, an error occurred. Please try again.';
      
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: errorMessage,
        isUser: false,
        timestamp: new Date(),
        language: language
      };
      
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  // Voice input handling
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert(t.voiceUnsupported);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = language === 'te' ? 'te-IN' : 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Text-to-speech
  const speakText = (text: string, lang: 'en' | 'te') => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'te' ? 'te-IN' : 'en-IN';
      utterance.rate = 0.8;
      utterance.pitch = 1;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      speechSynthesis.speak(utterance);
    }
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-green-600 hover:bg-green-700 shadow-lg z-50 flex items-center justify-center"
          size="lg"
        >
          <MessageCircle className="w-8 h-8 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden border-2 border-green-200">
          {/* Header */}
          <CardHeader className="bg-gradient-to-r from-green-700 to-green-800 text-white p-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center">
                <Bot className="w-5 h-5 mr-2" />
                {t.title}
              </CardTitle>
              <div className="flex items-center space-x-2">
                {/* Language Toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
                  className="text-white hover:bg-green-600 p-1"
                >
                  <Globe className="w-4 h-4 mr-1" />
                  {language === 'en' ? '🇬🇧' : '🇮🇳'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-green-600 p-1"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800 w-fit text-xs">
              {language === 'en' ? 'English' : 'తెలుగు'}
            </Badge>
          </CardHeader>

          {/* Messages Area */}
          <CardContent className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-green-50 to-white">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${message.isUser ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`rounded-lg p-3 shadow-sm ${
                        message.isUser
                          ? 'bg-green-600 text-white'
                          : 'bg-white text-gray-800 border border-green-200'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className={`text-xs ${message.isUser ? 'text-green-100' : 'text-gray-500'}`}>
                          {formatTime(message.timestamp)}
                        </p>
                        {!message.isUser && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => speakText(message.text, message.language)}
                            className="p-1 h-auto hover:bg-green-50"
                            disabled={isSpeaking}
                          >
                            <Volume2 className="w-3 h-3 text-green-600" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ml-2 mr-2 ${
                    message.isUser ? 'bg-green-600 order-1' : 'bg-green-100 order-2'
                  }`}>
                    {message.isUser ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-green-200">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-green-200">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isListening ? t.listening : t.placeholder}
                  className="w-full px-3 py-2 border border-green-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  rows={1}
                  disabled={isListening}
                />
              </div>
              
              {/* Voice Input Button */}
              <Button
                onClick={startListening}
                disabled={isListening}
                className={`p-2 ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
                size="sm"
              >
                {isListening ? (
                  <MicOff className="w-4 h-4 text-white" />
                ) : (
                  <Mic className="w-4 h-4 text-white" />
                )}
              </Button>
              
              {/* Send Button */}
              <Button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isListening}
                className="bg-green-600 hover:bg-green-700 p-2"
                size="sm"
              >
                <Send className="w-4 h-4 text-white" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AgricultureChatbot;
