import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, Zap, BookOpen, History, AlertCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

const LeafScanner = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Stop the stream immediately as we just wanted to check permission
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
    
    // Enhanced simulation with more realistic analysis
    setTimeout(() => {
      // Simulate different disease results based on random selection
      const diseases = [
        {
          disease: 'Tomato Late Blight',
          severity: 'High',
          confidence: 89,
          cause: 'Fungal infection (Phytophthora infestans)',
          symptoms: 'Dark brown irregular spots on leaves, yellowing around edges, white fuzzy growth on leaf undersides',
          treatment: 'Apply copper-based fungicide immediately. Remove affected leaves and improve air circulation. Avoid overhead watering.',
          prevention: 'Plant resistant varieties, ensure proper spacing, avoid overhead irrigation, apply preventive copper sprays',
          urgency: 'immediate',
          plantType: 'Tomato'
        },
        {
          disease: 'Powdery Mildew',
          severity: 'Medium',
          confidence: 82,
          cause: 'Fungal infection (Erysiphales)',
          symptoms: 'White powdery coating on leaf surfaces, yellowing and curling of leaves',
          treatment: 'Apply neem oil or potassium bicarbonate spray. Improve air circulation around plants.',
          prevention: 'Avoid overcrowding plants, water at soil level, ensure good ventilation',
          urgency: 'moderate',
          plantType: 'Various crops'
        },
        {
          disease: 'Healthy Leaf',
          severity: 'None',
          confidence: 95,
          cause: 'No disease detected',
          symptoms: 'Leaf appears healthy with normal coloration and structure',
          treatment: 'No treatment needed. Continue regular care and monitoring.',
          prevention: 'Maintain current care routine, monitor regularly for early disease detection',
          urgency: 'none',
          plantType: 'Healthy plant'
        }
      ];
      
      const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
      setScanResult(randomDisease);
      setIsScanning(false);
      
      toast({
        title: "Analysis Complete",
        description: `Disease detection completed with ${randomDisease.confidence}% confidence.`,
      });
    }, 3000);
  };

  const commonDiseases = [
    { name: 'Late Blight', crop: 'Tomato', severity: 'High', icon: '🍅' },
    { name: 'Powdery Mildew', crop: 'Cucumber', severity: 'Medium', icon: '🥒' },
    { name: 'Leaf Spot', crop: 'Rice', severity: 'Medium', icon: '🌾' },
    { name: 'Rust Disease', crop: 'Wheat', severity: 'High', icon: '🌾' }
  ];

  const recentScans = [
    { date: '2 hours ago', crop: 'Tomato', result: 'Healthy', icon: '✅' },
    { date: '1 day ago', crop: 'Cotton', result: 'Aphid Infestation', icon: '⚠️' },
    { date: '3 days ago', crop: 'Rice', result: 'Nutrient Deficiency', icon: '🔍' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🌿 LeafScan AI
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            AI-Powered Leaf Disease Detection
          </p>
          <p className="text-gray-500">
            Instantly detect plant diseases, pests, and nutrient deficiencies
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Scanner */}
          <div className="lg:col-span-2">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="w-6 h-6 mr-2 text-green-600" />
                  Leaf Disease Scanner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Upload Area */}
                <div className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center">
                  {selectedImage ? (
                    <div className="space-y-4">
                      <img 
                        src={selectedImage} 
                        alt="Selected leaf" 
                        className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
                      />
                      <div className="flex gap-4 justify-center">
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
                        <div className="flex gap-4 justify-center">
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

                {/* File input for uploading */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />

                {/* Camera input for taking photos */}
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
                      <CardTitle className={`flex items-center ${
                        scanResult.urgency === 'immediate' ? 'text-red-800' :
                        scanResult.urgency === 'moderate' ? 'text-yellow-800' :
                        'text-green-800'
                      }`}>
                        {scanResult.urgency === 'none' ? (
                          <CheckCircle className="w-6 h-6 mr-2" />
                        ) : (
                          <AlertCircle className="w-6 h-6 mr-2" />
                        )}
                        Analysis Result
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
                          <h4 className="font-medium text-gray-700 mb-2">Plant Type</h4>
                          <p className="text-sm text-gray-600">{scanResult.plantType}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Severity</h4>
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
                        <h4 className="font-medium text-gray-700 mb-2">Cause</h4>
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
                        <h4 className="font-medium text-gray-700 mb-2">Prevention Tips</h4>
                        <p className="text-sm text-gray-600">{scanResult.prevention}</p>
                      </div>

                      {scanResult.urgency === 'immediate' && (
                        <div className="bg-red-100 border border-red-300 rounded-lg p-4">
                          <h4 className="font-medium text-red-800 mb-2">⚠️ Urgent Action Required</h4>
                          <p className="text-sm text-red-700">This disease requires immediate attention to prevent spread and crop loss.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Common Diseases */}
            <Card className="border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center text-yellow-800">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Common Diseases
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
                          <div className="text-xs text-gray-600">{disease.crop}</div>
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

            {/* Recent Scans */}
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-800">
                  <History className="w-5 h-5 mr-2" />
                  Recent Scans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentScans.map((scan, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                      <span className="text-xl">{scan.icon}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{scan.crop}</div>
                        <div className="text-xs text-gray-600">{scan.date}</div>
                      </div>
                      <div className="text-xs text-gray-500">{scan.result}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">
                  📸 Scanning Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>• Take photos in good lighting</p>
                <p>• Focus on affected areas clearly</p>
                <p>• Include multiple angles if possible</p>
                <p>• Avoid blurry or dark images</p>
                <p>• Clean the leaf surface before scanning</p>
                <p>• Hold camera steady for clear shots</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeafScanner;
