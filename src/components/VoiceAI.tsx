
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, Bot, User, AlertCircle } from 'lucide-react';

interface VoiceAIProps {
  language?: string;
}

const VoiceAI: React.FC<VoiceAIProps> = ({ language = 'en' }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('kisanUser') || localStorage.getItem('kisanMitraUser');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Check if browser supports Web Speech API
    setIsSupported('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  }, []);

  const text = {
    te: {
      title: 'వాయిస్ AI అసిస్టెంట్',
      subtitle: 'మాట్లాడి సమాచారం పొందండి',
      startListening: 'వినడం ప్రారంభించండి',
      stopListening: 'వినడం ఆపండి',
      listening: 'వింటున్నాం...',
      youSaid: 'మీరు అన్నారు',
      aiResponse: 'AI జవాబు',
      speakNow: 'ఇప్పుడు మాట్లాడండి',
      examples: 'ఉదాహరణలు',
      example1: '"టమాటో ధరలు చూపించు"',
      example2: '"వాతావరణం ఎలా ఉంది?"',
      example3: '"వరి పంట గురించి చెప్పు"',
      notSupported: 'మీ బ్రౌజర్ వాయిస్ రికగ్నిషన్‌ను మద్దతు ఇవ్వదు',
      backToHome: 'హోమ్‌కు తిరిగి వెళ్ళండి',
      clearAll: 'అన్నీ క్లియర్ చేయండి'
    },
    en: {
      title: 'Voice AI Assistant',
      subtitle: 'Get information by speaking',
      startListening: 'Start Listening',
      stopListening: 'Stop Listening',
      listening: 'Listening...',
      youSaid: 'You said',
      aiResponse: 'AI Response',
      speakNow: 'Speak now',
      examples: 'Examples',
      example1: '"Show tomato prices"',
      example2: '"How is the weather?"',
      example3: '"Tell me about rice cultivation"',
      notSupported: 'Your browser does not support voice recognition',
      backToHome: 'Back to Home',
      clearAll: 'Clear All'
    }
  };

  const t = text[language as keyof typeof text] || text.en;

  const startListening = () => {
    if (!isSupported) {
      setError(t.notSupported);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = language === 'te' ? 'te-IN' : 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
      setResponse('');
      setError(null);
    };

    recognition.onresult = (event: any) => {
      const spokenText = event.results[0][0].transcript;
      setTranscript(spokenText);
      processVoiceCommand(spokenText);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    let aiResponse = '';

    // Mock AI responses based on common queries
    if (lowerCommand.includes('tomato') || lowerCommand.includes('టమాటో')) {
      aiResponse = language === 'te' 
        ? 'టమాటో ధర ప్రస్తుతం క్వింటల్‌కు ₹3000. మార్కెట్‌లో డిమాండ్ అధికంగా ఉంది.'
        : 'Tomato price is currently ₹3000 per quintal. Market demand is high.';
    } else if (lowerCommand.includes('weather') || lowerCommand.includes('వాతావరణం')) {
      aiResponse = language === 'te'
        ? 'ఈ రోజు వాతావరణం మంచిది. ఉష్ణోగ్రత 28°C, వర్షం అవకాశం లేదు.'
        : 'Today\'s weather is good. Temperature is 28°C with no chance of rain.';
    } else if (lowerCommand.includes('rice') || lowerCommand.includes('వరి')) {
      aiResponse = language === 'te'
        ? 'వరి పంట కోసం నేల తేమ 70-80% ఉండాలి. నీరు క్రమం తప్పకుండా ఇవ్వాలి.'
        : 'For rice cultivation, soil moisture should be 70-80%. Regular watering is essential.';
    } else if (lowerCommand.includes('price') || lowerCommand.includes('ధర')) {
      aiResponse = language === 'te'
        ? 'మార్కెట్ ధరలు: వరి ₹2800, కాటన్ ₹6500, మొక్కజొన్న ₹2200 ప్రతి క్వింటల్‌కు.'
        : 'Market prices: Rice ₹2800, Cotton ₹6500, Maize ₹2200 per quintal.';
    } else {
      aiResponse = language === 'te'
        ? 'క్షమించండి, నేను మీ ప్రశ్నను అర్థం చేసుకోలేకపోయాను. దయచేసి మళ్ళీ ప్రయత్నించండి.'
        : 'Sorry, I didn\'t understand your question. Please try again.';
    }

    setResponse(aiResponse);
    speakResponse(aiResponse);
  };

  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'te' ? 'te-IN' : 'en-IN';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const clearAll = () => {
    setTranscript('');
    setResponse('');
    setError(null);
  };

  const handleExampleClick = (example: string) => {
    const cleanExample = example.replace(/"/g, '');
    setTranscript(cleanExample);
    processVoiceCommand(cleanExample);
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
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-800 mb-4">{t.title}</h1>
        <p className="text-indigo-600">{t.subtitle}</p>
      </div>

      {/* Voice Control Card */}
      <Card className="border-green-200">
        <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
          <CardTitle className="flex items-center space-x-2">
            <Bot className="w-6 h-6 text-green-600" />
            <span className="text-green-800">{t.title}</span>
            {isListening && <Badge variant="destructive" className="animate-pulse">{t.listening}</Badge>}
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

          {/* Voice Interface */}
          <div className="text-center mb-6">
            {/* Microphone Animation */}
            <div className={`w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-300 ${
              isListening 
                ? 'bg-red-100 animate-pulse' 
                : 'bg-indigo-100 hover:bg-indigo-200'
            }`}>
              <div className="text-6xl">🎤</div>
            </div>

            {/* Status */}
            <div className="mb-6">
              {isListening ? (
                <div className="text-red-600 font-semibold text-lg">
                  {t.listening}
                  <div className="flex justify-center mt-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">{t.speakNow}</p>
              )}
            </div>

            {/* Controls */}
            <div className="flex justify-center space-x-4">
              {!isListening ? (
                <Button
                  onClick={startListening}
                  className="bg-indigo-500 hover:bg-indigo-600"
                  disabled={!isSupported}
                >
                  <Mic className="w-4 h-4 mr-2" />
                  {t.startListening}
                </Button>
              ) : (
                <Button
                  onClick={stopListening}
                  className="bg-red-500 hover:bg-red-600"
                >
                  <MicOff className="w-4 h-4 mr-2" />
                  {t.stopListening}
                </Button>
              )}
              
              <Button
                onClick={clearAll}
                variant="outline"
                className="hover:bg-gray-50"
              >
                {t.clearAll}
              </Button>
            </div>
          </div>

          {/* Conversation */}
          {(transcript || response) && (
            <div className="space-y-4 mb-6">
              {/* User Input */}
              {transcript && (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 font-medium mb-2">{t.youSaid}:</p>
                  <p className="text-blue-700 font-medium">{transcript}</p>
                </div>
              )}

              {/* AI Response */}
              {response && (
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 font-medium mb-2">{t.aiResponse}:</p>
                  <p className="text-green-700 font-medium mb-3">{response}</p>
                  <Button
                    onClick={() => speakResponse(response)}
                    size="sm"
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <Volume2 className="w-4 h-4 mr-2" />
                    Speak Again
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Examples */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">{t.examples}:</h3>
            <div className="space-y-2">
              <div 
                className="p-3 bg-white rounded-lg cursor-pointer hover:bg-gray-100 transition-colors border"
                onClick={() => handleExampleClick(t.example1)}
              >
                <p className="text-gray-700">{t.example1}</p>
              </div>
              <div 
                className="p-3 bg-white rounded-lg cursor-pointer hover:bg-gray-100 transition-colors border"
                onClick={() => handleExampleClick(t.example2)}
              >
                <p className="text-gray-700">{t.example2}</p>
              </div>
              <div 
                className="p-3 bg-white rounded-lg cursor-pointer hover:bg-gray-100 transition-colors border"
                onClick={() => handleExampleClick(t.example3)}
              >
                <p className="text-gray-700">{t.example3}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceAI;
