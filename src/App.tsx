import { useState, useMemo } from "react"
import { ApiDocumentationCard } from "@/components/api-documentation"
import { basaApiSections } from "@/data/basa-drop1-apis"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

function App() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSections = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return basaApiSections;

    return basaApiSections.reduce((acc, section) => {
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
    <div className="min-h-screen bg-background py-12 px-4 flex flex-col items-center gap-8">
      <header className="text-center space-y-4 w-full">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Runbook de Testes Técnicos BASA — Drop 1
          </h1>
          <p className="text-sm text-muted-foreground">
            Documentação de {basaApiSections.reduce((acc, s) => acc + s.endpoints.length, 0)} endpoints
            extraídos de {basaApiSections.length} seções
          </p>
        </div>

        <div className="relative w-full max-w-6xl mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por endpoint, método ou título..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full bg-card"
          />
        </div>
      </header>

      {filteredSections.length === 0 ? (
        <div className="text-center text-muted-foreground mt-8">
          Nenhum endpoint encontrado para "{searchQuery}".
        </div>
      ) : (
        <div className="w-full flex flex-col items-center gap-8">
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
