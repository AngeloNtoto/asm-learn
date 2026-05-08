'use client';

import { useState } from 'react';
import { Exercise, TranslationData } from '@/lib/types';
import { useAppStore } from '@/lib/store';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import CodeBlock from '../ui/CodeBlock';

export default function ExerciseTranslation({ exercise }: { exercise: Exercise }) {
  const data = exercise.data as TranslationData;
  const { progress, completeExercise, addXP } = useAppStore();
  
  const [userCode, setUserCode] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isCompleted = progress.completedExercises.includes(exercise.id);

  // Normalize code for comparison
  const normalizeCode = (code: string) => code.replace(/\s+/g, ' ').trim().toLowerCase();
  
  const isCorrect = () => {
    const normUser = normalizeCode(userCode);
    if (normUser === normalizeCode(data.correctTranslation)) return true;
    if (data.acceptableVariations?.some(v => normalizeCode(v) === normUser)) return true;
    return false;
  };

  const handleSubmit = () => {
    if (submitted || isCompleted) return;
    
    const correct = isCorrect();
    setSubmitted(true);
    completeExercise(exercise.id, correct);
    
    if (correct) {
      addXP(exercise.xpReward);
    }
  };

  const correct = isCorrect();

  return (
    <div className={`glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden transition-all duration-500 ${
      (submitted || isCompleted) && (correct || isCompleted) 
        ? 'border-accent-green shadow-glow-green' 
        : submitted && !correct 
          ? 'border-accent-red animate-shake' 
          : 'border-accent-cyan/30 hover:border-accent-cyan'
    }`}>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-accent-cyan bg-accent-cyan/10 px-2 py-1 rounded">
            Traduction
          </span>
          <span className="text-xs text-text-muted font-bold">
            {exercise.xpReward} XP
          </span>
        </div>
        {isCompleted && (
          <div className="flex items-center gap-1.5 text-accent-green text-sm font-bold bg-accent-green/10 px-3 py-1 rounded-full">
            <CheckCircle2 size={16} /> Complété
          </div>
        )}
      </div>

      <h3 className="text-xl font-bold mb-6">{exercise.question}</h3>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center mb-8">
        <div className="w-full">
          <div className="text-xs font-bold text-text-muted mb-2 uppercase text-center">
            Source ({data.sourceLanguage})
          </div>
          <CodeBlock code={data.sourceCode} language={data.sourceLanguage} />
        </div>
        
        <div className="flex justify-center rotate-90 md:rotate-0 text-text-muted">
          <ArrowRight size={24} />
        </div>
        
        <div className="w-full">
          <div className="text-xs font-bold text-accent-cyan mb-2 uppercase text-center">
            Cible ({data.targetLanguage})
          </div>
          <textarea
            value={isCompleted ? data.correctTranslation : userCode}
            onChange={(e) => setUserCode(e.target.value)}
            disabled={submitted || isCompleted}
            placeholder={`Traduisez en ${data.targetLanguage}...`}
            className={`w-full h-[100px] bg-primary border rounded-xl p-4 font-mono text-sm resize-none focus:outline-none transition-colors ${
              (submitted || isCompleted)
                ? (correct || isCompleted) ? 'border-accent-green text-accent-green' : 'border-accent-red text-accent-red'
                : 'border-default focus:border-accent-cyan'
            }`}
            spellCheck="false"
          />
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {submitted || isCompleted ? (
          <div className="flex-1 bg-surface border border-default rounded-lg p-4 text-sm w-full">
            <strong className="text-text-primary block mb-1">Explication :</strong>
            <span className="text-text-secondary">{data.explanation}</span>
          </div>
        ) : (
          <div className="flex-1" />
        )}

        {!(submitted || isCompleted) && (
          <button
            onClick={handleSubmit}
            disabled={!userCode.trim()}
            className={`py-3 px-8 rounded-lg font-bold transition-all w-full sm:w-auto flex-shrink-0 ${
              userCode.trim() 
                ? 'bg-accent-cyan text-inverse hover:scale-105 shadow-glow-cyan' 
                : 'bg-surface text-text-muted border border-default cursor-not-allowed'
            }`}
          >
            Valider la traduction
          </button>
        )}
        
        {submitted && !correct && !isCompleted && (
          <button
            onClick={() => setSubmitted(false)}
            className="py-2 px-6 rounded-lg font-bold text-sm bg-surface border border-default hover:bg-elevated transition-colors w-full sm:w-auto flex-shrink-0"
          >
            Réessayer
          </button>
        )}
      </div>
    </div>
  );
}
