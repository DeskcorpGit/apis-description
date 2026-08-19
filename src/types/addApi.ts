import type { ReactNode } from 'react';
import type {
  GitHubSession,
  NewApiEntry,
  PullRequestResult,
} from '@/types/github';

export type DialogStep = 'auth' | 'form' | 'success';

export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

export interface AddApiFormState {
  title: string;
  company: string;
  function: string;
  url: string;
}

export interface AddApiDialogProps {
  readonly open: boolean;
  readonly onClose: () => void;
}

export interface FormFieldProps {
  readonly label: string;
  readonly id: string;
  readonly error?: string;
  readonly children: ReactNode;
}

export interface SuccessStepProps {
  readonly result: PullRequestResult;
  readonly onClose: () => void;
}

export interface ApiFormStepProps {
  readonly session: GitHubSession;
  readonly onLogout: () => void;
  readonly onBack: () => void;
  readonly onSubmitApi: (entry: NewApiEntry) => Promise<PullRequestResult>;
  readonly onSuccess: (result: PullRequestResult) => void;
  readonly onClose: () => void;
}

export interface AuthStepProps {
  readonly onAuthenticate: (token: string) => Promise<void>;
  readonly onClose: () => void;
}
