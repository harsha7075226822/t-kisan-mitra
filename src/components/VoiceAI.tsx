
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, Bot, User, AlertCircle } from 'lucide-react';

interface VoiceAIProps {
  language?: string;
}

const VoiceAI: React.FC<VoiceAIProps> = ({ language }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('kisanUser');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Check if browser supports Web Speech API
    setIsSupported('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  }, []);

  const toggleListening = () => {
    if (!isSupported) {
      setError('Voice recognition not supported in this browser');
      return;
    }
    
    setIsListening(!isListening);
    if (!isListening) {
      setTranscript('Voice feature is being developed...');
    }
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
      <Card className="border-green-200">
        <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
          <CardTitle className="flex items-center space-x-2">
            <Bot className="w-6 h-6 text-green-600" />
            <span className="text-green-800">Voice AI Assistant</span>
            {isListening && <Badge variant="destructive" className="animate-pulse">Listening</Badge>}
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

          <div className="text-center space-y-4">
            <Button
              size="lg"
              className={`w-20 h-20 rounded-full ${
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
            
            <p className="text-sm text-gray-600">
              {!isSupported 
                ? 'Voice recognition not supported in this browser'
                : isListening 
                ? 'Listening... Speak now'
                : 'Press microphone to start speaking'
              }
            </p>
            
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
              <p className="text-sm text-yellow-700">
                🚧 Voice AI Assistant is under development. Stay tuned for updates!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceAI;
