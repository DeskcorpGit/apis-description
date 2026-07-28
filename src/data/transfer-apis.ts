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
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
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
        { name: 'pixScheduleId', in: 'path', required: true, type: 'string' },
      ],
      responses: [
        {
          statusCode: '200',
          description: 'Objeto de agendamento com status, valor e datas de vencimento',
        },
      ],
      tags: ['Pix Agendado'],
    },
    {
      method: 'GET',
      path: '/v1/pix/scheduled',
      summary: 'Listar PIX Agendados',
      parameters: [
        { name: 'limit', in: 'query', required: false, type: 'number' },
        { name: 'offset', in: 'query', required: false, type: 'number' },
      ],
      responses: [
        {
          statusCode: '200',
          description: 'Lista paginada de agendamentos PIX com status e metadados',
        },
      ],
      tags: ['Pix Agendado'],
    },
    {
      method: 'POST',
      path: '/v1/pix/scheduled/{pixScheduleId}/execute',
      summary: 'Executar PIX Agendado Vencido',
      description:
        'Força o vencimento em D0. Roda o ciclo block → JDPI → settle imediatamente.',
      parameters: [
        { name: 'pixScheduleId', in: 'path', required: true, type: 'string' },
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [
        {
          statusCode: '200',
          description:
            'Retorna EXECUTED se liquidado com sucesso, ou SKIPPED se já processado pelo poller D0',
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
        { name: 'pixScheduleId', in: 'path', required: true, type: 'string' },
      ],
      responses: [
        { statusCode: '200', description: 'Agendamento cancelado, status atualizado para CANCELLED' },
      ],
      tags: ['Pix Agendado'],
    },
    {
      method: 'POST',
      path: '/v1/ted/scheduled',
      summary: 'Agendar TED',
      description: 'Reserva ordem TEDFUTBA no Transact em D-n para liquidação futura.',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [
        {
          statusCode: '201',
          description: 'TED agendada com sucesso, retorna ID com status SCHEDULED',
        },
      ],
      tags: ['TED Agendado'],
    },
    {
      method: 'GET',
      path: '/v1/ted/scheduled/{tedScheduleId}',
      summary: 'Consultar TED Agendada por ID',
      parameters: [
        { name: 'tedScheduleId', in: 'path', required: true, type: 'string' },
      ],
      responses: [
        { statusCode: '200', description: 'Objeto com detalhes da TED agendada, valor, data e status' },
      ],
      tags: ['TED Agendado'],
    },
    {
      method: 'GET',
      path: '/v1/ted/scheduled',
      summary: 'Listar TEDs Agendadas',
      parameters: [
        { name: 'limit', in: 'query', required: false, type: 'number' },
        { name: 'offset', in: 'query', required: false, type: 'number' },
      ],
      responses: [{ statusCode: '200', description: 'Lista paginada de TEDs agendadas com status' }],
      tags: ['TED Agendado'],
    },
    {
      method: 'POST',
      path: '/v1/ted/scheduled/{tedScheduleId}/execute',
      summary: 'Executar TED Agendada',
      description: 'Força a execução da TED em D0, movendo o saldo no ciclo de liquidação imediata.',
      parameters: [
        { name: 'tedScheduleId', in: 'path', required: true, type: 'string' },
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [
        {
          statusCode: '200',
          description: 'TED executada com sucesso, retorna EXECUTED e rota de liquidação confirmada',
        },
      ],
      tags: ['TED Agendado'],
    },
    {
      method: 'DELETE',
      path: '/v1/ted/scheduled/{tedScheduleId}',
      summary: 'Cancelar TED Agendada',
      parameters: [
        { name: 'tedScheduleId', in: 'path', required: true, type: 'string' },
      ],
      responses: [
        { statusCode: '200', description: 'TED agendada cancelada, status atualizado para CANCELLED' },
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
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
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
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
        { name: 'companyId', in: 'header', required: false, type: 'string' },
        { name: 'channelId', in: 'header', required: false, type: 'string' },
        { name: 'userId', in: 'header', required: false, type: 'string' },
        {
          name: 'Chave-Idempotencia',
          in: 'header',
          required: false,
          type: 'string',
        },
      ],
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
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [
        {
          statusCode: '202',
          description: 'TED intra-bancária liquidada no Temenos (TEDINTIN)',
        },
        {
          statusCode: '422',
          description: 'Operação interbancária não suportada nesta rota — utilize /v1/ted',
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
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [
        {
          statusCode: '200',
          description: 'TED submetida com sucesso, retorna transaction_id para rastreamento',
        },
      ],
      tags: ['TED Facade'],
    },
    {
      method: 'GET',
      path: '/v1/ted',
      summary: 'Listar TEDs',
      parameters: [
        { name: 'status', in: 'query', required: false, type: 'string' },
        {
          name: 'settlement_route',
          in: 'query',
          required: false,
          type: 'string',
        },
      ],
      responses: [
        { statusCode: '200', description: 'Lista de TEDs filtradas por status e/ou rota de liquidação' },
      ],
      tags: ['TED Facade'],
    },
    {
      method: 'GET',
      path: '/v1/ted/{id}',
      summary: 'Consultar TED por ID',
      parameters: [{ name: 'id', in: 'path', required: true, type: 'string' }],
      responses: [
        {
          statusCode: '200',
          description: 'Objeto com status atual, rota de liquidação e metadados da TED',
        },
      ],
      tags: ['TED Facade'],
    },
    {
      method: 'POST',
      path: '/v1/ted/{id}/approve',
      summary: 'Aprovar TED',
      description: 'Aprova uma TED pendente de revisão, liberando-a para liquidação.',
      parameters: [{ name: 'id', in: 'path', required: true, type: 'string' }],
      responses: [{ statusCode: '200', description: 'TED aprovada e liberada para processamento' }],
      tags: ['TED Facade'],
    },
    {
      method: 'POST',
      path: '/v1/ted/{id}/settle',
      summary: 'Liquidar TED (Settle)',
      parameters: [{ name: 'id', in: 'path', required: true, type: 'string' }],
      responses: [
        { statusCode: '200', description: 'Liquidação confirmada, status atualizado para SETTLED' },
      ],
      tags: ['TED Facade'],
    },
    {
      method: 'POST',
      path: '/v1/ted/{id}/reverse',
      summary: 'Estornar TED',
      parameters: [{ name: 'id', in: 'path', required: true, type: 'string' }],
      responses: [
        { statusCode: '200', description: 'Estorno iniciado, status atualizado para REVERSED' },
      ],
      tags: ['TED Facade'],
    },
    {
      method: 'POST',
      path: '/v1/ted/reconcile',
      summary: 'Reconciliar TEDs',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [
        {
          statusCode: '200',
          description: 'TEDs reconciliadas por data, retorna divergências e totais processados',
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
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [{ statusCode: '200', description: 'TED inbound registrada e crédito aplicado na conta' }],
      tags: ['TED Facade'],
    },
    {
      method: 'POST',
      path: '/v1/ted/scheduled',
      summary: 'Agendar TED (SPI)',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [
        { statusCode: '201', description: 'Agendamento de TED criado com sucesso' },
      ],
      tags: ['TED Agendado'],
    },
    {
      method: 'GET',
      path: '/v1/ted/scheduled',
      summary: 'Listar TEDs Agendadas (SPI)',
      responses: [{ statusCode: '200', description: 'Lista de TEDs agendadas com status e datas de vencimento' }],
      tags: ['TED Agendado'],
    },
    {
      method: 'GET',
      path: '/v1/ted/scheduled/{id}',
      summary: 'Consultar TED Agendada por ID (SPI)',
      parameters: [{ name: 'id', in: 'path', required: true, type: 'string' }],
      responses: [{ statusCode: '200', description: 'Detalhes da TED agendada incluindo valor e beneficiário' }],
      tags: ['TED Agendado'],
    },
    {
      method: 'POST',
      path: '/v1/ted/scheduled/{id}/execute',
      summary: 'Executar TED Agendada Vencida (SPI)',
      parameters: [{ name: 'id', in: 'path', required: true, type: 'string' }],
      responses: [
        {
          statusCode: '200',
          description: 'Execução em lote iniciada, TEDs vencidas enviadas ao STR',
        },
      ],
      tags: ['TED Agendado'],
    },
    {
      method: 'DELETE',
      path: '/v1/ted/scheduled/{id}',
      summary: 'Cancelar TED Agendada (SPI)',
      parameters: [{ name: 'id', in: 'path', required: true, type: 'string' }],
      responses: [
        { statusCode: '200', description: 'TED agendada cancelada, status atualizado para CANCELLED' },
      ],
      tags: ['TED Agendado'],
    },
  ],
};
