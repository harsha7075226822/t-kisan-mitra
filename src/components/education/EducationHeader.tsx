
import React from 'react';

interface EducationHeaderProps {
  selectedLanguage: string;
}

const EducationHeader = ({ selectedLanguage }: EducationHeaderProps) => {
  const text = {
    title: {
      english: 'Agricultural Education',
      telugu: 'వ్యవసాయ విద్య'
    },
    subtitle: {
      english: 'Learn modern farming techniques and best practices',
      telugu: 'ఆధునిక వ్యవసాయ పద్ధతులను నేర్చుకోండి'
    }
  };

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-green-800 mb-2">
        {text.title[selectedLanguage]}
      </h1>
      <p className="text-green-600">
        {text.subtitle[selectedLanguage]}
      </p>
    </div>
  );
};

export default EducationHeader;
