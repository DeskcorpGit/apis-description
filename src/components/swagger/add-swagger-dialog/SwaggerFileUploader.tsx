import { CheckCircle2, FileCode2, FileUp, Trash2, XCircle } from 'lucide-react';

interface SwaggerFileUploaderProps {
  readonly hasFile: boolean;
  readonly selectedFileName: string;
  readonly selectedFileSize: string;
  readonly validationSuccessInfo: string;
  readonly errorMessage?: string;
  readonly fileInputRef: React.RefObject<HTMLInputElement | null>;
  readonly onFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly onDrop: (e: React.DragEvent<HTMLElement>) => void;
  readonly onClearFile: () => void;
}

export function SwaggerFileUploader({
  hasFile,
  selectedFileName,
  selectedFileSize,
  validationSuccessInfo,
  errorMessage,
  fileInputRef,
  onFileInputChange,
  onDrop,
  onClearFile,
}: SwaggerFileUploaderProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-foreground">
        Arquivo OpenAPI, Swagger ou Postman Collection (.yaml, .yml, .json)
      </span>

      {!hasFile ? (
        <label
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/30 hover:bg-muted/60 p-5 text-center cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-ring"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,.yaml,.yml,application/json,text/yaml,text/x-yaml"
            className="sr-only"
            onChange={onFileInputChange}
          />
          <div className="rounded-full bg-brand-green/10 p-2 text-brand-green">
            <FileUp className="size-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-foreground">
              Clique para selecionar ou arraste o arquivo aqui
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Formatos aceitos: OpenAPI 3.x, Swagger 2.0 e Postman Collection
              v2.0/v2.1
            </p>
          </div>
        </label>
      ) : (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/40 p-3">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="rounded bg-brand-green/10 p-1.5 text-brand-green shrink-0">
              <FileCode2 className="size-4" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-medium truncate text-foreground">
                {selectedFileName}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span>{selectedFileSize}</span>
                {validationSuccessInfo && (
                  <>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                      <CheckCircle2 className="size-3" />
                      {validationSuccessInfo}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClearFile}
            className="rounded p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors shrink-0"
            aria-label="Remover arquivo"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-1.5 text-xs text-destructive mt-1">
          <XCircle className="size-3.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
