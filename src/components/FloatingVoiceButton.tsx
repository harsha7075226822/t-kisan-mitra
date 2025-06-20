
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, X } from 'lucide-react';
import VoiceAssistantBot from './VoiceAssistantBot';

const FloatingVoiceButton: React.FC = () => {
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState(false);

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg z-40 transition-all duration-300 hover:scale-110"
        onClick={() => setIsVoiceAssistantOpen(true)}
      >
        <Mic className="w-6 h-6 text-white" />
      </Button>

      <VoiceAssistantBot
        isOpen={isVoiceAssistantOpen}
        onClose={() => setIsVoiceAssistantOpen(false)}
      />
    </>
  );
};

export default FloatingVoiceButton;
