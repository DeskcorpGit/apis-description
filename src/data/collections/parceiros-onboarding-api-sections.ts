import type { ApiData } from '@/types/api';

export const parceirosOnboardingApiSections: ApiData[] = [
  {
    title: 'Authcube',
    baseUrl: 'https://oauthcube-devqa.basa.com.br',
    partner: 'Authcube',
    description:
      'Endpoints da plataforma AuthCube (OAuthCube) responsáveis pela geração de token de acesso e pelo gerenciamento (criação e remoção) de usuários utilizados no fluxo de onboarding de parceiros.',
    endpoints: [
      {
        method: 'POST',
        path: '/BasaUAT/connect/token',
        summary: 'Get Token',
        tags: ['Authcube'],
        parameters: [
          {
            name: 'client_id',
            in: 'query',
            required: true,
            type: 'string',
          },
          {
            name: 'client_secret',
            in: 'query',
            required: true,
            type: 'string',
          },
          {
            name: 'grant_type',
            in: 'query',
            required: true,
            type: 'string',
          },
        ],
      },
      {
        method: 'POST',
        path: '/api/applications/BasaUAT/users',
        summary: 'Create User',
        tags: ['Authcube'],
        parameters: [
          {
            name: 'Cookie',
            in: 'header',
            required: true,
            type: 'string',
            description: 'session=.{{cookie}}',
          },
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description: 'Bearer ',
          },
        ],
        requestBody:
          '{\n  "attributes": {\n    "cpf": "12345678909",\n    "password": "SenhaDoSignup123!",\n    "username": "12345678909",\n    "entity_id": "0a4c1f9e-2c7d-4b3a-9f11-6e8b2d5a7c40",\n    "signup_status": true,\n    "phone_number": "+5541991942476",\n    "phone_number_verified": true\n  }\n}',
      },
      {
        method: 'DELETE',
        path: '/api/applications/BasaUAT/users/{{document}}',
        summary: 'Remove User',
        tags: ['Authcube'],
        parameters: [
          {
            name: 'Cookie',
            in: 'header',
            required: true,
            type: 'string',
            description: '{{cookie}}',
          },
        ],
      },
    ],
  },
  {
    title: 'Valid',
    baseUrl: 'https://api.valid.com',
    partner: 'Valid',
    description:
      'Endpoints da Valid responsáveis pela consulta de resultados de OCR e pela obtenção das imagens dos documentos enviados para validação.',
    endpoints: [
      {
        method: 'GET',
        path: '/docs-gateway/api/v1/documents/{{document_id}}',
        summary: 'Get OCR',
        tags: ['Valid'],
        parameters: [
          {
            name: 'x-api-key',
            in: 'header',
            required: true,
            type: 'string',
            description: '<your-api-key>',
          },
        ],
      },
      {
        method: 'GET',
        path: '/docs-gateway/api/v1/documents/{{DOCUMENT_ID}}/files',
        summary: 'Get Document Image',
        tags: ['Valid'],
        parameters: [
          {
            name: 'x-api-key',
            in: 'header',
            required: true,
            type: 'string',
          },
        ],
      },
    ],
  },
  {
    title: 'Neobiz',
    baseUrl: 'https://api.lecom.com.br',
    partner: 'Neobiz',
    description:
      'Endpoints de integração com a plataforma Neobiz/Lecom (ECM), responsáveis pela inclusão e download de documentos, além da solicitação e retorno de processamento de OCR sobre documentos armazenados.',
    endpoints: [
      {
        method: 'POST',
        path: '/service/ecmcore/api/v1/templates/{{template_number}}/documents',
        summary: 'Incluir documento',
        tags: ['Neobiz'],
        parameters: [
          {
            name: 'apikey',
            in: 'header',
            required: true,
            type: 'string',
          },
          {
            name: 'X-Server',
            in: 'header',
            required: true,
            type: 'string',
          },
        ],
        requestBody:
          'multipart/form-data:\nfile (file): <arquivo: /C:/Users/danil/OneDrive/Área de Trabalho/nova-identidade.webp>\nduplicatesValues (text): false\ndocumentData[0].field (text): NUM_DOCUMENTO\ndocumentData[0].value (text): 123.321.654-89\ndocumentData[1].field (text): TIPO_CONTA\ndocumentData[1].value (text): PF\ndocumentData[2].field (text): DOC_TIPO\ndocumentData[2].value (text): CPF\ndocumentData[3].field (text): DOC_DATA_VALID\ndocumentData[3].value (text): 2026-01-25\ndocumentData[4].field (text): DOC_CLASSIFICACAO\ndocumentData[4].value (text): 123',
      },
      {
        method: 'POST',
        path: 'https://plataforma.neobiz.com.br/bpm/app/public/solicitaOCRDocumentosECM',
        summary: 'Solicitar OCR',
        tags: ['Neobiz'],
        parameters: [
          {
            name: 'apikey',
            in: 'header',
            required: true,
            type: 'string',
          },
        ],
        requestBody:
          '{\n \n "documentos": [\n { "fileUniqueId": "283699b6-b3b2-4135-bbc7-6918b01fbc52", "tipoDoc": "Documento de Identificação (CNH,Identidade)" }/* ,\n { "fileUniqueId": "87a99203-8ba6-42b0-8bc6-3a274434446e", "tipoDoc": "Comprovante de Renda" } */\n     ]\n}',
      },
      {
        method: 'POST',
        path: 'https://plataforma.neobiz.com.br/bpm/app/public/retornaOCRDocumentosECM',
        summary: 'Retornar OCR',
        tags: ['Neobiz'],
        parameters: [
          {
            name: 'apikey',
            in: 'header',
            required: true,
            type: 'string',
          },
        ],
        requestBody:
          '{\n "documentos": [\n     { "fileUniqueId": "ea4c65d8-51bc-45b6-9155-36db91d16b87" }/* ,\n    { "fileUniqueId": "87a99203-8ba6-42b0-8bc6-3a274434446e" } */\n ]\n}',
      },
      {
        method: 'GET',
        path: '/service/ecmcore/api/v1/documents/{{documentId}}/files/{{fileUniqueId}}',
        summary: 'Download de documento',
        tags: ['Neobiz'],
        parameters: [
          {
            name: 'apikey',
            in: 'header',
            required: true,
            type: 'string',
          },
          {
            name: 'X-Server',
            in: 'header',
            required: true,
            type: 'string',
          },
        ],
      },
    ],
  },
];
