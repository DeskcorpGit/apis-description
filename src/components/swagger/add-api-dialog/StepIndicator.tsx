import type { DialogStep } from '@/types/addApi';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  readonly currentStep: DialogStep;
}

const STEPS = [
  { id: 'auth', label: 'Autenticação', number: 1 },
  { id: 'form', label: 'Dados da API', number: 2 },
] as const;

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  if (currentStep === 'success') {
    return null;
  }

  const currentStepIndex = currentStep === 'auth' ? 1 : 2;

  return (
    <div className="flex flex-col gap-2 border-b border-border bg-muted/20 px-5 py-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-foreground">
          Etapa {currentStepIndex} de 2
        </span>
        <span className="text-muted-foreground">
          {currentStep === 'auth' ? 'Autenticação GitHub' : 'Cadastro da API'}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {STEPS.map((step) => {
          const isCompleted = currentStepIndex > step.number;
          const isActive = currentStepIndex === step.number;

          return (
            <div key={step.id} className="flex flex-1 items-center gap-2">
              <div
                className={cn(
                  'flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition-colors',
                  isCompleted && 'bg-brand-green text-white',
                  isActive &&
                    'bg-brand-green/20 text-brand-green border border-brand-green/40',
                  !isCompleted && !isActive && 'bg-muted text-muted-foreground',
                )}
              >
                {isCompleted ? <Check className="size-3" /> : step.number}
              </div>
              <div
                className={cn(
                  'h-1 flex-1 rounded-full transition-colors',
                  isCompleted || isActive ? 'bg-brand-green' : 'bg-muted',
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
