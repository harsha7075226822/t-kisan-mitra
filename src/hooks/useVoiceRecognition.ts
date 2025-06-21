
import { useState, useEffect, useRef } from 'react';

interface UseVoiceRecognitionOptions {
  language?: string;
  continuous?: boolean;
  onResult?: (transcript: string) => void;
  onError?: (error: string) => void;
}

interface UseVoiceRecognitionReturn {
  isListening: boolean;
  transcript: string;
  isSupported: boolean;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

export const useVoiceRecognition = (
  options: UseVoiceRecognitionOptions = {}
): UseVoiceRecognitionReturn => {
  const {
    language = 'en-US',
    continuous = false,
    onResult,
    onError
  } = options;

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      
      const recognition = recognitionRef.current;
      recognition.continuous = continuous;
      recognition.interimResults = true;
      recognition.lang = getLanguageCode(language);
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        console.log('Voice recognition started for language:', recognition.lang);
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        const currentTranscript = finalTranscript || interimTranscript;
        setTranscript(currentTranscript);

        // Call onResult for both interim and final results so UI updates in real-time
        if (finalTranscript && onResult) {
          console.log('Final transcript:', finalTranscript);
          onResult(finalTranscript.trim());
          setIsListening(false);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Voice recognition error:', event.error);
        setIsListening(false);
        
        let errorMessage = 'Unknown error';
        
        // Handle specific errors with user-friendly messages
        switch (event.error) {
          case 'not-allowed':
            errorMessage = 'Microphone access denied. Please allow microphone access and try again.';
            break;
          case 'no-speech':
            errorMessage = 'No speech detected. Please try speaking louder.';
            break;
          case 'network':
            errorMessage = 'Network error. Please check your internet connection.';
            break;
          case 'audio-capture':
            errorMessage = 'Audio capture failed. Please check your microphone.';
            break;
          case 'aborted':
            errorMessage = 'Speech recognition was aborted.';
            break;
          default:
            errorMessage = `Speech recognition error: ${event.error}`;
        }
        
        if (onError) {
          onError(errorMessage);
        }
      };

      recognition.onend = () => {
        console.log('Voice recognition ended');
        setIsListening(false);
        
        // Clear any pending restart timeout
        if (restartTimeoutRef.current) {
          clearTimeout(restartTimeoutRef.current);
          restartTimeoutRef.current = null;
        }
      };

      recognition.onnomatch = () => {
        console.warn('Speech recognition: no match found');
        if (onError) {
          onError('Could not understand the speech. Please try again.');
        }
      };
    } else {
      console.warn('Speech recognition not supported');
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
    };
  }, [language, continuous, onResult, onError]);

  const getLanguageCode = (lang: string): string => {
    const languageMap: { [key: string]: string } = {
      'en': 'en-IN',
      'te': 'te-IN',
      'hi': 'hi-IN',
      'en-US': 'en-IN',
      'en-IN': 'en-IN',
      'te-IN': 'te-IN',
      'hi-IN': 'hi-IN'
    };
    return languageMap[lang] || 'en-IN';
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript('');
      const langCode = getLanguageCode(language);
      recognitionRef.current.lang = langCode;
      
      try {
        recognitionRef.current.start();
        console.log('Starting voice recognition with language:', langCode);
      } catch (error) {
        console.error('Error starting voice recognition:', error);
        setIsListening(false);
        if (onError) {
          onError('Failed to start voice recognition. Please try again.');
        }
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      
      // Clear any pending restart timeout
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
        restartTimeoutRef.current = null;
      }
    }
  };

  const resetTranscript = () => {
    setTranscript('');
  };

  return {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
    resetTranscript
  };
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
