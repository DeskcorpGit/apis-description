import { githubConfig } from '@/config/github';
import type {
  FileContent,
  GitHubUser,
  NewApiEntry,
  PullRequestResult,
} from '@/types/github';
import {
  createBranchName,
  createCommitMessage,
  createPullRequestBody,
  createPullRequestTitle,
  patchApiFileContent,
} from '@/utils/github';

export type {
  FileContent,
  GitHubUser,
  NewApiEntry,
  PullRequestResult,
} from '@/types/github';

function headers(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    Accept: githubConfig.acceptHeader,
    'X-GitHub-Api-Version': githubConfig.apiVersion,
    'Content-Type': 'application/json',
  };
}

async function ghFetch<T>(
  token: string,
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${githubConfig.baseUrl}${path}`, {
    ...options,
    headers: headers(token),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const message = (body as { message?: string }).message ?? `HTTP ${response.status}`;
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export async function validateToken(token: string): Promise<GitHubUser> {
  return ghFetch<GitHubUser>(token, '/user');
}

export async function getApiFileContent(token: string): Promise<FileContent> {
  const data = await ghFetch<{ content: string; sha: string }>(
    token,
    `/repos/${githubConfig.owner}/${githubConfig.repo}/contents/${githubConfig.apiFilePath}?ref=${githubConfig.baseBranch}`,
  );
  return { content: data.content, sha: data.sha };
}

async function getBaseBranchSha(token: string): Promise<string> {
  const data = await ghFetch<{ object: { sha: string } }>(
    token,
    `/repos/${githubConfig.owner}/${githubConfig.repo}/git/ref/heads/${githubConfig.baseBranch}`,
  );
  return data.object.sha;
}

export async function createBranch(token: string, branchName: string): Promise<void> {
  const sha = await getBaseBranchSha(token);
  await ghFetch(token, `/repos/${githubConfig.owner}/${githubConfig.repo}/git/refs`, {
    method: 'POST',
    body: JSON.stringify({ ref: `refs/heads/${branchName}`, sha }),
  });
}

export async function commitFile(
  token: string,
  branchName: string,
  contentBase64: string,
  fileSha: string,
  commitMessage: string,
): Promise<void> {
  await ghFetch(
    token,
    `/repos/${githubConfig.owner}/${githubConfig.repo}/contents/${githubConfig.apiFilePath}`,
    {
      method: 'PUT',
      body: JSON.stringify({
        message: commitMessage,
        content: contentBase64,
        sha: fileSha,
        branch: branchName,
      }),
    },
  );
}

export async function createPullRequest(
  token: string,
  branchName: string,
  prTitle: string,
  prBody: string,
): Promise<PullRequestResult> {
  const data = await ghFetch<{ html_url: string; number: number; title: string }>(
    token,
    `/repos/${githubConfig.owner}/${githubConfig.repo}/pulls`,
    {
      method: 'POST',
      body: JSON.stringify({
        title: prTitle,
        body: prBody,
        head: branchName,
        base: githubConfig.baseBranch,
      }),
    },
  );
  return { url: data.html_url, number: data.number, title: data.title };
}

export async function submitApiPullRequest(
  token: string,
  entry: NewApiEntry,
): Promise<PullRequestResult> {
  const { content: encodedContent, sha: fileSha } = await getApiFileContent(token);
  const reEncoded = patchApiFileContent(encodedContent, entry);
  const branchName = createBranchName(entry.title);

  await createBranch(token, branchName);

  const commitMessage = createCommitMessage(entry.title);
  await commitFile(token, branchName, reEncoded, fileSha, commitMessage);

  const prTitle = createPullRequestTitle(entry.title);
  const prBody = createPullRequestBody(entry);

  return createPullRequest(token, branchName, prTitle, prBody);
}
