'use client';

import { useState } from 'react';
import { Exercise, CodeCorrectionData } from '@/lib/types';
import { useAppStore } from '@/lib/store';
import { CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import CodeBlock from '../ui/CodeBlock';

export default function ExerciseCodeCorrection({ exercise }: { exercise: Exercise }) {
  const data = exercise.data as CodeCorrectionData;
  const { progress, completeExercise, addXP } = useAppStore();
  
  const [userCode, setUserCode] = useState(data.buggyCode);
  const [submitted, setSubmitted] = useState(false);
  const [hintsShown, setHintsShown] = useState(0);

  const isCompleted = progress.completedExercises.includes(exercise.id);

  // Normalize code for comparison (remove extra spaces, case insensitive for simplicity)
  const normalizeCode = (code: string) => code.replace(/\s+/g, ' ').trim().toLowerCase();
  
  const isCorrect = () => normalizeCode(userCode) === normalizeCode(data.correctCode);

  const handleSubmit = () => {
    if (submitted || isCompleted) return;
    
    const correct = isCorrect();
    setSubmitted(true);
    completeExercise(exercise.id, correct);
    
    if (correct) {
      addXP(exercise.xpReward - (hintsShown * 5)); // Penalty for using hints
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
            Correction de Bug
          </span>
          <span className="text-xs text-text-muted font-bold">
            Jusqu'à {exercise.xpReward} XP
          </span>
        </div>
        {isCompleted && (
          <div className="flex items-center gap-1.5 text-accent-green text-sm font-bold bg-accent-green/10 px-3 py-1 rounded-full">
            <CheckCircle2 size={16} /> Complété
          </div>
        )}
      </div>

      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <AlertTriangle className="text-accent-amber" />
        {exercise.question}
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div>
          <h4 className="text-sm text-text-muted mb-2 uppercase tracking-wider font-bold">Code Original (Bugué)</h4>
          <CodeBlock code={data.buggyCode} />
        </div>
        
        <div>
          <h4 className="text-sm text-text-muted mb-2 uppercase tracking-wider font-bold">Votre Correction</h4>
          <textarea
            value={isCompleted ? data.correctCode : userCode}
            onChange={(e) => setUserCode(e.target.value)}
            disabled={submitted || isCompleted}
            className={`w-full h-[120px] bg-primary border rounded-xl p-4 font-mono text-sm resize-none focus:outline-none transition-colors ${
              (submitted || isCompleted)
                ? (correct || isCompleted) ? 'border-accent-green text-accent-green' : 'border-accent-red text-accent-red'
                : 'border-default focus:border-accent-cyan'
            }`}
            spellCheck="false"
          />
        </div>
      </div>

      {/* Hints */}
      {!isCompleted && !submitted && hintsShown < data.hints.length && (
        <div className="mb-6 flex items-center justify-center">
          <button 
            onClick={() => setHintsShown(prev => prev + 1)}
            className="text-sm text-text-secondary hover:text-accent-amber transition-colors underline decoration-dotted underline-offset-4"
          >
            Besoin d'un indice ? (-5 XP)
          </button>
        </div>
      )}
      
      {hintsShown > 0 && (
        <div className="mb-6 space-y-2">
          {data.hints.slice(0, hintsShown).map((hint, i) => (
            <div key={i} className="text-sm bg-accent-amber/10 border border-accent-amber/30 text-accent-amber px-4 py-2 rounded-md flex items-center gap-2">
              <span>💡 Indice {i+1}:</span> {hint}
            </div>
          ))}
        </div>
      )}

      {/* Footer / Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {submitted || isCompleted ? (
          <div className="flex-1 bg-surface border border-default rounded-lg p-4 text-sm w-full">
            <div className="flex items-center gap-2 text-text-primary font-bold mb-2">
              <CheckCircle2 size={16} className="text-accent-green" /> 
              Solution attendue :
            </div>
            <pre className="font-mono text-xs bg-primary p-2 rounded mb-3">{data.correctCode}</pre>
            <span className="text-text-secondary">{data.explanation}</span>
          </div>
        ) : (
          <div className="flex-1" />
        )}

        {!(submitted || isCompleted) && (
          <button
            onClick={handleSubmit}
            className="py-3 px-8 rounded-lg font-bold bg-accent-cyan text-inverse hover:scale-105 shadow-glow-cyan transition-all w-full sm:w-auto flex-shrink-0"
          >
            Vérifier la correction
          </button>
        )}
        
        {submitted && !correct && !isCompleted && (
          <button
            onClick={() => setSubmitted(false)}
            className="py-2 px-6 rounded-lg font-bold text-sm bg-surface border border-default hover:bg-elevated transition-colors w-full sm:w-auto"
          >
            Réessayer
          </button>
        )}
      </div>
    </div>
  );
}
