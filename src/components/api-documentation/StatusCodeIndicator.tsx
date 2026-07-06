import { cn } from "@/lib/utils"

export function StatusCodeIndicator({ code }: { code: string }) {
  const numericCode = parseInt(code, 10)
  const statusGroup = Math.floor(numericCode / 100)
  let colorClass = "bg-muted-foreground"

  switch (statusGroup) {
    case 2:
      colorClass = "bg-brand-green"
      break
    case 3:
      colorClass = "bg-amber-500"
      break
    case 4:
      colorClass = "bg-orange-500"
      break
    default:
      if (statusGroup >= 5) {
        colorClass = "bg-red-500"
      }
      break
  }

  return <span className={cn("size-2 rounded-full shrink-0", colorClass)} />
}
