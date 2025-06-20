
export class AIResponseEngine {
  private readonly responses: { [key: string]: { [key: string]: string[] } } = {
    weather: {
      en: [
        "Today's weather is partly cloudy with a temperature of 28°C. Good conditions for most farming activities.",
        "It's sunny today with light winds. Perfect weather for spraying pesticides or fertilizers.",
        "Expecting light rain this evening. Consider covering your harvested crops."
      ],
      te: [
        "నేడు వాతావరణం పాక్షికంగా మేఘావృతం మరియు ఉష్ణోగ్రత 28°C. చాలా వ్యవసాయ కార్యకలాపాలకు మంచి పరిస్థితులు.",
        "నేడు ఎండగా ఉంది మరియు తేలికపాటి గాలులు. పురుగుమందులు లేదా ఎరువులు చల్లడానికి అనువైన వాతావరణం.",
        "ఈ సాయంత్రం తేలికపాటి వర్షం అని అంచనా. మీ పండించిన పంటలను కప్పడాన్ని పరిగణించండి."
      ],
      hi: [
        "आज का मौसम आंशिक रूप से बादल छाए हुए हैं और तापमान 28°C है। अधिकांश कृषि गतिविधियों के लिए अच्छी स्थितियां।",
        "आज धूप है और हल्की हवाएं हैं। कीटनाशक या उर्वरक छिड़काव के लिए बेहतरीन मौसम।",
        "आज शाम हल्की बारिश की संभावना है। अपनी कटी हुई फसलों को ढकने पर विचार करें।"
      ]
    },
    crop_advice: {
      en: [
        "For tomatoes, plant during monsoon season (June-July) for better yield. Ensure proper drainage.",
        "Cotton planting is best done in April-May. Maintain 60cm spacing between plants.",
        "Rice transplantation should be done 25-30 days after sowing. Maintain 2-3 inches of water."
      ],
      te: [
        "టమాటోల కోసం, మంచి దిగుబడి కోసం వర్షాకాలంలో (జూన్-జూలై) నాటండి. సరైన నీటి నిష్కాసనను నిర్ధారించండి.",
        "పత్తి నాటడం ఏప్రిల్-మేలో చేయడం మంచిది. మొక్కల మధ్య 60సెం.మీ. దూరం ఉంచండి.",
        "వరి మార్పిడి విత్తనం వేసిన 25-30 రోజుల తర్వాత చేయాలి. 2-3 అంగుళాల నీరు ఉంచండి."
      ],
      hi: [
        "टमाटर के लिए, बेहतर उपज के लिए मानसून के मौसम (जून-जुलाई) में रोपण करें। उचित जल निकासी सुनिश्चित करें।",
        "कपास की रोपाई अप्रैल-मई में करना सबसे अच्छा है। पौधों के बीच 60 सेमी की दूरी बनाए रखें।",
        "धान की रोपाई बुआई के 25-30 दिन बाद करनी चाहिए। 2-3 इंच पानी बनाए रखें।"
      ]
    },
    pest_control: {
      en: [
        "For cotton pest control, use neem-based organic pesticides. Apply during early morning or evening.",
        "Red spider mites can be controlled with sulfur-based sprays. Maintain proper humidity levels.",
        "For aphid control, introduce beneficial insects like ladybugs or use soap solution sprays."
      ],
      te: [
        "పత్తి చీడపీడల నియంత్రణ కోసం, వేప ఆధారిత సేంద్రీయ పురుగుమందులను ఉపయోగించండి. ఉదయం లేదా సాయంత్రం వేళల్లో వేయండి.",
        "ఎర్ర సాలె పురుగులను సల్ఫర్ ఆధారిత స్ప్రేలతో నియంత్రించవచ్చు. సరైన తేమ స్థాయిలను నిర్వహించండి.",
        "అఫిడ్ నియంత్రణ కోసం, లేడీబగ్స్ వంటి ప్రయోజనకరమైన కీటకాలను పరిచయం చేయండి లేదా సబ్బు ద్రావణ స్ప్రేలను ఉపయోగించండి."
      ],
      hi: [
        "कपास कीट नियंत्रण के लिए, नीम आधारित जैविक कीटनाशकों का उपयोग करें। सुबह जल्दी या शाम को लगाएं।",
        "लाल मकड़ी के कण सल्फर आधारित स्प्रे से नियंत्रित किए जा सकते हैं। उचित आर्द्रता स्तर बनाए रखें।",
        "एफिड नियंत्रण के लिए, लेडीबग जैसे लाभकारी कीड़े लाएं या साबुन के घोल का छिड़काव करें।"
      ]
    },
    general: {
      en: [
        "I'm here to help with all your farming questions. You can ask about weather, crop advice, pest control, or general agriculture information.",
        "As your farming assistant, I can provide guidance on planting, harvesting, pest management, and weather updates.",
        "Feel free to ask me anything about agriculture, from soil management to crop rotation strategies."
      ],
      te: [
        "మీ అన్ని వ్యవసాయ ప్రశ్నలకు సహాయం చేయడానికి నేను ఇక్కడ ఉన్నాను. మీరు వాతావరణం, పంట సలహా, చీడపీడల నియంత్రణ లేదా సాధారణ వ్యవసాయ సమాచారం గురించి అడగవచ్చు.",
        "మీ వ్యవసాయ సహాయకుడిగా, నేను నాటడం, పంట కోత, చీడపీడల నిర్వహణ మరియు వాతావరణ నవీకరణలపై మార్గదర్శనం అందించగలను.",
        "మట్టి నిర్వహణ నుండి పంట భ్రమణ వ్యూహాల వరకు వ్యవసాయం గురించి ఏదైనా నన్ను అడగడానికి సంకోచించకండి."
      ],
      hi: [
        "मैं आपके सभी कृषि प्रश्नों में मदद के लिए यहाँ हूँ। आप मौसम, फसल सलाह, कीट नियंत्रण, या सामान्य कृषि जानकारी के बारे में पूछ सकते हैं।",
        "आपके कृषि सहायक के रूप में, मैं रोपण, कटाई, कीट प्रबंधन, और मौसम अपडेट पर मार्गदर्शन प्रदान कर सकता हूँ।",
        "मिट्टी प्रबंधन से लेकर फसल चक्र रणनीतियों तक कृषि के बारे में मुझसे कुछ भी पूछने में संकोच न करें।"
      ]
    }
  };

