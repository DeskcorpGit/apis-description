import type {
  GitHubSession,
  NewSwaggerSpecEntry,
  PullRequestResult,
} from '@/types/github';

export type DialogStep = 'auth' | 'form' | 'success';

export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

export interface OpenApiSpecInfo {
  title: string;
  version: string;
  specType: 'openapi' | 'swagger' | 'postman';
  format: 'json' | 'yaml';
  convertedFromPostman?: boolean;
  convertedContent?: string;
}

export interface SwaggerValidationResult {
  isValid: boolean;
  error?: string;
  specInfo?: OpenApiSpecInfo;
}

export interface AddSwaggerFormState {
  title: string;
  fileName: string;
  fileContent: string;
  format: 'json' | 'yaml';
  specType: string;
  version: string;
  convertedFromPostman?: boolean;
}

export type SwaggerFormErrorKey =
  | 'title'
  | 'fileName'
  | 'fileContent'
  | 'format'
  | 'specType'
  | 'version'
  | 'file';

export type SwaggerFormErrors = Partial<Record<SwaggerFormErrorKey, string>>;

export interface AddSwaggerDialogProps {
  readonly open: boolean;
  readonly onClose: () => void;
}

export interface SwaggerFormStepProps {
  readonly session: GitHubSession;
  readonly onLogout: () => void;
  readonly onBack: () => void;
  readonly onSubmitSwagger: (
    entry: NewSwaggerSpecEntry,
    specInfo?: { specType: string; version: string },
  ) => Promise<PullRequestResult>;
  readonly onSuccess: (result: PullRequestResult) => void;
  readonly onClose: () => void;
}
