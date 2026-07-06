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
