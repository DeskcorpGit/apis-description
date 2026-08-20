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
  let response: Response;
  try {
    response = await fetch(`${githubConfig.baseUrl}${path}`, {
      ...options,
      headers: getRequestHeaders(token),
    });
  } catch {
    throw new Error(
      `Falha na conexão com o GitHub (${githubConfig.baseUrl}). Verifique sua conexão com a internet ou restrições de rede.`,
    );
  }

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as {
      message?: string;
      errors?: Array<{ message?: string }>;
    };

    const rawMessage = body.message ?? '';
    const detailMessage = body.errors?.[0]?.message;

    if (response.status === 401 || rawMessage.includes('Bad credentials')) {
      throw new Error(
        'Token do GitHub inválido ou expirado. Gere um novo Personal Access Token (PAT) com escopo "repo".',
      );
    }

    if (response.status === 403) {
      if (rawMessage.toLowerCase().includes('rate limit')) {
        throw new Error(
          'Limite de requisições da API do GitHub atingido para seu IP ou usuário. Aguarde alguns minutos.',
        );
      }
      throw new Error(
        `Permissão negada no repositório "${githubConfig.owner}/${githubConfig.repo}". Certifique-se de que seu token tem permissão de escrita ("repo").`,
      );
    }

    if (response.status === 404) {
      throw new Error(
        `Recurso não encontrado (${path}). Verifique se o repositório "${githubConfig.owner}/${githubConfig.repo}" e a branch base "${githubConfig.baseBranch}" existem e se seu token tem acesso.`,
      );
    }

    if (response.status === 422) {
      if (rawMessage.includes('Reference already exists')) {
        throw new Error(
          'Uma branch temporária com este nome já existe no GitHub. Tente enviar novamente.',
        );
      }
      if (rawMessage.includes('A pull request already exists')) {
        throw new Error(
          'Já existe um Pull Request aberto para estas alterações no repositório.',
        );
      }
      if (rawMessage.includes('No commits between')) {
        throw new Error(
          'Nenhuma alteração foi identificada para criação do Pull Request.',
        );
      }
      throw new Error(
        `Erro de validação do GitHub: ${detailMessage || rawMessage || 'Dados inválidos.'}`,
      );
    }

    throw new Error(
      rawMessage || `Erro HTTP ${response.status} na comunicação com a API do GitHub.`,
    );
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
