import type { ApiParameter } from "@/types/api";

interface EndpointParametersProps {
  parameters?: ApiParameter[];
}

export function EndpointParameters({ parameters }: EndpointParametersProps) {
  const paramGroups: Record<string, ApiParameter[]> = {};

  parameters?.forEach((p) => {
    const label =
      p.in === "path"
        ? "Path Parameters"
        : p.in === "query"
          ? "Query Parameters"
          : p.in === "header"
            ? "Header Parameters"
            : "Body Parameters";
    if (!paramGroups[label]) paramGroups[label] = [];
    paramGroups[label].push(p);
  });

  if (!parameters || parameters.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic">
        Nenhum parâmetro documentado.
      </p>
    );
  }

  return (
    <div>
      {Object.entries(paramGroups).map(([groupLabel, params]) => (
        <div key={groupLabel} className="mb-6">
          <h3 className="text-base font-semibold text-foreground mb-4 border-b border-border pb-2">
            {groupLabel}
          </h3>
          <div>
            {params.map((param) => (
              <div
                key={`${param.in}-${param.name}`}
                className="py-3 border-b border-border/50"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-sm text-brand-green dark:text-emerald-400 font-bold">
                    {param.name}
                  </span>
                  {param.required ? (
                    <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-0.5 rounded font-bold uppercase">
                      Obrigatório
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground uppercase">
                      Opcional
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground font-mono mb-2">
                  {param.type}
                </div>
                {param.description && (
                  <p className="text-sm text-muted-foreground">
                    {param.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
