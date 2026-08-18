import type { ApiData } from '@/types/api';

export const onboardosApiSections: ApiData[] = [
  {
    title: 'Entity',
    baseUrl: 'https://uat-onboarding.corebanxapp.com.br',
    partner: 'Corebanx',
    description:
      'Endpoints do fluxo principal de onboarding: criação da entidade (usuário), aceite de termos, declaração PEP, atualização de documentos de identidade e dados demográficos, submissão final, consulta de status, validação de CPF, reset de entidade e integração com ThreatMetrix (antifraude) e BCP.',
    endpoints: [
      {
        method: 'POST',
        path: '/v1/onboarding/entities',
        summary: 'Create Entity',
        tags: ['Entity'],
        parameters: [
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
        requestBody:
          '{\n  "cpf": "08747201096",\n  "password": "123456",\n  "phone": {\n      "ddd": "91",\n      "number": "988887777"\n    },\n     "documents": [\n      { "documentName": "POLITICA DE PRIVACIDADE", "documentVersion": "1.1" },\n      { "documentName": "POLITICA DE SEGURANCA",   "documentVersion": "v2.3" },\n      { "documentName": "TERMO DE ABERTURA",       "documentVersion": "3" }\n    ]\n}',
      },
      {
        method: 'POST',
        path: '/v1/onboarding/accept-terms',
        summary: 'Accept Terms',
        tags: ['Entity'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token JWT do usuário autenticado no fluxo de onboarding.',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/onboarding/pep-declaration',
        summary: 'PEP Declaration',
        tags: ['Entity'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token JWT do usuário autenticado no fluxo de onboarding.',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
        requestBody: '{\n  "is_pep": true\n}',
      },
      {
        method: 'PUT',
        path: '/v1/onboarding/identity-documents',
        summary: 'Update Identity Documents',
        tags: ['Entity'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token JWT do usuário autenticado no fluxo de onboarding.',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
        requestBody:
          '{\n  "rg_number": "123566789",\n  "rg_issuer": "SSP-SP",\n  "rg_issued_date":"2000-03-12"\n}',
      },
      {
        method: 'PUT',
        path: '/v1/onboarding/demographics',
        summary: 'Update Person',
        description:
          'Generated from cURL: curl -X PUT http://localhost:8080/v1/onboarding/demographics \\\n  -H "Authorization: Bearer SEU_TOKEN_JWT" \\\n  -H "Content-Type: application/json" \\\n  -d \'{\n    "first_name": "João",\n    "last_name": "Silva",\n    "date_of_birth": "1990-05-15",\n    "father_name": "Antônio Silva",\n    "mother_name": "Maria Silva",\n    "gender": "male",\n    "marital_status": "single",\n    "education_level": "bachelors",\n    "occupation": "Software Engineer",\n    "email": "joao.silva@example.com",\n    "nationality": "Brasileiro",\n    "country_birth": "Brasil",\n    "state_birth": "PA",\n    "city_of_birth": "Belém",\n    "phone": {\n      "ddd": "91",\n      "number": "988887777"\n    },\n    "address": {\n      "zip_code": "66000-000",\n      "street_name": "Avenida Nazaré",\n      "number": "1000",\n      "complement": "Apto 101",\n      "district": "Nazaré",\n      "city": "Belém",\n      "state": "PA",\n      "country": "Brasil"\n    },\n    "financial": {\n      "occupation": "Desenvolvedor",\n      "monthly_income": 5000.50,\n      "patrimony": 150000.00,\n      "basa_employee": false\n    }\n  }\'',
        tags: ['Entity'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token JWT do usuário autenticado no fluxo de onboarding.',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
        requestBody:
          '{\n    "date_of_birth": "1990-05-15",\n    "first_name": "Maria",\n    "last_name": "Silva",\n    "father_name": "Carlos Silva",\n    "mother_name": "Ana Silva",\n\n    "gender": "FEMALE",\n    "gender_identity": "FEMALE",\n    "pronoun": "SHE_HER",\n    "sexual_orientation": "HETEROSEXUAL",\n    "marital_status": "SINGLE",\n    "education_level": "UNDERGRADUATE_COMPLETE",\n\n    "address": {\n      "zip_code": "01310100",\n      "street_name": "Av Paulista",\n      "number": "1000",\n      "complement": "Apto 42",\n      "district": "Bela Vista",\n      "city": "Sao Paulo",\n      "state": "SP",\n      "country": "BR"\n    },\n    "financial": {\n      "occupation": "123456",\n      "monthly_income": 15000,\n      "patrimony": 200000,\n      "basa_employee": false\n    },\n    "email": "maria.silva@example.com",\n    "nationality": "BRASILEIRA",\n    "country_birth": "BR",\n    "state_birth": "SP",\n    "city_of_birth": "Sao Paulo"\n  }',
      },
      {
        method: 'POST',
        path: '/v1/onboarding/submit',
        summary: 'Confirm Submit',
        tags: ['Entity'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token JWT do usuário autenticado no fluxo de onboarding.',
          },
        ],
      },
      {
        method: 'GET',
        path: '/v1/onboarding/info',
        summary: 'Get Info',
        tags: ['Entity'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token JWT do usuário autenticado no fluxo de onboarding.',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/onboarding/check-cpf',
        summary: 'Check CPF',
        tags: ['Entity'],
        parameters: [
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
        requestBody: '{\n  "cpf": {{cpf}}\n}',
      },
      {
        method: 'POST',
        path: '/v1/onboarding/reset/entity',
        summary: 'Reset Entity',
        description:
          'Generated from cURL: curl -X POST http://localhost:8080/v1/onboarding/reset \\\n  -H "Authorization: Bearer <TOKEN_JWT>" \\\n  -H "Content-Type: application/json" \\\n  -d \'{ "reason": "Refazendo com novos documentos" }\'',
        tags: ['Entity'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token JWT do usuário autenticado no fluxo de onboarding.',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/onboarding/threat-metrix',
        summary: 'Send SessionID',
        description:
          'Generated from cURL: curl -X POST "http://localhost:8080/v1/onboarding/threat-metrix?session_id=sua_session_id_do_threat_metrix" \\\n  -H "Authorization: Bearer <seu_token_jwt_aqui>"',
        tags: ['Entity'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token JWT do usuário autenticado no fluxo de onboarding.',
          },
          {
            name: 'session_id',
            in: 'query',
            required: true,
            type: 'string',
          },
          {
            name: 'ip_address',
            in: 'query',
            required: true,
            type: 'string',
          },
          {
            name: 'web_session_id',
            in: 'query',
            required: true,
            type: 'string',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/onboarding/bcp/retry',
        summary: 'Retry BCP',
        tags: ['Entity'],
        parameters: [
          {
            name: 'token',
            in: 'query',
            required: true,
            type: 'string',
          },
        ],
      },
    ],
  },
  {
    title: 'Documents',
    baseUrl: 'https://uat-onboarding.corebanxapp.com.br',
    partner: 'Corebanx',
    description:
      'Upload e consulta de documentos comprobatórios do onboarding (INSS, DAP, comprovante de renda, comprovante de bens, DIRF, CAF e holerite/contracheque).',
    endpoints: [
      {
        method: 'POST',
        path: '/v1/documents/inss',
        summary: 'INSS',
        description:
          'Generated from cURL: curl -X POST "$BASE/v1/documents/proof/inss" \\\n  -H "Authorization: Bearer $TOKEN" \\\n  -F "file=@inss.pdf"',
        tags: ['Documents'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token JWT do usuário autenticado no fluxo de onboarding.',
          },
        ],
        requestBody: 'multipart/form-data:\nfile (file): <arquivo: inss.pdf>',
      },
      {
        method: 'POST',
        path: '/v1/documents/dap',
        summary: 'Dap',
        description:
          'Generated from cURL: curl -X POST "$BASE/v1/documents/proof/dap" \\\n  -H "Authorization: Bearer $TOKEN" \\\n  -F "file=@dap.pdf"',
        tags: ['Documents'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token JWT do usuário autenticado no fluxo de onboarding.',
          },
        ],
        requestBody: 'multipart/form-data:\nfile (file): <arquivo: dap.pdf>',
      },
      {
        method: 'POST',
        path: '/v1/documents/proof-income',
        summary: 'Proof Income',
        description:
          'Generated from cURL: curl -X POST http://localhost:8092/v1/documents/proof/income \\\n  -H "Authorization: Bearer SEU_TOKEN_AQUI" \\\n  -F "file=@/caminho/para/seu/comprovante_renda.pdf"',
        tags: ['Documents'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token JWT do usuário autenticado no fluxo de onboarding.',
          },
        ],
        requestBody:
          'multipart/form-data:\nfile (file): <arquivo: /C:/Users/Eu/Downloads/pdf-sample_0.pdf>',
      },
      {
        method: 'POST',
        path: '/v1/documents/proof-assets',
        summary: 'Proof Assets',
        description:
          'Generated from cURL: curl -X POST http://localhost:8092/v1/documents/proof/assets \\\n  -H "Authorization: Bearer SEU_TOKEN_AQUI" \\\n  -F "file=@/caminho/para/seu/comprovante_patrimonio.pdf"',
        tags: ['Documents'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token JWT do usuário autenticado no fluxo de onboarding.',
          },
        ],
        requestBody:
          'multipart/form-data:\nfile (file): <arquivo: /C:/Users/Eu/Downloads/pdf-sample_0.pdf>',
      },
      {
        method: 'GET',
        path: '/v1/documents/proofs',
        summary: 'Get Documents',
        description:
          'Generated from cURL: curl "$BASE/v1/documents/proofs" -H "Authorization: Bearer $TOKEN"',
        tags: ['Documents'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token JWT do usuário autenticado no fluxo de onboarding.',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/documents/dirf',
        summary: 'DIRF',
        description:
          'Generated from cURL: curl -X POST "$BASE/v1/documents/dirf" -H "Authorization: Bearer $TOKEN" \\\n  -F "file=@dirf.pdf" -F "qtd_dependentes=2" -F "cpf_conjuge=98765432100"',
        tags: ['Documents'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token JWT do usuário autenticado no fluxo de onboarding.',
          },
        ],
        requestBody:
          'multipart/form-data:\nfile (file): <arquivo: dirf.pdf>\nqtd_dependentes (text): 2\ncpf_conjuge (text): 98765432100',
      },
      {
        method: 'POST',
        path: '/v1/documents/caf',
        summary: 'CAF',
        description:
          'Generated from cURL: curl -X POST "$BASE/v1/documents/caf" -H "Authorization: Bearer $TOKEN" \\\n  -F "file=@caf.pdf" -F "municipio_uf_estabelecimento=PA"',
        tags: ['Documents'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token JWT do usuário autenticado no fluxo de onboarding.',
          },
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description: 'Bearer $TOKEN',
          },
        ],
        requestBody:
          'multipart/form-data:\nfile (file): <arquivo: caf.pdf>\nmunicipio_uf_estabelecimento (text): PA',
      },
      {
        method: 'POST',
        path: '/v1/documents/pay-slip',
        summary: 'Pay Slip',
        description:
          'Generated from cURL: curl -X POST "$BASE/v1/documents/pay-slip" -H "Authorization: Bearer $TOKEN" \\\n  -F "file=@contracheque.pdf" \\\n  -F "cnpj_fonte_pagadora=12345678000199" -F "nome_empregador=ACME" \\\n  -F "nome_funcionario=Maria" -F "data_admissao=01/02/2020"',
        tags: ['Documents'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token JWT do usuário autenticado no fluxo de onboarding.',
          },
        ],
        requestBody:
          'multipart/form-data:\nfile (file): <arquivo: /C:/Users/Eu/Downloads/contracheque_eduarda.pdf>\ncnpj_fonte_pagadora (text): 12345678000199\nnome_empregador (text): ACME\nnome_funcionario (text): Maria\ndata_admissao (text): 01/02/2020',
      },
    ],
  },
  {
    title: 'Webhook',
    baseUrl: 'https://uat-onboarding.corebanxapp.com.br',
    partner: 'Corebanx',
    description:
      'Webhooks de confirmação de submissão recebidos dos provedores parceiros (Idverse, VU, Valid) e de verificação de documentos (Valid).',
    endpoints: [
      {
        method: 'POST',
        path: '/v1/webhook/confirmSubmit',
        summary: 'Webhook Confirm Submit(idverse)',
        tags: ['Webhook'],
        parameters: [
          {
            name: 'provider',
            in: 'query',
            required: true,
            type: 'string',
          },
          {
            name: 'entityId',
            in: 'query',
            required: true,
            type: 'string',
          },
          {
            name: 'transactionId',
            in: 'query',
            required: true,
            type: 'string',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/webhook/confirmSubmit',
        summary: 'Webhook Confirm Submit (vu)',
        tags: ['Webhook'],
        parameters: [
          {
            name: 'provider',
            in: 'query',
            required: true,
            type: 'string',
          },
          {
            name: 'entityId',
            in: 'query',
            required: true,
            type: 'string',
          },
          {
            name: 'operationId',
            in: 'query',
            required: true,
            type: 'string',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/webhook/confirmSubmit',
        summary: 'Webhook Confirm Subimit (valid)',
        tags: ['Webhook'],
        parameters: [
          {
            name: 'provider',
            in: 'query',
            required: true,
            type: 'string',
          },
          {
            name: 'entityId',
            in: 'query',
            required: true,
            type: 'string',
          },
          {
            name: 'operationId',
            in: 'query',
            required: true,
            type: 'string',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/webhook/verification/valid',
        summary: 'Webhook Valid',
        tags: ['Webhook'],
        requestBody:
          '{\n    "id": "13fb64fd-2b7e-4c3a-8ee4-49a17fe22843",\n    "organizationId": "019f956d-0ecd-7629-b154-e4b4adfb4e4b",\n    "projectId": "019fa542-86eb-74f9-ba3e-07bf4add3aff",\n    "productId": "019e4b63-0314-71ed-aec9-7cf94322ace7",\n    "cpf": "78723187093",\n    "status": "COMPLETED",\n    "type": "docs",\n    "createdAt": "2026-07-31T16:59:24.815Z",\n    "updatedAt": "2026-07-31T17:15:03.705Z",\n    "sentAt": "2026-07-31T16:59:24.815Z",\n    "sentToBackofficeAt": "2026-07-31T16:59:25.942Z",\n    "finishedAt": "2026-07-31T17:15:03.704Z",\n    "errorMessage": null,\n    "errorCode": null,\n    "backofficeBatchId": "130956089",\n    "requestId": "9954b98c-7403-4308-9b3e-2dd1fd5a14eb",\n    "name": "EDUARDO TRINDADE BORGES",\n    "workflowPresetAlias": "documentoscopia_auto_base_face_15min",\n    "result": {\n        "id": "423d38dc-69a5-4354-8393-22b1e3314588",\n        "documentId": "13fb64fd-2b7e-4c3a-8ee4-49a17fe22843",\n        "status": "REJECTED",\n        "confidenceScore": 0,\n        "raw_response": {\n            "cpf": "78723187093",\n            "docs": [\n                {\n                    "keys": [],\n                    "type": "selfie",\n                    "docId": 40903059\n                },\n                {\n                    "keys": [\n                        {\n                            "value": "EDUARDO TRINDADE BORGES",\n                            "keyName": "Nome",\n                            "keyAlias": "nome"\n                        },\n                        {\n                            "value": "DAIANE TRINDADE BORGES",\n                            "keyName": "Filiação Mãe",\n                            "keyAlias": "filiacao_mae"\n                        },\n                        {\n                            "value": "11835568963",\n                            "keyName": "CPF",\n                            "keyAlias": "cpf"\n                        },\n                        {\n                            "value": "17/02/2033",\n                            "keyName": "Data Validade",\n                            "keyAlias": "data_validade"\n                        },\n                        {\n                            "value": "14/04/2023",\n                            "keyName": "Data Emissão",\n                            "keyAlias": "data_emissao"\n                        },\n                        {\n                            "value": "DETRAN",\n                            "keyName": "Órgão Emissor",\n                            "keyAlias": "orgao_emissor"\n                        },\n                        {\n                            "value": "PR",\n                            "keyName": "Detran UF",\n                            "keyAlias": "detran_uf"\n                        },\n                        {\n                            "value": "131949618",\n                            "keyName": "Número RG",\n                            "keyAlias": "doc_identidade_numero"\n                        },\n                        {\n                            "value": "SESP",\n                            "keyName": "Órgão Expedidor RG",\n                            "keyAlias": "doc_identidade_orgao"\n                        },\n                        {\n                            "value": "PR",\n                            "keyName": "UF Órgão Expedidor RG",\n                            "keyAlias": "doc_identidade_uf"\n                        },\n                        {\n                            "value": "JOAO PAULO BORGES",\n                            "keyName": "Filiação Pai",\n                            "keyAlias": "filiacao_pai"\n                        },\n                        {\n                            "value": "PR923097795",\n                            "keyName": "Renach",\n                            "keyAlias": "security_code_2"\n                        },\n                        {\n                            "value": "2587535978",\n                            "keyName": "Número Espelho",\n                            "keyAlias": "num_espelho"\n                        },\n                        {\n                            "value": "90643746154",\n                            "keyName": "Número Segurança",\n                            "keyAlias": "security_code_1"\n                        },\n                        {\n                            "value": "26/12/1999",\n                            "keyName": "Data Nascimento",\n                            "keyAlias": "data_nascimento"\n                        },\n                        {\n                            "value": "22/05/2018",\n                            "keyName": "Data Habilitação",\n                            "keyAlias": "data_habilitacao"\n                        },\n                        {\n                            "value": "07058257759",\n                            "keyName": "Número Registro",\n                            "keyAlias": "num_registro"\n                        }\n                    ],\n                    "type": "cnh",\n                    "docId": 40903058,\n                    "docName": "Documento de Identidade",\n                    "docType": "doc_identidade"\n                }\n            ],\n            "result": 2,\n            "checklist": [],\n            "data_inicio": "31/07/2026 13:59:25",\n            "external_id": "9954b98c-7403-4308-9b3e-2dd1fd5a14eb",\n            "penalidades": [\n                {\n                    "data": "31/07/2026 17:14:58",\n                    "desc": "(RF_01) Não foi possível pesquisar CPF informado (78723187093) na RF",\n                    "rule": "rf_01",\n                    "type": 1,\n                    "score": 100\n                },\n                {\n                    "data": "31/07/2026 17:14:58",\n                    "desc": "(OCR_01) CPF obtido no OCR do documento (11835568963) é diferente de nulo e divergente com CPF informado (78723187093)",\n                    "rule": "ocr_01",\n                    "type": 1,\n                    "score": 100\n                }\n            ],\n            "tipo_documento": "CNH",\n            "codigo_controle": 130956089,\n            "codigo_rejeicao": [],\n            "indice_facematch": "1",\n            "indice_avaliacao_autenticidade": "0"\n        },\n        "processedBy": "backoffice",\n        "createdAt": "2026-07-31T17:15:03.705Z"\n    }\n}',
      },
    ],
  },
  {
    title: 'Backoffice',
    baseUrl: 'https://uat-onboarding.corebanxapp.com.br',
    partner: 'Corebanx',
    description:
      'Endpoints administrativos de backoffice: listagem de onboardings por tenant, aprovação/reprovação de onboarding e consulta de documentos de uma entidade.',
    endpoints: [
      {
        method: 'GET',
        path: '/v1/kyc/onboardings',
        summary: 'List Onboardings by Tenant',
        tags: ['Backoffice'],
        parameters: [
          {
            name: 'tenant_id',
            in: 'query',
            required: true,
            type: 'string',
          },
          {
            name: 'page',
            in: 'query',
            required: true,
            type: 'string',
          },
          {
            name: 'limit',
            in: 'query',
            required: true,
            type: 'string',
            description: 'max 100',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/kyc/onboardings/{onboarding_id}/reject',
        summary: 'Reject Onboarding',
        tags: ['Backoffice'],
        parameters: [
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
        requestBody: '{\n  "reason": "fraudulent documents"\n}',
      },
      {
        method: 'POST',
        path: '/v1/kyc/onboardings/{onboarding_id}/approve',
        summary: 'Approve Onboarding',
        tags: ['Backoffice'],
        parameters: [
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
      },
      {
        method: 'GET',
        path: '/v1/documents/neobiz/{entity_id}',
        summary: 'Get Entity Documents',
        tags: ['Backoffice'],
      },
    ],
  },
];
