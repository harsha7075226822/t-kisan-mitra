
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, Bot, User, AlertCircle, CheckCircle2, Volume2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface DiagnosisResult {
  disease_name: string;
  description: string;
  symptoms: string[];
  treatment: string;
  confidence: number;
  organic_solution: string;
  chemical_solution: string;
  dosage: string;
  application_tips: string[];
}

const HealYourCrop = () => {
  const { t, language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
  const [showResults, setShowResults] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Mock AI analysis function - replace with actual AI service
  const analyzeCropImage = async (image: File): Promise<DiagnosisResult> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock response - replace with actual AI model response
    return {
      disease_name: language === 'te' ? 'ముడత తెగులు' : language === 'hi' ? 'पत्ती का धब्बा रोग' : 'Leaf Spot Disease',
      description: language === 'te' 
        ? 'ఈ వ్యాధి ఆకులపై గోధుమ రంగు మచ్చలను కలిగిస్తుంది మరియు పంట దిగుబడిని తగ్గిస్తుంది।'
        : language === 'hi'
        ? 'यह बीमारी पत्तियों पर भूरे रंग के धब्बे बनाती है और फसल की पैदावार कम करती है।'
        : 'This disease causes brown spots on leaves and reduces crop yield.',
      symptoms: language === 'te' 
        ? ['ఆకులపై గోధుమ రంగు మచ్చలు', 'ఆకుల పసుపు రంగు', 'ముడత మరియు ఆకుల రాలిక']
        : language === 'hi'
        ? ['पत्तियों पर भूरे धब्बे', 'पत्तियों का पीला होना', 'मुरझाना और पत्ती गिरना']
        : ['Brown spots on leaves', 'Yellowing of leaves', 'Wilting and leaf drop'],
      treatment: language === 'te'
        ? 'కాపర్ ఆధారిత ఫంగిసైడ్ స్ప్రే చేయండి లేదా ఆర్గానిక్ నీమ్ ఆయిల్ వాడండి।'
        : language === 'hi'
        ? 'कॉपर आधारित फंगीसाइड स्प्रे करें या ऑर्गेनिक नीम ऑयल का उपयोग करें।'
        : 'Apply copper-based fungicide spray or use organic neem oil.',
      confidence: 87,
      organic_solution: language === 'te'
        ? 'నీమ్ ఆయిల్ (10ml/లీటర్) + గార్లిక్ ఎక్స్ట్రాక్ట్'
        : language === 'hi'
        ? 'नीम ऑयल (10ml/लीटर) + लहसुन एक्सट्रैक्ट'
        : 'Neem oil (10ml/liter) + Garlic extract',
      chemical_solution: language === 'te'
        ? 'కాపర్ ఆక్సిక్లోరైడ్ 50% WP @ 2gm/లీటర్'
        : language === 'hi'
        ? 'कॉपर ऑक्सीक्लोराइड 50% WP @ 2gm/लीटर'
        : 'Copper Oxychloride 50% WP @ 2gm/liter',
      dosage: language === 'te'
        ? '10-15 రోజులకు ఒకసారి, ఉదయం లేదా సాయంత్రం స్ప్రే చేయండి'
        : language === 'hi'
        ? '10-15 दिनों में एक बार, सुबह या शाम को स्प्रे करें'
        : 'Once every 10-15 days, spray in morning or evening',
      application_tips: language === 'te'
        ? ['గాలి లేని సమయంలో స్ప్రే చేయండి', 'ఆకుల కింది భాగాన్ని కూడా చెల్లించండి', 'వర్షం రాకముందు స్ప్రే చేయవద్దు']
        : language === 'hi'
        ? ['हवा न होने पर स्प्रे करें', 'पत्तियों के नीचे का भाग भी छिड़कें', 'बारिश से पहले स्प्रे न करें']
        : ['Spray during windless conditions', 'Cover undersides of leaves too', 'Do not spray before rain']
    };
  };

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setDiagnosis(null);
    setShowResults(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    try {
      const result = await analyzeCropImage(selectedImage);
      setDiagnosis(result);
      setShowResults(true);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setPreviewUrl('');
    setDiagnosis(null);
    setShowResults(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="mb-6 sm:mb-8">
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Bot className="w-6 h-6 text-green-600" />
            <CardTitle className="text-xl sm:text-2xl text-green-800">
              {language === 'te' ? 'మీ పంటను వైద్యం చేయండి' : 
               language === 'hi' ? 'अपनी फसल का इलाज करें' : 
               'Heal Your Crop'}
            </CardTitle>
          </div>
          <p className="text-sm text-green-600">
            {language === 'te' ? 'రియల్-టైమ్ AI వ్యవసాయ గురువు మీ చేతుల్లో' :
             language === 'hi' ? 'आपके हाथों में रियल-टाइम AI कृषि गुरु' :
             'Real-time AI farming teacher in your hand'}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Step indicators */}
          <div className="flex justify-center items-center gap-2 sm:gap-4 mb-6">
            <div className="flex items-center gap-1 text-xs sm:text-sm">
              <Camera className="w-4 h-4 text-blue-600" />
              <span className="text-gray-700">
                {language === 'te' ? 'ఫోటో తీయండి' : language === 'hi' ? 'फोटो लें' : 'Take Picture'}
              </span>
            </div>
            <div className="w-4 h-0.5 bg-gray-300"></div>
            <div className="flex items-center gap-1 text-xs sm:text-sm">
              <Bot className="w-4 h-4 text-green-600" />
              <span className="text-gray-700">
                {language === 'te' ? 'AI పరీక్ష' : language === 'hi' ? 'AI जांच' : 'AI Analysis'}
              </span>
            </div>
            <div className="w-4 h-0.5 bg-gray-300"></div>
            <div className="flex items-center gap-1 text-xs sm:text-sm">
              <User className="w-4 h-4 text-orange-600" />
              <span className="text-gray-700">
                {language === 'te' ? 'పరిష్కారం' : language === 'hi' ? 'समाधान' : 'Solution'}
              </span>
            </div>
          </div>

          {/* Image upload section */}
          {!selectedImage && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => cameraInputRef.current?.click()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  {language === 'te' ? 'కెమెరాతో తీయండి' : 
                   language === 'hi' ? 'कैमरे से लें' : 
                   'Take with Camera'}
                </Button>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="flex-1 border-blue-600 text-blue-600"
                  size="lg"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {language === 'te' ? 'గ్యాలరీ నుండి' : 
                   language === 'hi' ? 'गैलरी से' : 
                   'From Gallery'}
                </Button>
              </div>
              
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                className="hidden"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          )}

          {/* Image preview and analysis */}
          {selectedImage && (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Crop image"
                  className="w-full h-48 object-cover rounded-lg border"
                />
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2 bg-white"
                >
                  ✕
                </Button>
              </div>

              {!isAnalyzing && !showResults && (
                <Button
                  onClick={handleAnalyze}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  <Bot className="w-4 h-4 mr-2" />
                  {language === 'te' ? 'AI విశ్లేషణ ప్రారంభించండి' :
                   language === 'hi' ? 'AI विश्लेषण शुरू करें' :
                   'Start AI Analysis'}
                </Button>
              )}

              {isAnalyzing && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mb-4"></div>
                  <p className="text-green-700">
                    {language === 'te' ? 'AI గురువు మీ పంటను పరిశీలిస్తున్నాడు...' :
                     language === 'hi' ? 'AI गुरु आपकी फसल की जांच कर रहा है...' :
                     'AI Guru is examining your crop...'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Results section */}
          {showResults && diagnosis && (
            <div className="space-y-4 mt-6">
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg text-green-800 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {language === 'te' ? 'రోగ నిర్ధారణ' : 
                     language === 'hi' ? 'रोग निदान' : 
                     'Disease Diagnosis'}
                  </h3>
                  <Badge variant="outline" className="text-green-700 border-green-300">
                    {diagnosis.confidence}% {language === 'te' ? 'నమ్మకం' : language === 'hi' ? 'विश्वास' : 'Confidence'}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-red-700 text-lg">{diagnosis.disease_name}</p>
                    <p className="text-gray-700 mt-1">{diagnosis.description}</p>
                  </div>

                  <div>
                    <p className="font-medium text-gray-800 mb-2">
                      {language === 'te' ? 'లక్షణాలు:' : language === 'hi' ? 'लक्षण:' : 'Symptoms:'}
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {diagnosis.symptoms.map((symptom, index) => (
                        <li key={index}>{symptom}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2 flex items-center gap-1">
                        🌿 {language === 'te' ? 'ఆర్గానిక్ పరిష్కారం' : language === 'hi' ? 'जैविक समाधान' : 'Organic Solution'}
                      </h4>
                      <p className="text-sm text-green-700">{diagnosis.organic_solution}</p>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-1">
                        🧪 {language === 'te' ? 'రసాయన పరిష్కారం' : language === 'hi' ? 'रासायनिक समाधान' : 'Chemical Solution'}
                      </h4>
                      <p className="text-sm text-blue-700">{diagnosis.chemical_solution}</p>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-3 rounded-lg">
                    <h4 className="font-medium text-orange-800 mb-2">
                      {language === 'te' ? 'అప్లికేషన్ మార్గదర్శకాలు:' : 
                       language === 'hi' ? 'उपयोग दिशानिर्देश:' : 
                       'Application Guidelines:'}
                    </h4>
                    <p className="text-sm text-orange-700 mb-2">{diagnosis.dosage}</p>
                    <ul className="list-disc list-inside text-sm text-orange-600 space-y-1">
                      {diagnosis.application_tips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => speakText(diagnosis.treatment)}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Volume2 className="w-4 h-4 mr-1" />
                      {language === 'te' ? 'వినండి' : language === 'hi' ? 'सुनें' : 'Listen'}
                    </Button>
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      {language === 'te' ? 'మరొక ఫోటో' : language === 'hi' ? 'दूसरी फोटो' : 'Another Photo'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HealYourCrop;
