import type { PostmanRequest } from '@/types/postman';

export function tryParseJson(rawContent: string): {
  parsed: unknown;
  isJson: boolean;
} {
  try {
    return { parsed: JSON.parse(rawContent), isJson: true };
  } catch {
    return { parsed: rawContent, isJson: false };
  }
}

export function buildRawRequestBody(rawContent: string): Record<string, unknown> {
  const { parsed, isJson } = tryParseJson(rawContent);
  const isJsonObject =
    isJson && typeof parsed === 'object' && !Array.isArray(parsed);
  const contentType = isJson ? 'application/json' : 'text/plain';

  return {
    required: true,
    content: {
      [contentType]: {
        schema: {
          type: isJsonObject ? 'object' : 'string',
        },
        example: parsed,
      },
    },
  };
}

export function buildUrlEncodedRequestBody(
  urlencoded: Array<{ key: string; value?: string; description?: string }>,
): Record<string, unknown> {
  const properties: Record<string, unknown> = {};

  for (const field of urlencoded) {
    if (field.key) {
      properties[field.key] = {
        type: 'string',
        example: field.value || undefined,
        description: field.description || undefined,
      };
    }
  }

  return {
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties,
        },
      },
    },
  };
}

export function buildFormDataRequestBody(
  formdata: Array<{
    key: string;
    value?: string;
    type?: string;
    description?: string;
  }>,
): Record<string, unknown> {
  const properties: Record<string, unknown> = {};

  for (const field of formdata) {
    if (field.key) {
      properties[field.key] = {
        type: 'string',
        format: field.type === 'file' ? 'binary' : undefined,
        example: field.value || undefined,
        description: field.description || undefined,
      };
    }
  }

  return {
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          properties,
        },
      },
    },
  };
}

export function buildRequestBody(
  request: PostmanRequest,
  method: string,
): Record<string, unknown> | undefined {
  if (!request.body || !['post', 'put', 'patch'].includes(method)) {
    return undefined;
  }

  const { mode, raw, urlencoded, formdata } = request.body;

  if (mode === 'raw' && raw) {
    return buildRawRequestBody(raw);
  }

  if (mode === 'urlencoded' && Array.isArray(urlencoded)) {
    return buildUrlEncodedRequestBody(urlencoded);
  }

  if (mode === 'formdata' && Array.isArray(formdata)) {
    return buildFormDataRequestBody(formdata);
  }

  return undefined;
}
