
export class AIResponseEngine {
  private responses = {
    en: {
      greeting: [
        "Hello! I'm your farming assistant. How can I help you today?",
        "Welcome to Agri Mitra! Ask me about crops, fertilizers, diseases, or any farming question.",
        "Hi there! I'm here to help with all your agricultural needs. What would you like to know?"
      ],
      weather: [
        "Based on current weather patterns, ensure proper drainage during monsoon season. Check soil moisture levels regularly.",
        "For hot weather: increase irrigation frequency, provide shade for sensitive crops, and apply mulching.",
        "Weather forecast shows good conditions for field preparation. Perfect time for sowing season crops.",
        "High humidity detected. Watch for fungal diseases in crops. Consider copper-based fungicides if needed."
      ],
      crop: [
        "For healthy crop growth: maintain proper spacing, ensure adequate nutrition, and monitor for pests regularly.",
        "Crop rotation is essential. Alternate between legumes and cereals to maintain soil fertility naturally.",
        "Monitor your crops for early signs of stress - yellowing, wilting, or unusual growth patterns.",
        "Organic farming tip: Use neem-based pesticides and encourage beneficial insects in your fields."
      ],
      price: [
        "Current market trends show good demand for organic produce. Consider transitioning to organic farming.",
        "Rice prices: ₹2800-3200/quintal, Cotton: ₹6200-6800/quintal, check local mandis for exact rates.",
        "Best time to sell is just after harvest when quality is highest. Avoid selling during glut periods.",
        "Government MSP rates have been updated. Check with local procurement centers for current prices."
      ],
      fertilizer: [
        "NPK ratio for rice: 120:60:40 kg/hectare. Apply in 3 splits - basal, tillering, and panicle stages.",
        "Organic alternatives: Compost, vermicompost, and green manure can reduce chemical fertilizer dependency.",
        "Soil testing is crucial. Test every 2-3 years to determine exact nutrient requirements.",
        "Micronutrients like zinc and iron are often deficient. Consider foliar spray applications."
      ],
      disease: [
        "Common rice diseases: Blast, brown spot, sheath blight. Use resistant varieties and proper field sanitation.",
        "Fungal diseases thrive in humid conditions. Ensure proper air circulation and avoid overhead irrigation.",
        "IPM approach: Use biological control agents like Trichoderma and Pseudomonas for disease management.",
        "Early detection is key. Remove infected plants immediately to prevent disease spread."
      ],
      government: [
        "PM-KISAN scheme provides ₹6000/year. Check your eligibility and application status online.",
        "Crop insurance under PMFBY covers weather risks. Enroll before the cut-off date each season.",
        "KCC (Kisan Credit Card) offers easy agricultural loans. Visit your nearest bank for application.",
        "Subsidies available for drip irrigation, solar pumps, and farm machinery. Check with agriculture department."
      ],
      default: [
        "I understand your farming concern. Could you provide more specific details about your crop or problem?",
        "Based on your query, I recommend consulting with local agricultural extension officers for region-specific advice.",
        "That's a great agricultural question! For best results, consider soil conditions, local climate, and crop variety.",
        "Farming practices vary by region. What's your location and crop type? This will help me give better advice."
      ]
    },
    te: {
      greeting: [
        "నమస్కారం! నేను మీ వ్యవసాయ సహాయకుడను. ఈ రోజు మీకు ఎలా సహాయం చేయగలను?",
        "అగ్రి మిత్రకు స్వాగతం! పంటలు, ఎరువులు, వ్యాధులు లేదా ఏ వ్యవసాయ ప్రశ్న అయినా అడగండి.",
        "హలో! మీ అన్ని వ్యవసాయ అవసరాలతో సహాయం చేయడానికి నేను ఇక్కడ ఉన్నాను. మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?"
      ],
      weather: [
        "ప్రస్తుత వాతావరణ పరిస్థితుల ఆధారంగా, వర్షాకాలంలో సరైన నీటి వెదజల్లడం నిర్ధారించండి. నేల తేమ స్థాయిలను క్రమం తప్పకుండా తనిఖీ చేయండి.",
        "వేడిమికి: నీటిపారుదల తరచుదనం పెంచండి, సున్నితమైన పంటలకు నీడ అందించండి, మరియు మల్చింగ్ చేయండి.",
        "వాతావరణ సూచన మేరకు పొలం సిద్ధం చేయడానికి మంచి పరిస్థితులు కనిపిస్తున్నాయి. సీజన్ పంటలు విత్తడానికి సరైన సమయం.",
        "అధిక తేమ గుర్తించబడింది. పంటలలో ఫంగల్ వ్యాధుల కోసం చూడండి. అవసరమైతే కాపర్-బేస్డ్ ఫంగిసైడ్లను పరిగణించండి."
      ],
      crop: [
        "ఆరోగ్యకరమైన పంట పెరుగుదలకు: సరైన అంతరం ఉంచండి, తగిన పోషణ నిర్ధారించండి, మరియు తరచుగా చీడపీడలను పర్యవేక్షించండి.",
        "పంట మార్పిడి అవసరం. నేల సంతానోత్పత్తిని సహజంగా కాపాడుకోవడానికి పప్పు ధాన్యాలు మరియు తృణధాన్యాల మధ్య మార్చండి.",
        "మీ పంటలను ఒత్తిడి యొక్క ప్రారంభ సంకేతాల కోసం పర్యవేక్షించండి - పసుపు రంగు, వాడిపోవడం లేదా అసాధారణ పెరుగుదల.",
        "సేంద్రీయ వ్యవసాయ చిట్కా: వేప-ఆధారిత పురుగుమందులను ఉపయోగించండి మరియు మీ పొలాల్లో లాభకరమైన కీటకాలను ప్రోత్సహించండి."
      ],
      price: [
        "ప్రస్తుత మార్కెట్ ధోరణులు సేంద్రీయ ఉత్పత్తులకు మంచి డిమాండ్ చూపిస్తున్నాయి. సేంద్రీయ వ్యవసాయానికి మారడాన్ని పరిగణించండి.",
        "వరి ధరలు: ₹2800-3200/క్వింటల్, పత్తి: ₹6200-6800/క్వింటల్, ఖచ్చితమైన రేట్లకు స్థానిక మార్కెట్లను తనిఖీ చేయండి.",
        "అమ్మడానికి మంచి సమయం కోత తర్వాత నాణ్యత అధికంగా ఉన్నప్పుడు. అధిక ఉత్పత్తి సమయాల్లో అమ్మకాలను నివారించండి.",
        "ప్రభుత్వ MSP రేట్లు నవీకరించబడ్డాయి. ప్రస్తుత ధరల కోసం స్థానిక సేకరణ కేంద్రాలను తనిఖీ చేయండి."
      ],
      fertilizer: [
        "వరికి NPK నిష్పత్తి: 120:60:40 కిలోలు/హెక్టారు. 3 విడతలుగా వేయండి - బేసల్, టిల్లరింగ్, మరియు పానికిల్ దశలు.",
        "సేంద్రీయ ప్రత్యామ్నాయాలు: కంపోస్ట్, పురుగుల ఎరువు, మరియు పచ్చి ఎరువు రసాయన ఎరువుల ఆధారపడటాన్ని తగ్గించవచ్చు.",
        "నేల పరీక్ష కీలకం. ఖచ్చితమైన పోషక అవసరాలను నిర్ణయించడానికి ప్రతి 2-3 సంవత్సరాలకు పరీక్షించండి.",
        "జింక్ మరియు ఇనుము వంటి సూక్ష్మ పోషకాలు తరచుగా లోపంగా ఉంటాయి. ఆకుల మీద స్ప్రే అప్లికేషన్లను పరిగణించండి."
      ],
      disease: [
        "సాధారణ వరి వ్యాధులు: బ్లాస్ట్, గోధుమ రంగు మచ్చలు, కోశ కుళ్ళు. నిరోధక రకాలు మరియు సరైన పొలం పరిశుభ్రతను ఉపయోగించండి.",
        "ఫంగల్ వ్యాధులు తేమతో కూడిన పరిస్థితుల్లో వృద్ధి చెందుతాయి. సరైన గాలి ప్రసరణ నిర్ధారించండి మరియు ఓవర్‌హెడ్ నీటిపారుదలను నివారించండి.",
        "IPM విధానం: వ్యాధుల నిర్వహణ కోసం ట్రైకోడెర్మా మరియు సూడోమోనాస్ వంటి జీవ నియంత్రణ ఏజెంట్లను ఉపయోగించండి.",
        "ముందస్తు గుర్తింపు కీలకం. వ్యాధి వ్యాప్తిని నిరోధించడానికి వెంటనే సోకిన మొక్కలను తొలగించండి."
      ],
      government: [
        "PM-KISAN పథకం సంవత్సరానికి ₹6000 అందిస్తుంది. మీ అర్హత మరియు దరఖాస్తు స్థితిని ఆన్‌లైన్‌లో తనిఖీ చేయండి.",
        "PMFBY కింద పంట బీమా వాతావరణ ప్రమాదాలను కవర్ చేస్తుంది. ప్రతి సీజన్ కట్-ఆఫ్ తేదీకి ముందు నమోదు చేసుకోండి.",
        "KCC (కిసాన్ క్రెడిట్ కార్డ్) సులభమైన వ్యవసాయ రుణాలను అందిస్తుంది. దరఖాస్తు కోసం మీ సమీప బ్యాంకును సందర్శించండి.",
        "డ్రిప్ ఇరిగేషన్, సోలార్ పంపులు, మరియు వ్యవసాయ యంత్రాలకు సబ్సిడీలు అందుబాటులో ఉన్నాయి. వ్యవసాయ విభాగంతో తనిఖీ చేయండి."
      ],
      default: [
        "మీ వ్యవసాయ ఆందోళన నాకు అర్థమైంది. మీ పంట లేదా సమస్య గురించి మరింత నిర్దిష్ట వివరాలను అందించగలరా?",
        "మీ ప్రశ్న ఆధారంగా, ప్రాంత-నిర్దిష్ట సలహా కోసం స్థానిక వ్యవసాయ విస్తరణ అధికారులతో సంప్రదించమని సిఫార్సు చేస్తున్నాను.",
        "అది గొప్ప వ్యవసాయ ప్రశ్న! మంచి ఫలితాల కోసం, నేల పరిస్థితులు, స్థానిక వాతావరణం మరియు పంట రకాన్ని పరిగణించండి.",
        "వ్యవసాయ పద్ధతులు ప్రాంతాన్ని బట్టి మారుతాయి. మీ స్థానం మరియు పంట రకం ఏమిటి? ఇది మంచి సలహా ఇవ్వడంలో సహాయపడుతుంది."
      ]
    }
  };

