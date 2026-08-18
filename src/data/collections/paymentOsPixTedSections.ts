import type { ApiData } from '@/types/api';

export const paymentOsPixTedSections: ApiData[] = [
  {
    title: 'Autenticação — Token OAuth2 (client_credentials)',
    description:
      'Endpoint responsável por autenticar o client via OAuth2 Client Credentials Grant no Keycloak (realm ledgeros) e obter o access_token (Bearer) utilizado em todas as demais chamadas do PaymentOS. Deve ser executado antes de qualquer outro endpoint da collection.',
    baseUrl: 'https://uat.corebanxapp.com.br',
    partner: 'Corebanx',
    endpoints: [
      {
        method: 'POST',
        path: '/auth/realms/ledgeros/protocol/openid-connect/token',
        summary: 'Auth - Token (client_credentials)',
        tags: ['Autenticação'],
        parameters: [
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/x-www-form-urlencoded',
          },
          {
            name: 'grant_type',
            in: 'body',
            required: true,
            type: 'string',
            description: 'Fixo: client_credentials',
          },
          {
            name: 'client_id',
            in: 'body',
            required: true,
            type: 'string',
            description: 'Client ID OAuth2 do PaymentOS',
          },
          {
            name: 'client_secret',
            in: 'body',
            required: true,
            type: 'string',
            description: 'Client Secret OAuth2 do PaymentOS',
          },
          {
            name: 'scope',
            in: 'body',
            required: false,
            type: 'string',
            description: 'Escopos solicitados (ex.: pix:create pix:read)',
          },
        ],
        requestBody:
          'grant_type=client_credentials&client_id={{clientId}}&client_secret={{clientSecret}}&scope=pix%3Acreate%20pix%3Aread',
      },
    ],
  },
  {
    title: 'SPI op/pixout — Débito/Bloqueio de Fundos (Temenos)',
    description:
      'Conjunto de endpoints nativos JDPI (/jdpi/spi/op/*) responsáveis por criar ordens de saída PIX (pixout) no Transact/Temenos com bloqueio de fundos (funds-block), cobrindo as variações de finalidade (base, troco, saque, reembolso, devolução), tipos de iniciação (chave, QR estático, QR dinâmico) e a liquidação interna entre contas do mesmo PSP (op/interna).',
    baseUrl: 'https://uat.corebanxapp.com.br/paymentos',
    partner: 'Corebanx',
    endpoints: [
      {
        method: 'POST',
        path: '/jdpi/spi/op/pixout',
        summary: 'POST pixout BASE (finalidade 0)  -> 202',
        tags: ['PIX', 'SPI', 'Pixout'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
        ],
        requestBody:
          '{\n  "idReqSistemaCliente": "{{$guid}}",\n  "dtHrRequisicaoPsp": "{{$isoTimestamp}}",\n  "tpIniciacao": 0,\n  "finalidade": 0,\n  "prioridadePagamento": 0,\n  "tpPrioridadePagamento": 0,\n  "valor": 10.01,\n  "pagador": {\n    "ispb": "04902979",\n    "tpPessoa": 0,\n    "cpfCnpj": "60502961546",\n    "nome": "Pagador Teste",\n    "nrAgencia": "0201",\n    "nrConta": "{{contaOrigem}}",\n    "tpConta": 0\n  },\n  "recebedor": {\n    "ispb": "08357240",\n    "tpPessoa": 0,\n    "cpfCnpj": "18915914520",\n    "nome": "TESTE DE QA - CARREFOUR",\n    "nrAgencia": "0001",\n    "nrConta": "1737651",\n    "tpConta": 0\n  },\n  "orderingCustomerId": "{{ordCust}}",\n  "beneficiaryAccountId": "BRL1401100010001"\n}',
      },
      {
        method: 'POST',
        path: '/jdpi/spi/op/pixout',
        summary: 'POST pixout TROCO (finalidade 1)  -> 202',
        tags: ['PIX', 'SPI', 'Pixout'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
        ],
        requestBody:
          '{\n  "idReqSistemaCliente": "{{$guid}}",\n  "dtHrRequisicaoPsp": "{{$isoTimestamp}}",\n  "tpIniciacao": 0,\n  "finalidade": 1,\n  "modalidadeAgente": 1,\n  "prioridadePagamento": 0,\n  "tpPrioridadePagamento": 0,\n  "valor": 10.5,\n  "ispbPss": "30015936",\n  "vlrDetalhe": [\n    {\n      "tipo": 1,\n      "vlrTarifaDinheiroCompra": 8.5\n    },\n    {\n      "tipo": 0,\n      "vlrTarifaDinheiroCompra": 2\n    }\n  ],\n  "pagador": {\n    "ispb": "04902979",\n    "tpPessoa": 0,\n    "cpfCnpj": "60502961546",\n    "nome": "Pagador Teste",\n    "nrAgencia": "0201",\n    "nrConta": "{{contaOrigem}}",\n    "tpConta": 0\n  },\n  "recebedor": {\n    "ispb": "08357240",\n    "tpPessoa": 0,\n    "cpfCnpj": "18915914520",\n    "nome": "TESTE DE QA - CARREFOUR",\n    "nrAgencia": "0001",\n    "nrConta": "1737651",\n    "tpConta": 0\n  },\n  "orderingCustomerId": "{{ordCust}}",\n  "beneficiaryAccountId": "BRL1401100010001"\n}',
      },
      {
        method: 'POST',
        path: '/jdpi/spi/op/pixout',
        summary: 'POST pixout SAQUE (finalidade 2)  -> 202',
        tags: ['PIX', 'SPI', 'Pixout'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
        ],
        requestBody:
          '{\n  "idReqSistemaCliente": "{{$guid}}",\n  "dtHrRequisicaoPsp": "{{$isoTimestamp}}",\n  "tpIniciacao": 0,\n  "finalidade": 2,\n  "modalidadeAgente": 0,\n  "prioridadePagamento": 0,\n  "tpPrioridadePagamento": 0,\n  "valor": 50,\n  "ispbPss": "30015936",\n  "vlrDetalhe": [\n    {\n      "tipo": 0,\n      "vlrTarifaDinheiroCompra": 50\n    }\n  ],\n  "pagador": {\n    "ispb": "04902979",\n    "tpPessoa": 0,\n    "cpfCnpj": "60502961546",\n    "nome": "Pagador Teste",\n    "nrAgencia": "0201",\n    "nrConta": "{{contaOrigem}}",\n    "tpConta": 0\n  },\n  "recebedor": {\n    "ispb": "08357240",\n    "tpPessoa": 0,\n    "cpfCnpj": "18915914520",\n    "nome": "TESTE DE QA - CARREFOUR",\n    "nrAgencia": "0001",\n    "nrConta": "1737651",\n    "tpConta": 0\n  },\n  "orderingCustomerId": "{{ordCust}}",\n  "beneficiaryAccountId": "BRL1401100010001"\n}',
      },
      {
        method: 'POST',
        path: '/jdpi/spi/op/pixout',
        summary: 'POST pixout tpIniciacao=1 CHAVE  -> 202',
        tags: ['PIX', 'SPI', 'Pixout'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
        ],
        requestBody:
          '{\n  "idReqSistemaCliente": "{{$guid}}",\n  "dtHrRequisicaoPsp": "{{$isoTimestamp}}",\n  "prioridadePagamento": 0,\n  "tpPrioridadePagamento": 0,\n  "pagador": {\n    "ispb": "04902979",\n    "tpPessoa": 0,\n    "cpfCnpj": "60502961546",\n    "nome": "Pagador Teste",\n    "nrAgencia": "0201",\n    "nrConta": "{{contaOrigem}}",\n    "tpConta": 0\n  },\n  "recebedor": {\n    "ispb": "08357240",\n    "tpPessoa": 0,\n    "cpfCnpj": "18915914520",\n    "nome": "TESTE DE QA - CARREFOUR",\n    "nrAgencia": "0001",\n    "nrConta": "1737651",\n    "tpConta": 0\n  },\n  "orderingCustomerId": "{{ordCust}}",\n  "beneficiaryAccountId": "BRL1401100010001",\n  "tpIniciacao": 1,\n  "finalidade": 0,\n  "valor": 10.01,\n  "chave": "18915914520"\n}',
      },
      {
        method: 'POST',
        path: '/jdpi/spi/op/pixout',
        summary: 'POST pixout tpIniciacao=2 QR ESTATICO  -> 202',
        tags: ['PIX', 'SPI', 'Pixout'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
        ],
        requestBody:
          '{\n  "idReqSistemaCliente": "{{$guid}}",\n  "dtHrRequisicaoPsp": "{{$isoTimestamp}}",\n  "prioridadePagamento": 0,\n  "tpPrioridadePagamento": 0,\n  "pagador": {\n    "ispb": "04902979",\n    "tpPessoa": 0,\n    "cpfCnpj": "60502961546",\n    "nome": "Pagador Teste",\n    "nrAgencia": "0201",\n    "nrConta": "{{contaOrigem}}",\n    "tpConta": 0\n  },\n  "recebedor": {\n    "ispb": "08357240",\n    "tpPessoa": 0,\n    "cpfCnpj": "18915914520",\n    "nome": "TESTE DE QA - CARREFOUR",\n    "nrAgencia": "0001",\n    "nrConta": "1737651",\n    "tpConta": 0\n  },\n  "orderingCustomerId": "{{ordCust}}",\n  "beneficiaryAccountId": "BRL1401100010001",\n  "tpIniciacao": 2,\n  "finalidade": 0,\n  "valor": 10.01,\n  "chave": "18915914520",\n  "idConciliacaoRecebedor": "TXIDESTATICO0001"\n}',
      },
      {
        method: 'POST',
        path: '/jdpi/spi/op/pixout',
        summary: 'POST pixout tpIniciacao=3 QR DINAMICO  -> 202',
        tags: ['PIX', 'SPI', 'Pixout'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
        ],
        requestBody:
          '{\n  "idReqSistemaCliente": "{{$guid}}",\n  "dtHrRequisicaoPsp": "{{$isoTimestamp}}",\n  "prioridadePagamento": 0,\n  "tpPrioridadePagamento": 0,\n  "pagador": {\n    "ispb": "04902979",\n    "tpPessoa": 0,\n    "cpfCnpj": "60502961546",\n    "nome": "Pagador Teste",\n    "nrAgencia": "0201",\n    "nrConta": "{{contaOrigem}}",\n    "tpConta": 0\n  },\n  "recebedor": {\n    "ispb": "08357240",\n    "tpPessoa": 0,\n    "cpfCnpj": "18915914520",\n    "nome": "TESTE DE QA - CARREFOUR",\n    "nrAgencia": "0001",\n    "nrConta": "1737651",\n    "tpConta": 0\n  },\n  "orderingCustomerId": "{{ordCust}}",\n  "beneficiaryAccountId": "BRL1401100010001",\n  "tpIniciacao": 3,\n  "finalidade": 0,\n  "valor": 10.01,\n  "chave": "18915914520",\n  "idConciliacaoRecebedor": "TXIDDINAMICOUAT0001ABCDEFGH"\n}',
      },
      {
        method: 'POST',
        path: '/jdpi/spi/op/pixout',
        summary: 'POST pixout finalidade=3 REEMBOLSO  -> 202',
        tags: ['PIX', 'SPI', 'Pixout'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
        ],
        requestBody:
          '{\n  "idReqSistemaCliente": "{{$guid}}",\n  "dtHrRequisicaoPsp": "{{$isoTimestamp}}",\n  "prioridadePagamento": 0,\n  "tpPrioridadePagamento": 0,\n  "pagador": {\n    "ispb": "04902979",\n    "tpPessoa": 0,\n    "cpfCnpj": "60502961546",\n    "nome": "Pagador Teste",\n    "nrAgencia": "0201",\n    "nrConta": "{{contaOrigem}}",\n    "tpConta": 0\n  },\n  "recebedor": {\n    "ispb": "08357240",\n    "tpPessoa": 0,\n    "cpfCnpj": "18915914520",\n    "nome": "TESTE DE QA - CARREFOUR",\n    "nrAgencia": "0001",\n    "nrConta": "1737651",\n    "tpConta": 0\n  },\n  "orderingCustomerId": "{{ordCust}}",\n  "beneficiaryAccountId": "BRL1401100010001",\n  "tpIniciacao": 0,\n  "finalidade": 3,\n  "valor": 10.01\n}',
      },
      {
        method: 'POST',
        path: '/jdpi/spi/op/pixout',
        summary: 'POST pixout finalidade=5 DEVOLUCAO  -> 202',
        tags: ['PIX', 'SPI', 'Pixout'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
        ],
        requestBody:
          '{\n  "idReqSistemaCliente": "{{$guid}}",\n  "dtHrRequisicaoPsp": "{{$isoTimestamp}}",\n  "prioridadePagamento": 0,\n  "tpPrioridadePagamento": 0,\n  "pagador": {\n    "ispb": "04902979",\n    "tpPessoa": 0,\n    "cpfCnpj": "60502961546",\n    "nome": "Pagador Teste",\n    "nrAgencia": "0201",\n    "nrConta": "{{contaOrigem}}",\n    "tpConta": 0\n  },\n  "recebedor": {\n    "ispb": "08357240",\n    "tpPessoa": 0,\n    "cpfCnpj": "18915914520",\n    "nome": "TESTE DE QA - CARREFOUR",\n    "nrAgencia": "0001",\n    "nrConta": "1737651",\n    "tpConta": 0\n  },\n  "orderingCustomerId": "{{ordCust}}",\n  "beneficiaryAccountId": "BRL1401100010001",\n  "tpIniciacao": 0,\n  "finalidade": 5,\n  "valor": 10.01,\n  "endToEndIdDevolucao": "D04902979202606290400ABCDEF123"\n}',
      },
      {
        method: 'POST',
        path: '/jdpi/spi/op/interna',
        summary: 'POST op/interna (liquidação interna)  -> 200',
        tags: ['PIX', 'SPI', 'Pixout'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
        ],
        requestBody:
          '{\n  "idReqSistemaCliente": "{{$guid}}",\n  "endToEndId": "E04902979202606290400ABCDEF12345",\n  "tpTransacao": 1,\n  "tpIniciacao": 1,\n  "dtHrLiquidacao": "{{$isoTimestamp}}",\n  "valor": 10.01,\n  "chave": "18915914520",\n  "pagador": {\n    "ispb": "04902979",\n    "tpPessoa": 0,\n    "cpfCnpj": "60502961546",\n    "nome": "Pagador Teste",\n    "nrAgencia": "0201",\n    "nrConta": "{{contaOrigem}}",\n    "tpConta": 0\n  },\n  "recebedor": {\n    "ispb": "30015936",\n    "tpPessoa": 0,\n    "cpfCnpj": "11122233396",\n    "nome": "Recebedor Outro Banco",\n    "nrAgencia": "0001",\n    "nrConta": "1000001034",\n    "tpConta": 0\n  }\n}',
      },
    ],
  },
  {
    title: 'PIX — Variações Tipadas de Saída (/jdpi/pix/*)',
    description:
      'Endpoints especializados que encapsulam o payload genérico do pixout em rotas dedicadas por tipo de operação PIX de saída: padrão (in-out), por chave, QR estático, QR dinâmico, cobrança com vencimento (cobv), parcelado, compra com troco e Pix Saque.',
    baseUrl: 'https://uat.corebanxapp.com.br/paymentos',
    partner: 'Corebanx',
    endpoints: [
      {
        method: 'POST',
        path: '/jdpi/pix/in-out',
        summary: 'POST /jdpi/pix/in-out  (saída padrão)',
        tags: ['PIX', 'Variações Tipadas'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
        ],
        requestBody:
          '{\n  "idReqSistemaCliente": "{{guid}}",\n  "dtHrRequisicaoPsp": "{{nowIso}}",\n  "valor": 10.01,\n  "pagador":   { "ispb": "04902979", "tpPessoa": 0, "cpfCnpj": "60502961546", "nome": "Pagador Teste", "nrAgencia": "0201", "tpConta": 0, "nrConta": "{{contaOrigem}}" },\n  "recebedor": { "ispb": "08357240", "tpPessoa": 0, "cpfCnpj": "18915914520", "nome": "TESTE DE QA - CARREFOUR", "nrAgencia": "0001", "tpConta": 0, "nrConta": "1737651" }\n}',
      },
      {
        method: 'POST',
        path: '/jdpi/pix/chave',
        summary: 'POST /jdpi/pix/chave  (saída por chave)',
        tags: ['PIX', 'Variações Tipadas'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
        ],
        requestBody:
          '{\n  "idReqSistemaCliente": "{{guid}}",\n  "dtHrRequisicaoPsp": "{{nowIso}}",\n  "valor": 10.01,\n  "chave": "18915914520",\n  "pagador":   { "ispb": "04902979", "tpPessoa": 0, "cpfCnpj": "60502961546", "nome": "Pagador Teste", "nrAgencia": "0201", "tpConta": 0, "nrConta": "{{contaOrigem}}" },\n  "recebedor": { "ispb": "08357240", "tpPessoa": 0, "cpfCnpj": "18915914520", "nome": "TESTE DE QA - CARREFOUR", "nrAgencia": "0001", "tpConta": 0, "nrConta": "1737651" }\n}',
      },
      {
        method: 'POST',
        path: '/jdpi/pix/qr-estatico',
        summary: 'POST /jdpi/pix/qr-estatico',
        tags: ['PIX', 'Variações Tipadas'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
        ],
        requestBody:
          '{\n  "idReqSistemaCliente": "{{guid}}",\n  "dtHrRequisicaoPsp": "{{nowIso}}",\n  "valor": 10.01,\n  "chave": "18915914520",\n  "idConciliacaoRecebedor": "TXIDESTATICO0001",\n  "pagador":   { "ispb": "04902979", "tpPessoa": 0, "cpfCnpj": "60502961546", "nome": "Pagador Teste", "nrAgencia": "0201", "tpConta": 0, "nrConta": "{{contaOrigem}}" },\n  "recebedor": { "ispb": "08357240", "tpPessoa": 0, "cpfCnpj": "18915914520", "nome": "TESTE DE QA - CARREFOUR", "nrAgencia": "0001", "tpConta": 0, "nrConta": "1737651" }\n}',
      },
      {
        method: 'POST',
        path: '/jdpi/pix/qr-dinamico',
        summary: 'POST /jdpi/pix/qr-dinamico',
        tags: ['PIX', 'Variações Tipadas'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
        ],
        requestBody:
          '{\n  "idReqSistemaCliente": "{{guid}}",\n  "dtHrRequisicaoPsp": "{{nowIso}}",\n  "valor": 10.01,\n  "chave": "18915914520",\n  "idConciliacaoRecebedor": "TXIDDINAMICOUAT0001ABCDEFGH",\n  "pagador": {\n    "ispb": "04902979",\n    "tpPessoa": 0,\n    "cpfCnpj": "60502961546",\n    "nome": "Pagador Teste",\n    "nrAgencia": "0201",\n    "tpConta": 0,\n    "nrConta": "{{contaOrigem}}"\n  },\n  "recebedor": {\n    "ispb": "08357240",\n    "tpPessoa": 0,\n    "cpfCnpj": "18915914520",\n    "nome": "TESTE DE QA - CARREFOUR",\n    "nrAgencia": "0001",\n    "tpConta": 0,\n    "nrConta": "1737651"\n  }\n}',
      },
      {
        method: 'POST',
        path: '/jdpi/pix/cobv',
        summary: 'POST /jdpi/pix/cobv  (cobrança c/ vencimento)',
        tags: ['PIX', 'Variações Tipadas'],
        description: 'Requer chave + idConciliacaoRecebedor (txid).',
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
        ],
        requestBody:
          '{\n  "idReqSistemaCliente": "{{guid}}",\n  "dtHrRequisicaoPsp": "{{nowIso}}",\n  "valor": 10.01,\n  "chave": "18915914520",\n  "idConciliacaoRecebedor": "TXIDCOBVUAT00000001ABCDEFGH",\n  "pagador": {\n    "ispb": "04902979",\n    "tpPessoa": 0,\n    "cpfCnpj": "60502961546",\n    "nome": "Pagador Teste",\n    "nrAgencia": "0201",\n    "tpConta": 0,\n    "nrConta": "{{contaOrigem}}"\n  },\n  "recebedor": {\n    "ispb": "08357240",\n    "tpPessoa": 0,\n    "cpfCnpj": "18915914520",\n    "nome": "TESTE DE QA - CARREFOUR",\n    "nrAgencia": "0001",\n    "tpConta": 0,\n    "nrConta": "1737651"\n  }\n}',
      },
      {
        method: 'POST',
        path: '/jdpi/pix/parcelado',
        summary: 'POST /jdpi/pix/parcelado',
        tags: ['PIX', 'Variações Tipadas'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
        ],
        requestBody:
          '{\n  "idReqSistemaCliente": "{{guid}}",\n  "dtHrRequisicaoPsp": "{{nowIso}}",\n  "valor": 10.01,\n  "pagador":   { "ispb": "04902979", "tpPessoa": 0, "cpfCnpj": "60502961546", "nome": "Pagador Teste", "nrAgencia": "0201", "tpConta": 0, "nrConta": "{{contaOrigem}}" },\n  "recebedor": { "ispb": "08357240", "tpPessoa": 0, "cpfCnpj": "18915914520", "nome": "TESTE DE QA - CARREFOUR", "nrAgencia": "0001", "tpConta": 0, "nrConta": "1737651" }\n}',
      },
      {
        method: 'POST',
        path: '/jdpi/pix/troco',
        summary: 'POST /jdpi/pix/troco  (compra + troco)',
        tags: ['PIX', 'Variações Tipadas'],
        description:
          'Saque/Troco (modalidadeAgente). vlrDetalhe é montado pelo handler a partir de valor.',
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
        ],
        requestBody:
          '{\n  "idReqSistemaCliente": "{{guid}}",\n  "dtHrRequisicaoPsp": "{{nowIso}}",\n  "valor": 50,\n  "ispbPss": "04902979",\n  "pagador": {\n    "ispb": "04902979",\n    "tpPessoa": 0,\n    "cpfCnpj": "60502961546",\n    "nome": "Pagador Teste",\n    "nrAgencia": "0201",\n    "tpConta": 0,\n    "nrConta": "{{contaOrigem}}"\n  },\n  "recebedor": {\n    "ispb": "08357240",\n    "tpPessoa": 0,\n    "cpfCnpj": "18915914520",\n    "nome": "TESTE DE QA - CARREFOUR",\n    "nrAgencia": "0001",\n    "tpConta": 0,\n    "nrConta": "1737651"\n  },\n  "valorCompra": 8.5,\n  "valorEspecie": 2\n}',
      },
      {
        method: 'POST',
        path: '/jdpi/pix/saque',
        summary: 'POST /jdpi/pix/saque  (Pix Saque)',
        tags: ['PIX', 'Variações Tipadas'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
        ],
        requestBody:
          '{\n  "idReqSistemaCliente": "{{guid}}",\n  "dtHrRequisicaoPsp": "{{nowIso}}",\n  "valor": 50.00,\n  "ispbPss": "04902979",\n  "pagador":   { "ispb": "04902979", "tpPessoa": 0, "cpfCnpj": "60502961546", "nome": "Pagador Teste", "nrAgencia": "0201", "tpConta": 0, "nrConta": "{{contaOrigem}}" },\n  "recebedor": { "ispb": "08357240", "tpPessoa": 0, "cpfCnpj": "18915914520", "nome": "TESTE DE QA - CARREFOUR", "nrAgencia": "0001", "tpConta": 0, "nrConta": "1737651" }\n}',
      },
    ],
  },
  {
    title: 'QR Code — Geração',
    description:
      'Endpoints responsáveis pela geração de QR Codes (BR Code/EMV) PIX: estático, dinâmico simples, dinâmico com cobrança e vencimento (cobv) e a assinatura JWS do cobv (registro completo e por idDocumento).',
    baseUrl: 'https://uat.corebanxapp.com.br/paymentos',
    partner: 'Corebanx',
    endpoints: [
      {
        method: 'POST',
        path: '/jdpi/qrcode/estatico/gerar',
        summary: 'POST /qrcode/estatico/gerar',
        tags: ['PIX', 'QR Code', 'Gerar'],
        description: 'formato: 0=imagem,1=payload base64,2=ambos.',
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
        ],
        requestBody:
          '{\n  "formato": 2,\n  "chave": "{{chaveNossa}}",\n  "codigoCategoria": "0000",\n  "valor": 100.5,\n  "nomeRecebedor": "Leonardo Almeida Alves",\n  "cidade": "Belem",\n  "idConciliacaoRecebedor": "TXIDESTATICO0001"\n}',
      },
      {
        method: 'POST',
        path: '/jdpi/qrcode/dinamico/gerar',
        summary: 'POST /qrcode/dinamico/gerar',
        tags: ['PIX', 'QR Code', 'Gerar'],
        description:
          'JDPI exige valorOriginal (não valor). Depende de cert JWS.',
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
        ],
        requestBody:
          '{\n  "formato": 1,\n  "chave": "{{chaveNossa}}",\n  "ispbCertificadoJws": "{{ispb}}",\n  "nomeRecebedor": "Leonardo Almeida Alves",\n  "cpfRecebedor": "{{docOrigem}}",\n  "cidade": "Belem",\n  "cep": "66053040",\n  "valorOriginal": 10.01,\n  "expiracaoQR": 3600,\n  "idConciliacaoRecebedor": "{{qrTxid}}",\n  "urlPayloadJson": "qrcode-h.basa.com.br/pix/cob/{{qrTxid}}",\n  "urlJwk": "qrcode-h.basa.com.br/pix/jwks"\n}',
      },
      {
        method: 'POST',
        path: '/jdpi/qrcode/dinamico/cobv/gerar',
        summary: 'POST /qrcode/dinamico/cobv/gerar',
        tags: ['PIX', 'QR Code', 'Gerar'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
        ],
        requestBody:
          '{\n  "formato": 1,\n  "chave": "{{chaveNossa}}",\n  "nomeRecebedor": "Leonardo Almeida Alves",\n  "cpfRecebedor": "{{docOrigem}}",\n  "logradouroRecebedor": "Av Presidente Vargas 800",\n  "cidade": "Belem",\n  "uf": "PA",\n  "cep": "66053040",\n  "valorOriginal": 25.5,\n  "valorFinal": 25.5,\n  "dtVenc": "2026-09-30",\n  "diasAposVenc": 5,\n  "idConciliacaoRecebedor": "{{cobvTxid}}",\n  "devedor": {\n    "cpf": "11144477735",\n    "nome": "Cliente Teste"\n  },\n  "urlPayloadJson": "qrcode-h.basa.com.br/pix/cobv/{{cobvTxid}}"\n}',
      },
      {
        method: 'POST',
        path: '/jdpi/qrcode/dinamico/cobv/jws',
        summary: 'POST /qrcode/dinamico/cobv/jws',
        tags: ['PIX', 'QR Code', 'Gerar'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
        ],
        requestBody:
          '{\n  "idDocumento": "{{cobvIdDoc}}",\n  "ispbCertificadoJws": "{{ispb}}",\n  "valorOriginal": 25.5,\n  "valorFinal": 25.5,\n  "urlJwk": "qrcode-h.basa.com.br/pix/jwks"\n}',
      },
      {
        method: 'POST',
        path: '/jdpi/qrcode/dinamico/cobv/jws/{cobvIdDoc}',
        summary: 'POST /qrcode/dinamico/cobv/jws/{idDocumento}',
        tags: ['PIX', 'QR Code', 'Gerar'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
          {
            name: 'cobvIdDoc',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador cobvIdDoc usado na URL',
          },
        ],
        requestBody:
          '{\n  "ispbCertificadoJws": "{{ispb}}",\n  "valorOriginal": 25.5,\n  "valorFinal": 25.5,\n  "urlJwk": "qrcode-h.basa.com.br/pix/jwks"\n}',
      },
    ],
  },
  {
    title: 'QR Code — Decodificação',
    description:
      'Endpoints responsáveis por decodificar um BR Code (payload EMV) PIX, seja pelo conteúdo bruto do QR Code (qrCodePayload) ou por uma URL de localização hospedada pelo PSP recebedor (urlPayloadJson).',
    baseUrl: 'https://uat.corebanxapp.com.br/paymentos',
    partner: 'Corebanx',
    endpoints: [
      {
        method: 'POST',
        path: '/jdpi/qrcode/decodificar',
        summary: 'POST /qrcode/decodificar  (qrCodePayload)',
        tags: ['PIX', 'QR Code', 'Decodificar'],
        description: 'BR Code (EMV) a decodificar.',
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
        ],
        requestBody:
          '{\n  "qrCodePayload": "{{qrPayloadStatic}}",\n  "qrCode": "{{qrPayloadStatic}}"\n}',
      },
      {
        method: 'POST',
        path: '/jdpi/qrcode/decodificar/url',
        summary: 'POST /qrcode/decodificar/url  (urlPayloadJson)',
        tags: ['PIX', 'QR Code', 'Decodificar'],
        description:
          "Decodifica um BR Code por URL. O host e qrcode-h.basa.com.br (payload hospedado no PSP recebedor). Requer um {{cobvToken}} REAL de uma cobranca cobv gerada — hoje bloqueado porque a JDPI homolog nao gera a location (erro 'chave ou location'). Quando o BASA ligar o hosting de QR dinamico, funciona.",
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
        ],
        requestBody:
          '{\n  "urlPayloadJson": "qrcode-h.basa.com.br/pix/cobv/{{cobvTxid}}"\n}',
      },
    ],
  },
  {
    title: 'PIX Agendado — Nativo JDPI (/jdpi/pix/agendado)',
    description:
      'Endpoint nativo JDPI para disparo (dispatch) de um PIX previamente agendado. O handler força tpIniciacao=8 e tpPrioridadePagamento=2, ignorando o campo chave. Requer registro prévio em /jdpi/pa/agendamento e que dtHrRequisicaoPsp seja o instante atual (caso contrário retorna erro ADMI.002).',
    baseUrl: 'https://uat.corebanxapp.com.br/paymentos',
    partner: 'Corebanx',
    endpoints: [
      {
        method: 'POST',
        path: '/jdpi/pix/agendado',
        summary:
          'POST /jdpi/pix/agendado  (dispatch — tpIniciacao=8, tpPrioridade=2)',
        tags: ['PIX', 'Agendado', 'Nativo JDPI'],
        description:
          'Variação Pix Agendado: handler força tpIniciacao=8 + tpPrioridadePagamento=2 e ignora `chave`. Pré-requisito: registro em /jdpi/pa/agendamento. Use dtHrRequisicaoPsp = AGORA (senão ADMI.002).',
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
        ],
        requestBody:
          '{\n  "idReqSistemaCliente": "{{guid}}",\n  "dtHrRequisicaoPsp": "{{nowIso}}",\n  "valor": 10.01,\n  "pagador":   { "ispb": "04902979", "tpPessoa": 0, "cpfCnpj": "60502961546", "nome": "Pagador Teste",       "nrAgencia": "0201", "tpConta": 0, "nrConta": "{{contaOrigem}}" },\n  "recebedor": { "ispb": "08357240", "tpPessoa": 0, "cpfCnpj": "18915914520", "nome": "TESTE DE QA - CARREFOUR", "nrAgencia": "0001", "tpConta": 0, "nrConta": "1737651" },\n  "infEntreClientes": "Pix agendado teste"\n}',
      },
    ],
  },
  {
    title: 'PIX Agendado — Facade PaymentOS (/v1/pix/scheduled)',
    description:
      'Facade de alto nível do PaymentOS para gerenciar PIX agendados: criar agendamento com bloco pixout completo (reserva a ordem PIXFUTBA no core para recebedor interbancário), listar, consultar, executar manualmente e cancelar um agendamento. Sem o bloco pixout o agendamento é apenas registrado em banco (legado) e nunca executa. Atenção: o prefixo /v1 pode retornar 404 dependendo da configuração do gateway.',
    baseUrl: 'https://uat.corebanxapp.com.br/paymentos',
    partner: 'Corebanx',
    endpoints: [
      {
        method: 'POST',
        path: '/v1/pix/scheduled',
        summary:
          'POST /v1/pix/scheduled  (agendar, COM pixout -> reserva PIXFUTBA)',
        tags: ['PIX', 'Agendado', 'Facade paymentOS'],
        description:
          'Agenda um PIX com o bloco pixout completo -> reserva a ordem PIXFUTBA no core (recebedor interbancario, ISPB != 04902979). Sem o bloco pixout vira agendamento legado DB-only que NUNCA executa. tpIniciacao=0 sem chave (identifica por conta). scheduled_date RFC3339 com offset. O booking bate no host de EXTENSAO (iris) — precisa estar de pe + conta provisionada.',
        parameters: [
          {
            name: 'X-Tenant-Org-ID',
            in: 'header',
            required: true,
            type: 'string',
            description: 'Header X-Tenant-Org-ID',
          },
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'X-Tenant-Org-ID',
            in: 'header',
            required: true,
            type: 'string',
            description: 'Identificador do Tenant/Organização no PaymentOS',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
        ],
        requestBody:
          '{\n  "payer_key": "{{docOrigem}}",\n  "payee_key": "79048471249",\n  "amount": "1.00",\n  "scheduled_date": "{{dataFutura}}T14:30:00-03:00",\n  "description": "PIXFUTBA agendado",\n  "pixout": {\n    "pagador": {\n      "ispb": "04902979",\n      "tpPessoa": 0,\n      "cpfCnpj": "{{docOrigem}}",\n      "nome": "PAGADOR TESTE UAT",\n      "nrAgencia": "0201",\n      "tpConta": 0,\n      "nrConta": "{{contaOrigem}}"\n    },\n    "recebedor": {\n      "ispb": "30015936",\n      "tpPessoa": 0,\n      "cpfCnpj": "60502961546",\n      "nome": "BENEF INTERBANCARIO",\n      "nrAgencia": "0001",\n      "tpConta": 0,\n      "nrConta": "1737651"\n    },\n    "finalidade": 0,\n    "tpIniciacao": 0,\n    "orderingCustomerId": "{{ordCust}}",\n    "beneficiaryAccountId": "BRL1401100010001"\n  }\n}',
      },
      {
        method: 'GET',
        path: '/v1/pix/scheduled',
        summary: 'GET /v1/pix/scheduled  (listar)',
        tags: ['PIX', 'Agendado', 'Facade paymentOS'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'X-Tenant-Org-ID',
            in: 'header',
            required: true,
            type: 'string',
            description: 'Identificador do Tenant/Organização no PaymentOS',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
        ],
      },
      {
        method: 'GET',
        path: '/v1/pix/scheduled/{scheduleId}',
        summary: 'GET /v1/pix/scheduled/{schedule_id}  (consultar)',
        tags: ['PIX', 'Agendado', 'Facade paymentOS'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'X-Tenant-Org-ID',
            in: 'header',
            required: true,
            type: 'string',
            description: 'Identificador do Tenant/Organização no PaymentOS',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
          {
            name: 'scheduleId',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador scheduleId usado na URL',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/pix/scheduled/{scheduleId}/execute',
        summary: 'POST /v1/pix/scheduled/{id}/execute  (executar UM)',
        tags: ['PIX', 'Agendado', 'Facade paymentOS'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'X-Tenant-Org-ID',
            in: 'header',
            required: true,
            type: 'string',
            description: 'Identificador do Tenant/Organização no PaymentOS',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
          {
            name: 'scheduleId',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador scheduleId usado na URL',
          },
        ],
        requestBody: '{}',
      },
      {
        method: 'DELETE',
        path: '/v1/pix/scheduled/{scheduleId}',
        summary: 'DELETE /v1/pix/scheduled/{schedule_id}  (cancelar)',
        tags: ['PIX', 'Agendado', 'Facade paymentOS'],
        parameters: [
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'X-Tenant-Org-ID',
            in: 'header',
            required: true,
            type: 'string',
            description: 'Identificador do Tenant/Organização no PaymentOS',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
          {
            name: 'scheduleId',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador scheduleId usado na URL',
          },
        ],
      },
    ],
  },
  {
    title: 'Crédito Inbound — Webhook (/jdpi/webhook/credito)',
    description:
      'Webhooks nativos JDPI para tratamento de créditos PIX recebidos (inbound): validação síncrona prévia (validar), registro do crédito efetivado com idempotência (claim-before-credit), crédito de devolução (aciona HandleReturnCredit para o pagador original) e validação assíncrona.',
    baseUrl: 'https://uat.corebanxapp.com.br/paymentos',
    partner: 'Corebanx',
    endpoints: [
      {
        method: 'POST',
        path: '/jdpi/webhook/credito/validar',
        summary: 'POST /credito/validar  (9.3.1)',
        tags: ['PIX', 'Crédito Inbound', 'Webhook'],
        description: 'Validação síncrona de crédito a receber (pré-registro).',
        parameters: [
          {
            name: 'Chave-Idempotencia',
            in: 'header',
            required: true,
            type: 'string',
            description: 'Header Chave-Idempotencia',
          },
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'Chave-Idempotencia',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de idempotência da requisição (normalmente o endToEndId)',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
        ],
        requestBody:
          '{\n  "endToEndId": "{{endToEndId}}",\n  "vlrPagamento": "1.00",\n  "ispbPspPagador": "60701190",\n  "ispbPspRecebedor": "04902979",\n  "cpfCnpjPagador": "11111111111",\n  "nomePagador": "PAGADOR TESTE",\n  "nrAgencia": "0201",\n  "nrConta": "{{contaDestinoIntra}}",\n  "tpConta": 0,\n  "cpfCnpjRecebedor": "79048471249",\n  "dtHrPagamento": "{{$isoTimestamp}}"\n}',
      },
      {
        method: 'POST',
        path: '/jdpi/webhook/credito',
        summary: 'POST /credito  (registrar — 9.3.2)',
        tags: ['PIX', 'Crédito Inbound', 'Webhook'],
        description:
          'Registro do crédito efetivado (claim-before-credit / idempotência).',
        parameters: [
          {
            name: 'Chave-Idempotencia',
            in: 'header',
            required: true,
            type: 'string',
            description: 'Header Chave-Idempotencia',
          },
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'Chave-Idempotencia',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de idempotência da requisição (normalmente o endToEndId)',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
        ],
        requestBody:
          '{\n  "idReqJdPi": "REQ-{{$guid}}",\n  "endToEndId": "{{endToEndId}}",\n  "pagador": {\n    "ispb": "60701190",\n    "tpPessoa": 0,\n    "cpfCnpj": "11111111111",\n    "nrAgencia": "0001",\n    "tpConta": 0,\n    "nrConta": "123456",\n    "nome": "PAGADOR TESTE"\n  },\n  "recebedor": {\n    "ispb": "04902979",\n    "tpPessoa": 0,\n    "cpfCnpj": "79048471249",\n    "nrAgencia": "0201",\n    "tpConta": 0,\n    "nrConta": "{{contaDestinoIntra}}",\n    "nome": "BENEFICIARIO BASA UAT"\n  },\n  "dtHrOp": "{{$isoTimestamp}}",\n  "dtHrLiquidacao": "{{$isoTimestamp}}",\n  "valor": 1.0\n}',
      },
      {
        method: 'POST',
        path: '/jdpi/webhook/credito/devolucao',
        summary: 'POST /credito/devolucao  (return — 9.3.3)',
        tags: ['PIX', 'Crédito Inbound', 'Webhook'],
        description:
          'Crédito de DEVOLUÇÃO recebido → dispara HandleReturnCredit (credita pagador original).',
        parameters: [
          {
            name: 'Chave-Idempotencia',
            in: 'header',
            required: true,
            type: 'string',
            description: 'Header Chave-Idempotencia',
          },
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'Chave-Idempotencia',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de idempotência da requisição (normalmente o endToEndId)',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
        ],
        requestBody:
          '{\n  "endToEndIdOriginal": "{{endToEndId}}",\n  "endToEndIdDevolucao": "D04902979202606222000ABCDEF12345",\n  "vlrDevolucao": "10.01",\n  "codigoDevolucao": "MD06",\n  "dtHrCredito": "2026-06-22T20:05:00Z"\n}',
      },
      {
        method: 'POST',
        path: '/jdpi/webhook/credito/validar/async',
        summary: 'POST /credito/validar/async  (9.3.4)',
        tags: ['PIX', 'Crédito Inbound', 'Webhook'],
        parameters: [
          {
            name: 'Chave-Idempotencia',
            in: 'header',
            required: true,
            type: 'string',
            description: 'Header Chave-Idempotencia',
          },
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'Chave-Idempotencia',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de idempotência da requisição (normalmente o endToEndId)',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
        ],
        requestBody:
          '{\n  "endToEndId": "{{endToEndId}}",\n  "vlrPagamento": "10.01",\n  "ispbPspPagador": "08357240"\n}',
      },
    ],
  },
  {
    title: 'TED (Transact) — Validado',
    description:
      'Endpoints de TED processados diretamente no Transact: criação de TED interbancário (posta ordem TEDOUTBASA e envia STR0008 via cabine JD, permanecendo SUBMITTED até retorno R1/R2 do BACEN), TED intra mesmo ISPB (liquidado internamente como TEDIN quando TEMENOS_TED_INTRA_ENABLED=true, status SETTLED/route INTRA), consulta de status por transaction_id e agendamento de TED interbancário para data futura.',
    baseUrl: 'https://uat.corebanxapp.com.br/paymentos',
    partner: 'Corebanx',
    endpoints: [
      {
        method: 'POST',
        path: '/v1/ted',
        summary: 'POST /v1/ted  INTERBANCARIO (TEDOUTBASA -> STR/cabine)',
        tags: ['TED'],
        description:
          'Origem e destino em ISPBs diferentes: posta ordem TEDOUTBASA no core e envia STR0008 pela cabine JD. Fica SUBMITTED ate a volta R1/R2 do BACEN (que hoje nao retorna no UAT). Requer conta de origem provisionada no Transact.',
        parameters: [
          {
            name: 'X-Tenant-Org-ID',
            in: 'header',
            required: true,
            type: 'string',
            description: 'Header X-Tenant-Org-ID',
          },
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'X-Tenant-Org-ID',
            in: 'header',
            required: true,
            type: 'string',
            description: 'Identificador do Tenant/Organização no PaymentOS',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
        ],
        requestBody:
          '{\n  "order_id": "{{$guid}}",\n  "amount": "1.00",\n  "currency": "BRL",\n  "source_ispb": "04902979",\n  "source_branch": "0201",\n  "source_account": "{{contaOrigem}}",\n  "source_account_type": "CC",\n  "source_document": "{{docOrigem}}",\n  "source_name": "PAGADOR TESTE UAT",\n  "dest_ispb": "20155248",\n  "dest_branch": "0001",\n  "dest_account": "1011",\n  "dest_account_type": "CC",\n  "dest_document": "01193515289",\n  "dest_name": "Jose Rodrigues da Costa Neto",\n  "description": "TED interbancario teste cabine JD"\n}',
      },
      {
        method: 'POST',
        path: '/v1/ted',
        summary: 'POST /v1/ted  INTRA mesmo-ISPB (TEDIN -> core 999)  ✅',
        tags: ['TED'],
        description:
          'Origem e destino no mesmo ISPB (04902979). Com TEMENOS_TED_INTRA_ENABLED=true, liquida como TEDIN dentro do core (debita origem, credita beneficiario) — status SETTLED / route INTRA, NAO vai pro STR. Validado UAT 2026-08-14: currentStatus Complete / 999 / ACSC (ordem PI262260YK5QGZHN).',
        parameters: [
          {
            name: 'X-Tenant-Org-ID',
            in: 'header',
            required: true,
            type: 'string',
            description: 'Header X-Tenant-Org-ID',
          },
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'X-Tenant-Org-ID',
            in: 'header',
            required: true,
            type: 'string',
            description: 'Identificador do Tenant/Organização no PaymentOS',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
        ],
        requestBody:
          '{\n  "order_id": "{{$guid}}",\n  "amount": "1.00",\n  "currency": "BRL",\n  "source_ispb": "04902979",\n  "source_branch": "0201",\n  "source_account": "{{contaOrigem}}",\n  "source_account_type": "CC",\n  "source_document": "{{docOrigem}}",\n  "source_name": "PAGADOR TESTE UAT",\n  "dest_ispb": "04902979",\n  "dest_branch": "0201",\n  "dest_account": "{{contaDestinoIntra}}",\n  "dest_account_type": "CC",\n  "dest_document": "79048471249",\n  "dest_name": "BENEFICIARIO BASA UAT",\n  "description": "TED intra teste",\n  "beneficiary_account_id": "{{contaDestinoIntra}}"\n}',
      },
      {
        method: 'GET',
        path: '/v1/ted/{tedTxId}',
        summary: 'GET /v1/ted/{id}  (status)',
        tags: ['TED'],
        description:
          'Consulta o TED por transaction_id. Intra -> status SETTLED, route INTRA. Interbancario -> SUBMITTED.',
        parameters: [
          {
            name: 'X-Tenant-Org-ID',
            in: 'header',
            required: true,
            type: 'string',
            description: 'Header X-Tenant-Org-ID',
          },
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'X-Tenant-Org-ID',
            in: 'header',
            required: true,
            type: 'string',
            description: 'Identificador do Tenant/Organização no PaymentOS',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
          {
            name: 'tedTxId',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador tedTxId usado na URL',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/ted/scheduled',
        summary: 'POST /v1/ted/scheduled  (agendar)',
        tags: ['TED'],
        description:
          'Agenda um TED interbancario para dataFutura (YYYY-MM-DD ou RFC3339 com offset).',
        parameters: [
          {
            name: 'X-Tenant-Org-ID',
            in: 'header',
            required: true,
            type: 'string',
            description: 'Header X-Tenant-Org-ID',
          },
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'X-Tenant-Org-ID',
            in: 'header',
            required: true,
            type: 'string',
            description: 'Identificador do Tenant/Organização no PaymentOS',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
        ],
        requestBody:
          '{\n  "order_id": "{{$guid}}",\n  "amount": "1.00",\n  "currency": "BRL",\n  "scheduled_date": "{{dataFutura}}",\n  "source_ispb": "04902979",\n  "source_branch": "0201",\n  "source_account": "{{contaOrigem}}",\n  "source_account_type": "CC",\n  "source_document": "{{docOrigem}}",\n  "source_name": "PAGADOR TESTE UAT",\n  "dest_ispb": "20155248",\n  "dest_branch": "0001",\n  "dest_account": "1011",\n  "dest_account_type": "CC",\n  "dest_document": "01193515289",\n  "dest_name": "Jose Rodrigues da Costa Neto",\n  "description": "TED agendado teste"\n}',
      },
    ],
  },
  {
    title: 'Status no Transact (999 Complete)',
    description:
      "Endpoint de consulta do desfecho de uma ordem de pagamento no core Transact a partir do paymentOrderId (PI...) retornado pelos POSTs de pixout ou TED intra: currentStatus (Complete/Placed/...), additionalDetail ('999 Payment Completed'), paymentStatus (ACSC), outcome, settled e o corpo completo com débitos/créditos/produto.",
    baseUrl: 'https://uat.corebanxapp.com.br/paymentos',
    partner: 'Corebanx',
    endpoints: [
      {
        method: 'GET',
        path: '/jdpi/spi/op/temenos-status/{paymentOrderId}',
        summary: 'GET /op/temenos-status/{paymentOrderId}  ✅',
        tags: ['Transact', 'Status'],
        description:
          "Le o desfecho de UMA ordem no Transact: currentStatus (Complete/Placed/...), additionalDetail ('999 Payment Completed'), paymentStatus (ACSC), outcome, settled, e o corpo completo (debits/credits/produto). Use o paymentOrderId (PI...) retornado pelos POSTs de pixout/ted intra. Requer token.",
        parameters: [
          {
            name: 'X-Tenant-Org-ID',
            in: 'header',
            required: true,
            type: 'string',
            description: 'Header X-Tenant-Org-ID',
          },
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Bearer {{token}} — token obtido no endpoint de autenticação',
          },
          {
            name: 'X-Tenant-Org-ID',
            in: 'header',
            required: true,
            type: 'string',
            description: 'Identificador do Tenant/Organização no PaymentOS',
          },
          {
            name: 'baseUrl',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador baseUrl usado na URL',
          },
          {
            name: 'paymentOrderId',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Identificador paymentOrderId usado na URL',
          },
        ],
      },
    ],
  },
];
