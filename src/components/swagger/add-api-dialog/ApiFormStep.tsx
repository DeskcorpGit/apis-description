import { useState } from 'react';
import { ArrowLeft, GitPullRequest, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField } from '@/components/swagger/add-api-dialog/FormField';
import { UserBadge } from '@/components/swagger/add-api-dialog/UserBadge';
import { validateApiForm } from '@/utils/addApiValidation';
import type { AddApiFormState, ApiFormStepProps, RequestStatus } from '@/types/addApi';

const EMPTY_FORM: AddApiFormState = { title: '', company: '', function: '', url: '' };

export function ApiFormStep({
  session,
  onLogout,
  onBack,
  onSubmitApi,
  onSuccess,
  onClose,
}: ApiFormStepProps) {
  const [form, setForm] = useState<AddApiFormState>(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState<Partial<AddApiFormState>>({});
  const [submitStatus, setSubmitStatus] = useState<RequestStatus>('idle');
  const [submitError, setSubmitError] = useState('');

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const { isValid, errors } = validateApiForm(form);
    setFormErrors(errors);
    if (!isValid) return;

    setSubmitStatus('loading');
    setSubmitError('');

    try {
      const result = await onSubmitApi({
        title: form.title.trim(),
        company: form.company.trim(),
        function: form.function.trim(),
        url: form.url.trim(),
      });
      onSuccess(result);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Erro desconhecido. Tente novamente.');
      setSubmitStatus('error');
    }
  }

  function update(field: keyof AddApiFormState) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (formErrors[field]) {
        setFormErrors((prev) => ({ ...prev, [field]: '' }));
      }
    };
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <UserBadge user={session.user} onLogout={onLogout} />

      <FormField label="Título da API" id="api-title" error={formErrors.title}>
        <Input
          id="api-title"
          placeholder="ex: Paymentos API"
          value={form.title}
          onChange={update('title')}
          aria-invalid={!!formErrors.title}
        />
      </FormField>

      <FormField label="Empresa / Fornecedor" id="api-company" error={formErrors.company}>
        <Input
          id="api-company"
          placeholder="ex: CoreBanx"
          value={form.company}
          onChange={update('company')}
          aria-invalid={!!formErrors.company}
        />
      </FormField>

      <FormField label="Função / Categoria" id="api-function" error={formErrors.function}>
        <Input
          id="api-function"
          placeholder="ex: Payments"
          value={form.function}
          onChange={update('function')}
          aria-invalid={!!formErrors.function}
        />
      </FormField>

      <FormField label="URL da documentação" id="api-url" error={formErrors.url}>
        <Input
          id="api-url"
          type="url"
          placeholder="https://..."
          value={form.url}
          onChange={update('url')}
          aria-invalid={!!formErrors.url}
        />
      </FormField>

      {submitStatus === 'error' && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive flex flex-col gap-1">
          <span>{submitError}</span>
        </div>
      )}

      <div className="flex gap-2 pt-1">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onBack}
          disabled={submitStatus === 'loading'}
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
          disabled={submitStatus === 'loading'}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          size="sm"
          disabled={submitStatus === 'loading'}
          className="flex-1 gap-1.5 bg-brand-green hover:bg-brand-green/80 text-white"
        >
          {submitStatus === 'loading' ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <GitPullRequest className="size-3.5" />
          )}
          {submitStatus === 'loading' ? 'Criando PR…' : 'Criar Pull Request'}
        </Button>
      </div>
    </form>
  );
}
