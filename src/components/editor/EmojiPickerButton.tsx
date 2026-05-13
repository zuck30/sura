import React, { useState } from 'react';
import { Smile } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import { useCardStore } from '../../stores/cardStore';

const EmojiPickerButton: React.FC = () => {
  const [showPicker, setShowPicker] = useState(false);
  const { content, setContent } = useCardStore();

  const onEmojiClick = (emojiObject: any) => {
    setContent(content + emojiObject.emoji);
    setShowPicker(false);
  };

  return (
    <div className="relative">
      <div className="space-y-2">
        <label className="text-white/80 text-sm font-medium flex items-center gap-2">
          <Smile className="w-4 h-4" />
          Add Emoji
        </label>
        
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-all flex items-center justify-center gap-2"
        >
          <Smile className="w-4 h-4" />
          Pick Emoji
        </button>
      </div>
      
      {showPicker && (
        <div className="absolute z-20 mt-2">
          <div className="fixed inset-0" onClick={() => setShowPicker(false)} />
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerButton;