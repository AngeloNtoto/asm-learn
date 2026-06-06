'use client';

import { useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { BADGE_DEFINITIONS } from '@/lib/utils';
import { Trophy, X } from 'lucide-react';

export default function BadgeToast() {
  const { progress } = useAppStore();
  const [toastBadge, setToastBadge] = useState<typeof BADGE_DEFINITIONS[0] | null>(null);
  const [previousBadgeCount, setPreviousBadgeCount] = useState(progress.badges.length);

  useEffect(() => {
    // Detect new badge
    if (progress.badges.length > previousBadgeCount) {
      const newBadgeId = progress.badges[progress.badges.length - 1];
      const badgeDef = BADGE_DEFINITIONS.find(b => b.id === newBadgeId);
      
      if (badgeDef) {
        setToastBadge(badgeDef);
        
        // Auto-hide after 5 seconds
        const timer = setTimeout(() => {
          setToastBadge(null);
        }, 5000);
        
        return () => clearTimeout(timer);
      }
    }
    setPreviousBadgeCount(progress.badges.length);
  }, [progress.badges, previousBadgeCount]);

  if (!toastBadge) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="glass-card flex items-start gap-4 p-4 border-accent-amber shadow-glow-amber relative overflow-hidden max-w-sm">
        {/* Shine effect background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-accent-amber/20 to-transparent pointer-events-none" />
        
        <div className="w-12 h-12 shrink-0 rounded-full bg-accent-amber/10 flex items-center justify-center text-accent-amber animate-confetti">
          <Trophy size={24} />
        </div>
        
        <div className="flex-1 min-w-0 pr-6">
          <p className="text-xs font-bold text-accent-amber uppercase tracking-wider mb-1">Nouveau Badge Débloqué !</p>
          <h4 className="text-text-primary font-bold truncate">{toastBadge.name}</h4>
          <p className="text-text-secondary text-sm text-balance">{toastBadge.description}</p>
        </div>

        <button 
          onClick={() => setToastBadge(null)}
          className="absolute top-2 right-2 p-1 text-text-muted hover:text-text-primary transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
