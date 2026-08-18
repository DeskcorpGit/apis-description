import type { AddApiFormState } from '@/types/addApi';

export function validateApiForm(form: AddApiFormState): {
  isValid: boolean;
  errors: Partial<AddApiFormState>;
} {
  const errors: Partial<AddApiFormState> = {};
  if (!form.title.trim()) errors.title = 'Campo obrigatório';
  if (!form.company.trim()) errors.company = 'Campo obrigatório';
  if (!form.function.trim()) errors.function = 'Campo obrigatório';
  if (!form.url.trim()) {
    errors.url = 'Campo obrigatório';
  } else {
    try {
      new URL(form.url);
    } catch {
      errors.url = 'URL inválida. Inclua o protocolo (https://).';
    }
  }
  return { isValid: Object.keys(errors).length === 0, errors };
}
