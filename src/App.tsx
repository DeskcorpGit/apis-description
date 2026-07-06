import { ApiDocumentationCard } from "@/components/ApiDocumentationCard"
import { basaApiSections } from "@/data/basa-drop1-apis"

function App() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 flex flex-col items-center gap-8">
      <header className="text-center space-y-2 max-w-6xl w-full">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Runbook de Testes Técnicos BASA — Drop 1
        </h1>
        <p className="text-sm text-muted-foreground">
          Documentação de {basaApiSections.reduce((acc, s) => acc + s.endpoints.length, 0)} endpoints
          extraídos de {basaApiSections.length} seções
        </p>
      </header>

      {basaApiSections.map((section) => (
        <ApiDocumentationCard
          key={section.title}
          apiData={section}
        />
      ))}
    </div>
  )
}

export default App
