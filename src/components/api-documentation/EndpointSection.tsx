import type { ApiEndpoint } from "@/types/api";
import { EndpointHeader } from "./endpoint-section/EndpointHeader";
import { EndpointUrlBar } from "./endpoint-section/EndpointUrlBar";
import { EndpointParameters } from "./endpoint-section/EndpointParameters";
import { EndpointRequestExample } from "./endpoint-section/EndpointRequestExample";
import { EndpointResponse } from "./endpoint-section/EndpointResponse";

interface EndpointSectionProps {
  sectionTitle: string;
  endpoint: ApiEndpoint;
  baseUrl?: string;
  anchorId: string;
}

export function EndpointSection({
  sectionTitle,
  endpoint,
  baseUrl,
  anchorId,
}: EndpointSectionProps) {
  const hasBodyParams =
    endpoint.parameters?.some((p) => p.in === "query" || p.in === "header") ===
      false || ["POST", "PUT", "PATCH"].includes(endpoint.method);

  return (
    <section
      className="mb-16 pb-16 border-b border-border border-dashed scroll-mt-6"
      id={anchorId}
    >
      <EndpointHeader sectionTitle={sectionTitle} endpoint={endpoint} />

      <EndpointUrlBar
        method={endpoint.method}
        baseUrl={baseUrl}
        path={endpoint.path}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <EndpointParameters parameters={endpoint.parameters} />

        <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
          <EndpointRequestExample
            method={endpoint.method}
            baseUrl={baseUrl}
            path={endpoint.path}
            hasBodyParams={hasBodyParams}
          />

          {endpoint.responses &&
            endpoint.responses.length > 0 &&
            endpoint.responses.map((response) => (
              <EndpointResponse key={response.statusCode} response={response} />
            ))}
        </div>
      </div>
    </section>
  );
}
