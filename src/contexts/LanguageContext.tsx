import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'te' | 'hi';

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
    'hero.title': 'T Kisan Mitra',
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
    'cta.subtitle': 'Join thousands of farmers already using T Kisan Mitra',
    
    // Footer
    'footer.description': 'Government of Telangana initiative for digital agriculture transformation',
    'footer.support': 'Support',
    'footer.helpline': 'Helpline: 1800-XXX-XXXX',
    'footer.email': 'support@tkisanmitra.telangana.gov.in',
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
    'lang.hindi': 'Hindi',

    // Common
    'common.backToDashboard': 'Back to Dashboard',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',

    // Voice Assistant
    'voice.title': 'Voice Assistant',
    'voice.subtitle': 'Get farming advice in your preferred language - Telugu, Hindi, or English',

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
    'login.supportEmail': 'For support: support@tkisanmitra.telangana.gov.in'
  },
  te: {
    // Header
    'hero.title': 'T కిసాన్ మిత్ర',
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
    'cta.subtitle': 'ఇప్పటికే T కిసాన్ మిత్ర ఉపయోగిస్తున్న వేలాది మంది రైతులతో చేరండి',
    
    // Footer
    'footer.description': 'డిజిటల్ వ్యవసాయ పరివర్తన కోసం తెలంగాణ ప్రభుత్వ చొరవ',
    'footer.support': 'మద్దతు',
    'footer.helpline': 'హెల్ప్‌లైన్: 1800-XXX-XXXX',
    'footer.email': 'support@tkisanmitra.telangana.gov.in',
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
    'nav.seeds': 'విత్తనాల కంటైనర్',
    'nav.pesticides': 'పురుగు మందులు',
    
    // Language options
    'lang.english': 'ఇంగ్లీష్',
    'lang.telugu': 'తెలుగు',
    'lang.hindi': 'హిందీ',

    // Common
    'common.backToDashboard': 'డాష్‌బోర్డ్‌కు తిరిగి వెళ్లండి',
    'common.loading': 'లోడ్ చేస్తోంది...',
    'common.error': 'లోపం',
    'common.success': 'విజయం',

    // Voice Assistant
    'voice.title': 'వాయిస్ అసిస్టెంట్',
    'voice.subtitle': 'మీ ఇష్టమైన భాషలో వ్యవసాయ సలహాలు పొందండి - తెలుగు, హిందీ లేదా ఇంగ్లీష్',

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
    'login.supportEmail': 'మద్దతు కోసం: support@tkisanmitra.telangana.gov.in'
  },
  hi: {
    // Header
    'hero.title': 'T किसान मित्र',
    'hero.subtitle': 'तेलंगाना के लिए AI-संचालित कृषि सहायक',
    'hero.description': 'तेलुगु और अंग्रेजी में आवाज-सक्षम कृषि सहायता और रीयल-टाइम IoT निगरानी',
    'hero.farmerLogin': 'किसान लॉगिन',
    'hero.governmentPortal': 'सरकारी पोर्टल',
    'hero.getStarted': 'आज ही शुरू करें',
    
    // Stats
    'stats.farmers': 'तेलंगाना में किसान',
    'stats.rural': 'ग्रामीण जनसंख्या',
    'stats.hectares': 'खेती किए गए हेक्टेयर',
    'stats.support': 'AI सहायता',
    
    // Features
    'features.title': 'AI तकनीक के साथ किसानों को सशक्त बनाना',
    'features.subtitle': 'आवाज-पहले, बहुभाषी कृषि सहायता के साथ डिजिटल विभाजन को पाटना',
    'features.voice.title': 'वॉयस असिस्टेंट',
    'features.voice.description': 'तेलुगु और अंग्रेजी में AI-संचालित आवाज सहायता',
    'features.voice.badge': 'बहुभाषी',
    'features.analytics.title': 'रीयल-टाइम एनालिटिक्स',
    'features.analytics.description': 'फसल निगरानी, मौसम पूर्वानुमान और बाजार अंतर्दृष्टि',
    'features.analytics.badge': 'लाइव डेटा',
    'features.government.title': 'सरकारी डैशबोर्ड',
    'features.government.description': 'नीति निर्माण के लिए राज्यव्यापी कृषि अंतर्दृष्टि',
    'features.government.badge': 'नीति उपकरण',
    'features.iot.title': 'IoT एकीकरण',
    'features.iot.description': 'मिट्टी की नमी और पर्यावरण निगरानी के लिए स्मार्ट सेंसर',
    'features.iot.badge': 'स्मार्ट कृषि',
    
    // CTA
    'cta.title': 'अपनी कृषि को बदलने के लिए तैयार हैं?',
    'cta.subtitle': 'हजारों किसानों के साथ जुड़ें जो पहले से ही T किसान मित्र का उपयोग कर रहे हैं',
    
    // Footer
    'footer.description': 'डिजिटल कृषि परिवर्तन के लिए तेलंगाना सरकार की पहल',
    'footer.support': 'सहायता',
    'footer.helpline': 'हेल्पलाइन: 1800-XXX-XXXX',
    'footer.email': 'support@tkisanmitra.telangana.gov.in',
    'footer.aiSupport': '24/7 AI वॉयस सहायता',
    'footer.languages': 'भाषाएं',
    'footer.teluguEnglish': 'तेलुगु और अंग्रेजी',
    'footer.voiceAvailable': 'वॉयस सहायता उपलब्ध',
    'footer.copyright': '© 2024 तेलंगाना सरकार। सभी अधिकार सुरक्षित।',
    
    // Navigation
    'nav.dashboard': 'डैशबोर्ड',
    'nav.weather': 'मौसम',
    'nav.market': 'बाजार अंतर्दृष्टि',
    'nav.education': 'शिक्षा',
    'nav.schemes': 'सरकारी योजनाएं',
    'nav.mandi': 'ऑनलाइन मंडी',
    'nav.voice': 'वॉयस असिस्टेंट',
    'nav.seeds': 'बीज कंटेनर',
    'nav.pesticides': 'कीटनाशक',
    
    // Language options
    'lang.english': 'अंग्रेजी',
    'lang.telugu': 'तेलुगु',
    'lang.hindi': 'हिंदी',

    // Common
    'common.backToDashboard': 'डैशबोर्ड पर वापस',
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.success': 'सफलता',

    // Voice Assistant
    'voice.title': 'वॉयस असिस्टेंट',
    'voice.subtitle': 'अपनी पसंदीदा भाषा में कृषि सलाह प्राप्त करें - तेलुगु, हिंदी या अंग्रेजी',

    // Weather
    'weather.title': 'मौसम और IoT निगरानी',
    'weather.subtitle': 'सूचित कृषि निर्णयों के लिए रीयल-टाइम मौसम डेटा और मिट्टी निगरानी',

    // Analytics
    'analytics.title': 'सरकारी एनालिटिक्स डैशबोर्ड',
    'analytics.subtitle': 'नीति निर्माण और संसाधन आवंटन के लिए राज्यव्यापी कृषि अंतर्दृष्टि',

    // Orders
    'orders.title': 'मेरे ऑर्डर',
    'orders.noOrders': 'अभी तक कोई ऑर्डर नहीं',
    'orders.noOrdersDesc': 'खरीदारी के बाद आपके ऑर्डर यहां दिखाई देंगे',
    'orders.orderId': 'ऑर्डर ID',
    'orders.quantity': 'मात्रा',
    'orders.total': 'कुल',
    'orders.orderDate': 'ऑर्डर दिनांक',
    'orders.deliveryAddress': 'डिलीवरी पता',
    'orders.viewDetails': 'विवरण देखें',
    'orders.trackOrder': 'ऑर्डर ट्रैक करें',
    'orders.status.pending': 'लंबित',
    'orders.status.dispatched': 'भेजा गया',
    'orders.status.delivered': 'डिलीवर किया गया',

    // Login
    'login.title': 'किसान पंजीकरण',
    'login.otpTitle': 'OTP सत्यापन',
    'login.fullName': 'पूरा नाम',
    'login.fullNamePlaceholder': 'अपना पूरा नाम दर्ज करें',
    'login.mobile': 'मोबाइल नंबर',
    'login.mobilePlaceholder': '10-अंकीय मोबाइल नंबर',
    'login.sendOtp': 'OTP भेजें',
    'login.sending': 'भेजा जा रहा है...',
    'login.otpSent': 'OTP भेजा गया',
    'login.enterOtp': '6-अंकीय OTP दर्ज करें',
    'login.verifyOtp': 'OTP सत्यापित करें',
    'login.verifying': 'सत्यापित कर रहे हैं...',
    'login.goBack': 'वापस जाएं',
    'login.fillAllFields': 'कृपया सभी फ़ील्ड भरें',
    'login.enterValidOtp': 'कृपया 6-अंकीय OTP दर्ज करें',
    'login.otpSentSuccess': '{mobile} पर OTP भेजा गया',
    'login.helpline': 'हेल्पलाइन: 1800-XXX-XXXX',
    'login.supportEmail': 'सहायता के लिए: support@tkisanmitra.telangana.gov.in'
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
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'te' || savedLanguage === 'hi')) {
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
