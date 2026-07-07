interface EndpointRequestExampleProps {
  method: string;
  baseUrl?: string;
  path: string;
  hasBodyParams: boolean;
}

function buildCurlExample(
  method: string,
  baseUrl: string | undefined,
  path: string,
  hasBody: boolean,
): string {
  const url = baseUrl ? `${baseUrl}${path}` : path;
  let curl = `curl -X ${method} \\\n  '${url}' \\\n  -H 'Authorization: Bearer <token>' \\\n  -H 'Accept: application/json'`;
  if (hasBody) {
    curl += ` \\\n  -H 'Content-Type: application/json' \\\n  -d '{ ... }'`;
  }
  return curl;
}

export function EndpointRequestExample({
  method,
  baseUrl,
  path,
  hasBodyParams,
}: EndpointRequestExampleProps) {
  return (
    <div>
      <div className="bg-[#1E1E1E] rounded-md shadow-md overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-4 py-2 bg-[#2d3133] border-b border-[#414751]">
          <span className="text-white text-xs font-semibold">
            Exemplo de Request
          </span>
          <span className="text-gray-400 text-xs">cURL</span>
        </div>
        <div className="p-4 overflow-x-auto code-scroll">
          <pre className="font-mono text-[13px] text-[#d1e4fb] leading-relaxed whitespace-pre">
            {buildCurlExample(method, baseUrl, path, hasBodyParams)}
          </pre>
        </div>
      </div>
    </div>
  );
}
