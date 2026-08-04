import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

interface QuickAccessCardProps {
  label: string;
  description: string;
  to: string;
  icon: LucideIcon;
  gradient: string;
}

export function QuickAccessCard({
  label,
  description,
  to,
  icon: Icon,
  gradient,
}: QuickAccessCardProps) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-4 rounded-2xl border border-border/50
        bg-card p-5 transition-all duration-300
        hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20
        hover:-translate-y-0.5 hover:border-border no-underline"
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl
          bg-linear-to-br ${gradient} text-white shadow-md
          group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="h-5 w-5" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground text-sm">{label}</h3>
        <p className="text-xs text-muted-foreground truncate mt-0.5">
          {description}
        </p>
      </div>

      <ArrowRight
        className="h-4 w-4 shrink-0 text-muted-foreground
          group-hover:text-foreground group-hover:translate-x-1
          transition-all duration-300"
      />
    </Link>
  );
}
