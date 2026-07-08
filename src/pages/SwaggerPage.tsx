import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function SwaggerPage() {
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
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
          Swagger OpenAPI
        </h1>
        <p className="text-muted-foreground text-sm max-w-2xl">
          Visualização interativa da especificação OpenAPI com Swagger UI.
        </p>
      </div>
      <div className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-sm p-4">
        <SwaggerUI url="/all-external-endpoints.openapi.json" />
      </div>
    </div>
  );
}
