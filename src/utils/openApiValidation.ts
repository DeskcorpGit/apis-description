import type { SwaggerValidationResult } from '@/types/addSwagger';
import { parseSpecificationContent } from '@/utils/openApi/openApiSanitize';
import {
  convertPostmanToOpenApi,
  isPostmanCollection,
} from '@/utils/postmanToOpenApi';

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

function validateSpecStructure(parsed: Record<string, unknown>): {
  isValid: boolean;
  error?: string;
} {
  const hasOpenApi =
    typeof parsed.openapi === 'string' && parsed.openapi.trim().length > 0;
  const hasSwagger =
    parsed.swagger === '2.0' ||
    parsed.swagger === 2.0 ||
    parsed.swagger === '2';

  if (!hasOpenApi && !hasSwagger) {
    return {
      isValid: false,
      error:
        'O arquivo não é uma especificação OpenAPI (3.x), Swagger (2.0) ou Postman Collection reconhecida.',
    };
  }

  const info = parsed.info as Record<string, unknown> | undefined;
  if (!info || typeof info !== 'object' || Array.isArray(info)) {
    return {
      isValid: false,
      error: 'O campo obrigatório "info" não foi encontrado na especificação.',
    };
  }

  if (typeof info.title !== 'string' || !info.title.trim()) {
    return {
      isValid: false,
      error: 'O campo "info.title" é obrigatório e deve ser um texto válido.',
    };
  }

  const version = info.version;
  if (
    (typeof version !== 'string' && typeof version !== 'number') ||
    String(version).trim().length === 0
  ) {
    return {
      isValid: false,
      error: 'O campo "info.version" é obrigatório na especificação.',
    };
  }

  const hasPaths =
    parsed.paths !== undefined &&
    typeof parsed.paths === 'object' &&
    parsed.paths !== null;
  const hasComponents =
    parsed.components !== undefined &&
    typeof parsed.components === 'object' &&
    parsed.components !== null;
  const hasDefinitions =
    parsed.definitions !== undefined &&
    typeof parsed.definitions === 'object' &&
    parsed.definitions !== null;

  if (!hasPaths && !hasComponents && !hasDefinitions) {
    return {
      isValid: false,
      error:
        'A especificação deve conter pelo menos uma seção "paths", "components" ou "definitions".',
    };
  }

  return { isValid: true };
}

export function validateOpenApiFile(
  content: string,
  fileName: string = '',
): SwaggerValidationResult {
  if (!content?.trim()) {
    return { isValid: false, error: 'O arquivo está vazio.' };
  }

  const byteLength = new TextEncoder().encode(content).length;
  if (byteLength > MAX_FILE_SIZE_BYTES) {
    return {
      isValid: false,
      error: 'O arquivo excede o limite máximo permitido de 10MB.',
    };
  }

  if (
    /<script\b[^>]*>([\s\S]*?)<\/script>/gi.test(content) ||
    /javascript:/gi.test(content)
  ) {
    return {
      isValid: false,
      error: 'O arquivo contém scripts ou conteúdo não permitido.',
    };
  }

  const isJsonFile =
    fileName.toLowerCase().endsWith('.json') || content.trim().startsWith('{');
  const parseResult = parseSpecificationContent(content, isJsonFile);

  if (parseResult.error || !parseResult.parsed) {
    return {
      isValid: false,
      error: parseResult.error || 'Erro ao processar o arquivo.',
    };
  }

  const parsed = parseResult.parsed;
  if (typeof parsed !== 'object' || Array.isArray(parsed)) {
    return {
      isValid: false,
      error: 'Estrutura inválida. A especificação raiz deve ser um objeto.',
    };
  }

  if (isPostmanCollection(parsed)) {
    const converted = convertPostmanToOpenApi(parsed, 'yaml');
    return {
      isValid: true,
      specInfo: {
        title: converted.title,
        version: converted.version,
        specType: 'postman',
        format: 'yaml',
        convertedFromPostman: true,
        convertedContent: converted.content,
      },
    };
  }

  const structureValidation = validateSpecStructure(parsed);
  if (!structureValidation.isValid) {
    return { isValid: false, error: structureValidation.error };
  }

  const info = parsed.info as Record<string, unknown>;
  const hasOpenApi =
    typeof parsed.openapi === 'string' && parsed.openapi.trim().length > 0;

  return {
    isValid: true,
    specInfo: {
      title: String(info.title).trim(),
      version: String(info.version).trim(),
      specType: hasOpenApi ? 'openapi' : 'swagger',
      format: parseResult.isJson ? 'json' : 'yaml',
    },
  };
}

export { sanitizeFileName } from '@/utils/openApi/openApiSanitize';
