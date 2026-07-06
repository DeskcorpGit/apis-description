import { useState, useMemo, useEffect } from "react"
import { ApiDocumentationCard } from "@/components/api-documentation"
import { allApiSections } from "@/data"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Moon, Sun } from "lucide-react"

function App() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme")
      if (savedTheme) {
        return savedTheme === "dark"
      }
      return document.documentElement.classList.contains("dark")
    }
    return true
  })

  useEffect(() => {
    const root = window.document.documentElement
    if (isDarkMode) {
      root.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      root.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [isDarkMode])

  const filteredSections = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return allApiSections;

    return allApiSections.reduce<typeof allApiSections>((acc, section) => {
      const matchesTitle = section.title.toLowerCase().includes(query);

      const filteredEndpoints = section.endpoints.filter(
        (ep) => matchesTitle ||
          ep.path.toLowerCase().includes(query) ||
          ep.method.toLowerCase().includes(query)
      );

      if (filteredEndpoints.length > 0) {
        acc.push({ ...section, endpoints: filteredEndpoints });
      }

      return acc;
    }, []);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center gap-8 transition-colors duration-300">
      <div className="w-full flex flex-col items-center gap-8 bg-brand-green p-8">
        <header className="text-center space-y-4 w-full relative max-w-6xl">
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-0 hidden sm:flex"
            onClick={() => setIsDarkMode(!isDarkMode)}
            title={isDarkMode ? "Mudar para modo claro" : "Mudar para modo escuro"}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-4">
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Endpoints BASA
              </h1>
              <Button
                variant="outline"
                size="icon"
                className="sm:hidden"
                onClick={() => setIsDarkMode(!isDarkMode)}
                title={isDarkMode ? "Mudar para modo claro" : "Mudar para modo escuro"}
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Documentação de {allApiSections.reduce((acc, s) => acc + s.endpoints.length, 0)} endpoints
              extraídos de {allApiSections.length} seções
            </p>
          </div>

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
        </header>
      </div>

      {filteredSections.length === 0 ? (
        <div className="text-center text-muted-foreground mt-8">
          Nenhum endpoint encontrado para "{searchQuery}".
        </div>
      ) : (
        <div className="w-full flex flex-col items-center gap-8 md:px-4 px-8 xl:px-16">
          {filteredSections.map((section) => (
            <ApiDocumentationCard
              key={section.title}
              apiData={section}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
