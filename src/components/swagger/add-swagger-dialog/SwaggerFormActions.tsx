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
    <div className="flex gap-2 pt-1">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onBack}
        disabled={isLoading}
        className="gap-1"
      >
        <ArrowLeft className="size-3.5" />
        Voltar
      </Button>
      <Button
        type="button"
        variant="destructive"
        size="sm"
        className="flex-1"
        onClick={onClose}
        disabled={isLoading}
      >
        Cancelar
      </Button>
      <Button
        type="submit"
        size="sm"
        disabled={isLoading || !hasFileContent}
        className="flex-1 gap-1.5 bg-brand-green hover:bg-brand-green/80 text-white"
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
