'use client';

import { useAppStore } from '@/lib/store';
import { MODULES } from '@/lib/content/modules';
import { EXERCISES } from '@/lib/content/exercises';
import { notFound, useRouter } from 'next/navigation';
import { useState, useEffect, use } from 'react';
import { CheckCircle2, ChevronRight, ChevronLeft, Award } from 'lucide-react';
import Link from 'next/link';
import CodeBlock from '@/components/ui/CodeBlock';
import ExerciseQuiz from '@/components/learn/ExerciseQuiz';
import ExerciseFillBlank from '@/components/learn/ExerciseFillBlank';
import ExerciseCodeCorrection from '@/components/learn/ExerciseCodeCorrection';
import ExerciseTranslation from '@/components/learn/ExerciseTranslation';
import ExerciseDragDrop from '@/components/learn/ExerciseDragDrop';
import ExerciseLab from '@/components/learn/ExerciseLab';
import NoteTaker from '@/components/learn/NoteTaker';

export default function LessonPage({
  params
}: {
  params: Promise<{ moduleId: string; lessonId: string }>
}) {
  const unwrappedParams = use(params);
  const router = useRouter();
  const { progress, completeLesson, addXP } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const module = MODULES.find(m => m.id === unwrappedParams.moduleId);
  if (!module) return notFound();

  const lessonIndex = module.lessons.findIndex(l => l.id === unwrappedParams.lessonId);
  if (lessonIndex === -1) return notFound();

  const lesson = module.lessons[lessonIndex];
  
  // Find related exercises
  const lessonExercises = lesson.exercises
    .map(exId => EXERCISES.find(e => e.id === exId))
    .filter(Boolean) as typeof EXERCISES;

  const isCompleted = progress.completedLessons.includes(lesson.id);

  // Navigation
  const prevLesson = lessonIndex > 0 ? module.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < module.lessons.length - 1 ? module.lessons[lessonIndex + 1] : null;
  
  // If last lesson in module, find next module
  const moduleIndex = MODULES.findIndex(m => m.id === unwrappedParams.moduleId);
  const nextModule = !nextLesson && moduleIndex < MODULES.length - 1 ? MODULES[moduleIndex + 1] : null;

  const handleComplete = () => {
    if (!isCompleted) {
      completeLesson(lesson.id);
      addXP(10); // Reward for reading lesson
      setShowCompletion(true);
      
      // Auto-hide completion message after 3 seconds
      setTimeout(() => setShowCompletion(false), 3000);
    }
  };

  if (!mounted) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20 animate-slide-up">
      {/* Lesson Header */}
      <div className="border-b border-default pb-6">
        <div className="flex items-center gap-2 text-sm font-bold mb-3" style={{ color: `var(--${module.color})` }}>
          <span className="uppercase tracking-wider">{module.title}</span>
          <ChevronRight size={14} />
          <span>Leçon {lesson.order}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{lesson.title}</h1>
        <p className="text-xl text-text-secondary">{lesson.description}</p>
      </div>

      {/* Lesson Content */}
      <div className="prose prose-invert max-w-none space-y-8">
        
        {/* Simple Explanation */}
        <div className="text-lg leading-relaxed">
          {lesson.content.simpleExplanation}
        </div>

        {/* Deep Explanation */}
        <div className="bg-surface border border-default rounded-xl p-6 leading-relaxed">
          {lesson.content.deepExplanation.split('\n').map((para, i) => (
            <p key={i} className="mb-4 last:mb-0">{para}</p>
          ))}
        </div>

        {/* Code Example */}
        {lesson.content.example && (
          <div className="my-8">
            <h3 className="text-lg font-bold mb-3">{lesson.content.example.title}</h3>
            <CodeBlock 
              code={lesson.content.example.code} 
              language={lesson.content.example.language} 
            />
            <p className="mt-3 text-sm text-text-secondary italic">
              {lesson.content.example.explanation}
            </p>
          </div>
        )}

        {/* Info Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
          {lesson.content.commonMistake && (
            <div className="info-block mistake m-0">
              <h4 className="font-bold flex items-center gap-2 mb-2">
                <span className="text-xl">⚠️</span> {lesson.content.commonMistake.title}
              </h4>
              <p className="text-sm m-0">{lesson.content.commonMistake.content}</p>
            </div>
          )}
          
          {lesson.content.practicalTip && (
            <div className="info-block tip m-0">
              <h4 className="font-bold flex items-center gap-2 mb-2">
                <span className="text-xl">💡</span> {lesson.content.practicalTip.title}
              </h4>
              <p className="text-sm m-0">{lesson.content.practicalTip.content}</p>
            </div>
          )}
        </div>

        {/* McuScript Link & Machine Thinking */}
        <div className="space-y-4">
          {lesson.content.mcuscriptLink && (
            <div className="info-block mcuscript">
              <h4 className="font-bold text-accent-purple mb-2">🚀 Lien avec McuScript</h4>
              <p className="text-sm">{lesson.content.mcuscriptLink}</p>
            </div>
          )}
          
          {lesson.content.thinkLikeMachine && (
            <div className="info-block machine">
              <h4 className="font-bold text-accent-cyan mb-2">🤖 Penser comme la machine</h4>
              <p className="text-sm italic">"{lesson.content.thinkLikeMachine}"</p>
            </div>
          )}
        </div>
      </div>

      {/* Exercises Section */}
      {lessonExercises.length > 0 && (
        <div className="mt-12 pt-8 border-t border-default">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            À vous de jouer ! <span className="text-accent-amber">⚡</span>
          </h2>
          <div className="space-y-8">
            {lessonExercises.map(exercise => {
              // Render appropriate exercise component based on type
              if (exercise.type === 'quiz') return <ExerciseQuiz key={exercise.id} exercise={exercise} />;
              if (exercise.type === 'fill-blank') return <ExerciseFillBlank key={exercise.id} exercise={exercise} />;
              if (exercise.type === 'code-correction') return <ExerciseCodeCorrection key={exercise.id} exercise={exercise} />;
              if (exercise.type === 'translation') return <ExerciseTranslation key={exercise.id} exercise={exercise} />;
              if (exercise.type === 'drag-drop') return <ExerciseDragDrop key={exercise.id} exercise={exercise} />;
              if (exercise.type === 'interactive-lab') return <ExerciseLab key={exercise.id} exercise={exercise} />;
              
              // Fallback for not-yet-implemented exercises
              return (
                <div key={exercise.id} className="glass-card p-6 border-accent-amber/50">
                  <h3 className="font-bold text-accent-amber mb-2">Exercice en cours de construction</h3>
                  <p className="text-sm text-text-secondary">Type: {exercise.type}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Completion & Navigation Footer */}
      <div className="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-default">
        {prevLesson ? (
          <Link 
            href={`/learn/${module.id}/${prevLesson.id}`}
            className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-surface text-text-secondary hover:text-text-primary transition-colors"
          >
            <ChevronLeft size={20} />
            <span>Précédent</span>
          </Link>
        ) : <div />}

        {!isCompleted ? (
          <button 
            onClick={handleComplete}
            className="flex items-center gap-2 bg-accent-green text-inverse font-bold py-3 px-8 rounded-full shadow-glow-green hover:scale-105 transition-all"
          >
            <CheckCircle2 size={20} />
            Marquer comme terminé (+10 XP)
          </button>
        ) : (
          <div className="flex items-center gap-2 text-accent-green font-bold bg-accent-green/10 px-6 py-2 rounded-full border border-accent-green">
            <CheckCircle2 size={20} />
            Leçon complétée
          </div>
        )}

        {nextLesson ? (
          <Link 
            href={`/learn/${module.id}/${nextLesson.id}`}
            className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-surface text-text-secondary hover:text-text-primary transition-colors group"
          >
            <span>Suivant</span>
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : nextModule ? (
          <Link 
            href={`/learn/${nextModule.id}/${nextModule.lessons[0].id}`}
            className="flex items-center gap-2 px-6 py-2 rounded-md bg-accent-cyan text-inverse font-bold shadow-glow-cyan hover:scale-105 transition-all"
          >
            <span>Module Suivant</span>
            <ChevronRight size={20} />
          </Link>
        ) : (
          <Link href="/progress" className="flex items-center gap-2 px-6 py-2 rounded-md bg-accent-purple text-inverse font-bold shadow-glow-cyan hover:scale-105 transition-all">
            <Award size={20} />
            Voir ma progression
          </Link>
        )}
      </div>

      {/* Completion Toast Notification */}
      {showCompletion && (
        <div className="fixed bottom-8 right-8 bg-accent-green text-inverse font-bold px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 animate-slide-up z-50">
          <div className="animate-confetti">🎉</div>
          <div>
            <div className="text-lg">Leçon terminée !</div>
            <div className="text-sm font-normal opacity-90">+10 XP</div>
          </div>
        </div>
      )}
      {/* Note Taker FAB */}
      <NoteTaker lessonId={lesson.id} />
    </div>
  );
}
