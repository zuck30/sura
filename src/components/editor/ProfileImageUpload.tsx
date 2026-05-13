import React, { useRef } from 'react';
import { Upload, User, X } from 'lucide-react';
import { useCardStore } from '../../stores/cardStore';

const ProfileImageUpload: React.FC = () => {
  const { profileImage, setProfileImage } = useCardStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-white/80 text-sm font-medium flex items-center gap-2">
        <Upload className="w-4 h-4" />
        Profile Picture
      </label>
      
      {profileImage ? (
        <div className="relative inline-block">
          <img
            src={profileImage}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-white/20"
          />
          <button
            onClick={() => setProfileImage(null)}
            className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-all flex items-center justify-center gap-2"
        >
          <User className="w-4 h-4" />
          Upload Image
        </button>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
};

export default ProfileImageUpload;