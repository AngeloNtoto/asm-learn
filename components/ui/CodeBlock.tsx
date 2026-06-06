import { FileCode2, BookmarkPlus, Check } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { highlightASM } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
language?: 'asm' | 'pseudo' | 'ir' | 'cpp' | 'llvm' | 'c' | 'ascii' | 'js';
  hideSave?: boolean;
}

export default function CodeBlock({ code, language = 'asm', hideSave = false }: CodeBlockProps) {
  const { saveSnippet, progress } = useAppStore();
  const [saved, setSaved] = useState(false);
  const pathname = usePathname();
  
  // Extract lesson ID from pathname if possible
  const pathParts = pathname.split('/');
  const lessonId = pathParts[pathParts.length - 1] || 'general';

  const snippets = progress.snippets || [];
  const isAlreadySaved = snippets.some(s => s.code === code);

  const handleSave = () => {
    if (saved || isAlreadySaved) return;
    saveSnippet({
      code,
      language,
      lessonId,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  // Simple rendering logic depending on language
  const renderCode = () => {
    if (language === 'asm') {
      return <div dangerouslySetInnerHTML={{ __html: highlightASM(code) }} />;
    }
    return <div>{code}</div>;
  };

  return (
    <div className="rounded-xl overflow-hidden border border-default shadow-sm bg-primary my-4">
      <div className="bg-surface px-4 py-2 border-b border-default flex items-center justify-between text-xs text-text-muted">
        <div className="flex items-center gap-2 uppercase tracking-wider font-bold">
          <FileCode2 size={14} />
          <span>{language === 'cpp' ? 'c++' : language}</span>
        </div>
        <div className="flex items-center gap-4">
          {!hideSave && (
            <button 
              onClick={handleSave}
              disabled={isAlreadySaved}
              className={`flex items-center gap-1.5 transition-colors ${saved || isAlreadySaved ? 'text-accent-green' : 'text-text-muted hover:text-accent-cyan'}`}
            >
              {saved || isAlreadySaved ? <Check size={14} /> : <BookmarkPlus size={14} />}
              <span className="hidden sm:inline">{saved ? 'Sauvegardé' : isAlreadySaved ? 'Dans la biblio' : 'Sauvegarder'}</span>
            </button>
          )}
          <div className="flex gap-1.5 border-l border-default pl-4">
            <div className="w-2.5 h-2.5 rounded-full bg-accent-red/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-accent-amber/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-accent-green/50"></div>
          </div>
        </div>
      </div>
      <pre className="p-4 overflow-x-auto font-mono text-sm leading-relaxed text-text-primary custom-scrollbar whitespace-pre-wrap">
        <code>{renderCode()}</code>
      </pre>
    </div>
  );
}
