import type { ApiParameter } from "@/types/api"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Code2 } from "lucide-react"

export function ParametersTable({ parameters }: { parameters: ApiParameter[] }) {
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
