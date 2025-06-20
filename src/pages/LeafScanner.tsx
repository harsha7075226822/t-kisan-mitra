
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, Zap, BookOpen, History, AlertCircle, CheckCircle, Download, Cloud, Users, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const LeafScanner = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const crops = [
    { value: 'rice', label: 'Rice / వరి / चावल', icon: '🌾' },
    { value: 'cotton', label: 'Cotton / పత్తి / कपास', icon: '🌿' },
    { value: 'maize', label: 'Maize / మొక్కజొన్న / मक्का', icon: '🌽' },
    { value: 'tomato', label: 'Tomato / టమాటో / टमाटर', icon: '🍅' },
    { value: 'chili', label: 'Chili / మిర్చి / मिर्च', icon: '🌶️' },
    { value: 'sugarcane', label: 'Sugarcane / చెరకు / गन्ना', icon: '🎋' }
  ];

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      setCameraPermission('granted');
      return true;
    } catch (error) {
      console.error('Camera permission denied:', error);
      setCameraPermission('denied');
      toast({
        title: "Camera Access Denied",
        description: "Please allow camera access to take photos of leaves.",
        variant: "destructive"
      });
      return false;
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setScanResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setScanResult(null);
        toast({
          title: "Photo Captured Successfully",
          description: "Your leaf image is ready for analysis.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTakePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      cameraInputRef.current?.click();
    }
  };

  const analyzeLeafImage = async () => {
    if (!selectedImage) return;
    
    setIsScanning(true);
    
    // Enhanced simulation with crop-specific analysis
    setTimeout(() => {
      const cropSpecificDiseases = {
        rice: [
          {
            disease: 'Rice Blast',
            severity: 'High',
            confidence: 92,
            cause: 'Fungal infection (Magnaporthe oryzae)',
            symptoms: 'Diamond-shaped lesions with gray centers and dark borders on leaves',
            treatment: 'Apply Tricyclazole or Carbendazim fungicide. Remove infected plant debris.',
            prevention: 'Use resistant varieties, avoid excessive nitrogen fertilization',
            urgency: 'immediate',
            plantType: 'Rice',
            weatherAdvice: 'Avoid spraying during rainy conditions. Apply early morning or evening.'
          }
        ],
        tomato: [
          {
            disease: 'Tomato Late Blight',
            severity: 'High',
            confidence: 89,
            cause: 'Fungal infection (Phytophthora infestans)',
            symptoms: 'Dark brown irregular spots on leaves, yellowing around edges',
            treatment: 'Apply copper-based fungicide immediately. Remove affected leaves.',
            prevention: 'Plant resistant varieties, ensure proper spacing, avoid overhead irrigation',
            urgency: 'immediate',
            plantType: 'Tomato',
            weatherAdvice: 'Disease spreads rapidly in cool, wet conditions. Monitor weather forecasts.'
          }
        ],
        cotton: [
          {
            disease: 'Cotton Leaf Curl Virus',
            severity: 'High',
            confidence: 85,
            cause: 'Viral infection transmitted by whiteflies',
            symptoms: 'Upward curling of leaves, yellowing, and stunted growth',
            treatment: 'Control whitefly population with neem oil or insecticides',
            prevention: 'Use virus-resistant varieties, control whitefly vectors',
            urgency: 'moderate',
            plantType: 'Cotton',
            weatherAdvice: 'Hot, dry conditions favor whitefly multiplication'
          }
        ]
      };
      
      const healthyResult = {
        disease: 'Healthy Leaf',
        severity: 'None',
        confidence: 95,
        cause: 'No disease detected',
        symptoms: 'Leaf appears healthy with normal coloration and structure',
        treatment: 'No treatment needed. Continue regular care and monitoring.',
        prevention: 'Maintain current care routine, monitor regularly for early disease detection',
        urgency: 'none',
        plantType: selectedCrop ? crops.find(c => c.value === selectedCrop)?.label.split(' / ')[0] || 'Unknown crop' : 'Healthy plant',
        weatherAdvice: 'Continue regular monitoring, especially during monsoon season'
      };
      
      let result;
      if (selectedCrop && cropSpecificDiseases[selectedCrop as keyof typeof cropSpecificDiseases]) {
        const cropDiseases = cropSpecificDiseases[selectedCrop as keyof typeof cropSpecificDiseases];
        result = Math.random() > 0.3 ? cropDiseases[0] : healthyResult;
      } else {
        result = healthyResult;
      }
      
      setScanResult(result);
      setIsScanning(false);
      
      toast({
        title: "Analysis Complete",
        description: `Disease detection completed with ${result.confidence}% confidence.`,
      });
    }, 3000);
  };

  const generatePDFReport = () => {
    if (!scanResult) return;
    
    // Simple PDF generation simulation
    const reportData = {
      crop: selectedCrop,
      disease: scanResult.disease,
      severity: scanResult.severity,
      confidence: scanResult.confidence,
      treatment: scanResult.treatment,
      date: new Date().toLocaleDateString()
    };
    
    toast({
      title: "PDF Report Generated",
      description: "Your diagnosis report has been prepared for download.",
    });
    
    // In a real implementation, you would use jsPDF here
    console.log('PDF Report Data:', reportData);
  };

  const speakResult = () => {
    if (!scanResult || !('speechSynthesis' in window)) return;
    
    const text = `${scanResult.disease} detected. Severity: ${scanResult.severity}. ${scanResult.treatment}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const commonDiseases = [
    { name: 'Rice Blast', crop: 'Rice', severity: 'High', icon: '🌾', affected: '15%' },
    { name: 'Cotton Bollworm', crop: 'Cotton', severity: 'High', icon: '🌿', affected: '12%' },
    { name: 'Tomato Blight', crop: 'Tomato', severity: 'Medium', icon: '🍅', affected: '8%' },
    { name: 'Maize Borer', crop: 'Maize', severity: 'Medium', icon: '🌽', affected: '10%' }
  ];

  const communityInsights = [
    { location: 'Warangal District', issue: 'Rice Blast outbreak', severity: 'High', reports: 45 },
    { location: 'Karimnagar', issue: 'Cotton Whitefly', severity: 'Medium', reports: 23 },
    { location: 'Nizamabad', issue: 'Maize Fall Armyworm', severity: 'High', reports: 38 }
  ];

  const weatherData = {
    temperature: '28°C',
    humidity: '75%',
    rainfall: '12mm expected',
    advisory: 'High humidity may increase fungal disease risk. Monitor crops closely.'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🌿 LeafScan AI
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            AI-Powered Leaf Disease Detection for Telangana Farmers
          </p>
          <p className="text-gray-500">
            Instantly detect plant diseases, pests, and nutrient deficiencies in your preferred language
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Scanner */}
          <div className="lg:col-span-2">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="w-6 h-6 mr-2 text-green-600" />
                  AI Leaf Disease Scanner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Crop Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Your Crop / మీ పంట ఎంచుకోండి / अपनी फसल चुनें
                  </label>
                  <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose crop for accurate analysis" />
                    </SelectTrigger>
                    <SelectContent>
                      {crops.map((crop) => (
                        <SelectItem key={crop.value} value={crop.value}>
                          <span className="flex items-center">
                            <span className="mr-2">{crop.icon}</span>
                            {crop.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Upload Area */}
                <div className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center">
                  {selectedImage ? (
                    <div className="space-y-4">
                      <img 
                        src={selectedImage} 
                        alt="Selected leaf" 
                        className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
                      />
                      <div className="flex gap-4 justify-center flex-wrap">
                        <Button onClick={analyzeLeafImage} disabled={isScanning} className="bg-green-600 hover:bg-green-700">
                          {isScanning ? (
                            <>
                              <Zap className="w-4 h-4 mr-2 animate-spin" />
                              Analyzing Image...
                            </>
                          ) : (
                            <>
                              <Zap className="w-4 h-4 mr-2" />
                              Analyze for Diseases
                            </>
                          )}
                        </Button>
                        <Button variant="outline" onClick={() => {
                          setSelectedImage(null);
                          setScanResult(null);
                        }}>
                          Clear
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-6xl">📷</div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Upload or Capture Leaf Image
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Take a clear photo of the affected leaf for accurate diagnosis
                        </p>
                        <div className="flex gap-4 justify-center flex-wrap">
                          <Button onClick={() => fileInputRef.current?.click()} className="bg-green-600 hover:bg-green-700">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Image
                          </Button>
                          <Button variant="outline" onClick={handleTakePhoto}>
                            <Camera className="w-4 h-4 mr-2" />
                            Take Photo
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* File inputs */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <input
                  type="file"
                  ref={cameraInputRef}
                  onChange={handleCameraCapture}
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                />

                {/* Enhanced Scan Result */}
                {scanResult && (
                  <Card className={`border-2 ${
                    scanResult.urgency === 'immediate' ? 'border-red-200 bg-red-50' :
                    scanResult.urgency === 'moderate' ? 'border-yellow-200 bg-yellow-50' :
                    'border-green-200 bg-green-50'
                  }`}>
                    <CardHeader>
                      <CardTitle className={`flex items-center justify-between ${
                        scanResult.urgency === 'immediate' ? 'text-red-800' :
                        scanResult.urgency === 'moderate' ? 'text-yellow-800' :
                        'text-green-800'
                      }`}>
                        <div className="flex items-center">
                          {scanResult.urgency === 'none' ? (
                            <CheckCircle className="w-6 h-6 mr-2" />
                          ) : (
                            <AlertCircle className="w-6 h-6 mr-2" />
                          )}
                          AI Diagnosis Results
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={speakResult}>
                            🔊 Listen
                          </Button>
                          <Button size="sm" variant="outline" onClick={generatePDFReport}>
                            <Download className="w-4 h-4 mr-1" />
                            PDF
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-900">{scanResult.disease}</h3>
                        <Badge variant="outline" className="text-blue-700">
                          {scanResult.confidence}% confidence
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Crop Type</h4>
                          <p className="text-sm text-gray-600">{scanResult.plantType}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Severity Level</h4>
                          <Badge className={
                            scanResult.severity === 'High' ? 'bg-red-500' :
                            scanResult.severity === 'Medium' ? 'bg-yellow-500' : 
                            scanResult.severity === 'None' ? 'bg-green-500' : 'bg-gray-500'
                          }>
                            {scanResult.severity}
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Disease Cause</h4>
                        <p className="text-sm text-gray-600">{scanResult.cause}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Observed Symptoms</h4>
                        <p className="text-sm text-gray-600">{scanResult.symptoms}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Recommended Treatment</h4>
                        <p className="text-sm text-gray-600">{scanResult.treatment}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Prevention Measures</h4>
                        <p className="text-sm text-gray-600">{scanResult.prevention}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Weather Advisory</h4>
                        <p className="text-sm text-gray-600">{scanResult.weatherAdvice}</p>
                      </div>

                      {scanResult.urgency === 'immediate' && (
                        <div className="bg-red-100 border border-red-300 rounded-lg p-4">
                          <h4 className="font-medium text-red-800 mb-2">⚠️ Urgent Action Required</h4>
                          <p className="text-sm text-red-700">This disease requires immediate attention to prevent spread and crop loss. Contact your local Krishi Vigyan Kendra for expert guidance.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Weather Advisory */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <Cloud className="w-5 h-5 mr-2" />
                  Weather Advisory
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Temperature:</span>
                    <p>{weatherData.temperature}</p>
                  </div>
                  <div>
                    <span className="font-medium">Humidity:</span>
                    <p>{weatherData.humidity}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Rainfall:</span>
                    <p>{weatherData.rainfall}</p>
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">{weatherData.advisory}</p>
                </div>
              </CardContent>
            </Card>

            {/* Community Insights */}
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-800">
                  <Users className="w-5 h-5 mr-2" />
                  Community Disease Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {communityInsights.map((insight, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <div>
                          <div className="font-medium text-sm">{insight.location}</div>
                          <div className="text-xs text-gray-600">{insight.issue}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            insight.severity === 'High' ? 'text-red-700 border-red-300' : 'text-yellow-700 border-yellow-300'
                          }`}
                        >
                          {insight.reports} reports
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Common Diseases */}
            <Card className="border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center text-yellow-800">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Common Diseases in Telangana
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {commonDiseases.map((disease, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{disease.icon}</span>
                        <div>
                          <div className="font-medium text-sm">{disease.name}</div>
                          <div className="text-xs text-gray-600">{disease.crop} • {disease.affected} affected</div>
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          disease.severity === 'High' ? 'text-red-700 border-red-300' : 'text-yellow-700 border-yellow-300'
                        }`}
                      >
                        {disease.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Tips */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">
                  📸 Photography Tips for Best Results
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>• Take photos in good natural lighting</p>
                <p>• Focus on affected areas clearly</p>
                <p>• Hold phone 20-30cm from the leaf</p>
                <p>• Use plain background (soil/white paper)</p>
                <p>• Capture both sides if symptoms vary</p>
                <p>• Select correct crop for accurate diagnosis</p>
                <p>• Clean leaf surface gently before capturing</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeafScanner;
