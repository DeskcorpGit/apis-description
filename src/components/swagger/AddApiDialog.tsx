import { Plus } from 'lucide-react';
import { useGithub } from '@/hooks/useGithub';
import { ApiFormStep } from '@/components/swagger/add-api-dialog/ApiFormStep';
import { BaseAddDialog } from '@/components/swagger/BaseAddDialog';
import type { AddApiDialogProps } from '@/types/addApi';

export function AddApiDialog({ open, onClose }: AddApiDialogProps) {
  const { submitApi } = useGithub();

  return (
    <BaseAddDialog
      open={open}
      onClose={onClose}
      title="Adicionar documentação de API"
      icon={<Plus className="size-4 text-brand-green" />}
      maxWidthClassName="max-w-md"
      renderForm={({ session, onLogout, onBack, onSuccess, onClose: handleClose }) => (
        <ApiFormStep
          session={session}
          onLogout={onLogout}
          onBack={onBack}
          onSubmitApi={submitApi}
          onSuccess={onSuccess}
          onClose={handleClose}
        />
      )}
    />
  );
}
