import { FileCode2, Plus } from 'lucide-react';
import SwaggerUI from 'swagger-ui-react';

interface SpecItem {
  name: string;
  url: string;
}

export function SwaggerDoc({
  activeSpec,
  setActiveSpec,
  SWAGGER_SPECS,
  onAddFile,
}: Readonly<{
  activeSpec: SpecItem;
  setActiveSpec: (spec: SpecItem) => void;
  SWAGGER_SPECS: SpecItem[];
  onAddFile?: () => void;
}>) {
  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selected = SWAGGER_SPECS.find((s) => s.url === e.target.value);
    if (selected) {
      setActiveSpec(selected);
    }
  }

  return (
    <>
      <div className="mb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground mb-1">
              Swagger OpenAPI
            </h1>
            <p className="text-muted-foreground text-xs max-w-2xl">
              Visualização interativa da especificação OpenAPI com Swagger UI.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 shadow-sm">
              <FileCode2 className="size-4 text-brand-green shrink-0" />
              <label htmlFor="swagger-spec-select" className="sr-only">
                Selecionar Especificação
              </label>
              <select
                id="swagger-spec-select"
                value={activeSpec.url}
                onChange={handleSelectChange}
                className="bg-transparent text-xs font-medium text-foreground focus:outline-none cursor-pointer pr-2 max-w-[220px] sm:max-w-xs truncate"
              >
                {SWAGGER_SPECS.map((spec) => (
                  <option
                    key={spec.url}
                    value={spec.url}
                    className="bg-background text-foreground"
                  >
                    {spec.name}
                  </option>
                ))}
              </select>
              <span className="text-[11px] text-muted-foreground pl-1 border-l border-border hidden sm:inline">
                {SWAGGER_SPECS.length}{' '}
                {SWAGGER_SPECS.length === 1 ? 'arquivo' : 'arquivos'}
              </span>
            </div>

            {onAddFile && (
              <button
                type="button"
                onClick={onAddFile}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-green/40 bg-brand-green/5 px-3 py-1.5 text-xs font-medium text-brand-green transition-all duration-200 hover:bg-brand-green/10 hover:border-brand-green/60 cursor-pointer shadow-sm"
              >
                <Plus className="size-3.5" />
                Adicionar Arquivo
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-sm p-4 overflow-x-auto min-h-150 border border-border">
        <SwaggerUI url={activeSpec.url} />
      </div>
    </>
  );
}
