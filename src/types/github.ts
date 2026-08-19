export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
}

export interface FileContent {
  content: string;
  sha: string;
}

export interface PullRequestResult {
  url: string;
  number: number;
  title: string;
}

export interface NewApiEntry {
  title: string;
  company: string;
  function: string;
  url: string;
}

export interface NewSwaggerSpecEntry {
  title: string;
  fileName: string;
  fileContent: string;
}

export interface GitHubSession {
  token: string;
  user: GitHubUser;
}
