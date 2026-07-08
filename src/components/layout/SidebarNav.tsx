import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, BookOpen, FileCode2, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/apis", label: "Documentação API", icon: BookOpen },
  { to: "/swagger", label: "Swagger OpenAPI", icon: FileCode2 },
] as const;

interface SidebarNavProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  onLinkClick: () => void;
}

export function SidebarNav({
  isDarkMode,
  setIsDarkMode,
  onLinkClick,
}: SidebarNavProps) {
  const location = useLocation();

  return (
    <div className="p-3 border-b border-border">
      <nav className="flex flex-col gap-0.5">
        {NAV_LINKS.map(({ to, label, icon: Icon }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              onClick={onLinkClick}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 no-underline",
                isActive
                  ? "bg-brand-green/10 text-brand-green dark:text-emerald-400 dark:bg-emerald-500/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{label}</span>
            </Link>
          );
        })}

        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
            text-muted-foreground hover:text-foreground hover:bg-muted/50
            transition-all duration-200 w-full cursor-pointer"
        >
          {isDarkMode ? (
            <Sun className="h-4 w-4 shrink-0" />
          ) : (
            <Moon className="h-4 w-4 shrink-0" />
          )}
          <span>{isDarkMode ? "Modo Claro" : "Modo Escuro"}</span>
        </button>
      </nav>
    </div>
  );
}
