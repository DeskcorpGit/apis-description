import type { PostmanItem, PostmanRequest, PostmanResponse } from '@/types/postman';
import { buildRequestBody, tryParseJson } from './bodyBuilder';
import { buildAllParameters } from './parameterBuilder';
import { extractUrlAndQueryParams } from './urlUtils';

export function buildSingleResponse(res: PostmanResponse): Record<string, unknown> {
  const description = res.status || res.name || 'Resposta da requisição';

  if (!res.body) {
    return { description };
  }

  const { parsed, isJson } = tryParseJson(res.body);
  const contentType = isJson ? 'application/json' : 'text/plain';

  return {
    description,
    content: {
      [contentType]: {
        schema: { type: isJson ? 'object' : 'string' },
        example: parsed,
      },
    },
  };
}

export function buildResponses(
  responses?: PostmanResponse[],
): Record<string, unknown> {
  if (!Array.isArray(responses) || responses.length === 0) {
    return {
      '200': {
        description: 'Operação realizada com sucesso.',
      },
    };
  }

  const result: Record<string, unknown> = {};

  for (const res of responses) {
    const statusCode = String(res.code || 200);
    result[statusCode] = buildSingleResponse(res);
  }

  return result;
}

export function buildOperation(
  item: PostmanItem,
  request: PostmanRequest,
  method: string,
  path: string,
  parentTags: string[],
): Record<string, unknown> {
  const { queryParams } = extractUrlAndQueryParams(request, item.name);
  const parameters = buildAllParameters(path, queryParams, request.header);
  const requestBody = buildRequestBody(request, method);
  const responses = buildResponses(item.response);

  return {
    summary: item.name || `${method.toUpperCase()} ${path}`,
    description: request.description || item.description || undefined,
    tags: parentTags.length > 0 ? [parentTags.at(-1)] : undefined,
    parameters: parameters.length > 0 ? parameters : undefined,
    requestBody,
    responses,
  };
}
