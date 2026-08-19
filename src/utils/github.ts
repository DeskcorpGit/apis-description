import type { NewApiEntry } from '@/types/github';

export function createBranchName(
  title: string,
  timestamp: number = Date.now(),
): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `add-api/${slug}-${timestamp}`;
}

export function createCommitMessage(title: string): string {
  return `docs: add ${title} documentation link`;
}

export function createPullRequestTitle(title: string): string {
  return `docs: add ${title}`;
}

export function createPullRequestBody(entry: NewApiEntry): string {
  return [
    '## Nova API cadastrada via interface\n',
    '| Campo | Valor |',
    '|---|---|',
    `| **Título** | ${entry.title} |`,
    `| **Empresa** | ${entry.company} |`,
    `| **Função** | ${entry.function} |`,
    `| **URL** | ${entry.url} |`,
  ].join('\n');
}

export function patchApiFileContent(
  encodedContent: string,
  entry: NewApiEntry,
): string {
  const cleanBase64 = encodedContent.replaceAll('\n', '');
  const binaryString = atob(cleanBase64);
  const bytes = Uint8Array.from(binaryString, (char) => char.codePointAt(0) ?? 0);
  const decoded = new TextDecoder().decode(bytes);

  const newEntry = `  {\n    title: '${entry.title}',\n    company: '${entry.company}',\n    function: '${entry.function}',\n    url: '${entry.url}',\n  },\n`;

  const closingPattern = /\];\s*$/;
  if (!closingPattern.test(decoded)) {
    throw new Error('Não foi possível localizar o array de APIs em Api.ts.');
  }

  const patched = decoded.replace(
    closingPattern,
    (matchedClosing) => newEntry + matchedClosing,
  );

  const encodedBytes = new TextEncoder().encode(patched);
  const patchedBinary = Array.from(encodedBytes, (byte) =>
    String.fromCodePoint(byte),
  ).join('');

  return btoa(patchedBinary);
}
