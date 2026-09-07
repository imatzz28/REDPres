import React from 'react';

export const ProgressBar = ({ progress = 0, currentChapter = 1, totalChapters = 12 }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Red glowing progress line */}
      <div className="w-full h-1 bg-white/10 backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-kfc-red to-kfc-redLight transition-all duration-150 ease-out shadow-[0_0_12px_#E4002B]"
          style={{ width: `${Math.min(Math.max(progress * 100, 0), 100)}%` }}
        />
      </div>

      {/* Progress Floating Pill */}
      <div className="container mx-auto px-4 py-2 flex justify-end items-center text-xs font-semibold tracking-wider text-gray-400">
        <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-white/90">
          <span className="text-kfc-red font-bold">{String(currentChapter).padStart(2, '0')}</span>
          <span className="text-white/40"> / {String(totalChapters).padStart(2, '0')}</span>
        </div>
      </div>
    </div>
  );
};
