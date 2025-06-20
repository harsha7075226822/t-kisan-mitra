
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { WifiOff, Download, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';

interface OfflineModel {
  id: string;
  name: string;
  size: string;
  accuracy: string;
  downloaded: boolean;
  downloading: boolean;
  crops: string[];
}

interface OfflineScannerProps {
  selectedLanguage: string;
  onOfflineScan: (image: string) => Promise<any>;
}

export const OfflineScanner: React.FC<OfflineScannerProps> = ({ 
  selectedLanguage, 
  onOfflineScan 
}) => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [models, setModels] = useState<OfflineModel[]>([
    {
      id: 'basic-v1',
      name: 'Basic Disease Detection',
      size: '12 MB',
      accuracy: '85%',
      downloaded: false,
      downloading: false,
      crops: ['Tomato', 'Potato', 'Corn']
    },
    {
      id: 'advanced-v2',
      name: 'Advanced Multi-Crop Scanner',
      size: '45 MB',
      accuracy: '94%',
      downloaded: false,
      downloading: false,
      crops: ['Rice', 'Wheat', 'Cotton', 'Soybean', 'Tomato', 'Potato']
    },
    {
      id: 'regional-v1',
      name: 'Regional Crop Specialist',
      size: '28 MB',
      accuracy: '91%',
      downloaded: false,
      downloading: false,
      crops: ['Rice', 'Cotton', 'Chili', 'Turmeric']
    }
  ]);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load downloaded models from localStorage
    const savedModels = localStorage.getItem('downloadedModels');
    if (savedModels) {
      const downloadedIds = JSON.parse(savedModels);
      setModels(prevModels => 
        prevModels.map(model => ({
          ...model,
          downloaded: downloadedIds.includes(model.id)
        }))
      );
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const downloadModel = async (modelId: string) => {
    setModels(prevModels =>
      prevModels.map(model =>
        model.id === modelId ? { ...model, downloading: true } : model
      )
    );

    // Simulate model download
    await new Promise(resolve => setTimeout(resolve, 3000));

    setModels(prevModels =>
      prevModels.map(model =>
        model.id === modelId 
          ? { ...model, downloading: false, downloaded: true }
          : model
      )
    );

    // Save to localStorage
    const downloadedIds = models
      .filter(m => m.downloaded || m.id === modelId)
      .map(m => m.id);
    localStorage.setItem('downloadedModels', JSON.stringify(downloadedIds));
  };

  const removeModel = (modelId: string) => {
    setModels(prevModels =>
      prevModels.map(model =>
        model.id === modelId ? { ...model, downloaded: false } : model
      )
    );

    // Update localStorage
    const downloadedIds = models
      .filter(m => m.downloaded && m.id !== modelId)
      .map(m => m.id);
    localStorage.setItem('downloadedModels', JSON.stringify(downloadedIds));
  };

  const getStorageUsed = () => {
    const downloadedModels = models.filter(m => m.downloaded);
    const totalSize = downloadedModels.reduce((acc, model) => {
      const size = parseInt(model.size.replace(' MB', ''));
      return acc + size;
    }, 0);
    return `${totalSize} MB`;
  };

  const hasDownloadedModels = models.some(m => m.downloaded);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center">
          <WifiOff className="w-5 h-5 mr-2 text-orange-600" />
          {selectedLanguage === 'te' ? 'ఆఫ్‌లైన్ స్కానర్' : 'Offline Scanner'}
        </h3>
        {isOffline && (
          <Badge variant="destructive" className="animate-pulse">
            {selectedLanguage === 'te' ? 'ఆఫ్‌లైన్' : 'Offline'}
          </Badge>
        )}
      </div>

      {/* Connection Status */}
      <Alert className={isOffline ? 'border-orange-200 bg-orange-50' : 'border-green-200 bg-green-50'}>
        <AlertTriangle className={`h-4 w-4 ${isOffline ? 'text-orange-600' : 'text-green-600'}`} />
        <AlertDescription className={isOffline ? 'text-orange-800' : 'text-green-800'}>
          {isOffline 
            ? (selectedLanguage === 'te' 
                ? 'మీరు ఆఫ్‌లైన్‌లో ఉన్నారు. డౌన్‌లోడ్ చేసిన మోడల్స్ ఉపయోగించవచ్చు.' 
                : 'You are offline. Downloaded models can still be used.')
            : (selectedLanguage === 'te' 
                ? 'ఆన్‌లైన్ కనెక్షన్ అందుబాటులో ఉంది.' 
                : 'Online connection available.')
          }
        </AlertDescription>
      </Alert>

      {/* Storage Info */}
      {hasDownloadedModels && (
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">
                {selectedLanguage === 'te' ? 'స్టోరేజ్ వాడుక' : 'Storage Used'}:
              </span>
              <span className="text-green-600">{getStorageUsed()}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Models */}
      <div className="space-y-4">
        <h4 className="font-medium">
          {selectedLanguage === 'te' ? 'అందుబాటులో ఉన్న మోడల్స్' : 'Available Models'}
        </h4>
        
        {models.map((model) => (
          <Card key={model.id} className="border-green-200">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{model.name}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <span>Size: {model.size}</span>
                    <span>Accuracy: {model.accuracy}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {model.downloaded && (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {selectedLanguage === 'te' ? 'డౌన్‌లోడ్ అయింది' : 'Downloaded'}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium">Supported Crops:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {model.crops.map((crop, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {crop}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  {!model.downloaded && !model.downloading && (
                    <Button
                      onClick={() => downloadModel(model.id)}
                      disabled={isOffline}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {selectedLanguage === 'te' ? 'डाउनलोड करें' : 'Download'}
                    </Button>
                  )}
                  
                  {model.downloading && (
                    <Button disabled className="flex-1">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {selectedLanguage === 'te' ? 'डाउनलोड हो रहा है...' : 'Downloading...'}
                    </Button>
                  )}
                  
                  {model.downloaded && (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => removeModel(model.id)}
                        className="flex-1"
                      >
                        {selectedLanguage === 'te' ? 'हटाएं' : 'Remove'}
                      </Button>
                      <Button
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                        onClick={() => {
                          // This would trigger offline scanning with this model
                          console.log(`Using offline model: ${model.id}`);
                        }}
                      >
                        {selectedLanguage === 'te' ? 'इस्तेमाल करें' : 'Use Model'}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Offline Instructions */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <h4 className="font-medium text-blue-800 mb-2">
            {selectedLanguage === 'te' ? 'ऑफलाइन उपयोग के लिए सुझाव' : 'Tips for Offline Use'}
          </h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• {selectedLanguage === 'te' 
              ? 'अच्छे नेटवर्क कनेक्शन के साथ मॉडल डाउनलोड करें' 
              : 'Download models when you have good network connection'}</li>
            <li>• {selectedLanguage === 'te' 
              ? 'कम रोशनी में बेहतर परिणाम के लिए फ्लैश का उपयोग करें' 
              : 'Use flash for better results in low light'}</li>
            <li>• {selectedLanguage === 'te' 
              ? 'ऑफलाइन मॉडल की सटीकता ऑनलाइन मॉडल से कम हो सकती है' 
              : 'Offline models may have lower accuracy than online models'}</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
