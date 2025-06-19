
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

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      const handleLoadedMetadata = () => {
        setIsReady(true);
      };
      
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      return () => video.removeEventListener('loadedmetadata', handleLoadedMetadata);
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
          className="w-full h-96 object-cover"
        />
        <canvas ref={canvasRef} className="hidden" />
        
        {/* Grid Lines Overlay */}
        {cameraSettings.gridLines && (
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
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-48 h-48 border-2 border-green-400 rounded-lg shadow-lg">
            <div className="absolute -top-1 -left-1 w-6 h-6 border-l-2 border-t-2 border-green-400"></div>
            <div className="absolute -top-1 -right-1 w-6 h-6 border-r-2 border-t-2 border-green-400"></div>
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-l-2 border-b-2 border-green-400"></div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-r-2 border-b-2 border-green-400"></div>
          </div>
        </div>
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
