import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Upload, Loader2, AlertTriangle, CheckCircle, Info, ArrowLeft, RotateCcw, Settings, Zap, ZapOff, Grid3X3, BookOpen, History, WifiOff, MessageCircle, TrendingUp } from 'lucide-react';
import { AdvancedCameraInterface } from '@/components/scanner/AdvancedCameraInterface';
import { ImagePreview } from '@/components/scanner/ImagePreview';
import { DiseaseEncyclopedia } from '@/components/scanner/DiseaseEncyclopedia';
import { ScanHistory } from '@/components/scanner/ScanHistory';
import { OfflineScanner } from '@/components/scanner/OfflineScanner';
import { useToast } from '@/components/ui/use-toast';

const Scanner = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('scanner');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showCameraDialog, setShowCameraDialog] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showPermissionAlert, setShowPermissionAlert] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cameraSettings, setCameraSettings] = useState({
    flash: 'auto',
    quality: 'HD',
    gridLines: false
  });
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Enhanced mock diseases with more comprehensive data
  const mockDiseases = [
    {
      name: 'Leaf Blight',
      nameInTelugu: 'ఆకు దహనం',
      nameInHindi: 'पत्ती झुलसा',
      severity: 'high',
      confidence: 85,
      cause: 'fungus',
      solution: 'Apply copper-based fungicide spray every 7-10 days',
      solutionInTelugu: 'రాగి ఆధారిత శిలీంద్ర నాశిని 7-10 రోజులకు ఒకసారి స్ప్రే చేయండి',
      solutionInHindi: 'हर 7-10 दिन में तांबा आधारित कवकनाशी स्प्रे करें',
      prevention: 'Reduce watering frequency, improve air circulation, remove affected leaves',
      preventionInTelugu: 'నీటిపారుదల తగ్గించి, గాలి ప్రసరణ మెరుగుపరచి, బాధిత ఆకులను తొలగించండి',
      preventionInHindi: 'पानी देना कम करें, हवा का संचार बेहतर बनाएं, प्रभावित पत्तियों को हटाएं',
      affectedCrops: ['Tomato', 'Potato', 'Chili'],
      treatmentCost: '₹200-500 per acre',
      followUpDays: 7
    },
    {
      name: 'Aphid Infestation',
      nameInTelugu: 'ఆఫిడ్ దాడి',
      nameInHindi: 'माहू का संक्रमण',
      severity: 'medium',
      confidence: 92,
      cause: 'pest',
      solution: 'Apply neem oil spray or release beneficial insects like ladybugs',
      solutionInTelugu: 'వేప నూనె స్ప్రే చేయండి లేదా లేడీబగ్ లాంటి మేలైన కీటకాలను వదిలేయండి',
      solutionInHindi: 'नीम तेल का छिड़काव करें या लेडीबग जैसे फायदेमंद कीड़े छोड़ें',
      prevention: 'Plant companion crops, regular inspection, maintain plant health',
      preventionInTelugu: 'సహాయక పంటలను నాటండి, క్రమం తప్పకుండా తనిఖీ చేయండి, మొక్క ఆరోగ్యాన్ని కాపాడుకోండి',
      preventionInHindi: 'सहयोगी फसलें लगाएं, नियमित निरीक्षण करें, पौधे का स्वास्थ्य बनाए रखें',
      affectedCrops: ['Cotton', 'Okra', 'Cabbage'],
      treatmentCost: '₹150-300 per acre',
      followUpDays: 5
    },
    {
      name: 'Nitrogen Deficiency',
      nameInTelugu: 'నత్రజని లోపం',
      nameInHindi: 'नाइट्रोजन की कमी',
      severity: 'medium',
      confidence: 88,
      cause: 'nutrition',
      solution: 'Apply nitrogen fertilizer (urea) or organic compost',
      solutionInTelugu: 'నత్రజని ఎరువు (యూరియా) లేదా సేంద్రీయ కంపోస్ట్ వేయండి',
      solutionInHindi: 'नाइट्रोजन उर्वरक (यूरिया) या जैविक खाद डालें',
      prevention: 'Regular soil testing, proper fertilization schedule, use green manure',
      preventionInTelugu: 'క్రమం తప్పకుండా మట్టి పరీక్ష, సరైన ఎరువు షెడ్యూల్, పచ్చి ఎరువు వాడండి',
      preventionInHindi: 'नियमित मिट्टी परीक्षण, उचित उर्वरक कार्यक्रम, हरी खाद का उपयोग करें',
      affectedCrops: ['Rice', 'Wheat', 'Corn'],
      treatmentCost: '₹100-250 per acre',
      followUpDays: 14
    }
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
  ];

  const requestCameraAccess = async () => {
    try {
      console.log('Requesting camera access...');
      
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
      
      setShowCameraDialog(true);
      
      const constraints = {
        video: { 
          width: { ideal: 1920, max: 1920 },
          height: { ideal: 1080, max: 1080 },
          facingMode: 'environment',
          frameRate: { ideal: 30 }
        },
        audio: false
      };
      
      console.log('Camera constraints:', constraints);
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log('Camera stream obtained successfully');
      
      setCameraStream(stream);
      setPermissionDenied(false);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        console.log('Video srcObject set');
        
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(console.error);
        };
      }
    } catch (error) {
      console.error('Camera access error:', error);
      setPermissionDenied(true);
      setShowCameraDialog(false);
      
      if (error.name === 'NotAllowedError') {
        toast({
          title: "Camera Permission Denied",
          description: "Please allow camera access to scan your crops. Click retry and allow camera permissions.",
          variant: "destructive"
        });
      } else if (error.name === 'NotFoundError') {
        toast({
          title: "No Camera Found",
          description: "No camera device was found on your device.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Camera Error",
          description: "Failed to access camera. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (!context) return;
      
      canvas.width = video.videoWidth || 1920;
      canvas.height = video.videoHeight || 1080;
      
      console.log('Capturing photo with dimensions:', canvas.width, 'x', canvas.height);
      
      context.save();
      context.scale(-1, 1);
      context.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
      context.restore();
      
      const quality = cameraSettings.quality === 'HD' ? 0.9 : 
                     cameraSettings.quality === 'Medium' ? 0.7 : 0.5;
      const imageDataUrl = canvas.toDataURL('image/jpeg', quality);
      setCapturedImage(imageDataUrl);
      
      console.log('Photo captured successfully');
      toast({
        title: "Photo Captured!",
        description: "Review your image and tap 'Use Photo' to continue."
      });
    }
  };

  const confirmCapture = () => {
    if (capturedImage) {
      setSelectedImage(capturedImage);
      closeCameraDialog();
      toast({
        title: "Image Captured",
        description: "Preview your crop image below. Make sure it's clear and in good lighting."
      });
    }
  };

  const retryCapture = () => {
    setCapturedImage(null);
  };

  const closeCameraDialog = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setShowCameraDialog(false);
    setCapturedImage(null);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const startScanning = () => {
    setIsScanning(true);
    setScanResult(null);
    
    setTimeout(() => {
      const randomDisease = mockDiseases[Math.floor(Math.random() * mockDiseases.length)];
      setScanResult(randomDisease);
      setIsScanning(false);
      toast({
        title: "Analysis Complete",
        description: "Crop disease detected. Check the results below."
      });
    }, 3000);
  };

  const retryPermission = () => {
    setPermissionDenied(false);
    requestCameraAccess();
  };

  const updateCameraSettings = (newSettings) => {
    setCameraSettings(prev => ({ ...prev, ...newSettings }));
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <Info className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getTranslatedText = (key, lang = selectedLanguage) => {
    const translations = {
      'scanner.title': {
        en: 'LeafScan AI - Crop Disease Scanner',
        te: 'లీఫ్‌స్కాన్ AI - పంట వ్యాధి స్కానర్',
        hi: 'लीफस्कैन AI - फसल रोग स्कैनर'
      },
      'scanner.subtitle': {
        en: 'AI-powered crop disease identification and treatment',
        te: 'AI శక్తితో పంట వ్యాధి గుర్తింపు మరియు చికిత్స',
        hi: 'AI संचालित फसल रोग पहचान और उपचार'
      }
    };
    return translations[key]?.[lang] || translations[key]?.en || key;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-cream-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Header with Language Selection */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-green-800 mb-2">
                {getTranslatedText('scanner.title')}
              </h1>
              <p className="text-green-600">
                {getTranslatedText('scanner.subtitle')}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="flex space-x-2">
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    variant={selectedLanguage === lang.code ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLanguage(lang.code)}
                    className="flex items-center space-x-1"
                  >
                    <span>{lang.flag}</span>
                    <span className="hidden sm:inline">{lang.name}</span>
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowSettings(true)}
                className="border-green-300"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="scanner" className="flex items-center space-x-2">
              <Camera className="w-4 h-4" />
              <span className="hidden sm:inline">Scanner</span>
            </TabsTrigger>
            <TabsTrigger value="encyclopedia" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Encyclopedia</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center space-x-2">
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
            <TabsTrigger value="offline" className="flex items-center space-x-2">
              <WifiOff className="w-4 h-4" />
              <span className="hidden sm:inline">Offline</span>
            </TabsTrigger>
            <TabsTrigger value="assistant" className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">AI Chat</span>
            </TabsTrigger>
          </TabsList>

          {/* Scanner Tab */}
          <TabsContent value="scanner" className="space-y-6">
            {/* Permission Denied Alert */}
            {permissionDenied && (
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-red-800">
                  <strong>Camera access was denied.</strong> Please enable camera access in your browser settings to scan crops.
                  <div className="mt-2">
                    <Button 
                      onClick={retryPermission}
                      variant="outline"
                      size="sm"
                      className="border-red-300 text-red-800 hover:bg-red-100"
                    >
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Retry Camera Access
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Upload Section */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-center flex items-center justify-center">
                  <Camera className="w-6 h-6 mr-2 text-green-600" />
                  {selectedLanguage === 'te' ? 'పంట ఫోటో తీయండి' : 
                   selectedLanguage === 'hi' ? 'फसल की फोटो लें' : 'Capture Crop Photo'}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={requestCameraAccess}
                    className="h-24 bg-blue-600 hover:bg-blue-700 flex flex-col items-center justify-center transition-all duration-200 hover:scale-105"
                  >
                    <Camera className="w-8 h-8 mb-2" />
                    <span className="font-semibold">
                      {selectedLanguage === 'te' ? 'కెమెరా తెరవండి' : 
                       selectedLanguage === 'hi' ? 'कैमरा खोलें' : 'Open Camera'}
                    </span>
                    <span className="text-xs opacity-90">Live Preview</span>
                  </Button>
                  
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="h-24 bg-green-600 hover:bg-green-700 flex flex-col items-center justify-center transition-all duration-200 hover:scale-105"
                  >
                    <Upload className="w-8 h-8 mb-2" />
                    <span className="font-semibold">
                      {selectedLanguage === 'te' ? 'ఫోటో అప్‌లోడ్ చేయండి' : 
                       selectedLanguage === 'hi' ? 'फोटो अपलोड करें' : 'Upload Photo'}
                    </span>
                    <span className="text-xs opacity-90">From Gallery</span>
                  </Button>
                </div>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800 font-medium mb-2">
                    📸 {selectedLanguage === 'te' ? 'మంచి ఫలితాల కోసం:' : 
                         selectedLanguage === 'hi' ? 'बेहतर परिणामों के लिए:' : 'For best results:'}
                  </p>
                  <ul className="text-xs text-blue-700 space-y-1 text-left">
                    <li>• {selectedLanguage === 'te' ? 'మంచి సహజ వెలుతురు వాడండి' : 
                           selectedLanguage === 'hi' ? 'अच्छी प्राकृतिक रोशनी का उपयोग करें' : 'Use good natural lighting'}</li>
                    <li>• {selectedLanguage === 'te' ? 'వ్యాధిగ్రస్త ఆకు ప్రాంతాలపై దృష్టి సారించండి' : 
                           selectedLanguage === 'hi' ? 'रोगग्रस्त पत्ती के क्षेत्रों पर ध्यान दें' : 'Focus on diseased leaf areas'}</li>
                    <li>• {selectedLanguage === 'te' ? 'కెమెరాను స్థిరంగా పట్టుకోండి' : 
                           selectedLanguage === 'hi' ? 'कैमरा को स्थिर रखें' : 'Hold camera steady'}</li>
                    <li>• {selectedLanguage === 'te' ? 'పంటతో ఫ్రేమ్‌ను నింపండి' : 
                           selectedLanguage === 'hi' ? 'फसल से फ्रेम को भरें' : 'Fill the frame with the crop'}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Selected Image Preview */}
            {selectedImage && !isScanning && !scanResult && (
              <Card className="border-green-200">
                <CardContent className="p-4">
                  <img 
                    src={selectedImage} 
                    alt="Selected crop" 
                    className="w-full max-h-64 object-contain rounded-lg mb-4"
                  />
                  <div className="text-center">
                    <p className="text-green-600 mb-4">
                      {selectedLanguage === 'te' ? 'మీ పంట చిత్రాన్ని క్రింద చూడండి. అది స్పష్టంగా మరియు మంచి వెలుతురులో ఉందని నిర్ధారించుకోండి.' : 
                       selectedLanguage === 'hi' ? 'नीचे अपनी फसल की छवि देखें। सुनिश्चित करें कि यह स्पष्ट और अच्छी रोशनी में है।' : 
                       'Preview your crop image below. Make sure it\'s clear and in good lighting.'}
                    </p>
                    <Button 
                      onClick={startScanning}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {selectedLanguage === 'te' ? 'ఫోటో వాడండి - విశ్లేషణ ప్రారంభించండి' : 
                       selectedLanguage === 'hi' ? 'फोटो का उपयोग करें - विश्लेषण शुरू करें' : 
                       'Use Photo - Begin Analysis'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Scanning Status */}
            {isScanning && (
              <Card className="border-blue-200">
                <CardContent className="p-6 text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    {selectedLanguage === 'te' ? 'విశ్లేషిస్తోంది...' : 
                     selectedLanguage === 'hi' ? 'विश्लेषण कर रहा है...' : 'Analyzing...'}
                  </h3>
                  <p className="text-blue-600">
                    {selectedLanguage === 'te' ? 'AI మోడల్ మీ పంట ఫోటోను వ్యాధి గుర్తింపు కోసం విశ్లేషిస్తోంది' : 
                     selectedLanguage === 'hi' ? 'AI मॉडल आपकी फसल की फोटो का रोग पहचान के लिए विश्लेषण कर रहा है' : 
                     'AI model is analyzing your crop photo for disease detection'}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Enhanced Scan Results */}
            {scanResult && (
              <Card className="border-green-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-green-800">
                      {selectedLanguage === 'te' ? 'స్కాన్ ఫలితాలు' : 
                       selectedLanguage === 'hi' ? 'स्कैन परिणाम' : 'Scan Results'}
                    </CardTitle>
                    <Badge className="bg-blue-100 text-blue-800">
                      {scanResult.confidence}% Confidence
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge className={getSeverityColor(scanResult.severity)}>
                        {getSeverityIcon(scanResult.severity)}
                        <span className="ml-1">Detected</span>
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {scanResult.cause}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {selectedLanguage === 'te' ? scanResult.nameInTelugu : 
                       selectedLanguage === 'hi' ? scanResult.nameInHindi : scanResult.name}
                    </h3>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {selectedLanguage === 'te' ? 'చికిత్స:' : 
                       selectedLanguage === 'hi' ? 'उपचार:' : 'Treatment:'}
                    </h4>
                    <p className="text-green-700 mb-2">
                      {selectedLanguage === 'te' ? scanResult.solutionInTelugu : 
                       selectedLanguage === 'hi' ? scanResult.solutionInHindi : scanResult.solution}
                    </p>
                    <div className="flex items-center justify-between text-sm text-green-600 mt-3">
                      <span>Cost: {scanResult.treatmentCost}</span>
                      <span>Follow-up: {scanResult.followUpDays} days</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                      <Info className="w-4 h-4 mr-2" />
                      {selectedLanguage === 'te' ? 'నివారణ:' : 
                       selectedLanguage === 'hi' ? 'रोकथाम:' : 'Prevention:'}
                    </h4>
                    <p className="text-blue-700">
                      {selectedLanguage === 'te' ? scanResult.preventionInTelugu : 
                       selectedLanguage === 'hi' ? scanResult.preventionInHindi : scanResult.prevention}
                    </p>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-800 mb-2">
                      {selectedLanguage === 'te' ? 'ప్రభావిత పంటలు:' : 
                       selectedLanguage === 'hi' ? 'प्रभावित फसलें:' : 'Affected Crops:'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {scanResult.affectedCrops.map((crop, index) => (
                        <Badge key={index} variant="outline">{crop}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {selectedLanguage === 'te' ? 'నిపుణుడిని సంప్రదించండి' : 
                       selectedLanguage === 'hi' ? 'विशेषज्ञ से सलाह लें' : 'Consult Expert'}
                    </Button>
                    <Button variant="outline" className="flex-1 border-green-300" onClick={() => setActiveTab('encyclopedia')}>
                      <BookOpen className="w-4 h-4 mr-2" />
                      {selectedLanguage === 'te' ? 'మరిన్ని వివరాలు' : 
                       selectedLanguage === 'hi' ? 'अधिक जानकारी' : 'More Details'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Disease Encyclopedia Tab */}
          <TabsContent value="encyclopedia">
            <DiseaseEncyclopedia selectedLanguage={selectedLanguage} />
          </TabsContent>

          {/* Scan History Tab */}
          <TabsContent value="history">
            <ScanHistory selectedLanguage={selectedLanguage} />
          </TabsContent>

          {/* Offline Scanner Tab */}
          <TabsContent value="offline">
            <OfflineScanner 
              selectedLanguage={selectedLanguage}
              onOfflineScan={async (image) => {
                // Handle offline scanning
                console.log('Offline scan requested for image:', image);
              }}
            />
          </TabsContent>

          {/* AI Assistant Tab */}
          <TabsContent value="assistant">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2 text-green-600" />
                  {selectedLanguage === 'te' ? 'AI వ్యవసాయ సహాయకుడు' : 
                   selectedLanguage === 'hi' ? 'AI कृषि सहायक' : 'AI Farming Assistant'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    {selectedLanguage === 'te' ? 'AI చాట్ అసిస్టెంట్' : 
                     selectedLanguage === 'hi' ? 'AI चैट सहायक' : 'AI Chat Assistant'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {selectedLanguage === 'te' ? 'వ్యవసాయ సలహాలు, వ్యాధి చికిత్స మరియు పంట సమస్యల కోసం AI అసిస్టెంట్‌తో చాట్ చేయండి.' : 
                     selectedLanguage === 'hi' ? 'कृषि सलाह, रोग उपचार और फसल समस्याओं के लिए AI सहायक के साथ चैट करें।' : 
                     'Chat with AI assistant for farming advice, disease treatment, and crop problem solutions.'}
                  </p>
                  <Button className="bg-green-600 hover:bg-green-700">
                    {selectedLanguage === 'te' ? 'चैट शुरू करें' : 
                     selectedLanguage === 'hi' ? 'चैट शुरू करें' : 'Start Chat'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Advanced Camera Dialog and Settings remain the same */}
        <Dialog open={showCameraDialog} onOpenChange={closeCameraDialog}>
          <DialogContent className="max-w-4xl max-h-[95vh] overflow-hidden p-0">
            <DialogHeader className="p-4 pb-0">
              <DialogTitle className="flex items-center">
                <Camera className="w-5 h-5 mr-2" />
                Advanced Camera Interface
              </DialogTitle>
            </DialogHeader>
            <div className="p-4">
              {!capturedImage ? (
                <AdvancedCameraInterface
                  videoRef={videoRef}
                  canvasRef={canvasRef}
                  cameraSettings={cameraSettings}
                  onCapture={capturePhoto}
                  onSettingsChange={updateCameraSettings}
                />
              ) : (
                <ImagePreview
                  image={capturedImage}
                  onRetake={retryCapture}
                  onConfirm={confirmCapture}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Settings Dialog */}
        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Camera Settings</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Grid Lines</span>
                <Button
                  variant={cameraSettings.gridLines ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateCameraSettings({ gridLines: !cameraSettings.gridLines })}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span>Flash Control</span>
                <div className="flex space-x-2">
                  {['off', 'auto', 'on'].map((mode) => (
                    <Button
                      key={mode}
                      variant={cameraSettings.flash === mode ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateCameraSettings({ flash: mode })}
                    >
                      {mode === 'off' ? <ZapOff className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Image Quality</span>
                <div className="flex space-x-2">
                  {['Low', 'Medium', 'HD'].map((quality) => (
                    <Button
                      key={quality}
                      variant={cameraSettings.quality === quality ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateCameraSettings({ quality })}
                    >
                      {quality}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Scanner;
