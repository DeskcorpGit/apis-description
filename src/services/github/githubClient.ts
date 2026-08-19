import { githubConfig } from '@/config/github';
import type { GitHubUser, PullRequestResult } from '@/types/github';

function getRequestHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    Accept: githubConfig.acceptHeader,
    'X-GitHub-Api-Version': githubConfig.apiVersion,
    'Content-Type': 'application/json',
  };
}

export async function ghFetch<T>(
  token: string,
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${githubConfig.baseUrl}${path}`, {
    ...options,
    headers: getRequestHeaders(token),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const message =
      (body as { message?: string }).message ?? `HTTP ${response.status}`;
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export async function validateToken(token: string): Promise<GitHubUser> {
  return ghFetch<GitHubUser>(token, '/user');
}

export async function getBaseBranchSha(token: string): Promise<string> {
  const data = await ghFetch<{ object: { sha: string } }>(
    token,
    `/repos/${githubConfig.owner}/${githubConfig.repo}/git/ref/heads/${githubConfig.baseBranch}`,
  );
  return data.object.sha;
}

export async function createBranch(
  token: string,
  branchName: string,
): Promise<void> {
  const sha = await getBaseBranchSha(token);
  await ghFetch(
    token,
    `/repos/${githubConfig.owner}/${githubConfig.repo}/git/refs`,
    {
      method: 'POST',
      body: JSON.stringify({ ref: `refs/heads/${branchName}`, sha }),
    },
  );
}

export async function commitFileToPath(
  token: string,
  branchName: string,
  filePath: string,
  contentBase64: string,
  commitMessage: string,
  fileSha?: string,
): Promise<void> {
  const payload: {
    message: string;
    content: string;
    branch: string;
    sha?: string;
  } = {
    message: commitMessage,
    content: contentBase64,
    branch: branchName,
  };

  if (fileSha) {
    payload.sha = fileSha;
  }

  await ghFetch(
    token,
    `/repos/${githubConfig.owner}/${githubConfig.repo}/contents/${filePath}`,
    {
      method: 'PUT',
      body: JSON.stringify(payload),
    },
  );
}

export async function createPullRequest(
  token: string,
  branchName: string,
  prTitle: string,
  prBody: string,
): Promise<PullRequestResult> {
  const data = await ghFetch<{
    html_url: string;
    number: number;
    title: string;
  }>(token, `/repos/${githubConfig.owner}/${githubConfig.repo}/pulls`, {
    method: 'POST',
    body: JSON.stringify({
      title: prTitle,
      body: prBody,
      head: branchName,
      base: githubConfig.baseBranch,
    }),
  });

  return { url: data.html_url, number: data.number, title: data.title };
}
