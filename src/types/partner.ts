import type { ApiEndpoint } from "@/types/api";

export interface PartnerInfo {
  id: string;
  name: string;
  apiCount: number;
  endpointCount: number;
  gradient: string;
  description: string;
}

export interface EndpointWithContext {
  sectionTitle: string;
  baseUrl?: string;
  endpoint: ApiEndpoint;
}
