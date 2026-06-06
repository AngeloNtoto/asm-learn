'use client';

import { useAppStore } from '@/lib/store';
import { MODULES } from '@/lib/content/modules';
import { calculateModuleProgress } from '@/lib/utils';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  LayoutDashboard,
  Settings2,
  Trophy,
  Hammer,
  Layers,
  Library,
  Terminal,
  Bug,
  Zap,
  Share2,
  Activity,
  Cpu,
  Microchip,
  Network,
  Box,
  ShieldAlert,
  TerminalSquare
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  'cpu': BookOpen,
  'database': Settings2,
  'code': Terminal,
  'git-branch': Settings2,
  'hammer': Hammer,
  'Bug': Bug,
  'Zap': Zap,
  'Terminal': Terminal,
  'Share2': Share2,
  'Activity': Activity,
  'Cpu': Cpu,
  'Layers': Layers,
  'Network': Network,
  'Box': Box,
  'ShieldAlert': ShieldAlert,
  'TerminalSquare': TerminalSquare,
  'Microchip': Microchip,
};
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar, progress } = useAppStore();
  const pathname = usePathname();

  const isModuleActive = (moduleId: string) => {
    return pathname.includes(`/learn/${moduleId}`);
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-surface border-r border-default z-40 transition-all duration-300 ease-in-out flex flex-col ${sidebarOpen ? 'w-[280px] translate-x-0' : 'w-[280px] -translate-x-full md:w-[64px] md:translate-x-0'
        }`}
    >
      {/* Header / Logo */}
      <div className="h-[64px] min-h-[64px] flex items-center justify-between px-4 border-b border-default">
        <Link href="/" className={`flex items-center gap-3 font-bold text-lg overflow-hidden transition-opacity ${!sidebarOpen && 'md:opacity-0 md:w-0'}`}>
          <div className="w-8 h-8 rounded bg-gradient-cyan flex items-center justify-center text-inverse flex-shrink-0">
            <Terminal size={18} />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-cyan whitespace-nowrap">
            McuScript ASM
          </span>
        </Link>
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-md hover:bg-elevated text-text-muted hover:text-text-primary transition-colors hidden md:block"
        >
          {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} className="absolute left-[22px]" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-6 custom-scrollbar">

        {/* Main Links */}
        <div className="flex flex-col gap-1">
          <Link
            href="/"
            className={`sidebar-link ${pathname === '/' ? 'active' : ''}`}
            title="Tableau de bord"
          >
            <LayoutDashboard size={20} className="flex-shrink-0" />
            <span className={`${!sidebarOpen && 'md:hidden'}`}>Tableau de bord</span>
          </Link>
          <Link
            href="/progress"
            className={`sidebar-link ${pathname === '/progress' ? 'active' : ''}`}
            title="Progression"
          >
            <Trophy size={20} className="flex-shrink-0" />
            <span className={`${!sidebarOpen && 'md:hidden'}`}>Progression</span>
          </Link>
          <Link
            href="/flashcards"
            className={`sidebar-link ${pathname === '/flashcards' ? 'active' : ''}`}
            title="Flashcards (Révisions)"
          >
            <Layers size={20} className="flex-shrink-0" />
            <span className={`${!sidebarOpen && 'md:hidden'}`}>Révisions</span>
          </Link>
          <Link
            href="/library"
            className={`sidebar-link ${pathname === '/library' ? 'active' : ''}`}
            title="Ma Bibliothèque"
          >
            <Library size={20} className="flex-shrink-0" />
            <span className={`${!sidebarOpen && 'md:hidden'}`}>Ma Bibliothèque</span>
          </Link>
          <Link
            href="/lab"
            className={`sidebar-link ${pathname === '/lab' ? 'active' : ''}`}
            title="Labo Interactif"
          >
            <Terminal size={20} className="flex-shrink-0" />
            <span className={`${!sidebarOpen && 'md:hidden'}`}>Labo Interactif</span>
          </Link>
        </div>

        {/* Modules List */}
        <div className="flex flex-col gap-1">
          <div className={`px-3 mb-2 text-xs font-bold text-text-muted uppercase tracking-wider ${!sidebarOpen && 'md:hidden'}`}>
            Modules d'Apprentissage
          </div>

          {MODULES.map((mod) => {
            const modProgress = calculateModuleProgress(mod.id, mod.lessons.length, progress.completedLessons);
            const active = isModuleActive(mod.id);

            return (
              <div key={mod.id} className="flex flex-col">
                <Link
                  href={`/learn/${mod.id}/${mod.lessons[0].id}`}
                  className={`sidebar-link group relative ${active ? 'bg-elevated text-text-primary' : ''}`}
                  title={mod.title}
                >
                  <div className={`w-1.5 h-full absolute left-0 top-0 rounded-r-full transition-all duration-300 ${active ? 'bg-accent-cyan opacity-100' : 'opacity-0'}`} />

                  {(() => {
                    const IconComponent = ICON_MAP[mod.icon] || BookOpen;
                    return <IconComponent size={20} className="flex-shrink-0" style={{ color: active ? `var(--${mod.color})` : undefined }} />;
                  })()}

                  <div className={`flex flex-col flex-1 min-w-0 ${!sidebarOpen && 'md:hidden'}`}>
                    <span className="truncate">{mod.title}</span>
                    {modProgress > 0 && (
                      <div className="w-full h-1 bg-elevated rounded-full mt-1.5 overflow-hidden">
                        <div
                          className="h-full bg-accent-cyan transition-all duration-500"
                          style={{ width: `${modProgress}%`, backgroundColor: `var(--${mod.color})` }}
                        />
                      </div>
                    )}
                  </div>
                </Link>

                {/* Sub-lessons list (only shown if module is active and sidebar is open) */}
                {active && sidebarOpen && (
                  <div className="ml-9 mt-1 flex flex-col gap-1 border-l border-default pl-2 md:block hidden">
                    {mod.lessons.map(lesson => {
                      const isLessonActive = pathname.includes(lesson.id);
                      const isCompleted = progress.completedLessons.includes(lesson.id);
                      return (
                        <Link
                          key={lesson.id}
                          href={`/learn/${mod.id}/${lesson.id}`}
                          className={`text-sm py-1 px-2 rounded-md truncate transition-colors ${isLessonActive
                              ? 'text-accent-cyan font-medium'
                              : isCompleted
                                ? 'text-text-secondary hover:text-text-primary'
                                : 'text-text-muted hover:text-text-secondary'
                            }`}
                        >
                          {lesson.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Resources */}
        <div className="flex flex-col gap-1 mt-auto">
          <Link
            href="/cheatsheet"
            className={`sidebar-link ${pathname === '/cheatsheet' ? 'active' : ''}`}
            title="Anti-sèche ASM"
          >
            <BookOpen size={20} className="flex-shrink-0 text-text-muted" />
            <span className={`${!sidebarOpen && 'md:hidden'}`}>Anti-sèche ASM</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
