import React, { useRef, useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import { useCardStore } from '../../stores/cardStore';

interface SuraCardProps {
  onRender?: (ref: HTMLDivElement | null) => void;
}

const SuraCard: React.FC<SuraCardProps> = ({ onRender }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const {
    name,
    username,
    content,
    profileImage,
    backgroundImage,
    backgroundOpacity,
    themeColor,
    qrEnabled,
    qrUrl,
  } = useCardStore();

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

  return (
    <div
      ref={cardRef}
      className="relative w-[375px] h-[667px] overflow-hidden rounded-3xl shadow-2xl"
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
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
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <p className="text-white leading-relaxed whitespace-pre-wrap text-sm">
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