import { useState, useMemo, useEffect } from "react"
import { ApiDocumentationCard } from "@/components/api-documentation"
import { allApiSections } from "@/data"
import { Header } from "@/components/layout/Header"

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
      <Header
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

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
