import { useState, useCallback } from 'react';
import { Copy, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ApiParameter } from '@/types/api';
import { buildCurlExample } from './curlBuilder';

interface EndpointRequestExampleProps {
  method: string;
  baseUrl?: string;
  path: string;
  hasBodyParams: boolean;
  requestBody?: string;
  parameters?: ApiParameter[];
}

export function EndpointRequestExample({
  method,
  baseUrl,
  path,
  hasBodyParams,
  requestBody,
  parameters,
}: Readonly<EndpointRequestExampleProps>) {
  const [copied, setCopied] = useState(false);

  const curlText = buildCurlExample({
    method,
    baseUrl,
    path,
    hasBody: hasBodyParams,
    requestBody,
    parameters,
  });

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(curlText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [curlText]);

  return (
    <div>
      <div className="bg-[#1E1E1E] rounded-md shadow-md overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-4 py-2 bg-[#2d3133] border-b border-[#414751]">
          <span className="text-white text-xs font-semibold">
            Exemplo de Request
          </span>
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-xs font-mono">cURL</span>
            <button
              type="button"
              onClick={handleCopy}
              className={cn(
                'flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition-all duration-200 cursor-pointer select-none',
                copied
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-gray-300 hover:text-white hover:bg-white/10 active:scale-95',
              )}
              title="Copiar cURL"
              aria-label="Copiar cURL"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="size-3.5 text-emerald-400" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="size-3.5" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>
        </div>
        <div className="p-4 overflow-x-auto code-scroll">
          <pre className="font-mono text-[13px] text-[#d1e4fb] leading-relaxed whitespace-pre">
            {curlText}
          </pre>
        </div>
      </div>
    </div>
  );
}
