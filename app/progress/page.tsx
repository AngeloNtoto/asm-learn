'use client';

import { useAppStore, BADGE_DEFINITIONS } from '@/lib/store';
import { getXPProgress, getLevelFromXP } from '@/lib/utils';
import { EXERCISES } from '@/lib/content/exercises';
import { Trophy, Target, Zap, BrainCircuit, AlertTriangle } from 'lucide-react';

export default function ProgressPage() {
  const { progress } = useAppStore();
  const { current, max, percentage } = getXPProgress(progress.xp);
  const currentLevel = getLevelFromXP(progress.xp);

  const accuracy = progress.totalAttempts > 0 
    ? Math.round((progress.totalCorrect / progress.totalAttempts) * 100) 
    : 0;

  return (
    <div className="space-y-8 animate-slide-up">
      <div>
        <h1 className="text-3xl font-bold mb-2">Votre Progression</h1>
        <p className="text-text-secondary">Suivez vos statistiques et vos succès dans l'apprentissage de l'assembleur.</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-accent-cyan/10 text-accent-cyan flex items-center justify-center mb-4">
            <Trophy size={32} />
          </div>
          <h3 className="text-text-muted text-sm uppercase tracking-wider font-bold mb-1">Niveau Actuel</h3>
          <div className="text-3xl font-bold">{currentLevel.level}</div>
          <div className="text-accent-cyan text-sm">{currentLevel.title}</div>
        </div>

        <div className="glass-card p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-accent-amber/10 text-accent-amber flex items-center justify-center mb-4">
            <Zap size={32} />
          </div>
          <h3 className="text-text-muted text-sm uppercase tracking-wider font-bold mb-1">Expérience Totale</h3>
          <div className="text-3xl font-bold">{progress.xp} XP</div>
          <div className="w-full mt-4">
            <div className="flex justify-between text-xs text-text-secondary mb-1">
              <span>{current} / {max} jusqu'au Niv {currentLevel.level + 1}</span>
              <span>{percentage}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill bg-accent-amber" style={{ width: `${percentage}%` }} />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-accent-green/10 text-accent-green flex items-center justify-center mb-4">
            <Target size={32} />
          </div>
          <h3 className="text-text-muted text-sm uppercase tracking-wider font-bold mb-1">Précision</h3>
          <div className="text-3xl font-bold">{accuracy}%</div>
          <div className="text-text-secondary text-sm mt-1">{progress.totalCorrect} / {progress.totalAttempts} corrects</div>
        </div>

        <div className="glass-card p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-accent-purple/10 text-accent-purple flex items-center justify-center mb-4">
            <BrainCircuit size={32} />
          </div>
          <h3 className="text-text-muted text-sm uppercase tracking-wider font-bold mb-1">Leçons Complétées</h3>
          <div className="text-3xl font-bold">{progress.completedLessons.length}</div>
          <div className="text-text-secondary text-sm mt-1">Et {progress.completedExercises.length} exercices</div>
        </div>
      </div>

      {/* Error Tracking Dashboard */}
      <section>
        <h2 className="text-2xl font-bold mb-6 border-b border-default pb-4 flex items-center gap-2">
          <AlertTriangle className="text-accent-amber" />
          Concepts à Réviser
        </h2>
        {Object.keys(progress.exerciseResults).length === 0 ? (
          <div className="glass-card p-6 text-center text-text-muted">
            Faites quelques exercices pour voir vos statistiques de réussite ici.
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(progress.exerciseResults)
              .filter(([_, result]) => !result.correct || result.attempts > 1)
              .sort((a, b) => b[1].attempts - a[1].attempts)
              .slice(0, 5) // Show top 5 worst
              .map(([exId, result]) => {
                const ex = EXERCISES.find(e => e.id === exId);
                if (!ex) return null;
                return (
                  <div key={exId} className="glass-card p-4 flex items-center justify-between border-l-4 border-accent-amber">
                    <div>
                      <div className="font-bold mb-1">{ex.question}</div>
                      <div className="text-sm text-text-secondary">
                        Type: {ex.type} | Tentatives: {result.attempts} | Statut: {result.correct ? 'Fini par réussir' : 'Toujours en échec'}
                      </div>
                    </div>
                  </div>
                );
            })}
            {Object.values(progress.exerciseResults).every(r => r.correct && r.attempts === 1) && (
              <div className="glass-card p-6 text-center text-accent-green font-bold border-accent-green">
                Tout est parfait ! Vous n'avez fait aucune erreur jusqu'à présent.
              </div>
            )}
          </div>
        )}
      </section>

      {/* Badges Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 border-b border-default pb-4">Collection de Badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {BADGE_DEFINITIONS.map(badge => {
            const isUnlocked = progress.badges.includes(badge.id);
            return (
              <div 
                key={badge.id}
                className={`flex flex-col items-center text-center p-6 rounded-xl border transition-all ${
                  isUnlocked 
                    ? 'bg-surface border-accent-cyan shadow-glow-cyan badge-shine' 
                    : 'bg-primary border-default opacity-50 grayscale'
                }`}
              >
                <div className="text-5xl mb-4">{badge.icon}</div>
                <h4 className="font-bold mb-1 leading-tight">{badge.name}</h4>
                <p className="text-xs text-text-muted">{badge.description}</p>
                {!isUnlocked && (
                  <div className="mt-3 text-[10px] uppercase text-text-secondary font-mono tracking-wider">
                    {badge.condition}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
