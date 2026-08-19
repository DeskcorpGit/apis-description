import type { NewSwaggerSpecEntry } from '@/types/github';

export function generateImportIdentifier(fileName: string): string {
  const baseName = fileName.replace(/\.(json|yaml|yml)$/i, '');
  const clean = baseName
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr: string) => chr.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, '');

  if (!clean) {
    return 'apiSpec';
  }

  return clean.charAt(0).toLowerCase() + clean.slice(1);
}

export function createSwaggerBranchName(
  title: string,
  timestamp: number = Date.now(),
): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `add-spec/${slug || 'new-spec'}-${timestamp}`;
}

export function createSwaggerCommitMessage(
  title: string,
  fileName: string,
): string {
  return `docs(apis): add ${title} specification (${fileName})`;
}

export function createSwaggerIndexCommitMessage(title: string): string {
  return `docs(apis): register ${title} in allApisDocCollections`;
}

export function createSwaggerPullRequestTitle(title: string): string {
  return `docs: adicionar especificação ${title}`;
}

export function createSwaggerPullRequestBody(
  entry: NewSwaggerSpecEntry,
  specInfo?: { specType?: string; version?: string },
): string {
  return [
    '## Nova Especificação OpenAPI / Swagger cadastrada via interface',
    '',
    '| Campo | Valor |',
    '|---|---|',
    `| **Título da API** | ${entry.title} |`,
    `| **Arquivo** | \`apis/${entry.fileName}\` |`,
    `| **Tipo de Especificação** | ${specInfo?.specType?.toUpperCase() ?? 'OpenAPI'} |`,
    `| **Versão da Spec** | ${specInfo?.version ?? '1.0.0'} |`,
    '',
    '### Arquivos modificados neste Pull Request:',
    `- \`apis/${entry.fileName}\` (Novo arquivo de especificação)`,
    `- \`apis/index.ts\` (Registro da especificação em \`allApisDocCollections\`)`,
  ].join('\n');
}

export function createInitialApisIndexContent(newSpec: {
  identifier: string;
  fileName: string;
  title: string;
}): string {
  const content = `import ${newSpec.identifier} from './${newSpec.fileName}?url';

export interface ApiDocSpec {
  name: string;
  url: string;
}

export const allApisDocCollections: ApiDocSpec[] = [
  {
    name: '${newSpec.title}',
    url: ${newSpec.identifier},
  },
];
`;

  const encodedBytes = new TextEncoder().encode(content);
  const binary = Array.from(encodedBytes, (byte) =>
    String.fromCodePoint(byte),
  ).join('');

  return btoa(binary);
}

export function patchApisIndexContent(
  encodedContent: string,
  newSpec: { identifier: string; fileName: string; title: string },
): string {
  const cleanBase64 = encodedContent.replaceAll('\n', '');
  const binaryString = atob(cleanBase64);
  const bytes = Uint8Array.from(
    binaryString,
    (char) => char.codePointAt(0) ?? 0,
  );
  const decoded = new TextDecoder().decode(bytes);

  const importLine = `import ${newSpec.identifier} from './${newSpec.fileName}?url';\n`;

  let updatedWithImport: string;
  const lastImportIndex = decoded.lastIndexOf('import ');

  if (lastImportIndex !== -1) {
    const endOfLastImport = decoded.indexOf('\n', lastImportIndex);
    if (endOfLastImport !== -1) {
      updatedWithImport =
        decoded.slice(0, endOfLastImport + 1) +
        importLine +
        decoded.slice(endOfLastImport + 1);
    } else {
      updatedWithImport = decoded + '\n' + importLine;
    }
  } else {
    updatedWithImport = importLine + decoded;
  }

  const newCollectionEntry = `  {\n    name: '${newSpec.title}',\n    url: ${newSpec.identifier},\n  },\n`;

  const closingArrayPattern = /\];\s*$/;
  if (!closingArrayPattern.test(updatedWithImport)) {
    throw new Error(
      'Não foi possível localizar o fechamento do array allApisDocCollections em apis/index.ts.',
    );
  }

  const patched = updatedWithImport.replace(
    closingArrayPattern,
    (matchedClosing) => newCollectionEntry + matchedClosing,
  );

  const encodedBytes = new TextEncoder().encode(patched);
  const patchedBinary = Array.from(encodedBytes, (byte) =>
    String.fromCodePoint(byte),
  ).join('');

  return btoa(patchedBinary);
}
