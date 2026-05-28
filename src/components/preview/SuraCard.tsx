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
    backgroundGradient?: string | null;
    backgroundOpacity?: number;
    themeColor?: string;
    qrEnabled?: boolean;
    qrUrl?: string;
    layout?: 'standard' | 'minimal' | 'quote' | 'hero';
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
  const backgroundGradient = data?.backgroundGradient ?? store.backgroundGradient;
  const backgroundOpacity = data?.backgroundOpacity ?? store.backgroundOpacity;
  const themeColor = data?.themeColor ?? store.themeColor;
  const qrEnabled = data?.qrEnabled ?? store.qrEnabled;
  const qrUrl = data?.qrUrl ?? store.qrUrl;
  const layout = data?.layout ?? store.layout;
  const aspectRatio = data?.aspectRatio ?? store.aspectRatio;
  const fontFamily = data?.fontFamily ?? store.fontFamily;
  const fontSize = data?.fontSize ?? store.fontSize;
  const textAlign = data?.textAlign ?? store.textAlign;

  const [currentDateTime] = useState(new Date());

  useEffect(() => {
    if (onRender && cardRef.current) {
      onRender(cardRef.current);
    }
  }, [onRender, name, username, content, profileImage, backgroundImage, themeColor, qrEnabled, layout, aspectRatio, fontFamily, fontSize, textAlign]);

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

  const renderLayout = () => {
    switch (layout) {
      case 'minimal':
        return (
          <div className="relative z-10 h-full flex flex-col p-8">
            <div className="flex-1 flex flex-col justify-center">
              <p
                className="text-white leading-relaxed whitespace-pre-wrap font-medium"
                style={{ fontSize: `${fontSize}px`, textAlign: textAlign }}
              >
                {content}
              </p>
            </div>
            <div className="flex items-center justify-between mt-8">
              <div className="flex items-center gap-3">
                {profileImage ? (
                  <img src={profileImage} alt={name} className="w-10 h-10 rounded-full border border-white/20" />
                ) : (
                   <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                    <span className="text-white/60 text-xs font-bold">{name.charAt(0).toUpperCase()}</span>
                  </div>
                )}
                <p className="text-white font-bold text-sm" style={{ color: themeColor }}>{name}</p>
              </div>
              {qrEnabled && qrUrl && (
                <div className="bg-white p-1 rounded-md">
                  <QRCode value={qrUrl} size={30} />
                </div>
              )}
            </div>
          </div>
        );

      case 'quote':
        return (
          <div className="relative z-10 h-full flex flex-col p-10">
            <div className="mb-6 opacity-20">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H13.017V21H14.017ZM6.017 21L6.017 18C6.017 16.8954 6.91243 16 8.017 16H11.017C11.5693 16 12.017 15.5523 12.017 15V9C12.017 8.44772 11.5693 8 11.017 8H8.017C7.46472 8 7.017 8.44772 7.017 9V12C7.017 12.5523 6.56928 13 6.017 13H5.017V21H6.017Z" />
              </svg>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <p
                className="text-white italic leading-tight whitespace-pre-wrap"
                style={{ fontSize: `${fontSize * 1.2}px`, textAlign: textAlign }}
              >
                "{content}"
              </p>
            </div>
            <div className="mt-10 pt-6 border-t border-white/10">
              <h3 className="text-white font-bold text-lg" style={{ color: themeColor }}>— {name}</h3>
              <p className="text-white/40 text-xs mt-1">@{username}</p>
            </div>
          </div>
        );

      case 'hero':
        return (
          <div className="relative z-10 h-full flex flex-col">
            <div className="h-1/3 relative">
              {profileImage && (
                <img src={profileImage} alt={name} className="w-full h-full object-cover" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
            </div>
            <div className="flex-1 p-8 flex flex-col justify-end">
              <h3 className="text-white font-bold text-xl mb-4" style={{ color: themeColor }}>{name}</h3>
              <p
                className="text-white/90 leading-relaxed mb-8"
                style={{ fontSize: `${fontSize}px`, textAlign: textAlign }}
              >
                {content}
              </p>
              <div className="flex items-center justify-between text-xs text-white/40 border-t border-white/10 pt-4">
                <span>{formattedDate}</span>
                {qrEnabled && qrUrl && (
                  <div className="bg-white p-1 rounded-md">
                    <QRCode value={qrUrl} size={30} />
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'standard':
      default:
        return (
          <div className="relative z-10 h-full flex flex-col p-5">
            <div className="flex items-center gap-3">
              {profileImage ? (
                <img src={profileImage} alt={name} className="w-12 h-12 rounded-full object-cover border-2 border-white/30" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                  <span className="text-white/60 text-xl font-bold">{name.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <div>
                <h2 className="text-white font-bold text-base" style={{ color: themeColor }}>{name}</h2>
                <p className="text-white/60 text-xs">@{username}</p>
              </div>
            </div>
            <div className="my-3 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col justify-center">
              <p
                className="text-white leading-relaxed whitespace-pre-wrap"
                style={{ fontSize: `${fontSize}px`, textAlign: textAlign }}
              >
                {content}
              </p>
            </div>
            <div className="my-3 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
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
        );
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
      ) : backgroundGradient ? (
        <div className={`absolute inset-0 ${backgroundGradient}`} />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />
      )}

      {renderLayout()}
    </div>
  );
};

export default SuraCard;