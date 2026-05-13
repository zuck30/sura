import React from 'react';
import { QrCode, Link } from 'lucide-react';
import { useCardStore } from '../../stores/cardStore';

const QRCodeSettings: React.FC = () => {
  const { qrEnabled, setQrEnabled, qrUrl, setQrUrl } = useCardStore();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-white/80 text-sm font-medium flex items-center gap-2">
          <QrCode className="w-4 h-4" />
          QR Code
        </label>
        <button
          onClick={() => setQrEnabled(!qrEnabled)}
          className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
            qrEnabled
              ? 'bg-brand-primary text-white'
              : 'bg-white/10 text-white/60'
          }`}
        >
          {qrEnabled ? 'ON' : 'OFF'}
        </button>
      </div>
      
      {qrEnabled && (
        <div className="space-y-2 animate-fade-in">
          <label className="text-white/60 text-xs flex items-center gap-1">
            <Link className="w-3 h-3" />
            QR Code URL
          </label>
          <input
            type="url"
            value={qrUrl}
            onChange={(e) => setQrUrl(e.target.value)}
            placeholder="https://your-link.com"
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/30"
          />
        </div>
      )}
    </div>
  );
};

export default QRCodeSettings;