import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CardState {
  // Basic info
  name: string;
  username: string;
  content: string;
  
  // Media
  profileImage: string | null;
  backgroundImage: string | null;
  backgroundOpacity: number;
  
  // Styling
  themeColor: string;
  
  // QR
  qrEnabled: boolean;
  qrUrl: string;
  
  // Settings
  aspectRatio: 'square' | 'portrait' | 'landscape' | 'story';
  fontFamily: string;
  fontSize: number;
  textAlign: 'left' | 'center' | 'right';
  rtlEnabled: boolean;
  language: 'en' | 'sw';
  
  // Actions
  setName: (name: string) => void;
  setUsername: (username: string) => void;
  setContent: (content: string) => void;
  setProfileImage: (image: string | null) => void;
  setBackgroundImage: (image: string | null) => void;
  setBackgroundOpacity: (opacity: number) => void;
  setThemeColor: (color: string) => void;
  setQrEnabled: (enabled: boolean) => void;
  setQrUrl: (url: string) => void;
  setAspectRatio: (ratio: 'square' | 'portrait' | 'landscape' | 'story') => void;
  setFontFamily: (font: string) => void;
  setFontSize: (size: number) => void;
  setTextAlign: (align: 'left' | 'center' | 'right') => void;
  setRtlEnabled: (enabled: boolean) => void;
  setLanguage: (lang: 'en' | 'sw') => void;
  reset: () => void;
}

const initialState = {
  name: 'Sura User',
  username: 'sura_app',
  content: 'Share your thoughts, ideas, and stories with the world. ✨\n\nCreate beautiful image cards in seconds. 📸',
  profileImage: null,
  backgroundImage: null,
  backgroundOpacity: 0.4,
  themeColor: '#002966',
  qrEnabled: false,
  qrUrl: 'https://sura.app',
  aspectRatio: 'portrait' as const,
  fontFamily: "'Inter', sans-serif",
  fontSize: 16,
  textAlign: 'left' as const,
  rtlEnabled: false,
  language: 'en' as const,
};

export const useCardStore = create<CardState>()(
  persist(
    (set) => ({
      ...initialState,
      setName: (name) => set({ name }),
      setUsername: (username) => set({ username }),
      setContent: (content) => set({ content }),
      setProfileImage: (profileImage) => set({ profileImage }),
      setBackgroundImage: (backgroundImage) => set({ backgroundImage }),
      setBackgroundOpacity: (backgroundOpacity) => set({ backgroundOpacity }),
      setThemeColor: (themeColor) => set({ themeColor }),
      setQrEnabled: (qrEnabled) => set({ qrEnabled }),
      setQrUrl: (qrUrl) => set({ qrUrl }),
      setAspectRatio: (aspectRatio) => set({ aspectRatio }),
      setFontFamily: (fontFamily) => set({ fontFamily }),
      setFontSize: (fontSize) => set({ fontSize }),
      setTextAlign: (textAlign) => set({ textAlign }),
      setRtlEnabled: (rtlEnabled) => set({ rtlEnabled }),
      setLanguage: (language) => set({ language }),
      reset: () => set(initialState),
    }),
    {
      name: 'sura-storage',
    }
  )
);