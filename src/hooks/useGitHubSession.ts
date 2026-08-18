import { useGithub } from '@/hooks/useGithub';
import type { GitHubSession } from '@/types/github';

export interface UseGitHubSessionReturn {
  session: GitHubSession | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

export function useGitHubSession(): UseGitHubSessionReturn {
  const { session, login, logout } = useGithub();
  return { session, login, logout };
}
