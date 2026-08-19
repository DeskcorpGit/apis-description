import { Link } from 'react-router-dom';
import type { ApiData } from '@/types/api';
import { cn } from '@/lib/utils';

const methodColor: Record<string, string> = {
  GET: 'text-emerald-600 dark:text-emerald-400 font-bold',
  POST: 'text-blue-600 dark:text-blue-400 font-bold',
  PUT: 'text-amber-600 dark:text-amber-400 font-bold',
  PATCH: 'text-orange-600 dark:text-orange-400 font-bold',
  DELETE: 'text-red-600 dark:text-red-400 font-bold',
};

interface SidebarEndpointListProps {
  sections: ApiData[];
  onLinkClick: () => void;
}

export function SidebarEndpointList({
  sections,
  onLinkClick,
}: Readonly<SidebarEndpointListProps>) {
  return (
    <div className="flex-1 py-2 overflow-y-auto custom-scrollbar px-2 min-w-0">
      {sections.map((section, sIdx) => (
        <div key={`${section.title}-${sIdx}`} className="mb-2.5 min-w-0">
          <div
            className="px-2.5 py-1.5 font-bold text-muted-foreground text-[10.5px] uppercase tracking-wider
            bg-muted/50 dark:bg-zinc-800/60 rounded-md border border-border/40 truncate"
            title={section.title}
          >
            {section.title}
          </div>
          <ul className="flex flex-col gap-0.5 mt-1 font-mono text-xs">
            {section.endpoints.map((ep, idx) => {
              const anchorId = `${section.title}-${ep.method}-${ep.path}-${idx}`
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-');
              return (
                <li key={anchorId} className="min-w-0">
                  <Link
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60
                      dark:hover:bg-zinc-800/80 transition-colors no-underline group min-w-0"
                    to={`/apis#${anchorId}`}
                    onClick={onLinkClick}
                    title={`${ep.method} ${ep.path}`}
                  >
                    <span
                      className={cn(
                        'w-11 text-[10.5px] font-bold shrink-0 tracking-tight font-mono',
                        methodColor[ep.method] || 'text-muted-foreground',
                      )}
                    >
                      {ep.method}
                    </span>
                    <span className="truncate text-foreground/80 group-hover:text-foreground text-[11.5px] min-w-0 flex-1">
                      {ep.path}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
