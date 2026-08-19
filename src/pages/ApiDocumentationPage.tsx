import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { allApiSections } from '@/data';
import {
  getApisByPartner,
  getPartnerStats,
  getTotalEndpoints,
} from '@/data/api-stats';
import { EndpointSection } from '@/components/api-documentation/EndpointSection';
import { useHashScroll } from '@/hooks/useHashScroll';

export function ApiDocumentationPage() {
  const { partner } = useParams<{ partner: string }>();
  useHashScroll();

  const sections = useMemo(() => {
    if (partner) {
      return getApisByPartner(partner);
    }
    return allApiSections;
  }, [partner]);

  const partnerInfo = useMemo(() => {
    if (!partner) return null;
    return getPartnerStats().find((p) => p.id === partner) ?? null;
  }, [partner]);

  const title = partnerInfo ? `APIs — ${partnerInfo.name}` : 'Todas as APIs';

  const description = partnerInfo
    ? partnerInfo.description
    : `Documentação de ${allApiSections.length} seções com todos os ${getTotalEndpoints()} endpoints cadastrados.`;

  return (
    <div className="animate-in fade-in duration-500 min-w-0 max-w-full">
      <div className="mb-8">
        {partner && (
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground
              hover:text-foreground transition-colors mb-4 no-underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Voltar ao Dashboard
          </Link>
        )}
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2 wrap-break-word">
          {title}
        </h1>
        <p className="text-muted-foreground text-sm max-w-2xl wrap-break-word">
          {description}
        </p>
      </div>

      {sections.length === 0 ? (
        <div className="text-center text-muted-foreground mt-16">
          Nenhum endpoint encontrado
          {partner ? ` para o parceiro "${partner}"` : ''}.
        </div>
      ) : (
        sections.map((section) =>
          section.endpoints.map((endpoint, idx) => {
            const anchorId =
              `${section.title}-${endpoint.method}-${endpoint.path}-${idx}`
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-');
            return (
              <EndpointSection
                key={anchorId}
                sectionTitle={section.title}
                endpoint={endpoint}
                baseUrl={section.baseUrl}
                anchorId={anchorId}
              />
            );
          }),
        )
      )}
    </div>
  );
}
