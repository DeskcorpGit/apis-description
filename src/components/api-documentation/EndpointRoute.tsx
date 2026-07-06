import type { HttpMethod } from "@/types/api"
import { Button } from "@/components/ui/button"
import { Copy, CheckCircle2 } from "lucide-react"
import { useState, useCallback } from "react"
import { MethodBadge } from "./MethodBadge"

interface EndpointRouteProps {
  method: HttpMethod
  path: string
  baseUrl?: string
}


export function EndpointRoute({ method, path, baseUrl }: EndpointRouteProps) {
  const [copied, setCopied] = useState(false)

  const fullPath = baseUrl ? `${baseUrl}${path}` : path

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(fullPath).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [fullPath])

  return (
    <div className="flex items-center gap-3 group/route overflow-hidden w-full">
      <div className="shrink-0">
        <MethodBadge method={method} />
      </div>
      <div className="flex-1 overflow-x-auto overflow-y-hidden pb-1 -mb-1 custom-scrollbar">
        <code className="text-sm font-mono text-foreground/90 whitespace-nowrap">
          {path}
        </code>
      </div>
      <Button
        variant="ghost"
        size="icon-xs"
        onClick={handleCopy}
        className="opacity-0 group-hover/route:opacity-100 transition-opacity shrink-0"
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
