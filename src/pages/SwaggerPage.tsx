import 'swagger-ui-react/swagger-ui.css';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, FileCode2 } from 'lucide-react';
import { useState } from 'react';
import { SwaggerDoc } from '@/components/swagger/SwaggerDoc';
import { ApiCard } from '@/components/swagger/ApiCard';
import { Apis } from '@/links/Api';

const SWAGGER_SPECS = [
  {
    name: 'APIs Externas BASA',
    url: '/all-external-endpoints.openapi.json',
  },
  {
    name: 'APIs Pix',
    url: '/Collection Pix.yaml',
  },
];

export function SwaggerPage() {
  const [activeSpec, setActiveSpec] = useState(SWAGGER_SPECS[0]);
  const [isSwaggerLink, setIsSwaggerLink] = useState(true);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium
              text-muted-foreground hover:text-foreground transition-colors no-underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Voltar ao Dashboard
          </Link>

          <div className="flex items-center gap-1 rounded-full border border-border bg-muted/50 p-1">
            <button
              onClick={() => setIsSwaggerLink(true)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
                isSwaggerLink
                  ? 'bg-brand-green text-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <BookOpen className="size-3.5" />
              Links de Documentação
            </button>
            <button
              onClick={() => setIsSwaggerLink(false)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
                !isSwaggerLink
                  ? 'bg-brand-green text-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <FileCode2 className="size-3.5" />
              Documentação Swagger
            </button>
          </div>
        </div>

        {isSwaggerLink ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Apis.map((api) => (
              <ApiCard key={api.url} {...api} />
            ))}
          </div>
        ) : (
          <SwaggerDoc
            activeSpec={activeSpec}
            setActiveSpec={setActiveSpec}
            SWAGGER_SPECS={SWAGGER_SPECS}
          />
        )}
      </div>
    </div>
  );
}
