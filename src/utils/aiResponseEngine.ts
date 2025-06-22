export class AIResponseEngine {
  private responses = {
    en: {
      weather: [
        "Based on current data, the weather in Telangana is generally favorable for farming. Temperature ranges from 25-35°C with moderate humidity. Check local forecasts for your specific district.",
        "Today's weather conditions show clear skies with temperatures around 28°C. Good conditions for field work and irrigation activities.",
        "Weather patterns indicate normal monsoon expectations. Prepare your fields for the upcoming season with proper soil preparation."
      ],
      prices: [
        "Current market prices in Telangana: Tomatoes ₹25-30/kg, Onions ₹20-25/kg, Rice ₹20-25/kg. Prices may vary by district and market conditions.",
        "Today's mandi rates show stable prices for most vegetables. Tomatoes are trading at ₹28/kg average across major markets.",
        "Market trends indicate steady demand for fresh produce. Consider timing your sales based on weekly market patterns."
      ],
      crops: [
        "Rice cultivation in Telangana is best during Kharif season (June-October). Ensure proper water management and use recommended varieties like BPT-5204 or MTU-1010.",
        "For optimal rice yields, maintain 2-3 cm water level in fields, apply fertilizers in three splits, and monitor for pests regularly.",
        "Cotton farming requires well-drained soil and proper spacing. Use Bt cotton varieties and follow integrated pest management practices."
      ],
      schemes: [
        "PM-KISAN provides ₹6000 annual support. Rythu Bandhu offers ₹10,000 per acre investment support. Check eligibility through your village revenue officer.",
        "Telangana government offers various schemes: Rythu Bandhu, Rythu Bima, and input subsidies. Visit your nearest agriculture office for applications.",
        "Available schemes include crop insurance, equipment subsidies, and direct benefit transfers. Ensure your land records are updated for quick processing."
      ],
      general: [
        "I'm here to help with your farming questions. You can ask about crops, weather, market prices, or government schemes.",
        "As your agricultural assistant, I can provide information on farming techniques, government policies, and market insights for Telangana farmers.",
        "Feel free to ask about any farming-related topics - from soil management to market prices and government support schemes."
      ]
    },
    te: {
      weather: [
        "ప్రస్తుత డేటా ప్రకారం, తెలంగాణలో వాతావరణం వ్యవసాయానికి అనుకూలంగా ఉంది. ఉష్ణోగ్రత 25-35°C మధ్య ఉంది. మీ జిల్లా స్థానిక వాతావరణ సమాచారం చూడండి.",
        "నేటి వాతావరణ పరిస్థితులు స్పష్టమైన ఆకాశంతో 28°C ఉష్ణోగ్రత చూపిస్తున్నాయి. పొలపు పనులు మరియు నీటిపారుదల కార్యకలాపాలకు మంచి పరిస్థితులు.",
        "వాతావరణ నమూనాలు సాధారణ రుతుపవన అంచనాలను సూచిస్తున్నాయి. సరైన మట్టి తయారీతో రాబోయే సీజన్‌కు మీ పొలాలను సిద్ధం చేసుకోండి."
      ],
      prices: [
        "తెలంగాణలో ప్రస్తుత మార్కెట్ ధరలు: టమాటోలు ₹25-30/కిలో, ఉల్లిపాయలు ₹20-25/కిలో, బియ్యం ₹20-25/కిలో. ధరలు జిల్లా మరియు మార్కెట్ పరిస్థితుల ప్రకారం మారవచ్చు.",
        "నేటి మండి రేట్లు చాలా కూరగాయలకు స్థిరమైన ధరలను చూపిస్తున్నాయి. టమాటోలు ప్రధాన మార్కెట్లలో సగటున ₹28/కిలో వర్తకం అవుతున్నాయి.",
        "మార్కెట్ ట్రెండ్స్ తాజా ఉత్పాదనలకు స్థిరమైన డిమాండ్‌ని సూచిస్తున్నాయి. వారపు మార్కెట్ నమూనాల ఆధారంగా మీ అమ్మకాలను సమయం చూసి చేయండి."
      ],
      crops: [
        "తెలంగాణలో వరి సాగు ఖరీఫ్ సీజన్‌లో (జూన్-అక్టోబర్) ఉత్తమం. సరైన నీటి నిర్వహణ మరియు BPT-5204 లేదా MTU-1010 వంటి సిఫార్సు చేసిన రకాలను ఉపయోగించండి.",
        "అధిక వరి దిగుబడి కోసం, పొలాలలో 2-3 సెం.మీ నీటి స్థాయిని నిర్వహించండి, ఎరువులను మూడు విడతలుగా వేయండి మరియు తెగుళ్లను క్రమం తప్పకుండా పర్యవేక్షించండి.",
        "పత్తి వ్యవసాయానికి బాగా నీరు పారే మట్టి మరియు సరైన అంతరం అవసరం. Bt పత్తి రకాలను ఉపయోగించండి మరియు సమగ్ర తెగులు నిర్వహణ పద్ధతులను అనుసరించండి."
      ],
      schemes: [
        "PM-KISAN ₹6000 వార్షిక మద్దతు అందిస్తుంది. రైతు బంధు ఎకరానికి ₹10,000 పెట్టుబడి మద్దతు అందిస్తుంది. మీ గ్రామ రెవిన్యూ అధికారి ద్వారా అర్హతను చూడండి.",
        "తెలంగాణ ప్రభుత్వం వివిధ పథకాలను అందిస్తుంది: రైతు బంధు, రైతు బీమా, మరియు ఇన్‌పుట్ సబ్సిడీలు. దరఖాస్తుల కోసం మీ సమీప వ్యవసాయ కార్యాలయాన్ని సందర్శించండి.",
        "అందుబాటులో ఉన్న పథకాలలో పంట బీమా, పరికరాల సబ్సిడీలు మరియు ప్రత్యక్ష లాభ బదిలీలు ఉన్నాయి. త్వరిత ప్రాసెసింగ్ కోసం మీ భూమి రికార్డులు అప్‌డేట్ చేయబడిందని నిర్ధారించుకోండి."
      ],
      general: [
        "మీ వ్యవసాయ ప్రశ్నలతో సహాయం చేయడానికి నేను ఇక్కడ ఉన్నాను. మీరు పంటలు, వాతావరణం, మార్కెట్ ధరలు లేదా ప్రభుత్వ పథకాల గురించి అడగవచ్చు.",
        "మీ వ్యవసాయ సహాయకుడిగా, నేను తెలంగాణ రైతులకు వ్యవసాయ పద్ధతులు, ప్రభుత్వ విధానాలు మరియు మార్కెట్ అంతర్దృష్టులపై సమాచారం అందించగలను.",
        "మట్టి నిర్వహణ నుండి మార్కెట్ ధరలు మరియు ప్రభుత్వ మద్దతు పథకాల వరకు ఏవైనా వ్యవసాయ సంబంధిత అంశాల గురించి అడగడానికి సంకోచించవద్దు."
      ]
    }
  };

  async generateResponse(input: string, language: 'en' | 'te' = 'en'): Promise<string> {
    const query = input.toLowerCase();
    const responses = this.responses[language];
    
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    if (query.includes('weather') || query.includes('వాతావరణ')) {
      return this.getRandomResponse(responses.weather);
    }
    
    if (query.includes('price') || query.includes('cost') || query.includes('ధర') || query.includes('రేట్')) {
      return this.getRandomResponse(responses.prices);
    }
    
    if (query.includes('crop') || query.includes('farming') || query.includes('cultivation') || 
        query.includes('పంట') || query.includes('వ్యవసాయ') || query.includes('సాగు')) {
      return this.getRandomResponse(responses.crops);
    }
    
    if (query.includes('scheme') || query.includes('subsidy') || query.includes('government') || 
        query.includes('పథకం') || query.includes('సబ్సిడీ') || query.includes('ప్రభుత్వ')) {
      return this.getRandomResponse(responses.schemes);
    }
    
    return this.getRandomResponse(responses.general);
  }

  private getRandomResponse(responses: string[]): string {
    return responses[Math.floor(Math.random() * responses.length)];
  }
}
