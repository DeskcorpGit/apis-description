import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Layers,
  GitBranch,
  Users,
  BookOpen,
  FileCode2,
  ArrowRight,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { PartnerGrid } from "@/components/dashboard/PartnerGrid";
import { QuickAccessCard } from "@/components/dashboard/QuickAccessCard";
import { MethodBadge } from "@/components/dashboard/MethodBadge";
import {
  getTotalApis,
  getTotalEndpoints,
  getTotalPartners,
  getPartnerStats,
  getMethodDistribution,
} from "@/data/api-stats";

export function DashboardPage() {
  const totalApis = useMemo(() => getTotalApis(), []);
  const totalEndpoints = useMemo(() => getTotalEndpoints(), []);
  const totalPartners = useMemo(() => getTotalPartners(), []);
  const partners = useMemo(() => getPartnerStats(), []);
  const methodDistribution = useMemo(() => getMethodDistribution(), []);

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
          Dashboard
        </h1>
        <p className="text-muted-foreground text-sm max-w-2xl">
          Visão geral de todas as APIs cadastradas, organizadas por parceiro.
          Navegue rapidamente para a documentação de cada integração.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          label="APIs Cadastradas"
          value={totalApis}
          icon={Layers}
          gradient="from-emerald-500 to-teal-600"
        />
        <StatCard
          label="Total de Endpoints"
          value={totalEndpoints}
          icon={GitBranch}
          gradient="from-blue-500 to-indigo-600"
        />
        <StatCard
          label="Parceiros Integrados"
          value={totalPartners}
          icon={Users}
          gradient="from-violet-500 to-purple-600"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              APIs por Parceiro
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Clique em um parceiro para ver seus endpoints
            </p>
          </div>
          <Link
            to="/apis"
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground
              hover:text-foreground transition-colors no-underline"
          >
            Ver todos
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <PartnerGrid partners={partners} />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Distribuição por Método HTTP
        </h2>
        <div className="flex flex-wrap gap-3">
          {methodDistribution.map(({ method, count }) => (
            <MethodBadge key={method} method={method} count={count} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Acesso Rápido
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <QuickAccessCard
            label="Documentação Completa"
            description="Ver todos os endpoints de todas as APIs"
            to="/apis"
            icon={BookOpen}
            gradient="from-emerald-500 to-teal-600"
          />
          <QuickAccessCard
            label="Swagger OpenAPI"
            description="Visualização interativa via Swagger UI"
            to="/swagger"
            icon={FileCode2}
            gradient="from-blue-500 to-indigo-600"
          />
        </div>
      </div>
    </div>
  );
}
