import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { Link } from "react-router-dom";
import { ArrowLeft, FileJson } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const SWAGGER_SPECS = [
  {
    name: "APIs Externas BASA",
    url: "/all-external-endpoints.openapi.json",
  },
  {
    name: "APIs Pix",
    url: "/Collection Pix.yaml",
  },
];

export function SwaggerPage() {
  const [activeSpec, setActiveSpec] = useState(SWAGGER_SPECS[0]);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground
            hover:text-foreground transition-colors mb-4 no-underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar ao Dashboard
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
              Swagger OpenAPI
            </h1>
            <p className="text-muted-foreground text-sm max-w-2xl">
              Visualização interativa da especificação OpenAPI com Swagger UI.
            </p>
          </div>

          <div className="flex bg-[#f8f9fa] dark:bg-zinc-800 p-1 rounded-md border border-border shadow-sm">
            {SWAGGER_SPECS.map((spec) => (
              <button
                key={spec.url}
                onClick={() => setActiveSpec(spec)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded transition-colors flex items-center gap-2",
                  activeSpec.url === spec.url
                    ? "bg-white dark:bg-[#1a1a1a] text-foreground shadow-sm border border-border/50"
                    : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 border border-transparent"
                )}
              >
                <FileJson className="size-4" />
                {spec.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-sm p-4 overflow-x-auto min-h-[600px]">
        <SwaggerUI url={activeSpec.url} />
      </div>
    </div>
  );
}
