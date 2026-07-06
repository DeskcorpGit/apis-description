import type { ApiEndpoint } from "@/types/api"
import { Badge } from "@/components/ui/badge"
import { EndpointRoute } from "./EndpointRoute"
import { ParametersTable } from "./ParametersTable"
import { ResponsesAccordion } from "./ResponsesAccordion"

interface EndpointCardProps {
  endpoint: ApiEndpoint
  baseUrl?: string
}

export function EndpointCard({ endpoint, baseUrl }: EndpointCardProps) {
  return (
    <div className="space-y-4 rounded-lg border border-border bg-card/50 p-4 transition-colors hover:border-brand-green/30">
      <EndpointRoute
        method={endpoint.method}
        path={endpoint.path}
        baseUrl={baseUrl}
      />

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

      {endpoint.tags && endpoint.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {endpoint.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[10px]">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {endpoint.parameters && endpoint.parameters.length > 0 && (
        <ParametersTable parameters={endpoint.parameters} />
      )}

      {endpoint.responses && endpoint.responses.length > 0 && (
        <ResponsesAccordion responses={endpoint.responses} />
      )}
    </div>
  )
}
