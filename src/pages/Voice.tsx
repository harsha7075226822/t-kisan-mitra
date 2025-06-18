
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import VoiceAssistant from '@/components/VoiceAssistant';

const Voice = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
        
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Voice Assistant</h1>
          <p className="text-gray-600 mt-2">Get farming advice in your preferred language - Telugu, Urdu, or English</p>
        </div>
        <VoiceAssistant />
      </div>
    </div>
  );
};

export default Voice;
