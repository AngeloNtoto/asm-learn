'use client';

import { useState, useEffect, useRef } from 'react';
import { useAppStore } from '@/lib/store';
import { MODULES } from '@/lib/content/modules';
import { GLOSSARY_TERMS } from '@/lib/content/glossary';
import { CATEGORIES } from '@/lib/content/cheatsheet';
import { Search, BookOpen, Terminal, Book, ChevronRight } from 'lucide-react';
import Link from 'next/link';

type SearchResult = {
  id: string;
  title: string;
  subtitle?: string;
  type: 'lesson' | 'glossary' | 'instruction';
  href: string;
  icon: any;
};

export default function SearchModal() {
  const { searchOpen, setSearchOpen } = useAppStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(!searchOpen);
      }
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, setSearchOpen]);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
    }
  }, [searchOpen]);

  if (!searchOpen) return null;

  const results: SearchResult[] = [];
  const q = query.toLowerCase();

  if (q.length > 1) {
    // Search Lessons
    MODULES.forEach(mod => {
      mod.lessons.forEach(lesson => {
        if (lesson.title.toLowerCase().includes(q) || lesson.description.toLowerCase().includes(q)) {
          results.push({
            id: `lesson-${lesson.id}`,
            title: lesson.title,
            subtitle: `Module: ${mod.title}`,
            type: 'lesson',
            href: `/learn/${mod.id}/${lesson.id}`,
            icon: BookOpen
          });
        }
      });
    });

    // Search Glossary
    GLOSSARY_TERMS.forEach(term => {
      if (term.term.toLowerCase().includes(q) || term.definition.toLowerCase().includes(q)) {
        results.push({
          id: `gloss-${term.id}`,
          title: term.term,
          subtitle: 'Glossaire',
          type: 'glossary',
          href: '/glossary',
          icon: Book
        });
      }
    });

    // Search Instructions
    CATEGORIES.forEach(cat => {
      cat.instructions.forEach(inst => {
        if (inst.mnemonic.toLowerCase().includes(q) || inst.description.toLowerCase().includes(q)) {
          results.push({
            id: `inst-${inst.mnemonic}`,
            title: inst.syntax,
            subtitle: `Anti-sèche > ${cat.title}`,
            type: 'instruction',
            href: '/cheatsheet',
            icon: Terminal
          });
        }
      });
    });
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4 bg-background/80 backdrop-blur-sm animate-fade-in" onClick={() => setSearchOpen(false)}>
      <div 
        className="glass-card w-full max-w-2xl bg-surface border-default overflow-hidden flex flex-col shadow-2xl animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-4 border-b border-default bg-elevated">
          <Search size={20} className="text-accent-cyan shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Rechercher une leçon, un terme ou une instruction..."
            className="flex-1 bg-transparent border-none outline-none text-text-primary text-lg placeholder:text-text-muted"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 bg-surface border border-default rounded text-xs text-text-muted font-mono">
            ESC
          </kbd>
        </div>

        {query.length > 1 && (
          <div className="max-h-[60vh] overflow-y-auto custom-scrollbar p-2">
            {results.length > 0 ? (
              <div className="flex flex-col gap-1">
                {results.slice(0, 15).map(res => (
                  <Link
                    key={res.id}
                    href={res.href}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-elevated transition-colors group"
                  >
                    <div className="w-10 h-10 shrink-0 rounded-full bg-surface border border-default flex items-center justify-center text-text-secondary group-hover:border-accent-cyan group-hover:text-accent-cyan transition-colors">
                      <res.icon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-text-primary font-bold truncate group-hover:text-accent-cyan transition-colors">{res.title}</h4>
                      <p className="text-xs text-text-muted truncate">{res.subtitle}</p>
                    </div>
                    <ChevronRight size={18} className="text-text-muted opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-text-muted">
                Aucun résultat trouvé pour "{query}"
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
