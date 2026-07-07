import { useState, useCallback } from "react";
import { Copy, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface EndpointUrlBarProps {
  method: string;
  baseUrl?: string;
  path: string;
}

const methodStyles: Record<string, string> = {
  GET: "bg-brand-green text-white",
  POST: "bg-blue-700 text-white",
  PUT: "bg-orange-600 text-white",
  PATCH: "bg-amber-600 text-white",
  DELETE: "bg-red-600 text-white",
};

export function EndpointUrlBar({ method, baseUrl, path }: EndpointUrlBarProps) {
  const [copied, setCopied] = useState(false);
  const fullUrl = baseUrl ? `${baseUrl}${path}` : path;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [fullUrl]);

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <span
          className={cn(
            "px-3 py-1 rounded-sm font-bold text-xs tracking-wider font-mono",
            methodStyles[method] || "bg-gray-600 text-white",
          )}
        >
          {method}
        </span>
      </div>
      <div className="bg-[#f8f9fa] dark:bg-zinc-800 border border-border rounded-sm shadow-sm p-4 text-foreground font-mono text-sm break-all flex items-center justify-between gap-3 group/url">
        <div className="min-w-0">
          {baseUrl && <span className="text-muted-foreground">{baseUrl}</span>}
          <span className="font-semibold">{path}</span>
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
  );
}
