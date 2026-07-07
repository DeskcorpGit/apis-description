import { cn } from "@/lib/utils";
import type { ApiResponse } from "@/types/api";

interface EndpointResponseProps {
  response: ApiResponse;
}

export function EndpointResponse({ response }: EndpointResponseProps) {
  return (
    <div className="bg-[#1E1E1E] rounded-md shadow-md overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 bg-[#2d3133] border-b border-[#414751]">
        <span className="text-white text-xs font-semibold">
          Response{" "}
          <span
            className={cn(
              "ml-2",
              response.statusCode.startsWith("2")
                ? "text-green-400"
                : response.statusCode.startsWith("4")
                  ? "text-orange-400"
                  : response.statusCode.startsWith("5")
                    ? "text-red-400"
                    : "text-yellow-400",
            )}
          >
            {response.statusCode}{" "}
            {response.description.length < 40 ? response.description : ""}
          </span>
        </span>
        <span className="text-gray-400 text-xs">JSON</span>
      </div>
      <div className="p-4 overflow-x-auto code-scroll">
        {response.example ? (
          <pre className="font-mono text-[12px] text-[#e0e3e5] leading-normal whitespace-pre">
            {response.example}
          </pre>
        ) : (
          <p className="font-mono text-[12px] text-[#e0e3e5]">
            {response.description}
          </p>
        )}
      </div>
    </div>
  );
}
