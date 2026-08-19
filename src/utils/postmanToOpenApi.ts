import YAML from 'yaml';
import type {
  PostmanCollection,
  PostmanConvertedResult,
  PostmanItem,
} from '@/types/postman';
import { buildOperation } from './postman/responseBuilder';
import {
  extractDiscoveredHosts,
  extractUrlAndQueryParams,
  normalizePath,
} from './postman/urlUtils';

function processPostmanItem(
  item: PostmanItem,
  parentTags: string[],
  paths: Record<string, Record<string, unknown>>,
  discoveredHosts: Set<string>,
): void {
  if (Array.isArray(item.item)) {
    const currentTag = item.name?.trim() || 'Geral';
    const nextTags = [...parentTags, currentTag];
    for (const subItem of item.item) {
      processPostmanItem(subItem, nextTags, paths, discoveredHosts);
    }
    return;
  }

  if (!item.request) {
    return;
  }

  const request = item.request;
  const method = (request.method || 'GET').toLowerCase();
  const { rawUrl } = extractUrlAndQueryParams(request, item.name);
  const { path, host } = normalizePath(rawUrl);

  if (host) {
    discoveredHosts.add(host);
  }

  if (!paths[path]) {
    paths[path] = {};
  }

  paths[path][method] = buildOperation(item, request, method, path, parentTags);
}

export function convertPostmanToOpenApi(
  collection: PostmanCollection,
  outputFormat: 'yaml' | 'json' = 'yaml',
): PostmanConvertedResult {
  const title = collection.info?.name?.trim() || 'Postman Converted API';
  const description =
    collection.info?.description?.trim() ||
    'API convertida a partir de Collection Postman.';
  const version = collection.info?.version?.trim() || '1.0.0';

  const paths: Record<string, Record<string, unknown>> = {};
  const discoveredHosts = extractDiscoveredHosts(collection.variable);

  if (Array.isArray(collection.item)) {
    for (const rootItem of collection.item) {
      processPostmanItem(rootItem, [], paths, discoveredHosts);
    }
  }

  const servers =
    discoveredHosts.size > 0
      ? Array.from(discoveredHosts).map((url) => ({ url }))
      : [{ url: 'https://api.example.com' }];

  const openApiDoc = {
    openapi: '3.0.3',
    info: { title, description, version },
    servers,
    paths,
  };

  const content =
    outputFormat === 'json'
      ? JSON.stringify(openApiDoc, null, 2)
      : YAML.stringify(openApiDoc);

  return {
    content,
    title,
    version,
  };
}

export { isPostmanCollection } from './postman/urlUtils';
