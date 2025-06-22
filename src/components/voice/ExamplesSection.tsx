
import React from 'react';

interface ExamplesSectionProps {
  onExampleClick: (example: string) => void;
  t: any;
}

const ExamplesSection: React.FC<ExamplesSectionProps> = ({
  onExampleClick,
  t
}) => {
  // Define examples in both languages
  const examples = [
    {
      te: '"టమాటో ధరలు చూపించు"',
      en: '"Show tomato prices"'
    },
    {
      te: '"వాతావరణం ఎలా ఉంది?"',
      en: '"How is the weather?"'
    },
    {
      te: '"వరి పంట గురించి చెప్పు"',
      en: '"Tell me about rice cultivation"'
    },
    {
      te: '"PM కిసాన్ పథకం గురించి చెప్పండి"',
      en: '"Tell me about PM Kisan scheme"'
    }
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold text-gray-800 mb-3">{t.examples}:</h3>
      <div className="space-y-3">
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-2">తెలుగు Examples:</h4>
            <div className="space-y-2">
              {examples.map((example, index) => (
                <div 
                  key={`te-${index}`}
                  className="p-2 bg-white rounded-lg cursor-pointer hover:bg-blue-50 transition-colors border text-sm"
                  onClick={() => onExampleClick(example.te)}
                >
                  <p className="text-gray-700">{example.te}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-2">English Examples:</h4>
            <div className="space-y-2">
              {examples.map((example, index) => (
                <div 
                  key={`en-${index}`}
                  className="p-2 bg-white rounded-lg cursor-pointer hover:bg-green-50 transition-colors border text-sm"
                  onClick={() => onExampleClick(example.en)}
                >
                  <p className="text-gray-700">{example.en}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamplesSection;
