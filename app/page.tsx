'use client';

import { useAppStore, BADGE_DEFINITIONS } from '@/lib/store';
import { MODULES } from '@/lib/content/modules';
import { calculateModuleProgress } from '@/lib/utils';
import Link from 'next/link';
import { Play, CheckCircle2, CircleDashed } from 'lucide-react';

export default function Dashboard() {
  const { progress } = useAppStore();

  // Find the next lesson to continue
  let nextModuleId = MODULES[0].id;
  let nextLessonId = MODULES[0].lessons[0].id;
  
  // Basic logic to find first incomplete lesson
  for (const mod of MODULES) {
    const incompleteLesson = mod.lessons.find(l => !progress.completedLessons.includes(l.id));
    if (incompleteLesson) {
      nextModuleId = mod.id;
      nextLessonId = incompleteLesson.id;
      break;
    }
  }

  return (
    <div className="space-y-10 animate-slide-up">
      {/* Hero Section */}
      <section className="glass-card p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-cyan/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Bienvenue sur <span className="bg-clip-text text-transparent bg-gradient-cyan">McuScript ASM</span>
          </h1>
          <p className="text-text-secondary max-w-2xl text-lg mb-8">
            Plongez au cœur de la machine. Apprenez l'assembleur de manière interactive pour comprendre comment fonctionne réellement votre code et préparer la création de votre propre compilateur.
          </p>
          <Link 
            href={`/learn/${nextModuleId}/${nextLessonId}`}
            className="inline-flex items-center gap-2 bg-accent-cyan hover:bg-accent-cyan-dim text-inverse font-bold py-3 px-6 rounded-lg transition-all hover:scale-105 shadow-glow-cyan"
          >
            <Play fill="currentColor" size={20} />
            {progress.completedLessons.length === 0 ? 'Commencer l\'Aventure' : 'Continuer l\'Apprentissage'}
          </Link>
        </div>
      </section>

      {/* Modules Grid */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          Parcours de Formation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES.map((mod, index) => {
            const modProgress = calculateModuleProgress(mod.id, mod.lessons.length, progress.completedLessons);
            const isCompleted = modProgress === 100;
            const isLocked = index > 0 && calculateModuleProgress(MODULES[index - 1].id, MODULES[index - 1].lessons.length, progress.completedLessons) === 0;

            return (
              <div 
                key={mod.id} 
                className={`module-card flex flex-col h-full ${isLocked ? 'opacity-50 grayscale pointer-events-none' : ''}`}
                style={{ '--border-hover': `var(--${mod.color})` } as any}
              >
                {/* Colored Top Border Indicator */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1" 
                  style={{ backgroundColor: `var(--${mod.color})` }} 
                />

                <div className="flex justify-between items-start mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center bg-surface border border-default shadow-sm"
                    style={{ color: `var(--${mod.color})` }}
                  >
                    <span className="text-xl font-bold">{index + 1}</span>
                  </div>
                  {isCompleted ? (
                    <CheckCircle2 className="text-accent-green" size={24} />
                  ) : (
                    <CircleDashed className="text-text-muted" size={24} />
                  )}
                </div>

                <h3 className="text-xl font-bold mb-2">{mod.title}</h3>
                <p className="text-text-secondary text-sm flex-1 mb-6">{mod.description}</p>

                <div className="mt-auto space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">{mod.lessons.length} Leçons</span>
                    <span className="font-bold" style={{ color: `var(--${mod.color})` }}>{modProgress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-bar-fill" 
                      style={{ 
                        width: `${modProgress}%`,
                        backgroundColor: `var(--${mod.color})` 
                      }} 
                    />
                  </div>
                  <Link 
                    href={`/learn/${mod.id}/${mod.lessons[0].id}`}
                    className="block w-full text-center py-2.5 rounded-md bg-surface hover:bg-elevated border border-default transition-colors text-sm font-bold"
                  >
                    {isCompleted ? 'Réviser' : modProgress > 0 ? 'Continuer' : 'Commencer'}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      
      {/* Recent Badges Snippet */}
      {progress.badges.length > 0 && (
        <section className="bg-surface border border-default rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Derniers Badges Obtenus</h2>
            <Link href="/progress" className="text-accent-cyan text-sm hover:underline">Voir tout</Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
            {progress.badges.slice(-4).reverse().map(badgeId => {
              const badge = BADGE_DEFINITIONS.find(b => b.id === badgeId);
              if (!badge) return null;
              return (
                <div key={badgeId} className="flex flex-col items-center min-w-[100px] p-4 bg-elevated rounded-lg border border-default badge-shine">
                  <span className="text-4xl mb-2">{badge.icon}</span>
                  <span className="text-sm font-bold text-center leading-tight">{badge.name}</span>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
