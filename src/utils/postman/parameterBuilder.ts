import type { PostmanHeader, PostmanQueryParam } from '@/types/postman';
import { extractPathVariables } from './urlUtils';

export function buildPathParameters(
  pathVars: string[],
): Array<Record<string, unknown>> {
  return pathVars.map((name) => ({
    name,
    in: 'path',
    required: true,
    schema: { type: 'string' },
  }));
}

export function buildQueryParameters(
  queryParams: PostmanQueryParam[],
): Array<Record<string, unknown>> {
  return queryParams
    .filter((q) => Boolean(q.key))
    .map((q) => ({
      name: q.key,
      in: 'query',
      required: false,
      schema: { type: 'string' },
      description: q.description || undefined,
      example: q.value || undefined,
    }));
}

export function buildHeaderParameters(
  headers?: PostmanHeader[],
): Array<Record<string, unknown>> {
  if (!Array.isArray(headers)) return [];

  const ignoredHeaders = new Set(['content-type', 'accept']);

  return headers
    .filter((h) => Boolean(h.key) && !ignoredHeaders.has(h.key.toLowerCase()))
    .map((h) => ({
      name: h.key,
      in: 'header',
      required: false,
      schema: { type: 'string' },
      description: h.description || undefined,
      example: h.value || undefined,
    }));
}

export function buildAllParameters(
  path: string,
  queryParams: PostmanQueryParam[],
  headers?: PostmanHeader[],
): Array<Record<string, unknown>> {
  const pathParameters = buildPathParameters(extractPathVariables(path));
  const queryParameters = buildQueryParameters(queryParams);
  const headerParameters = buildHeaderParameters(headers);

  return [...pathParameters, ...queryParameters, ...headerParameters];
}
