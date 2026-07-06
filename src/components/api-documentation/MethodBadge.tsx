import type { HttpMethod } from "@/types/api"
import { Badge } from "@/components/ui/badge"

export function MethodBadge({ method }: { method: HttpMethod }) {
  return (
    <Badge
      className="bg-brand-green text-white border-brand-green hover:bg-brand-green-light
        font-mono text-[11px] uppercase tracking-wider px-2.5 py-0.5"
    >
      {method}
    </Badge>
  )
}
