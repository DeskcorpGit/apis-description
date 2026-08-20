export const githubConfig = {
  baseUrl:
    (import.meta.env.VITE_GITHUB_API_BASE_URL as string) ||
    'https://api.github.com',
  owner: (import.meta.env.VITE_GITHUB_OWNER as string) || 'deskcorp-git',
  repo: (import.meta.env.VITE_GITHUB_REPO as string) || 'apis-description',
  baseBranch: (import.meta.env.VITE_GITHUB_BASE_BRANCH as string) || 'dev',
  apiFilePath:
    (import.meta.env.VITE_GITHUB_API_FILE_PATH as string) || 'src/links/Api.ts',
  apiVersion:
    (import.meta.env.VITE_GITHUB_API_VERSION as string) || '2022-11-28',
  acceptHeader:
    (import.meta.env.VITE_GITHUB_API_ACCEPT_HEADER as string) ||
    'application/vnd.github+json',
} as const;
