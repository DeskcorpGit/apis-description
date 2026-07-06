import type { ApiData, ApiEndpoint, ApiParameter, ApiResponse, HttpMethod } from "@/types/api"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import {
  Copy,
  CheckCircle2,
  Globe,
  ChevronRight,
  Code2,
  ArrowRight,
} from "lucide-react"
import { useState, useCallback } from "react"

// ---------------------------------------------------------------------------
// Sub-componentes internos
// ---------------------------------------------------------------------------

/** Badge customizado para o método HTTP, utilizando a cor #013D2D (brand-green) */
function MethodBadge({ method }: { method: HttpMethod }) {
  return (
    <Badge
      className="bg-brand-green text-white border-brand-green hover:bg-brand-green-light
        font-mono text-[11px] uppercase tracking-wider px-2.5 py-0.5"
    >
      {method}
    </Badge>
  )
}

/** Linha de rota com badge de método + path copiável */
function EndpointRoute({
  method,
  path,
  baseUrl,
}: {
  method: HttpMethod
  path: string
  baseUrl?: string
}) {
  const [copied, setCopied] = useState(false)

  const fullPath = baseUrl ? `${baseUrl}${path}` : path

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(fullPath).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [fullPath])

  return (
    <div className="flex items-center gap-3 group/route">
      <MethodBadge method={method} />
      <code className="flex-1 text-sm font-mono text-foreground/90 break-all">
        {path}
      </code>
      <Button
        variant="ghost"
        size="icon-xs"
        onClick={handleCopy}
        className="opacity-0 group-hover/route:opacity-100 transition-opacity"
        aria-label="Copiar rota"
      >
        {copied ? (
          <CheckCircle2 className="size-3.5 text-brand-green" />
        ) : (
          <Copy className="size-3.5" />
        )}
      </Button>
    </div>
  )
}

