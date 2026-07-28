import type { ApiData } from '@/types/api';

export const transferApis: ApiData = {
  title: 'PaymentOS - Transfers (PIX & TED)',
  description:
    'Fluxos de transferências imediatas e agendadas validados no core bancário Temenos.',
  endpoints: [
    {
      method: 'POST',
      path: '/v1/pix/scheduled',
      summary: 'Agendar PIX',
      description:
        'Reserva a ordem PIXFUTBA no Transact em D-n. Sem o bloco pixout o agendamento é criado mas NÃO reserva saldo no core. Datas de fim de semana são ajustadas para o próximo dia útil.',
      parameters: [
        {
          name: 'Content-Type',
          in: 'header',
          required: true,
          type: 'string',
        },
      ],
      requestBody:
        '{\n  "payer_key": "50303171000168",\n  "payee_key": "79048471249",\n  "amount": "67.68",\n  "scheduled_date": "2026-08-01",\n  "description": "PIXFUTBA agendado SQA",\n  "pixout": {\n    "pagador": {\n      "ispb": "04902979",\n      "tpPessoa": 0,\n      "cpfCnpj": "12345678901",\n      "nome": "ORIGEM BASA",\n      "nrAgencia": "201",\n      "tpConta": 0,\n      "nrConta": "1000001003"\n    },\n    "recebedor": {\n      "ispb": "60701190",\n      "tpPessoa": 0,\n      "cpfCnpj": "79048471249",\n      "nome": "BENEF",\n      "nrAgencia": "0001",\n      "tpConta": 0,\n      "nrConta": "12345"\n    },\n    "finalidade": 0,\n    "tpIniciacao": 0,\n    "ispbPss": "",\n    "chave": "79048471249",\n    "orderingCustomerId": "1000000775",\n    "beneficiaryAccountId": "1000005939"\n  }\n}',
      responses: [
        {
          statusCode: '201',
          description: 'Agendamento PIX criado com status SCHEDULED',
        },
      ],
      tags: ['Corebanx', 'Pix Agendado'],
    },
    {
      method: 'GET',
      path: '/v1/pix/scheduled/{pixScheduleId}',
      summary: 'Consultar PIX Agendado por ID',
      description:
        'Retorna os detalhes do agendamento, incluindo temenos_future_order_id que evidencia reserva no core.',
      parameters: [
        {
          name: 'pixScheduleId',
          in: 'path',
          required: true,
          type: 'string',
        },
      ],
      responses: [
        {
          statusCode: '200',
          description:
            'Objeto de agendamento com status, valor e datas de vencimento',
        },
      ],
      tags: ['Pix Agendado'],
    },
    {
      method: 'GET',
      path: '/v1/pix/scheduled',
      summary: 'Listar PIX Agendados',
      parameters: [
        {
          name: 'limit',
          in: 'query',
          required: false,
          type: 'number',
        },
        {
          name: 'offset',
          in: 'query',
          required: false,
          type: 'number',
        },
      ],
      responses: [
        {
          statusCode: '200',
          description:
            'Lista paginada de agendamentos PIX com status e metadados',
        },
      ],
      tags: ['Pix Agendado'],
    },
    {
      method: 'DELETE',
      path: '/v1/pix/scheduled/{pixScheduleId}',
      summary: 'Cancelar PIX Agendado',
      description: 'Cancela a ordem futura no Transact antes do vencimento.',
      parameters: [
        {
          name: 'pixScheduleId',
          in: 'path',
          required: true,
          type: 'string',
        },
      ],
      responses: [
        {
          statusCode: '200',
          description:
            'Agendamento cancelado, status atualizado para CANCELLED',
        },
      ],
      tags: ['Pix Agendado'],
    },
    {
      method: 'POST',
      path: '/v1/ted/scheduled',
      summary: 'Agendar TED',
      description:
        'Reserva ordem TEDFUTBA no Transact em D-n para liquidação futura.',
      parameters: [
        {
          name: 'Content-Type',
          in: 'header',
          required: true,
          type: 'string',
        },
      ],
      requestBody:
        '{\n  "order_id": "a7d02e85-857c-4b4b-bc7c-ce43279f2c03",\n  "scheduled_date": "2026-08-18",\n  "amount": "1500.00",\n  "currency": "BRL",\n  "source_ispb": "04902979",\n  "source_branch": "0201",\n  "source_account": "100001772",\n  "source_account_type": "CACC",\n  "source_document": "79048471249",\n  "source_name": "Alison Ricardo",\n  "dest_ispb": "30015936",\n  "dest_branch": "0001",\n  "dest_account": "12345",\n  "dest_account_type": "CACC",\n  "dest_document": "60502961546",\n  "dest_name": "R C TRINDADE",\n  "description": "TED agendado",\n  "ordering_customer_id": "1000000845",\n  "beneficiary_account_id": "BRL1401100010001"\n}',
      responses: [
        {
          statusCode: '201',
          description:
            'TED agendada com sucesso, retorna ID com status SCHEDULED',
        },
      ],
      tags: ['TED Agendado'],
    },
    {
      method: 'GET',
      path: '/v1/ted/scheduled/{tedScheduleId}',
      summary: 'Consultar TED Agendada por ID',
      parameters: [
        {
          name: 'tedScheduleId',
          in: 'path',
          required: true,
          type: 'string',
        },
      ],
      responses: [
        {
          statusCode: '200',
          description:
            'Objeto com detalhes da TED agendada, valor, data e status',
        },
      ],
      tags: ['TED Agendado'],
    },
    {
      method: 'GET',
      path: '/v1/ted/scheduled',
      summary: 'Listar TEDs Agendadas',
      parameters: [
        {
          name: 'limit',
          in: 'query',
          required: false,
          type: 'number',
        },
        {
          name: 'offset',
          in: 'query',
          required: false,
          type: 'number',
        },
      ],
      responses: [
        {
          statusCode: '200',
          description: 'Lista paginada de TEDs agendadas com status',
        },
      ],
      tags: ['TED Agendado'],
    },
    {
      method: 'DELETE',
      path: '/v1/ted/scheduled/{tedScheduleId}',
      summary: 'Cancelar TED Agendada',
      parameters: [
        {
          name: 'tedScheduleId',
          in: 'path',
          required: true,
          type: 'string',
        },
      ],
      responses: [
        {
          statusCode: '200',
          description:
            'TED agendada cancelada, status atualizado para CANCELLED',
        },
      ],
      tags: ['TED Agendado'],
    },
    {
      method: 'POST',
      path: '/v1/ted',
      summary: 'Enviar TED Imediata (Normal)',
      description:
        'Fluxo completo: bloqueio de saldo (funds held) → ordem Temenos → envio via MQ STR (SITRAF). Operações interbancárias NÃO devem usar /op/tedout.',
      parameters: [
        {
          name: 'Content-Type',
          in: 'header',
          required: true,
          type: 'string',
        },
      ],
      requestBody:
        '{\n  "order_id": "a7d02e85-857c-4b4b-bc7c-ce43279f2c03",\n  "amount": "150.00",\n  "currency": "BRL",\n  "source_ispb": "04902979",\n  "source_branch": "0007",\n  "source_account": "100000768",\n  "source_account_type": "CC",\n  "source_document": "79048471249",\n  "source_name": "Alison Ricardo",\n  "dest_ispb": "60701190",\n  "dest_branch": "0001",\n  "dest_account": "100000741",\n  "dest_account_type": "CC",\n  "dest_document": "33608308000173",\n  "dest_name": "Revenu",\n  "description": "Pagamento de servicos",\n  "via_psti": false,\n  "ordering_customer_id": "1000000428",\n  "beneficiary_account_id": "1000001003"\n}',
      responses: [
        {
          statusCode: '201',
          description:
            'TED submetida com sucesso, retorna TransactionID e SettlementRoute',
        },
      ],
      tags: ['TED Normal'],
    },
  ],
};

