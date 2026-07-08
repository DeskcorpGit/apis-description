import { Link } from "react-router-dom";
import type { ApiData } from "@/types/api";
import { cn } from "@/lib/utils";

const methodColor: Record<string, string> = {
  GET: "text-emerald-600 dark:text-emerald-400 font-bold",
  POST: "text-blue-600 dark:text-blue-400 font-bold",
  PUT: "text-amber-600 dark:text-amber-400 font-bold",
  PATCH: "text-orange-600 dark:text-orange-400 font-bold",
  DELETE: "text-red-600 dark:text-red-400 font-bold",
};

interface SidebarEndpointListProps {
  sections: ApiData[];
  onLinkClick: () => void;
}

export function SidebarEndpointList({
  sections,
  onLinkClick,
}: SidebarEndpointListProps) {
  return (
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
              const anchorId = `${section.title}-${ep.method}-${ep.path}-${idx}`
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-");
              return (
                <li key={anchorId}>
                  <Link
                    className="block px-4 py-2 text-muted-foreground hover:bg-muted/50
                      dark:hover:bg-zinc-800 transition-colors flex items-center gap-2 no-underline"
                    to={`/apis#${anchorId}`}
                    onClick={onLinkClick}
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
