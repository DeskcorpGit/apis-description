import YAML from 'yaml';

export function sanitizeFileName(
  name: string,
  fallbackFormat: 'json' | 'yaml' = 'yaml',
): string {
  const cleanName = name
    .trim()
    .replace(/\.postman_collection(?=\.json|\.yaml|\.yml|$)/i, '')
    .replace(/[^\w.-]/g, '')
    .replace(/\s+/g, '-');

  const extensionMatch = new RegExp(/\.(json|yaml|yml)$/i).exec(cleanName);
  if (extensionMatch) {
    return cleanName;
  }

  return `${cleanName || 'openapi-spec'}.${fallbackFormat}`;
}

export function parseSpecificationContent(
  content: string,
  isJsonFile: boolean,
): { parsed?: Record<string, unknown>; isJson: boolean; error?: string } {
  if (isJsonFile) {
    try {
      const parsed = JSON.parse(content) as Record<string, unknown>;
      return { parsed, isJson: true };
    } catch {
      try {
        const parsed = YAML.parse(content) as Record<string, unknown>;
        return { parsed, isJson: false };
      } catch {
        return {
          isJson: false,
          error: 'Formato inválido. O arquivo JSON possui erros de sintaxe.',
        };
      }
    }
  }

  try {
    const parsed = YAML.parse(content) as Record<string, unknown>;
    return { parsed, isJson: false };
  } catch {
    try {
      const parsed = JSON.parse(content) as Record<string, unknown>;
      return { parsed, isJson: true };
    } catch {
      return {
        isJson: false,
        error: 'Formato inválido. O arquivo YAML/JSON possui erros de sintaxe.',
      };
    }
  }
}
