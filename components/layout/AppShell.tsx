'use client';

import { useAppStore } from '@/lib/store';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useEffect, useState } from 'react';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { sidebarOpen, toggleSidebar, checkBadges, updateStreak } = useAppStore();
  const [mounted, setMounted] = useState(false);

  // Initialize client-side state
  useEffect(() => {
    setMounted(true);
    updateStreak();
    checkBadges();
  }, [updateStreak, checkBadges]);

  if (!mounted) {
    return <div className="h-screen w-screen bg-primary flex items-center justify-center text-text-muted">Chargement...</div>;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-primary text-text-primary">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar - fixed left */}
      <Sidebar />
      
      {/* Main content area */}
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'md:ml-[280px]' : 'md:ml-[64px]'
        }`}
      >
        <TopBar />
        
        {/* Scrollable content container */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden pt-4 pb-12 px-4 md:px-8">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
