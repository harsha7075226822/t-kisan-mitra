
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const EducationHeader = () => {
  const { t } = useLanguage();

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-green-800 mb-2">
        {t('education.title')}
      </h1>
      <p className="text-green-600">
        {t('education.subtitle')}
      </p>
    </div>
  );
};

export default EducationHeader;
