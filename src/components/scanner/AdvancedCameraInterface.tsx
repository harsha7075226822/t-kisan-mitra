
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Grid3X3, Zap, ZapOff, Settings } from 'lucide-react';

interface AdvancedCameraInterfaceProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  cameraSettings: {
    flash: string;
    quality: string;
    gridLines: boolean;
  };
  onCapture: () => void;
  onSettingsChange: (settings: any) => void;
}

export const AdvancedCameraInterface: React.FC<AdvancedCameraInterfaceProps> = ({
  videoRef,
  canvasRef,
  cameraSettings,
  onCapture,
  onSettingsChange
}) => {
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      const handleLoadedMetadata = () => {
        console.log('Video metadata loaded');
        setIsReady(true);
        setHasError(false);
      };

      const handleError = (e) => {
        console.error('Video error:', e);
        setHasError(true);
      };

      const handleLoadStart = () => {
        console.log('Video load started');
      };

      const handleCanPlay = () => {
        console.log('Video can play');
        setIsReady(true);
      };
      
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('error', handleError);
      video.addEventListener('loadstart', handleLoadStart);
      video.addEventListener('canplay', handleCanPlay);
      
      // Ensure video plays
      if (video.srcObject) {
        video.play().catch(console.error);
      }
      
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('error', handleError);
        video.removeEventListener('loadstart', handleLoadStart);
        video.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, [videoRef]);

  return (
    <div className="relative">
      {/* Camera Feed */}
      <div className="relative bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-96 object-cover"
          style={{ transform: 'scaleX(-1)' }}
        />
        <canvas ref={canvasRef} className="hidden" />
        
        {/* Error State */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <div className="text-white text-center">
              <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">Camera Error</p>
              <p className="text-sm opacity-75">Please check camera permissions</p>
            </div>
          </div>
        )}
        
        {/* Loading State */}
        {!isReady && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-lg">Starting Camera...</p>
            </div>
          </div>
        )}
        
        {/* Grid Lines Overlay */}
        {cameraSettings.gridLines && isReady && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="w-full h-full grid grid-cols-3 grid-rows-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="border border-white/30" />
              ))}
            </div>
          </div>
        )}
        
        {/* Camera Controls Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          {/* Top Controls */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSettingsChange({ flash: cameraSettings.flash === 'off' ? 'on' : 'off' })}
                className="bg-black/50 text-white hover:bg-black/70"
              >
                {cameraSettings.flash === 'off' ? 
                  <ZapOff className="w-4 h-4" /> : 
                  <Zap className="w-4 h-4" />
                }
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSettingsChange({ gridLines: !cameraSettings.gridLines })}
                className="bg-black/50 text-white hover:bg-black/70"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="bg-black/50 text-white px-2 py-1 rounded text-sm">
              {cameraSettings.quality}
            </div>
          </div>
          
          {/* Bottom Controls */}
          <div className="flex justify-center">
            <Button
              onClick={onCapture}
              disabled={!isReady}
              size="lg"
              className="rounded-full w-16 h-16 bg-white hover:bg-gray-100 text-black border-4 border-white shadow-lg"
            >
              <Camera className="w-8 h-8" />
            </Button>
          </div>
        </div>
        
        {/* Focus Frame */}
        {isReady && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-48 h-48 border-2 border-green-400 rounded-lg shadow-lg">
              <div className="absolute -top-1 -left-1 w-6 h-6 border-l-2 border-t-2 border-green-400"></div>
              <div className="absolute -top-1 -right-1 w-6 h-6 border-r-2 border-t-2 border-green-400"></div>
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-l-2 border-b-2 border-green-400"></div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-r-2 border-b-2 border-green-400"></div>
            </div>
          </div>
        )}
      </div>
      
      {/* Instruction Text */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Position the crop within the frame and tap the capture button
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Ensure good lighting and focus on diseased areas
        </p>
      </div>
    </div>
  );
};
