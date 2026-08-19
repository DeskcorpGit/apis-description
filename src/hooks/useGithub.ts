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

  const login = useCallback(async (token: string) => {
    const trimmedToken = token.trim();
    const user = await validateToken(trimmedToken);
    const newSession: GitHubSession = { token: trimmedToken, user };
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newSession));
    setSession(newSession);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    setSession(null);
  }, []);

  const submitApi = useCallback(
    async (entry: NewApiEntry): Promise<PullRequestResult> => {
      if (!session) {
        throw new Error('Sessão do GitHub não autenticada.');
      }
      return submitApiPullRequest(session.token, entry);
    },
    [session],
  );

  const submitSwaggerSpec = useCallback(
    async (
      entry: NewSwaggerSpecEntry,
      specInfo?: { specType: string; version: string },
    ): Promise<PullRequestResult> => {
      if (!session) {
        throw new Error('Sessão do GitHub não autenticada.');
      }
      return submitSwaggerPullRequest(session.token, entry, specInfo);
    },
    [session],
  );

  const validateUserToken = useCallback(
    async (token: string): Promise<GitHubUser> => {
      return validateToken(token.trim());
    },
    [],
  );

  const fetchApiFile = useCallback(async (): Promise<FileContent> => {
    if (!session) {
      throw new Error('Sessão do GitHub não autenticada.');
    }
    return getApiFileContent(session.token);
  }, [session]);

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
