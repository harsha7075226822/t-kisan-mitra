
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Grid3X3, Zap, ZapOff, Maximize2, Focus } from 'lucide-react';

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
  const [isStreamReady, setIsStreamReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [focusPoint, setFocusPoint] = useState<{x: number, y: number} | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      console.log('Video can play - stream is ready');
      setIsStreamReady(true);
      setHasError(false);
    };

    const handleLoadedMetadata = () => {
      console.log('Video metadata loaded');
      setIsStreamReady(true);
    };

    const handleError = (e: Event) => {
      console.error('Video error:', e);
      setHasError(true);
      setIsStreamReady(false);
    };

    const handleLoadStart = () => {
      console.log('Video started loading');
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('error', handleError);
    video.addEventListener('loadstart', handleLoadStart);

    // Try to play the video if it has a stream
    if (video.srcObject) {
      video.play().catch((error) => {
        console.error('Failed to play video:', error);
        setHasError(true);
      });
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadstart', handleLoadStart);
    };
  }, [videoRef]);

  const handleTapToFocus = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    
    setFocusPoint({ x, y });
    
    // Clear focus point after animation
    setTimeout(() => {
      setFocusPoint(null);
    }, 1500);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}>
      {/* Camera Feed Container */}
      <div className="relative bg-black rounded-lg overflow-hidden">
        <div 
          className="relative cursor-pointer"
          onClick={handleTapToFocus}
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full object-cover ${isFullscreen ? 'h-screen' : 'h-96'}`}
            style={{ 
              transform: 'scaleX(-1)',
              display: isStreamReady ? 'block' : 'none'
            }}
          />
          
          {/* Canvas for capturing */}
          <canvas ref={canvasRef} className="hidden" />
          
          {/* Loading State - Only show when stream is not ready */}
          {!isStreamReady && !hasError && (
            <div className={`absolute inset-0 flex items-center justify-center bg-black ${isFullscreen ? 'h-screen' : 'h-96'}`}>
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-lg">Starting Camera...</p>
                <p className="text-sm opacity-75 mt-2">Please wait while we initialize your camera</p>
              </div>
            </div>
          )}
          
          {/* Error State */}
          {hasError && (
            <div className={`absolute inset-0 flex items-center justify-center bg-black/90 ${isFullscreen ? 'h-screen' : 'h-96'}`}>
              <div className="text-white text-center">
                <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">Camera Error</p>
                <p className="text-sm opacity-75">Please check camera permissions and try again</p>
              </div>
            </div>
          )}
          
          {/* Tap to Focus Animation */}
          {focusPoint && (
            <div 
              className="absolute pointer-events-none animate-ping"
              style={{
                left: `${focusPoint.x}%`,
                top: `${focusPoint.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="w-16 h-16 border-2 border-yellow-400 rounded-full"></div>
            </div>
          )}
          
          {/* Grid Lines Overlay */}
          {cameraSettings.gridLines && isStreamReady && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-full h-full grid grid-cols-3 grid-rows-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="border border-white/20" />
                ))}
              </div>
            </div>
          )}
          
          {/* Focus Frame - Center Viewfinder */}
          {isStreamReady && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative">
                <div className="w-48 h-48 border-2 border-green-400/70 rounded-lg">
                  {/* Corner brackets */}
                  <div className="absolute -top-1 -left-1 w-6 h-6 border-l-3 border-t-3 border-green-400"></div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 border-r-3 border-t-3 border-green-400"></div>
                  <div className="absolute -bottom-1 -left-1 w-6 h-6 border-l-3 border-b-3 border-green-400"></div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 border-r-3 border-b-3 border-green-400"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Camera Controls Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
          {/* Top Controls */}
          <div className="flex justify-between items-center pointer-events-auto">
            <div className="flex space-x-2">
              {/* Flash Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSettingsChange({ flash: cameraSettings.flash === 'off' ? 'on' : 'off' })}
                className="bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
              >
                {cameraSettings.flash === 'off' ? 
                  <ZapOff className="w-4 h-4" /> : 
                  <Zap className="w-4 h-4" />
                }
              </Button>
              
              {/* Grid Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSettingsChange({ gridLines: !cameraSettings.gridLines })}
                className="bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              
              {/* Fullscreen Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                className="bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Quality Indicator */}
            <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
              {cameraSettings.quality}
            </div>
          </div>
          
          {/* Bottom Controls */}
          <div className="flex justify-center items-center pointer-events-auto">
            <div className="flex items-center space-x-8">
              {/* Focus Instruction */}
              <div className="text-white text-center opacity-75">
                <Focus className="w-4 h-4 mx-auto mb-1" />
                <p className="text-xs">Tap to focus</p>
              </div>
              
              {/* Capture Button */}
              <Button
                onClick={onCapture}
                disabled={!isStreamReady}
                size="lg"
                className="rounded-full w-20 h-20 bg-white hover:bg-gray-100 text-black border-4 border-white shadow-2xl transition-all duration-200 hover:scale-105"
              >
                <Camera className="w-8 h-8" />
              </Button>
              
              {/* Placeholder for symmetry */}
              <div className="w-12"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 font-medium">
          Align the crop leaf or fruit clearly in the camera frame and tap capture
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Ensure good lighting for better analysis • Tap screen to focus
        </p>
      </div>
    </div>
  );
};
