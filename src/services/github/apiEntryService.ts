import { githubConfig } from '@/config/github';
import type { FileContent, NewApiEntry, PullRequestResult } from '@/types/github';
import {
  createBranchName,
  createCommitMessage,
  createPullRequestBody,
  createPullRequestTitle,
  patchApiFileContent,
} from '@/utils/github';
import {
  commitFileToPath,
  createBranch,
  createPullRequest,
  ghFetch,
} from './githubClient';

export async function getApiFileContent(token: string): Promise<FileContent> {
  const data = await ghFetch<{ content: string; sha: string }>(
    token,
    `/repos/${githubConfig.owner}/${githubConfig.repo}/contents/${githubConfig.apiFilePath}?ref=${githubConfig.baseBranch}`,
  );
  return { content: data.content, sha: data.sha };
}

export async function commitFile(
  token: string,
  branchName: string,
  contentBase64: string,
  fileSha: string,
  commitMessage: string,
): Promise<void> {
  await commitFileToPath(
    token,
    branchName,
    githubConfig.apiFilePath,
    contentBase64,
    commitMessage,
    fileSha,
  );
}

export async function submitApiPullRequest(
  token: string,
  entry: NewApiEntry,
): Promise<PullRequestResult> {
  const { content: encodedContent, sha: fileSha } =
    await getApiFileContent(token);
  const reEncoded = patchApiFileContent(encodedContent, entry);
  const branchName = createBranchName(entry.title);

  await createBranch(token, branchName);

  const commitMessage = createCommitMessage(entry.title);
  await commitFile(token, branchName, reEncoded, fileSha, commitMessage);

  const prTitle = createPullRequestTitle(entry.title);
  const prBody = createPullRequestBody(entry);

  return createPullRequest(token, branchName, prTitle, prBody);
}
