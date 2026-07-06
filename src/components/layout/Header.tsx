import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Moon, Sun, BookOpen } from "lucide-react";
import { allApiSections } from "@/data";

export interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  showSwagger: boolean;
  setShowSwagger: (value: boolean) => void;
}

export function Header({
  isDarkMode,
  setIsDarkMode,
  searchQuery,
  setSearchQuery,
  showSwagger,
  setShowSwagger,
}: HeaderProps) {
  return (
    <div className="w-full flex flex-col items-center gap-8 bg-brand-green p-8">
      <header className="text-center space-y-4 w-full relative max-w-6xl">
        <div className="absolute right-0 top-0 hidden sm:flex gap-2">
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
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-center gap-4">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Endpoints BASA
            </h1>
            <div>
              <div className="flex gap-2 sm:hidden">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowSwagger(!showSwagger)}
                  title={
                    showSwagger
                      ? "Ver Documentação Interna"
                      : "Ver Swagger Open API"
                  }
                >
                  <BookOpen className="h-4 w-4 cursor-pointer" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  title={
                    isDarkMode
                      ? "Mudar para modo claro"
                      : "Mudar para modo escuro"
                  }
                >
                  {isDarkMode ? (
                    <Sun className="h-4 w-4 cursor-pointer" />
                  ) : (
                    <Moon className="h-4 w-4 cursor-pointer" />
                  )}
                </Button>
              </div>
            </div>
          </div>
          <p className="text-sm dark:text-muted-foreground text-[#cccccc]">
            Documentação de{" "}
            {allApiSections.reduce((acc, s) => acc + s.endpoints.length, 0)}{" "}
            endpoints extraídos de {allApiSections.length} seções
          </p>
        </div>

        {!showSwagger && (
          <div className="relative w-full max-w-6xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por endpoint, método ou título..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full bg-[#E1EBDE] dark:bg-[#1a1a1a] h-12"
            />
          </div>
        )}
      </header>
    </div>
  );
}
