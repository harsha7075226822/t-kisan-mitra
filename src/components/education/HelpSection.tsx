
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface HelpSectionProps {
  selectedLanguage: string;
}

const HelpSection = ({ selectedLanguage }: HelpSectionProps) => {
  return (
    <div className="mt-8">
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">
            {selectedLanguage === 'english' ? 'Learning Resources' : 'అభ్యాస వనరులు'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-blue-700 mb-2">
                {selectedLanguage === 'english' 
                  ? '• All content available in audio format for easy learning'
                  : '• అన్ని కంటెంట్ సులభ అభ్యాసం కోసం ఆడియో ఫార్మాట్‌లో అందుబాటులో ఉంది'
                }
              </p>
              <p className="text-blue-700">
                {selectedLanguage === 'english' 
                  ? '• Download materials for offline access'
                  : '• ఆఫ్‌లైన్ యాక్సెస్ కోసం మెటీరియల్స్ డౌన్‌లోడ్ చేయండి'
                }
              </p>
            </div>
            <div>
              <p className="text-blue-700 mb-2">
                {selectedLanguage === 'english' 
                  ? '• Expert instructors from agricultural universities'
                  : '• వ్యవసాయ విశ్వవిద్యాలయాల నుండి నిపుణ బోధకులు'
                }
              </p>
              <p className="text-blue-700">
                {selectedLanguage === 'english' 
                  ? '• Interactive content with practical examples from YouTube'
                  : '• YouTube నుండి ప్రాక్టికల్ ఉదాహరణలతో ఇంటరాక్టివ్ కంటెంట్'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpSection;
