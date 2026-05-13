import React, { useRef, useState } from 'react';
import { Download, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';
import SuraCard from './SuraCard';
import { toPng } from 'html-to-image';
import { useCardStore } from '../../stores/cardStore';

const PreviewCanvas: React.FC = () => {
  const [scale, setScale] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const cardElementRef = useRef<HTMLDivElement | null>(null);
  const { username } = useCardStore();

  const handleDownload = async () => {
    if (!cardElementRef.current) return;
    
    setIsGenerating(true);
    try {
      const dataUrl = await toPng(cardElementRef.current, {
        quality: 1,
        pixelRatio: 2,
      });
      
      const link = document.createElement('a');
      const date = new Date().toISOString().split('T')[0];
      link.download = `sura_${username}_${date}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Failed to generate image:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 1.5));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5));
  const handleReset = () => setScale(1);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Preview Title */}
      <div className="text-center">
        <h3 className="text-white/90 font-semibold text-lg">Live Preview</h3>
        <p className="text-white/40 text-sm">What you see is what you get</p>
      </div>

      {/* Zoom Controls */}
      <div className="flex items-center gap-2 glass px-3 py-2 rounded-full">
        <button
          onClick={handleZoomOut}
          className="p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <ZoomOut className="w-4 h-4 text-white/70" />
        </button>
        <span className="text-white/70 text-sm min-w-[60px] text-center">
          {Math.round(scale * 100)}%
        </span>
        <button
          onClick={handleZoomIn}
          className="p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <ZoomIn className="w-4 h-4 text-white/70" />
        </button>
        <button
          onClick={handleReset}
          className="p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <RefreshCw className="w-4 h-4 text-white/70" />
        </button>
      </div>

      {/* Card Preview with Zoom */}
      <div
        className="overflow-auto rounded-2xl p-4 glass"
        style={{ maxHeight: '60vh', maxWidth: '100%' }}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            transition: 'transform 0.2s ease',
          }}
        >
          <SuraCard onRender={(ref) => (cardElementRef.current = ref)} />
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-primary to-brand-light text-white font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            Download PNG
          </>
        )}
      </button>
    </div>
  );
};

export default PreviewCanvas;