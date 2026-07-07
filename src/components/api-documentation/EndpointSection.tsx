import type { ApiEndpoint } from "@/types/api"
import { cn } from "@/lib/utils"
import { useState, useCallback } from "react"
import { Copy, CheckCircle2 } from "lucide-react"

interface EndpointSectionProps {
  sectionTitle: string
  endpoint: ApiEndpoint
  baseUrl?: string
  anchorId: string
}

const methodStyles: Record<string, string> = {
  GET: "bg-brand-green text-white",
  POST: "bg-green-700 text-white",
  PUT: "bg-orange-600 text-white",
  PATCH: "bg-amber-600 text-white",
  DELETE: "bg-red-600 text-white",
}

function buildCurlExample(method: string, baseUrl: string | undefined, path: string, hasBody: boolean): string {
  const url = baseUrl ? `${baseUrl}${path}` : path
  let curl = `curl -X ${method} \\\n  '${url}' \\\n  -H 'Authorization: Bearer <token>' \\\n  -H 'Accept: application/json'`
  if (hasBody) {
    curl += ` \\\n  -H 'Content-Type: application/json' \\\n  -d '{ ... }'`
  }
  return curl
}

export function EndpointSection({ sectionTitle, endpoint, baseUrl, anchorId }: EndpointSectionProps) {
  const [copied, setCopied] = useState(false)
  const hasBodyParams = endpoint.parameters?.some(p => p.in === "query" || p.in === "header") === false
    || ["POST", "PUT", "PATCH"].includes(endpoint.method)

  const fullUrl = baseUrl ? `${baseUrl}${endpoint.path}` : endpoint.path
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [fullUrl])

  // Group parameters by location
  const paramGroups: Record<string, typeof endpoint.parameters> = {}
  endpoint.parameters?.forEach(p => {
    const label = p.in === "path" ? "Path Parameters"
      : p.in === "query" ? "Query Parameters"
      : p.in === "header" ? "Header Parameters"
      : "Body Parameters"
    if (!paramGroups[label]) paramGroups[label] = []
    paramGroups[label]!.push(p)
  })

  return (
    <section
      className="mb-16 pb-16 border-b border-border border-dashed scroll-mt-6"
      id={anchorId}
    >
      {/* Title + Description */}
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
            {endpoint.tags.map(tag => (
              <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted dark:bg-zinc-800 text-muted-foreground border border-border">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Method badge + Full URL bar */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className={cn(
            "px-3 py-1 rounded-sm font-bold text-xs tracking-wider font-mono",
            methodStyles[endpoint.method] || "bg-gray-600 text-white"
          )}>
            {endpoint.method}
          </span>
        </div>
        <div className="bg-[#f8f9fa] dark:bg-zinc-800 border border-border rounded-sm shadow-sm p-4 text-foreground font-mono text-sm break-all flex items-center justify-between gap-3 group/url">
          <div className="min-w-0">
            {baseUrl && (
              <span className="text-muted-foreground">{baseUrl}</span>
            )}
            <span className="font-semibold">{endpoint.path}</span>
          </div>
          <button
            onClick={handleCopy}
            className="shrink-0 opacity-0 group-hover/url:opacity-100 transition-opacity p-1 rounded hover:bg-muted"
            aria-label="Copiar URL"
          >
            {copied ? (
              <CheckCircle2 className="size-4 text-brand-green" />
            ) : (
              <Copy className="size-4 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* 2-column grid: Parameters | Code */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Parameters */}
        <div>
          {Object.entries(paramGroups).map(([groupLabel, params]) => (
            <div key={groupLabel} className="mb-6">
              <h3 className="text-base font-semibold text-foreground mb-4 border-b border-border pb-2">
                {groupLabel}
              </h3>
              <div>
                {params!.map((param) => (
                  <div key={`${param.in}-${param.name}`} className="py-3 border-b border-border/50">
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
                    <div className="text-xs text-muted-foreground font-mono mb-2">{param.type}</div>
                    {param.description && (
                      <p className="text-sm text-muted-foreground">{param.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {(!endpoint.parameters || endpoint.parameters.length === 0) && (
            <p className="text-sm text-muted-foreground italic">Nenhum parâmetro documentado.</p>
          )}
        </div>

        {/* Right: Code examples + Responses */}
        <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
          {/* cURL example */}
          <div>
            <div className="bg-[#1E1E1E] rounded-md shadow-md overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-4 py-2 bg-[#2d3133] border-b border-[#414751]">
                <span className="text-white text-xs font-semibold">Exemplo de Request</span>
                <span className="text-gray-400 text-xs">cURL</span>
              </div>
              <div className="p-4 overflow-x-auto code-scroll">
                <pre className="font-mono text-[13px] text-[#d1e4fb] leading-relaxed whitespace-pre">
                  {buildCurlExample(endpoint.method, baseUrl, endpoint.path, hasBodyParams)}
                </pre>
              </div>
            </div>
          </div>

          {/* Responses */}
          {endpoint.responses && endpoint.responses.length > 0 && (
            endpoint.responses.map((response) => (
              <div key={response.statusCode}>
                <div className="bg-[#1E1E1E] rounded-md shadow-md overflow-hidden flex flex-col">
                  <div className="flex items-center justify-between px-4 py-2 bg-[#2d3133] border-b border-[#414751]">
                    <span className="text-white text-xs font-semibold">
                      Response{" "}
                      <span className={cn(
                        "ml-2",
                        response.statusCode.startsWith("2") ? "text-green-400" :
                        response.statusCode.startsWith("4") ? "text-orange-400" :
                        response.statusCode.startsWith("5") ? "text-red-400" : "text-yellow-400"
                      )}>
                        {response.statusCode} {response.description.length < 40 ? response.description : ""}
                      </span>
                    </span>
                    <span className="text-gray-400 text-xs">JSON</span>
                  </div>
                  <div className="p-4 overflow-x-auto code-scroll">
                    {response.example ? (
                      <pre className="font-mono text-[12px] text-[#e0e3e5] leading-normal whitespace-pre">
                        {response.example}
                      </pre>
                    ) : (
                      <p className="font-mono text-[12px] text-[#e0e3e5]">
                        {response.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
