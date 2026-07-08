import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { allApiSections } from "@/data";
import { getTotalEndpoints, getTotalPartners } from "@/data/api-stats";

export interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const ROUTE_META: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Endpoints BASA — API Reference",
    description: "Painel de controle com visão geral de todas as integrações.",
  },
  "/apis": {
    title: "Endpoints BASA — API Reference",
    description: `Documentação de ${getTotalEndpoints()} endpoints extraídos de ${allApiSections.length} seções. Navegue pela sidebar ou use a busca para encontrar o endpoint desejado.`,
  },
  "/swagger": {
    title: "Swagger OpenAPI",
    description: "Visualização interativa da especificação OpenAPI completa.",
  },
};

export function Header({ isDarkMode, setIsDarkMode }: HeaderProps) {
  const location = useLocation();

  const basePath = "/" + location.pathname.split("/").filter(Boolean)[0] || "/";
  const meta = ROUTE_META[location.pathname] ??
    ROUTE_META[basePath] ?? {
      title: "Endpoints BASA — API Reference",
      description: `${getTotalEndpoints()} endpoints de ${getTotalPartners()} parceiros.`,
    };

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 md:gap-0">
      <div className="text-center md:text-left pl-12 md:pl-0 w-full max-w-full">
        <h1 className="text-3xl font-light text-white mb-2 wrap-break-word">
          {meta.title}
        </h1>
        <p className="text-white text-sm wrap-break-word">{meta.description}</p>
      </div>
      <div className="flex items-center justify-center gap-2 shrink-0">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsDarkMode(!isDarkMode)}
          title={
            isDarkMode ? "Mudar para modo claro" : "Mudar para modo escuro"
          }
          className="cursor-pointer"
        >
          {isDarkMode ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
