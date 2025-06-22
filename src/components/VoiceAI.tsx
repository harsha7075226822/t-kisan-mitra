
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, AlertCircle, Settings } from 'lucide-react';
import { AIResponseEngine } from '@/utils/aiResponseEngine';
import VoiceControls from '@/components/voice/VoiceControls';
import SettingsPanel from '@/components/voice/SettingsPanel';
import ConversationDisplay from '@/components/voice/ConversationDisplay';
import ExamplesSection from '@/components/voice/ExamplesSection';

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

      {/* Settings Panel */}
      <SettingsPanel
        showSettings={showSettings}
        apiKey={apiKey}
        useLocalAI={useLocalAI}
        language={language}
        onApiKeyChange={setApiKey}
        onUseLocalAIChange={setUseLocalAI}
        onSaveSettings={saveSettings}
        t={t}
      />

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

          {/* Voice Controls */}
          <VoiceControls
            isListening={isListening}
            isProcessing={isProcessing}
            isSupported={isSupported}
            useLocalAI={useLocalAI}
            onStartListening={startListening}
            onStopListening={stopListening}
            onClearAll={clearAll}
            t={t}
          />

          {/* Conversation Display */}
          <ConversationDisplay
            transcript={transcript}
            response={response}
            onSpeakResponse={speakResponse}
            t={t}
          />

          {/* Examples Section */}
          <ExamplesSection
            onExampleClick={handleExampleClick}
            t={t}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceAI;
