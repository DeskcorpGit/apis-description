import { ArrowLeft, GitPullRequest, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { RequestStatus } from '@/types/addApi';

interface SwaggerFormActionsProps {
  readonly submitStatus: RequestStatus;
  readonly hasFileContent: boolean;
  readonly onBack: () => void;
  readonly onClose: () => void;
}

export function SwaggerFormActions({
  submitStatus,
  hasFileContent,
  onBack,
  onClose,
}: SwaggerFormActionsProps) {
  const isLoading = submitStatus === 'loading';

  return (
    <div className="flex flex-wrap sm:flex-nowrap gap-2 pt-1 min-w-0">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onBack}
        disabled={isLoading}
        className="gap-1 shrink-0"
      >
        <ArrowLeft className="size-3.5" />
        Voltar
      </Button>
      <Button
        type="button"
        variant="destructive"
        size="sm"
        className="flex-1 sm:flex-none"
        onClick={onClose}
        disabled={isLoading}
      >
        Cancelar
      </Button>
      <Button
        type="submit"
        size="sm"
        disabled={isLoading || !hasFileContent}
        className="flex-1 gap-1.5 bg-brand-green hover:bg-brand-green/80 text-white min-w-32.5"
      >
        {isLoading ? (
          <Loader2 className="size-3.5 animate-spin" />
        ) : (
          <GitPullRequest className="size-3.5" />
        )}
        {isLoading ? 'Criando PR…' : 'Criar Pull Request'}
      </Button>
    </div>
  );
}
