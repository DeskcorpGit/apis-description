import type { ApiResponse } from "@/types/api"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ArrowRight } from "lucide-react"
import { StatusCodeIndicator } from "./StatusCodeIndicator"

export function ResponsesAccordion({ responses }: { responses: ApiResponse[] }) {
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
