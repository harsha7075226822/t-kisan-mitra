
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff } from 'lucide-react';

interface VoiceControlsProps {
  isListening: boolean;
  isProcessing: boolean;
  isSupported: boolean;
  useLocalAI: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  onClearAll: () => void;
  t: any;
}

const VoiceControls: React.FC<VoiceControlsProps> = ({
  isListening,
  isProcessing,
  isSupported,
  useLocalAI,
  onStartListening,
  onStopListening,
  onClearAll,
  t
}) => {
  return (
    <div className="text-center mb-6">
      {/* Microphone Animation */}
      <div className={`w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
        isListening 
          ? 'bg-red-100 animate-pulse' 
          : isProcessing
          ? 'bg-blue-100 animate-pulse'
          : 'bg-indigo-100 hover:bg-indigo-200'
      }`} onClick={isListening ? onStopListening : onStartListening}>
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
            onClick={onStartListening}
            className="bg-indigo-500 hover:bg-indigo-600"
            disabled={!isSupported || isProcessing}
          >
            <Mic className="w-4 h-4 mr-2" />
            {t.startListening}
          </Button>
        ) : (
          <Button
            onClick={onStopListening}
            className="bg-red-500 hover:bg-red-600"
          >
            <MicOff className="w-4 h-4 mr-2" />
            {t.stopListening}
          </Button>
        )}
        
        <Button
          onClick={onClearAll}
          variant="outline"
          className="hover:bg-gray-50"
          disabled={isProcessing}
        >
          {t.clearAll}
        </Button>
      </div>

      {/* AI Mode Indicator */}
      <div className="mt-4">
        <Badge variant={useLocalAI ? "secondary" : "default"}>
          {useLocalAI ? 'Local AI Mode' : 'ChatGPT Mode'}
        </Badge>
      </div>
    </div>
  );
};

export default VoiceControls;
