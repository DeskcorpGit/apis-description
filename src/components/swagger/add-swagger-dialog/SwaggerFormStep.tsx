import { FormField } from '@/components/swagger/add-api-dialog/FormField';
import { UserBadge } from '@/components/swagger/add-api-dialog/UserBadge';
import { Input } from '@/components/ui/input';
import type { SwaggerFormStepProps } from '@/types/addSwagger';
import { SwaggerFileUploader } from './SwaggerFileUploader';
import { SwaggerFormActions } from './SwaggerFormActions';
import { useSwaggerForm } from './useSwaggerForm';

export function SwaggerFormStep({
  session,
  onLogout,
  onBack,
  onSubmitSwagger,
  onSuccess,
  onClose,
}: SwaggerFormStepProps) {
  const {
    form,
    setForm,
    errors,
    setErrors,
    selectedFileName,
    selectedFileSize,
    validationSuccessInfo,
    submitStatus,
    submitError,
    fileInputRef,
    handleFileInputChange,
    handleDrop,
    handleClearFile,
    handleSubmit,
  } = useSwaggerForm(onSubmitSwagger, onSuccess);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <UserBadge user={session.user} onLogout={onLogout} />

      <SwaggerFileUploader
        hasFile={Boolean(form.fileContent)}
        selectedFileName={selectedFileName}
        selectedFileSize={selectedFileSize}
        validationSuccessInfo={validationSuccessInfo}
        errorMessage={errors.file}
        fileInputRef={fileInputRef}
        onFileInputChange={handleFileInputChange}
        onDrop={handleDrop}
        onClearFile={handleClearFile}
      />

      <FormField
        label="Título da API / Exibição"
        id="swagger-title"
        error={errors.title}
      >
        <Input
          id="swagger-title"
          placeholder="ex: Pix Integration Services API"
          value={form.title}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, title: e.target.value }));
            if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
          }}
          aria-invalid={Boolean(errors.title)}
        />
      </FormField>

      <FormField
        label="Nome do Arquivo em apis/"
        id="swagger-filename"
        error={errors.fileName}
      >
        <Input
          id="swagger-filename"
          placeholder="ex: CollectionPix.yaml"
          value={form.fileName}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, fileName: e.target.value }));
            if (errors.fileName) setErrors((prev) => ({ ...prev, fileName: '' }));
          }}
          aria-invalid={Boolean(errors.fileName)}
        />
      </FormField>

      {submitStatus === 'error' && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive flex flex-col gap-1">
          <span>{submitError}</span>
        </div>
      )}

      <SwaggerFormActions
        submitStatus={submitStatus}
        hasFileContent={Boolean(form.fileContent)}
        onBack={onBack}
        onClose={onClose}
      />
    </form>
  );
}
