import { Button } from "@/components/ui/button";
import { Moon, Sun, BookOpen } from "lucide-react";
import { allApiSections } from "@/data";

export interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  showSwagger: boolean;
  setShowSwagger: (value: boolean) => void;
}

export function Header({
  isDarkMode,
  setIsDarkMode,
  showSwagger,
  setShowSwagger,
}: HeaderProps) {
  const totalEndpoints = allApiSections.reduce(
    (acc, s) => acc + s.endpoints.length,
    0,
  );

  return (
    <div className="flex justify-between items-end">
      <div>
        <h1 className="text-3xl font-light text-white mb-2">
          Endpoints BASA — API Reference
        </h1>
        <p className="text-white text-sm">
          Documentação de {totalEndpoints} endpoints extraídos de{" "}
          {allApiSections.length} seções. Navegue pela sidebar ou use a busca
          para encontrar o endpoint desejado.
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowSwagger(!showSwagger)}
          title={
            showSwagger ? "Ver Documentação Interna" : "Ver Swagger Open API"
          }
          disabled
        >
          <BookOpen className="h-4 w-4" />
        </Button>
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
