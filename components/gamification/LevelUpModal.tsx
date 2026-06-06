'use client';

import { useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { getLevelFromXP } from '@/lib/utils';
import { Zap, X } from 'lucide-react';

export default function LevelUpModal() {
  const { progress } = useAppStore();
  const [showModal, setShowModal] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(getLevelFromXP(progress.xp));

  useEffect(() => {
    const newLevel = getLevelFromXP(progress.xp);
    if (newLevel.level > currentLevel.level) {
      setCurrentLevel(newLevel);
      setShowModal(true);
    }
  }, [progress.xp, currentLevel.level]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-card max-w-md w-full p-8 border-accent-cyan shadow-glow-cyan relative flex flex-col items-center text-center animate-slide-up">
        
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-cyan" />
        
        <button 
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors"
        >
          <X size={20} />
        </button>

        <div className="w-24 h-24 rounded-full bg-accent-cyan/10 border-4 border-accent-cyan flex items-center justify-center text-accent-cyan mb-6 shadow-glow-cyan animate-pulse-glow">
          <Zap size={40} className="animate-shake" />
        </div>

        <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-cyan">
          Niveau Supérieur !
        </h2>
        
        <p className="text-text-secondary mb-6 text-lg">
          Vous avez atteint le niveau {currentLevel.level} : <strong className="text-text-primary">{currentLevel.title}</strong>
        </p>

        <button 
          onClick={() => setShowModal(false)}
          className="w-full py-3 px-6 bg-accent-cyan text-inverse font-bold rounded-lg hover:brightness-110 transition-all shadow-glow-cyan"
        >
          Continuer l'apprentissage
        </button>
      </div>
    </div>
  );
}
