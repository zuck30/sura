import React from 'react';
import { FileText } from 'lucide-react';
import { useCardStore } from '../../stores/cardStore';

const ContentTextarea: React.FC = () => {
  const { content, setContent } = useCardStore();

  return (
    <div className="space-y-2">
      <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
        <FileText className="w-4 h-4" />
        Content
      </label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your message here... Support emojis 🎉"
        rows={6}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#002966] focus:ring-1 focus:ring-[#002966] transition-all resize-none"
      />
      <p className="text-gray-400 text-xs text-right">{content.length} characters</p>
    </div>
  );
};

export default ContentTextarea;