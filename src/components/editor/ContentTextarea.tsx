import React from 'react';
import { FileText } from 'lucide-react';
import { useCardStore } from '../../stores/cardStore';

const ContentTextarea: React.FC = () => {
  const { content, setContent } = useCardStore();

  return (
    <div className="space-y-2">
      <label className="text-white/80 text-sm font-medium flex items-center gap-2">
        <FileText className="w-4 h-4" />
        Content
      </label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your message here... Support emojis 🎉"
        rows={6}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-white/30 focus:bg-white/10 transition-all resize-none"
      />
      <p className="text-white/40 text-xs text-right">{content.length} characters</p>
    </div>
  );
};

export default ContentTextarea;