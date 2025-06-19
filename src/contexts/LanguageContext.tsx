
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
    'lang.telugu': 'Telugu',

    // Common
    'common.backToDashboard': 'Back to Dashboard',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',

    // Voice Assistant
    'voice.title': 'Voice Assistant',
    'voice.subtitle': 'Get farming advice in your preferred language - Telugu, Urdu, or English',

    // Weather
    'weather.title': 'Weather & IoT Monitoring',
    'weather.subtitle': 'Real-time weather data and soil monitoring for informed farming decisions',

    // Analytics
    'analytics.title': 'Government Analytics Dashboard',
    'analytics.subtitle': 'State-wide agricultural insights for policy making and resource allocation',

    // Orders
    'orders.title': 'My Orders',
    'orders.noOrders': 'No Orders Yet',
    'orders.noOrdersDesc': 'Your orders will appear here once you make a purchase',
    'orders.orderId': 'Order ID',
    'orders.quantity': 'Quantity',
    'orders.total': 'Total',
    'orders.orderDate': 'Order Date',
    'orders.deliveryAddress': 'Delivery Address',
    'orders.viewDetails': 'View Details',
    'orders.trackOrder': 'Track Order',
    'orders.status.pending': 'Pending',
    'orders.status.dispatched': 'Dispatched',
    'orders.status.delivered': 'Delivered',

    // Login
    'login.title': 'Farmer Registration',
    'login.otpTitle': 'OTP Verification',
    'login.fullName': 'Full Name',
    'login.fullNamePlaceholder': 'Enter your full name',
    'login.mobile': 'Mobile Number',
    'login.mobilePlaceholder': '10-digit mobile number',
    'login.sendOtp': 'Send OTP',
    'login.sending': 'Sending...',
    'login.otpSent': 'OTP sent to',
    'login.enterOtp': 'Enter 6-digit OTP',
    'login.verifyOtp': 'Verify OTP',
    'login.verifying': 'Verifying...',
    'login.goBack': 'Go Back',
    'login.fillAllFields': 'Please fill all fields',
    'login.enterValidOtp': 'Please enter 6-digit OTP',
    'login.otpSentSuccess': 'OTP sent to {mobile}',
    'login.helpline': 'Helpline: 1800-XXX-XXXX',
    'login.supportEmail': 'For support: support@smartagriconnect.telangana.gov.in'
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
    'cta.title': 'మీ వ్యవసాయాన్ని మార్చడానికి సిద్దంగా ఉన్నారా?',
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
    'lang.telugu': 'తెలుగు',

    // Common
    'common.backToDashboard': 'డాష్‌బోర్డ్‌కు తిరిగి వెళ్లండి',
    'common.loading': 'లోడ్ చేస్తోంది...',
    'common.error': 'లోపం',
    'common.success': 'విజయం',

    // Voice Assistant
    'voice.title': 'వాయిస్ అసిస్టెంట్',
    'voice.subtitle': 'మీ ఇష్టమైన భాషలో వ్యవసాయ సలహాలు పొందండి - తెలుగు, ఉర్దూ లేదా ఇంగ్లీష్',

    // Weather
    'weather.title': 'వాతావరణం & IoT మానిటరింగ్',
    'weather.subtitle': 'సమాచార వ్యవసాయ నిర్ణయాల కోసం రియల్-టైమ్ వాతావరణ డేటా మరియు మట్టి పర్యవేక్షణ',

    // Analytics
    'analytics.title': 'ప్రభుత్వ అనలిటిక్స్ డాష్‌బోర్డ్',
    'analytics.subtitle': 'విధాన రూపకల్పన మరియు వనరుల కేటాయింపు కోసం రాష్ట్రవ్యాప్త వ్యవసాయ అంతర్దృష్టులు',

    // Orders
    'orders.title': 'నా ఆర్డర్లు',
    'orders.noOrders': 'ఇంకా ఆర్డర్లు లేవు',
    'orders.noOrdersDesc': 'మీరు కొనుగోలు చేసిన తర్వాత మీ ఆర్డర్లు ఇక్కడ కనిపిస్తాయి',
    'orders.orderId': 'ఆర్డర్ ID',
    'orders.quantity': 'పరిమాణం',
    'orders.total': 'మొత్తం',
    'orders.orderDate': 'ఆర్డర్ తేదీ',
    'orders.deliveryAddress': 'డెలివరీ చిరునామా',
    'orders.viewDetails': 'వివరాలు చూడండి',
    'orders.trackOrder': 'ఆర్డర్ ట్రాక్ చేయండి',
    'orders.status.pending': 'పెండింగ్',
    'orders.status.dispatched': 'పంపబడింది',
    'orders.status.delivered': 'డెలివరీ అయింది',

    // Login
    'login.title': 'రైతు నమోదు',
    'login.otpTitle': 'OTP ధృవీకరణ',
    'login.fullName': 'పూర్తి పేరు',
    'login.fullNamePlaceholder': 'మీ పూర్తి పేరు నమోదు చేయండి',
    'login.mobile': 'మొబైల్ నంబర్',
    'login.mobilePlaceholder': '10-అంకెల మొబైల్ నంబర్',
    'login.sendOtp': 'OTP పంపండి',
    'login.sending': 'పంపుతోంది...',
    'login.otpSent': 'OTP పంపబడింది',
    'login.enterOtp': '6-అంకెల OTP నమోదు చేయండి',
    'login.verifyOtp': 'OTP ధృవీకరించండి',
    'login.verifying': 'ధృవీకరిస్తోంది...',
    'login.goBack': 'వెనుకకు వెళ్లండి',
    'login.fillAllFields': 'దయచేసి అన్ని ఫీల్డ్‌లను పూరించండి',
    'login.enterValidOtp': 'దయచేసి 6-అంకెల OTP నమోదు చేయండి',
    'login.otpSentSuccess': '{mobile}కు OTP పంపబడింది',
    'login.helpline': 'హెల్ప్‌లైన్: 1800-XXX-XXXX',
    'login.supportEmail': 'మద్దతు కోసం: support@smartagriconnect.telangana.gov.in'
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
