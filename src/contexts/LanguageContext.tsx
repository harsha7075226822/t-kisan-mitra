
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'te';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation data
const translations = {
  en: {
    // Header
    'hero.title': 'Smart AgriConnect',
    'hero.subtitle': 'AI-Powered Farming Assistant for Telangana',
    'hero.description': 'Voice-enabled farming assistance in Telugu & English with real-time IoT monitoring',
    'hero.farmerLogin': 'Farmer Login',
    'hero.governmentPortal': 'Government Portal',
    'hero.getStarted': 'Get Started Today',
    
    // Stats
    'stats.farmers': 'Farmers in Telangana',
    'stats.rural': 'Rural Population',
    'stats.hectares': 'Hectares Cultivated',
    'stats.support': 'AI Support',
    
    // Features
    'features.title': 'Empowering Farmers with AI Technology',
    'features.subtitle': 'Bridging the digital divide with voice-first, multilingual agricultural assistance',
    'features.voice.title': 'Voice Assistant',
    'features.voice.description': 'AI-powered voice support in Telugu & English',
    'features.voice.badge': 'Multilingual',
    'features.analytics.title': 'Real-time Analytics',
    'features.analytics.description': 'Crop monitoring, weather forecasts & market insights',
    'features.analytics.badge': 'Live Data',
    'features.government.title': 'Government Dashboard',
    'features.government.description': 'State-wide agricultural insights for policy making',
    'features.government.badge': 'Policy Tools',
    'features.iot.title': 'IoT Integration',
    'features.iot.description': 'Smart sensors for soil moisture & environmental monitoring',
    'features.iot.badge': 'Smart Farming',
    
    // CTA
    'cta.title': 'Ready to Transform Your Farming?',
    'cta.subtitle': 'Join thousands of farmers already using Smart AgriConnect',
    
    // Footer
    'footer.description': 'Government of Telangana initiative for digital agriculture transformation',
    'footer.support': 'Support',
    'footer.helpline': 'Helpline: 1800-XXX-XXXX',
    'footer.email': 'support@smartagriconnect.telangana.gov.in',
    'footer.aiSupport': '24/7 AI Voice Support',
    'footer.languages': 'Languages',
    'footer.teluguEnglish': 'Telugu & English',
    'footer.voiceAvailable': 'Voice Support Available',
    'footer.copyright': '© 2024 Government of Telangana. All rights reserved.',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.weather': 'Weather',
    'nav.market': 'Market Insights',
    'nav.education': 'Education',
    'nav.schemes': 'Government Schemes',
    'nav.mandi': 'Online Mandi',
    'nav.voice': 'Voice Assistant',
    'nav.scanner': 'Crop Scanner',
    'nav.seeds': 'Seeds Container',
    'nav.pesticides': 'Pesticides',
    
    // Language options
    'lang.english': 'English',
    'lang.telugu': 'Telugu'
  },
  te: {
    // Header
    'hero.title': 'స్మార్ట్ అగ్రికనెక్ట్',
    'hero.subtitle': 'తెలంగాణకు AI-శక్తితో కూడిన వ్యవసాయ సహాయకుడు',
    'hero.description': 'తెలుగు & ఇంగ్లీష్‌లో వాయిస్-ఎనేబుల్డ్ వ్యవసాయ సహాయం మరియు రియల్-టైమ్ IoT మానిటరింగ్',
    'hero.farmerLogin': 'రైతు లాగిన్',
    'hero.governmentPortal': 'ప్రభుత్వ పోర్టల్',
    'hero.getStarted': 'ఈరోజే ప్రారంభించండి',
    
    // Stats
    'stats.farmers': 'తెలంగాణలోని రైతులు',
    'stats.rural': 'గ్రామీణ జనాభా',
    'stats.hectares': 'సాగు చేసిన హెక్టార్లు',
    'stats.support': 'AI మద్దతు',
    
    // Features
    'features.title': 'AI సాంకేతికతతో రైతులను శక్తివంతం చేయడం',
    'features.subtitle': 'వాయిస్-ఫస్ట్, బహుభాషా వ్యవసాయ సహాయంతో డిజిటల్ విభజనను తగ్గించడం',
    'features.voice.title': 'వాయిస్ అసిస్టెంట్',
    'features.voice.description': 'తెలుగు & ఇంగ్లీష్‌లో AI-శక్తితో కూడిన వాయిస్ మద్దతు',
    'features.voice.badge': 'బహుభాషా',
    'features.analytics.title': 'రియల్-టైమ్ అనలిటిక్స్',
    'features.analytics.description': 'పంట పర్యవేక్షణ, వాతావరణ అంచనాలు & మార్కెట్ అంతర్దృష్టులు',
    'features.analytics.badge': 'లైవ్ డేటా',
    'features.government.title': 'ప్రభుత్వ డాష్‌బోర్డ్',
    'features.government.description': 'విధాన రూపకల్పన కోసం రాష్ట్రవ్యాప్త వ్యవసాయ అంతర్దృష్టులు',
    'features.government.badge': 'విధాన సాధనాలు',
    'features.iot.title': 'IoT ఇంటిగ్రేషన్',
    'features.iot.description': 'మట్టి తేమ & పర్యావరణ పర్యవేక్షణ కోసం స్మార్ట్ సెన్సర్లు',
    'features.iot.badge': 'స్మార్ట్ వ్యవసాయం',
    
    // CTA
    'cta.title': 'మీ వ్యవసాయాన్ని మార్చడానికి సిద్धంగా ఉన్నారా?',
    'cta.subtitle': 'ఇప్పటికే స్మార్ట్ అగ్రికనెక్ట్ ఉపయోగిస్తున్న వేలాది మంది రైతులతో చేరండి',
    
    // Footer
    'footer.description': 'డిజిటల్ వ్యవసాయ పరివర్తన కోసం తెలంగాణ ప్రభుత్వ చొరవ',
    'footer.support': 'మద్దతు',
    'footer.helpline': 'హెల్ప్‌లైన్: 1800-XXX-XXXX',
    'footer.email': 'support@smartagriconnect.telangana.gov.in',
    'footer.aiSupport': '24/7 AI వాయిస్ మద్దతు',
    'footer.languages': 'భాషలు',
    'footer.teluguEnglish': 'తెలుగు & ఇంగ్లీష్',
    'footer.voiceAvailable': 'వాయిస్ మద్దతు అందుబాటులో',
    'footer.copyright': '© 2024 తెలంగాణ ప్రభుత్వం. అన్ని హక్కులు రక్షించబడ్డాయి.',
    
    // Navigation
    'nav.dashboard': 'డాష్‌బోర్డ్',
    'nav.weather': 'వాతావరణం',
    'nav.market': 'మార్కెట్ అంతర్దృష్టులు',
    'nav.education': 'విద్య',
    'nav.schemes': 'ప్రభుత్వ పథకాలు',
    'nav.mandi': 'ఆన్‌లైన్ మండి',
    'nav.voice': 'వాయిస్ అసిస్టెంట్',
    'nav.scanner': 'పంట స్కానర్',
    'nav.seeds': 'విత్తనాల కంటైనర్',
    'nav.pesticides': 'పురుగు మందులు',
    
    // Language options
    'lang.english': 'ఇంగ్లీష్',
    'lang.telugu': 'తెలుగు'
  }
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('appLanguage') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'te')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('appLanguage', lang);
    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('languageChange', { detail: lang }));
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
