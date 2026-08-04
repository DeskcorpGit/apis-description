import { useState, useEffect, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { SidebarMobile } from "@/components/layout/SidebarMobile";

export function AppLayout() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme === "dark";
      }
      return document.documentElement.classList.contains("dark");
    }
    return true;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-background text-foreground transition-colors duration-300">
      <Sidebar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <SidebarMobile isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <main className="lg:ml-72 min-h-screen pt-16 lg:pt-0">
        <div className="p-6 lg:p-10 lg:pr-12">
          <Suspense fallback={<div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
