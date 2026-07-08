import { useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarContent, type SidebarProps } from "./SidebarContent";

export function SidebarMobile({ isDarkMode, setIsDarkMode }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {!mobileOpen && (
        <button
          className="lg:hidden fixed top-6 left-4 z-50 p-2 rounded-md text-white bg-brand-green/50 backdrop-blur-sm border border-white/20 shadow-sm hover:bg-brand-green/80 transition-colors cursor-pointer"
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      )}

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <nav
        className={cn(
          "lg:hidden bg-[#f8f9fa] dark:bg-zinc-900 w-72 h-screen fixed left-0 top-0 border-r border-border flex flex-col z-40 transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
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
