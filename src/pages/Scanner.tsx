
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, Loader2, AlertTriangle, CheckCircle, Info, ArrowLeft } from 'lucide-react';

const Scanner = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('telugu');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const mockDiseases = [
    {
      name: { telugu: 'లీఫ్ బ్లైట్', english: 'Leaf Blight' },
      severity: 'high',
      confidence: 85,
      solution: {
        telugu: 'కాపర్ బేస్డ్ ఫంగిసైడ్ స్ప్రే చేయండి',
        english: 'Apply copper-based fungicide spray'
      },
      prevention: {
        telugu: 'నీటిపారుదల తగ్గించండి మరియు గాలి ప్రసరణ పెంచండి',
        english: 'Reduce watering and improve air circulation'
      }
    },
    {
      name: { telugu: 'పత్రాల మచ్చలు', english: 'Leaf Spots' },
      severity: 'medium',
      confidence: 92,
      solution: {
        telugu: 'మాంకోజెబ్ దిద్దుబాటు చేయండి',
        english: 'Apply Mancozeb treatment'
      },
      prevention: {
        telugu: 'రాత్రి సమయంలో పాలసీకి మునుపు మాత్రమే నీరు పెట్టండి',
        english: 'Water only in the morning to avoid evening moisture'
      }
    }
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        scanImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    // In a real app, this would access the camera
    alert(selectedLanguage === 'telugu' 
      ? 'కెమెరా ఫీచర్ ఉపయోగించడానికి మొబైల్ యాప్ డౌన్‌లోడ్ చేయండి'
      : 'Download mobile app to use camera feature'
    );
  };

  const scanImage = () => {
    setIsScanning(true);
    setScanResult(null);
    
    // Simulate scanning process
    setTimeout(() => {
      const randomDisease = mockDiseases[Math.floor(Math.random() * mockDiseases.length)];
      setScanResult(randomDisease);
      setIsScanning(false);
    }, 3000);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-cream-50 p-6">
      <div className="max-w-4xl mx-auto">
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

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            {selectedLanguage === 'telugu' ? 'పంట స్కానర్' : 'Crop Scanner'}
          </h1>
          <p className="text-green-600">
            {selectedLanguage === 'telugu' 
              ? 'పంట వ్యాధుల గుర్తింపు మరియు చికిత్స'
              : 'Crop disease identification and treatment'
            }
          </p>
        </div>

        {/* Language Toggle */}
        <div className="flex space-x-2 mb-6">
          <Button
            variant={selectedLanguage === 'telugu' ? 'default' : 'outline'}
            onClick={() => setSelectedLanguage('telugu')}
            className="bg-green-600 hover:bg-green-700"
          >
            తెలుగు
          </Button>
          <Button
            variant={selectedLanguage === 'english' ? 'default' : 'outline'}
            onClick={() => setSelectedLanguage('english')}
            className="bg-green-600 hover:bg-green-700"
          >
            English
          </Button>
        </div>

        {/* Upload Section */}
        <Card className="border-green-200 mb-6">
          <CardHeader>
            <CardTitle className="text-center">
              {selectedLanguage === 'telugu' ? 'పంట ఫోటో అప్‌లోడ్ చేయండి' : 'Upload Crop Photo'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={handleCameraCapture}
                className="h-24 bg-blue-600 hover:bg-blue-700 flex flex-col items-center justify-center"
              >
                <Camera className="w-8 h-8 mb-2" />
                {selectedLanguage === 'telugu' ? 'కెమెరా' : 'Camera'}
              </Button>
              
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="h-24 bg-green-600 hover:bg-green-700 flex flex-col items-center justify-center"
              >
                <Upload className="w-8 h-8 mb-2" />
                {selectedLanguage === 'telugu' ? 'గ్యాలరీ' : 'Gallery'}
              </Button>
            </div>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            
            <p className="text-sm text-gray-600">
              {selectedLanguage === 'telugu' 
                ? 'పంట యొక్క ఆకులు లేదా కాండం యొక్క స్పష్టమైన ఫోటో తీయండి'
                : 'Take a clear photo of crop leaves or stem'
              }
            </p>
          </CardContent>
        </Card>

        {/* Selected Image */}
        {selectedImage && (
          <Card className="border-green-200 mb-6">
            <CardContent className="p-4">
              <img 
                src={selectedImage} 
                alt="Selected crop" 
                className="w-full max-h-64 object-contain rounded-lg"
              />
            </CardContent>
          </Card>
        )}

        {/* Scanning Status */}
        {isScanning && (
          <Card className="border-blue-200 mb-6">
            <CardContent className="p-6 text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                {selectedLanguage === 'telugu' ? 'స్కాన్ చేస్తున్నాము...' : 'Scanning...'}
              </h3>
              <p className="text-blue-600">
                {selectedLanguage === 'telugu' 
                  ? 'AI మోడల్ మీ పంట ఫోటోని విశ్లేషిస్తోంది'
                  : 'AI model is analyzing your crop photo'
                }
              </p>
            </CardContent>
          </Card>
        )}

        {/* Scan Results */}
        {scanResult && (
          <Card className="border-green-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-green-800">
                  {selectedLanguage === 'telugu' ? 'స్కాన్ ఫలితాలు' : 'Scan Results'}
                </CardTitle>
                <Badge className="bg-blue-100 text-blue-800">
                  {scanResult.confidence}% {selectedLanguage === 'telugu' ? 'నమ్మకం' : 'Confidence'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Disease Identification */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Badge className={getSeverityColor(scanResult.severity)}>
                    {getSeverityIcon(scanResult.severity)}
                    <span className="ml-1">
                      {selectedLanguage === 'telugu' ? 'గుర్తించబడింది' : 'Detected'}
                    </span>
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {scanResult.name[selectedLanguage]}
                </h3>
              </div>

              {/* Solution */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {selectedLanguage === 'telugu' ? 'చికిత్స:' : 'Treatment:'}
                </h4>
                <p className="text-green-700">{scanResult.solution[selectedLanguage]}</p>
              </div>

              {/* Prevention */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                  <Info className="w-4 h-4 mr-2" />
                  {selectedLanguage === 'telugu' ? 'నివారణ:' : 'Prevention:'}
                </h4>
                <p className="text-blue-700">{scanResult.prevention[selectedLanguage]}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  {selectedLanguage === 'telugu' ? 'నిపుణుడిని సంప్రదించండి' : 'Consult Expert'}
                </Button>
                <Button variant="outline" className="flex-1 border-green-300">
                  {selectedLanguage === 'telugu' ? 'మరిన్ని వివరాలు' : 'More Details'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Scanner;
