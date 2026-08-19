import { useEffect, useRef, useState, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { useGithub } from '@/hooks/useGithub';
import { cn } from '@/lib/utils';
import { AuthStep } from '@/components/swagger/add-api-dialog/AuthStep';
import { SuccessStep } from '@/components/swagger/add-api-dialog/SuccessStep';
import { StepIndicator } from '@/components/swagger/add-api-dialog/StepIndicator';
import type { GitHubSession, PullRequestResult } from '@/types/github';

export type DialogStep = 'auth' | 'form' | 'success';

export interface BaseAddDialogRenderProps {
  session: GitHubSession;
  onLogout: () => void;
  onBack: () => void;
  onSuccess: (result: PullRequestResult) => void;
  onClose: () => void;
}

export interface BaseAddDialogProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly title: string;
  readonly icon: ReactNode;
  readonly maxWidthClassName?: string;
  readonly renderForm: (props: BaseAddDialogRenderProps) => ReactNode;
}

export function BaseAddDialog({
  open,
  onClose,
  title,
  icon,
  maxWidthClassName = 'max-w-md',
  renderForm,
}: BaseAddDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { session, login, logout } = useGithub();
  const [prResult, setPrResult] = useState<PullRequestResult | null>(null);
  const [showAuthStep, setShowAuthStep] = useState(false);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    if (open) {
      dialogElement.showModal();
    } else {
      dialogElement.close();
    }
  }, [open]);

  function getCurrentStep(): DialogStep {
    if (prResult) {
      return 'success';
    }
    if (!session || showAuthStep) {
      return 'auth';
    }
    return 'form';
  }

  const currentStep = getCurrentStep();

  function handleAuthSuccess() {
    setShowAuthStep(false);
  }

  function handleBackToAuth() {
    setShowAuthStep(true);
  }

  function handleClose() {
    setPrResult(null);
    setShowAuthStep(false);
    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      onCancel={(e) => e.preventDefault()}
      className={cn(
        'w-[calc(100vw-2rem)] max-w-md rounded-xl border border-border bg-background p-0 shadow-2xl',
        'mx-auto my-auto max-h-[90vh] overflow-y-auto custom-scrollbar',
        'backdrop:bg-black/60 backdrop:backdrop-blur-xs',
        'open:animate-in open:fade-in open:zoom-in-95 open:duration-200',
        maxWidthClassName,
      )}
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-5 sm:py-4 min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          {icon}
          <h2 className="text-sm font-semibold truncate">{title}</h2>
        </div>
        <button
          type="button"
          onClick={handleClose}
          className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors shrink-0 cursor-pointer"
          aria-label="Fechar"
        >
          <X className="size-4" />
        </button>
      </div>

      <StepIndicator currentStep={currentStep} />

      <div className="px-4 py-4 sm:px-5 sm:py-5 min-w-0">
        {currentStep === 'auth' && (
          <AuthStep
            onAuthenticate={async (token) => {
              await login(token);
              handleAuthSuccess();
            }}
            onClose={handleClose}
          />
        )}

        {currentStep === 'form' &&
          session &&
          renderForm({
            session,
            onLogout: logout,
            onBack: handleBackToAuth,
            onSuccess: (result) => setPrResult(result),
            onClose: handleClose,
          })}

        {currentStep === 'success' && prResult && (
          <SuccessStep result={prResult} onClose={handleClose} />
        )}
      </div>
    </dialog>
  );
}
