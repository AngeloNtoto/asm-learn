'use client';

import { useAppStore } from '@/lib/store';
import { getXPProgress, getLevelFromXP } from '@/lib/utils';
import { Menu, Search, Flame } from 'lucide-react';

export default function TopBar() {
  const { toggleSidebar, progress } = useAppStore();
  const { current, max, percentage } = getXPProgress(progress.xp);
  const currentLevel = getLevelFromXP(progress.xp);

  return (
    <header className="h-[64px] min-h-[64px] bg-primary/80 backdrop-blur-md border-b border-default sticky top-0 z-30 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-surface text-text-secondary md:hidden"
        >
          <Menu size={24} />
        </button>

        {/* Search Bar Placeholder */}
        <button className="hidden md:flex items-center gap-2 bg-surface hover:bg-elevated border border-default rounded-md px-3 py-1.5 text-sm text-text-muted transition-colors w-64">
          <Search size={16} />
          <span>Rechercher... (Cmd+K)</span>
        </button>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        {/* Streak Counter */}
        <div className="flex items-center gap-1.5 text-accent-amber font-bold" title="Série de jours actifs">
          <Flame size={20} className={progress.streak > 0 ? 'fill-accent-amber animate-pulse-glow rounded-full' : ''} />
          <span>{progress.streak}</span>
        </div>

        {/* XP and Level Bar */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end hidden md:flex">
            <span className="text-sm font-bold text-text-primary">Niveau {currentLevel.level}</span>
            <span className="text-xs text-text-muted">{currentLevel.title}</span>
          </div>
          
          <div className="w-10 h-10 shrink-0 rounded-full border-2 border-accent-cyan flex items-center justify-center font-bold text-accent-cyan bg-surface relative overflow-hidden group cursor-pointer">
            {currentLevel.level}
            <div className="absolute inset-0 bg-accent-cyan/10 translate-y-full group-hover:translate-y-0 transition-transform" />
          </div>

          <div className="w-32 hidden md:flex flex-col gap-1">
            <div className="flex justify-between text-xs text-text-secondary">
              <span>{current} XP</span>
              <span>{max} XP</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-bar-fill bg-accent-cyan" 
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
