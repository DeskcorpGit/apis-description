import type { ApiEndpoint } from "@/types/api";

interface EndpointHeaderProps {
  sectionTitle: string;
  endpoint: ApiEndpoint;
}

export function EndpointHeader({ sectionTitle, endpoint }: EndpointHeaderProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-3">
        {endpoint.summary || sectionTitle}
      </h2>
      {endpoint.description && (
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {endpoint.description}
        </p>
      )}
      {endpoint.tags && endpoint.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {endpoint.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted dark:bg-zinc-800 text-muted-foreground border border-border"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
