import { FileCode2 } from 'lucide-react';
import { submitSwaggerPullRequest } from '@/services/github';
import { SwaggerFormStep } from '@/components/swagger/add-swagger-dialog/SwaggerFormStep';
import { BaseAddDialog } from '@/components/swagger/BaseAddDialog';
import type { AddSwaggerDialogProps } from '@/types/addSwagger';

export function AddSwaggerDialog({ open, onClose }: AddSwaggerDialogProps) {
  return (
    <BaseAddDialog
      open={open}
      onClose={onClose}
      title="Adicionar Arquivo Swagger / OpenAPI"
      icon={<FileCode2 className="size-4 text-brand-green" />}
      maxWidthClassName="max-w-lg"
      renderForm={({ session, onLogout, onBack, onSuccess, onClose: handleClose }) => (
        <SwaggerFormStep
          session={session}
          onLogout={onLogout}
          onBack={onBack}
          onSubmitSwagger={(entry, specInfo) =>
            submitSwaggerPullRequest(session.token, entry, specInfo)
          }
          onSuccess={onSuccess}
          onClose={handleClose}
        />
      )}
    />
  );
}
