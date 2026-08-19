import { useRef, useState } from 'react';
import type { RequestStatus } from '@/types/addApi';
import type {
  AddSwaggerFormState,
  SwaggerFormErrors,
  SwaggerFormStepProps,
} from '@/types/addSwagger';
import { sanitizeFileName } from '@/utils/openApiValidation';
import {
  INITIAL_SWAGGER_FORM_STATE,
  processSpecFileContent,
} from './swaggerFormUtils';

export function useSwaggerForm(
  onSubmitSwagger: SwaggerFormStepProps['onSubmitSwagger'],
  onSuccess: SwaggerFormStepProps['onSuccess'],
) {
  const [form, setForm] = useState<AddSwaggerFormState>(
    INITIAL_SWAGGER_FORM_STATE,
  );
  const [errors, setErrors] = useState<SwaggerFormErrors>({});
  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedFileSize, setSelectedFileSize] = useState('');
  const [validationSuccessInfo, setValidationSuccessInfo] = useState('');
  const [submitStatus, setSubmitStatus] = useState<RequestStatus>('idle');
  const [submitError, setSubmitError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileRead(file: File) {
    try {
      const content = await file.text();
      const result = processSpecFileContent(file, content);

      if (!result.isValid || !result.formUpdates) {
        setErrors((prev) => ({
          ...prev,
          file: result.error || 'Arquivo de especificação inválido.',
        }));
        setValidationSuccessInfo('');
        setForm((prev) => ({ ...prev, fileContent: '' }));
        return;
      }

      setSelectedFileName(file.name);
      setSelectedFileSize(result.sizeFormatted);
      setValidationSuccessInfo(result.badgeLabel || '');

      setForm((prev) => ({
        ...prev,
        ...result.formUpdates,
        title: prev.title.trim() ? prev.title : (result.formUpdates?.title || ''),
      }));

      setErrors((prev) => {
        const next = { ...prev };
        delete next.file;
        delete next.title;
        delete next.fileName;
        return next;
      });
    } catch {
      setErrors((prev) => ({
        ...prev,
        file: 'Erro ao ler o arquivo selecionado.',
      }));
    }
  }

  function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      void handleFileRead(file);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      void handleFileRead(file);
    }
  }

  function handleClearFile() {
    setSelectedFileName('');
    setSelectedFileSize('');
    setValidationSuccessInfo('');
    setForm(INITIAL_SWAGGER_FORM_STATE);
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const newErrors: SwaggerFormErrors = {};
    if (!form.fileContent) {
      newErrors.file =
        'Por favor, selecione um arquivo Swagger, OpenAPI ou Postman Collection válido.';
    }
    if (!form.title.trim()) {
      newErrors.title = 'Título é obrigatório.';
    }
    if (!form.fileName.trim()) {
      newErrors.fileName = 'Nome do arquivo é obrigatório.';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setSubmitStatus('loading');
    setSubmitError('');

    try {
      const sanitizedName = sanitizeFileName(form.fileName.trim(), form.format);
      const result = await onSubmitSwagger(
        {
          title: form.title.trim(),
          fileName: sanitizedName,
          fileContent: form.fileContent,
        },
        { specType: form.specType, version: form.version },
      );
      onSuccess(result);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Erro ao processar envio. Tente novamente.',
      );
      setSubmitStatus('error');
    }
  }

  return {
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
  };
}
