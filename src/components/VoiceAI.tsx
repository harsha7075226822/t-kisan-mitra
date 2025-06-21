
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useVoiceRecognition } from '@/hooks/useVoiceRecognition';
import { AIResponseEngine } from '@/utils/aiResponseEngine';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, Bot, User, RotateCcw, AlertCircle } from 'lucide-react';

interface VoiceAIProps {
  language?: 'en' | 'te' | 'hi';
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  text: string;
  language: string;
  timestamp: Date;
}

const VoiceAI: React.FC<VoiceAIProps> = ({ language: propLanguage }) => {
  const navigate = useNavigate();
  const { language: contextLanguage } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'te' | 'hi'>(propLanguage || contextLanguage);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const responseEngine = new AIResponseEngine();

  const handleVoiceResult = (transcript: string) => {
    console.log('Voice result received:', transcript);
    if (transcript.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        text: transcript,
        language: selectedLanguage,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      setTranscript(transcript);
      processUserInput(transcript);
    }
  };

  const handleVoiceError = (error: string) => {
    console.error('Voice recognition error:', error);
    setError(error);
  };

  const { 
    startListening, 
    stopListening, 
    resetTranscript 
  } = useVoiceRecognition({
    language: selectedLanguage,
    continuous: false,
    onResult: handleVoiceResult,
    onError: handleVoiceError
  });

  useEffect(() => {
    const userData = localStorage.getItem('kisanUser');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Check if browser supports Web Speech API
    setIsSupported('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  }, []);

  useEffect(() => {
    if (propLanguage) {
      setSelectedLanguage(propLanguage);
    }
  }, [propLanguage]);

  const processUserInput = async (input: string) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      console.log('Processing user input:', input);
      const aiResponse = await responseEngine.generateResponse(input, selectedLanguage);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        text: aiResponse,
        language: selectedLanguage,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setResponse(aiResponse);
      
      setTimeout(() => {
        speakMessage(aiResponse, selectedLanguage);
      }, 300);
      
    } catch (error) {
      console.error('Error processing user input:', error);
      const errorMessage = "Sorry, I couldn't process your request. Please try again.";
      setError(errorMessage);
      setResponse(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const speakMessage = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      const langMap = { en: 'en-IN', te: 'te-IN', hi: 'hi-IN' };
      utterance.lang = langMap[lang as keyof typeof langMap] || 'en-IN';
      
      if (lang === 'te') {
        utterance.rate = 0.7;
        utterance.pitch = 1.1;
      } else if (lang === 'hi') {
        utterance.rate = 0.8;
        utterance.pitch = 1.0;
      } else {
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
      }
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setIsSpeaking(false);
      };
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      stopListening();
    } else {
      setIsListening(true);
      setError(null);
      resetTranscript();
      startListening();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setTranscript('');
    setResponse('');
    setError(null);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">🌾</div>
          <h2 className="text-xl text-gray-600">Please log in to use Voice AI</h2>
          <Button 
            onClick={() => navigate('/login')} 
            className="mt-4 bg-green-600 hover:bg-green-700"
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Card className="border-green-200">
        <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-6 h-6 text-green-600" />
              <span className="text-green-800">Voice AI Assistant</span>
              {isSpeaking && <Badge variant="secondary" className="animate-pulse">Speaking</Badge>}
              {isListening && <Badge variant="destructive" className="animate-pulse">Listening</Badge>}
              {isProcessing && <Badge variant="outline" className="animate-pulse">Processing</Badge>}
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as 'en' | 'te' | 'hi')}
                className="px-3 py-1 border border-green-300 rounded text-sm bg-white"
              >
                <option value="en">🇺🇸 English</option>
                <option value="te">🇮🇳 తెలుగు</option>
                <option value="hi">🇮🇳 हिंदी</option>
              </select>
              <Button variant="ghost" size="sm" onClick={clearChat}>
                Clear
              </Button>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 p-3 rounded-lg mb-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            </div>
          )}

          {transcript && (
            <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg mb-4">
              <p className="text-sm text-gray-600 font-medium">You said:</p>
              <p className="text-blue-700 font-medium">{transcript}</p>
            </div>
          )}

          <div className="space-y-4 max-h-96 overflow-y-auto mb-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === 'assistant' && <Bot className="w-5 h-5 mt-0.5 text-green-600" />}
                    {message.type === 'user' && <User className="w-5 h-5 mt-0.5" />}
                    <div className="flex-1">
                      <p className="text-sm">{message.text}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs opacity-75">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                        {message.type === 'assistant' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 h-auto"
                            onClick={() => speakMessage(message.text, message.language)}
                            disabled={isSpeaking}
                          >
                            <Volume2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className={`w-20 h-20 rounded-full ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
              onClick={toggleListening}
              disabled={!isSupported || isProcessing}
            >
              {isListening ? (
                <MicOff className="w-8 h-8 text-white" />
              ) : (
                <Mic className="w-8 h-8 text-white" />
              )}
            </Button>
            
            <p className="text-sm text-gray-600 mt-4">
              {!isSupported 
                ? 'Voice recognition not supported in this browser'
                : isListening 
                ? 'Listening... Speak now'
                : isProcessing
                ? 'Processing your request...'
                : 'Press microphone to start speaking'
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceAI;
