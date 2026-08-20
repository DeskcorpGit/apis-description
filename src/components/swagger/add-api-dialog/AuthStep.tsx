import { useState } from 'react';
import { ExternalLink, KeyRound, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField } from '@/components/swagger/add-api-dialog/FormField';
import { GithubIcon } from '@/components/swagger/add-api-dialog/GithubIcon';
import type { AuthStepProps, RequestStatus } from '@/types/addApi';

export function AuthStep({ onAuthenticate, onClose }: AuthStepProps) {
  const [patInput, setPatInput] = useState('');
  const [loginStatus, setLoginStatus] = useState<RequestStatus>('idle');
  const [loginError, setLoginError] = useState('');

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!patInput.trim()) return;

    setLoginStatus('loading');
    setLoginError('');
    try {
      await onAuthenticate(patInput);
      setLoginStatus('idle');
    } catch (err) {
      setLoginError(
        err instanceof Error
          ? err.message
          : 'Token inválido ou sem permissão. Verifique se o token possui o escopo "repo".',
      );
      setLoginStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <GithubIcon className="size-4" />
          Autenticação GitHub
        </div>

        <div className="rounded-lg border border-border bg-muted/40 px-3 py-2.5 flex flex-col gap-2">
          <p className="text-[11px] font-semibold text-foreground uppercase tracking-wide">
            Como obter o token (Classic PAT):
          </p>
          <ol className="flex flex-col gap-1.5 text-xs text-muted-foreground list-none">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-brand-green/20 text-[10px] font-bold text-brand-green">
                1
              </span>
              <span>
                Acesse{' '}
                <a
                  href="https://github.com/settings/tokens/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-green underline-offset-2 hover:underline inline-flex items-center gap-0.5"
                >
                  GitHub → Settings → Developer settings → Tokens (classic)
                  <ExternalLink className="size-2.5" />
                </a>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-brand-green/20 text-[10px] font-bold text-brand-green">
                2
              </span>
              <span>Dê um nome ao token e defina a expiração</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-brand-green/20 text-[10px] font-bold text-brand-green">
                3
              </span>
              <span>
                Em <strong className="text-foreground">Select scopes</strong>,
                marque <strong className="text-foreground">repo</strong>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-brand-green/20 text-[10px] font-bold text-brand-green">
                4
              </span>
              <span>
                Clique em{' '}
                <strong className="text-foreground">Generate token</strong> e
                cole abaixo
              </span>
            </li>
          </ol>
        </div>
      </div>

      <FormField
        label="GitHub Personal Access Token"
        id="pat"
        error={loginError}
      >
        <div className="relative">
          <KeyRound className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="pat"
            type="password"
            placeholder="github_pat_..."
            value={patInput}
            onChange={(e) => {
              setPatInput(e.target.value);
              setLoginError('');
            }}
            className="pl-8"
            autoComplete="off"
            aria-invalid={loginStatus === 'error'}
          />
        </div>
      </FormField>

      <div className="flex gap-2 pt-1">
        <Button
          type="button"
          variant="destructive"
          size="sm"
          className="flex-1"
          onClick={onClose}
          disabled={loginStatus === 'loading'}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={!patInput.trim() || loginStatus === 'loading'}
          className="flex-1 gap-2 bg-brand-green hover:bg-brand-green/80 text-white"
        >
          {loginStatus === 'loading' ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <GithubIcon className="size-3.5" />
          )}
          {loginStatus === 'loading' ? 'Autenticando…' : 'Autenticar'}
        </Button>
      </div>
    </form>
  );
}
