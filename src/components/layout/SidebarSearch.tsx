import { Search, X } from "lucide-react";

interface SidebarSearchProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  setMobileOpen?: (open: boolean) => void;
}

export function SidebarSearch({
  searchQuery,
  setSearchQuery,
  setMobileOpen,
}: SidebarSearchProps) {
  return (
    <div className="p-4 border-b border-border sticky top-0 bg-[#f8f9fa] dark:bg-zinc-900 z-10 flex items-center gap-2">
      <div className="relative flex-1">
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
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      {setMobileOpen && (
        <button
          className="lg:hidden p-2 -mr-2 text-muted-foreground hover:text-foreground cursor-pointer"
          onClick={() => setMobileOpen(false)}
          aria-label="Fechar menu"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
