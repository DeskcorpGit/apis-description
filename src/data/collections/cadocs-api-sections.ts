import type { ApiData } from '@/types/api';

export const cadocsApiSections: ApiData[] = [
  {
    title: 'Autenticação',
    baseUrl: 'https://authorityos.allenty.io',
    partner: 'Corebanx',
    description:
      'Endpoint responsável pela obtenção do token de acesso (OAuth2 Client Credentials) utilizado para autenticar as demais chamadas à API da AuthorityOS.',
    endpoints: [
      {
        method: 'POST',
        path: '/v1/oauth/token',
        summary: 'auth',
        tags: ['config'],
        requestBody:
          'application/x-www-form-urlencoded:\ngrant_type=client_credentials\nclient_id=ao-b07c61c60168f505\nclient_secret=046d0085c728bd79bd4733ae1122eddbb003a2094ee2ef4b50928e2165a43bd1',
      },
    ],
  },
  {
    title: 'CADOC - Documentos',
    baseUrl: 'https://cardos-uat.corebanxapp.com.br',
    partner: 'Corebanx',
    description:
      'Endpoints responsáveis pelo ciclo de vida dos documentos CADOC (Banco Central): criação, validação, conversão e exportação de documentos dos tipos 6209 (Arranjos de Pagamento), 1201 (Estatísticas PIX) e 5500.',
    endpoints: [
      {
        method: 'POST',
        path: '/api/v1/cadocs/documents',
        summary: '6209 Arranjos de Pagamento — Criar Copy',
        tags: ['cadoc', '6209'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{access_token}} — token OAuth2 obtido via /v1/oauth/token',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'X-Tenant-ID',
            in: 'header',
            required: true,
            type: 'string',
            description: '{{tenantId}}',
          },
        ],
        requestBody:
          '{\n  "documentType": "1201",\n  "institutionIspb": "04902979",\n  "periodStart": "2026-03",\n  "periodEnd": "2026-03"\n}',
      },
      {
        method: 'POST',
        path: '/api/v1/cadocs/documents/{docId}/validate',
        summary: '6209 — Validar Copy',
        tags: ['cadoc', '6209'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{access_token}} — token OAuth2 obtido via /v1/oauth/token',
          },
          {
            name: 'X-Tenant-ID',
            in: 'header',
            required: true,
            type: 'string',
            description: '{{tenantId}}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/api/v1/cadocs/documents/{docId}/convert',
        summary: 'converter Copy',
        tags: ['cadoc', '6209'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{access_token}} — token OAuth2 obtido via /v1/oauth/token',
          },
        ],
      },
      {
        method: 'GET',
        path: '/api/v1/cadocs/documents/{docId}/export',
        summary: 'export Copy',
        tags: ['cadoc', '6209'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{access_token}} — token OAuth2 obtido via /v1/oauth/token',
          },
        ],
      },
      {
        method: 'POST',
        path: '/api/v1/cadocs/documents',
        summary: '1201 Estatisticas PIX — Criar Copy',
        tags: ['cadoc', '1201'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{access_token}} — token OAuth2 obtido via /v1/oauth/token',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'X-Tenant-ID',
            in: 'header',
            required: true,
            type: 'string',
            description: '{{tenantId}}',
          },
        ],
        requestBody:
          '{\n  "documentType": "1201",\n  "institutionIspb": "00360305",\n  "periodStart": "2026-03",\n  "periodEnd": "2026-03"\n}',
      },
      {
        method: 'POST',
        path: '/api/v1/cadocs/documents/{docId}/validate',
        summary: '1201 — Validar Copy',
        tags: ['cadoc', '1201'],
        parameters: [
          {
            name: 'X-Tenant-ID',
            in: 'header',
            required: true,
            type: 'string',
            description: '{{tenantId}}',
          },
        ],
      },
      {
        method: 'GET',
        path: '/api/v1/cadocs/documents/{docId}/export',
        summary: 'export Copy',
        tags: ['cadoc', '1201'],
        parameters: [
          {
            name: 'docId',
            in: 'path',
            required: true,
            type: 'string',
            description: 'ID do documento CADOC',
          },
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{access_token}} — token OAuth2 obtido via /v1/oauth/token',
          },
          {
            name: 'format',
            in: 'query',
            required: true,
            type: 'string',
          },
        ],
      },
      {
        method: 'POST',
        path: '/api/v1/cadocs/documents/{docId}/convert',
        summary: 'convert Copy',
        tags: ['cadoc', '1201'],
        parameters: [
          {
            name: 'docId',
            in: 'path',
            required: true,
            type: 'string',
            description: 'ID do documento CADOC',
          },
          {
            name: 'X-Tenant-ID',
            in: 'header',
            required: true,
            type: 'string',
            description: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
          },
        ],
      },
      {
        method: 'POST',
        path: '/api/v1/cadocs/documents',
        summary: '5500 Copy',
        tags: ['cadoc', '5500'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{access_token}} — token OAuth2 obtido via /v1/oauth/token',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'X-Tenant-ID',
            in: 'header',
            required: true,
            type: 'string',
            description: '{{tenantId}}',
          },
        ],
        requestBody:
          '{\n  "documentType": "5500",\n  "institutionIspb": "04902979",\n  "periodStart": "2025-06-30",\n  "periodEnd": "2025-06-30"\n}',
      },
      {
        method: 'POST',
        path: '/api/v1/cadocs/documents/{docId}/validate',
        summary: '5500 — Validar Copy 2',
        tags: ['cadoc', '5500'],
        parameters: [
          {
            name: 'X-Tenant-ID',
            in: 'header',
            required: true,
            type: 'string',
            description: '{{tenantId}}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/api/v1/cadocs/documents/{docId}/convert',
        summary: 'converter Copy 2',
        tags: ['cadoc', '5500'],
      },
      {
        method: 'GET',
        path: '/api/v1/cadocs/documents/{docId}/export',
        summary: 'export Copy 2',
        tags: ['cadoc', '5500'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{access_token}} — token OAuth2 obtido via /v1/oauth/token',
          },
          {
            name: 'format',
            in: 'query',
            required: true,
            type: 'string',
          },
        ],
      },
    ],
  },
  {
    title: 'CADOC - Listagem de Documentos',
    baseUrl: 'https://authorityos.allenty.io',
    partner: 'Corebanx',
    description:
      'Endpoint responsável pela listagem e filtragem dos documentos CADOC já criados, com suporte a paginação por cursor e filtros por tipo de documento, status e período.',
    endpoints: [
      {
        method: 'GET',
        path: '/api/v1/cadocs/documents',
        summary: 'list cadocs',
        tags: ['list cadocs'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{access_token}} — token OAuth2 obtido via /v1/oauth/token',
          },
          {
            name: 'documentType',
            in: 'query',
            required: true,
            type: 'string',
          },
          {
            name: 'limit',
            in: 'query',
            required: true,
            type: 'string',
          },
          {
            name: 'periodFrom',
            in: 'query',
            required: true,
            type: 'string',
          },
          {
            name: 'createdFrom',
            in: 'query',
            required: true,
            type: 'string',
          },
        ],
      },
    ],
  },
];
