import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { sounds } from '../audio/SoundManager';

export const Header = () => {
  const [soundActive, setSoundActive] = useState(false);

  const handleToggleSound = () => {
    const nextState = sounds.toggle();
    setSoundActive(nextState);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 pointer-events-none py-4 px-6 md:px-10">
      <div className="w-full flex items-center justify-end">
        {/* Sound Toggle Button */}
        <button
          onClick={handleToggleSound}
          className={`pointer-events-auto p-2.5 rounded-full border transition-all backdrop-blur-md shadow-lg ${
            soundActive
              ? 'bg-kfc-red/25 border-kfc-red text-kfc-red shadow-[0_0_15px_rgba(228,0,43,0.5)]'
              : 'bg-black/50 border-white/20 text-gray-300 hover:text-white hover:bg-black/70'
          }`}
          title={soundActive ? 'Desactivar audio procedural' : 'Activar audio interactivo'}
          aria-label="Alternar sonido"
        >
          {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
