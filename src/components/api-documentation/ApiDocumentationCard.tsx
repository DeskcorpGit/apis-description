import type { ApiData } from "@/types/api"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Globe, ChevronRight } from "lucide-react"
import { EndpointCard } from "./EndpointCard"

export interface ApiDocumentationCardProps {
  apiData: ApiData
  className?: string
}

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
          <div className="mt-3 flex items-center gap-2 rounded-md bg-muted/50 px-3 py-1.5 border border-border w-full overflow-hidden">
            <Globe className="size-3.5 text-brand-green shrink-0" />
            <div className="flex-1 overflow-x-auto overflow-y-hidden pb-1 -mb-1 custom-scrollbar">
              <code className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                {apiData.baseUrl}
              </code>
            </div>
          </div>
        )}
      </CardHeader>

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
