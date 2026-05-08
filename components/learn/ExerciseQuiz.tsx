'use client';

import { useState } from 'react';
import { Exercise, QuizData } from '@/lib/types';
import { useAppStore } from '@/lib/store';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function ExerciseQuiz({ exercise }: { exercise: Exercise }) {
  const data = exercise.data as QuizData;
  const { progress, completeExercise, addXP } = useAppStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Check if previously completed
  const isCompleted = progress.completedExercises.includes(exercise.id);
  const result = progress.exerciseResults[exercise.id];

  const handleSubmit = () => {
    if (!selectedId || submitted || isCompleted) return;
    
    const isCorrect = selectedId === data.correctId;
    setSubmitted(true);
    completeExercise(exercise.id, isCorrect);
    
    if (isCorrect) {
      addXP(exercise.xpReward);
    }
  };

  const isCorrect = selectedId === data.correctId;

  return (
    <div className={`glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden transition-all duration-500 ${
      (submitted || isCompleted) && (selectedId === data.correctId || isCompleted) 
        ? 'border-accent-green shadow-glow-green' 
        : submitted && !isCorrect 
          ? 'border-accent-red animate-shake' 
          : 'border-accent-cyan/30 hover:border-accent-cyan'
    }`}>
      
      {/* Background Icon */}
      <div className="absolute -right-8 -top-8 text-[120px] opacity-5 pointer-events-none">
        ?
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-accent-cyan bg-accent-cyan/10 px-2 py-1 rounded">
            Quiz
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

      <div className="space-y-3 mb-8">
        {data.choices.map((choice) => {
          const isSelected = selectedId === choice.id;
          const showCorrect = (submitted || isCompleted) && choice.id === data.correctId;
          const showIncorrect = submitted && isSelected && choice.id !== data.correctId;

          let btnClass = 'exercise-option w-full text-left flex justify-between items-center';
          if (showCorrect) btnClass += ' correct';
          else if (showIncorrect) btnClass += ' incorrect';
          else if (isSelected) btnClass += ' selected';

          return (
            <button
              key={choice.id}
              className={btnClass}
              onClick={() => !submitted && !isCompleted && setSelectedId(choice.id)}
              disabled={submitted || isCompleted}
            >
              <span>{choice.text}</span>
              {showCorrect && <CheckCircle2 className="text-accent-green" size={20} />}
              {showIncorrect && <XCircle className="text-accent-red" size={20} />}
            </button>
          );
        })}
      </div>

      {/* Footer / Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
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
            disabled={!selectedId}
            className={`py-3 px-8 rounded-lg font-bold transition-all w-full sm:w-auto ${
              selectedId 
                ? 'bg-accent-cyan text-inverse hover:scale-105 shadow-glow-cyan' 
                : 'bg-surface text-text-muted border border-default cursor-not-allowed'
            }`}
          >
            Valider
          </button>
        )}
        
        {submitted && !isCorrect && !isCompleted && (
          <button
            onClick={() => { setSubmitted(false); setSelectedId(null); }}
            className="py-2 px-6 rounded-lg font-bold text-sm bg-surface border border-default hover:bg-elevated transition-colors w-full sm:w-auto"
          >
            Réessayer
          </button>
        )}
      </div>
    </div>
  );
}
