import { Plus } from 'lucide-react';
import { submitApiPullRequest } from '@/services/github';
import { ApiFormStep } from '@/components/swagger/add-api-dialog/ApiFormStep';
import { BaseAddDialog } from '@/components/swagger/BaseAddDialog';
import type { AddApiDialogProps } from '@/types/addApi';

export function AddApiDialog({ open, onClose }: AddApiDialogProps) {
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
          onSubmitApi={(entry) => submitApiPullRequest(session.token, entry)}
          onSuccess={onSuccess}
          onClose={handleClose}
        />
      )}
    />
  );
}
