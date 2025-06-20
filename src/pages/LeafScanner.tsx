
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, Zap, BookOpen, History, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const LeafScanner = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleScan = async () => {
    if (!selectedImage) return;
    
    setIsScanning(true);
    
    // Simulate AI scanning process
    setTimeout(() => {
      setScanResult({
        disease: 'Tomato Late Blight',
        severity: 'Medium',
        confidence: 87,
        cause: 'Fungal infection (Phytophthora infestans)',
        symptoms: 'Dark brown spots on leaves, yellowing edges',
        treatment: 'Apply copper-based fungicide, improve ventilation',
        prevention: 'Avoid overhead watering, ensure proper spacing'
      });
      setIsScanning(false);
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
                        <Button onClick={handleScan} disabled={isScanning} className="bg-green-600 hover:bg-green-700">
                          {isScanning ? (
                            <>
                              <Zap className="w-4 h-4 mr-2 animate-spin" />
                              Scanning...
                            </>
                          ) : (
                            <>
                              <Zap className="w-4 h-4 mr-2" />
                              Scan for Diseases
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
                          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                            <Camera className="w-4 h-4 mr-2" />
                            Take Photo
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />

                {/* Scan Result */}
                {scanResult && (
                  <Card className="border-blue-200 bg-blue-50">
                    <CardHeader>
                      <CardTitle className="text-blue-800">
                        🔍 Diagnosis Result
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
                          <h4 className="font-medium text-gray-700 mb-2">Severity</h4>
                          <Badge className={
                            scanResult.severity === 'High' ? 'bg-red-500' :
                            scanResult.severity === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }>
                            {scanResult.severity}
                          </Badge>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Cause</h4>
                          <p className="text-sm text-gray-600">{scanResult.cause}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Symptoms</h4>
                        <p className="text-sm text-gray-600">{scanResult.symptoms}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Recommended Treatment</h4>
                        <p className="text-sm text-gray-600">{scanResult.treatment}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Prevention</h4>
                        <p className="text-sm text-gray-600">{scanResult.prevention}</p>
                      </div>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeafScanner;