  async generateResponse(input: string, language: string): Promise<string> {
    console.log('Processing input:', input, 'in language:', language);
    
    const normalizedInput = input.toLowerCase().trim();
    
    // Weather related queries
    if (this.containsKeywords(normalizedInput, ['weather', 'వాతావరణం', 'मौसम', 'rain', 'వర్షం', 'बारिश', 'sun', 'ఎండ', 'धूप'])) {
      return this.getRandomResponse('weather', language);
    }
    
    // Crop advice queries
    if (this.containsKeywords(normalizedInput, ['plant', 'crop', 'tomato', 'cotton', 'rice', 'నాట', 'పంట', 'టమాటో', 'పత్తి', 'వరి', 'लगाना', 'फसल', 'टमाटर', 'कपास', 'चावल'])) {
      return this.getRandomResponse('crop_advice', language);
    }
    
    // Pest control queries
    if (this.containsKeywords(normalizedInput, ['pest', 'control', 'insects', 'చీడ', 'పీడ', 'నియంत्रण', 'कीट', 'नियंत्रण', 'कीड़े'])) {
      return this.getRandomResponse('pest_control', language);
    }
    
    // Timer/reminder requests
    if (this.containsKeywords(normalizedInput, ['timer', 'remind', 'రిమైండర్', 'याद', 'समय'])) {
      return this.handleTimerRequest(input, language);
    }
    
    // General greetings and help
    if (this.containsKeywords(normalizedInput, ['hello', 'hi', 'help', 'नमस्ते', 'సహాయం', 'మदद'])) {
      return this.getRandomResponse('general', language);
    }
    
    // Default response
    return this.getDefaultResponse(language);
  }

  private containsKeywords(input: string, keywords: string[]): boolean {
    return keywords.some(keyword => input.includes(keyword.toLowerCase()));
  }

  private getRandomResponse(category: string, language: string): string {
    const responses = this.responses[category];
    if (!responses || !responses[language]) {
      return this.getDefaultResponse(language);
    }
    
    const categoryResponses = responses[language];
    const randomIndex = Math.floor(Math.random() * categoryResponses.length);
    return categoryResponses[randomIndex];
  }

  private handleTimerRequest(input: string, language: string): string {
    const timerResponses = {
      en: "I've noted your reminder request. For now, I suggest using your phone's timer or calendar app. In future updates, I'll be able to set reminders directly!",
      te: "మీ రిమైండర్ అభ్యర్థనను నేను గుర్తుంచుకున్నాను. ప్రస్తుతానికి, మీ ఫోన్ టైమర్ లేదా క్యాలెండర్ యాప్‌ను ఉపయోగించాలని సూచిస్తున్నాను. భవిష్యత్ నవీకరణలలో, నేను నేరుగా రిమైండర్‌లను సెట్ చేయగలను!",
      hi: "मैंने आपके रिमाइंडर अनुरोध को नोट कर लिया है। अभी के लिए, मैं आपके फोन के टाइमर या कैलेंडर ऐप का उपयोग करने का सुझाव देता हूं। भविष्य के अपडेट में, मैं सीधे रिमाइंडर सेट कर पाऊंगा!"
    };
    
    return timerResponses[language as keyof typeof timerResponses] || timerResponses.en;
  }

  private getDefaultResponse(language: string): string {
    const defaultResponses = {
      en: "I understand you're asking about farming. Could you please be more specific? I can help with weather, crop advice, pest control, or general agriculture questions.",
      te: "మీరు వ్యవసాయం గురించి అడుగుతున్నారని నేను అర్థం చేసుకున్నాను. దయచేసి మరింత నిర్దిష్టంగా చెప్పగలరా? నేను వాతావరణం, పంట సలహా, చీడపీడల నియంత్రణ లేదా సాధారణ వ్యవసాయ ప్రశ్నలతో సహాయం చేయగలను.",
      hi: "मैं समझता हूं कि आप कृषि के बारे में पूछ रहे हैं। कृपया अधिक विशिष्ट हो सकते हैं? मैं मौसम, फसल सलाह, कीट नियंत्रण, या सामान्य कृषि प्रश्नों में मदद कर सकता हूं।"
    };
    
    return defaultResponses[language as keyof typeof defaultResponses] || defaultResponses.en;
  }
}
