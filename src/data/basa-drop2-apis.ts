import type { ApiData } from "@/types/api"

/**
 * Dados extraídos do Runbook de Testes Técnicos BASA - Drop 2.
 * Cada item do array representa uma seção do documento original
 * contendo seus respectivos endpoints.
 */
export const basaApiSectionsDrop2: ApiData[] = [
  // ─── Seção 6 ───
  {
    title: "Declaração de PEP",
    description: "Endpoint responsável pela definição de um cliente PEP, no qual definiria se um determinado cliente é uma pessoa pública ou não. Faz-se necessário a obtenção do token disponibilizado pelo endpoint de login de entidade.",
    baseUrl: "https://sit-onboarding.corebanxapp.com.br",
    endpoints: [
      {
        method: "POST",
        path: "/v1/onboarding/pep-declaration",
        summary: "Definir declaração de Pessoa Politicamente Exposta (PEP)",
        tags: ["Corebanx", "Onboarding", "Compliance"],
        parameters: [
          { name: "Authorization", in: "header", required: true, type: "string", description: "Bearer Token" }
        ],
        responses: [
          { 
            statusCode: "200", 
            description: "Obtido quando o token fornecido é válido juntamente ao corpo da requisição.", 
            example: `{\n  "person_entity_id": "d08434c6-972d-450a-b3fe-77f76b12023c",\n  "is_pep": true,\n  "declared_at": "2026-06-01T18:01:23.916337534Z"\n}` 
          },
          { 
            statusCode: "401", 
            description: "Obtido quando o token informado expirou.", 
            example: `{\n  "error": "invalid token: token expired"\n}` 
          },
        ],
      },
    ],
  },

  // ─── Seção 7 ───
  {
    title: "Envio do SessionId",
    description: "Endpoint responsável pelo envio do atributo sessionId que atua como um dos identificadores únicos do início do processo do IDVerse. O funcionamento desse endpoint é fundamentado no uso de um uuid que seria disparado como identificador único da seção do IDVerse.",
    baseUrl: "https://sit-onboarding.corebanxapp.com.br",
    endpoints: [
      {
        method: "GET",
        path: "/v1/onboarding/threat-metrix",
        krakendUrl: "https://krakend-transact-sit.apps.ocp-core-stage.bancoamazonia.sa/api/v1/onboarding/corebanx/updateSessionId",
        summary: "Envio do SessionId para IDVerse",
        tags: ["Corebanx", "Onboarding", "Segurança"],
        parameters: [
          { name: "Authorization", in: "header", required: true, type: "string", description: "Bearer Token" },
          { name: "session_id", in: "query", required: true, type: "string", description: "Identificador único da seção do IDVerse." }
        ],
        responses: [
          { 
            statusCode: "200", 
            description: "Obtido quando o sessionId é submetido corretamente.", 
            example: `{\n  "id": "ccf10a14-8cbb-43d4-885c-da2545229400",\n  "entity_id": "6b870435-2fcd-4a6a-818d-33a63c60dbc6",\n  "session_id": "83b66caf-4362-45ec-9a6d-d4dad4042f7e",\n  "ip_address": "",\n  "web_session_id": "",\n  "saved_at": "2026-05-31T22:47:20.09139282-03:00"\n}` 
          },
          { 
            statusCode: "401", 
            description: "Obtido quando o token informado expirou.", 
            example: `{\n  "error": "invalid token: token expired"\n}` 
          },
        ],
      },
    ],
  },

  // ─── Seção 8 ───
  {
    title: "NotifyDecision",
    description: "Endpoint responsável por inicializar o processo de criação do cliente na plataforma do Transact. Faz-se necessário que o onboarding_status possua o status APPROVED.",
    baseUrl: "https://fabric-infinity-sit.basa.com.br",
    endpoints: [
      {
        method: "POST", // Corrigido de GET para POST baseado no payload descrito no markdown
        path: "/services/OnboardingCompletion/notifyDecision",
        summary: "Notificar decisão de aprovação",
        tags: ["Fabric", "Onboarding"],
        parameters: [
          { name: "Authorization", in: "header", required: true, type: "string", description: "Bearer Token" }
        ],
        responses: [
          { 
            statusCode: "200", 
            description: "Obtido quando o payload é submetido corretamente (APPROVED).", 
            example: `{\n  "coreCustomerId": "1000000839",\n  "opstatus": 0,\n  "id": "1000000839",\n  "message": "Customer approved successfully!",\n  "accountNumber": "",\n  "status": "success",\n  "httpStatusCode": 0\n}` 
          },
          { 
            statusCode: "400", 
            description: "Obtido quando o onboarding_status é diferente de APPROVED.", 
            example: `{\n  "errcode": 100052,\n  "errmsg": "Missing or invalid 'review_reason': ",\n  "opstatus": -1,\n  "httpStatusCode": 400\n}` 
          },
        ],
      },
    ],
  },

  // ─── Seção 9 ───
  {
    title: "Get Customer Data",
    description: "Endpoint responsável pelo retorno dos dados do usuário cadastrado no sistema. Faz-se necessário informar o respectivo coreCustomerId.",
    baseUrl: "https://iris-transact-sit.apps.ocp-core-stage.bancoamazonia.sa",
    endpoints: [
      {
        method: "GET",
        path: "/irf-extension-api/api/v1.0.0/party/customers/getCustomerData",
        krakendUrl: "https://krakend-transact-sit.apps.ocp-core-stage.bancoamazonia.sa/api/v1/onboarding/temenos-iris/getCustomerData",
        summary: "Obter dados cadastrais do cliente",
        tags: ["Transact", "Customer"],
        parameters: [
          { name: "customerNo", in: "query", required: true, type: "integer", description: "Identificador único do usuário (coreCustomerId)." }
        ],
        responses: [
          { 
            statusCode: "200", 
            description: "Obtido quando o customerNo é existente.", 
            example: `{\n  "header": { "status": "success", "total_size": 1 },\n  "body": [{ "customerMnemonic": "C74086898004", "customerId": "1000000820", "customerName": "Eduardo Borges" }]\n}` 
          },
          { 
            statusCode: "400", 
            description: "Obtido quando o customerNo informado é inexistente (retorna body vazio).", 
            example: `{\n  "header": { "total_size": 0, "status": "success" },\n  "body": []\n}` 
          },
        ],
      },
    ],
  },

  // ─── Seção 10 ───
  {
    title: "Update Customer Data",
    description: "Endpoint responsável pela atualização dos dados do usuário (Endereço, contatos, status).",
    baseUrl: "https://iris-transact-sit.apps.ocp-core-stage.bancoamazonia.sa",
    endpoints: [
      {
        method: "PUT",
        path: "/irf-extension-api/api/v1.0.0/party/customers/getCustomerData",
        krakendUrl: "https://krakend-transact-sit.apps.ocp-core-stage.bancoamazonia.sa/api/v1/onboarding/temenos-iris/getCustomerData",
        summary: "Atualizar dados do cliente",
        tags: ["Transact", "Customer"],
        parameters: [
          { name: "customerNo", in: "query", required: true, type: "integer", description: "Identificador único do usuário." }
        ],
        responses: [
          { 
            statusCode: "200", 
            description: "Obtido quando o customerNo é existente e os campos possuem novos valores.", 
            example: `{\n  "header": { "transactionStatus": "Live", "id": "1000000820", "status": "success" },\n  "body": { "customerMnemonic": "C74086898004", "city": "Curitiba" }\n}` 
          },
          { 
            statusCode: "400", 
            description: "Valores já existem ou campo restrito (sectorId) foi modificado.", 
            example: `{\n  "header": { "status": "failed" },\n  "error": { "type": "BUSINESS", "errorDetails": [{ "code": "E-130147", "message": "GRAVADOR AO VIVO N?O ALTERADO" }] }\n}` 
          },
        ],
      },
    ],
  },

  // ─── Seção 11 ───
  {
    title: "Get BRBASE",
    description: "Endpoint responsável por buscar detalhes adicionais do cliente, como regime de taxas, renda declarada e exigências FATCA.",
    baseUrl: "https://iris-transact-sit.apps.ocp-core-stage.bancoamazonia.sa",
    endpoints: [
      {
        method: "GET",
        path: "/irf-extension-api/api/v1.0.0/party/customers/getCustomerAdditionalDetails/{customerNo}",
        summary: "Obter detalhes adicionais do cliente",
        tags: ["Transact", "Customer"],
        parameters: [
          { name: "customerNo", in: "path", required: true, type: "integer", description: "Identificador único do usuário." }
        ],
        responses: [
          { 
            statusCode: "200", 
            description: "Obtido quando o customerNo é existente.", 
            example: `{\n  "header": { "status": "success", "total_size": 1 },\n  "body": [{\n    "fatcaRequired": "NO",\n    "declaredAssets": "5000000.0",\n    "declaredIncome": "500000.0"\n  }]\n}` 
          },
          { 
            statusCode: "404", 
            description: "Obtido quando o customerNo é desconhecido.", 
            example: `{\n  "header": { "status": "failed" },\n  "error": { "code": "TGVCP-007", "message": "No records were found that matched the selection criteria" }\n}` 
          },
        ],
      },
    ],
  },

  // ─── Seção 12 ───
  {
    title: "Get Customer Accounts",
    description: "Endpoint responsável por expor os dados da corrente do coreCustomerId do usuário informado.",
    baseUrl: "https://transact-api-transact-sit.apps.ocp-core-stage.bancoamazonia.sa",
    endpoints: [
      {
        method: "GET",
        path: "/irf-provider-container/api/v4.0.0/holdings/customers/{customerNo}/holdings",
        summary: "Listar contas correntes e saldos do cliente",
        tags: ["Transact", "Holdings", "Contas"],
        parameters: [
          { name: "customerNo", in: "path", required: true, type: "integer", description: "Identificador único do usuário." }
        ],
        responses: [
          { 
            statusCode: "200", 
            description: "Obtido quando o customerNo é existente.", 
            example: `{\n  "header": { "status": "success", "total_size": 2 },\n  "body": [{\n    "totalAccountBalances": -144000,\n    "products": [{ "accountId": "1000004479", "availableBalance": -182000 }]\n  }]\n}` 
          },
          { 
            statusCode: "400", 
            description: "Obtido quando o customerNo é desconhecido.", 
            example: `{\n  "header": { "status": "failed" },\n  "error": { "code": "E-127924", "message": "NENHUM REGISTRO RETORNADO PELA SELEÇÃO BASEADA EM ROTINA" }\n}` 
          },
        ],
      },
    ],
  },

  // ─── Seção 13 ───
  {
    title: "Update Customer Income Assets",
    description: "Endpoint responsável por atualizar os dados de renda e patrimônio de um determinado usuário.",
    baseUrl: "https://iris-transact-sit.apps.ocp-core-stage.bancoamazonia.sa",
    endpoints: [
      {
        method: "PUT",
        path: "/irf-extension-api/api/v1.0.0/party/customers/updateIncomeAssets/{customerNo}",
        summary: "Atualizar renda e patrimônio",
        tags: ["Transact", "Customer"],
        parameters: [
          { name: "customerNo", in: "path", required: true, type: "integer", description: "Identificador único do usuário." }
        ],
        responses: [
          { 
            statusCode: "200", 
            description: "Obtido quando o customerNo é existente.", 
            example: `{\n  "header": { "status": "success", "id": "1000000603" },\n  "body": { "declaredAssets": "9881", "declaredIncome": "2240" }\n}` 
          },
          { 
            statusCode: "400", 
            description: "Obtido quando os valores informados são iguais aos presentes no Transact.", 
            example: `{\n  "header": { "status": "failed" },\n  "error": { "errorDetails": [{ "code": "E-130147", "message": "GRAVADOR AO VIVO N?O ALTERADO" }] }\n}` 
          },
        ],
      },
    ],
  },

  // ─── Seção 14 ───
  {
    title: "Obtenção de Modelo de Documento",
    description: "Obtenção do conteúdo de modelos de documentos (termos de uso, políticas). Retorna base64 (PDF/DOCX) e URL. A prioridade de parâmetros é: assuntoId > assuntoDesc > modelo.",
    baseUrl: "https://plataforma.neobiz.com.br",
    endpoints: [
      {
        method: "GET",
        path: "/bpm/app/public/obtemModeloDocumento",
        krakendUrl: "https://krakend-transact-sit.apps.ocp-core-stage.bancoamazonia.sa/api/v1/onboarding/neobiz/obtemModeloDocumento",
        summary: "Obter modelo de documento Neobiz",
        tags: ["Neobiz", "Documentos"],
        parameters: [
          { name: "apikey", in: "header", required: true, type: "string", description: "Chave da API de acesso à Neobiz" },
          { name: "modelo", in: "query", required: false, type: "string", description: "Código do modelo" },
          { name: "assuntoDesc", in: "query", required: false, type: "string", description: "Descrição do assunto" },
          { name: "assuntoId", in: "query", required: false, type: "string", description: "Identificador numérico do assunto" }
        ],
        responses: [
          { 
            statusCode: "200", 
            description: "Parâmetro registrado existente.", 
            example: `{\n  "fileName": "Modelo_02_01_01_01_01_v4.pdf",\n  "base64": "Conteúdo de Base64",\n  "viewerUrl": "https://plataforma.neobiz.com.br/...",\n  "sucesso": true\n}` 
          },
          { statusCode: "400", description: "Parâmetro ausente ou versão não encontrada.", example: `{\n  "sucesso": false,\n  "erro": "Parâmetro obrigatório não informado: modelo, assuntoDesc ou assuntoId."\n}` },
          { statusCode: "401", description: "API Key inválida.", example: `{\n  "sucesso": false,\n  "erro": "API Key inválida ou não fornecida."\n}` },
        ],
      },
    ],
  },

  // ─── Seção 15 ───
  {
    title: "Inserir Aceite de Termos e Condições",
    description: "Endpoint para registro de aceite de termos e condições por parte do usuário na plataforma Neobiz.",
    baseUrl: "https://plataforma.neobiz.com.br",
    endpoints: [
      {
        method: "POST",
        path: "/bpm/app/public/insereAceiteTermosCondicoes",
        krakendUrl: "https://krakend-transact-sit.apps.ocp-core-stage.bancoamazonia.sa/api/v1/onboarding/neobiz/inserirAceiteDeTermosPostLogin",
        summary: "Registrar aceite de termo",
        tags: ["Neobiz", "Documentos", "Compliance"],
        parameters: [
          { name: "apikey", in: "header", required: true, type: "string", description: "Chave da API" },
          { name: "Content-Type", in: "header", required: true, type: "string", description: "application/x-www-form-urlencoded OU application/json" }
        ],
        responses: [
          { statusCode: "200", description: "Aceite registrado com sucesso.", example: `{\n  "sucesso": true,\n  "mensagem": "Aceite registrado com sucesso."\n}` },
          { statusCode: "400", description: "Erro de validação.", example: `{\n  "sucesso": false,\n  "erroValidacao": "documento é obrigatório;"\n}` },
          { statusCode: "409", description: "Aceite Duplicado.", example: `{\n  "sucesso": false,\n  "mensagem": "Já existe um aceite registrado para estes dados."\n}` },
        ],
      },
    ],
  },

  // ─── Seção 16 ───
  {
    title: "Pesquisa das Aceitações de Termos e Condições",
    description: "Consulta dos registros de aceite de termos e condições que foram feitos pelos clientes.",
    baseUrl: "https://plataforma.neobiz.com.br",
    endpoints: [
      {
        method: "POST",
        path: "/bpm/app/public/pesquisaAceiteTermosCondicoes",
        krakendUrl: "https://krakend-transact-sit.apps.ocp-core-stage.bancoamazonia.sa/api/v1/onboarding/neobiz/pesquisaAceiteTermosCondicoes",
        summary: "Pesquisar aceites de termos",
        tags: ["Neobiz", "Documentos"],
        parameters: [
          { name: "apikey", in: "header", required: true, type: "string", description: "Chave da API" },
          { name: "Content-Type", in: "header", required: true, type: "string", description: "application/json" }
        ],
        responses: [
          { 
            statusCode: "200", 
            description: "Retorna a lista de aceites.", 
            example: `{\n  "sucesso": true,\n  "dados": [\n    {\n      "Data Aceite": "12/05/2026 21:04:34",\n      "Modelo Documento": "ASSINATURA ELETRÔNICA",\n      "Documento": "74326114088",\n      "Conta": "1000005475"\n    }\n  ]\n}` 
          },
          { 
            statusCode: "401", 
            description: "API Key inválida.", 
            example: `{\n  "sucesso": false,\n  "erro": "API Key inválida ou não fornecida."\n}` 
          },
          { 
            statusCode: "500", 
            description: "Erro interno.", 
            example: `{\n  "sucesso": false,\n  "erro": "Mensagem de erro detalhada"\n}` 
          },
        ],
      },
    ],
  },

  // ─── Seção 17 ───
  {
    title: "Serviço de Autenticação AuthCube (Identity OAuth2)",
    description: "Validação do fluxo de autenticação (OAuth2) do Identity Provider AuthCube, trocando Authorization Code pelo Access Token.",
    baseUrl: "https://fabric-infinity-sit.basa.com.br",
    endpoints: [
      {
        method: "POST",
        path: "/authService/100000002/oauth2/token",
        summary: "Trocar Authorization Code por Access Token (OAuth2)",
        tags: ["Fabric", "AuthCube", "Identity"],
        parameters: [
          { name: "Content-Type", in: "header", required: true, type: "string", description: "application/x-www-form-urlencoded" },
          { name: "provider", in: "query", required: true, type: "string", description: "Identificador do Identity Provider no Kony (Ex: AuthCube)" }
        ],
        responses: [
          { statusCode: "200", description: "Token gerado com sucesso contendo mapeamento Java", example: `{\n  "access_token": "eyJhbGci...",\n  "token_type": "Bearer"\n}` }
        ],
      },
    ],
  },

  // ─── Seção 18 ───
  {
    title: "Atributos de Sessão do Usuário (AuthCube)",
    description: "Endpoint utilizado para recuperar os atributos de negócio do usuário logado (ex: coreCustomerId, email) extraídos pela sessão.",
    baseUrl: "https://fabric-infinity-sit.basa.com.br",
    endpoints: [
      {
        method: "GET",
        path: "/authService/100000002/session/user_attributes",
        summary: "Obter atributos cacheados da sessão",
        tags: ["Fabric", "Identity"],
        parameters: [
          { name: "X-Kony-Authorization", in: "header", required: true, type: "string", description: "Auth Token da sessão gerado no login" },
          { name: "provider", in: "query", required: true, type: "string", description: "Identifica a origem da sessão (Ex: AuthCube)" }
        ],
        responses: [
          { statusCode: "200", description: "Atributos retornados com sucesso do cache", example: `{\n  "coreCustomerId": "1000000502",\n  "federation_id": "..."\n}` }
        ],
      },
    ],
  },

  // ─── Seção 19 ───
  {
    title: "Listagem de Contas (getAccounts)",
    description: "Endpoint responsável por buscar no Core Bancário a lista de contas (holdings) vinculadas ao cliente autenticado.",
    baseUrl: "https://fabric-infinity-sit.basa.com.br",
    endpoints: [
      {
        method: "POST",
        path: "/services/data/v1/T24Accounts/operations/Accounts/getAccounts",
        summary: "Listar contas do cliente (Object Service)",
        tags: ["Fabric", "Contas", "T24Accounts"],
        parameters: [
          { name: "Content-Type", in: "header", required: true, type: "string", description: "application/json" },
          { name: "X-Kony-Authorization", in: "header", required: true, type: "string", description: "Auth Token da sessão" }
        ],
        responses: [
          { statusCode: "200", description: "Retorna a lista de contas sanitizada pelo Pre-Processor", example: `{\n  "Accounts": [\n    { "accountId": "1000004479", "availableBalance": -182000 }\n  ]\n}` }
        ],
      },
    ],
  },

  // ─── Seção 20 ───
  {
    title: "Gestão de Usuários (Object: Users)",
    description: "Endpoint utilizado para interagir com a entidade de usuários, tipicamente responsável por criar usuários ou validar login.",
    baseUrl: "https://fabric-infinity-sit.basa.com.br",
    endpoints: [
      {
        method: "POST",
        path: "/services/data/v1/Login/objects/Users",
        summary: "Operações da entidade de Usuários",
        tags: ["Fabric", "Users", "Login"],
        parameters: [
          { name: "Content-Type", in: "header", required: true, type: "string", description: "application/json" },
          { name: "X-Kony-Authorization", in: "header", required: false, type: "string", description: "Auth Token da sessão (Depende da operação)" }
        ],
        responses: [
          { statusCode: "200", description: "Operação efetuada com sucesso", example: `{\n  "success": true\n}` }
        ],
      },
    ],
  },

  // ─── Seção 21 ───
  {
    title: "Gestão de Conteúdo (CMS)",
    description: "Endpoint destinado a interações de Content Management System (resgate de banners, campanhas).",
    baseUrl: "https://fabric-infinity-sit.basa.com.br",
    endpoints: [
      {
        method: "POST",
        path: "/services/CMS",
        summary: "Interação com o CMS local",
        tags: ["Fabric", "CMS"],
        parameters: [
          { name: "Content-Type", in: "header", required: true, type: "string", description: "application/json" }
        ],
        responses: [
          { statusCode: "200", description: "Carga do CMS retornada", example: `{\n  "status": "success"\n}` }
        ],
      },
    ],
  },

  // ─── Seção 22 ───
  {
    title: "Logout AuthCube (Identity OAuth2)",
    description: "Endpoint acionado para destruir a sessão ativa no Kony Fabric e solicitar a invalidação do Token no Identity Provider (Keycloak).",
    baseUrl: "https://fabric-infinity-sit.basa.com.br",
    endpoints: [
      {
        method: "POST",
        path: "/authService/100000002/oauth2/logout",
        summary: "Logout e Invalidação de Sessão",
        tags: ["Fabric", "AuthCube", "Identity"],
        parameters: [
          { name: "X-Kony-Authorization", in: "header", required: true, type: "string", description: "O Auth Token atual que deseja-se invalidar." },
          { name: "provider", in: "query", required: true, type: "string", description: "Identificador do provedor Kony da sessão (Ex: AuthCube)." }
        ],
        responses: [
          { statusCode: "200", description: "Sessão destruída com sucesso.", example: `{\n  "message": "Logged out successfully"\n}` }
        ],
      },
    ],
  },

  // ─── Seção 23 ───
  {
    title: "Limpeza de Sessão Backend (IST - clearSession)",
    description: "Endpoint utilitário chamado no fluxo de encerramento do app para limpar tabelas de sessão ou deslogar sistemas core.",
    baseUrl: "https://fabric-infinity-sit.basa.com.br",
    endpoints: [
      {
        method: "POST",
        path: "/services/IST/clearSession",
        summary: "Limpar sessão nos sistemas core (Integration)",
        tags: ["Fabric", "Integration", "IST"],
        parameters: [
          { name: "Content-Type", in: "header", required: true, type: "string", description: "application/json" },
          { name: "X-Kony-Authorization", in: "header", required: false, type: "string", description: "Auth Token da sessão atual" }
        ],
        responses: [
          { statusCode: "200", description: "Limpeza executada com sucesso", example: `{\n  "opstatus": 0\n}` }
        ],
      },
    ],
  },

  // ─── Seção 24 ───
  {
    title: "Autenticação Central (Identity Login)",
    description: "Endpoint base do framework responsável por processar o login e emitir o token de sessão (X-Kony-Authorization).",
    baseUrl: "https://fabric-infinity-sit.basa.com.br",
    endpoints: [
      {
        method: "POST",
        path: "/authService/100000002/login",
        summary: "Endpoint de Login Centralizado",
        tags: ["Fabric", "Identity"],
        parameters: [
          { name: "Content-Type", in: "header", required: true, type: "string", description: "application/json" },
          { name: "X-Kony-App-Key", in: "header", required: false, type: "string", description: "Chave do app registrada no Fabric" }
        ],
        responses: [
          { statusCode: "200", description: "Login bem sucedido com geração de Token", example: `{\n  "claims_token": { "value": "..." }\n}` }
        ],
      },
    ],
  },

  // ─── Seção 25 ───
  {
    title: "Obter Perfil do Cliente (getCustomerProfile)",
    description: "Endpoint de leitura de negócio (Tela 'Meus Dados') responsável por extrair dados unificados do cliente.",
    baseUrl: "https://fabric-infinity-sit.basa.com.br",
    endpoints: [
      {
        method: "POST",
        path: "/services/data/v1/T24Customer/operations/Customer/getCustomerProfile",
        summary: "Obter Perfil Consolidado",
        tags: ["Fabric", "T24Customer"],
        parameters: [
          { name: "Content-Type", in: "header", required: true, type: "string", description: "application/json" },
          { name: "X-Kony-Authorization", in: "header", required: true, type: "string", description: "Auth Token da sessão logada." }
        ],
        responses: [
          { statusCode: "200", description: "Dados estruturados do perfil do cliente", example: `{\n  "Customer": [\n    { "marital_status": "SOLTEIRO", "phoneNumber": "91999999999" }\n  ]\n}` }
        ],
      },
    ],
  },

  // ─── Seção 26 ───
  {
    title: "Atualizar Dados do Cliente (updateCustomer)",
    description: "Endpoint responsável por submeter as requisições de atualização de dados cadastrais (endereço, telefones, estado civil) ao core.",
    baseUrl: "https://fabric-infinity-sit.basa.com.br",
    endpoints: [
      {
        method: "POST",
        path: "/services/data/v1/T24Customer/operations/Customer/updateCustomer",
        summary: "Atualizar perfil cadastral",
        tags: ["Fabric", "T24Customer"],
        parameters: [
          { name: "Content-Type", in: "header", required: true, type: "string", description: "application/json" },
          { name: "X-Kony-Authorization", in: "header", required: true, type: "string", description: "Auth Token da sessão logada." }
        ],
        responses: [
          { statusCode: "200", description: "Transação de atualização bem-sucedida", example: `{\n  "status": "success",\n  "opstatus": 0\n}` }
        ],
      },
    ],
  },

  // ─── Seção 27 ───
  {
    title: "Listar Beneficiários (getBeneficiaries)",
    description: "Endpoint utilizado para consultar e listar os beneficiários (favorecidos salvos) via JavaConnector.",
    baseUrl: "https://fabric-infinity-sit.basa.com.br",
    endpoints: [
      {
        method: "POST",
        path: "/services/data/v1/Beneficiary/operations/Beneficiary/getBeneficiaries",
        summary: "Listar favorecidos cadastrados",
        tags: ["Fabric", "Beneficiary"],
        parameters: [
          { name: "Content-Type", in: "header", required: true, type: "string", description: "application/json" },
          { name: "X-Kony-Authorization", in: "header", required: false, type: "string", description: "Auth Token da sessão" }
        ],
        responses: [
          { statusCode: "200", description: "Lista de beneficiários obtida com sucesso", example: `{\n  "Beneficiary": [\n    { "name": "João Silva", "cpf": "12345678900" }\n  ]\n}` }
        ],
      },
    ],
  },

  // ─── Seção 28 ───
  {
    title: "Listar Dispositivos (getDeviceList)",
    description: "Traz a lista de aparelhos físicos vinculados e autorizados na conta do cliente logado, isolado por JavaConnector.",
    baseUrl: "https://fabric-infinity-sit.basa.com.br",
    endpoints: [
      {
        method: "POST",
        path: "/services/data/v1/Devices/operations/DeviceManager/getDeviceList",
        summary: "Listar dispositivos vinculados",
        tags: ["Fabric", "Devices", "Segurança"],
        parameters: [
          { name: "Content-Type", in: "header", required: true, type: "string", description: "application/json" },
          { name: "X-Kony-Authorization", in: "header", required: true, type: "string", description: "Obrigatoriamente autenticado" }
        ],
        responses: [
          { statusCode: "200", description: "Dispositivos listados", example: `{\n  "DeviceManager": [\n    { "DeviceName": "iPhone 14", "OperatingSystem": "iOS" }\n  ]\n}` }
        ],
      },
    ],
  },

  // ─── Seção 29 ───
  {
    title: "Listar Termos e Documentos Aceitos (getTermsAndDocumentsList)",
    description: "Consulta o histórico de aceite eletrônico na plataforma parceira Neobiz, com interceptação Pre-Processor de segurança.",
    baseUrl: "https://fabric-infinity-sit.basa.com.br",
    endpoints: [
      {
        method: "POST",
        path: "/services/data/v1/Policy/operations/Policy/getTermsAndDocumentsList",
        summary: "Histórico de aceites",
        tags: ["Fabric", "Policy"],
        parameters: [
          { name: "Content-Type", in: "header", required: true, type: "string", description: "application/json" },
          { name: "X-Kony-Authorization", in: "header", required: true, type: "string", description: "Usado para extrair CPF e Conta de forma segura" }
        ],
        responses: [
          { statusCode: "200", description: "Histórico formatado", example: `{\n  "Policy": [\n    { "dataAceite": "12/05/2026", "codigoAssunto": "02.01.01.01.04" }\n  ]\n}` }
        ],
      },
    ],
  },

  // ─── Seção 30 ───
  {
    title: "Baixar / Visualizar Documento (getDocument)",
    description: "Recuperar fisicamente um termo de uso retornando o arquivo em Base64 ou uma URL de visualização PDF.",
    baseUrl: "https://fabric-infinity-sit.basa.com.br",
    endpoints: [
      {
        method: "POST",
        path: "/services/data/v1/Policy/operations/Policy/getDocument",
        summary: "Visualizar Termo de Uso",
        tags: ["Fabric", "Policy"],
        parameters: [
          { name: "Content-Type", in: "header", required: true, type: "string", description: "application/json" },
          { name: "X-Kony-Authorization", in: "header", required: true, type: "string", description: "Obrigatoriamente autenticado" }
        ],
        responses: [
          { statusCode: "200", description: "Documento recebido (Base64 + Viewer)", example: `{\n  "base64": "JVBERi0xLjcK...",\n  "viewerUrl": "https://..."\n}` }
        ],
      },
    ],
  },

  // ─── Seção 31 ───
  {
    title: "Listar Dúvidas Frequentes (getFAQs)",
    description: "Retorna a base de conhecimentos cadastrada no painel administrativo. Utiliza Pre-Login administrativo M2M.",
    baseUrl: "https://fabric-infinity-sit.basa.com.br",
    endpoints: [
      {
        method: "POST",
        path: "/services/data/v1/ContentManagement/operations/Information/getFAQs",
        summary: "Listar FAQs do Admin Console",
        tags: ["Fabric", "ContentManagement"],
        parameters: [
          { name: "Content-Type", in: "header", required: true, type: "string", description: "application/json" }
        ],
        responses: [
          { statusCode: "200", description: "FAQs retornadas", example: `{\n  "Information": [\n    { "question": "Como faço PIX?", "answer": "Acesse o menu..." }\n  ]\n}` }
        ],
      },
    ],
  },

  // ─── Seção 32 ───
  {
    title: "Obter Canais de Atendimento (getContactUs)",
    description: "Baixa a lista atualizada de telefones de contato, SAC, Ouvidoria do Kony Admin Console.",
    baseUrl: "https://fabric-infinity-sit.basa.com.br",
    endpoints: [
      {
        method: "POST",
        path: "/services/data/v1/ContentManagement/operations/Information/getContactUs",
        summary: "Canais de Suporte",
        tags: ["Fabric", "ContentManagement"],
        parameters: [
          { name: "Content-Type", in: "header", required: true, type: "string", description: "application/json" }
        ],
        responses: [
          { statusCode: "200", description: "Contatos recebidos", example: `{\n  "Information": [\n    { "phone": "0800 000 0000", "type": "SAC" }\n  ]\n}` }
        ],
      },
    ],
  },

  // ─── Seção 33 ───
  {
    title: "Consultar Status do QR Code (lookup)",
    description: "O celular lê o código da tela de login Web e descobre as informações do computador que está tentando logar via JavaConnector.",
    baseUrl: "https://fabric-infinity-sit.basa.com.br",
    endpoints: [
      {
        method: "POST",
        path: "/services/data/v1/WebQR/operations/WebLogin/lookup",
        summary: "Validar código QR de login",
        tags: ["Fabric", "WebQR", "Segurança"],
        parameters: [
          { name: "Content-Type", in: "header", required: true, type: "string", description: "application/json" },
          { name: "X-Kony-Authorization", in: "header", required: true, type: "string", description: "Token do app para validação" }
        ],
        responses: [
          { statusCode: "200", description: "Dados do dispositivo web solicitante capturados", example: `{\n  "ipAddress": "192.168.0.1",\n  "browserName": "Chrome",\n  "location": "Belém"\n}` }
        ],
      },
    ],
  },

  // ─── Seção 34 ───
  {
    title: "Aprovar Acesso Web via QR (approve)",
    description: "Momento exato em que o usuário aperta o botão de 'Aprovar' no app do celular para liberar a entrada da sua conta na tela do PC.",
    baseUrl: "https://fabric-infinity-sit.basa.com.br",
    endpoints: [
      {
        method: "POST",
        path: "/services/data/v1/WebQR/operations/WebLogin/approve",
        summary: "Aprovar sessão pendente Web",
        tags: ["Fabric", "WebQR", "Segurança"],
        parameters: [
          { name: "Content-Type", in: "header", required: true, type: "string", description: "application/json" },
          { name: "X-Kony-Authorization", in: "header", required: true, type: "string", description: "Assinatura do token validando autoria" }
        ],
        responses: [
          { statusCode: "200", description: "Login web aprovado", example: `{\n  "status": "APPROVED"\n}` }
        ],
      },
    ],
  }
]