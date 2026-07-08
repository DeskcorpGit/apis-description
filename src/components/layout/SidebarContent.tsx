import { useState } from "react";
import { allApiSections } from "@/data";
import type { ApiData } from "@/types/api";

import { SidebarNav } from "./SidebarNav";
import { SidebarSearch } from "./SidebarSearch";
import { SidebarEndpointList } from "./SidebarEndpointList";

export interface SidebarProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

export interface SidebarContentProps extends SidebarProps {
  setMobileOpen?: (open: boolean) => void;
}

export function SidebarContent({
  isDarkMode,
  setIsDarkMode,
  setMobileOpen,
}: SidebarContentProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSections = (() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return allApiSections;

    return allApiSections.reduce<ApiData[]>((acc, section) => {
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
  })();

  const handleLinkClick = () => {
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <>
      <SidebarNav
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onLinkClick={handleLinkClick}
      />
      <SidebarSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setMobileOpen={setMobileOpen}
      />
      <SidebarEndpointList
        sections={filteredSections}
        onLinkClick={handleLinkClick}
      />
    </>
  );
}
