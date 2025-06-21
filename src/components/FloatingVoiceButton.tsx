
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mic } from 'lucide-react';

const FloatingVoiceButton: React.FC = () => {
  const navigate = useNavigate();

  const handleVoiceButtonClick = () => {
    navigate('/voice');
  };

  return (
    <Button
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg z-40 transition-all duration-300 hover:scale-110"
      onClick={handleVoiceButtonClick}
    >
      <Mic className="w-6 h-6 text-white" />
    </Button>
  );
};

export default FloatingVoiceButton;
