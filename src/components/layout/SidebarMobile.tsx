import { useState } from 'react';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SidebarContent, type SidebarProps } from './SidebarContent';

export function SidebarMobile({
  isDarkMode,
  setIsDarkMode,
}: Readonly<SidebarProps>) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {!mobileOpen && (
        <button
          type="button"
          className="lg:hidden fixed top-4 left-4 z-40 p-2.5 rounded-xl text-foreground bg-card/90 backdrop-blur-md border border-border shadow-md hover:bg-muted transition-all active:scale-95 cursor-pointer flex items-center justify-center"
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menu"
        >
          <Menu className="h-5 w-5 text-brand-green dark:text-emerald-400" />
        </button>
      )}

      {mobileOpen && (
        <button
          type="button"
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-xs z-40 transition-opacity duration-300 animate-in fade-in cursor-default border-none p-0"
          onClick={() => setMobileOpen(false)}
          aria-label="Fechar menu"
        />
      )}

      <nav
        className={cn(
          'lg:hidden bg-[#f8f9fa] dark:bg-zinc-900 w-[85vw] max-w-sm sm:w-80 min-w-65 h-full fixed left-0 top-0 border-r border-border flex flex-col z-50 shadow-2xl transition-transform duration-300 ease-in-out',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <SidebarContent
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          setMobileOpen={setMobileOpen}
        />
      </nav>
    </>
  );
}