/** Tabela de parâmetros */
function ParametersTable({ parameters }: { parameters: ApiParameter[] }) {
  if (parameters.length === 0) return null

  return (
    <div className="space-y-2">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
        <Code2 className="size-3.5" />
        Parâmetros
      </h4>
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="text-xs font-semibold">Nome</TableHead>
              <TableHead className="text-xs font-semibold">Local</TableHead>
              <TableHead className="text-xs font-semibold">Tipo</TableHead>
              <TableHead className="text-xs font-semibold">Obrigatório</TableHead>
              <TableHead className="text-xs font-semibold">Descrição</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parameters.map((param) => (
              <TableRow key={`${param.in}-${param.name}`}>
                <TableCell className="font-mono text-xs text-brand-green font-medium">
                  {param.name}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-[10px] font-mono">
                    {param.in}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground font-mono">
                  {param.type}
                </TableCell>
                <TableCell>
                  {param.required ? (
                    <span className="inline-flex items-center gap-1 text-xs text-brand-green font-medium">
                      <span className="size-1.5 rounded-full bg-brand-green" />
                      Sim
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">Não</span>
                  )}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground whitespace-normal break-words">
                  {param.description ?? "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

/** Accordion de status codes / respostas */
function ResponsesAccordion({ responses }: { responses: ApiResponse[] }) {
  if (responses.length === 0) return null

  return (
    <div className="space-y-2">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
        <ArrowRight className="size-3.5" />
        Respostas
      </h4>
      <Accordion type="multiple" className="rounded-lg border border-border overflow-hidden">
        {responses.map((response) => (
          <AccordionItem
            key={response.statusCode}
            value={response.statusCode}
            className="border-border px-3"
          >
            <AccordionTrigger className="py-2 text-sm hover:no-underline">
              <div className="flex items-center gap-2">
                <StatusCodeIndicator code={response.statusCode} />
                <span className="font-mono text-xs">{response.statusCode}</span>
                <span className="text-xs text-muted-foreground">
                  {response.description}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pb-1">
                <p className="text-xs text-muted-foreground">
                  {response.description}
                </p>
                {response.example && (
                  <pre className="text-xs font-mono bg-muted/50 rounded-md p-3 overflow-x-auto border border-border">
                    <code>{response.example}</code>
                  </pre>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

/** Indicador visual colorido para o código de status HTTP */
function StatusCodeIndicator({ code }: { code: string }) {
  const numericCode = parseInt(code, 10)
  let colorClass = "bg-muted-foreground"

  if (numericCode >= 200 && numericCode < 300) {
    colorClass = "bg-brand-green"
  } else if (numericCode >= 300 && numericCode < 400) {
    colorClass = "bg-amber-500"
  } else if (numericCode >= 400 && numericCode < 500) {
    colorClass = "bg-orange-500"
  } else if (numericCode >= 500) {
    colorClass = "bg-red-500"
  }

  return <span className={cn("size-2 rounded-full shrink-0", colorClass)} />
}

// ---------------------------------------------------------------------------
// Card de um único endpoint
// ---------------------------------------------------------------------------

function EndpointCard({
  endpoint,
  baseUrl,
}: {
  endpoint: ApiEndpoint
  baseUrl?: string
}) {
  return (
    <div className="space-y-4 rounded-lg border border-border bg-card/50 p-4 transition-colors hover:border-brand-green/30">
      {/* Route header */}
      <EndpointRoute
        method={endpoint.method}
        path={endpoint.path}
        baseUrl={baseUrl}
      />

      {/* Summary & Description */}
      {(endpoint.summary || endpoint.description) && (
        <div className="space-y-1 pl-0.5">
          {endpoint.summary && (
            <p className="text-sm font-medium text-foreground">
              {endpoint.summary}
            </p>
          )}
          {endpoint.description && (
            <p className="text-xs text-muted-foreground leading-relaxed">
              {endpoint.description}
            </p>
          )}
        </div>
      )}

      {/* Tags */}
      {endpoint.tags && endpoint.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {endpoint.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[10px]">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Parameters Table */}
      {endpoint.parameters && endpoint.parameters.length > 0 && (
        <ParametersTable parameters={endpoint.parameters} />
      )}

      {/* Responses Accordion */}
      {endpoint.responses && endpoint.responses.length > 0 && (
        <ResponsesAccordion responses={endpoint.responses} />
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

export interface ApiDocumentationCardProps {
  /** Dados completos da API no formato OpenAPI simplificado */
  apiData: ApiData
  /** Classe CSS adicional para o card raiz */
  className?: string
}

/**
 * Componente de documentação de API.
 *
 * Renderiza um Card estilizado com:
 * - Cabeçalho com título, versão e URL base
 * - Lista de endpoints, cada um contendo:
 *   - Badge de método HTTP (com cor #013D2D / brand-green)
 *   - Rota copiável
 *   - Tabela de parâmetros
 *   - Accordion de status codes com exemplos de resposta
 */
export function ApiDocumentationCard({
  apiData,
  className,
}: ApiDocumentationCardProps) {
  return (
    <Card
      className={cn(
        "w-full max-w-6xl border-border dark:bg-zinc-950 bg-white",
        className
      )}
    >
      {/* Header */}
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold tracking-tight flex items-center gap-2">
              {apiData.title}
              {apiData.version && (
                <Badge
                  variant="outline"
                  className="text-[10px] font-mono font-normal"
                >
                  v{apiData.version}
                </Badge>
              )}
            </CardTitle>
            {apiData.description && (
              <CardDescription className="text-xs leading-relaxed">
                {apiData.description}
              </CardDescription>
            )}
          </div>
        </div>

        {apiData.baseUrl && (
          <div className="mt-3 flex items-center gap-2 rounded-md bg-muted/50 px-3 py-1.5 border border-border">
            <Globe className="size-3.5 text-brand-green shrink-0" />
            <code className="text-xs font-mono text-muted-foreground truncate">
              {apiData.baseUrl}
            </code>
          </div>
        )}
      </CardHeader>

      {/* Endpoints list */}
      <CardContent className="space-y-3 pt-4">
        <div className="flex items-center gap-2 mb-1">
          <ChevronRight className="size-3.5 text-brand-green" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Endpoints ({apiData.endpoints.length})
          </h3>
        </div>

        <div className="space-y-3">
          {apiData.endpoints.map((endpoint, idx) => (
            <EndpointCard
              key={`${endpoint.method}-${endpoint.path}-${idx}`}
              endpoint={endpoint}
              baseUrl={apiData.baseUrl}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
