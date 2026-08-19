import { Search, X } from 'lucide-react';

interface SidebarSearchProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  setMobileOpen?: (open: boolean) => void;
}

export function SidebarSearch({
  searchQuery,
  setSearchQuery,
  setMobileOpen,
}: Readonly<SidebarSearchProps>) {
  return (
    <div className="p-3 border-b border-border bg-[#f8f9fa] dark:bg-zinc-900 flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <input
          className="w-full px-3 py-1.5 pl-8 pr-7 text-xs font-mono border border-border rounded-lg
            focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green
            bg-white dark:bg-zinc-800 text-foreground shadow-xs transition-colors"
          placeholder="Buscar endpoints..."
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer p-0.5 rounded"
            title="Limpar busca"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      {setMobileOpen && (
        <button
          type="button"
          className="lg:hidden p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors cursor-pointer"
          onClick={() => setMobileOpen(false)}
          aria-label="Fechar menu"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
