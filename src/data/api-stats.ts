import { allApiSections } from "@/data";
import type { ApiData } from "@/types/api";
import type { PartnerInfo, EndpointWithContext } from "@/types/partner";
import {
  PARTNER_META,
  DEFAULT_PARTNER_GRADIENT,
  DEFAULT_PARTNER_DESCRIPTION,
} from "@/data/partner-meta";

function resolvePartnerName(section: ApiData): string {
  const firstTag = section.endpoints[0]?.tags?.[0];
  return firstTag ?? "Outros";
}

export function getPartnerStats(): PartnerInfo[] {
  const partnerMap = new Map<string, { apiCount: number; endpointCount: number }>();

  for (const section of allApiSections) {
    const partnerName = resolvePartnerName(section);
    const existing = partnerMap.get(partnerName) ?? { apiCount: 0, endpointCount: 0 };
    existing.apiCount += 1;
    existing.endpointCount += section.endpoints.length;
    partnerMap.set(partnerName, existing);
  }

  return Array.from(partnerMap.entries()).map(([name, stats]) => {
    const meta = PARTNER_META[name] ?? {
      gradient: DEFAULT_PARTNER_GRADIENT,
      description: DEFAULT_PARTNER_DESCRIPTION,
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
  return allApiSections.reduce((acc, section) => acc + section.endpoints.length, 0);
}

export function getTotalPartners(): number {
  return getPartnerStats().length;
}

export function getApisByPartner(partner: string): ApiData[] {
  return allApiSections.filter(
    (section) => resolvePartnerName(section).toLowerCase() === partner.toLowerCase(),
  );
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

export function getEndpointsByMethod(method: string): EndpointWithContext[] {
  const normalizedMethod = method.toUpperCase();
  const results: EndpointWithContext[] = [];

  for (const section of allApiSections) {
    for (const endpoint of section.endpoints) {
      if (endpoint.method === normalizedMethod) {
        results.push({ sectionTitle: section.title, baseUrl: section.baseUrl, endpoint });
      }
    }
  }

  return results;
}

export function getMethodDistribution(): { method: string; count: number }[] {
  const distribution = new Map<string, number>();
  for (const section of allApiSections) {
    for (const endpoint of section.endpoints) {
      distribution.set(endpoint.method, (distribution.get(endpoint.method) ?? 0) + 1);
    }
  }
  return Array.from(distribution.entries())
    .map(([method, count]) => ({ method, count }))
    .sort((a, b) => b.count - a.count);
}
