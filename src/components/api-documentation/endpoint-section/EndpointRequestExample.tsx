import { useState, useCallback } from 'react';
import { Copy, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ApiParameter } from '@/types/api';

interface EndpointRequestExampleProps {
  method: string;
  baseUrl?: string;
  path: string;
  hasBodyParams: boolean;
  requestBody?: string;
  parameters?: ApiParameter[];
}

function buildCurlExample(
  method: string,
  baseUrl: string | undefined,
  path: string,
  hasBody: boolean,
  requestBody?: string,
  parameters?: ApiParameter[],
): string {
  const queryParams = parameters?.filter((p) => p.in === 'query');
  let queryString = '';
  if (queryParams && queryParams.length > 0) {
    const qParts = queryParams.map((p) => `${p.name}=<${p.name}>`);
    queryString = `?${qParts.join('&')}`;
  }

  const rawUrl = baseUrl ? `${baseUrl}${path}` : path;
  const fullUrl = `${rawUrl}${queryString}`;

  const contentTypeHeader = parameters?.find(
    (p) => p.in === 'header' && p.name.toLowerCase() === 'content-type',
  );

  const contentType = contentTypeHeader
    ? contentTypeHeader.description || 'application/json'
    : 'application/json';

  const isFormUrlEncoded = contentType.includes('x-www-form-urlencoded');

  let curl = `curl -X ${method} \\\n  '${fullUrl}' \\\n  -H 'Authorization: Bearer <token>' \\\n  -H 'Accept: application/json'`;

  const extraHeaders = parameters?.filter(
    (p) =>
      p.in === 'header' &&
      !['authorization', 'accept', 'content-type'].includes(
        p.name.toLowerCase(),
      ),
  );

  if (extraHeaders && extraHeaders.length > 0) {
    for (const h of extraHeaders) {
      const headerVal =
        h.name === 'Chave-Idempotencia' ? '<idempotency-key>' : `<${h.name}>`;
      curl += ` \\\n  -H '${h.name}: ${headerVal}'`;
    }
  }

  const isPayloadMethod = ['POST', 'PUT', 'PATCH'].includes(
    method.toUpperCase(),
  );

  if (isPayloadMethod || hasBody || requestBody) {
    curl += ` \\\n  -H 'Content-Type: ${contentType}'`;

    let bodyString = '';

    if (requestBody) {
      bodyString = requestBody;
    } else {
      const bodyParams = parameters?.filter((p) => p.in === 'body');
      const payloadCandidateParams = parameters?.filter(
        (p) => p.in !== 'header' && p.in !== 'path',
      );

      if (bodyParams && bodyParams.length > 0) {
        const dummyObj: Record<string, any> = {};
        for (const p of bodyParams) {
          dummyObj[p.name] =
            p.type === 'number'
              ? 0
              : p.type === 'boolean'
                ? true
                : `<${p.name}>`;
        }
        bodyString = JSON.stringify(dummyObj, null, 2);
      } else if (payloadCandidateParams && payloadCandidateParams.length > 0) {
        const dummyObj: Record<string, any> = {};
        for (const p of payloadCandidateParams) {
          dummyObj[p.name] =
            p.type === 'number'
              ? 0
              : p.type === 'boolean'
                ? true
                : `<${p.name}>`;
        }
        bodyString = JSON.stringify(dummyObj, null, 2);
      } else {
        bodyString = '{ ... }';
      }
    }

    if (isFormUrlEncoded) {
      curl += ` \\\n  -d '${bodyString}'`;
    } else {
      const lines = bodyString.split('\n');
      if (lines.length > 1) {
        const indented = lines
          .map((line, idx) => (idx === 0 ? line : `  ${line}`))
          .join('\n');
        curl += ` \\\n  -d '${indented}'`;
      } else {
        curl += ` \\\n  -d '${bodyString}'`;
      }
    }
  }

  return curl;
}

export function EndpointRequestExample({
  method,
  baseUrl,
  path,
  hasBodyParams,
  requestBody,
  parameters,
}: EndpointRequestExampleProps) {
  const [copied, setCopied] = useState(false);

  const curlText = buildCurlExample(
    method,
    baseUrl,
    path,
    hasBodyParams,
    requestBody,
    parameters,
  );

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
