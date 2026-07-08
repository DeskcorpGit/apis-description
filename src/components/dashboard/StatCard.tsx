import { useEffect, useState, useRef } from "react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  gradient: string;
  suffix?: string;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  gradient,
  suffix,
}: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateCount();
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [value]);

  function animateCount() {
    const duration = 1200;
    const steps = 40;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      current = Math.round(eased * value);

      setDisplayValue(current);

      if (step >= steps) {
        setDisplayValue(value);
        clearInterval(timer);
      }
    }, duration / steps);
  }

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl border border-border/50
        bg-card/80 backdrop-blur-sm p-6 transition-all duration-300
        hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20
        hover:-translate-y-1 hover:border-border"
    >
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${gradient}
          opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
      />

      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-4xl font-bold tracking-tight text-foreground">
            {displayValue}
            {suffix && (
              <span className="text-lg text-muted-foreground ml-1">
                {suffix}
              </span>
            )}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl
            bg-linear-to-br ${gradient} text-white shadow-md
            group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
