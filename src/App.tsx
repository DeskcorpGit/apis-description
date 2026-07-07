import { useState, useMemo, useEffect } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { allApiSections } from "@/data";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { EndpointSection } from "@/components/api-documentation/EndpointSection";

function App() {
  const [showSwagger, setShowSwagger] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme === "dark";
      }
      return document.documentElement.classList.contains("dark");
    }
    return true;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const filteredSections = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return allApiSections;

    return allApiSections.reduce<typeof allApiSections>((acc, section) => {
      const matchesTitle = section.title.toLowerCase().includes(query);

      const filteredEndpoints = section.endpoints.filter(
        (ep) =>
          matchesTitle ||
          ep.path.toLowerCase().includes(query) ||
          ep.method.toLowerCase().includes(query) ||
          (ep.summary && ep.summary.toLowerCase().includes(query)) ||
          (ep.description && ep.description.toLowerCase().includes(query)),
      );

      if (filteredEndpoints.length > 0) {
        acc.push({ ...section, endpoints: filteredEndpoints });
      }

      return acc;
    }, []);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Sidebar
        sections={filteredSections}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="lg:ml-72 min-h-screen">
        <div className="bg-brand-green p-8 pl-16 lg:p-8 border-b border-black dark:border-white">
          <Header
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            showSwagger={showSwagger}
            setShowSwagger={setShowSwagger}
          />
        </div>

        <div className="p-6 lg:p-10 lg:pr-12">
          {showSwagger ? (
            <div className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-sm p-4 mb-8">
              <SwaggerUI url="/all-external-endpoints.openapi.json" />
            </div>
          ) : filteredSections.length === 0 ? (
            <div className="text-center text-muted-foreground mt-16">
              Nenhum endpoint encontrado para "{searchQuery}".
            </div>
          ) : (
            filteredSections.map((section) =>
              section.endpoints.map((endpoint, idx) => {
                const anchorId =
                  `${section.title}-${endpoint.method}-${endpoint.path}-${idx}`
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-");
                return (
                  <EndpointSection
                    key={anchorId}
                    sectionTitle={section.title}
                    endpoint={endpoint}
                    baseUrl={section.baseUrl}
                    anchorId={anchorId}
                  />
                );
              }),
            )
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
