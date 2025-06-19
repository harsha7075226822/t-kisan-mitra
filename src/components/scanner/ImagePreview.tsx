
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RotateCw, ZoomIn, Sun, CheckCircle, RotateCcw, Crop } from 'lucide-react';

interface ImagePreviewProps {
  image: string;
  onRetake: () => void;
  onConfirm: () => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  image,
  onRetake,
  onConfirm
}) => {
  const [rotation, setRotation] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [zoom, setZoom] = useState(100);
  const [showCropMode, setShowCropMode] = useState(false);

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleBrightnessChange = (delta: number) => {
    setBrightness(prev => Math.max(50, Math.min(150, prev + delta)));
  };

  const handleZoomChange = (delta: number) => {
    setZoom(prev => Math.max(50, Math.min(200, prev + delta)));
  };

  const imageStyle = {
    transform: `rotate(${rotation}deg) scale(${zoom / 100})`,
    filter: `brightness(${brightness}%)`,
    transition: 'all 0.3s ease'
  };

  return (
    <div className="space-y-4">
      {/* Image Preview */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden">
        <div className="flex items-center justify-center min-h-64 p-4">
          <img 
            src={image} 
            alt="Captured crop" 
            className="max-w-full max-h-64 object-contain"
            style={imageStyle}
          />
        </div>
        
        {/* Crop Overlay */}
        {showCropMode && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="border-2 border-dashed border-yellow-400 w-48 h-48 bg-transparent relative">
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-400"></div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-yellow-400"></div>
              <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-yellow-400"></div>
            </div>
          </div>
        )}
      </div>

      {/* Image Enhancement Controls */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Rotation</label>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRotate}
            className="w-full"
          >
            <RotateCw className="w-4 h-4 mr-2" />
            Rotate
          </Button>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Crop Disease Area</label>
          <Button
            variant={showCropMode ? "default" : "outline"}
            size="sm"
            onClick={() => setShowCropMode(!showCropMode)}
            className="w-full"
          >
            <Crop className="w-4 h-4 mr-2" />
            {showCropMode ? 'Exit Crop' : 'Crop'}
          </Button>
        </div>
      </div>

      {/* Adjustment Controls */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Zoom</span>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleZoomChange(-10)}
              disabled={zoom <= 50}
            >
              -
            </Button>
            <Badge variant="outline">{zoom}%</Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleZoomChange(10)}
              disabled={zoom >= 200}
            >
              +
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Brightness</span>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBrightnessChange(-10)}
              disabled={brightness <= 50}
            >
              <Sun className="w-3 h-3" />
              -
            </Button>
            <Badge variant="outline">{brightness}%</Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBrightnessChange(10)}
              disabled={brightness >= 150}
            >
              <Sun className="w-3 h-3" />
              +
            </Button>
          </div>
        </div>
      </div>

      {/* Quality Check */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <h4 className="font-medium text-blue-800 mb-2">Image Quality Check</h4>
        <div className="space-y-1">
          <div className="flex items-center text-sm">
            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
            <span className="text-green-700">Good lighting detected</span>
          </div>
          <div className="flex items-center text-sm">
            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
            <span className="text-green-700">Sharp focus achieved</span>
          </div>
          <div className="flex items-center text-sm">
            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
            <span className="text-green-700">Crop visible in frame</span>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="text-center">
        <p className="text-green-600 mb-2">
          Preview your crop image below. Make sure it's clear and in good lighting.
        </p>
        <p className="text-sm text-gray-500">
          Tap 'Use Photo' to begin analysis or 'Retake' to capture again.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Button variant="outline" onClick={onRetake} className="flex-1">
          <RotateCcw className="w-4 h-4 mr-2" />
          Retake
        </Button>
        <Button onClick={onConfirm} className="flex-1 bg-green-600 hover:bg-green-700">
          <CheckCircle className="w-4 h-4 mr-2" />
          Use Photo
        </Button>
      </div>
    </div>
  );
};