  async generateResponse(input: string, language: 'en' | 'te' = 'en'): Promise<string> {
    console.log(`Generating agricultural AI response for: "${input}" in language: ${language}`);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const normalizedInput = input.toLowerCase().trim();
    let category = 'default';
    
    // Enhanced keyword matching for agricultural topics
    if (this.containsKeywords(normalizedInput, ['వాన', 'వాతావరణం', 'weather', 'rain', 'temperature', 'climate', 'humidity', 'మौసம', 'बारिश', 'तापमान'])) {
      category = 'weather';
    }
    else if (this.containsKeywords(normalizedInput, ['పంట',  'వ్యవసాయం', 'crop', 'farming', 'agriculture', 'cultivation', 'planting', 'फसल', 'कृषि', 'खेती', 'రైస్', 'వరి', 'rice', 'cotton', 'పత్తి', 'corn', 'wheat'])) {
      category = 'crop';
    }
    else if (this.containsKeywords(normalizedInput, ['ధర', 'మార్కెట్', 'price', 'market', 'cost', 'sell', 'buy', 'दाम', 'बाजार', 'कीमत', 'MSP', 'mandi', 'మండి'])) {
      category = 'price';
    }
    else if (this.containsKeywords(normalizedInput, ['ఎరువు', 'fertilizer', 'NPK', 'compost', 'organic', 'urea', 'खाद', 'उर्वरक', 'soil', 'nutrients', 'పోషకాలు'])) {
      category = 'fertilizer';
    }
    else if (this.containsKeywords(normalizedInput, ['వ్యాధి', 'disease', 'pest', 'fungal', 'bacterial', 'virus', 'बीमारी', 'कीट', 'infection', 'చీడపీడలు', 'కుళ్ళు'])) {
      category = 'disease';
    }
    else if (this.containsKeywords(normalizedInput, ['ప్రభుత్వం', 'government', 'scheme', 'subsidy', 'insurance', 'loan', 'योजना', 'सब्सिडी', 'बीमा', 'PM-KISAN', 'KCC', 'PMFBY'])) {
      category = 'government';
    }
    else if (this.containsKeywords(normalizedInput, ['నమస్కారం', 'హలో', 'hello', 'hi', 'hey', 'नमस्कार', 'हैलो', 'help', 'assist'])) {
      category = 'greeting';
    }

    // Get random response from selected category
    const categoryResponses = this.responses[language][category as keyof typeof this.responses[typeof language]];
    const randomIndex = Math.floor(Math.random() * categoryResponses.length);
    
    const response = categoryResponses[randomIndex];
    console.log(`Generated agricultural response: "${response}"`);
    
    return response;
  }

