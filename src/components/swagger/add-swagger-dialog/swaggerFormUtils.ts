import type { AddSwaggerFormState } from '@/types/addSwagger';
import { sanitizeFileName, validateOpenApiFile } from '@/utils/openApiValidation';

export const INITIAL_SWAGGER_FORM_STATE: AddSwaggerFormState = {
  title: '',
  fileName: '',
  fileContent: '',
  format: 'yaml',
  specType: '',
  version: '',
  convertedFromPostman: false,
};

export function formatFileSize(bytes: number): string {
  if (bytes > 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }
  return `${(bytes / 1024).toFixed(1)} KB`;
}

export function buildValidationBadge(specInfo: {
  convertedFromPostman?: boolean;
  format: string;
  specType: string;
  version: string;
}): string {
  if (specInfo.convertedFromPostman) {
    return `Postman → OpenAPI 3.0.3 (${specInfo.format.toUpperCase()})`;
  }
  return `${specInfo.specType.toUpperCase()} ${specInfo.version} (${specInfo.format.toUpperCase()})`;
}

export function processSpecFileContent(
  file: File,
  content: string,
): {
  isValid: boolean;
  error?: string;
  formUpdates?: Partial<AddSwaggerFormState>;
  badgeLabel?: string;
  sizeFormatted: string;
} {
  const validation = validateOpenApiFile(content, file.name);
  const sizeFormatted = formatFileSize(file.size);

  if (!validation.isValid || !validation.specInfo) {
    return {
      isValid: false,
      error: validation.error || 'Arquivo de especificação inválido.',
      sizeFormatted,
    };
  }

  const finalContent =
    validation.specInfo.convertedFromPostman &&
    validation.specInfo.convertedContent
      ? validation.specInfo.convertedContent
      : content;

  const badgeLabel = buildValidationBadge(validation.specInfo);
  const generatedFileName = sanitizeFileName(
    file.name,
    validation.specInfo.format,
  );

  return {
    isValid: true,
    badgeLabel,
    sizeFormatted,
    formUpdates: {
      title: validation.specInfo.title,
      fileName: generatedFileName,
      fileContent: finalContent,
      format: validation.specInfo.format,
      specType: validation.specInfo.specType,
      version: validation.specInfo.version,
      convertedFromPostman: Boolean(validation.specInfo.convertedFromPostman),
    },
  };
}
