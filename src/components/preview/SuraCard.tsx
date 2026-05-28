import React, { useRef, useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import { useCardStore } from '../../stores/cardStore';

interface SuraCardProps {
  onRender?: (ref: HTMLDivElement | null) => void;
  data?: {
    name?: string;
    username?: string;
    content?: string;
    profileImage?: string | null;
    backgroundImage?: string | null;
    backgroundOpacity?: number;
    themeColor?: string;
    qrEnabled?: boolean;
    qrUrl?: string;
    aspectRatio?: 'square' | 'portrait' | 'landscape' | 'story';
    fontFamily?: string;
    fontSize?: number;
    textAlign?: 'left' | 'center' | 'right';
  };
}

const SuraCard: React.FC<SuraCardProps> = ({ onRender, data }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const store = useCardStore();

  const name = data?.name ?? store.name;
  const username = data?.username ?? store.username;
  const content = data?.content ?? store.content;
  const profileImage = data?.profileImage ?? store.profileImage;
  const backgroundImage = data?.backgroundImage ?? store.backgroundImage;
  const backgroundOpacity = data?.backgroundOpacity ?? store.backgroundOpacity;
  const themeColor = data?.themeColor ?? store.themeColor;
  const qrEnabled = data?.qrEnabled ?? store.qrEnabled;
  const qrUrl = data?.qrUrl ?? store.qrUrl;
  const aspectRatio = data?.aspectRatio ?? store.aspectRatio;
  const fontFamily = data?.fontFamily ?? store.fontFamily;
  const fontSize = data?.fontSize ?? store.fontSize;
  const textAlign = data?.textAlign ?? store.textAlign;

  const [currentDateTime] = useState(new Date());

  useEffect(() => {
    if (onRender && cardRef.current) {
      onRender(cardRef.current);
    }
  }, [onRender, name, username, content, profileImage, backgroundImage, themeColor, qrEnabled]);

  const formattedDate = currentDateTime.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).toUpperCase();
  
  const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const getDimensions = () => {
    switch (aspectRatio) {
      case 'square': return 'w-[500px] h-[500px]';
      case 'landscape': return 'w-[600px] h-[400px]';
      case 'story': return 'w-[360px] h-[640px]';
      case 'portrait':
      default: return 'w-[375px] h-[667px]';
    }
  };

  return (
    <div
      ref={cardRef}
      className={`relative ${getDimensions()} overflow-hidden rounded-3xl shadow-2xl transition-all duration-300`}
      style={{
        fontFamily: fontFamily,
      }}
    >
      {/* Background Layer */}
      {backgroundImage ? (
        <>
          <img
            src={backgroundImage}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: `rgba(0, 0, 0, ${backgroundOpacity})` }}
          />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />
      )}

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col p-5">
        {/* Top Section - Profile */}
        <div className="flex items-center gap-3">
          {profileImage ? (
            <img
              src={profileImage}
              alt={name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <span className="text-white/60 text-xl font-bold">
                {name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          
          <div>
            <h2 className="text-white font-bold text-base" style={{ color: themeColor }}>
              {name}
            </h2>
            <p className="text-white/60 text-xs">@{username}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-3 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Content Section - Scrollable for long text */}
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col justify-center">
          <p
            className="text-white leading-relaxed whitespace-pre-wrap"
            style={{
              fontSize: `${fontSize}px`,
              textAlign: textAlign,
            }}
          >
            {content}
          </p>
        </div>

        {/* Divider */}
        <div className="my-3 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Bottom Section - Date/Time & QR */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/50 text-[10px]">{formattedDate}</p>
            <p className="text-white/40 text-[8px]">{formattedTime}</p>
          </div>
          
          {qrEnabled && qrUrl && (
            <div className="bg-white p-1 rounded-lg">
              <QRCode value={qrUrl} size={35} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuraCard;