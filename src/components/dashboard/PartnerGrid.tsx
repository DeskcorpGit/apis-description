import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { PartnerInfo } from "@/types/partner";

interface PartnerGridProps {
  partners: PartnerInfo[];
}

export function PartnerGrid({ partners }: PartnerGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {partners.map((partner) => (
        <Link
          key={partner.id}
          to={`/apis/${partner.id}`}
          className="group relative overflow-hidden rounded-2xl border border-border/50
            bg-card/80 backdrop-blur-sm p-5 transition-all duration-300
            hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20
            hover:-translate-y-1 hover:border-border no-underline"
        >
          <div
            className={`absolute inset-0 bg-linear-to-br ${partner.gradient}
              opacity-0 group-hover:opacity-[0.04] dark:group-hover:opacity-[0.08]
              transition-opacity duration-300`}
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`h-10 w-10 rounded-xl bg-linear-to-br ${partner.gradient}
                    flex items-center justify-center text-white font-bold text-sm
                    shadow-md group-hover:scale-110 transition-transform duration-300`}
                >
                  {partner.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">
                    {partner.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {partner.apiCount} {partner.apiCount === 1 ? "API" : "APIs"}
                  </p>
                </div>
              </div>

              <ArrowRight
                className="h-4 w-4 text-muted-foreground
                  group-hover:text-foreground group-hover:translate-x-1
                  transition-all duration-300"
              />
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
              {partner.description}
            </p>

            <div className="mt-4 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full bg-linear-to-r ${partner.gradient} rounded-full
                    transition-all duration-700 ease-out`}
                  style={{
                    width: `${Math.min((partner.endpointCount / 10) * 100, 100)}%`,
                  }}
                />
              </div>
              <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">
                {partner.endpointCount} endpoints
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
