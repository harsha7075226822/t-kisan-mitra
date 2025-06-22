
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mic, MicOff, Volume2, Bot, User, AlertCircle, Settings } from 'lucide-react';
import { AIResponseEngine } from '@/utils/aiResponseEngine';

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
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [useLocalAI, setUseLocalAI] = useState(true);
  const [recognition, setRecognition] = useState<any>(null);
  
  const aiEngine = new AIResponseEngine();

  useEffect(() => {
    const userData = localStorage.getItem('kisanUser') || localStorage.getItem('kisanMitraUser');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Check if browser supports Web Speech API
    setIsSupported('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
    
    // Load saved API key
    const savedApiKey = localStorage.getItem('openai_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setUseLocalAI(false);
    }
  }, []);

  const text = {
    te: {
      title: 'వాయిస్ AI అసిస్టెంట్',
      subtitle: 'మాట్లాడి సమాచారం పొందండి',
      startListening: 'వినడం ప్రారంభించండి',
      stopListening: 'వినడం ఆపండి',
      listening: 'వింటున్నాం...',
      processing: 'ప్రాసెసింగ్...',
      youSaid: 'మీరు అన్నారు',
      aiResponse: 'AI జవాబు',
      speakNow: 'ఇప్పుడు మాట్లాడండి',
      examples: 'ఉదాహరణలు',
      example1: '"టమాటో ధరలు చూపించు"',
      example2: '"వాతావరణం ఎలా ఉంది?"',
      example3: '"వరి పంట గురించి చెప్పు"',
      notSupported: 'మీ బ్రౌజర్ వాయిస్ రికగ్నిషన్‌ను మద్దతు ఇవ్వదు',
      backToHome: 'హోమ్‌కు తిరిగి వెళ్ళండి',
      clearAll: 'అన్నీ క్లియర్ చేయండి',
      settings: 'సెట్టింగ్స్',
      apiKeyLabel: 'OpenAI API కీ',
      useLocalAI: 'లోకల్ AI ఉపయోగించండి',
      useChatGPT: 'ChatGPT ఉపయోగించండి',
      saveSettings: 'సెట్టింగ్స్ సేవ్ చేయండి'
    },
    en: {
      title: 'Voice AI Assistant',
      subtitle: 'Get information by speaking',
      startListening: 'Start Listening',
      stopListening: 'Stop Listening',
      listening: 'Listening...',
      processing: 'Processing...',
      youSaid: 'You said',
      aiResponse: 'AI Response',
      speakNow: 'Speak now',
      examples: 'Examples',
      example1: '"Show tomato prices"',
      example2: '"How is the weather?"',
      example3: '"Tell me about rice cultivation"',
      notSupported: 'Your browser does not support voice recognition',
      backToHome: 'Back to Home',
      clearAll: 'Clear All',
      settings: 'Settings',
      apiKeyLabel: 'OpenAI API Key',
      useLocalAI: 'Use Local AI',
      useChatGPT: 'Use ChatGPT',
      saveSettings: 'Save Settings'
    }
  };

  const t = text[language as keyof typeof text] || text.en;

  const startListening = () => {
    if (!isSupported) {
      setError(t.notSupported);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const newRecognition = new SpeechRecognition();

    newRecognition.lang = language === 'te' ? 'te-IN' : 'en-IN';
    newRecognition.continuous = false;
    newRecognition.interimResults = false;
    newRecognition.maxAlternatives = 1;

    newRecognition.onstart = () => {
      console.log('Voice recognition started');
      setIsListening(true);
      setTranscript('');
      setResponse('');
      setError(null);
    };

    newRecognition.onresult = async (event: any) => {
      const spokenText = event.results[0][0].transcript;
      console.log('Voice input received:', spokenText);
      setTranscript(spokenText);
      setIsListening(false);
      await processVoiceCommand(spokenText);
    };

    newRecognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    };

    newRecognition.onend = () => {
      console.log('Voice recognition ended');
      setIsListening(false);
    };

    setRecognition(newRecognition);
    newRecognition.start();
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
    setIsListening(false);
  };

  const processVoiceCommand = async (command: string) => {
    setIsProcessing(true);
    console.log('Processing voice command:', command);
    
    try {
      let aiResponse = '';
      
      if (useLocalAI || !apiKey) {
        // Use local AI engine
        aiResponse = await aiEngine.generateResponse(command, language as 'en' | 'te');
      } else {
        // Use ChatGPT API
        aiResponse = await getChatGPTResponse(command);
      }
      
      setResponse(aiResponse);
      speakResponse(aiResponse);
    } catch (error) {
      console.error('Error processing voice command:', error);
      const errorMessage = language === 'te' 
        ? 'క్షమించండి, ఏదో లోపం జరిగింది. దయచేసి మళ్ళీ ప్రయత్నించండి.'
        : 'Sorry, something went wrong. Please try again.';
      setResponse(errorMessage);
      setError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsProcessing(false);
    }
  };

  const getChatGPTResponse = async (input: string): Promise<string> => {
    if (!apiKey) {
      throw new Error('OpenAI API key is required');
    }

    const systemPrompt = language === 'te' 
      ? 'మీరు ఒక తెలుగు వ్యవసాయ సహాయకుడు. రైతులకు వ్యవసాయం, పంటలు, వాతావరణం, మార్కెట్ ధరలు, ప్రభుత్వ పథకాలు గురించి సహాయం చేయండి. తెలుగులో సమాధానం ఇవ్వండి.'
      : 'You are an agricultural assistant for farmers. Help with farming, crops, weather, market prices, and government schemes. Provide helpful and accurate information in English.';

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: input }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`ChatGPT API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  };

  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'te' ? 'te-IN' : 'en-IN';
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onstart = () => console.log('Speech started');
      utterance.onend = () => console.log('Speech ended');
      utterance.onerror = (event) => console.error('Speech error:', event);
      
      speechSynthesis.speak(utterance);
    }
  };

  const clearAll = () => {
    setTranscript('');
    setResponse('');
    setError(null);
    speechSynthesis.cancel();
  };

  const handleExampleClick = (example: string) => {
    const cleanExample = example.replace(/"/g, '');
    setTranscript(cleanExample);
    processVoiceCommand(cleanExample);
  };

  const saveSettings = () => {
    if (apiKey) {
      localStorage.setItem('openai_api_key', apiKey);
    } else {
      localStorage.removeItem('openai_api_key');
    }
    setShowSettings(false);
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

      {/* Settings Card */}
      {showSettings && (
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>{t.settings}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">{t.apiKeyLabel}</Label>
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
              />
              <p className="text-sm text-gray-600">
                {language === 'te' 
                  ? 'ChatGPT ఉపయోగించడానికి OpenAI API కీ అవసరం'
                  : 'OpenAI API key required to use ChatGPT'
                }
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant={useLocalAI ? "default" : "outline"}
                onClick={() => setUseLocalAI(true)}
              >
                {t.useLocalAI}
              </Button>
              <Button
                variant={!useLocalAI ? "default" : "outline"}
                onClick={() => setUseLocalAI(false)}
              >
                {t.useChatGPT}
              </Button>
            </div>
            <Button onClick={saveSettings} className="w-full">
              {t.saveSettings}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Voice Control Card */}
      <Card className="border-green-200">
        <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-6 h-6 text-green-600" />
              <span className="text-green-800">{t.title}</span>
              {isListening && <Badge variant="destructive" className="animate-pulse">{t.listening}</Badge>}
              {isProcessing && <Badge className="animate-pulse bg-blue-500">{t.processing}</Badge>}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="w-4 h-4" />
            </Button>
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
            <div className={`w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
              isListening 
                ? 'bg-red-100 animate-pulse' 
                : isProcessing
                ? 'bg-blue-100 animate-pulse'
                : 'bg-indigo-100 hover:bg-indigo-200'
            }`} onClick={isListening ? stopListening : startListening}>
              <div className="text-6xl">
                {isListening ? '🔴' : isProcessing ? '⚡' : '🎤'}
              </div>
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
              ) : isProcessing ? (
                <div className="text-blue-600 font-semibold text-lg">
                  {t.processing}
                  <div className="flex justify-center mt-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
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
                  disabled={!isSupported || isProcessing}
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
                disabled={isProcessing}
              >
                {t.clearAll}
              </Button>
            </div>
          </div>

          {/* AI Mode Indicator */}
          <div className="text-center mb-4">
            <Badge variant={useLocalAI ? "secondary" : "default"}>
              {useLocalAI ? 'Local AI Mode' : 'ChatGPT Mode'}
            </Badge>
          </div>

          {/* Conversation */}
          {(transcript || response) && (
            <div className="space-y-4 mb-6">
              {/* User Input */}
              {transcript && (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <User className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600 font-medium mb-2">{t.youSaid}:</p>
                      <p className="text-blue-700 font-medium">{transcript}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Response */}
              {response && (
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Bot className="w-5 h-5 text-green-600 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 font-medium mb-2">{t.aiResponse}:</p>
                      <p className="text-green-700 font-medium mb-3 whitespace-pre-wrap">{response}</p>
                      <Button
                        onClick={() => speakResponse(response)}
                        size="sm"
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <Volume2 className="w-4 h-4 mr-2" />
                        Speak Again
                      </Button>
                    </div>
                  </div>
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
