import React from 'react';
import { QrCode, Link } from 'lucide-react';
import { useCardStore } from '../../stores/cardStore';

const QRCodeSettings: React.FC = () => {
  const { qrEnabled, setQrEnabled, qrUrl, setQrUrl } = useCardStore();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
          <QrCode className="w-4 h-4" />
          QR Code
        </label>
        <button
          onClick={() => setQrEnabled(!qrEnabled)}
          className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
            qrEnabled
              ? 'bg-[#002966] text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {qrEnabled ? 'ON' : 'OFF'}
        </button>
      </div>
      
      {qrEnabled && (
        <div className="space-y-2">
          <label className="text-gray-500 text-xs flex items-center gap-1">
            <Link className="w-3 h-3" />
            QR Code URL
          </label>
          <input
            type="url"
            value={qrUrl}
            onChange={(e) => setQrUrl(e.target.value)}
            placeholder="https://your-link.com"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm placeholder-gray-400 focus:border-[#002966] focus:ring-1 focus:ring-[#002966]"
          />
        </div>
      )}
    </div>
  );
};

export default QRCodeSettings;