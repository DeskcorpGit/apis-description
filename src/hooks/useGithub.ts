import { useCallback, useState } from 'react';
import {
  getApiFileContent,
  submitApiPullRequest,
  submitSwaggerPullRequest,
  validateToken,
} from '@/services/github';
import type {
  FileContent,
  GitHubSession,
  GitHubUser,
  NewApiEntry,
  NewSwaggerSpecEntry,
  PullRequestResult,
} from '@/types/github';

const SESSION_STORAGE_KEY = 'gh_pat';

export interface UseGithubReturn {
  session: GitHubSession | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  submitApi: (entry: NewApiEntry) => Promise<PullRequestResult>;
  submitSwaggerSpec: (
    entry: NewSwaggerSpecEntry,
    specInfo?: { specType: string; version: string },
  ) => Promise<PullRequestResult>;
  validateUserToken: (token: string) => Promise<GitHubUser>;
  fetchApiFile: () => Promise<FileContent>;
}

export function useGithub(): UseGithubReturn {
  const [session, setSession] = useState<GitHubSession | null>(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
      return stored ? (JSON.parse(stored) as GitHubSession) : null;
    } catch {
      return null;
    }
  });

  const getActiveToken = useCallback((): string => {
    if (session?.token) return session.token;
    const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as GitHubSession;
        if (parsed?.token) return parsed.token;
      } catch {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
      }
    }
    throw new Error(
      'Sessão do GitHub não autenticada.  Por favor, autentique-se com seu Personal Access Token (PAT) na primeira etapa.',
    );
  }, [session]);

  const login = useCallback(async (token: string) => {
    const trimmedToken = token.trim();
    if (!trimmedToken) {
      throw new Error(
        'O Personal Access Token não pode ser vazio. Por favor, insira um token válido.',
      );
    }
    try {
      const user = await validateToken(trimmedToken);
      const newSession: GitHubSession = { token: trimmedToken, user };
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newSession));
      setSession(newSession);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Não foi possível validar o token do GitHub. Verifique suas credenciais e conexão.';
      throw new Error(message, { cause: error });
    }
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    setSession(null);
  }, []);

  const submitApi = useCallback(
    async (entry: NewApiEntry): Promise<PullRequestResult> => {
      try {
        const token = getActiveToken();
        return await submitApiPullRequest(token, entry);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Erro inesperado ao criar o Pull Request da API. Tente novamente.';
        throw new Error(message, { cause: error });
      }
    },
    [getActiveToken],
  );

  const submitSwaggerSpec = useCallback(
    async (
      entry: NewSwaggerSpecEntry,
      specInfo?: { specType: string; version: string },
    ): Promise<PullRequestResult> => {
      try {
        const token = getActiveToken();
        return await submitSwaggerPullRequest(token, entry, specInfo);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Erro inesperado ao registrar o arquivo Swagger/OpenAPI. Tente novamente.';
        throw new Error(message, { cause: error });
      }
    },
    [getActiveToken],
  );

  const validateUserToken = useCallback(
    async (token: string): Promise<GitHubUser> => {
      const trimmed = token.trim();
      if (!trimmed) {
        throw new Error('O Personal Access Token não pode estar vazio.');
      }
      return validateToken(trimmed);
    },
    [],
  );

  const fetchApiFile = useCallback(async (): Promise<FileContent> => {
    try {
      const token = getActiveToken();
      return await getApiFileContent(token);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Erro ao carregar o arquivo de APIs do repositório.';
      throw new Error(message, { cause: error });
    }
  }, [getActiveToken]);

  return {
    session,
    login,
    logout,
    submitApi,
    submitSwaggerSpec,
    validateUserToken,
    fetchApiFile,
  };
}
