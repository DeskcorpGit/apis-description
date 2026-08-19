import { useEffect, useRef, useState } from 'react';
import { FileCode2, X } from 'lucide-react';
import { useGithub } from '@/hooks/useGithub';
import { cn } from '@/lib/utils';
import { AuthStep } from '@/components/swagger/add-api-dialog/AuthStep';
import { SuccessStep } from '@/components/swagger/add-api-dialog/SuccessStep';
import { StepIndicator } from '@/components/swagger/add-api-dialog/StepIndicator';
import { SwaggerFormStep } from '@/components/swagger/add-swagger-dialog/SwaggerFormStep';
import type { AddSwaggerDialogProps, DialogStep } from '@/types/addSwagger';
import type { PullRequestResult } from '@/types/github';

export function AddSwaggerDialog({ open, onClose }: AddSwaggerDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { session, login, logout, submitSwaggerSpec } = useGithub();
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
        'w-full max-w-lg rounded-xl border border-border bg-background p-0 shadow-xl',
        'mx-auto my-auto',
        'backdrop:bg-black/50 backdrop:backdrop-blur-sm',
        'open:animate-in open:fade-in open:zoom-in-95 open:duration-200',
      )}
    >
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-2">
          <FileCode2 className="size-4 text-brand-green" />
          <h2 className="text-sm font-semibold">
            Adicionar Arquivo Swagger / OpenAPI
          </h2>
        </div>
        <button
          type="button"
          onClick={handleClose}
          className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="Fechar"
        >
          <X className="size-4" />
        </button>
      </div>

      <StepIndicator currentStep={currentStep} />

      <div className="px-5 py-5">
        {currentStep === 'auth' && (
          <AuthStep
            onAuthenticate={async (token) => {
              await login(token);
              handleAuthSuccess();
            }}
            onClose={handleClose}
          />
        )}

        {currentStep === 'form' && session && (
          <SwaggerFormStep
            session={session}
            onLogout={logout}
            onBack={handleBackToAuth}
            onSubmitSwagger={submitSwaggerSpec}
            onSuccess={(result) => setPrResult(result)}
            onClose={handleClose}
          />
        )}

        {currentStep === 'success' && prResult && (
          <SuccessStep result={prResult} onClose={handleClose} />
        )}
      </div>
    </dialog>
  );
}
