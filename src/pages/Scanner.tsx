import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Camera, Upload, Loader2, AlertTriangle, CheckCircle, Info, ArrowLeft, RotateCcw } from 'lucide-react';

const Scanner = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showCameraDialog, setShowCameraDialog] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showPermissionAlert, setShowPermissionAlert] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const mockDiseases = [
    {
      name: 'Leaf Blight',
      severity: 'high',
      confidence: 85,
      solution: 'Apply copper-based fungicide spray',
      prevention: 'Reduce watering and improve air circulation'
    },
    {
      name: 'Leaf Spots',
      severity: 'medium',
      confidence: 92,
      solution: 'Apply Mancozeb treatment',
      prevention: 'Water only in the morning to avoid evening moisture'
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
      setShowPermissionAlert(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment' // Use back camera for crop scanning
        } 
      });
      
      setCameraStream(stream);
      setShowCameraDialog(true);
      setShowPermissionAlert(false);
      setPermissionDenied(false);
      
      // Set video stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Camera access denied:', error);
      setPermissionDenied(true);
      setShowPermissionAlert(false);
      alert('Please enable camera access to use this feature.');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedImage(imageDataUrl);
    }
  };

  const confirmCapture = () => {
    if (capturedImage) {
      setSelectedImage(capturedImage);
      closeCameraDialog();
      scanImage();
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
        scanImage();
      };
      reader.readAsDataURL(file);
    }
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

  const retryPermission = () => {
    setPermissionDenied(false);
    requestCameraAccess();
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
            Crop Scanner
          </h1>
          <p className="text-green-600">
            Crop disease identification and treatment
          </p>
        </div>

        {/* Permission Alert */}
        {showPermissionAlert && (
          <Alert className="mb-6 border-orange-200 bg-orange-50">
            <Camera className="h-4 w-4" />
            <AlertDescription className="text-orange-800">
              <strong>⚠️ Kisan Mitra AI needs camera access to continue.</strong>
              <br />
              Please allow camera access to scan your crop or verify your identity.
            </AlertDescription>
          </Alert>
        )}

        {/* Permission Denied Alert */}
        {permissionDenied && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-red-800">
              Camera access was denied. Please enable camera access in your browser settings to use this feature.
              <Button 
                onClick={retryPermission}
                variant="outline"
                size="sm"
                className="ml-2 mt-2"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Upload Section */}
        <Card className="border-green-200 mb-6">
          <CardHeader>
            <CardTitle className="text-center">
              Upload Crop Photo
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={requestCameraAccess}
                className="h-24 bg-blue-600 hover:bg-blue-700 flex flex-col items-center justify-center"
              >
                <Camera className="w-8 h-8 mb-2" />
                Capture Image
              </Button>
              
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="h-24 bg-green-600 hover:bg-green-700 flex flex-col items-center justify-center"
              >
                <Upload className="w-8 h-8 mb-2" />
                Gallery
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
              Take a clear photo of crop leaves or stem
            </p>
          </CardContent>
        </Card>

        {/* Camera Dialog */}
        <Dialog open={showCameraDialog} onOpenChange={closeCameraDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Capture Crop Photo</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {!capturedImage ? (
                <div className="relative bg-black rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-64 object-cover"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <Button
                      onClick={capturePhoto}
                      size="lg"
                      className="rounded-full w-16 h-16 bg-white hover:bg-gray-100 text-black"
                    >
                      <Camera className="w-8 h-8" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <img 
                    src={capturedImage} 
                    alt="Captured crop" 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <p className="text-center text-sm text-gray-600">
                    Preview your captured image
                  </p>
                </div>
              )}
            </div>
            <DialogFooter className="space-x-2">
              {!capturedImage ? (
                <Button variant="outline" onClick={closeCameraDialog}>
                  Cancel
                </Button>
              ) : (
                <>
                  <Button variant="outline" onClick={retryCapture}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Retake
                  </Button>
                  <Button onClick={confirmCapture} className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Use This Photo
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

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
                Scanning...
              </h3>
              <p className="text-blue-600">
                AI model is analyzing your crop photo
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
                  Scan Results
                </CardTitle>
                <Badge className="bg-blue-100 text-blue-800">
                  {scanResult.confidence}% Confidence
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
                      Detected
                    </span>
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {scanResult.name}
                </h3>
              </div>

              {/* Solution */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Treatment:
                </h4>
                <p className="text-green-700">{scanResult.solution}</p>
              </div>

              {/* Prevention */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                  <Info className="w-4 h-4 mr-2" />
                  Prevention:
                </h4>
                <p className="text-blue-700">{scanResult.prevention}</p>
              </div>

              {/* Action Buttons */}
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
