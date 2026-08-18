import { ExternalLink, GitPullRequest } from 'lucide-react';
import type { SuccessStepProps } from '@/types/addApi';

export function SuccessStep({ result, onClose }: SuccessStepProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-2 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-brand-green/10">
        <GitPullRequest className="size-6 text-brand-green" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold">Pull Request criado!</p>
        <p className="text-xs text-muted-foreground">
          Após aprovação e merge em{' '}
          <code className="rounded bg-muted px-1 py-0.5">dev</code>, a API aparecerá na lista.
        </p>
      </div>
      <a
        href={result.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-lg bg-brand-green px-4 py-2 text-xs font-medium text-white hover:bg-brand-green/80 transition-colors"
      >
        <ExternalLink className="size-3.5" />
        Ver PR #{result.number} no GitHub
      </a>
      <button
        type="button"
        onClick={onClose}
        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        Fechar
      </button>
    </div>
  );
}
