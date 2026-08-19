import { githubConfig } from '@/config/github';
import type {
  FileContent,
  NewSwaggerSpecEntry,
  PullRequestResult,
} from '@/types/github';
import {
  createInitialApisIndexContent,
  createSwaggerBranchName,
  createSwaggerCommitMessage,
  createSwaggerIndexCommitMessage,
  createSwaggerPullRequestBody,
  createSwaggerPullRequestTitle,
  generateImportIdentifier,
  patchApisIndexContent,
} from '@/utils/swaggerGithub';
import {
  commitFileToPath,
  createBranch,
  createPullRequest,
  ghFetch,
} from './githubClient';

export async function getApisIndexFileContent(
  token: string,
): Promise<FileContent | null> {
  try {
    const data = await ghFetch<{ content: string; sha: string }>(
      token,
      `/repos/${githubConfig.owner}/${githubConfig.repo}/contents/apis/index.ts?ref=${githubConfig.baseBranch}`,
    );
    return { content: data.content, sha: data.sha };
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message === 'Not Found' ||
        error.message.includes('404') ||
        error.message.includes('HTTP 404'))
    ) {
      return null;
    }
    throw error;
  }
}

export async function submitSwaggerPullRequest(
  token: string,
  entry: NewSwaggerSpecEntry,
  specInfo?: { specType?: string; version?: string },
): Promise<PullRequestResult> {
  const branchName = createSwaggerBranchName(entry.title);
  await createBranch(token, branchName);

  const specBytes = new TextEncoder().encode(entry.fileContent);
  const specBase64 = btoa(
    Array.from(specBytes, (byte) => String.fromCodePoint(byte)).join(''),
  );

  const specFilePath = `apis/${entry.fileName}`;
  const specCommitMessage = createSwaggerCommitMessage(
    entry.title,
    entry.fileName,
  );
  await commitFileToPath(
    token,
    branchName,
    specFilePath,
    specBase64,
    specCommitMessage,
  );

  const indexData = await getApisIndexFileContent(token);
  const identifier = generateImportIdentifier(entry.fileName);

  let patchedIndexBase64: string;
  let indexSha: string | undefined;

  if (indexData) {
    patchedIndexBase64 = patchApisIndexContent(indexData.content, {
      identifier,
      fileName: entry.fileName,
      title: entry.title,
    });
    indexSha = indexData.sha;
  } else {
    patchedIndexBase64 = createInitialApisIndexContent({
      identifier,
      fileName: entry.fileName,
      title: entry.title,
    });
    indexSha = undefined;
  }

  const indexCommitMessage = createSwaggerIndexCommitMessage(entry.title);
  await commitFileToPath(
    token,
    branchName,
    'apis/index.ts',
    patchedIndexBase64,
    indexCommitMessage,
    indexSha,
  );

  const prTitle = createSwaggerPullRequestTitle(entry.title);
  const prBody = createSwaggerPullRequestBody(entry, specInfo);

  return createPullRequest(token, branchName, prTitle, prBody);
}
