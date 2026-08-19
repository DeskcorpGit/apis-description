import type { ApiParameter } from '@/types/api';

interface BuildCurlOptions {
  method: string;
  baseUrl?: string;
  path: string;
  hasBody: boolean;
  requestBody?: string;
  parameters?: ApiParameter[];
}

function getDummyParamValue(param: ApiParameter): unknown {
  if (param.type === 'number') {
    return 0;
  }
  if (param.type === 'boolean') {
    return true;
  }
  return `<${param.name}>`;
}

function buildDummyPayload(params: ApiParameter[]): Record<string, unknown> {
  const dummyObj: Record<string, unknown> = {};
  for (const p of params) {
    dummyObj[p.name] = getDummyParamValue(p);
  }
  return dummyObj;
}

function resolveBodyString(
  requestBody?: string,
  parameters?: ApiParameter[],
): string {
  if (requestBody) {
    return requestBody;
  }

  const bodyParams = parameters?.filter((p) => p.in === 'body');
  if (bodyParams && bodyParams.length > 0) {
    return JSON.stringify(buildDummyPayload(bodyParams), null, 2);
  }

  const payloadCandidates = parameters?.filter(
    (p) => p.in !== 'header' && p.in !== 'path',
  );
  if (payloadCandidates && payloadCandidates.length > 0) {
    return JSON.stringify(buildDummyPayload(payloadCandidates), null, 2);
  }

  return '{ ... }';
}

function buildQueryString(parameters?: ApiParameter[]): string {
  const queryParams = parameters?.filter((p) => p.in === 'query');
  if (!queryParams || queryParams.length === 0) {
    return '';
  }
  const qParts = queryParams.map((p) => `${p.name}=<${p.name}>`);
  return `?${qParts.join('&')}`;
}

function buildHeaderFlags(parameters?: ApiParameter[]): string {
  const ignoredHeaders = new Set(['authorization', 'accept', 'content-type']);
  const extraHeaders = parameters?.filter(
    (p) => p.in === 'header' && !ignoredHeaders.has(p.name.toLowerCase()),
  );

  if (!extraHeaders || extraHeaders.length === 0) {
    return '';
  }

  let flags = '';
  for (const h of extraHeaders) {
    const headerVal =
      h.name === 'Chave-Idempotencia' ? '<idempotency-key>' : `<${h.name}>`;
    flags += ` \\\n  -H '${h.name}: ${headerVal}'`;
  }
  return flags;
}

function formatPayloadBody(
  bodyString: string,
  isFormUrlEncoded: boolean,
): string {
  if (isFormUrlEncoded) {
    return ` \\\n  -d '${bodyString}'`;
  }

  const lines = bodyString.split('\n');
  if (lines.length <= 1) {
    return ` \\\n  -d '${bodyString}'`;
  }

  const indented = lines
    .map((line, idx) => (idx === 0 ? line : `  ${line}`))
    .join('\n');
  return ` \\\n  -d '${indented}'`;
}

function resolveContentType(parameters?: ApiParameter[]): {
  contentType: string;
  isFormUrlEncoded: boolean;
} {
  const contentTypeHeader = parameters?.find(
    (p) => p.in === 'header' && p.name.toLowerCase() === 'content-type',
  );
  const contentType = contentTypeHeader?.description || 'application/json';
  const isFormUrlEncoded = contentType.includes('x-www-form-urlencoded');
  return { contentType, isFormUrlEncoded };
}

export function buildCurlExample({
  method,
  baseUrl,
  path,
  hasBody,
  requestBody,
  parameters,
}: BuildCurlOptions): string {
  const queryString = buildQueryString(parameters);
  const rawUrl = baseUrl ? `${baseUrl}${path}` : path;
  const fullUrl = `${rawUrl}${queryString}`;

  let curl = `curl -X ${method} \\\n  '${fullUrl}' \\\n  -H 'Authorization: Bearer <token>' \\\n  -H 'Accept: application/json'`;
  curl += buildHeaderFlags(parameters);

  const isPayloadMethod = ['POST', 'PUT', 'PATCH'].includes(
    method.toUpperCase(),
  );

  if (isPayloadMethod || hasBody || Boolean(requestBody)) {
    const { contentType, isFormUrlEncoded } = resolveContentType(parameters);
    curl += ` \\\n  -H 'Content-Type: ${contentType}'`;
    const bodyString = resolveBodyString(requestBody, parameters);
    curl += formatPayloadBody(bodyString, isFormUrlEncoded);
  }

  return curl;
}
