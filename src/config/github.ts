export const githubConfig = {
  baseUrl:
    (import.meta.env.VITE_GITHUB_API_BASE_URL as string) ||
    'LINK_DO_SEU_GITHUB',
  owner: (import.meta.env.VITE_GITHUB_OWNER as string) || 'NOME_DO_SEU_GITHUB',
  repo: (import.meta.env.VITE_GITHUB_REPO as string) || 'LINK_DO_SEU_GITHUB',
  baseBranch:
    (import.meta.env.VITE_GITHUB_BASE_BRANCH as string) || 'SUA_BRANCH',
  apiFilePath:
    (import.meta.env.VITE_GITHUB_API_FILE_PATH as string) ||
    'caminho/do/arquivo',
  apiVersion: (import.meta.env.VITE_GITHUB_API_VERSION as string) || 'DATA',
  acceptHeader:
    (import.meta.env.VITE_GITHUB_API_ACCEPT_HEADER as string) ||
    'TIPO_APLICACAO',
} as const;
