import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Camera, Upload, Loader2, AlertTriangle, CheckCircle, Info, ArrowLeft, RotateCcw, Settings, Zap, ZapOff, Grid3X3, RotateCw, ZoomIn, Sun } from 'lucide-react';
import { AdvancedCameraInterface } from '@/components/scanner/AdvancedCameraInterface';
import { ImagePreview } from '@/components/scanner/ImagePreview';
import { useToast } from '@/components/ui/use-toast';

const Scanner = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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
    flash: 'auto', // 'on', 'off', 'auto'
    quality: 'HD', // 'Low', 'Medium', 'HD'
    gridLines: false
  });
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const mockDiseases = [
    {
      name: 'Leaf Blight',
      nameInTelugu: 'ఆకు దహనం',
      severity: 'high',
      confidence: 85,
      solution: 'Apply copper-based fungicide spray',
      solutionInTelugu: 'రాగి ఆధారిత శిలీంద్ర నాశిని స్ప్రే చేయండి',
      prevention: 'Reduce watering and improve air circulation',
      preventionInTelugu: 'నీటిపారుదల తగ్గించి గాలి ప్రసరణ మెరుగుపరచండి'
    },
    {
      name: 'Leaf Spots',
      nameInTelugu: 'ఆకు మచ్చలు',
      severity: 'medium',
      confidence: 92,
      solution: 'Apply Mancozeb treatment',
      solutionInTelugu: 'మాంకోజెబ్ చికిత్స చేయండి',
      prevention: 'Water only in the morning to avoid evening moisture',
      preventionInTelugu: 'సాయంత్రం తేమను నివారించడానికి ఉదయం మాత్రమే నీరు పోయండి'
    }
  ];

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

  const requestCameraAccess = async () => {
    try {
      console.log('Requesting camera access...');
      
      // Stop any existing stream first
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
      
      // Show dialog first for better UX
      setShowCameraDialog(true);
      
      const constraints = {
        video: { 
          width: { ideal: 1920, max: 1920 },
          height: { ideal: 1080, max: 1080 },
          facingMode: 'environment', // Use back camera on mobile
          frameRate: { ideal: 30 }
        },
        audio: false
      };
      
      console.log('Camera constraints:', constraints);
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log('Camera stream obtained successfully');
      
      setCameraStream(stream);
      setPermissionDenied(false);
      
      // Set up video element immediately
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        console.log('Video srcObject set');
        
        // Ensure autoplay works
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
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth || 1920;
      canvas.height = video.videoHeight || 1080;
      
      console.log('Capturing photo with dimensions:', canvas.width, 'x', canvas.height);
      
      // Save current transform
      context.save();
      
      // Mirror the image horizontally to match the preview
      context.scale(-1, 1);
      context.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
      
      // Restore transform
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-green-800 mb-2">
                Crop Scanner
              </h1>
              <p className="text-green-600">
                Advanced crop disease identification and treatment
              </p>
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

        {/* Permission Denied Alert */}
        {permissionDenied && (
          <Alert className="mb-6 border-red-200 bg-red-50">
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
        <Card className="border-green-200 mb-6">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center">
              <Camera className="w-6 h-6 mr-2 text-green-600" />
              Capture Crop Photo
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={requestCameraAccess}
                className="h-24 bg-blue-600 hover:bg-blue-700 flex flex-col items-center justify-center transition-all duration-200 hover:scale-105"
              >
                <Camera className="w-8 h-8 mb-2" />
                <span className="font-semibold">Open Camera</span>
                <span className="text-xs opacity-90">Live Preview</span>
              </Button>
              
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="h-24 bg-green-600 hover:bg-green-700 flex flex-col items-center justify-center transition-all duration-200 hover:scale-105"
              >
                <Upload className="w-8 h-8 mb-2" />
                <span className="font-semibold">Upload Photo</span>
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
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800 font-medium">
                📸 For best results:
              </p>
              <ul className="text-xs text-blue-700 mt-1 space-y-1">
                <li>• Use good natural lighting</li>
                <li>• Focus on diseased leaf areas</li>
                <li>• Hold camera steady</li>
                <li>• Fill the frame with the crop</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Camera Dialog */}
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

        {/* Selected Image Preview */}
        {selectedImage && !isScanning && !scanResult && (
          <Card className="border-green-200 mb-6">
            <CardContent className="p-4">
              <img 
                src={selectedImage} 
                alt="Selected crop" 
                className="w-full max-h-64 object-contain rounded-lg mb-4"
              />
              <div className="text-center">
                <p className="text-green-600 mb-4">
                  Preview your crop image below. Make sure it's clear and in good lighting.
                </p>
                <Button 
                  onClick={startScanning}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Use Photo - Begin Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Scanning Status */}
        {isScanning && (
          <Card className="border-blue-200 mb-6">
            <CardContent className="p-6 text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Analyzing...
              </h3>
              <p className="text-blue-600">
                AI model is analyzing your crop photo for disease detection
              </p>
            </CardContent>
          </Card>
        )}

        {/* Scan Results with Telugu + English */}
        {scanResult && (
          <Card className="border-green-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-green-800">
                  Scan Results / స్కాన్ ఫలితాలు
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
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {scanResult.name}
                </h3>
                <h4 className="text-md text-gray-600 mb-2">
                  {scanResult.nameInTelugu}
                </h4>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Treatment / చికిత్స:
                </h4>
                <p className="text-green-700 mb-2">{scanResult.solution}</p>
                <p className="text-green-600 text-sm">{scanResult.solutionInTelugu}</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                  <Info className="w-4 h-4 mr-2" />
                  Prevention / నివారణ:
                </h4>
                <p className="text-blue-700 mb-2">{scanResult.prevention}</p>
                <p className="text-blue-600 text-sm">{scanResult.preventionInTelugu}</p>
              </div>

              <div className="flex space-x-4">
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  Consult Expert
                </Button>
                <Button variant="outline" className="flex-1 border-green-300">
                  More Details
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
