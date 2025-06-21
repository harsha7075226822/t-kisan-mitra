
export class AIResponseEngine {
  private responses = {
    en: {
      greeting: [
        "Hello! I'm here to help you with your farming questions.",
        "Welcome! How can I assist you today with your agricultural needs?",
        "Hi there! Ask me anything about farming, weather, or crops."
      ],
      weather: [
        "Based on current conditions, expect moderate weather with possible light rain in the evening.",
        "Today's weather looks favorable for farming activities. Temperature around 28°C with 70% humidity.",
        "Weather forecast shows clear skies in the morning, some clouds in the afternoon."
      ],
      crop: [
        "For healthy crop growth, ensure proper irrigation and timely fertilizer application.",
        "Consider organic pesticides for better crop protection without harmful chemicals.",
        "Monitor your crops daily for any signs of disease or pest infestation."
      ],
      price: [
        "Current market prices show good demand for rice and cotton crops.",
        "Vegetable prices are stable this week with tomatoes at ₹30 per kg.",
        "Check our market section for latest crop price updates."
      ],
      default: [
        "I understand your concern. Let me help you with that farming question.",
        "That's a great question about agriculture. Here's what I recommend...",
        "Based on my knowledge, I suggest you consider these farming practices."
      ]
    },
    te: {
      greeting: [
        "నమస్కారం! నేను మీ వ్యవసాయ ప్రశ్నలతో సహాయం చేయడానికి ఇక్కడ ఉన్నాను.",
        "స్వాగతం! మీ వ్యవసాయ అవసరాలతో నేను ఎలా సహాయం చేయగలను?",
        "హలో! వ్యవసాయం, వాతావరణం లేదా పంటల గురించి ఏదైనా అడగండి."
      ],
      weather: [
        "ప్రస్తుత పరిస్థితుల ప్రకారం, సాయంత్రం తేలికపాటి వర్షంతో మధ్యస్థ వాతావరణం ఆశించవచ్చు.",
        "నేటి వాతావరణం వ్యవసాయ కార్యకలాపాలకు అనుకూలంగా ఉంది. ఉష్ణోగ్రత 28°C మరియు తేమ 70%.",
        "వాతావరణ సూచన ప్రకారం ఉదయం స్పష్టమైన ఆకాశం, మధ్యాహ్నం కొన్ని మేఘాలు."
      ],
      crop: [
        "ఆరోగ్యకరమైన పంట పెరుగుదలకు, సరైన నీటిపారుదల మరియు సకాలంలో ఎరువుల ప్రయోగం నిర్ధారించండి.",
        "హానికరమైన రసాయనాలు లేకుండా మెరుగైన పంట రక్షణ కోసం సేంద్రీయ పురుగుమందులను పరిగణించండి.",
        "వ్యాధి లేదా చీడపీడల సంకేతాల కోసం మీ పంటలను ప్రతిరోజూ పర్యవేక్షించండి."
      ],
      price: [
        "ప్రస్తుత మార్కెట్ ధరలు వరి మరియు పత్తి పంటలకు మంచి డిమాండ్ చూపిస్తున్నాయి.",
        "కూరగాయల ధరలు ఈ వారం స్థిరంగా ఉన్నాయి, టమాటోలు కిలోకు ₹30.",
        "తాజా పంట ధర అప్‌డేట్‌ల కోసం మా మార్కెట్ విభాగాన్ని చూడండి."
      ],
      default: [
        "మీ ఆందోళన నాకు అర్థమైంది. ఆ వ్యవసాయ ప్రశ్నతో నేను మీకు సహాయం చేస్తాను.",
        "వ్యవసాయం గురించి అది మంచి ప్రశ్న. నేను ఇలా సిఫార్సు చేస్తున్నాను...",
        "నా జ్ఞానం ఆధారంగా, మీరు ఈ వ్యవసాయ పద్ధతులను పరిగణించాలని సూచిస్తున్నాను."
      ]
    },
    hi: {
      greeting: [
        "नमस्कार! मैं आपके कृषि प्रश्नों में मदद करने के लिए यहाँ हूँ।",
        "स्वागत है! मैं आपकी कृषि आवश्यकताओं में कैसे सहायता कर सकता हूँ?",
        "हैलो! खेती, मौसम या फसलों के बारे में कुछ भी पूछें।"
      ],
      weather: [
        "वर्तमान स्थितियों के अनुसार, शाम को हल्की बारिश के साथ मध्यम मौसम की उम्मीद है।",
        "आज का मौसम कृषि गतिविधियों के लिए अनुकूल दिख रहा है। तापमान 28°C और 70% आर्द्रता।",
        "मौसम पूर्वानुमान सुबह साफ आसमान, दोपहर में कुछ बादल दिखाता है।"
      ],
      crop: [
        "स्वस्थ फसल वृद्धि के लिए, उचित सिंचाई और समय पर उर्वरक का प्रयोग सुनिश्चित करें।",
        "हानिकारक रसायनों के बिना बेहतर फसल सुरक्षा के लिए जैविक कीटनाशकों पर विचार करें।",
        "बीमारी या कीट संक्रमण के किसी भी संकेत के लिए अपनी फसलों की दैनिक निगरानी करें।"
      ],
      price: [
        "वर्तमान बाजार दरें चावल और कपास की फसलों के लिए अच्छी मांग दिखाती हैं।",
        "सब्जियों की कीमतें इस सप्ताह स्थिर हैं, टमाटर ₹30 प्रति किलो।",
        "नवीनतम फसल मूल्य अपडेट के लिए हमारा मार्केट सेक्शन देखें।"
      ],
      default: [
        "मैं आपकी चिंता समझता हूँ। उस कृषि प्रश्न में मैं आपकी मदद करता हूँ।",
        "कृषि के बारे में यह एक बहुत अच्छा प्रश्न है। मैं यह सुझाता हूँ...",
        "मेरी जानकारी के आधार पर, मैं सुझाता हूँ कि आप इन कृषि पद्धतियों पर विचार करें।"
      ]
    }
  };

