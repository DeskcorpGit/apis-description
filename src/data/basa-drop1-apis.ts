import type { ApiData } from '@/types/api';

/**
 * Dados extraídos do Runbook de Testes Técnicos BASA - Drop 1.
 * Cada item do array representa uma seção do documento original
 * contendo seus respectivos endpoints.
 */
export const basaApiSections: ApiData[] = [
  // ─── Seção 4 ───
  {
    title: 'Obter Modelo de Documentação',
    description:
      'Endpoint responsável por retornar os modelos de documentação disponibilizados pela Neobiz de acordo com o valor especificado no parâmetro assuntoId. Os valores do parâmetro assuntoId referentes aos documentos disponibilizados são 20, 21 e 22.',
    baseUrl: 'https://plataforma.neobiz.com.br',
    endpoints: [
      {
        method: 'GET',
        path: '/bpm/app/public/obtemModeloDocumento',
        krakendUrl:
          'https://krakend-transact-sit.apps.ocp-core-stage.bancoamazonia.sa/api/v1/onboarding/neobiz/obtemModeloDocumento',
        summary: 'Obter modelo de documentação por assuntoId',
        tags: ['Neobiz', 'Documentação'],
        parameters: [
          {
            name: 'apikey',
            in: 'header',
            required: true,
            type: 'string',
            description: 'Chave da API',
          },
          {
            name: 'assuntoId',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'Identificador único do documento que virá a ser retornado',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'assuntoId informado corretamente',
            example:
              '{\n  "fileName": "Modelo_02_01_01_01_03_v1.pdf",\n  "sucesso": true,\n  "assuntoId": 20\n}',
          },
          {
            statusCode: '400',
            description: 'assuntoId informado inexistente',
            example: '{ "erro": "Nenhuma versão encontrada para o código: " }',
          },
          {
            statusCode: '401',
            description: 'apikey mal informada',
            example: '{ "erro": "API Key inválida ou não fornecida." }',
          },
        ],
      },
    ],
  },

  // ─── Seção 5 ───
  {
    title: 'Consulta do CEP',
    description:
      'Endpoint referente a verificação do CEP informado no fluxo de onboarding.',
    baseUrl: 'https://plataforma.neobiz.com.br',
    endpoints: [
      {
        method: 'POST',
        path: '/bpm/app/public/consultar/endereco',
        krakendUrl:
          'https://krakend-transact-sit.apps.ocp-core-stage.bancoamazonia.sa/api/v1/onboarding/neobiz/consultaCEP',
        summary: 'Consultar endereço por CEP',
        tags: ['Neobiz', 'Endereço'],
        requestBody: JSON.stringify(
          {
            cep: '66045-205',
          },
          null,
          2,
        ),
        parameters: [
          {
            name: 'page_size',
            in: 'query',
            required: true,
            type: 'string',
            description: 'Referente aos itens retornados',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'CEP informado existe e possui formato válido',
            example:
              '{\n  "dados": [{\n    "estado": "Pará",\n    "bairro": "Cremação",\n    "localidade": "Belém",\n    "cep": "66045-205",\n    "uf": "PA"\n  }]\n}',
          },
          {
            statusCode: '400',
            description: 'CEP informado é inválido ou inexistente',
            example: '{ "erro": "Erro ao consultar dados" }',
          },
        ],
      },
    ],
  },

  // ─── Seção 6 ───
  {
    title: 'Obter Lista de Empregos',
    description:
      'Endpoint referente ao retorno da lista de empregos disponibilizados no processo de onboarding da aplicação.',
    baseUrl:
      'https://transact-api-transact-uat.apps.ocp-core-stage.bancoamazonia.sa',
    endpoints: [
      {
        method: 'GET',
        path: '/irf-provider-container/api/v1.0.0/reference/jobTitles',
        summary: 'Listar empregos disponíveis',
        tags: ['Transact', 'Referência'],
        parameters: [
          {
            name: 'page_size',
            in: 'query',
            required: true,
            type: 'string',
            description: 'Referente aos itens retornados',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description:
              'Endpoint formatado corretamente com seus respectivos parâmetros',
            example:
              '{\n  "header": { "total_size": 2694, "status": "success" },\n  "body": [{ "jobTitleName": "Oficial general da aeronáutica", "jobTitleId": "010105" }]\n}',
          },
          {
            statusCode: '400',
            description: 'Credenciais informadas de maneira inválida',
            example:
              '{ "error": "invalid_client", "message": "Client authentication failed" }',
          },
        ],
      },
    ],
  },

  // ─── Seção 7 ───
  {
    title: 'Token Authcube (Esqueci a Senha)',
    description:
      'Endpoint responsável por gerar o token de recuperação de senha. Este token deve ser enviado no cabeçalho de autorização (Bearer Token) para validar as requisições nas próximas etapas do fluxo.',
    baseUrl: 'https://oauthcube-devqa.basa.com.br',
    endpoints: [
      {
        method: 'POST',
        path: '/BasaUAT/connect/token',
        summary: 'Gerar token de recuperação de senha',
        tags: ['AuthCube', 'Autenticação'],
        requestBody:
          'grant_type=client_credentials&client_id=basa-mobile&client_secret=secret123',
        parameters: [],
        responses: [
          {
            statusCode: '200',
            description: 'Credenciais informadas corretamente',
            example:
              '{\n  "access_token": "eyJhbGciOiJSUzI1NiIs...",\n  "expires_in": 3600,\n  "token_type": "Bearer"\n}',
          },
          {
            statusCode: '422',
            description: 'CPF informado era inválido',
            example:
              '{ "error": "create person entity: invalid CPF: check digit mismatch" }',
          },
          {
            statusCode: '500',
            description: 'client_id informado é inválido',
            example:
              '{ "code": 500, "message": "The server encountered an internal error..." }',
          },
          {
            statusCode: '401',
            description: 'client_secret informado é inválido',
            example: '{ "error": "invalid_client" }',
          },
        ],
      },
    ],
  },

  // ─── Seção 8 ───
  {
    title: 'Esqueci a Senha',
    description:
      'Endpoint responsável pelo processo de recuperação de senha durante a retomada do fluxo. Faz-se necessário o token da seção 7 para o disparo desse endpoint.',
    baseUrl: 'https://oauthcube-devqa.basa.com.br',
    endpoints: [
      {
        method: 'PUT',
        path: '/api/applications/BasaUAT/users/{cpf}',
        summary: 'Redefinir senha do usuário',
        tags: ['AuthCube', 'Recuperação'],
        requestBody: JSON.stringify({ new_password: '@NovaSenha123' }, null, 2),
        parameters: [],
        responses: [
          {
            statusCode: '200',
            description: 'CPF e senha inseridos corretamente',
            example: '{ "success": true }',
          },
          {
            statusCode: '401',
            description: 'Token informado é inválido',
            example:
              '{ "error": "invalid_token", "error_description": "The access token provided is expired, revoked, malformed, or invalid for other reasons." }',
          },
        ],
      },
    ],
  },

  // ─── Seção 9 ───
  {
    title: 'Criação de Entidade',
    description:
      'Processo referente a criação de entidade no fluxo de onboarding do Digital. O processo de criação de entidade ocorre primeiramente com a criação no Fabric, onde pode ser obtido o OTP no smartphone inserindo as credenciais corretas.',
    baseUrl: 'https://uat-onboarding.corebanxapp.com.br',
    endpoints: [
      {
        method: 'POST',
        path: '/v1/onboarding/entities',
        krakendUrl:
          'https://krakend-transact-sit.apps.ocp-core-stage.bancoamazonia.sa/api/v1/onboarding/corebanx/createEntity',
        summary: 'Criar entidade de pessoa física',
        tags: ['Corebanx', 'Onboarding'],
        requestBody: JSON.stringify(
          {
            cpf: '92091243086',
            password: '@Senha123',
            phoneNumber: '992670714',
            ddd: '91',
          },
          null,
          2,
        ),
        parameters: [],
        responses: [
          {
            statusCode: '200',
            description: 'CPF válido junto com os demais dados',
            example:
              '{\n  "person_entity_id": "45616b6f-1869-436e-889a-3bb7e19dc6be",\n  "cpf": "394.499.710-72",\n  "created_at": "2026-05-15T21:41:18.134794395Z"\n}',
          },
          {
            statusCode: '422',
            description: 'CPF informado era inválido',
            example:
              '{ "error": "create person entity: invalid CPF: check digit mismatch" }',
          },
          {
            statusCode: '409',
            description: 'CPF informado já existia',
            example:
              '{ "error": "create person entity: invalid CPF: check digit mismatch" }',
          },
        ],
      },
    ],
  },

  // ─── Seção 10 ───
  {
    title: 'Login de Entidade',
    description:
      'Endpoint referente a obtenção de token que contém as credenciais do usuário informadas durante o fluxo de onboarding. Esse endpoint deverá retornar um token que será utilizado nos endpoints referentes a Corebanx.',
    baseUrl: 'https://oauthcube-devqa.basa.com.br',
    endpoints: [
      {
        method: 'POST',
        path: '/BasaSIT/connect/token',
        krakendUrl:
          'https://krakend-transact-sit.apps.ocp-core-stage.bancoamazonia.sa/api/v1/onboarding/authcube/login',
        summary: 'Obter token de login da entidade',
        tags: ['AuthCube', 'Autenticação'],
        requestBody:
          'grant_type=password&username=92091243086&password=@Senha123&client_id=basa-mobile',
        parameters: [],
        responses: [
          {
            statusCode: '200',
            description:
              'Credenciais do usuário informadas corretamente (CPF e senha já cadastrados)',
            example:
              '{\n  "access_token": "eyJhbGciOiJSUzI1NiIs...",\n  "expires_in": 3600,\n  "scope": "profile",\n  "token_type": "Bearer"\n}',
          },
          {
            statusCode: '400',
            description: 'CPF e senha ainda não cadastrados no sistema',
            example:
              '{ "error": "invalid_request", "error_description": "Invalid username or password in request." }',
          },
          {
            statusCode: '500',
            description: 'Inserção de clientId inválido',
            example:
              '{ "code": 500, "message": "The server encountered an internal error..." }',
          },
          {
            statusCode: '401',
            description: 'Inserção de clientSecret inválido',
            example: '{ "error": "invalid_client" }',
          },
        ],
      },
    ],
  },

  // ─── Seção 11 ───
  {
    title: 'Aceitação de Termos',
    description:
      'Endpoint da Corebanx referente a aceitação de termos para divulgação de produtos promocionais da plataforma. Faz-se necessária a utilização do token gerado pelo endpoint de login de entidade.',
    baseUrl: 'https://uat-onboarding.corebanxapp.com.br',
    endpoints: [
      {
        method: 'POST',
        path: '/v1/onboarding/accept-terms',
        krakendUrl:
          'https://krakend-transact-sit.apps.ocp-core-stage.bancoamazonia.sa/api/v1/onboarding/corebanx/acceptedTerms',
        summary: 'Aceitar termos de uso',
        tags: ['Corebanx', 'Onboarding'],
        requestBody: JSON.stringify(
          { accepted_terms: true, term_version: 'v1.0' },
          null,
          2,
        ),
        parameters: [],
        responses: [
          {
            statusCode: '200',
            description: 'Token informado corretamente',
            example:
              '{\n  "person_entity_id": "b5d26843-60e5-4feb-90e5-4a04d22bc255",\n  "accepted_terms": true,\n  "accepted_terms_at": "2026-05-15T20:13:22.827453603Z"\n}',
          },
          {
            statusCode: '401',
            description: 'Token utilizado já expirou ou é inválido',
            example: '{ "error": "invalid token: token expired" }',
          },
        ],
      },
    ],
  },

  // ─── Seção 12 ───
  {
    title: 'Checagem de CPF',
    description:
      'Endpoint da Corebanx referente a checagem de CPF da entidade criada no Transact. Verifica CPFs cadastrados, não cadastrados e com reset.',
    baseUrl: 'https://uat-onboarding.corebanxapp.com.br',
    endpoints: [
      {
        method: 'POST',
        path: '/v1/onboarding/check-cpf',
        krakendUrl:
          'https://krakend-transact-sit.apps.ocp-core-stage.bancoamazonia.sa/api/v1/onboarding/corebanx-new/checkCPF',
        summary: 'Verificar existência do CPF no sistema',
        tags: ['Corebanx', 'Onboarding'],
        requestBody: JSON.stringify({ cpf: '89358479094' }, null, 2),
        parameters: [],
        responses: [
          {
            statusCode: '200',
            description: 'CPF válido (existe, não existe ou com reset)',
            example:
              '{\n  "exists": true,\n  "cpf_formatted": "893.584.790-94",\n  "person_entity_id": "b5d26843-...",\n  "type": "PF",\n  "has_resets": false\n}',
          },
          {
            statusCode: '422',
            description: 'CPF possui formato inválido',
            example:
              '{ "error": "check cpf: invalid CPF: must have 11 digits" }',
          },
        ],
      },
    ],
  },

  // ─── Seção 13 ───
  {
    title: 'Atualização de Dados da Entidade',
    description:
      'Endpoint da Corebanx referente a atualização dos dados preenchidos da entidade durante o fluxo de onboarding. Necessita do token obtido pelo endpoint de login de entidade.',
    baseUrl: 'https://uat-onboarding.corebanxapp.com.br',
    endpoints: [
      {
        method: 'PUT',
        path: '/v1/onboarding/demographics',
        krakendUrl:
          'https://krakend-transact-sit.apps.ocp-core-stage.bancoamazonia.sa/api/v1/onboarding/corebanx/updatePerson',
        summary: 'Atualizar dados demográficos da entidade',
        tags: ['Corebanx', 'Onboarding'],
        requestBody: JSON.stringify(
          {
            fullName: 'Alison Ricardo Santos',
            birthDate: '1990-05-15',
            motherName: 'Maria Santos',
            gender: 'M',
            maritalStatus: 'SINGLE',
          },
          null,
          2,
        ),
        parameters: [],
        responses: [
          {
            statusCode: '200',
            description: 'Dados atualizados com sucesso e token válido',
            example:
              '{\n  "person_entity_id": "b5d26843-60e5-4feb-90e5-4a04d22bc255",\n  "updated_at": "2026-05-15T20:46:57.376793181Z"\n}',
          },
          {
            statusCode: '401',
            description: 'Token informado é inválido ou expirado',
            example: '{ "error": "invalid token: token expired" }',
          },
        ],
      },
    ],
  },

  // ─── Seção 14 ───
  {
    title: 'Submissão de Entidade',
    description:
      'Endpoint da Corebanx referente a submissão dos dados preenchidos durante o fluxo de onboarding. Necessita do token obtido pelo endpoint de login de entidade.',
    baseUrl: 'https://uat-onboarding.corebanxapp.com.br',
    endpoints: [
      {
        method: 'POST',
        path: '/v1/onboarding/submit',
        krakendUrl:
          'https://krakend-transact-sit.apps.ocp-core-stage.bancoamazonia.sa/api/v1/onboarding/corebanx/submitEntity',
        summary: 'Submeter dados de onboarding para revisão',
        tags: ['Corebanx', 'Onboarding'],
        requestBody: JSON.stringify({ confirm_data: true }, null, 2),
        parameters: [],
        responses: [
          {
            statusCode: '200',
            description: 'Dados submetidos com sucesso e token válido',
            example:
              '{\n  "person_entity_id": "b5d26843-...",\n  "onboarding_status": "PENDING_REVIEW",\n  "updated_at": "2026-05-15T21:04:37.887915374Z"\n}',
          },
          {
            statusCode: '401',
            description: 'Token informado já expirou ou é inválido',
            example: '{ "error": "invalid token: token expired" }',
          },
        ],
      },
    ],
  },

  // ─── Seção 15 ───
  {
    title: 'Deleção de Entidade',
    description:
      'Endpoint da Corebanx referente ao reset dos dados da entidade preenchida no onboarding antes do estado de submissão dos dados. Necessita do token obtido pelo endpoint de login de entidade.',
    baseUrl: 'https://uat-onboarding.corebanxapp.com.br',
    endpoints: [
      {
        method: 'POST',
        path: '/v1/onboarding/reset/entity',
        krakendUrl:
          'https://krakend-transact-sit.apps.ocp-core-stage.bancoamazonia.sa/api/v1/onboarding/corebanx/deleteEntity',
        summary: 'Resetar dados da entidade',
        tags: ['Corebanx', 'Onboarding'],
        parameters: [],
        responses: [
          {
            statusCode: '200',
            description: 'Entidade resetada com sucesso e token válido',
            example:
              '{ "message": "Usuário resetado com sucesso.", "status": 200 }',
          },
          {
            statusCode: '401',
            description: 'Token informado já expirou ou é inválido',
            example: '{ "error": "invalid token: token expired" }',
          },
        ],
      },
    ],
  },

  // ─── Seção 16 ───
  {
    title: 'Obtenção de Token do IDVerse',
    description:
      'Endpoint referente a obtenção de Token do IDVerse para disparo posterior dos endpoints que iniciariam o processo de escaneamento de documento.',
    baseUrl: 'https://staging.bancobasa.idkit.co',
    endpoints: [
      {
        method: 'POST',
        path: '/api/3.5/oauthToken',
        krakendUrl:
          'https://krakend-transact-sit.apps.ocp-core-stage.bancoamazonia.sa/api/v1/onboarding/idverse/oauthToken',
        summary: 'Obter token OAuth do IDVerse',
        tags: ['IDVerse', 'Autenticação'],
        parameters: [],
        responses: [
          {
            statusCode: '200',
            description: 'Request body preenchido corretamente',
            example:
              '{\n  "token_type": "Bearer",\n  "expires_in": 900,\n  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1Ni..."\n}',
          },
          {
            statusCode: '400',
            description: 'Credenciais informadas de maneira inválida',
            example:
              '{ "error": "invalid_client", "message": "Client authentication failed" }',
          },
        ],
      },
    ],
  },

  // ─── Seção 17 ───
  {
    title: 'Disparo do StoreTransaction',
    description:
      'Endpoint referente a inicialização do processo de escaneamento de documento e escaneamento facial do IDVerse. Retorna um link referente ao QR Code para inicialização do processo.',
    baseUrl: 'https://staging.bancobasa.idkit.co',
    endpoints: [
      {
        method: 'POST',
        path: '/api/3.5/storeTransaction',
        krakendUrl:
          'https://krakend-transact-sit.apps.ocp-core-stage.bancoamazonia.sa/api/v1/onboarding/idverse/storeTransaction',
        summary: 'Iniciar processo de escaneamento facial e documentação',
        tags: ['IDVerse', 'Verificação'],
        parameters: [],
        responses: [
          {
            statusCode: '200',
            description: 'transactionId válido e demais campos corretos',
            example:
              '{ "status": "success", "url": "https://staging.bancobasa.idkit.co/b/fxuw0o" }',
          },
          {
            statusCode: '400',
            description:
              'transactionId inválido (já acionado ou formato incorreto) — retorna status error no body',
            example:
              '{ "status": "error", "message": "Error in storing data: v3.5" }',
          },
        ],
      },
    ],
  },

  // ─── Seção 18 ───
  {
    title: 'Obtenção dos Dados do IDVerse (Transaction Data)',
    description:
      'Endpoint referente aos dados obtidos do processo de escaneamento facial e de documentação. Verifica documentos submetidos, status do processo e informações referentes ao escaneamento.',
    baseUrl: 'https://staging.bancobasa.idkit.co',
    endpoints: [
      {
        method: 'GET',
        path: '/api/3.5/transaction/{transactionId}',
        summary: 'Obter dados da transação do IDVerse',
        tags: ['IDVerse', 'Verificação'],
        parameters: [],
        responses: [
          {
            statusCode: '200',
            description: 'transactionId informado é válido',
            example:
              '{\n  "transactionId": "a6fc0fd1-...",\n  "status": "COMPLETED_PASS",\n  "results": { "overall": "PASS" }\n}',
          },
          {
            statusCode: '404',
            description: 'transactionId inválido ou inexistente',
            example:
              '{ "status": "error", "message": "Transaction not found." }',
          },
        ],
      },
    ],
  },

  // ─── Seção 19 ───
  {
    title: 'Notificação de Decisão',
    description:
      'Endpoint referente ao disparo da criação de usuário no Digital. Após a finalização do onboarding e submissão, ocorre o disparo do notifyDecision quando o status do onboarding for APPROVED.',
    baseUrl: 'https://fabric-infinity-uat.basa.com.br',
    endpoints: [
      {
        method: 'POST',
        path: '/services/OnboardingCompletion/notifyDecision',
        summary: 'Notificar decisão de aprovação do onboarding',
        tags: ['Fabric', 'Onboarding'],
        parameters: [],
        responses: [
          {
            statusCode: '200',
            description:
              'Payload informado corretamente e onboarding status é APPROVED',
            example:
              '{\n  "coreCustomerId": "1000000706",\n  "message": "Customer approved successfully!",\n  "accountNumber": "1000073756",\n  "status": "success"\n}',
          },
          {
            statusCode: '400',
            description:
              'Onboarding status diferente de APPROVED — retorna erro no body',
            example:
              '{ "errcode": 100052, "errmsg": "Missing or invalid review_reason", "opstatus": -1, "httpStatusCode": 400 }',
          },
        ],
      },
    ],
  },

  // ─── Seção 20 ───
  {
    title: 'Criação do Customer',
    description:
      'Endpoint introduzido nas etapas finais de criação do usuário no Transact. Responsável pela criação do usuário permitindo a inserção dos dados cadastrais.',
    baseUrl: 'https://iris-transact-sit.apps.ocp-core-stage.bancoamazonia.sa',
    endpoints: [
      {
        method: 'POST',
        path: '/irf-extension-api/api/v1.0.0/party/customers/createCustomer',
        krakendUrl:
          'https://krakend-transact-sit.apps.ocp-core-stage.bancoamazonia.sa/api/v1/onboarding/temenos-iris/createCustomer',
        summary: 'Criar customer no Transact',
        tags: ['Transact', 'Customer'],
        parameters: [],
        responses: [
          {
            statusCode: '200',
            description: 'Dados informados corretamente (ou 201 Created)',
            example:
              '{\n  "header": { "id": "1000000697", "status": "success" },\n  "body": { "customerMnemonic": "R41928105068" }\n}',
          },
          {
            statusCode: '400',
            description: 'Mnemônico já existe ou formato incorreto',
            example:
              '{ "error": { "type": "BUSINESS", "errorDetails": [{ "fieldName": "customerMnemonic", "code": "E-115490" }] } }',
          },
        ],
      },
    ],
  },

  // ─── Seção 21 ───
  {
    title: 'Captura dos Dados do Customer Transact',
    description:
      'Endpoint responsável por retornar os dados referentes ao usuário criado no Transact, a partir do mnemônico do usuário.',
    baseUrl: 'https://iris-transact-uat.apps.ocp-core-stage.bancoamazonia.sa',
    endpoints: [
      {
        method: 'GET',
        path: '/irf-extension-api/api/v1.0.0/party/customers/getCustomerData',
        krakendUrl:
          'https://krakend-transact-sit.apps.ocp-core-stage.bancoamazonia.sa/api/v1/onboarding/temenos-iris/getCustomerData',
        summary: 'Obter dados do customer por mnemônico',
        tags: ['Transact', 'Customer'],
        parameters: [
          {
            name: 'mnemonic',
            in: 'query',
            required: true,
            type: 'string',
            description: 'Identificador único do usuário',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'Mnemônico informado corretamente',
            example:
              '{\n  "header": { "total_size": 1, "status": "success" },\n  "body": [{ "customerMnemonic": "R87523602029", "customerId": "1000000698" }]\n}',
          },
          {
            statusCode: '404',
            description:
              'Mnemônico não existe no Transact (retorna body vazio)',
            example:
              '{ "header": { "total_size": 0, "status": "success" }, "body": [] }',
          },
        ],
      },
    ],
  },

  // ─── Seção 22 ───
  {
    title: 'Atualização de Renda e Patrimônio',
    description:
      'Endpoint responsável pela atualização de renda e patrimônio do usuário no Transact. Utiliza o coreCustomerId obtido no createCustomer.',
    baseUrl: 'https://iris-transact-uat.apps.ocp-core-stage.bancoamazonia.sa',
    endpoints: [
      {
        method: 'PUT',
        path: '/irf-extension-api/api/v1.0.0/party/customers/updateIncomeAssets/{coreCustomerId}',
        krakendUrl:
          'https://krakend-transact-sit.apps.ocp-core-stage.bancoamazonia.sa/api/v1/onboarding/temenos-iris/updateIncomeAssets/{coreCustomerId}',
        summary: 'Atualizar renda e patrimônio do customer',
        tags: ['Transact', 'Customer'],
        parameters: [],
        responses: [
          {
            statusCode: '200',
            description:
              'coreCustomerId informado corretamente junto com os demais campos',
            example:
              '{\n  "header": { "id": "1000000599", "status": "success" },\n  "body": { "declaredAssets": "3000000", "declaredIncome": "10000" }\n}',
          },
          {
            statusCode: '400',
            description:
              'coreCustomerId inválido, já atualizado ou inexistente',
            example:
              '{ "error": { "type": "BUSINESS", "errorDetails": [{ "code": "E-130147" }] } }',
          },
        ],
      },
    ],
  },

  // ─── Seção 23 ───
  {
    title: 'Criação de Conta no Transact',
    description:
      'Endpoint responsável pela criação definitiva do registro no Transact, após a criação de customer e atualização de renda e patrimônio.',
    baseUrl:
      'https://transact-api-transact-uat.apps.ocp-core-stage.bancoamazonia.sa',
    endpoints: [
      {
        method: 'POST',
        path: '/irf-provider-container/api/v9.4.0/holdings/accounts/currentAccounts',
        summary: 'Criar conta corrente no Transact',
        tags: ['Transact', 'Conta'],
        parameters: [],
        responses: [
          {
            statusCode: '200',
            description: 'coreCustomerId informado corretamente',
            example:
              '{\n  "header": { "transactionStatus": "Live" },\n  "body": { "accountId": "1000073818" },\n  "httpStatusCode": 200\n}',
          },
          {
            statusCode: '400',
            description: 'coreCustomerId inválido ou inexistente',
            example:
              '{ "error": { "type": "BUSINESS", "errorDetails": [{ "code": "E-130147" }] } }',
          },
        ],
      },
    ],
  },

  // ─── Seção 24 ───
  {
    title: 'Obtenção de Informação dos Dados de Onboarding',
    description:
      'Endpoint responsável pela obtenção dos dados referentes ao que foi preenchido no fluxo de onboarding do Digital, exibindo status do onboarding, status do IDVerse e os demais dados informados.',
    baseUrl: 'https://uat-onboarding.corebanxapp.com.br',
    endpoints: [
      {
        method: 'GET',
        path: '/v1/onboarding/info',
        krakendUrl:
          'https://krakend-transact-sit.apps.ocp-core-stage.bancoamazonia.sa/api/v1/onboarding/corebanx/loginEntity',
        summary: 'Obter informações completas do onboarding',
        tags: ['Corebanx', 'Onboarding'],
        parameters: [],
        responses: [
          {
            statusCode: '200',
            description: 'Token do login de entidade informado corretamente',
            example:
              '{\n  "person_entity": {\n    "onboarding_status": "APPROVED",\n    "status_idverse": "COMPLETED_PASS"\n  },\n  "phone": { "ddd": "91", "number": "981070110" },\n  "address": { "city": "Ananindeua", "state": "PA" }\n}',
          },
          {
            statusCode: '401',
            description: 'Token informado já expirou ou é inválido',
            example: '{ "error": "invalid token: token expired" }',
          },
        ],
      },
    ],
  },

  // ─── Seção 25 ───
  {
    title: 'Carregamento de taxas BASIC.INTEREST',
    description:
      'Cadastro base corporativo — API referente a criação das taxas utilizadas em cima de um empréstimo de um determinado usuário.',
    baseUrl:
      'https://transact-api-transact-uat.apps.ocp-core-stage.bancoamazonia.sa',
    endpoints: [
      {
        method: 'POST',
        path: '/irf-provider-container/api/v1.3.0/reference/interestRates/{rateId}/floatingRates',
        summary: 'Carregar taxas BASIC.INTEREST',
        tags: ['Transact', 'Cadastro Base'],
        parameters: [
          {
            name: 'rateId',
            in: 'query',
            required: true,
            type: 'string',
            description: 'Identificador da taxa',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'Submissão final dos dados coletados (200 ou 201)',
            example:
              '{\n  "header": { "id": "10BRL20100826", "status": "success" },\n  "body": { "interestRate": "0.32" }\n}',
          },
          {
            statusCode: '400',
            description: 'Erro na criação de taxas BASIC.INTEREST',
            example:
              '{\n  "header": {\n    "transactionStatus": "Error",\n    "status": "failed"\n  },\n  "error": {\n    "type": "BUSINESS"\n  }\n}',
          },
        ],
      },
    ],
  },

  // ─── Seção 26 ───
  {
    title: 'Carregamento de taxas PERIODIC.INTEREST',
    description:
      'Cadastro base corporativo — API referente a criação das taxas periódicas utilizadas em cima de um empréstimo de um determinado usuário.',
    baseUrl:
      'https://transact-api-transact-uat.apps.ocp-core-stage.bancoamazonia.sa',
    endpoints: [
      {
        method: 'POST',
        path: '/irf-provider-container/api/v1.3.0/reference/interestRates/{rateId}/periodicRates',
        summary: 'Carregar taxas PERIODIC.INTEREST',
        tags: ['Transact', 'Cadastro Base'],
        parameters: [],
        responses: [
          {
            statusCode: '200',
            description: 'Submissão final dos dados coletados (200 ou 201)',
            example:
              '{\n  "header": { "id": "01BRL20090101", "status": "success" },\n  "body": { "interestCondition": [{ "period": "01D", "rates": [{ "bidRate": "1.82574" }] }] }\n}',
          },
          {
            statusCode: '400',
            description: 'Erro na criação de taxas PERIODIC.INTEREST',
            example:
              '{\n  "header": {\n    "transactionStatus": "Error",\n    "status": "failed"\n  },\n  "error": {\n    "type": "BUSINESS"\n  }\n}',
          },
        ],
      },
    ],
  },

  // ─── Seção 27 ───
  {
    title: 'Rendimentos de Patrimônio',
    description:
      'Cadastro base corporativo — API referente a criação dos rendimentos de patrimônio para um determinado usuário.',
    baseUrl: 'https://iris-transact-uat.apps.ocp-core-stage.bancoamazonia.sa',
    endpoints: [
      {
        method: 'POST',
        path: '/irf-extension-api/api/v1.0.0/party/customers/createIncomesAssets/{customerId}',
        summary: 'Criar rendimentos de patrimônio',
        tags: ['Transact', 'Cadastro Base'],
        parameters: [],
        responses: [
          {
            statusCode: '200',
            description: 'Submissão final dos dados coletados (200 ou 201)',
            example:
              '{\n  "header": { "id": "1000000021", "status": "success" },\n  "body": { "declaredIncome": "10000", "declaredAssets": "13000" }\n}',
          },
          {
            statusCode: '400',
            description: 'Erro na criação de rendimentos de patrimônio',
            example:
              '{\n  "header": {\n    "transactionStatus": "Error",\n    "status": "failed"\n  },\n  "error": {\n    "type": "BUSINESS"\n  }\n}',
          },
        ],
      },
    ],
  },

  // ─── Seção 28 ───
  {
    title: 'Criação de Feriados',
    description:
      'Cadastro base corporativo — API referente a criação de feriados no cadastro base corporativo.',
    baseUrl:
      'https://transact-api-transact-uat.apps.ocp-core-stage.bancoamazonia.sa',
    endpoints: [
      {
        method: 'POST',
        path: '/irf-provider-container/api/v1.1.0/reference/dates/holidays/{holidayId}',
        summary: 'Criar feriados no cadastro base',
        tags: ['Transact', 'Cadastro Base'],
        parameters: [],
        responses: [
          {
            statusCode: '200',
            description: 'Submissão final dos dados coletados (200 ou 201)',
            example:
              '{\n  "header": { "id": "BR002037", "status": "success" },\n  "body": { "publicHolidays": [{ "month01Holidays": "01" }] }\n}',
          },
          {
            statusCode: '400',
            description: 'Erro na criação de feriados',
            example:
              '{\n  "header": {\n    "transactionStatus": "Error",\n    "status": "failed"\n  },\n  "error": {\n    "type": "BUSINESS"\n  }\n}',
          },
        ],
      },
    ],
  },
];
