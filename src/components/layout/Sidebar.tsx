import { SidebarContent, type SidebarProps } from './SidebarContent';

export function Sidebar({ isDarkMode, setIsDarkMode }: Readonly<SidebarProps>) {
  return (
    <nav className="hidden lg:flex bg-[#f8f9fa] dark:bg-zinc-900 w-72 xl:w-80 min-w-65 h-screen fixed left-0 top-0 border-r border-border flex-col z-40">
      <SidebarContent isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </nav>
  );
}
