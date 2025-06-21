import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
    'nav.leafScanner': 'Leaf Scanner',
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
    'login.supportEmail': 'For support: support@tkisanmitra.telangana.gov.in',
    
    // Education specific translations
    'education.title': 'Agricultural Education',
    'education.subtitle': 'Learn modern farming techniques and best practices',
    'education.allTopics': 'All Topics',
    'education.organicFarming': 'Organic Farming',
    'education.soilTesting': 'Soil Testing',
    'education.waterManagement': 'Water Management',
    'education.cropCultivation': 'Crop Cultivation',
    'education.fertilizerUsage': 'Fertilizer Usage',
    'education.pulses': 'Pulses',
    'education.foodCrops': 'Food Crops',
    'education.vegetables': 'Vegetables',
    'education.fruits': 'Fruits',
    'education.animalHusbandry': 'Animal Husbandry',
    'education.watchNow': 'Watch Now',
    'education.playAudio': 'Play Audio',
    'education.download': 'Download',
    'education.video': 'Video',
    'education.playlist': 'Playlist',
    'education.article': 'Article',
    'education.helpTitle': 'Need Help?',
    'education.helpDescription': 'Learn more about farming techniques and best practices',
    'education.helpline': 'Helpline: 1800-425-0691',
    
    // Notifications
    'notifications.title': 'Notifications',
    'notifications.markAllRead': 'Mark all read',
    'notifications.clearAll': 'Clear all',
    'notifications.empty.title': 'No notifications',
    'notifications.empty.description': "You're all caught up!",
    'notifications.types.weather': 'Weather',
    'notifications.types.scheme': 'Schemes',
    'notifications.types.order': 'Orders',
    'notifications.types.market': 'Market Insights',
    
    // Weather notifications
    'notifications.weather.alert.title': 'Weather Alert',
    'notifications.weather.alert.message': 'Heavy rain expected tomorrow. Consider harvesting ready crops and protecting seedlings.',
    'notifications.weather.soilMoisture.title': 'Soil Moisture Alert',
    'notifications.weather.soilMoisture.message': 'Soil moisture levels are optimal for wheat sowing in your region.',
    
    // Order notifications
    'notifications.order.delivered.title': 'Order Delivered',
    'notifications.order.delivered.message': 'Your order {orderId} ({product}) has been successfully delivered.',
    'notifications.order.shipped.title': 'Order Shipped',
    'notifications.order.shipped.message': 'Your order {orderId} ({product}) is out for delivery. Expected by tomorrow.',
    
    // Scheme notifications
    'notifications.scheme.subsidy.title': 'New Government Scheme',
    'notifications.scheme.subsidy.message': 'PM-KISAN subsidy of {amount} has been credited to your account. Check your wallet.',
    'notifications.scheme.approved.title': 'Subsidy Application Approved',
    'notifications.scheme.approved.message': 'Your application for agricultural equipment subsidy has been approved. Amount: {amount}.',
    
    // Market notifications
    'notifications.market.priceUpdate.title': 'Market Price Update',
    'notifications.market.priceUpdate.message': '{crop} prices increased by {increase} in {location} market. Current rate: {price}/quintal.',
    'notifications.market.trend.title': 'Market Trend Alert',
    'notifications.market.trend.message': 'Organic vegetables showing 15% price increase. Consider transitioning to organic farming.'
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
    'features.analytics.description': 'పంట పర్యవేక్షణ, వాతావరण అంచనాలు & మార్కెట్ అంతర్దృష్టులు',
    'features.analytics.badge': 'లైవ్ డేటా',
    'features.government.title': 'ప్రభుత్వ డాష్‌బోర్డ్',
    'features.government.description': 'విధాన రూపకల్పన కోసం రాష్ట్రవ్యాప్త వ్యవసాయ అంతర్దృష్టులు',
    'features.government.badge': 'విధాన సాధనాలు',
    'features.iot.title': 'IoT ఇంటిగ్రేషన్',
    'features.iot.description': 'మట్టి తేమ & పర్యావరण పర్యవేక్షణ కోసం స్మార్ట్ సెన్సర్లు',
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
    'nav.leafScanner': 'ఆకు స్కానర్',
    
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
    'login.supportEmail': 'మద్దతు కోసం: support@tkisanmitra.telangana.gov.in',
    
    // Education specific translations
    'education.title': 'వ్యవసాయ విద్య',
    'education.subtitle': 'ఆధునిక వ్యవసాయ పద్ధతులను నేర్చుకోండి',
    'education.allTopics': 'అన్నీ',
    'education.organicFarming': 'సేంద్రీయ వ్యవసాయం',
    'education.soilTesting': 'నేల పరీక్ష',
    'education.waterManagement': 'నీటి నిర్వహణ',
    'education.cropCultivation': 'పంట సాగు',
    'education.fertilizerUsage': 'ఎరువుల వాడకం',
    'education.pulses': 'పప్పు పంటలు',
    'education.foodCrops': 'ఆహార పంటలు',
    'education.vegetables': 'కూరగాయలు',
    'education.fruits': 'పండ్లు',
    'education.animalHusbandry': 'పశు పెంపకం',
    'education.watchNow': 'ఇప్పుడు చూడండి',
    'education.playAudio': 'ఆడియో వినండి',
    'education.download': 'డౌన్‌లోడ్',
    'education.video': 'వీడియో',
    'education.playlist': 'ప్లేలిస్ట్',
    'education.article': 'వ్యాసం',
    'education.helpTitle': 'సహాయం కావాలా?',
    'education.helpDescription': 'వ్యవసాయ పద్ధతులు మరియు ఉత్తమ పద్ధతుల గురించి మరింత తెలుసుకోండి',
    'education.helpline': 'హెల్ప్‌లైన్: 1800-425-0691',
    
    // Notifications
    'notifications.title': 'నోటిఫికేషన్లు',
    'notifications.markAllRead': 'అన్నీ చదివినట్లు గుర్తించు',
    'notifications.clearAll': 'అన్నీ క్లియర్ చేయి',
    'notifications.empty.title': 'నోటిఫికేషన్లు లేవు',
    'notifications.empty.description': 'మీరు అన్నీ చూశారు!',
    'notifications.types.weather': 'వాతావరణం',
    'notifications.types.scheme': 'పథకాలు',
    'notifications.types.order': 'ఆర్డర్లు',
    'notifications.types.market': 'మార్కెట్ అంతర్దృష్టులు',
    
    // Weather notifications
    'notifications.weather.alert.title': 'వాతావరణ హెచ్చరిక',
    'notifications.weather.alert.message': 'రేపు భారీ వర్షాలు అనుమానిస్తున్నారు. సిద్ధమైన పంటలను కోయడం మరియు మొలకలను రక్షించడం గురించి ఆలోచించండి.',
    'notifications.weather.soilMoisture.title': 'మట్టి తేమ హెచ్చరిక',
    'notifications.weather.soilMoisture.message': 'మీ ప్రాంతంలో గోధుమ విత్తనాలకు మట్టి తేమ స్థాయిలు అనుకూలంగా ఉన్నాయి.',
    
    // Order notifications
    'notifications.order.delivered.title': 'ఆర్డర్ డెలివరీ అయింది',
    'notifications.order.delivered.message': 'మీ ఆర్డర్ {orderId} ({product}) విజయవంతంగా డెలివరీ అయింది.',
    'notifications.order.shipped.title': 'ఆర్డర్ పంపబడింది',
    'notifications.order.shipped.message': 'మీ ఆర్డర్ {orderId} ({product}) డెలివరీకి బయలుదేరింది. రేపు వచ్చే అవకాశం ఉంది.',
    
    // Scheme notifications
    'notifications.scheme.subsidy.title': 'కొత్త ప్రభుత్వ పథకం',
    'notifications.scheme.subsidy.message': 'PM-KISAN సబ్సిడీ {amount} మీ ఖాతాలో జమ చేయబడింది. మీ వాలెట్ చూడండి.',
    'notifications.scheme.approved.title': 'సబ్సిడీ దరఖాస్తు ఆమోదించబడింది',
    'notifications.scheme.approved.message': 'వ్యవసాయ పరికరాల సబ్సిడీ కోసం మీ దరఖాస్తు ఆమోదించబడింది. మొత్తం: {amount}.',
    
    // Market notifications
    'notifications.market.priceUpdate.title': 'మార్కెట్ ధర నవీకరణ',
    'notifications.market.priceUpdate.message': '{location} మార్కెట్‌లో {crop} ధరలు {increase} పెరిగాయి. ప్రస్తుత రేటు: {price}/క్వింటల్.',
    'notifications.market.trend.title': 'మార్కెట్ ట్రెండ్ హెచ్చరిక',
    'notifications.market.trend.message': 'సేంద్రీయ కూరగాయలు 15% ధర పెరుగుదల చూపిస్తున్నాయి. సేంద్రీయ వ్యవసాయానికి మారడాన్ని పరిగణించండి.'
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
    'nav.leafScanner': 'पत्ती स्कैनर',
    
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
    'login.supportEmail': 'सहायता के लिए: support@tkisanmitra.telangana.gov.in',
    
    // Education specific translations
    'education.title': 'कृषि शिक्षा',
    'education.subtitle': 'आधुनिक कृषि तकनीकों और सर्वोत्तम प्रथाओं को सीखें',
    'education.allTopics': 'सभी विषय',
    'education.organicFarming': 'जैविक खेती',
    'education.soilTesting': 'मिट्टी परीक्षण',
    'education.waterManagement': 'जल प्रबंधन',
    'education.cropCultivation': 'फसल खेती',
    'education.fertilizerUsage': 'उर्वरक उपयोग',
    'education.pulses': 'दलहन',
    'education.foodCrops': 'खाद्य फसलें',
    'education.vegetables': 'सब्जियां',
    'education.fruits': 'फल',
    'education.animalHusbandry': 'पशुपालन',
    'education.watchNow': 'अभी देखें',
    'education.playAudio': 'ऑडियो चलाएं',
    'education.download': 'डाउनलोड',
    'education.video': 'वीडियो',
    'education.playlist': 'प्लेलिस्ट',
    'education.article': 'लेख',
    'education.helpTitle': 'सहायता चाहिए?',
    'education.helpDescription': 'कृषि तकनीकों और सर्वोत्तम प्रथाओं के बारे में और जानें',
    'education.helpline': 'हेल्पलाइन: 1800-425-0691',
    
    // Notifications
    'notifications.title': 'सूचनाएं',
    'notifications.markAllRead': 'सभी को पढ़ा हुआ चिह्नित करें',
    'notifications.clearAll': 'सभी साफ़ करें',
    'notifications.empty.title': 'कोई सूचना नहीं',
    'notifications.empty.description': 'आप सभी देख चुके हैं!',
    'notifications.types.weather': 'मौसम',
    'notifications.types.scheme': 'योजनाएं',
    'notifications.types.order': 'ऑर्डर',
    'notifications.types.market': 'बाजार अंतर्दृष्टि',
    
    // Weather notifications
    'notifications.weather.alert.title': 'मौसम चेतावनी',
    'notifications.weather.alert.message': 'कल भारी बारिश की उम्मीद है। तैयार फसलों की कटाई और पौधों की सुरक्षा पर विचार करें।',
    'notifications.weather.soilMoisture.title': 'मिट्टी की नमी चेतावनी',
    'notifications.weather.soilMoisture.message': 'आपके क्षेत्र में गेहूं की बुआई के लिए मिट्टी की नमी का स्तर उपयुक्त है।',
    
    // Order notifications
    'notifications.order.delivered.title': 'ऑर्डर डिलीवर किया गया',
    'notifications.order.delivered.message': 'आपका ऑर्डर {orderId} ({product}) सफलतापूर्वक डिलीवर कर दिया गया है।',
    'notifications.order.shipped.title': 'ऑर्डर भेजा गया',
    'notifications.order.shipped.message': 'आपका ऑर्डर {orderId} ({product}) डिलीवरी के लिए निकल गया है। कल तक आने की उम्मीद है।',
    
    // Scheme notifications
    'notifications.scheme.subsidy.title': 'नई सरकारी योजना',
    'notifications.scheme.subsidy.message': 'PM-KISAN सब्सिडी {amount} आपके खाते में जमा कर दी गई है। अपना वॉलेट चेक करें।',
    'notifications.scheme.approved.title': 'सब्सिडी आवेदन स्वीकृत',
    'notifications.scheme.approved.message': 'कृषि उपकरण सब्सिडी के लिए आपका आवेदन स्वीकृत हो गया है। राशि: {amount}।',
    
    // Market notifications
    'notifications.market.priceUpdate.title': 'बाजार मूल्य अपडेट',
    'notifications.market.priceUpdate.message': '{location} बाजार में {crop} की कीमतें {increase} बढ़ गई हैं। वर्तमान दर: {price}/क्विंटल।',
    'notifications.market.trend.title': 'बाजार ट्रेंड अलर्ट',
    'notifications.market.trend.message': 'जैविक सब्जियां 15% मूल्य वृद्धि दिखा रही हैं। जैविक खेती में बदलाव पर विचार करें।'
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
