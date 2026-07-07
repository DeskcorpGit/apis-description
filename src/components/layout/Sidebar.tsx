import { useState } from "react";
import { Search, X, Menu } from "lucide-react";
import type { ApiData } from "@/types/api";
import { cn } from "@/lib/utils";

interface SidebarProps {
  sections: ApiData[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const methodColor: Record<string, string> = {
  GET: "text-brand-green dark:text-emerald-400 font-bold",
  POST: "text-green-700 dark:text-green-400 font-bold",
  PUT: "text-orange-600 dark:text-orange-400 font-bold",
  PATCH: "text-amber-600 dark:text-amber-400 font-bold",
  DELETE: "text-red-600 dark:text-red-400 font-bold",
};

export function Sidebar({
  sections,
  searchQuery,
  setSearchQuery,
}: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <>
      <div className="p-4 border-b border-border sticky top-0 bg-[#f8f9fa] dark:bg-zinc-900 z-10">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            className="w-full px-3 py-1.5 pl-8 text-xs font-mono border border-border rounded
              focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green
              bg-white dark:bg-zinc-800 text-foreground shadow-sm"
            placeholder="Buscar endpoints..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 py-2 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.title}>
            <div
              className="px-4 py-2 font-bold text-muted-foreground text-[11px] uppercase tracking-wider
              bg-muted/40 dark:bg-zinc-800/60 border-y border-border/30 mt-2"
            >
              {section.title}
            </div>
            <ul className="flex flex-col font-mono text-xs">
              {section.endpoints.map((ep, idx) => {
                const anchorId =
                  `${section.title}-${ep.method}-${ep.path}-${idx}`
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-");
                return (
                  <li key={anchorId}>
                    <a
                      className="block px-4 py-2 text-muted-foreground hover:bg-muted/50
                        dark:hover:bg-zinc-800 transition-colors flex items-center gap-2"
                      href={`#${anchorId}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span
                        className={cn(
                          "w-12 text-[11px] shrink-0",
                          methodColor[ep.method] || "text-muted-foreground",
                        )}
                      >
                        {ep.method}
                      </span>
                      <span className="truncate text-foreground/80">
                        {ep.path}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white dark:bg-zinc-900
          border border-border shadow-md"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Abrir menu"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <nav
        className={cn(
          "bg-[#f8f9fa] dark:bg-zinc-900 w-72 h-screen fixed left-0 top-0 border-r border-border flex flex-col z-40 transition-transform duration-300",
          "lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {sidebarContent}
      </nav>
    </>
  );
}
