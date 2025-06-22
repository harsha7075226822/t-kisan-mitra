
import React from 'react';

interface ExamplesSectionProps {
  onExampleClick: (example: string) => void;
  t: any;
}

const ExamplesSection: React.FC<ExamplesSectionProps> = ({
  onExampleClick,
  t
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold text-gray-800 mb-3">{t.examples}:</h3>
      <div className="space-y-2">
        <div 
          className="p-3 bg-white rounded-lg cursor-pointer hover:bg-gray-100 transition-colors border"
          onClick={() => onExampleClick(t.example1)}
        >
          <p className="text-gray-700">{t.example1}</p>
        </div>
        <div 
          className="p-3 bg-white rounded-lg cursor-pointer hover:bg-gray-100 transition-colors border"
          onClick={() => onExampleClick(t.example2)}
        >
          <p className="text-gray-700">{t.example2}</p>
        </div>
        <div 
          className="p-3 bg-white rounded-lg cursor-pointer hover:bg-gray-100 transition-colors border"
          onClick={() => onExampleClick(t.example3)}
        >
          <p className="text-gray-700">{t.example3}</p>
        </div>
      </div>
    </div>
  );
};

export default ExamplesSection;
