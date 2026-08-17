import type { ApiData } from '@/types/api';

export const paymentosPixTedApiSections: ApiData[] = [
  {
    title: 'Autenticação',
    baseUrl:
      'https://uat.corebanxapp.com.br/auth/realms/ledgeros/protocol/openid-connect/token',
    partner: 'Corebanx',
    description:
      'Endpoint de obtenção do token de acesso (OAuth2 Client Credentials) usado para autenticar as demais chamadas da API PaymentOS.',
    endpoints: [
      {
        method: 'POST',
        path: '/',
        summary: 'Auth - Token (client_credentials)',
        tags: ['_auth'],
        parameters: [
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/x-www-form-urlencoded',
          },
        ],
        requestBody:
          'application/x-www-form-urlencoded:\ngrant_type=client_credentials\nclient_id={{clientId}}\nclient_secret={{clientSecret}}\nscope=pix:create pix:read',
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "access_token": "<jwt_redacted>",\n  "expires_in": 300,\n  "refresh_expires_in": 0,\n  "token_type": "Bearer",\n  "not-before-policy": 0,\n  "scope": "ted:reverse payment:create payment:settle profile pix:schedule:manage payment:read payment:validate ted:approve pix:reverse payment:approve boleto:create ted:read ted:create email payment:cancel boleto:read payment:submit ted:settle pix:read payment:route payment:reject pix:create"\n}',
          },
        ],
      },
    ],
  },
  {
    title: 'SPI op/pixout (Temenos funds-block)',
    baseUrl: 'https://uat.corebanxapp.com.br/paymentos',
    partner: 'Corebanx',
    description:
      'Envio de ordens PIX-out via SPI (/jdpi/spi/op/pixout), cobrindo as combinações de finalidade, tipo de iniciação e prioridade de pagamento, com bloqueio de fundos confirmado no Temenos.',
    endpoints: [
      {
        method: 'POST',
        path: '/jdpi/spi/op/pixout',
        summary: 'POST pixout BASE (finalidade 0)  -> 202',
        tags: ['SPI op/pixout (Temenos funds-block)'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
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
          '{\n  "idReqSistemaCliente": "{{$guid}}",\n  "dtHrRequisicaoPsp": "{{$isoTimestamp}}",\n  "tpIniciacao": 0,\n  "finalidade": 0,\n  "prioridadePagamento": 0,\n  "tpPrioridadePagamento": 0,\n  "valor": 10.01,\n  "pagador": {\n    "ispb": "04902979",\n    "tpPessoa": 0,\n    "cpfCnpj": "60502961546",\n    "nome": "Pagador Teste",\n    "nrAgencia": "0201",\n    "nrConta": "{{contaOrigem}}",\n    "tpConta": 0\n  },\n  "recebedor": {\n    "ispb": "08357240",\n    "tpPessoa": 0,\n    "cpfCnpj": "18915914520",\n    "nome": "TESTE DE QA - CARREFOUR",\n    "nrAgencia": "0001",\n    "nrConta": "1737651",\n    "tpConta": 0\n  },\n  "orderingCustomerId": "{{ordCust}}",\n  "beneficiaryAccountId": "BRL1401100010001"\n}',
        responses: [
          {
            statusCode: '202',
            description: 'Accepted',
            example:
              '{\n  "jdpi": {\n    "idReqSistemaCliente": "58dfa5d4-794d-42d5-8283-66d1b7f28d19",\n    "idReqJdPi": "01000000-9c34-804f-f91b-08defa55f49f",\n    "endToEndId": "E04902979202608142247IC9MU8I9LER",\n    "dtHrReqJdPi": "2026-08-14T22:47:01.647Z"\n  },\n  "paymentOrderId": "PI262260PGRBLDT8",\n  "temenosConfirmed": true\n}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/jdpi/spi/op/pixout',
        summary: 'POST pixout TROCO (finalidade 1)  -> 202',
        tags: ['SPI op/pixout (Temenos funds-block)'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
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
          '{\n  "idReqSistemaCliente": "{{$guid}}",\n  "dtHrRequisicaoPsp": "{{$isoTimestamp}}",\n  "tpIniciacao": 0,\n  "finalidade": 1,\n  "modalidadeAgente": 1,\n  "prioridadePagamento": 0,\n  "tpPrioridadePagamento": 0,\n  "valor": 10.5,\n  "ispbPss": "30015936",\n  "vlrDetalhe": [\n    {\n      "tipo": 1,\n      "vlrTarifaDinheiroCompra": 8.5\n    },\n    {\n      "tipo": 0,\n      "vlrTarifaDinheiroCompra": 2\n    }\n  ],\n  "pagador": {\n    "ispb": "04902979",\n    "tpPessoa": 0,\n    "cpfCnpj": "60502961546",\n    "nome": "Pagador Teste",\n    "nrAgencia": "0201",\n    "nrConta": "{{contaOrigem}}",\n    "tpConta": 0\n  },\n  "recebedor": {\n    "ispb": "08357240",\n    "tpPessoa": 0,\n    "cpfCnpj": "18915914520",\n    "nome": "TESTE DE QA - CARREFOUR",\n    "nrAgencia": "0001",\n    "nrConta": "1737651",\n    "tpConta": 0\n  },\n  "orderingCustomerId": "{{ordCust}}",\n  "beneficiaryAccountId": "BRL1401100010001"\n}',
        responses: [
          {
            statusCode: '202',
            description: 'Accepted',
            example:
              '{\n  "jdpi": {\n    "idReqSistemaCliente": "6c4810d4-bd8f-437c-ac6b-7fa6b5ff486c",\n    "idReqJdPi": "01000000-9c34-804f-0330-08defa55f5be",\n    "endToEndId": "E049029792026081422476TSJ0W57937",\n    "dtHrReqJdPi": "2026-08-14T22:47:03.522Z"\n  },\n  "paymentOrderId": "PI2622607PKWRBTB",\n  "temenosConfirmed": true\n}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/jdpi/spi/op/pixout',
        summary: 'POST pixout SAQUE (finalidade 2)  -> 202',
        tags: ['SPI op/pixout (Temenos funds-block)'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
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
          '{\n  "idReqSistemaCliente": "{{$guid}}",\n  "dtHrRequisicaoPsp": "{{$isoTimestamp}}",\n  "tpIniciacao": 0,\n  "finalidade": 2,\n  "modalidadeAgente": 0,\n  "prioridadePagamento": 0,\n  "tpPrioridadePagamento": 0,\n  "valor": 50,\n  "ispbPss": "30015936",\n  "vlrDetalhe": [\n    {\n      "tipo": 0,\n      "vlrTarifaDinheiroCompra": 50\n    }\n  ],\n  "pagador": {\n    "ispb": "04902979",\n    "tpPessoa": 0,\n    "cpfCnpj": "60502961546",\n    "nome": "Pagador Teste",\n    "nrAgencia": "0201",\n    "nrConta": "{{contaOrigem}}",\n    "tpConta": 0\n  },\n  "recebedor": {\n    "ispb": "08357240",\n    "tpPessoa": 0,\n    "cpfCnpj": "18915914520",\n    "nome": "TESTE DE QA - CARREFOUR",\n    "nrAgencia": "0001",\n    "nrConta": "1737651",\n    "tpConta": 0\n  },\n  "orderingCustomerId": "{{ordCust}}",\n  "beneficiaryAccountId": "BRL1401100010001"\n}',
        responses: [
          {
            statusCode: '202',
            description: 'Accepted',
            example:
              '{\n  "jdpi": {\n    "idReqSistemaCliente": "196f1a17-3d77-426f-90f7-0e8468888636",\n    "idReqJdPi": "01000000-9c34-804f-ea4f-08defa55f6dc",\n    "endToEndId": "E04902979202608142247X4WBIG6EAZ6",\n    "dtHrReqJdPi": "2026-08-14T22:47:05.402Z"\n  },\n  "paymentOrderId": "PI262260Q6Y5W2QW",\n  "temenosConfirmed": true\n}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/jdpi/spi/op/pixout',
        summary: 'POST pixout tpIniciacao=1 CHAVE  -> 202',
        tags: ['SPI op/pixout (Temenos funds-block)'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
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
          '{\n  "idReqSistemaCliente": "{{$guid}}",\n  "dtHrRequisicaoPsp": "{{$isoTimestamp}}",\n  "prioridadePagamento": 0,\n  "tpPrioridadePagamento": 0,\n  "pagador": {\n    "ispb": "04902979",\n    "tpPessoa": 0,\n    "cpfCnpj": "60502961546",\n    "nome": "Pagador Teste",\n    "nrAgencia": "0201",\n    "nrConta": "{{contaOrigem}}",\n    "tpConta": 0\n  },\n  "recebedor": {\n    "ispb": "08357240",\n    "tpPessoa": 0,\n    "cpfCnpj": "18915914520",\n    "nome": "TESTE DE QA - CARREFOUR",\n    "nrAgencia": "0001",\n    "nrConta": "1737651",\n    "tpConta": 0\n  },\n  "orderingCustomerId": "{{ordCust}}",\n  "beneficiaryAccountId": "BRL1401100010001",\n  "tpIniciacao": 1,\n  "finalidade": 0,\n  "valor": 10.01,\n  "chave": "18915914520"\n}',
        responses: [
          {
            statusCode: '202',
            description: 'Accepted',
            example:
              '{\n  "jdpi": {\n    "idReqSistemaCliente": "d3a50c30-8d9d-410f-b459-beb7a9870d7c",\n    "idReqJdPi": "01000000-9c34-804f-a6ab-08defa55f814",\n    "endToEndId": "E04902979202608142247EC02WBSH896",\n    "dtHrReqJdPi": "2026-08-14T22:47:07.445Z"\n  },\n  "paymentOrderId": "PI2622609PMT1WSS",\n  "temenosConfirmed": true\n}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/jdpi/spi/op/pixout',
        summary: 'POST pixout tpIniciacao=2 QR ESTATICO  -> 202',
        tags: ['SPI op/pixout (Temenos funds-block)'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
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
          '{\n  "idReqSistemaCliente": "{{$guid}}",\n  "dtHrRequisicaoPsp": "{{$isoTimestamp}}",\n  "prioridadePagamento": 0,\n  "tpPrioridadePagamento": 0,\n  "pagador": {\n    "ispb": "04902979",\n    "tpPessoa": 0,\n    "cpfCnpj": "60502961546",\n    "nome": "Pagador Teste",\n    "nrAgencia": "0201",\n    "nrConta": "{{contaOrigem}}",\n    "tpConta": 0\n  },\n  "recebedor": {\n    "ispb": "08357240",\n    "tpPessoa": 0,\n    "cpfCnpj": "18915914520",\n    "nome": "TESTE DE QA - CARREFOUR",\n    "nrAgencia": "0001",\n    "nrConta": "1737651",\n    "tpConta": 0\n  },\n  "orderingCustomerId": "{{ordCust}}",\n  "beneficiaryAccountId": "BRL1401100010001",\n  "tpIniciacao": 2,\n  "finalidade": 0,\n  "valor": 10.01,\n  "chave": "18915914520",\n  "idConciliacaoRecebedor": "TXIDESTATICO0001"\n}',
        responses: [
          {
            statusCode: '202',
            description: 'Accepted',
            example:
              '{\n  "jdpi": {\n    "idReqSistemaCliente": "a4151812-a5da-4495-89e3-1887dffccf3e",\n    "idReqJdPi": "01000000-9c34-804f-ea03-08defa55f9e6",\n    "endToEndId": "E04902979202608142247F6BEUENXG2C",\n    "dtHrReqJdPi": "2026-08-14T22:47:10.501Z"\n  },\n  "paymentOrderId": "PI262260850BL08C",\n  "temenosConfirmed": true\n}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/jdpi/spi/op/pixout',
        summary: 'POST pixout tpIniciacao=3 QR DINAMICO  -> 202',
        tags: ['SPI op/pixout (Temenos funds-block)'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
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
          '{\n  "idReqSistemaCliente": "{{$guid}}",\n  "dtHrRequisicaoPsp": "{{$isoTimestamp}}",\n  "prioridadePagamento": 0,\n  "tpPrioridadePagamento": 0,\n  "pagador": {\n    "ispb": "04902979",\n    "tpPessoa": 0,\n    "cpfCnpj": "60502961546",\n    "nome": "Pagador Teste",\n    "nrAgencia": "0201",\n    "nrConta": "{{contaOrigem}}",\n    "tpConta": 0\n  },\n  "recebedor": {\n    "ispb": "08357240",\n    "tpPessoa": 0,\n    "cpfCnpj": "18915914520",\n    "nome": "TESTE DE QA - CARREFOUR",\n    "nrAgencia": "0001",\n    "nrConta": "1737651",\n    "tpConta": 0\n  },\n  "orderingCustomerId": "{{ordCust}}",\n  "beneficiaryAccountId": "BRL1401100010001",\n  "tpIniciacao": 3,\n  "finalidade": 0,\n  "valor": 10.01,\n  "chave": "18915914520",\n  "idConciliacaoRecebedor": "TXIDDINAMICOUAT0001ABCDEFGH"\n}',
        responses: [
          {
            statusCode: '202',
            description: 'Accepted',
            example:
              '{\n  "jdpi": {\n    "idReqSistemaCliente": "6cea6304-5fb5-4281-9e28-5b4c485b6178",\n    "idReqJdPi": "01000000-9c34-804f-475b-08defa55faf0",\n    "endToEndId": "E049029792026081422477X9IBKTLTH7",\n    "dtHrReqJdPi": "2026-08-14T22:47:12.240Z"\n  },\n  "paymentOrderId": "PI2622602JGRY322",\n  "temenosConfirmed": true\n}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/jdpi/spi/op/pixout',
        summary: 'POST pixout finalidade=3 REEMBOLSO  -> 202',
        tags: ['SPI op/pixout (Temenos funds-block)'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
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
          '{\n  "idReqSistemaCliente": "{{$guid}}",\n  "dtHrRequisicaoPsp": "{{$isoTimestamp}}",\n  "prioridadePagamento": 0,\n  "tpPrioridadePagamento": 0,\n  "pagador": {\n    "ispb": "04902979",\n    "tpPessoa": 0,\n    "cpfCnpj": "60502961546",\n    "nome": "Pagador Teste",\n    "nrAgencia": "0201",\n    "nrConta": "{{contaOrigem}}",\n    "tpConta": 0\n  },\n  "recebedor": {\n    "ispb": "08357240",\n    "tpPessoa": 0,\n    "cpfCnpj": "18915914520",\n    "nome": "TESTE DE QA - CARREFOUR",\n    "nrAgencia": "0001",\n    "nrConta": "1737651",\n    "tpConta": 0\n  },\n  "orderingCustomerId": "{{ordCust}}",\n  "beneficiaryAccountId": "BRL1401100010001",\n  "tpIniciacao": 0,\n  "finalidade": 3,\n  "valor": 10.01\n}',
        responses: [
          {
            statusCode: '202',
            description: 'Accepted',
            example:
              '{\n  "jdpi": {\n    "idReqSistemaCliente": "9e0e4e82-5874-4b15-a719-f85ea42128d6",\n    "idReqJdPi": "01000000-9c34-804f-2d23-08defa55fc31",\n    "endToEndId": "E04902979202608142247QONGESBGSOH",\n    "dtHrReqJdPi": "2026-08-14T22:47:14.343Z"\n  },\n  "paymentOrderId": "PI262260RXLFPNCK",\n  "temenosConfirmed": true\n}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/jdpi/spi/op/pixout',
        summary: 'POST pixout finalidade=5 DEVOLUCAO  -> 202',
        tags: ['SPI op/pixout (Temenos funds-block)'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
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
          '{\n  "idReqSistemaCliente": "{{$guid}}",\n  "dtHrRequisicaoPsp": "{{$isoTimestamp}}",\n  "prioridadePagamento": 0,\n  "tpPrioridadePagamento": 0,\n  "pagador": {\n    "ispb": "04902979",\n    "tpPessoa": 0,\n    "cpfCnpj": "60502961546",\n    "nome": "Pagador Teste",\n    "nrAgencia": "0201",\n    "nrConta": "{{contaOrigem}}",\n    "tpConta": 0\n  },\n  "recebedor": {\n    "ispb": "08357240",\n    "tpPessoa": 0,\n    "cpfCnpj": "18915914520",\n    "nome": "TESTE DE QA - CARREFOUR",\n    "nrAgencia": "0001",\n    "nrConta": "1737651",\n    "tpConta": 0\n  },\n  "orderingCustomerId": "{{ordCust}}",\n  "beneficiaryAccountId": "BRL1401100010001",\n  "tpIniciacao": 0,\n  "finalidade": 5,\n  "valor": 10.01,\n  "endToEndIdDevolucao": "D04902979202606290400ABCDEF123"\n}',
        responses: [
          {
            statusCode: '202',
            description: 'Accepted',
            example:
              '{\n  "jdpi": {\n    "idReqSistemaCliente": "83c0bdab-989a-4fe6-ae8e-d91e289a5335",\n    "idReqJdPi": "01000000-9c34-804f-75d1-08defa55fd8b",\n    "endToEndId": "E0490297920260814224757SYJ1IGHQK",\n    "dtHrReqJdPi": "2026-08-14T22:47:16.612Z"\n  },\n  "paymentOrderId": "PI262260NFMVFPNY",\n  "temenosConfirmed": true\n}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/jdpi/spi/op/interna',
        summary: 'POST op/interna (liquidação interna)  -> 200',
        tags: ['SPI op/pixout (Temenos funds-block)'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
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
          '{\n  "idReqSistemaCliente": "{{$guid}}",\n  "endToEndId": "E04902979202606290400ABCDEF12345",\n  "tpTransacao": 1,\n  "tpIniciacao": 1,\n  "dtHrLiquidacao": "{{$isoTimestamp}}",\n  "valor": 10.01,\n  "chave": "18915914520",\n  "pagador": {\n    "ispb": "04902979",\n    "tpPessoa": 0,\n    "cpfCnpj": "60502961546",\n    "nome": "Pagador Teste",\n    "nrAgencia": "0201",\n    "nrConta": "{{contaOrigem}}",\n    "tpConta": 0\n  },\n  "recebedor": {\n    "ispb": "30015936",\n    "tpPessoa": 0,\n    "cpfCnpj": "11122233396",\n    "nome": "Recebedor Outro Banco",\n    "nrAgencia": "0001",\n    "nrConta": "1000001034",\n    "tpConta": 0\n  }\n}',
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "idReqSistemaCliente": "8b40357a-4fc5-4a97-935d-4e3322cb7241",\n  "idReqJdPi": "01000000-9c34-804f-9151-08defa55ff61",\n  "endToEndId": "E04902979202606290400ABCDEF12345",\n  "dtHrReqJdPi": "2026-08-14T22:47:19.693Z"\n}',
          },
        ],
      },
    ],
  },
  {
    title: 'PIX Variacoes tipadas (/jdpi/pix/*)',
    baseUrl: 'https://uat.corebanxapp.com.br/paymentos',
    partner: 'Corebanx',
    description:
      'Variações tipadas de envio PIX pelos endpoints /jdpi/pix/*, cobrindo diferentes tipos de iniciação (chave, dados bancários, QR estático/dinâmico etc.).',
    endpoints: [
      {
        method: 'POST',
        path: '/jdpi/pix/in-out',
        summary: 'POST /jdpi/pix/in-out  (saída padrão)',
        tags: ['PIX Variacoes tipadas (/jdpi/pix/*)', 'Variações de saída'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
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
          '{\n  "idReqSistemaCliente": "{{guid}}",\n  "dtHrRequisicaoPsp": "{{nowIso}}",\n  "valor": 10.01,\n  "pagador":   { "ispb": "04902979", "tpPessoa": 0, "cpfCnpj": "60502961546", "nome": "Pagador Teste", "nrAgencia": "0201", "tpConta": 0, "nrConta": "{{contaOrigem}}" },\n  "recebedor": { "ispb": "08357240", "tpPessoa": 0, "cpfCnpj": "18915914520", "nome": "TESTE DE QA - CARREFOUR", "nrAgencia": "0001", "tpConta": 0, "nrConta": "1737651" }\n}',
        responses: [
          {
            statusCode: '202',
            description: 'Accepted',
            example:
              '{\n  "idReqSistemaCliente": "17207348903522224-1786747639691",\n  "idReqJdPi": "01000000-9c34-804f-4814-08defa55ff93",\n  "endToEndId": "E04902979202608142247LPWB81IKBYQ",\n  "dtHrReqJdPi": "2026-08-14T22:47:20.019Z"\n}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/jdpi/pix/chave',
        summary: 'POST /jdpi/pix/chave  (saída por chave)',
        tags: ['PIX Variacoes tipadas (/jdpi/pix/*)', 'Variações de saída'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
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
          '{\n  "idReqSistemaCliente": "{{guid}}",\n  "dtHrRequisicaoPsp": "{{nowIso}}",\n  "valor": 10.01,\n  "chave": "18915914520",\n  "pagador":   { "ispb": "04902979", "tpPessoa": 0, "cpfCnpj": "60502961546", "nome": "Pagador Teste", "nrAgencia": "0201", "tpConta": 0, "nrConta": "{{contaOrigem}}" },\n  "recebedor": { "ispb": "08357240", "tpPessoa": 0, "cpfCnpj": "18915914520", "nome": "TESTE DE QA - CARREFOUR", "nrAgencia": "0001", "tpConta": 0, "nrConta": "1737651" }\n}',
        responses: [
          {
            statusCode: '202',
            description: 'Accepted',
            example:
              '{\n  "idReqSistemaCliente": "3127088462226857-1786747640001",\n  "idReqJdPi": "01000000-9c34-804f-11c0-08defa55ffbf",\n  "endToEndId": "E0490297920260814224743M3J6XQ1FZ",\n  "dtHrReqJdPi": "2026-08-14T22:47:20.306Z"\n}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/jdpi/pix/qr-estatico',
        summary: 'POST /jdpi/pix/qr-estatico',
        tags: ['PIX Variacoes tipadas (/jdpi/pix/*)', 'Variações de saída'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
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
          '{\n  "idReqSistemaCliente": "{{guid}}",\n  "dtHrRequisicaoPsp": "{{nowIso}}",\n  "valor": 10.01,\n  "chave": "18915914520",\n  "idConciliacaoRecebedor": "TXIDESTATICO0001",\n  "pagador":   { "ispb": "04902979", "tpPessoa": 0, "cpfCnpj": "60502961546", "nome": "Pagador Teste", "nrAgencia": "0201", "tpConta": 0, "nrConta": "{{contaOrigem}}" },\n  "recebedor": { "ispb": "08357240", "tpPessoa": 0, "cpfCnpj": "18915914520", "nome": "TESTE DE QA - CARREFOUR", "nrAgencia": "0001", "tpConta": 0, "nrConta": "1737651" }\n}',
        responses: [
          {
            statusCode: '202',
            description: 'Accepted',
            example:
              '{\n  "idReqSistemaCliente": "9719655351875254-1786747640293",\n  "idReqJdPi": "01000000-9c34-804f-2ea3-08defa55ffec",\n  "endToEndId": "E04902979202608142247N05V8HED518",\n  "dtHrReqJdPi": "2026-08-14T22:47:20.602Z"\n}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/jdpi/pix/qr-dinamico',
        summary: 'POST /jdpi/pix/qr-dinamico',
        tags: ['PIX Variacoes tipadas (/jdpi/pix/*)', 'Variações de saída'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
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
          '{\n  "idReqSistemaCliente": "{{guid}}",\n  "dtHrRequisicaoPsp": "{{nowIso}}",\n  "valor": 10.01,\n  "chave": "18915914520",\n  "idConciliacaoRecebedor": "TXIDDINAMICOUAT0001ABCDEFGH",\n  "pagador": {\n    "ispb": "04902979",\n    "tpPessoa": 0,\n    "cpfCnpj": "60502961546",\n    "nome": "Pagador Teste",\n    "nrAgencia": "0201",\n    "tpConta": 0,\n    "nrConta": "{{contaOrigem}}"\n  },\n  "recebedor": {\n    "ispb": "08357240",\n    "tpPessoa": 0,\n    "cpfCnpj": "18915914520",\n    "nome": "TESTE DE QA - CARREFOUR",\n    "nrAgencia": "0001",\n    "tpConta": 0,\n    "nrConta": "1737651"\n  }\n}',
        responses: [
          {
            statusCode: '202',
            description: 'Accepted',
            example:
              '{\n  "idReqSistemaCliente": "6060735516814879-1786747640589",\n  "idReqJdPi": "01000000-9c34-804f-1bcb-08defa56001f",\n  "endToEndId": "E04902979202608142247G2SDO55F8ON",\n  "dtHrReqJdPi": "2026-08-14T22:47:20.935Z"\n}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/jdpi/pix/cobv',
        summary: 'POST /jdpi/pix/cobv  (cobrança c/ vencimento)',
        description: 'Requer chave + idConciliacaoRecebedor (txid).',
        tags: ['PIX Variacoes tipadas (/jdpi/pix/*)', 'Variações de saída'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
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
          '{\n  "idReqSistemaCliente": "{{guid}}",\n  "dtHrRequisicaoPsp": "{{nowIso}}",\n  "valor": 10.01,\n  "chave": "18915914520",\n  "idConciliacaoRecebedor": "TXIDCOBVUAT00000001ABCDEFGH",\n  "pagador": {\n    "ispb": "04902979",\n    "tpPessoa": 0,\n    "cpfCnpj": "60502961546",\n    "nome": "Pagador Teste",\n    "nrAgencia": "0201",\n    "tpConta": 0,\n    "nrConta": "{{contaOrigem}}"\n  },\n  "recebedor": {\n    "ispb": "08357240",\n    "tpPessoa": 0,\n    "cpfCnpj": "18915914520",\n    "nome": "TESTE DE QA - CARREFOUR",\n    "nrAgencia": "0001",\n    "tpConta": 0,\n    "nrConta": "1737651"\n  }\n}',
        responses: [
          {
            statusCode: '202',
            description: 'Accepted',
            example:
              '{\n  "idReqSistemaCliente": "797616822428205-1786747640932",\n  "idReqJdPi": "01000000-9c34-804f-8b82-08defa560050",\n  "endToEndId": "E04902979202608142247JSPP86BE7NS",\n  "dtHrReqJdPi": "2026-08-14T22:47:21.259Z"\n}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/jdpi/pix/parcelado',
        summary: 'POST /jdpi/pix/parcelado',
        tags: ['PIX Variacoes tipadas (/jdpi/pix/*)', 'Variações de saída'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
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
          '{\n  "idReqSistemaCliente": "{{guid}}",\n  "dtHrRequisicaoPsp": "{{nowIso}}",\n  "valor": 10.01,\n  "pagador":   { "ispb": "04902979", "tpPessoa": 0, "cpfCnpj": "60502961546", "nome": "Pagador Teste", "nrAgencia": "0201", "tpConta": 0, "nrConta": "{{contaOrigem}}" },\n  "recebedor": { "ispb": "08357240", "tpPessoa": 0, "cpfCnpj": "18915914520", "nome": "TESTE DE QA - CARREFOUR", "nrAgencia": "0001", "tpConta": 0, "nrConta": "1737651" }\n}',
        responses: [
          {
            statusCode: '400',
            description: 'Bad Request',
            example:
              '{\n  "codigo": "jdpi_spi_create_payment_order_failed",\n  "detalhes": {\n    "idempotency_key": "72895e44-03d0-49a6-96cd-2e55290fbb6f",\n    "method": "POST",\n    "operation": "create_payment_order_parcelado",\n    "request_body": "{\\"dtHrRequisicaoPsp\\":\\"2026-08-14T22:47:21.277Z\\",\\"endToEndId\\":\\"E04902979202608142247UT2Y1JD6RZ5\\",\\"finalidade\\":4,\\"idReqSistemaCliente\\":\\"3464138656120641-1786747641277\\",\\"pagador\\":{\\"cpfCnpj\\":\\"60502961546\\",\\"ispb\\":\\"04902979\\",\\"nome\\":\\"Pagador Teste\\",\\"nrAgencia\\":\\"0201\\",\\"nrConta\\":\\"1000000837\\",\\"tpConta\\":0,\\"tpPessoa\\":0},\\"prioridadePagamento\\":0,\\"recebedor\\":{\\"cpfCnpj\\":\\"18915914520\\",\\"ispb\\":\\"08357240\\",\\"nome\\":\\"TESTE DE QA - CARREFOUR\\",\\"nrAgencia\\":\\"0001\\",\\"nrConta\\":\\"1737651\\",\\"tpConta\\":0,\\"tpPessoa\\":0},\\"tpIniciacao\\":0,\\"tpPrioridadePagamento\\":0,\\"valor\\":10.01}",\n    "response_body": "{\\"codigo\\":\\"400\\",\\"mensagem\\":\\"Finalidade \'4 - Pix Parcelado\' não é suportada nesta versão.\\"}",\n    "section": "spi",\n    "status": 400,\n    "url": "https://basa-api.hml.jdpsti.com.br/spi-api/jdpi/spi/api/v2/op"\n  },\n  "mensagem": "jdpi: bad request (400)"\n}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/jdpi/pix/troco',
        summary: 'POST /jdpi/pix/troco  (compra + troco)',
        description:
          'Saque/Troco (modalidadeAgente). vlrDetalhe é montado pelo handler a partir de valor.',
        tags: ['PIX Variacoes tipadas (/jdpi/pix/*)', 'Variações de saída'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
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
          '{\n  "idReqSistemaCliente": "{{guid}}",\n  "dtHrRequisicaoPsp": "{{nowIso}}",\n  "valor": 50,\n  "ispbPss": "04902979",\n  "pagador": {\n    "ispb": "04902979",\n    "tpPessoa": 0,\n    "cpfCnpj": "60502961546",\n    "nome": "Pagador Teste",\n    "nrAgencia": "0201",\n    "tpConta": 0,\n    "nrConta": "{{contaOrigem}}"\n  },\n  "recebedor": {\n    "ispb": "08357240",\n    "tpPessoa": 0,\n    "cpfCnpj": "18915914520",\n    "nome": "TESTE DE QA - CARREFOUR",\n    "nrAgencia": "0001",\n    "tpConta": 0,\n    "nrConta": "1737651"\n  },\n  "valorCompra": 8.5,\n  "valorEspecie": 2\n}',
        responses: [
          {
            statusCode: '202',
            description: 'Accepted',
            example:
              '{\n  "idReqSistemaCliente": "2885756045172674-1786747641622",\n  "idReqJdPi": "01000000-9c34-804f-8a9f-08defa5600be",\n  "endToEndId": "E04902979202608142247DSAC40EM7TR",\n  "dtHrReqJdPi": "2026-08-14T22:47:21.980Z"\n}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/jdpi/pix/saque',
        summary: 'POST /jdpi/pix/saque  (Pix Saque)',
        tags: ['PIX Variacoes tipadas (/jdpi/pix/*)', 'Variações de saída'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
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
          '{\n  "idReqSistemaCliente": "{{guid}}",\n  "dtHrRequisicaoPsp": "{{nowIso}}",\n  "valor": 50.00,\n  "ispbPss": "04902979",\n  "pagador":   { "ispb": "04902979", "tpPessoa": 0, "cpfCnpj": "60502961546", "nome": "Pagador Teste", "nrAgencia": "0201", "tpConta": 0, "nrConta": "{{contaOrigem}}" },\n  "recebedor": { "ispb": "08357240", "tpPessoa": 0, "cpfCnpj": "18915914520", "nome": "TESTE DE QA - CARREFOUR", "nrAgencia": "0001", "tpConta": 0, "nrConta": "1737651" }\n}',
        responses: [
          {
            statusCode: '202',
            description: 'Accepted',
            example:
              '{\n  "idReqSistemaCliente": "6782099745781893-1786747641977",\n  "idReqJdPi": "01000000-9c34-804f-f4f8-08defa5600ef",\n  "endToEndId": "E04902979202608142247Q2Z1SE7XN35",\n  "dtHrReqJdPi": "2026-08-14T22:47:22.304Z"\n}',
          },
        ],
      },
    ],
  },
  {
    title: 'QR Code — Gerar',
    baseUrl: 'https://uat.corebanxapp.com.br/paymentos',
    partner: 'Corebanx',
    description:
      'Geração de QR Codes PIX (estático, dinâmico e cobrança/cobv) para recebimento de pagamentos.',
    endpoints: [
      {
        method: 'POST',
        path: '/jdpi/qrcode/estatico/gerar',
        summary: 'POST /qrcode/estatico/gerar',
        description: 'formato: 0=imagem,1=payload base64,2=ambos.',
        tags: ['QR Code — Gerar'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
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
          '{\n  "formato": 2,\n  "chave": "{{chaveNossa}}",\n  "codigoCategoria": "0000",\n  "valor": 100.5,\n  "nomeRecebedor": "Leonardo Almeida Alves",\n  "cidade": "Belem",\n  "idConciliacaoRecebedor": "TXIDESTATICO0001"\n}',
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "imagemQRCodeInBase64": "iVBORw0KGgoAAAANSUhEUgAAAQQAAAEEAQAAAADmc3enAAADFklEQVR4nO2ZYWreQAxEdQPd/5a6wZb3tHYTKPRPM4U2xsVfvRMQq9FoVq7zm2vqG/F/70dVdU31dM2pmZo5U1MuBBHNPdM9U11dp7uB3oUcorqn6kwXgR5uonQhjeBx5pzq02X48zcQpA0yFRexksU04pzumoE73eSN/5z+nNuvR0DYX16fuP71CC9QBz4vhaF1f679L0dMVQ03dUSVQ+c+UPvuWAjhLzMId4h9DmU+z45lEH1QOmNjpw5cora7i02MIea4N24cPD5P5rorioDIBMlbkjaGS8RvbhMIsmT5QBpFhWRyo3s5BBJ/Csocnit6kpqiyiHswWyaHCoiRP3HlhhEqGoEKfzhtQbhKkwGYf0q+HRBpA4+rd51EEH/UWBsADynBp9AJoMIFJbuh0siSspLg2LcOQR8kUGsLxJW6yJPEKFnpAFKHHyssq8AJxFsjJ7E8r6ZI4/8bRJxg9Q4jqU0WoQ1CzGEEVFWYHzAHlXuJBEQRY3lfMEJB3nhp54hiODyVKNp4s3ymuiDCJ2SBF7BRV6Q3a3xIGKtiOzdHHrW2bdBhD7J9ueRZsv6Sm8HEWi87oA1nbT+cZMYREgU+UILQFjGfqgARxHQB1G5BEZosSdr7mMIQtKLMBe5V7/5CyJgDjYAodGdYJU00Y+jjyBkrM6VX6twqo5bl0PAFV283Wf/rWMj4ByCNHH+JVTNo/SxAb2VnUCspikpvtTF7jnwdSgZBOv6gG1CDPQeAQwilJXdMTsRR3AnjD8rO4MgKKeqRgaH1P8PuY0goMxtzPThLWryuW4phpA5HvuubWSv2hJ/z+oRxA6anxOOMO38XUwhlFcIdFMIxvPvG2kGgcBInD2EFrRe+X8dfQTBq+ezxHLadziWKIIXtr1FMkpz2z6cgVIIp/9kbJuho6yPk4kI4m6WLsWXO0xz9n2CCDzJM1ik+dympPB3EuESjYcegLYgLzsQjyPuByJn3u8M+p1JxxDXK+0YnpjvUTSKcGTEWIKbPkSoMPunt0wgbknr5HWO+3nGAk8i/sS36G/E+Tf34wcZGvq2PChcuwAAAABJRU5ErkJggg==",\n  "payloadBase64": "MDAwMjAxMjYzMzAwMTRici5nb3YuYmNiLnBpeDAxMTEzMzQwMjExOTgxMTUyMDQwMDAwNTMwMzk4NjU0MDYxMDAuNTA1ODAyQlI1OTIyTGVvbmFyZG8gQWxtZWlkYSBBbHZlczYwMDVCZWxlbTYyMjAwNTE2VFhJREVTVEFUSUNPMDAwMTYzMDQzNjBE"\n}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/jdpi/qrcode/dinamico/gerar',
        summary: 'POST /qrcode/dinamico/gerar',
        description:
          'JDPI exige valorOriginal (não valor). Depende de cert JWS.',
        tags: ['QR Code — Gerar'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
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
          '{\n  "formato": 1,\n  "chave": "{{chaveNossa}}",\n  "ispbCertificadoJws": "{{ispb}}",\n  "nomeRecebedor": "Leonardo Almeida Alves",\n  "cpfRecebedor": "{{docOrigem}}",\n  "cidade": "Belem",\n  "cep": "66053040",\n  "valorOriginal": 10.01,\n  "expiracaoQR": 3600,\n  "idConciliacaoRecebedor": "{{qrTxid}}",\n  "urlPayloadJson": "qrcode-h.basa.com.br/pix/cob/{{qrTxid}}",\n  "urlJwk": "qrcode-h.basa.com.br/pix/jwks"\n}',
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "idDocumento": "8d7f59a1-e892-4dee-90d3-5fced544e312",\n  "payloadBase64": "MDAwMjAxMDEwMjEyMjY3MTAwMTRici5nb3YuYmNiLnBpeDI1NDlxcmNvZGUtaC5iYXNhLmNvbS5ici9waXgvY29iL1RYSURESU4xNzg2NzQ3NjQyNjI5NTIwNDAwMDA1MzAzOTg2NTgwMkJSNTkyMkxlb25hcmRvIEFsbWVpZGEgQWx2ZXM2MDA1QmVsZW02MTA4NjYwNTMwNDA2MjA3MDUwMyoqKjYzMDQ2MjRG",\n  "payloadJws": "<jwt_redacted>"\n}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/jdpi/qrcode/dinamico/cobv/gerar',
        summary: 'POST /qrcode/dinamico/cobv/gerar',
        tags: ['QR Code — Gerar'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
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
          '{\n  "formato": 1,\n  "chave": "{{chaveNossa}}",\n  "nomeRecebedor": "Leonardo Almeida Alves",\n  "cpfRecebedor": "{{docOrigem}}",\n  "logradouroRecebedor": "Av Presidente Vargas 800",\n  "cidade": "Belem",\n  "uf": "PA",\n  "cep": "66053040",\n  "valorOriginal": 25.5,\n  "valorFinal": 25.5,\n  "dtVenc": "2026-09-30",\n  "diasAposVenc": 5,\n  "idConciliacaoRecebedor": "{{cobvTxid}}",\n  "devedor": {\n    "cpf": "11144477735",\n    "nome": "Cliente Teste"\n  },\n  "urlPayloadJson": "qrcode-h.basa.com.br/pix/cobv/{{cobvTxid}}"\n}',
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "idDocumento": "cf30ad19-1266-420b-b6ec-1a2e3594fb1c",\n  "payloadBase64": "MDAwMjAxMDEwMjEyMjY3MzAwMTRici5nb3YuYmNiLnBpeDI1NTFxcmNvZGUtaC5iYXNhLmNvbS5ici9waXgvY29idi9UWElEQ09CVjE3ODY3NDc2NDI5NzA1MjA0MDAwMDUzMDM5ODY1ODAyQlI1OTIyTGVvbmFyZG8gQWxtZWlkYSBBbHZlczYwMDVCZWxlbTYxMDg2NjA1MzA0MDYyMDcwNTAzKioqNjMwNEYxRjM"\n}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/jdpi/qrcode/dinamico/cobv/jws',
        summary: 'POST /qrcode/dinamico/cobv/jws',
        tags: ['QR Code — Gerar'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
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
          '{\n  "idDocumento": "{{cobvIdDoc}}",\n  "ispbCertificadoJws": "{{ispb}}",\n  "valorOriginal": 25.5,\n  "valorFinal": 25.5,\n  "urlJwk": "qrcode-h.basa.com.br/pix/jwks"\n}',
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example: '{\n  "payloadJws": "<jwt_redacted>"\n}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/jdpi/qrcode/dinamico/cobv/jws/{cobvIdDoc}',
        summary: 'POST /qrcode/dinamico/cobv/jws/{idDocumento}',
        tags: ['QR Code — Gerar'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
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
          '{\n  "ispbCertificadoJws": "{{ispb}}",\n  "valorOriginal": 25.5,\n  "valorFinal": 25.5,\n  "urlJwk": "qrcode-h.basa.com.br/pix/jwks"\n}',
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example: '{\n  "payloadJws": "<jwt_redacted>"\n}',
          },
        ],
      },
    ],
  },
  {
    title: 'QR Code — Decodificar',
    baseUrl: 'https://uat.corebanxapp.com.br/paymentos',
    partner: 'Corebanx',
    description:
      'Decodificação/leitura de BR Codes (payloads de QR Code PIX) para obtenção dos dados da cobrança antes do pagamento.',
    endpoints: [
      {
        method: 'POST',
        path: '/jdpi/qrcode/decodificar',
        summary: 'POST /qrcode/decodificar  (qrCodePayload)',
        description: 'BR Code (EMV) a decodificar.',
        tags: ['QR Code — Decodificar'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
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
          '{\n  "qrCodePayload": "{{qrPayloadStatic}}",\n  "qrCode": "{{qrPayloadStatic}}"\n}',
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "endToEndId": "E04902979202608142247IS6QJFYSWRO",\n  "tpQRCode": 11,\n  "dadosQrCodeEstatico": {\n    "ispb": "04902979",\n    "nrAgencia": "201",\n    "nrConta": "1000000473",\n    "chave": "33402119811",\n    "codigoCategoria": "0000",\n    "valor": 100.5,\n    "nomeRecebedor": "Leonardo Almeida Alves",\n    "cpfCnpjRecebedor": "33402119811",\n    "cidade": "Belem",\n    "idConciliacaoRecebedor": "TXIDESTATICO0001"\n  }\n}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/jdpi/qrcode/decodificar/url',
        summary: 'POST /qrcode/decodificar/url  (urlPayloadJson)',
        description:
          "Decodifica um BR Code por URL. O host e qrcode-h.basa.com.br (payload hospedado no PSP recebedor). Requer um {{cobvToken}} REAL de uma cobranca cobv gerada — hoje bloqueado porque a JDPI homolog nao gera a location (erro 'chave ou location'). Quando o BASA ligar o hosting de QR dinamico, funciona.",
        tags: ['QR Code — Decodificar'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
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
          '{\n  "urlPayloadJson": "qrcode-h.basa.com.br/pix/cobv/{{cobvTxid}}"\n}',
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "endToEndId": "E049029792026081422477377QZRFR0C",\n  "tpQRCode": 13,\n  "dadosQrCodeDinamicoCobv": {\n    "cep": "66053040",\n    "chave": "33402119811",\n    "cidade": "-",\n    "cpfCnpjRecebedor": "33402119811",\n    "cpfPagador": "11144477735",\n    "diasAposVenc": 5,\n    "dtHrApresentacao": "2026-08-14T22:47:24.700Z",\n    "dtHrCriacao": "2026-08-14T22:47:24.625Z",\n    "dtVenc": "2026-09-30",\n    "idConciliacaoRecebedor": "TXIDCOBV1786747642970",\n    "ispb": "04902979",\n    "logradouroRecebedor": "Av Presidente Vargas 800",\n    "nomePagador": "Cliente Teste",\n    "nomeRecebedor": "Leonardo Almeida Alves",\n    "nrAgencia": "201",\n    "nrConta": "1000000473",\n    "revisao": 0,\n    "status": 0,\n    "tpChave": 0,\n    "tpConta": 0,\n    "tpPessoaRecebedor": 0,\n    "uf": "PA",\n    "valorFinal": 25.5,\n    "valorOriginal": 25.5\n  }\n}',
          },
        ],
      },
    ],
  },
  {
    title: 'PIX Agendado',
    baseUrl: 'https://uat.corebanxapp.com.br/paymentos',
    partner: 'Corebanx',
    description:
      'Criação, consulta e cancelamento de ordens PIX agendadas para data futura.',
    endpoints: [
      {
        method: 'POST',
        path: '/jdpi/pix/agendado',
        summary:
          'POST /jdpi/pix/agendado  (dispatch — tpIniciacao=8, tpPrioridade=2)',
        description:
          'Variação Pix Agendado: handler força tpIniciacao=8 + tpPrioridadePagamento=2 e ignora `chave`. Pré-requisito: registro em /jdpi/pa/agendamento. Use dtHrRequisicaoPsp = AGORA (senão ADMI.002).',
        tags: ['PIX Agendado', '1. Nativo JDPI (/jdpi/pix/agendado)'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
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
          '{\n  "idReqSistemaCliente": "{{guid}}",\n  "dtHrRequisicaoPsp": "{{nowIso}}",\n  "valor": 10.01,\n  "pagador":   { "ispb": "04902979", "tpPessoa": 0, "cpfCnpj": "60502961546", "nome": "Pagador Teste",       "nrAgencia": "0201", "tpConta": 0, "nrConta": "{{contaOrigem}}" },\n  "recebedor": { "ispb": "08357240", "tpPessoa": 0, "cpfCnpj": "18915914520", "nome": "TESTE DE QA - CARREFOUR", "nrAgencia": "0001", "tpConta": 0, "nrConta": "1737651" },\n  "infEntreClientes": "Pix agendado teste"\n}',
        responses: [
          {
            statusCode: '202',
            description: 'Accepted',
            example:
              '{\n  "idReqSistemaCliente": "384d213e-2037-40c1-b145-d6f7f82ca5e3",\n  "idReqJdPi": "01000000-9c34-804f-f19d-08defa560282",\n  "endToEndId": "E04902979202608142247TIBGYLIBR8J",\n  "dtHrReqJdPi": "2026-08-14T22:47:24.945Z",\n  "tpCanal": 1\n}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/pix/scheduled',
        summary:
          'POST /v1/pix/scheduled  (agendar, COM pixout -> reserva PIXFUTBA)',
        description:
          'Agenda um PIX com o bloco pixout completo -> reserva a ordem PIXFUTBA no core (recebedor interbancario, ISPB != 04902979). Sem o bloco pixout vira agendamento legado DB-only que NUNCA executa. tpIniciacao=0 sem chave (identifica por conta). scheduled_date RFC3339 com offset. O booking bate no host de EXTENSAO (iris) — precisa estar de pe + conta provisionada.',
        tags: [
          'PIX Agendado',
          '2. Facade paymentOS (/v1/pix/scheduled)  [/v1 pode 404 no gateway]',
        ],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'X-Tenant-Org-ID',
            in: 'header',
            required: true,
            type: 'string',
            description: '{{tenantOrgId}}',
          },
        ],
        requestBody:
          '{\n  "payer_key": "{{docOrigem}}",\n  "payee_key": "79048471249",\n  "amount": "1.00",\n  "scheduled_date": "{{dataFutura}}T14:30:00-03:00",\n  "description": "PIXFUTBA agendado",\n  "pixout": {\n    "pagador": {\n      "ispb": "04902979",\n      "tpPessoa": 0,\n      "cpfCnpj": "{{docOrigem}}",\n      "nome": "PAGADOR TESTE UAT",\n      "nrAgencia": "0201",\n      "tpConta": 0,\n      "nrConta": "{{contaOrigem}}"\n    },\n    "recebedor": {\n      "ispb": "30015936",\n      "tpPessoa": 0,\n      "cpfCnpj": "60502961546",\n      "nome": "BENEF INTERBANCARIO",\n      "nrAgencia": "0001",\n      "tpConta": 0,\n      "nrConta": "1737651"\n    },\n    "finalidade": 0,\n    "tpIniciacao": 0,\n    "orderingCustomerId": "{{ordCust}}",\n    "beneficiaryAccountId": "BRL1401100010001"\n  }\n}',
        responses: [
          {
            statusCode: '422',
            description: 'unknown',
            example:
              '{\n  "type": "/errors/PIX_SCHEDULE_FAILED",\n  "title": "Unprocessable Entity",\n  "status": 422,\n  "detail": "book future order in the core: book temenos future order: temenos paymentOrders returned 400: {\\"header\\":{\\"audit\\":{\\"T24_time\\":540,\\"responseParse_time\\":0,\\"requestParse_time\\":2},\\"id\\":\\"PI2622613RDT3FCN\\",\\"status\\":\\"failed\\",\\"uniqueIdentifier\\":\\"IRFX262269562082045.00\\"},\\"error\\":{\\"type\\":\\"BUSINESS\\",\\"errorDetails\\":[{\\"fieldName\\":\\"beneficiaryAccountId\\",\\"code\\":\\"E-157792\\",\\"message\\":\\"Invalid Beneficiary Account\\"}]}}",\n  "instance": "/v1/pix/scheduled",\n  "code": "PIX_SCHEDULE_FAILED"\n}',
          },
        ],
      },
      {
        method: 'GET',
        path: '/v1/pix/scheduled',
        summary: 'GET /v1/pix/scheduled  (listar)',
        tags: [
          'PIX Agendado',
          '2. Facade paymentOS (/v1/pix/scheduled)  [/v1 pode 404 no gateway]',
        ],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "items": [\n    {\n      "schedule_id": "4622e2b2-6a6b-4acd-b8e5-ef932c2c7ac8",\n      "tenant_id": "00000000-0000-0000-0000-000000000001",\n      "scheduled_date": "2026-06-15T00:00:00Z",\n      "status": "CANCELLED",\n      "amount": "15",\n      "payer_key": "79048471249",\n      "payee_key": "+5598984690450",\n      "description": "E2E scope test",\n      "retry_count": 3,\n      "max_retries": 3,\n      "is_due": false,\n      "created_at": "2026-06-03T01:27:57.63193Z",\n      "last_failure_code": "submit_failed",\n      "last_failure_detail": "DICT key lookup: jdpi: resource not found (404) method=GET url=https://basa-api.hml.jdpsti.com.br/chave-gestao-api/jdpi/dict/api/v2/chave/%2B5598984690450 status=404 section=dict operation=get_entry response_body={\\"codigo\\":\\"NotFound\\",\\"idCorrelacao\\":\\"A20260814192533667049029790A8BCE\\",\\"mensagem\\":\\"Entidade não encontrada.\\"}",\n      "last_failure_at": "2026-08-14T22:25:33.576962Z"\n    },\n    {\n      "schedule_id": "c8ec7966-3ca6-4389-8e21-4b5ae50410b7",\n      "tenant_id": "00000000-0000-0000-0000-000000000001",\n      "scheduled_date": "2026-06-15T00:00:00Z",\n      "status": "EXPIRED",\n      "amount": "15",\n      "payer_key": "79048471249",\n      "payee_key": "+5598984690450",\n      "description": "E2E scope test",\n      "retry_count": 3,\n      "max_retries": 3,\n      "is_due": false,\n      "created_at": "2026-06-03T01:27:29.955142Z"\n    },\n    {\n      "schedule_id": "df8eb076-031b-4a2b-a720-2bcdc96d6205",\n      "tenant_id": "00000000-0000-0000-0000-000000000001",\n      "scheduled_date": "2026-07-01T00:00:00Z",\n      "status": "CANCELLED",\n      "amount": "10.01",\n      "payer_key": "60502961546",\n      "payee_key": "18915914520",\n      "description": "Pagamento agendado teste",\n      "retry_count": 0,\n      "max_retries": 3,\n      "is_due": false,\n      "created_at": "2026-06-29T14:42:50.546556Z"\n    },\n    {\n      "schedule_id": "a7dc67b1-0305-4ac8-8c3b-7510f917dd60",\n      "tenant_id": "00000000-0000-0000-0000-000000000001",\n      "scheduled_date": "2026-07-01T00:00:00Z",\n      "status": "CANCELLED",\n      "amount": "10.01",\n      "payer_key": "60502961546",\n      "payee_key": "18915914520",\n      "description": "Pagamento agendado teste",\n      "retry_count": 0,\n      "max_retries": 3,\n      "is_due": false,\n      "created_at": "2026-06-29T04:34:03.895106Z"\n    },\n    {\n      "schedule_id": "e7469d51-48ee-4b2b-b99c-4adddda274f5",\n      "tenant_id": "00000000-0000-0000-0000-000000000001",\n      "scheduled_date": "2026-07-01T00:00:00Z",\n      "status": "CANCELLED",\n      "amount": "10.01",\n      "payer_key": "60502961546",\n      "payee_key": "18915914520",\n      "description": "Pagamento agendado teste",\n      "retry_count": 0,\n      "max_retries": 3,\n      "is_due": false,\n      "created_at": "2026-06-29T13:57:16.229547Z"\n    },\n    {\n      "schedule_id": "7c804ddc-6710-436b-8457-b6981ae31e0d",\n      "tenant_id": "00000000-0000-0000-0000-000000000001",\n      "scheduled_date": "2026-07-01T00:00:00Z",\n      "status": "CANCELLED",\n      "amount": "10.01",\n      "payer_key": "60502961546",\n      "payee_key": "18915914520",\n      "description": "Pagamento agendado teste",\n      "retry_count": 0,\n      "max_retries": 3,\n      "is_due": false,\n      "created_at": "2026-06-29T04:46:56.464242Z"\n    },\n    {\n      "schedule_id": "ca7d4834-6909-4169-81d8-75ef9195690c",\n      "tenant_id": "00000000-0000-0000-0000-000000000001",\n      "scheduled_date": "2026-07-01T00:00:00Z",\n      "status": "CANCELLED",\n      "amount": "10.01",\n      "payer_key": "60502961546",\n      "payee_key": "18915914520",\n      "description": "Pagamento agendado teste",\n      "retry_count": 0,\n      "max_retries": 3,\n      "is_due": false,\n      "created_at": "2026-06-29T12:49:43.595631Z"\n    },\n    {\n      "schedule_id": "f45a57b2-298c-4f7b-aab2-f9e055701167",\n      "tenant_id": "00000000-0000-0000-0000-000000000001",\n      "scheduled_date": "2026-07-01T00:00:00Z",\n      "status": "EXPIRED",\n      "amount": "10.01",\n      "payer_key": "60502961546",\n      "payee_key": "18915914520",\n      "description": "Pagamento agendado teste",\n      "retry_count": 3,\n      "max_retries": 3,\n      "is_due": false,\n      "created_at": "2026-06-29T04:27:06.183438Z"\n    },\n    {\n      "schedule_id": "d977720c-74d9-41f2-bca4-5c6f7e1f4efd",\n      "tenant_id": "00000000-0000-0000-0000-000000000001",\n      "scheduled_date": "2026-07-01T00:00:00Z",\n      "status": "EXPIRED",\n      "amount": "10.01",\n      "payer_key": "60502961546",\n      "payee_key": "18915914520",\n      "description": "teste",\n      "retry_count": 3,\n      "max_retries": 3,\n      "is_due": false,\n      "created_at": "2026-06-22T20:02:24.536157Z"\n    },\n    {\n      "schedule_id": "8712320d-f159-4917-9c63-f8ec2900f0cf",\n      "tenant_id": "00000000-0000-0000-0000-000000000001",\n      "scheduled_date": "2026-07-01T00:00:00Z",\n      "status": "EXPIRED",\n      "amount": "10.01",\n      "payer_key": "60502961546",\n      "payee_key": "18915914520",\n      "description": "Pagamento agendado teste",\n      "retry_count": 3,\n      "max_retries": 3,\n      "is_due": false,\n      "created_at": "2026-06-29T04:13:43.523214Z"\n    },\n    {\n      "schedule_id": "0b6c7643-f0e8-44e8-bf36-75490bc97f91",\n      "tenant_id": "00000000-0000-0000-0000-000000000001",\n      "scheduled_date": "2026-07-01T00:00:00Z",\n      "status": "CANCELLED",\n      "amount": "10.01",\n      "payer_key": "60502961546",\n      "payee_key": "18915914520",\n      "description": "Pagamento agendado teste",\n      "retry_count": 0,\n      "max_retries": 3,\n      "is_due": false,\n      "created_at": "2026-06-29T04:47:34.813766Z"\n    },\n    {\n      "schedule_id": "dd6ff724-1157-4010-8a1f-d6e28eef6ef1",\n      "tenant_id": "00000000-0000-0000-0000-000000000001",\n      "scheduled_date": "2026-07-01T00:00:00Z",\n      "status": "EXPIRED",\n      "amount": "10.01",\n      "payer_key": "60502961546",\n      "payee_key": "18915914520",\n      "description": "Pagamento agendado teste",\n      "retry_count": 3,\n      "max_retries": 3,\n      "is_due": false,\n      "created_at": "2026-06-29T04:32:08.013583Z"\n    },\n    {\n      "schedule_id": "45307341-845e-4e16-b6a0-9a35ca768a4d",\n      "tenant_id": "00000000-0000-0000-0000-000000000001",\n      "scheduled_date": "2026-07-01T00:00:00Z",\n      "status": "CANCELLED",\n      "amount": "10.01",\n      "payer_key": "60502961546",\n      "payee_key": "18915914520",\n      "description": "Pagamento agendado teste",\n      "retry_count": 2,\n      "max_retries": 3,\n      "is_due": false,\n      "created_at": "2026-06-29T04:38:30.148287Z"\n    },\n    {\n      "schedule_id": "4bd5b2bd-c960-426f-8e6b-d594e73fe883",\n      "tenant_id": "00000000-0000-0000-0000-000000000001",\n      "transaction_id": "b7d5d0da-e042-445c-b360-29076a657c1d",\n      "scheduled_date": "2026-07-17T00:00:00Z",\n      "status": "EXECUTED",\n      "amount": "50",\n      "payer_key": "alison@example.com",\n      "payee_key": "recebedor@example.com",\n      "description": "Transferência agendada via Temenos",\n      "retry_count": 0,\n      "max_retries": 3,\n      "is_due": false,\n      "created_at": "2026-07-15T19:03:18.395185Z",\n      "executed_at": "2026-07-17T00:00:30.641502Z"\n    },\n    {\n      "schedule_id": "7ae8897a-ff8c-4212-8bbd-769cd230ad9d",\n      "tenant_id": "00000000-0000-0000-0000-000000000001",\n      "transaction_id": "480fcd8c-efb0-4cc1-a3ab-75ea4ca12835",\n      "scheduled_date": "2026-07-17T00:00:00Z",\n      "status": "EXECUTED",\n      "amount": "50",\n      "payer_key": "alison@example.com",\n      "payee_key": "recebedor@example.com",\n      "description": "Transferência agendada via Temenos",\n      "retry_count": 0,\n      "max_retries": 3,\n      "is_due": false,\n      "created_at": "2026-07-15T20:27:28.304305Z",\n      "executed_at": "2026-07-17T00:00:32.271902Z"\n    },\n    {\n      "schedule_id": "a4d4c5d9-de60-4a74-b716-a1dba0ae5c01",\n      "tenant_id": "00000000-0000-0000-0000-000000000001",\n      "transaction_id": "3c08c6e5-cca0-45ac-b40f-714ad5c6916e",\n      "scheduled_date": "2026-07-17T00:00:00Z",\n      "status": "EXECUTED",\n      "amount": "10.5",\n      "payer_key": "alison@example.com",\n      "payee_key": "varejista@example.com",\n      "description": "Compra com troco agendada via Temenos",\n      "retry_count": 0,\n      "max_retries": 3,\n      "is_due": false,\n      "created_at": "2026-07-15T20:27:28.564186Z",\n      "executed_at": "2026-07-17T00:00:33.12495Z"\n    },\n    {\n      "schedule_id": "0eb02a67-8434-41ab-9f24-b7075a719c25",\n      "tenant_id": "00000000-0000-0000-0000-000000000001",\n      "scheduled_date": "2026-07-17T00:00:00Z",\n      "status": "EXPIRED",\n      "amount": "50",\n      "payer_key": "alison@example.com",\n      "payee_key": "agente@example.com",\n      "description": "Saque agendado via Temenos",\n      "retry_count": 3,\n      "max_retries": 3,\n      "is_due": false,\n      "created_at": "2026-07-15T19:03:59.379552Z"\n    },\n    {\n      "schedule_id": "93e91bfa-1eb8-424d-8f4e-6e20d03fb8c5",\n      "tenant_id": "00000000-0000-0000-0000-000000000001",\n      "scheduled_date": "2026-07-17T00:00:00Z",\n      "status": "EXPIRED",\n      "amount": "50",\n      "payer_key": "alison@example.com",\n      "payee_key": "agente@example.com",\n      "description": "Saque agendado via Temenos",\n      "retry_count": 3,\n      "max_retries": 3,\n      "is_due": false,\n      "created_at": "2026-07-15T20:27:28.477454Z"\n    },\n    {\n      "schedule_id": "249e919c-e53c-4709-978b-7f47c4087ca7",\n      "tenant_id": "00000000-0000-0000-0000-000000000001",\n      "scheduled_date": "2026-07-17T00:00:00Z",\n      "status": "CANCELLED",\n      "amount": "10.5",\n      "payer_key": "alison@example.com",\n      "payee_key": "varejista@example.com",\n      "description": "Compra com troco agendada via Temenos",\n      "retry_count": 0,\n      "max_retries": 3,\n      "is_due": false,\n      "created_at": "2026-07-15T19:10:45.946833Z"\n    },\n    {\n      "schedule_id": "94c4ba01-f498-4551-a6c5-c0568c875e5b",\n      "tenant_id": "00000000-0000-0000-0000-000000000001",\n      "transaction_id": "609e6788-9cb9-4d3d-a2c4-90652a16c934",\n      "scheduled_date": "2026-07-17T00:00:00Z",\n      "status": "EXECUTED",\n      "amount": "1",\n      "payer_key": "alison@example.com",\n      "payee_key": "elinaldo@example.com",\n      "description": "agendado intra PF smoke",\n      "retry_count": 0,\n      "max_retries": 3,\n      "is_due": false,\n      "created_at": "2026-07-14T23:44:29.2128Z",\n      "executed_at": "2026-07-17T00:00:29.782477Z"\n    }\n  ],\n  "total": 20,\n  "limit": 20,\n  "offset": 0\n}',
          },
        ],
      },
      {
        method: 'GET',
        path: '/v1/pix/scheduled/{scheduleId}',
        summary: 'GET /v1/pix/scheduled/{schedule_id}  (consultar)',
        tags: [
          'PIX Agendado',
          '2. Facade paymentOS (/v1/pix/scheduled)  [/v1 pode 404 no gateway]',
        ],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "schedule_id": "4622e2b2-6a6b-4acd-b8e5-ef932c2c7ac8",\n  "tenant_id": "00000000-0000-0000-0000-000000000001",\n  "scheduled_date": "2026-06-15T00:00:00Z",\n  "status": "CANCELLED",\n  "amount": "15",\n  "payer_key": "79048471249",\n  "payee_key": "+5598984690450",\n  "description": "E2E scope test",\n  "retry_count": 3,\n  "max_retries": 3,\n  "is_due": false,\n  "created_at": "2026-06-03T01:27:57.63193Z",\n  "last_failure_code": "submit_failed",\n  "last_failure_detail": "DICT key lookup: jdpi: resource not found (404) method=GET url=https://basa-api.hml.jdpsti.com.br/chave-gestao-api/jdpi/dict/api/v2/chave/%2B5598984690450 status=404 section=dict operation=get_entry response_body={\\"codigo\\":\\"NotFound\\",\\"idCorrelacao\\":\\"A20260814192533667049029790A8BCE\\",\\"mensagem\\":\\"Entidade não encontrada.\\"}",\n  "last_failure_at": "2026-08-14T22:25:33.576962Z"\n}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/pix/scheduled/{scheduleId}/execute',
        summary: 'POST /v1/pix/scheduled/{id}/execute  (executar UM)',
        tags: [
          'PIX Agendado',
          '2. Facade paymentOS (/v1/pix/scheduled)  [/v1 pode 404 no gateway]',
        ],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
        requestBody: '{}',
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "ScheduleID": "4622e2b2-6a6b-4acd-b8e5-ef932c2c7ac8",\n  "Status": "EXPIRED",\n  "TransactionID": null,\n  "ExecutedAt": "0001-01-01T00:00:00Z",\n  "Error": "DICT key lookup: jdpi: resource not found (404) method=GET url=https://basa-api.hml.jdpsti.com.br/chave-gestao-api/jdpi/dict/api/v2/chave/%2B5598984690450 status=404 section=dict operation=get_entry response_body={\\"codigo\\":\\"NotFound\\",\\"idCorrelacao\\":\\"A20260814194726453049029792EEAFF\\",\\"mensagem\\":\\"Entidade não encontrada.\\"}"\n}',
          },
        ],
      },
      {
        method: 'DELETE',
        path: '/v1/pix/scheduled/{scheduleId}',
        summary: 'DELETE /v1/pix/scheduled/{schedule_id}  (cancelar)',
        tags: [
          'PIX Agendado',
          '2. Facade paymentOS (/v1/pix/scheduled)  [/v1 pode 404 no gateway]',
        ],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
          },
        ],
        responses: [
          {
            statusCode: '409',
            description: 'Conflict',
            example:
              '{\n  "type": "/errors/PIX_CANCEL_WINDOW_CLOSED",\n  "title": "Conflict",\n  "status": 409,\n  "detail": "cancel is allowed until 23h59 of the day before the scheduled date",\n  "instance": "/v1/pix/scheduled/4622e2b2-6a6b-4acd-b8e5-ef932c2c7ac8",\n  "code": "PIX_CANCEL_WINDOW_CLOSED"\n}',
          },
        ],
      },
    ],
  },
  {
    title: '1. Crédito inbound (/jdpi/webhook/credito)',
    baseUrl: 'https://uat.corebanxapp.com.br/paymentos',
    partner: 'Corebanx',
    description:
      'Webhook de crédito inbound (/jdpi/webhook/credito), simulando o recebimento de créditos PIX de terceiros na conta do cliente.',
    endpoints: [
      {
        method: 'POST',
        path: '/jdpi/webhook/credito/validar',
        summary: 'POST /credito/validar  (9.3.1)',
        description: 'Validação síncrona de crédito a receber (pré-registro).',
        tags: ['1. Crédito inbound (/jdpi/webhook/credito)'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Chave-Idempotencia',
            in: 'header',
            required: true,
            type: 'string',
            description: '{{endToEndId}}',
          },
        ],
        requestBody:
          '{\n  "endToEndId": "{{endToEndId}}",\n  "vlrPagamento": "1.00",\n  "ispbPspPagador": "60701190",\n  "ispbPspRecebedor": "04902979",\n  "cpfCnpjPagador": "11111111111",\n  "nomePagador": "PAGADOR TESTE",\n  "nrAgencia": "0201",\n  "nrConta": "{{contaDestinoIntra}}",\n  "tpConta": 0,\n  "cpfCnpjRecebedor": "79048471249",\n  "dtHrPagamento": "{{$isoTimestamp}}"\n}',
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "resultado": 1,\n  "dtHrValidacao": "2026-08-14T22:47:26.879Z"\n}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/jdpi/webhook/credito',
        summary: 'POST /credito  (registrar — 9.3.2)',
        description:
          'Registro do crédito efetivado (claim-before-credit / idempotência).',
        tags: ['1. Crédito inbound (/jdpi/webhook/credito)'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Chave-Idempotencia',
            in: 'header',
            required: true,
            type: 'string',
            description: '{{endToEndId}}',
          },
        ],
        requestBody:
          '{\n  "idReqJdPi": "REQ-{{$guid}}",\n  "endToEndId": "{{endToEndId}}",\n  "pagador": {\n    "ispb": "60701190",\n    "tpPessoa": 0,\n    "cpfCnpj": "11111111111",\n    "nrAgencia": "0001",\n    "tpConta": 0,\n    "nrConta": "123456",\n    "nome": "PAGADOR TESTE"\n  },\n  "recebedor": {\n    "ispb": "04902979",\n    "tpPessoa": 0,\n    "cpfCnpj": "79048471249",\n    "nrAgencia": "0201",\n    "tpConta": 0,\n    "nrConta": "{{contaDestinoIntra}}",\n    "nome": "BENEFICIARIO BASA UAT"\n  },\n  "dtHrOp": "{{$isoTimestamp}}",\n  "dtHrLiquidacao": "{{$isoTimestamp}}",\n  "valor": 1.0\n}',
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "dtHrCreditoSgct": "2026-08-14T22:47:36.004Z",\n  "idCreditoSgct": "PI2622609JQVTQ0P",\n  "idReqJdPi": "REQ-138c8f9e-dff8-4ada-b0f9-cefbb753564e"\n}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/jdpi/webhook/credito/devolucao',
        summary: 'POST /credito/devolucao  (return — 9.3.3)',
        description:
          'Crédito de DEVOLUÇÃO recebido → dispara HandleReturnCredit (credita pagador original).',
        tags: ['1. Crédito inbound (/jdpi/webhook/credito)'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Chave-Idempotencia',
            in: 'header',
            required: true,
            type: 'string',
            description: '{{endToEndId}}',
          },
        ],
        requestBody:
          '{\n  "endToEndIdOriginal": "{{endToEndId}}",\n  "endToEndIdDevolucao": "D04902979202606222000ABCDEF12345",\n  "vlrDevolucao": "10.01",\n  "codigoDevolucao": "MD06",\n  "dtHrCredito": "2026-06-22T20:05:00Z"\n}',
        responses: [
          {
            statusCode: '502',
            description: 'Bad Gateway',
            example:
              '{\n  "codigo": "JDPI0502",\n  "mensagem": "core return credit not confirmed: dispatch BANKLINK_PIX: banklink validateCredit returned 200: {\\"resultado\\":0,\\"motivo\\":\\"CH11\\",\\"dtHrValidacao\\":\\"2026-08-14T19:47:36.745\\"}"\n}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/jdpi/webhook/credito/validar/async',
        summary: 'POST /credito/validar/async  (9.3.4)',
        tags: ['1. Crédito inbound (/jdpi/webhook/credito)'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Chave-Idempotencia',
            in: 'header',
            required: true,
            type: 'string',
            description: '{{endToEndId}}',
          },
        ],
        requestBody:
          '{\n  "endToEndId": "{{endToEndId}}",\n  "vlrPagamento": "10.01",\n  "ispbPspPagador": "08357240"\n}',
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example: '{\n  "validacoes": []\n}',
          },
        ],
      },
    ],
  },
  {
    title: 'TED (Transact) — VALIDADO',
    baseUrl: 'https://uat.corebanxapp.com.br/paymentos',
    partner: 'Corebanx',
    description:
      'Fluxos de TED (interbancário e intra) validados diretamente no Transact (BASA).',
    endpoints: [
      {
        method: 'POST',
        path: '/v1/ted',
        summary: 'POST /v1/ted  INTERBANCARIO (TEDOUTBASA -> STR/cabine)',
        description:
          'Origem e destino em ISPBs diferentes: posta ordem TEDOUTBASA no core e envia STR0008 pela cabine JD. Fica SUBMITTED ate a volta R1/R2 do BACEN (que hoje nao retorna no UAT). Requer conta de origem provisionada no Transact.',
        tags: ['TED (Transact) — VALIDADO'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'X-Tenant-Org-ID',
            in: 'header',
            required: true,
            type: 'string',
            description: '{{tenantOrgId}}',
          },
        ],
        requestBody:
          '{\n  "order_id": "{{$guid}}",\n  "amount": "1.00",\n  "currency": "BRL",\n  "source_ispb": "04902979",\n  "source_branch": "0201",\n  "source_account": "{{contaOrigem}}",\n  "source_account_type": "CC",\n  "source_document": "{{docOrigem}}",\n  "source_name": "PAGADOR TESTE UAT",\n  "dest_ispb": "20155248",\n  "dest_branch": "0001",\n  "dest_account": "1011",\n  "dest_account_type": "CC",\n  "dest_document": "01193515289",\n  "dest_name": "Jose Rodrigues da Costa Neto",\n  "description": "TED interbancario teste cabine JD"\n}',
        responses: [
          {
            statusCode: '201',
            description: 'Created',
            example:
              '{\n  "TransactionID": "4b4b2a14-f5b7-4503-845c-e40039b44a80",\n  "OrderID": "36c8af97-a80d-4081-9229-d3e402cedcd0",\n  "TemenosPaymentOrderID": "PI262260YT0VVM2S",\n  "STRMessageID": "4b4b2a14f5b74503845c",\n  "SITRAFRef": "SITRAF-4b4b2a14-1786747657141824559",\n  "SettlementRoute": "SITRAF",\n  "SubmittedAt": "2026-08-14T22:47:38.999527378Z",\n  "Validated": false\n}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/ted',
        summary: 'POST /v1/ted  INTRA mesmo-ISPB (TEDIN -> core 999)  ✅',
        description:
          'Origem e destino no mesmo ISPB (04902979). Com TEMENOS_TED_INTRA_ENABLED=true, liquida como TEDIN dentro do core (debita origem, credita beneficiario) — status SETTLED / route INTRA, NAO vai pro STR. Validado UAT 2026-08-14: currentStatus Complete / 999 / ACSC (ordem PI262260YK5QGZHN).',
        tags: ['TED (Transact) — VALIDADO'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'X-Tenant-Org-ID',
            in: 'header',
            required: true,
            type: 'string',
            description: '{{tenantOrgId}}',
          },
        ],
        requestBody:
          '{\n  "order_id": "{{$guid}}",\n  "amount": "1.00",\n  "currency": "BRL",\n  "source_ispb": "04902979",\n  "source_branch": "0201",\n  "source_account": "{{contaOrigem}}",\n  "source_account_type": "CC",\n  "source_document": "{{docOrigem}}",\n  "source_name": "PAGADOR TESTE UAT",\n  "dest_ispb": "04902979",\n  "dest_branch": "0201",\n  "dest_account": "{{contaDestinoIntra}}",\n  "dest_account_type": "CC",\n  "dest_document": "79048471249",\n  "dest_name": "BENEFICIARIO BASA UAT",\n  "description": "TED intra teste",\n  "beneficiary_account_id": "{{contaDestinoIntra}}"\n}',
        responses: [
          {
            statusCode: '201',
            description: 'Created',
            example:
              '{\n  "TransactionID": "27092dcf-943c-48c5-b94a-f3b8ef9bd974",\n  "OrderID": "a72bd272-1524-4c57-9298-feaef08695e9",\n  "TemenosPaymentOrderID": "PI262260Z04JJFHK",\n  "STRMessageID": "",\n  "SITRAFRef": "",\n  "SettlementRoute": "INTRA",\n  "SubmittedAt": "2026-08-14T22:47:48.608285126Z",\n  "Validated": false\n}',
          },
        ],
      },
      {
        method: 'GET',
        path: '/v1/ted/{tedTxId}',
        summary: 'GET /v1/ted/{id}  (status)',
        description:
          'Consulta o TED por transaction_id. Intra -> status SETTLED, route INTRA. Interbancario -> SUBMITTED.',
        tags: ['TED (Transact) — VALIDADO'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
          },
          {
            name: 'X-Tenant-Org-ID',
            in: 'header',
            required: true,
            type: 'string',
            description: '{{tenantOrgId}}',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "transaction_id": "27092dcf-943c-48c5-b94a-f3b8ef9bd974",\n  "order_id": "a72bd272-1524-4c57-9298-feaef08695e9",\n  "status": "SETTLED",\n  "settlement_route": "INTRA",\n  "amount": "1",\n  "currency": "BRL",\n  "source_ispb": "04902979",\n  "dest_ispb": "04902979",\n  "str_message_id": "PI262260Z04JJFHK",\n  "submitted_at": "2026-08-14T22:47:48.608285Z",\n  "settled_at": "2026-08-14T22:47:48.608285Z",\n  "created_at": "2026-08-14T22:47:39.159262Z"\n}',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/ted/scheduled',
        summary: 'POST /v1/ted/scheduled  (agendar)',
        description:
          'Agenda um TED interbancario para dataFutura (YYYY-MM-DD ou RFC3339 com offset).',
        tags: ['TED (Transact) — VALIDADO'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'X-Tenant-Org-ID',
            in: 'header',
            required: true,
            type: 'string',
            description: '{{tenantOrgId}}',
          },
        ],
        requestBody:
          '{\n  "order_id": "{{$guid}}",\n  "amount": "1.00",\n  "currency": "BRL",\n  "scheduled_date": "{{dataFutura}}",\n  "source_ispb": "04902979",\n  "source_branch": "0201",\n  "source_account": "{{contaOrigem}}",\n  "source_account_type": "CC",\n  "source_document": "{{docOrigem}}",\n  "source_name": "PAGADOR TESTE UAT",\n  "dest_ispb": "20155248",\n  "dest_branch": "0001",\n  "dest_account": "1011",\n  "dest_account_type": "CC",\n  "dest_document": "01193515289",\n  "dest_name": "Jose Rodrigues da Costa Neto",\n  "description": "TED agendado teste"\n}',
        responses: [
          {
            statusCode: '422',
            description: 'unknown',
            example:
              '{\n  "type": "/errors/TED_SCHEDULE_FAILED",\n  "title": "Unprocessable Entity",\n  "status": 422,\n  "detail": "an internal error occurred",\n  "instance": "/v1/ted/scheduled",\n  "code": "TED_SCHEDULE_FAILED"\n}',
          },
        ],
      },
    ],
  },
  {
    title: 'Status no Transact (999 Complete)',
    baseUrl: 'https://uat.corebanxapp.com.br/paymentos',
    partner: 'Corebanx',
    description:
      'Consulta do status de uma ordem de pagamento no Transact, incluindo o status terminal 999 (Complete).',
    endpoints: [
      {
        method: 'GET',
        path: '/jdpi/spi/op/temenos-status/{paymentOrderId}',
        summary: 'GET /op/temenos-status/{paymentOrderId}  ✅',
        description:
          "Le o desfecho de UMA ordem no Transact: currentStatus (Complete/Placed/...), additionalDetail ('999 Payment Completed'), paymentStatus (ACSC), outcome, settled, e o corpo completo (debits/credits/produto). Use o paymentOrderId (PI...) retornado pelos POSTs de pixout/ted intra. Requer token.",
        tags: ['Status no Transact (999 Complete)'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token OAuth2 obtido via Auth - Token (client_credentials). Herdado da configuração da collection.',
          },
          {
            name: 'X-Tenant-Org-ID',
            in: 'header',
            required: true,
            type: 'string',
            description: '{{tenantOrgId}}',
          },
        ],
        responses: [
          {
            statusCode: '200',
            description: 'OK',
            example:
              '{\n  "additionalDetail": "999 Payment Completed",\n  "currentStatus": "Complete",\n  "outcome": "completed",\n  "paymentOrderId": "PI262260Z04JJFHK",\n  "rail": "temenos",\n  "settled": true,\n  "temenos": {\n    "header": {\n      "audit": {\n        "T24_time": 319,\n        "responseParse_time": 7,\n        "requestParse_time": 0\n      },\n      "page_start": 1,\n      "page_token": "202608143620282069.01,99",\n      "total_size": 1,\n      "page_size": 99,\n      "status": "success"\n    },\n    "body": [\n      {\n        "country": "BR",\n        "debtorAgent": "Banco da Amazonia",\n        "debtorOtherId": "33402119811",\n        "executionDate": "2026-08-14",\n        "orderingCustomerName": "PAGADOR TESTE UAT",\n        "orderingCustomerId": "1000000090",\n        "credits": [\n          {\n            "creditAccountName": "aline do socorro furtado da silva",\n            "creditAccountId": "1000000813"\n          }\n        ],\n        "paymentOrderId": "PI262260Z04JJFHK",\n        "submitOrder": "YES",\n        "paymentStatus": "ACSC",\n        "debtorOtherIdType": "PRIVATE",\n        "orderingCustomerStreetName": "Travessa Benjamim Constant , 990",\n        "amount": 1,\n        "narratives": [\n          {\n            "narrative": "TEDIN Debit Transfer"\n          },\n          {\n            "narrative": "TEDIN Credit Transfer"\n          }\n        ],\n        "systemId": "BNK26226HKLJJGGL",\n        "GPICreditValueDate": "BNK26226HKLJJGGL",\n        "orderInitiationType": "TEDIN",\n        "debits": [\n          {\n            "debitCurrency": "BRL",\n            "accountName": "Leonardo Patricio Ferreira Barbosa",\n            "debitAccountId": "1000000837",\n            "totalDebitAmount": 1\n          }\n        ],\n        "currentStatus": "Complete",\n        "orderingPostAddrLine": [\n          {\n            "debtorAddress": "Travessa Benjamim Constant , 990"\n          },\n          {\n            "debtorAddress": "Belém"\n          },\n          {\n            "debtorAddress": "66053040"\n          },\n          {\n            "debtorAddress": "PA"\n          }\n        ],\n        "endToEndReference": "27092dcf943c48c5b94af3b8ef9bd974",\n        "additionalInformations": [\n          {\n            "additionalInformation": "TEDIN ted intra"\n          }\n        ],\n        "rejectReasonCode": "Narrative Narrativa",\n        "versionNumber": "2",\n        "paymentCurrencyId": "BRL",\n        "additionalDetail": "999 Payment Completed",\n        "orderingPartyCity": "Belém",\n        "paymentMethod": "TRF",\n        "debtorPostCode": "66053040",\n        "creditCurrency": "BRL",\n        "debtorCountrySubDivision": "PA",\n        "paymentOrderProductId": "TEDIN",\n        "currencyMarket": "1",\n        "customerOrBankTransfer": "CUSTOMER"\n      }\n    ]\n  }\n}',
          },
        ],
      },
    ],
  },
];
