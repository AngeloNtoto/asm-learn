'use client';

import { useState, useMemo } from 'react';
import { useAppStore } from '@/lib/store';
import { FLASHCARDS } from '@/lib/content/flashcards';
import { Layers, RotateCw, CheckCircle2, XCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function FlashcardsPage() {
  const { progress, reviewFlashcard } = useAppStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Determine which cards are due today
  const dueCards = useMemo(() => {
    const now = new Date();
    return FLASHCARDS.filter(card => {
      const p = progress.flashcardProgress[card.id];
      if (!p) return true; // Never reviewed = due
      const nextDate = new Date(p.nextReviewDate);
      return nextDate <= now;
    });
  }, [progress.flashcardProgress]);

  const currentCard = dueCards[currentIndex];

  const handleReview = (performance: 'again' | 'hard' | 'good' | 'easy') => {
    if (!currentCard) return;
    reviewFlashcard(currentCard.id, performance);
    setIsFlipped(false);
    // Move to next card
    if (currentIndex < dueCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Refresh the list implicitly
      setCurrentIndex(0);
    }
  };

  return (
    <div className="space-y-8 animate-slide-up pb-12 max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Layers className="text-accent-cyan" />
            Révisions Spacées
          </h1>
          <p className="text-text-secondary">Révisez intelligemment avec l'algorithme de Leitner.</p>
        </div>
        <div className="bg-surface border border-default px-4 py-2 rounded-lg text-center">
          <div className="text-2xl font-bold text-accent-cyan">{dueCards.length}</div>
          <div className="text-xs uppercase text-text-muted">À réviser</div>
        </div>
      </div>

      {!currentCard && dueCards.length === 0 ? (
        <div className="glass-card p-12 text-center flex flex-col items-center">
          <CheckCircle2 size={64} className="text-accent-green mb-4" />
          <h2 className="text-2xl font-bold mb-2">Tout est à jour !</h2>
          <p className="text-text-secondary mb-6">Vous avez révisé toutes vos cartes pour aujourd'hui.</p>
          <Link href="/" className="bg-surface hover:bg-elevated border border-default px-6 py-2 rounded-lg transition-colors flex items-center gap-2">
            <ChevronLeft size={16} /> Retour au tableau de bord
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-12">
          {/* Progress Indicator */}
          <div className="w-full max-w-xl mb-6">
            <div className="flex justify-between text-xs text-text-muted mb-2">
              <span>Carte {currentIndex + 1} sur {dueCards.length}</span>
            </div>
            <div className="progress-bar bg-surface border border-default h-2">
              <div 
                className="h-full bg-accent-cyan transition-all"
                style={{ width: `${((currentIndex) / dueCards.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Flashcard */}
          <div 
            className="w-full max-w-xl aspect-[4/3] sm:aspect-video perspective-1000 mb-8 cursor-pointer"
            onClick={() => !isFlipped && setIsFlipped(true)}
          >
            <div className={`w-full h-full relative transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
              
              {/* Front */}
              <div className="absolute inset-0 backface-hidden glass-card rounded-2xl border-2 border-accent-cyan/30 flex flex-col items-center justify-center p-8 text-center hover:border-accent-cyan shadow-lg">
                <div className="absolute top-4 right-4 text-accent-cyan opacity-50">
                  <RotateCw size={24} />
                </div>
                <h3 className="text-2xl font-bold text-text-primary leading-relaxed">
                  {currentCard?.front}
                </h3>
                <p className="absolute bottom-4 text-xs text-text-muted uppercase tracking-wider">
                  Cliquez pour révéler la réponse
                </p>
              </div>

              {/* Back */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 glass-card rounded-2xl border-2 border-accent-green shadow-glow-green flex flex-col items-center justify-center p-8 text-center">
                <h3 className="text-xl font-bold text-accent-green mb-6">Réponse :</h3>
                <p className="text-lg text-text-primary leading-relaxed whitespace-pre-wrap">
                  {currentCard?.back}
                </p>
              </div>

            </div>
          </div>

          {/* Actions */}
          <div className={`w-full max-w-xl grid grid-cols-2 sm:grid-cols-4 gap-2 transition-all duration-300 ${isFlipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            <button 
              onClick={(e) => { e.stopPropagation(); handleReview('again'); }}
              className="flex flex-col items-center p-3 bg-surface hover:bg-accent-red/20 border border-default hover:border-accent-red rounded-lg transition-colors group"
            >
              <span className="text-accent-red font-bold group-hover:scale-110 transition-transform">À revoir</span>
              <span className="text-[10px] text-text-muted mt-1">&lt; 10 min</span>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); handleReview('hard'); }}
              className="flex flex-col items-center p-3 bg-surface hover:bg-accent-amber/20 border border-default hover:border-accent-amber rounded-lg transition-colors group"
            >
              <span className="text-accent-amber font-bold group-hover:scale-110 transition-transform">Difficile</span>
              <span className="text-[10px] text-text-muted mt-1">~1 j</span>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); handleReview('good'); }}
              className="flex flex-col items-center p-3 bg-surface hover:bg-accent-green/20 border border-default hover:border-accent-green rounded-lg transition-colors group"
            >
              <span className="text-accent-green font-bold group-hover:scale-110 transition-transform">Correct</span>
              <span className="text-[10px] text-text-muted mt-1">~3-7 j</span>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); handleReview('easy'); }}
              className="flex flex-col items-center p-3 bg-surface hover:bg-accent-cyan/20 border border-default hover:border-accent-cyan rounded-lg transition-colors group"
            >
              <span className="text-accent-cyan font-bold group-hover:scale-110 transition-transform">Facile</span>
              <span className="text-[10px] text-text-muted mt-1">&gt; 14 j</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
