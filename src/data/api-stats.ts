import { allApiSections } from "@/data";
import type { ApiData } from "@/types/api";

export interface PartnerInfo {
  id: string;
  name: string;
  apiCount: number;
  endpointCount: number;
  gradient: string;
  description: string;
}

const PARTNER_META: Record<string, { gradient: string; description: string }> =
  {
    Corebanx: {
      gradient: "from-emerald-500 to-teal-600",
      description: "Onboarding, compliance e gestão de entidades",
    },
    Transact: {
      gradient: "from-blue-500 to-indigo-600",
      description: "Core bancário, contas, customers e cadastro base",
    },
    AuthCube: {
      gradient: "from-violet-500 to-purple-600",
      description: "Autenticação OAuth2 e recuperação de senha",
    },
    Fabric: {
      gradient: "from-amber-500 to-orange-600",
      description: "Identity, CMS, beneficiários e integração",
    },
    IDVerse: {
      gradient: "from-rose-500 to-pink-600",
      description: "Verificação facial e escaneamento de documentos",
    },
    Neobiz: {
      gradient: "from-cyan-500 to-sky-600",
      description: "Documentação, termos e consultas de endereço",
    },
  };

const DEFAULT_GRADIENT = "from-gray-500 to-slate-600";

function getPartnerFromSection(section: ApiData): string {
  const firstEndpoint = section.endpoints[0];
  if (firstEndpoint?.tags && firstEndpoint.tags.length > 0) {
    return firstEndpoint.tags[0];
  }
  return "Outros";
}

export function getPartnerStats(): PartnerInfo[] {
  const partnerMap = new Map<
    string,
    { apiCount: number; endpointCount: number }
  >();

  for (const section of allApiSections) {
    const partner = getPartnerFromSection(section);
    const existing = partnerMap.get(partner) ?? {
      apiCount: 0,
      endpointCount: 0,
    };
    existing.apiCount += 1;
    existing.endpointCount += section.endpoints.length;
    partnerMap.set(partner, existing);
  }

  return Array.from(partnerMap.entries()).map(([name, stats]) => {
    const meta = PARTNER_META[name] ?? {
      gradient: DEFAULT_GRADIENT,
      description: "APIs e serviços diversos",
    };

    return {
      id: name.toLowerCase(),
      name,
      apiCount: stats.apiCount,
      endpointCount: stats.endpointCount,
      gradient: meta.gradient,
      description: meta.description,
    };
  });
}

export function getTotalApis(): number {
  return allApiSections.length;
}

export function getTotalEndpoints(): number {
  return allApiSections.reduce(
    (acc, section) => acc + section.endpoints.length,
    0,
  );
}

export function getTotalPartners(): number {
  return getPartnerStats().length;
}

export function getApisByPartner(partner: string): ApiData[] {
  return allApiSections.filter((section) => {
    const sectionPartner = getPartnerFromSection(section);
    return sectionPartner.toLowerCase() === partner.toLowerCase();
  });
}

export function getUniqueHttpMethods(): string[] {
  const methods = new Set<string>();
  for (const section of allApiSections) {
    for (const endpoint of section.endpoints) {
      methods.add(endpoint.method);
    }
  }
  return Array.from(methods);
}

export function getMethodDistribution(): { method: string; count: number }[] {
  const distribution = new Map<string, number>();
  for (const section of allApiSections) {
    for (const endpoint of section.endpoints) {
      distribution.set(
        endpoint.method,
        (distribution.get(endpoint.method) ?? 0) + 1,
      );
    }
  }
  return Array.from(distribution.entries())
    .map(([method, count]) => ({ method, count }))
    .sort((a, b) => b.count - a.count);
}
