const METHOD_STYLES: Record<string, string> = {
  GET: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  POST: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  PUT: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  PATCH:
    "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
  DELETE: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
};

const DEFAULT_STYLE =
  "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";

interface MethodBadgeProps {
  method: string;
  count: number;
}

export function MethodBadge({ method, count }: MethodBadgeProps) {
  const style = METHOD_STYLES[method] ?? DEFAULT_STYLE;

  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${style}
        transition-all duration-200 hover:scale-105`}
    >
      <span className="font-mono text-xs font-bold">{method}</span>
      <span className="text-xs opacity-70">×{count}</span>
    </div>
  );
}
