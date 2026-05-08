'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Library, Code2, StickyNote, Trash2 } from 'lucide-react';
import CodeBlock from '@/components/ui/CodeBlock';
import Link from 'next/link';

export default function LibraryPage() {
  const { progress, deleteSnippet } = useAppStore();
  const snippets = progress.snippets || [];
  const notes = progress.notes || [];
  const [activeTab, setActiveTab] = useState<'snippets' | 'notes'>('snippets');

  return (
    <div className="space-y-8 animate-slide-up pb-12">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Library className="text-accent-cyan" />
          Ma Bibliothèque
        </h1>
        <p className="text-text-secondary">Vos bouts de code sauvegardés et vos notes personnelles.</p>
      </div>

      <div className="flex gap-4 border-b border-default pb-4">
        <button 
          onClick={() => setActiveTab('snippets')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${activeTab === 'snippets' ? 'bg-accent-cyan text-inverse' : 'bg-surface text-text-muted hover:text-text-primary'}`}
        >
          <Code2 size={18} /> Snippets ({snippets.length})
        </button>
        <button 
          onClick={() => setActiveTab('notes')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${activeTab === 'notes' ? 'bg-accent-purple text-inverse' : 'bg-surface text-text-muted hover:text-text-primary'}`}
        >
          <StickyNote size={18} /> Notes ({notes.length})
        </button>
      </div>

      {activeTab === 'snippets' && (
        <div className="space-y-6">
          {snippets.length === 0 ? (
            <div className="text-center py-12 text-text-muted">
              Aucun snippet sauvegardé. Vous pouvez sauvegarder des blocs de code depuis les leçons.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {snippets.map(snippet => {
                const moduleStr = snippet.lessonId.split('-')[0];
                return (
                  <div key={snippet.id} className="glass-card p-5 border-default relative group">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-xs uppercase text-accent-cyan font-bold bg-accent-cyan/10 px-2 py-1 rounded">
                        {moduleStr}
                      </div>
                      <button 
                        onClick={() => deleteSnippet(snippet.id)}
                        className="text-text-muted hover:text-accent-red transition-colors opacity-0 group-hover:opacity-100"
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    {snippet.title && <h3 className="font-bold mb-2">{snippet.title}</h3>}
                    {/* Reusing CodeBlock but without the save button to avoid nesting loops */}
                    <div className="pointer-events-none">
                      <CodeBlock code={snippet.code} language={snippet.language} hideSave />
                    </div>
                    <div className="mt-4 flex justify-between items-center text-xs text-text-muted">
                      <span>Sauvegardé le {new Date(snippet.dateAdded).toLocaleDateString()}</span>
                      <Link href={`/learn/${moduleStr}/${snippet.lessonId}`} className="text-accent-cyan hover:underline pointer-events-auto">
                        Aller à la leçon
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'notes' && (
        <div className="space-y-6">
          {notes.length === 0 ? (
            <div className="text-center py-12 text-text-muted">
              Aucune note sauvegardée.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map(note => {
                const moduleStr = note.lessonId.split('-')[0];
                return (
                  <div key={note.id} className="glass-card p-5 border-default">
                    <div className="text-xs uppercase text-accent-purple font-bold mb-3 flex justify-between">
                      <span>{note.lessonId}</span>
                      <Link href={`/learn/${moduleStr}/${note.lessonId}`} className="text-text-muted hover:text-text-primary">
                        Voir
                      </Link>
                    </div>
                    <p className="text-sm text-text-primary whitespace-pre-wrap leading-relaxed">
                      {note.content}
                    </p>
                    <div className="mt-4 pt-4 border-t border-default text-xs text-text-muted">
                      Modifié le {new Date(note.lastEdited).toLocaleDateString()}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