  private containsKeywords(input: string, keywords: string[]): boolean {
    return keywords.some(keyword => input.includes(keyword.toLowerCase()));
  }

  // Generate context-aware greeting
  generateWelcomeGreeting(language: 'en' | 'te', userName?: string): string {
    const currentHour = new Date().getHours();
    const timeGreeting = {
      en: currentHour < 12 ? 'Good morning' : currentHour < 17 ? 'Good afternoon' : 'Good evening',
      te: currentHour < 12 ? 'శుభోదయం' : currentHour < 17 ? 'శుభ మధ్యాహ్నం' : 'శుభ సాయంత్రం'
    };

    const greetingText = {
      en: `${timeGreeting.en} ${userName || 'Farmer'}! I'm Agri Mitra, your intelligent farming assistant. Ask me about crops, weather, fertilizers, diseases, market prices, or government schemes. How can I help you grow better crops today?`,
      te: `${timeGreeting.te} ${userName || 'రైతు గారు'}! నేను అగ్రి మిత్ర, మీ తెలివైన వ్యవసాయ సహాయకుడు. పంటలు, వాతావరణం, ఎరువులు, వ్యాధులు, మార్కెట్ ధరలు లేదా ప్రభుత్వ పథకాల గురించి అడగండి. మంచి పంటలు పండించడంలో ఈ రోజు మీకు ఎలా సహాయం చేయగలను?`
    };

    return greetingText[language];
  }
}
