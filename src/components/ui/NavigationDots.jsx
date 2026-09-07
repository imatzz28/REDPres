import React from 'react';
import { SECTIONS } from '../../data/sectionsData';
import { sounds } from '../audio/SoundManager';

export const NavigationDots = ({ activeIndex = 0, onSelectSection }) => {
  const handleClick = (idx) => {
    sounds.playClick();
    if (onSelectSection) {
      onSelectSection(idx);
    }
  };

  return (
    <nav
      aria-label="Navegación por secciones"
      className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-3 pointer-events-auto"
    >
      <div className="bg-black/50 backdrop-blur-md p-2.5 rounded-full border border-white/10 shadow-2xl flex flex-col items-center gap-2">
        {SECTIONS.map((sec, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={sec.id}
              onClick={() => handleClick(idx)}
              className="relative flex items-center justify-center p-1.5 focus:outline-none cursor-pointer"
              aria-label={`Ir a sección ${idx + 1}: ${sec.title}`}
            >
              {/* Dot Indicator */}
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-3 h-3 bg-kfc-red ring-4 ring-kfc-red/30 shadow-[0_0_10px_#E4002B]'
                    : 'w-2 h-2 bg-white/40 hover:bg-white hover:scale-125'
                }`}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
};
