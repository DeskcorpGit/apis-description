import { cn } from '@/lib/utils';
import { FileJson } from 'lucide-react';
import SwaggerUI from 'swagger-ui-react';

export function SwaggerDoc({
  activeSpec,
  setActiveSpec,
  SWAGGER_SPECS,
}: Readonly<{
  activeSpec: {
    name: string;
    url: string;
  };
  setActiveSpec: (spec: { name: string; url: string }) => void;
  SWAGGER_SPECS: {
    name: string;
    url: string;
  }[];
}>) {
  return (
    <>
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
              Swagger OpenAPI
            </h1>
            <p className="text-muted-foreground text-sm max-w-2xl">
              Visualização interativa da especificação OpenAPI com Swagger UI.
            </p>
          </div>

          <div className="flex bg-[#f8f9fa] dark:bg-zinc-800 p-1 rounded-md border border-border shadow-sm">
            {SWAGGER_SPECS.map((spec) => (
              <button
                type="button"
                key={spec.url}
                onClick={() => setActiveSpec(spec)}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded transition-colors flex items-center gap-2',
                  activeSpec.url === spec.url
                    ? 'bg-white dark:bg-[#1a1a1a] text-foreground shadow-sm border border-border/50'
                    : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 border border-transparent',
                )}
              >
                <FileJson className="size-4" />
                {spec.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-sm p-4 overflow-x-auto min-h-150">
        <SwaggerUI url={activeSpec.url} />
      </div>
    </>
  );
}
