import type { ApiData } from '@/types/api';

export const basaApiSections: ApiData[] = [
  {
    "title": "Obter Modelo de Documentação",
    "description": "Endpoint responsável por retornar os modelos de documentação disponibilizados pela Neobiz de acordo com o valor especificado no parâmetro assuntoId. Os valores do parâmetro assuntoId referentes aos documentos disponibilizados são 20, 21 e 22.",
    "baseUrl": "https://plataforma.neobiz.com.br",
    "endpoints": [
      {
        "method": "GET",
        "path": "/bpm/app/public/obtemModeloDocumento",
        "krakendUrl": "https://krakend-transact-sit.apps.ocp-core-stage.bancoamazonia.sa/api/v1/onboarding/neobiz/obtemModeloDocumento",
        "summary": "Obter modelo de documentação por assuntoId",
        "tags": [
          "Neobiz",
          "Documentação"
        ],
        "parameters": [
          {
            "name": "apikey",
            "in": "header",
            "required": true,
            "type": "string",
            "description": "Chave da API"
          },
          {
            "name": "assuntoId",
            "in": "query",
            "required": true,
            "type": "string",
            "description": "Identificador único do documento que virá a ser retornado"
          }
        ],
        "responses": [
          {
            "statusCode": "200",
            "description": "assuntoId informado corretamente",
            "example": "{\n  \"fileName\": \"Modelo_02_01_01_01_03_v1.pdf\",\n  \"sucesso\": true,\n  \"assuntoId\": 20\n}"
          },
          {
            "statusCode": "400",
            "description": "assuntoId informado inexistente",
            "example": "{ \"erro\": \"Nenhuma versão encontrada para o código: \" }"
          },
          {
            "statusCode": "401",
            "description": "apikey mal informada",
            "example": "{ \"erro\": \"API Key inválida ou não fornecida.\" }"
          }
        ]
      }
    ]
  },
  {
    "title": "Consulta do CEP",
    "description": "Endpoint referente a verificação do CEP informado no fluxo de onboarding.",
    "baseUrl": "https://plataforma.neobiz.com.br",
    "endpoints": [
      {
        "method": "POST",
        "path": "/bpm/app/public/consultar/endereco",
        "krakendUrl": "https://krakend-transact-sit.apps.ocp-core-stage.bancoamazonia.sa/api/v1/onboarding/neobiz/consultaCEP",
        "summary": "Consultar endereço por CEP",
        "tags": [
          "Neobiz",
          "Endereço"
        ],
        "requestBody": "{\n  \"cep\": \"66045-205\"\n}",
        "parameters": [
          {
            "name": "page_size",
            "in": "query",
            "required": true,
            "type": "string",
            "description": "Referente aos itens retornados"
          }
        ],
        "responses": [
          {
            "statusCode": "200",
            "description": "CEP informado existe e possui formato válido",
            "example": "{\n  \"dados\": [{\n    \"estado\": \"Pará\",\n    \"bairro\": \"Cremação\",\n    \"localidade\": \"Belém\",\n    \"cep\": \"66045-205\",\n    \"uf\": \"PA\"\n  }]\n}"
          },
          {
            "statusCode": "400",
            "description": "CEP informado é inválido ou inexistente",
            "example": "{ \"erro\": \"Erro ao consultar dados\" }"
          }
        ]
      }
    ]
  },
  {
    "title": "Obter Lista de Empregos",
    "description": "Endpoint referente ao retorno da lista de empregos disponibilizados no processo de onboarding da aplicação.",
    "baseUrl": "https://transact-api-transact-uat.apps.ocp-core-stage.bancoamazonia.sa",
    "endpoints": [
      {
        "method": "GET",
        "path": "/irf-provider-container/api/v1.0.0/reference/jobTitles",
        "summary": "Listar empregos disponíveis",
        "tags": [
          "Transact",
          "Referência"
        ],
        "parameters": [
          {
            "name": "page_size",
            "in": "query",
            "required": true,
            "type": "string",
            "description": "Referente aos itens retornados"
          }
        ],
        "responses": [
          {
            "statusCode": "200",
            "description": "Endpoint formatado corretamente com seus respectivos parâmetros",
            "example": "{\n  \"header\": { \"total_size\": 2694, \"status\": \"success\" },\n  \"body\": [{ \"jobTitleName\": \"Oficial general da aeronáutica\", \"jobTitleId\": \"010105\" }]\n}"
          },
          {
            "statusCode": "400",
            "description": "Credenciais informadas de maneira inválida",
            "example": "{ \"error\": \"invalid_client\", \"message\": \"Client authentication failed\" }"
          }
        ]
      }
    ]
  },
  {
    "title": "Token Authcube (Esqueci a Senha)",
    "description": "Endpoint responsável por gerar o token de recuperação de senha. Este token deve ser enviado no cabeçalho de autorização (Bearer Token) para validar as requisições nas próximas etapas do fluxo.",
    "baseUrl": "https://oauthcube-devqa.basa.com.br",
    "endpoints": [
      {
        "method": "POST",
        "path": "/BasaUAT/connect/token",
        "summary": "Gerar token de recuperação de senha",
        "tags": [
          "AuthCube",
          "Autenticação"
        ],
        "requestBody": "grant_type=client_credentials&client_id=basa-mobile&client_secret=secret123",
        "parameters": [],
        "responses": [
          {
            "statusCode": "200",
            "description": "Credenciais informadas corretamente",
            "example": "{\n  \"access_token\": \"eyJhbGciOiJSUzI1NiIs...\",\n  \"expires_in\": 3600,\n  \"token_type\": \"Bearer\"\n}"
          },
          {
            "statusCode": "422",
            "description": "CPF informado era inválido",
            "example": "{ \"error\": \"create person entity: invalid CPF: check digit mismatch\" }"
          },
          {
            "statusCode": "500",
            "description": "client_id informado é inválido",
            "example": "{ \"code\": 500, \"message\": \"The server encountered an internal error...\" }"
          },
          {
            "statusCode": "401",
            "description": "client_secret informado é inválido",
            "example": "{ \"error\": \"invalid_client\" }"
          }
        ]
      }
    ]
  },
  {
    "title": "Esqueci a Senha",
    "description": "Endpoint responsável pelo processo de recuperação de senha durante a retomada do fluxo. Faz-se necessário o token da seção 7 para o disparo desse endpoint.",
    "baseUrl": "https://oauthcube-devqa.basa.com.br",
    "endpoints": [
      {
        "method": "PUT",
        "path": "/api/applications/BasaUAT/users/{cpf}",
        "summary": "Redefinir senha do usuário",
        "tags": [
          "AuthCube",
          "Recuperação"
        ],
        "requestBody": "{\n  \"new_password\": \"@NovaSenha123\"\n}",
        "parameters": [],
        "responses": [
          {
            "statusCode": "200",
            "description": "CPF e senha inseridos corretamente",
            "example": "{ \"success\": true }"
          },
          {
            "statusCode": "401",
            "description": "Token informado é inválido",
            "example": "{ \"error\": \"invalid_token\", \"error_description\": \"The access token provided is expired, revoked, malformed, or invalid for other reasons.\" }"
          }
        ]
      }
    ]
  },
  {
    "title": "Criação de Entidade",
    "description": "Processo referente a criação de entidade no fluxo de onboarding do Digital. O processo de criação de entidade ocorre primeiramente com a criação no Fabric, onde pode ser obtido o OTP no smartphone inserindo as credenciais corretas.",
    "baseUrl": "https://uat-onboarding.corebanxapp.com.br",
    "endpoints": [
      {
        "method": "POST",
        "path": "/v1/onboarding/entities",
        "krakendUrl": "https://krakend-transact-sit.apps.ocp-core-stage.bancoamazonia.sa/api/v1/onboarding/corebanx/createEntity",
        "summary": "Criar entidade de pessoa física",
        "tags": [
          "Corebanx",
          "Onboarding"
        ],
        "requestBody": "{\n  \"cpf\": \"92091243086\",\n  \"password\": \"@Senha123\",\n  \"phoneNumber\": \"992670714\",\n  \"ddd\": \"91\"\n}",
        "parameters": [],
        "responses": [
          {
            "statusCode": "200",
            "description": "CPF válido junto com os demais dados",
            "example": "{\n  \"person_entity_id\": \"45616b6f-1869-436e-889a-3bb7e19dc6be\",\n  \"cpf\": \"394.499.710-72\",\n  \"created_at\": \"2026-05-15T21:41:18.134794395Z\"\n}"
          },
          {
            "statusCode": "422",
            "description": "CPF informado era inválido",
            "example": "{ \"error\": \"create person entity: invalid CPF: check digit mismatch\" }"
          },
          {
            "statusCode": "409",
            "description": "CPF informado já existia",
            "example": "{ \"error\": \"create person entity: invalid CPF: check digit mismatch\" }"
          }
        ]
      }
    ]
  },
  {
    "title": "Login de Entidade",
    "description": "Endpoint referente a obtenção de token que contém as credenciais do usuário informadas durante o fluxo de onboarding. Esse endpoint deverá retornar um token que será utilizado nos endpoints referentes a Corebanx.",
    "baseUrl": "https://oauthcube-devqa.basa.com.br",
    "endpoints": [
      {
        "method": "POST",
        "path": "/BasaSIT/connect/token",
        "krakendUrl": "https://krakend-transact-sit.apps.ocp-core-stage.bancoamazonia.sa/api/v1/onboarding/authcube/login",
        "summary": "Obter token de login da entidade",
        "tags": [
          "AuthCube",
          "Autenticação"
        ],
        "requestBody": "grant_type=password&username=92091243086&password=@Senha123&client_id=basa-mobile",
        "parameters": [],
        "responses": [
          {
            "statusCode": "200",
            "description": "Credenciais do usuário informadas corretamente (CPF e senha já cadastrados)",
            "example": "{\n  \"access_token\": \"eyJhbGciOiJSUzI1NiIs...\",\n  \"expires_in\": 3600,\n  \"scope\": \"profile\",\n  \"token_type\": \"Bearer\"\n}"
          },
          {
            "statusCode": "400",
            "description": "CPF e senha ainda não cadastrados no sistema",
            "example": "{ \"error\": \"invalid_request\", \"error_description\": \"Invalid username or password in request.\" }"
          },
          {
            "statusCode": "500",
            "description": "Inserção de clientId inválido",
            "example": "{ \"code\": 500, \"message\": \"The server encountered an internal error...\" }"
          },
          {
            "statusCode": "401",
            "description": "Inserção de clientSecret inválido",
            "example": "{ \"error\": \"invalid_client\" }"
          }
        ]
      }
    ]
  },
  {
    "title": "Aceitação de Termos",
    "description": "Endpoint da Corebanx referente a aceitação de termos para divulgação de produtos promocionais da plataforma. Faz-se necessária a utilização do token gerado pelo endpoint de login de entidade.",
    "baseUrl": "https://uat-onboarding.corebanxapp.com.br",
    "endpoints": [
      {
        "method": "POST",
        "path": "/v1/onboarding/accept-terms",
        "krakendUrl": "https://krakend-transact-sit.apps.ocp-core-stage.bancoamazonia.sa/api/v1/onboarding/corebanx/acceptedTerms",
        "summary": "Aceitar termos de uso",
        "tags": [
          "Corebanx",
          "Onboarding"
        ],
        "requestBody": "{\n  \"accepted_terms\": true,\n  \"term_version\": \"v1.0\"\n}",
        "parameters": [],
        "responses": [
          {
            "statusCode": "200",
            "description": "Token informado corretamente",
            "example": "{\n  \"person_entity_id\": \"b5d26843-60e5-4feb-90e5-4a04d22bc255\",\n  \"accepted_terms\": true,\n  \"accepted_terms_at\": \"2026-05-15T20:13:22.827453603Z\"\n}"
          },
          {
            "statusCode": "401",
            "description": "Token utilizado já expirou ou é inválido",
            "example": "{ \"error\": \"invalid token: token expired\" }"
          }
        ]
      }
    ]
  },
  {
    "title": "Checagem de CPF",
    "description": "Endpoint da Corebanx referente a checagem de CPF da entidade criada no Transact. Verifica CPFs cadastrados, não cadastrados e com reset.",
    "baseUrl": "https://uat-onboarding.corebanxapp.com.br",
    "endpoints": [
      {
        "method": "POST",
        "path": "/v1/onboarding/check-cpf",
        "krakendUrl": "https://krakend-transact-sit.apps.ocp-core-stage.bancoamazonia.sa/api/v1/onboarding/corebanx-new/checkCPF",
        "summary": "Verificar existência do CPF no sistema",
        "tags": [
          "Corebanx",
          "Onboarding"
        ],
        "requestBody": "{\n  \"cpf\": \"89358479094\"\n}",
        "parameters": [],
        "responses": [
          {
            "statusCode": "200",
            "description": "CPF válido (existe, não existe ou com reset)",
            "example": "{\n  \"exists\": true,\n  \"cpf_formatted\": \"893.584.790-94\",\n  \"person_entity_id\": \"b5d26843-...\",\n  \"type\": \"PF\",\n  \"has_resets\": false\n}"
          },
          {
            "statusCode": "422",
            "description": "CPF possui formato inválido",
            "example": "{ \"error\": \"check cpf: invalid CPF: must have 11 digits\" }"
          }
        ]
      }
    ]
  },
  {
    "title": "Atualização de Dados da Entidade",
    "description": "Endpoint da Corebanx referente a atualização dos dados preenchidos da entidade durante o fluxo de onboarding. Necessita do token obtido pelo endpoint de login de entidade.",
    "baseUrl": "https://uat-onboarding.corebanxapp.com.br",
    "endpoints": [
      {
        "method": "PUT",
        "path": "/v1/onboarding/demographics",
        "krakendUrl": "https://krakend-transact-sit.apps.ocp-core-stage.bancoamazonia.sa/api/v1/onboarding/corebanx/updatePerson",
        "summary": "Atualizar dados demográficos da entidade",
        "tags": [
          "Corebanx",
          "Onboarding"
        ],
        "requestBody": "{\n  \"fullName\": \"Alison Ricardo Santos\",\n  \"birthDate\": \"1990-05-15\",\n  \"motherName\": \"Maria Santos\",\n  \"gender\": \"M\",\n  \"maritalStatus\": \"SINGLE\"\n}",
        "parameters": [],
        "responses": [
          {
            "statusCode": "200",
            "description": "Dados atualizados com sucesso e token válido",
            "example": "{\n  \"person_entity_id\": \"b5d26843-60e5-4feb-90e5-4a04d22bc255\",\n  \"updated_at\": \"2026-05-15T20:46:57.376793181Z\"\n}"
          },
          {
            "statusCode": "401",
            "description": "Token informado é inválido ou expirado",
            "example": "{ \"error\": \"invalid token: token expired\" }"
          }
        ]
      }
    ]
  },
  {
    "title": "Submissão de Entidade",
    "description": "Endpoint da Corebanx referente a submissão dos dados preenchidos durante o fluxo de onboarding. Necessita do token obtido pelo endpoint de login de entidade.",
    "baseUrl": "https://uat-onboarding.corebanxapp.com.br",
    "endpoints": [
      {
        "method": "POST",
        "path": "/v1/onboarding/submit",
        "krakendUrl": "https://krakend-transact-sit.apps.ocp-core-stage.bancoamazonia.sa/api/v1/onboarding/corebanx/submitEntity",
        "summary": "Submeter dados de onboarding para revisão",
        "tags": [
          "Corebanx",
          "Onboarding"
        ],
        "requestBody": "{\n  \"confirm_data\": true\n}",
        "parameters": [],
        "responses": [
          {
            "statusCode": "200",
            "description": "Dados submetidos com sucesso e token válido",
            "example": "{\n  \"person_entity_id\": \"b5d26843-...\",\n  \"onboarding_status\": \"PENDING_REVIEW\",\n  \"updated_at\": \"2026-05-15T21:04:37.887915374Z\"\n}"
          },
          {
            "statusCode": "401",
            "description": "Token informado já expirou ou é inválido",
            "example": "{ \"error\": \"invalid token: token expired\" }"
          }
        ]
      }
    ]
  },
  {
    "title": "Obtenção dos Dados do IDVerse (Transaction Data)",
    "description": "Endpoint referente aos dados obtidos do processo de escaneamento facial e de documentação. Verifica documentos submetidos, status do processo e informações referentes ao escaneamento.",
    "baseUrl": "https://staging.bancobasa.idkit.co",
    "endpoints": [
      {
        "method": "GET",
        "path": "/api/3.5/transaction/{transactionId}",
        "summary": "Obter dados da transação do IDVerse",
        "tags": [
          "IDVerse",
          "Verificação"
        ],
        "parameters": [],
        "responses": [
          {
            "statusCode": "200",
            "description": "transactionId informado é válido",
            "example": "{\n  \"transactionId\": \"a6fc0fd1-...\",\n  \"status\": \"COMPLETED_PASS\",\n  \"results\": { \"overall\": \"PASS\" }\n}"
          },
          {
            "statusCode": "404",
            "description": "transactionId inválido ou inexistente",
            "example": "{ \"status\": \"error\", \"message\": \"Transaction not found.\" }"
          }
        ]
      }
    ]
  },
  {
    "title": "Captura dos Dados do Customer Transact",
    "description": "Endpoint responsável por retornar os dados referentes ao usuário criado no Transact, a partir do mnemônico do usuário.",
    "baseUrl": "https://iris-transact-uat.apps.ocp-core-stage.bancoamazonia.sa",
    "endpoints": [
      {
        "method": "GET",
        "path": "/irf-extension-api/api/v1.0.0/party/customers/getCustomerData",
        "krakendUrl": "https://krakend-transact-sit.apps.ocp-core-stage.bancoamazonia.sa/api/v1/onboarding/temenos-iris/getCustomerData",
        "summary": "Obter dados do customer por mnemônico",
        "tags": [
          "Transact",
          "Customer"
        ],
        "parameters": [
          {
            "name": "mnemonic",
            "in": "query",
            "required": true,
            "type": "string",
            "description": "Identificador único do usuário"
          }
        ],
        "responses": [
          {
            "statusCode": "200",
            "description": "Mnemônico informado corretamente",
            "example": "{\n  \"header\": { \"total_size\": 1, \"status\": \"success\" },\n  \"body\": [{ \"customerMnemonic\": \"R87523602029\", \"customerId\": \"1000000698\" }]\n}"
          },
          {
            "statusCode": "404",
            "description": "Mnemônico não existe no Transact (retorna body vazio)",
            "example": "{ \"header\": { \"total_size\": 0, \"status\": \"success\" }, \"body\": [] }"
          }
        ]
      }
    ]
  },
  {
    "title": "Atualização de Renda e Patrimônio",
    "description": "Endpoint responsável pela atualização de renda e patrimônio do usuário no Transact. Utiliza o coreCustomerId obtido no createCustomer.",
    "baseUrl": "https://iris-transact-uat.apps.ocp-core-stage.bancoamazonia.sa",
    "endpoints": [
      {
        "method": "PUT",
        "path": "/irf-extension-api/api/v1.0.0/party/customers/updateIncomeAssets/{coreCustomerId}",
        "krakendUrl": "https://krakend-transact-sit.apps.ocp-core-stage.bancoamazonia.sa/api/v1/onboarding/temenos-iris/updateIncomeAssets/{coreCustomerId}",
        "summary": "Atualizar renda e patrimônio do customer",
        "tags": [
          "Transact",
          "Customer"
        ],
        "parameters": [],
        "responses": [
          {
            "statusCode": "200",
            "description": "coreCustomerId informado corretamente junto com os demais campos",
            "example": "{\n  \"header\": { \"id\": \"1000000599\", \"status\": \"success\" },\n  \"body\": { \"declaredAssets\": \"3000000\", \"declaredIncome\": \"10000\" }\n}"
          },
          {
            "statusCode": "400",
            "description": "coreCustomerId inválido, já atualizado ou inexistente",
            "example": "{ \"error\": { \"type\": \"BUSINESS\", \"errorDetails\": [{ \"code\": \"E-130147\" }] } }"
          }
        ]
      }
    ]
  },
  {
    "title": "Obtenção de Informação dos Dados de Onboarding",
    "description": "Endpoint responsável pela obtenção dos dados referentes ao que foi preenchido no fluxo de onboarding do Digital, exibindo status do onboarding, status do IDVerse e os demais dados informados.",
    "baseUrl": "https://uat-onboarding.corebanxapp.com.br",
    "endpoints": [
      {
        "method": "GET",
        "path": "/v1/onboarding/info",
        "krakendUrl": "https://krakend-transact-sit.apps.ocp-core-stage.bancoamazonia.sa/api/v1/onboarding/corebanx/loginEntity",
        "summary": "Obter informações completas do onboarding",
        "tags": [
          "Corebanx",
          "Onboarding"
        ],
        "parameters": [],
        "responses": [
          {
            "statusCode": "200",
            "description": "Token do login de entidade informado corretamente",
            "example": "{\n  \"person_entity\": {\n    \"onboarding_status\": \"APPROVED\",\n    \"status_idverse\": \"COMPLETED_PASS\"\n  },\n  \"phone\": { \"ddd\": \"91\", \"number\": \"981070110\" },\n  \"address\": { \"city\": \"Ananindeua\", \"state\": \"PA\" }\n}"
          },
          {
            "statusCode": "401",
            "description": "Token informado já expirou ou é inválido",
            "example": "{ \"error\": \"invalid token: token expired\" }"
          }
        ]
      }
    ]
  }
];
