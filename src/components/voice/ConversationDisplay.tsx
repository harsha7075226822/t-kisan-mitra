
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bot, User, Volume2 } from 'lucide-react';

interface ConversationDisplayProps {
  transcript: string;
  response: string;
  detectedLanguage: 'en' | 'te';
  onSpeakResponse: (text: string, language: 'en' | 'te') => void;
  t: any;
}

const ConversationDisplay: React.FC<ConversationDisplayProps> = ({
  transcript,
  response,
  detectedLanguage,
  onSpeakResponse,
  t
}) => {
  if (!transcript && !response) return null;

  return (
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
                onClick={() => onSpeakResponse(response, detectedLanguage)}
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
  );
};

export default ConversationDisplay;
