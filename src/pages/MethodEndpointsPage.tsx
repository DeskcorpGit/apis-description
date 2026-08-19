import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getEndpointsByMethod } from '@/data/api-stats';
import { EndpointSection } from '@/components/api-documentation/EndpointSection';

function buildAnchorId(
  sectionTitle: string,
  method: string,
  path: string,
  index: number,
): string {
  return `${sectionTitle}-${method}-${path}-${index}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-');
}

export function MethodEndpointsPage() {
  const { method } = useParams<{ method: string }>();
  const normalizedMethod = method?.toUpperCase() ?? '';

  const endpoints = useMemo(
    () => getEndpointsByMethod(normalizedMethod),
    [normalizedMethod],
  );

  return (
    <div className="animate-in fade-in duration-500 min-w-0 max-w-full">
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground
            hover:text-foreground transition-colors mb-4 no-underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar ao Dashboard
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2 wrap-break-word">
          Endpoints — {normalizedMethod}
        </h1>
        <p className="text-muted-foreground text-sm max-w-2xl wrap-break-word">
          {endpoints.length} endpoint{endpoints.length !== 1 ? 's' : ''}{' '}
          encontrado
          {endpoints.length !== 1 ? 's' : ''} com o método {normalizedMethod}.
        </p>
      </div>

      {endpoints.length === 0 ? (
        <div className="text-center text-muted-foreground mt-16">
          Nenhum endpoint encontrado para o método &quot;{normalizedMethod}
          &quot;.
        </div>
      ) : (
        endpoints.map(({ sectionTitle, baseUrl, endpoint }, idx) => {
          const anchorId = buildAnchorId(
            sectionTitle,
            endpoint.method,
            endpoint.path,
            idx,
          );
          return (
            <EndpointSection
              key={anchorId}
              sectionTitle={sectionTitle}
              endpoint={endpoint}
              baseUrl={baseUrl}
              anchorId={anchorId}
            />
          );
        })
      )}
    </div>
  );
}