export const transferSpiApis: ApiData = {
  title: 'PaymentOS - Transfers (SPI: TED & PIX OUT)',
  description:
    'Operações de saída via PIX (Saque, Troco, Intra) e orquestração de TEDs interbancárias e agendadas via SPI.',
  endpoints: [
    {
      method: 'POST',
      path: '/jdpi/spi/op/pixout',
      summary: 'Ordem de Pagamento PIX (Temenos)',
      description:
        'Executa a saga Temenos: bloqueio de saldo → envio ao JDPI/BACEN → confirmação. Suporta fluxos Intra-PSP (PF), Saque e Troco.',
      parameters: [
        {
          name: 'Content-Type',
          in: 'header',
          required: true,
          type: 'string',
        },
        {
          name: 'companyId',
          in: 'header',
          required: false,
          type: 'string',
        },
        {
          name: 'channelId',
          in: 'header',
          required: false,
          type: 'string',
        },
        {
          name: 'userId',
          in: 'header',
          required: false,
          type: 'string',
        },
        {
          name: 'Chave-Idempotencia',
          in: 'header',
          required: false,
          type: 'string',
        },
      ],
      requestBody:
        '{\n  "idReqSistemaCliente": "a7d02e85-857c-4b4b-bc7c-ce43279f2c03",\n  "dtHrRequisicaoPsp": "2026-07-16T12:00:00.000Z",\n  "tpIniciacao": 0,\n  "finalidade": 0,\n  "prioridadePagamento": 0,\n  "tpPrioridadePagamento": 0,\n  "valor": 10.01,\n  "pagador": {\n    "ispb": "04902979",\n    "tpPessoa": 0,\n    "cpfCnpj": "60502961546",\n    "nome": "Pagador Teste",\n    "nrAgencia": "0201",\n    "nrConta": "1000009152",\n    "tpConta": 0\n  },\n  "recebedor": {\n    "ispb": "30015936",\n    "tpPessoa": 0,\n    "cpfCnpj": "11122233396",\n    "nome": "Recebedor Outro Banco",\n    "nrAgencia": "0001",\n    "nrConta": "1000001034",\n    "tpConta": 0\n  },\n  "orderingCustomerId": "100175",\n  "beneficiaryAccountId": "BRL1401100010001"\n}',
      responses: [
        {
          statusCode: '202',
          description:
            'Ordem aceita pelo JDPI. Retorna temenosConfirmed:true para externo ou intraPsp:true para intra-PSP',
        },
        {
          statusCode: '400',
          description:
            'Requisição inválida — ex: campo ispbPss ausente em operações de Saque',
        },
        {
          statusCode: '502',
          description:
            'Falha na criação de ordem no Temenos (comum em ambiente HML para contas PJ)',
        },
      ],
      tags: ['Corebanx', 'PIX SPI'],
    },
    {
      method: 'POST',
      path: '/jdpi/spi/op/tedout',
      summary: 'TED-out via Temenos',
      description:
        'Liquida TED intra-bancária (mesmo ISPB) diretamente via Temenos. Operações interbancárias retornam 422 e devem usar /v1/ted.',
      parameters: [
        {
          name: 'Content-Type',
          in: 'header',
          required: true,
          type: 'string',
        },
      ],
      requestBody:
        '{\n  "idReqSistemaCliente": "a7d02e85-857c-4b4b-bc7c-ce43279f2c03",\n  "dtHrRequisicaoPsp": "2026-07-07T12:00:00.000Z",\n  "tpIniciacao": 0,\n  "finalidade": 0,\n  "prioridadePagamento": 0,\n  "tpPrioridadePagamento": 0,\n  "valor": 25.55,\n  "pagador": {\n    "ispb": "04902979",\n    "tpPessoa": 0,\n    "cpfCnpj": "60502961546",\n    "nome": "Pagador Teste",\n    "nrAgencia": "0201",\n    "nrConta": "1000006242",\n    "tpConta": 0\n  },\n  "recebedor": {\n    "ispb": "04902979",\n    "tpPessoa": 1,\n    "cpfCnpj": "83584417000176",\n    "nome": "Recebedor Mesmo Banco",\n    "nrAgencia": "0201",\n    "nrConta": "1000006331",\n    "tpConta": 0\n  },\n  "orderingCustomerId": "1000000428",\n  "beneficiaryAccountId": "1000001003"\n}',
      responses: [
        {
          statusCode: '202',
          description: 'TED intra-bancária liquidada no Temenos (TEDINTIN)',
        },
        {
          statusCode: '422',
          description:
            'Operação interbancária não suportada nesta rota — utilize /v1/ted',
        },
      ],
      tags: ['TED SPI'],
    },
    {
      method: 'POST',
      path: '/v1/ted',
      summary: 'Submit TED Interbancária (Facade)',
      description:
        'Cria e envia a TED via fila MQ STR (mensagem STR0008 + poster Temenos) para liquidação interbancária.',
      parameters: [
        {
          name: 'Content-Type',
          in: 'header',
          required: true,
          type: 'string',
        },
      ],
      requestBody:
        '{\n  "order_id": "a7d02e85-857c-4b4b-bc7c-ce43279f2c03",\n  "amount": "150.00",\n  "currency": "BRL",\n  "source_ispb": "04902979",\n  "source_branch": "0007",\n  "source_account": "100000768",\n  "source_account_type": "CC",\n  "source_document": "79048471249",\n  "source_name": "Alison Ricardo",\n  "dest_ispb": "60701190",\n  "dest_branch": "0001",\n  "dest_account": "100000741",\n  "dest_account_type": "CC",\n  "dest_document": "33608308000173",\n  "dest_name": "Revenu",\n  "description": "Pagamento de servicos",\n  "via_psti": false,\n  "ordering_customer_id": "1000000428",\n  "beneficiary_account_id": "1000001003"\n}',
      responses: [
        {
          statusCode: '200',
          description:
            'TED submetida com sucesso, retorna transaction_id para rastreamento',
        },
      ],
      tags: ['TED Facade'],
    },
    {
      method: 'GET',
      path: '/v1/ted',
      summary: 'Listar TEDs',
      parameters: [
        {
          name: 'status',
          in: 'query',
          required: false,
          type: 'string',
        },
        {
          name: 'settlement_route',
          in: 'query',
          required: false,
          type: 'string',
        },
      ],
      responses: [
        {
          statusCode: '200',
          description:
            'Lista de TEDs filtradas por status e/ou rota de liquidação',
        },
      ],
      tags: ['TED Facade'],
    },
    {
      method: 'GET',
      path: '/v1/ted/{id}',
      summary: 'Consultar TED por ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          type: 'string',
        },
      ],
      responses: [
        {
          statusCode: '200',
          description:
            'Objeto com status atual, rota de liquidação e metadados da TED',
        },
      ],
      tags: ['TED Facade'],
    },
    {
      method: 'POST',
      path: '/v1/ted/{id}/approve',
      summary: 'Aprovar TED',
      description:
        'Aprova uma TED pendente de revisão, liberando-a para liquidação.',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          type: 'string',
        },
      ],
      requestBody:
        '{\n  "approver_id": "ops.alice",\n  "note": "Validated counterparty against the AML watchlist"\n}',
      responses: [
        {
          statusCode: '200',
          description: 'TED aprovada e liberada para processamento',
        },
      ],
      tags: ['TED Facade'],
    },
    {
      method: 'POST',
      path: '/v1/ted/{id}/settle',
      summary: 'Liquidar TED (Settle)',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          type: 'string',
        },
      ],
      requestBody: '{\n  "force": false\n}',
      responses: [
        {
          statusCode: '200',
          description: 'Liquidação confirmada, status atualizado para SETTLED',
        },
      ],
      tags: ['TED Facade'],
    },
    {
      method: 'POST',
      path: '/v1/ted/{id}/reverse',
      summary: 'Estornar TED',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          type: 'string',
        },
      ],
      requestBody: '{\n  "reason": "Duplicate transfer"\n}',
      responses: [
        {
          statusCode: '200',
          description: 'Estorno iniciado, status atualizado para REVERSED',
        },
      ],
      tags: ['TED Facade'],
    },
    {
      method: 'POST',
      path: '/v1/ted/reconcile',
      summary: 'Reconciliar TEDs',
      parameters: [
        {
          name: 'Content-Type',
          in: 'header',
          required: true,
          type: 'string',
        },
      ],
      requestBody:
        '{\n  "date": "2026-07-07",\n  "settlement_date": "2026-07-07"\n}',
      responses: [
        {
          statusCode: '200',
          description:
            'TEDs reconciliadas por data, retorna divergências e totais processados',
        },
      ],
      tags: ['TED Facade'],
    },
    {
      method: 'POST',
      path: '/v1/ted/receive',
      summary: 'Receber TED Inbound',
      description:
        'Registra uma TED recebida via mensagem STR0008R2 inbound para crédito na conta destino.',
      parameters: [
        {
          name: 'Content-Type',
          in: 'header',
          required: true,
          type: 'string',
        },
      ],
      requestBody:
        '{\n  "str_message_id": "STR1781885888",\n  "amount": "2500.50",\n  "currency": "BRL",\n  "source_ispb": "60701190",\n  "source_branch": "0001",\n  "source_account": "987654",\n  "source_document": "12345678901",\n  "source_name": "Carlos Oliveira",\n  "dest_ispb": "04902979",\n  "dest_branch": "0201",\n  "dest_account": "1000005939",\n  "dest_document": "79048471249",\n  "dest_name": "Alison Ricardo",\n  "description": "Transferencia recebida"\n}',
      responses: [
        {
          statusCode: '200',
          description: 'TED inbound registrada e crédito aplicado na conta',
        },
      ],
      tags: ['TED Facade'],
    },
    {
      method: 'POST',
      path: '/v1/ted/scheduled',
      summary: 'Agendar TED (SPI)',
      parameters: [
        {
          name: 'Content-Type',
          in: 'header',
          required: true,
          type: 'string',
        },
      ],
      requestBody:
        '{\n  "order_id": "a7d02e85-857c-4b4b-bc7c-ce43279f2c03",\n  "scheduled_date": "2026-08-18",\n  "amount": "1500.00",\n  "currency": "BRL",\n  "source_ispb": "04902979",\n  "source_branch": "0201",\n  "source_account": "100001772",\n  "source_account_type": "CACC",\n  "source_document": "79048471249",\n  "source_name": "Alison Ricardo",\n  "dest_ispb": "30015936",\n  "dest_branch": "0001",\n  "dest_account": "12345",\n  "dest_account_type": "CACC",\n  "dest_document": "60502961546",\n  "dest_name": "R C TRINDADE",\n  "description": "TED agendado",\n  "ordering_customer_id": "1000000845",\n  "beneficiary_account_id": "BRL1401100010001"\n}',
      responses: [
        {
          statusCode: '201',
          description: 'Agendamento de TED criado com sucesso',
        },
      ],
      tags: ['TED Agendado'],
    },
    {
      method: 'GET',
      path: '/v1/ted/scheduled',
      summary: 'Listar TEDs Agendadas (SPI)',
      responses: [
        {
          statusCode: '200',
          description:
            'Lista de TEDs agendadas com status e datas de vencimento',
        },
      ],
      tags: ['TED Agendado'],
    },
    {
      method: 'GET',
      path: '/v1/ted/scheduled/{id}',
      summary: 'Consultar TED Agendada por ID (SPI)',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          type: 'string',
        },
      ],
      responses: [
        {
          statusCode: '200',
          description:
            'Detalhes da TED agendada incluindo valor e beneficiário',
        },
      ],
      tags: ['TED Agendado'],
    },
    {
      method: 'DELETE',
      path: '/v1/ted/scheduled/{id}',
      summary: 'Cancelar TED Agendada (SPI)',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          type: 'string',
        },
      ],
      responses: [
        {
          statusCode: '200',
          description:
            'TED agendada cancelada, status atualizado para CANCELLED',
        },
      ],
      tags: ['TED Agendado'],
    },
  ],
};
