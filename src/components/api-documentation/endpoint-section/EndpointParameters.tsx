import type { ApiParameter } from '@/types/api';

interface EndpointParametersProps {
  parameters?: ApiParameter[];
  requestBody?: string;
}

const PARAM_LOCATION_LABELS: Record<string, string> = {
  path: 'Path Parameters',
  query: 'Query Parameters',
  header: 'Header Parameters',
  body: 'Body Parameters',
};

function inferParamType(val: unknown): string {
  if (val === null) return 'null';
  if (Array.isArray(val)) return 'array';
  return typeof val;
}

function inferParamDescription(val: unknown): string | undefined {
  if (typeof val === 'string' && val.length > 0) {
    const formattedVal = val.length > 60 ? `${val.substring(0, 60)}...` : val;
    return `Exemplo: "${formattedVal}"`;
  }
  return undefined;
}

function extractBodyParametersFromJson(jsonStr: string): ApiParameter[] {
  try {
    const parsed = JSON.parse(jsonStr);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return [];
    }

    return Object.entries(parsed).map(([name, val]) => ({
      name,
      in: 'body',
      required: true,
      type: inferParamType(val),
      description: inferParamDescription(val),
    }));
  } catch {
    return [];
  }
}

function groupParameters(
  parameters?: ApiParameter[],
  requestBody?: string,
): Record<string, ApiParameter[]> {
  let allParams: ApiParameter[] = [...(parameters || [])];

  const hasExplicitBodyParams = allParams.some((p) => p.in === 'body');
  if (!hasExplicitBodyParams && requestBody) {
    const derivedBodyParams = extractBodyParametersFromJson(requestBody);
    if (derivedBodyParams.length > 0) {
      allParams = [...allParams, ...derivedBodyParams];
    }
  }

  const paramGroups: Record<string, ApiParameter[]> = {};

  allParams.forEach((p) => {
    const label = PARAM_LOCATION_LABELS[p.in] ?? 'Body Parameters';
    if (!paramGroups[label]) {
      paramGroups[label] = [];
    }
    paramGroups[label].push(p);
  });

  return paramGroups;
}

export function EndpointParameters({
  parameters,
  requestBody,
}: Readonly<EndpointParametersProps>) {
  const paramGroups = groupParameters(parameters, requestBody);
  const groupEntries = Object.entries(paramGroups);

  if (groupEntries.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic">
        Nenhum parâmetro documentado.
      </p>
    );
  }

  return (
    <div className="min-w-0 max-w-full">
      {groupEntries.map(([groupLabel, params]) => (
        <div key={groupLabel} className="mb-6 min-w-0">
          <h3 className="text-base font-semibold text-foreground mb-4 border-b border-border pb-2 wrap-break-word">
            {groupLabel}
          </h3>
          <div className="min-w-0">
            {params.map((param) => (
              <div
                key={`${param.in}-${param.name}`}
                className="py-3 border-b border-border/50 min-w-0"
              >
                <div className="flex items-center justify-between gap-2 mb-1 min-w-0">
                  <span className="font-mono text-sm text-brand-green dark:text-emerald-400 font-bold break-all min-w-0">
                    {param.name}
                  </span>
                  {param.required ? (
                    <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-0.5 rounded font-bold uppercase shrink-0">
                      Obrigatório
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground uppercase shrink-0">
                      Opcional
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground font-mono mb-2 break-all">
                  {param.type}
                </div>
                {param.description && (
                  <p className="text-sm text-muted-foreground wrap-break-word">
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
