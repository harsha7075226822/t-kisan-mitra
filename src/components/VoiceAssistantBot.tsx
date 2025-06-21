
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, Bot, User, X, RotateCcw, AlertCircle } from 'lucide-react';
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
}

const VoiceAssistantBot: React.FC<VoiceAssistantBotProps> = ({ isOpen, onClose }) => {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'te' | 'hi'>(language);
  const [lastResponse, setLastResponse] = useState<Message | null>(null);
  const [microphonePermission, setMicrophonePermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasGreeted, setHasGreeted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
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
      resetTranscript();
      processUserInput(transcript);
    }
  };

  const handleVoiceError = (error: string) => {
    console.error('Voice recognition error:', error);
    setError(error);
  };

  const { 
    isListening,
    startListening, 
    stopListening, 
    transcript, 
    isSupported,
    resetTranscript 
  } = useVoiceRecognition({
    language: selectedLanguage,
    continuous: false,
    onResult: handleVoiceResult,
    onError: handleVoiceError
  });

  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇺🇸', voiceLang: 'en-IN' },
    { code: 'te' as const, name: 'తెలుగు', flag: '🇮🇳', voiceLang: 'te-IN' },
    { code: 'hi' as const, name: 'हिंदी', flag: '🇮🇳', voiceLang: 'hi-IN' }
  ];

  const quickCommands = {
    en: [
      "What's the weather today?",
      "When should I plant tomatoes?",
      "How to control pests in cotton?",
      "What are the current crop prices?"
    ],
    te: [
      "నేడు వాతావరణం ఎలా ఉంది?",
      "టమాటోలు ఎప్పుడు నాటాలి?",
      "పత్తిలో చీడపీడలను ఎలా నియంత్రించాలి?",
      "ప్రస్తుత పంట ధరలు ఎంత?"
    ],
    hi: [
      "आज मौसम कैसा है?",
      "टमाटर कब लगाना चाहिए?",
      "कपास में कीट नियंत्रण कैसे करें?",
      "वर्तमान फसल की कीमतें क्या हैं?"
    ]
  };

  useEffect(() => {
    if (isOpen && !hasGreeted) {
      checkMicrophonePermission();
      showWelcomeMessage();
      setHasGreeted(true);
    }
  }, [isOpen, hasGreeted]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const checkMicrophonePermission = async () => {
    try {
      const permission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      setMicrophonePermission(permission.state);
      
      permission.onchange = () => {
        setMicrophonePermission(permission.state);
      };
    } catch (error) {
      console.error('Error checking microphone permission:', error);
    }
  };

  const requestMicrophoneAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      setMicrophonePermission('granted');
      setError(null);
      return true;
    } catch (error) {
      console.error('Microphone access denied:', error);
      setMicrophonePermission('denied');
      setError('Microphone access is required for voice input. Please enable it in your browser settings.');
      return false;
    }
  };

  const showWelcomeMessage = () => {
    const user = JSON.parse(localStorage.getItem('kisanUser') || '{}');
    const welcomeText = responseEngine.generateWelcomeGreeting(selectedLanguage, user.name);

    const welcomeMessage: Message = {
      id: Date.now().toString(),
      type: 'assistant',
      text: welcomeText,
      language: selectedLanguage,
      timestamp: new Date()
    };

    setMessages([welcomeMessage]);
    setLastResponse(welcomeMessage);
    
    setTimeout(() => {
      speakMessage(welcomeMessage.text, selectedLanguage);
    }, 500);
  };

  const processUserInput = async (input: string) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      console.log('Processing user input:', input);
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
      
      setTimeout(() => {
        speakMessage(response, selectedLanguage);
      }, 300);
      
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
      setError('Failed to process your request. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const getErrorMessage = () => {
    const errorTexts = {
      en: "Sorry, I couldn't understand that. Please try speaking clearly or ask about farming, weather, or crop prices.",
      te: "క్షమించండి, నేను అర్థం చేసుకోలేకపోయాను. దయచేసి స్పష్టంగా మాట్లాడండి లేదా వ్యవసాయం, వాతావరణం లేదా పంట ధరల గురించి అడగండి.",
      hi: "माफ करें, मैं समझ नहीं पाया। कृपया स्पष्ट रूप से बोलें या खेती, मौसम या फसल की कीमतों के बारे में पूछें।"
    };
    return errorTexts[selectedLanguage] || errorTexts.en;
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
        utterance.volume = 1.0;
      } else if (lang === 'hi') {
        utterance.rate = 0.8;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
      } else {
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
      }
      
      utterance.onend = () => {
        console.log('Speech synthesis ended');
        setIsSpeaking(false);
      };
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setIsSpeaking(false);
      };
      
      console.log(`Speaking in ${utterance.lang}: ${text}`);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleListening = async () => {
    console.log('Toggle listening clicked. Current state:', isListening);
    
    if (isListening) {
      console.log('Stopping listening...');
      stopListening();
    } else {
      console.log('Starting listening...');
      
      if (microphonePermission !== 'granted') {
        console.log('Requesting microphone access...');
        const granted = await requestMicrophoneAccess();
        if (!granted) {
          console.log('Microphone access denied');
          return;
        }
      }
      
      setError(null);
      resetTranscript();
      
      try {
        console.log('Calling startListening...');
        startListening();
        console.log('Started listening successfully');
      } catch (error) {
        console.error('Error starting listening:', error);
        setError('Failed to start voice recognition. Please try again.');
      }
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
    setError(null);
    
    const user = JSON.parse(localStorage.getItem('kisanUser') || '{}');
    const welcomeText = responseEngine.generateWelcomeGreeting(newLanguage, user.name);

    const welcomeMessage: Message = {
      id: Date.now().toString(),
      type: 'assistant',
      text: welcomeText,
      language: newLanguage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, welcomeMessage]);
    setLastResponse(welcomeMessage);
    speakMessage(welcomeMessage.text, newLanguage);
  };

  const replayLastResponse = () => {
    if (lastResponse && !isSpeaking) {
      speakMessage(lastResponse.text, lastResponse.language);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setLastResponse(null);
    setError(null);
    setHasGreeted(false);
    showWelcomeMessage();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl h-[700px] flex flex-col bg-white">
        <CardHeader className="border-b bg-gradient-to-r from-green-50 to-green-100">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Bot className="w-6 h-6 text-green-600" />
              <span className="text-green-800">Telugu-English Voice Assistant</span>
              {isSpeaking && <Badge variant="secondary" className="animate-pulse bg-blue-100 text-blue-800">Speaking</Badge>}
              {isListening && <Badge variant="destructive" className="animate-pulse bg-red-100 text-red-800">Listening</Badge>}
              {isProcessing && <Badge variant="outline" className="animate-pulse bg-yellow-100 text-yellow-800">Processing</Badge>}
            </CardTitle>
            <div className="flex items-center space-x-2">
              <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="px-3 py-1 border border-green-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
              {lastResponse && (
                <Button variant="ghost" size="sm" onClick={replayLastResponse} disabled={isSpeaking} className="hover:bg-green-100">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={clearChat} className="hover:bg-blue-100">
                Clear
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-red-100">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {error && (
            <div className="bg-red-50 border-b p-3 border-l-4 border-l-red-500">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-700 font-medium">{error}</span>
              </div>
            </div>
          )}

          {transcript && isListening && (
            <div className="bg-blue-50 border-b p-3 border-l-4 border-l-blue-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600 font-medium">Live Transcription:</span>
              </div>
              <p className="text-blue-700 font-medium mt-1 text-lg">"{transcript}"</p>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-lg shadow-sm ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === 'assistant' && <Bot className="w-5 h-5 mt-0.5 text-green-600 flex-shrink-0" />}
                    {message.type === 'user' && <User className="w-5 h-5 mt-0.5 flex-shrink-0" />}
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed" style={{ fontSize: selectedLanguage === 'te' ? '16px' : '14px' }}>
                        {message.text}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs opacity-75">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                        {message.type === 'assistant' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 h-auto hover:bg-green-100 rounded-full"
                            onClick={() => speakMessage(message.text, message.language)}
                            disabled={isSpeaking}
                          >
                            <Volume2 className="w-4 h-4 text-green-600" />
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

          <div className="border-t p-4 bg-white">
            <p className="text-sm text-gray-600 mb-3 font-medium">Quick Commands:</p>
            <div className="grid grid-cols-1 gap-2 max-h-24 overflow-y-auto">
              {quickCommands[selectedLanguage]
                .slice(0, 3).map((command, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs justify-start hover:bg-green-50 hover:border-green-300 border-gray-300"
                  onClick={() => handleQuickCommand(command)}
                  disabled={isProcessing}
                >
                  💬 {command}
                </Button>
              ))}
            </div>
          </div>

          <div className="border-t p-4 bg-gradient-to-r from-green-50 to-green-100">
            <div className="flex items-center justify-center space-x-4">
              <Button
                size="lg"
                className={`w-16 h-16 rounded-full transition-all duration-300 ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse scale-110 shadow-lg shadow-red-200' 
                    : 'bg-green-600 hover:bg-green-700 hover:scale-105 shadow-lg shadow-green-200'
                }`}
                onClick={toggleListening}
                disabled={!isSupported || microphonePermission === 'denied' || isProcessing}
              >
                {isListening ? (
                  <MicOff className="w-8 h-8 text-white" />
                ) : (
                  <Mic className="w-8 h-8 text-white" />
                )}
              </Button>
            </div>
            <div className="text-center mt-3">
              <p className="text-sm text-gray-700 font-medium">
                {isListening 
                  ? (selectedLanguage === 'te' ? '🎤 మాట్లాడండి... వింటున్నాను' : selectedLanguage === 'hi' ? '🎤 बोलिए... सुन रहा हूँ' : '🎤 Speak now... Listening') 
                  : microphonePermission === 'denied'
                  ? '❌ Microphone access denied'
                  : isProcessing
                  ? '⏳ Processing your request...'
                  : (selectedLanguage === 'te' ? '👆 మైక్ బటన్ నొక్కి మాట్లాడండి' : selectedLanguage === 'hi' ? '👆 माइक बटन दबाकर बोलें' : '👆 Press mic button to speak')
                }
              </p>
              {!isSupported && (
                <p className="text-xs text-red-500 mt-1">
                  Voice recognition not supported in this browser
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceAssistantBot;
