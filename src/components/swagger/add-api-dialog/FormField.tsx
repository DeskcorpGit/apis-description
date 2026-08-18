import type { FormFieldProps } from '@/types/addApi';

export function FormField({ label, id, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium text-foreground">
        {label}
        <span className="ml-0.5 text-destructive">*</span>
      </label>
      {children}
      {error && <p className="text-[11px] text-destructive">{error}</p>}
    </div>
  );
}
