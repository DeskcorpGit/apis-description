import type {
  PostmanCollection,
  PostmanQueryParam,
  PostmanRequest,
} from '@/types/postman';

export function isPostmanCollection(
  parsed: unknown,
): parsed is PostmanCollection {
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return false;
  }

  const candidate = parsed as Record<string, unknown>;

  if ('openapi' in candidate || 'swagger' in candidate) {
    return false;
  }

  const info = candidate.info as Record<string, unknown> | undefined;
  const hasPostmanSchema =
    typeof info?.schema === 'string' &&
    info.schema.includes('schema.getpostman.com');
  const hasPostmanId = typeof info?._postman_id === 'string';
  const hasItemsArray = Array.isArray(candidate.item);

  return (hasPostmanSchema || hasPostmanId) && hasItemsArray;
}

export function normalizePath(rawUrl: string): { path: string; host?: string } {
  let cleaned = rawUrl.trim();
  let host: string | undefined;

  const urlPattern = /^(https?:\/\/[^/]+)(\/.*)?$/i;
  const match = urlPattern.exec(cleaned);

  if (match) {
    host = match[1];
    cleaned = match[2] || '/';
  } else {
    cleaned = cleaned.replace(/^\{\{[^}]+\}\}/, '');
  }

  cleaned = cleaned.split('?')[0];
  cleaned = cleaned.replace(/:(\w+)/g, '{$1}');
  cleaned = cleaned.replace(/\{\{(\w+)\}\}/g, '{$1}');

  if (!cleaned.startsWith('/')) {
    cleaned = `/${cleaned}`;
  }

  return { path: cleaned, host };
}

export function extractPathVariables(path: string): string[] {
  const matches = path.match(/\{([^}]+)\}/g);
  if (!matches) return [];
  return Array.from(new Set(matches.map((m) => m.slice(1, -1))));
}

export function generateFallbackUrl(itemName?: string): string {
  const slug =
    itemName?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'endpoint';
  return `/${slug}`;
}

export function extractUrlAndQueryParams(
  request: PostmanRequest,
  itemName?: string,
): { rawUrl: string; queryParams: PostmanQueryParam[] } {
  if (typeof request.url === 'string') {
    return { rawUrl: request.url, queryParams: [] };
  }

  if (request.url && typeof request.url === 'object') {
    const rawUrl =
      request.url.raw ||
      (Array.isArray(request.url.path) ? `/${request.url.path.join('/')}` : '');
    const queryParams = Array.isArray(request.url.query)
      ? request.url.query
      : [];
    return {
      rawUrl: rawUrl || generateFallbackUrl(itemName),
      queryParams,
    };
  }

  return { rawUrl: generateFallbackUrl(itemName), queryParams: [] };
}

export function extractDiscoveredHosts(
  variables?: Array<{ key: string; value?: string }>,
): Set<string> {
  const hosts = new Set<string>();
  if (!Array.isArray(variables)) return hosts;

  const validHostKeys = new Set(['baseUrl', 'host', 'url']);

  for (const v of variables) {
    if (validHostKeys.has(v.key) && v.value && /^https?:\/\//i.test(v.value)) {
      hosts.add(v.value.trim());
    }
  }

  return hosts;
}
