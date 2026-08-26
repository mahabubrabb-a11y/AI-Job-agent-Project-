'use client';

import React, { useState } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl?: string;
  title?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ title = 'AI Question Audio' }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-900 border dark:border-gray-800 p-3 rounded-xl">
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-transform active:scale-95"
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>

      <div className="flex-1 space-y-1">
        <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">{title}</p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
          <div className={`bg-blue-600 h-full transition-all duration-300 ${isPlaying ? 'w-2/3' : 'w-0'}`} />
        </div>
      </div>

      <Volume2 className="w-4 h-4 text-gray-400" />
    </div>
  );
};