  async generateResponse(input: string, language: 'en' | 'te' | 'hi' = 'en'): Promise<string> {
    console.log(`Generating response for: "${input}" in language: ${language}`);
    
    // Normalize input for better matching
    const normalizedInput = input.toLowerCase().trim();
    
    // Determine response category based on keywords
    let category = 'default';
    
    // Weather keywords
    if (this.containsKeywords(normalizedInput, ['వాన', 'వాతావరణం', 'weather', 'rain', 'temperature', 'मौसम', 'बारिश', 'तापमान'])) {
      category = 'weather';
    }
    // Crop keywords  
    else if (this.containsKeywords(normalizedInput, ['పంట', 'వ్యవసాయం', 'crop', 'farming', 'plant', 'फसल', 'कृषि', 'खेती'])) {
      category = 'crop';
    }
    // Price keywords
    else if (this.containsKeywords(normalizedInput, ['ధర', 'మార్కెట్', 'price', 'market', 'cost', 'दाम', 'बाजार', 'कीमत'])) {
      category = 'price';
    }
    // Greeting keywords
    else if (this.containsKeywords(normalizedInput, ['నమస్కారం', 'హలో', 'hello', 'hi', 'नमस्कार', 'हैलो'])) {
      category = 'greeting';
    }

    // Get random response from selected category
    const categoryResponses = this.responses[language][category as keyof typeof this.responses[typeof language]];
    const randomIndex = Math.floor(Math.random() * categoryResponses.length);
    
    return categoryResponses[randomIndex];
  }

  private containsKeywords(input: string, keywords: string[]): boolean {
    return keywords.some(keyword => input.includes(keyword.toLowerCase()));
  }
}
