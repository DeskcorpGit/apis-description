import { cn } from '@/lib/utils';
import type { ApiResponse } from '@/types/api';

interface EndpointResponseProps {
  response: ApiResponse;
}

function getStatusCodeColor(statusCode: string): string {
  if (statusCode.startsWith('2')) return 'text-green-400';
  if (statusCode.startsWith('4')) return 'text-orange-400';
  if (statusCode.startsWith('5')) return 'text-red-400';
  return 'text-yellow-400';
}

export function EndpointResponse({
  response,
}: Readonly<EndpointResponseProps>) {
  const statusColor = getStatusCodeColor(response.statusCode);
  const shortDescription =
    response.description.length < 40 ? response.description : '';

  return (
    <div className="bg-[#1E1E1E] rounded-md shadow-md overflow-hidden flex flex-col min-w-0 max-w-full">
      <div className="flex items-center justify-between px-4 py-2 bg-[#2d3133] border-b border-[#414751] gap-2">
        <span className="text-white text-xs font-semibold truncate">
          Response{' '}
          <span className={cn('ml-2', statusColor)}>
            {response.statusCode} {shortDescription}
          </span>
        </span>
        <span className="text-gray-400 text-xs shrink-0">JSON</span>
      </div>
      <div className="p-4 overflow-x-auto code-scroll min-w-0">
        {response.example ? (
          <pre className="font-mono text-[12px] text-[#e0e3e5] leading-normal whitespace-pre">
            {response.example}
          </pre>
        ) : (
          <p className="font-mono text-[12px] text-[#e0e3e5] wrap-break-word">
            {response.description}
          </p>
        )}
      </div>
    </div>
  );
}
