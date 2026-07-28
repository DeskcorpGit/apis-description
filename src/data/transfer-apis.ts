import type { ApiData } from '@/types/api';

export const transferApis: ApiData = {
  title: 'PaymentOS - Transfers (PIX & TED)',
  description:
    'Fluxos de transferências imediatas e agendadas validados no core Temenos.[cite: 1]',
  endpoints: [
    {
      method: 'POST',
      path: '/v1/pix/scheduled',
      summary: 'Agendar PIX',
      description:
        'Reserva a ordem PIXFUTBA no Transact em D-n. Sem o bloco pixout o agendamento é criado mas NÃO reserva no core. Datas de fim de semana são ajustadas para o próximo dia útil.[cite: 1]',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [
        {
          statusCode: '201',
          description: 'Agendamento criado com status SCHEDULED[cite: 1]',
        },
      ],
      tags: ['Pix Agendado'],
    },
    {
      method: 'GET',
      path: '/v1/pix/scheduled/{pixScheduleId}',
      summary: 'Consultar PIX Agendado por ID',
      description:
        'Mostra o temenos_future_order_id evidenciando reserva no core.[cite: 1]',
      parameters: [
        { name: 'pixScheduleId', in: 'path', required: true, type: 'string' },
      ],
      responses: [
        {
          statusCode: '200',
          description: 'Retorna os detalhes do agendamento[cite: 1]',
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
          description: 'Lista pagamentos PIX agendados[cite: 1]',
        },
      ],
      tags: ['Pix Agendado'],
    },
    {
      method: 'POST',
      path: '/v1/pix/scheduled/{pixScheduleId}/execute',
      summary: 'Executar PIX Agendado Vencido',
      description:
        'Força o vencimento (D0). Roda o ciclo block->JD->settle no ato.[cite: 1]',
      parameters: [
        { name: 'pixScheduleId', in: 'path', required: true, type: 'string' },
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [
        {
          statusCode: '200',
          description:
            'EXECUTED ou SKIPPED (Temenos -> dono e o poller D0)[cite: 1]',
        },
      ],
      tags: ['Pix Agendado'],
    },
    {
      method: 'DELETE',
      path: '/v1/pix/scheduled/{pixScheduleId}',
      summary: 'Cancelar PIX Agendado',
      description: 'Cancela a ordem no Transact.[cite: 1]',
      parameters: [
        { name: 'pixScheduleId', in: 'path', required: true, type: 'string' },
      ],
      responses: [
        { statusCode: '200', description: 'Status CANCELLED[cite: 1]' },
      ],
      tags: ['Pix Agendado'],
    },
    {
      method: 'POST',
      path: '/v1/ted/scheduled',
      summary: 'Agendar TED',
      description: 'Reserva TEDFUTBA no Transact em D-n.[cite: 1]',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [
        {
          statusCode: '201',
          description: 'TED agendado com sucesso (SCHEDULED)[cite: 1]',
        },
      ],
      tags: ['TED Agendado'],
    },
    {
      method: 'GET',
      path: '/v1/ted/scheduled/{tedScheduleId}',
      summary: 'Consultar TED Agendado',
      parameters: [
        { name: 'tedScheduleId', in: 'path', required: true, type: 'string' },
      ],
      responses: [
        { statusCode: '200', description: 'Retorna detalhes da TED[cite: 1]' },
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
      responses: [{ statusCode: '200', description: 'Lista TEDs[cite: 1]' }],
      tags: ['TED Agendado'],
    },
    {
      method: 'POST',
      path: '/v1/ted/scheduled/{tedScheduleId}/execute',
      summary: 'Executar TED Agendada',
      description: 'Mover dinheiro no ciclo D0.[cite: 1]',
      parameters: [
        { name: 'tedScheduleId', in: 'path', required: true, type: 'string' },
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [
        {
          statusCode: '200',
          description: 'EXECUTED e rota de liquidacao presente[cite: 1]',
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
        { statusCode: '200', description: 'Status CANCELLED[cite: 1]' },
      ],
      tags: ['TED Agendado'],
    },
    {
      method: 'POST',
      path: '/v1/ted',
      summary: 'Enviar TED Imediata (Normal)',
      description:
        'TED funds held + ordem Temenos + STR (SITRAF). Interbancario NAO vai por /op/tedout.[cite: 1]',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [
        {
          statusCode: '201',
          description:
            'Sucesso, retorna TransactionID e SettlementRoute[cite: 1]',
        },
      ],
      tags: ['TED Normal'],
    },
  ],
};

export const transferSpiApis: ApiData = {
  title: 'PaymentOS - Transfers (SPI: TED & PIX OUT)',
  description:
    'Operacoes de saida via PIX (Saque, Troco, Intra) e orquestracao de TEDs interbancarias e agendadas.[cite: 16, 17, 20, 21, 22, 24]',
  endpoints: [
    {
      method: 'POST',
      path: '/jdpi/spi/op/pixout',
      summary: 'Ordem de Pagamento PIX (Temenos)',
      description:
        'Saga Temenos: bloqueio de saldo -> JDPI/BACEN -> confirma. Suporta Intra-PSP PF, Saque e Troco.[cite: 16, 17, 22, 24]',
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
            'Aceito (temenosConfirmed:true ou intraPsp:true)[cite: 16, 17, 22, 24]',
        },
        {
          statusCode: '400',
          description:
            'Invalid Request (ex: falta ispbPss no Saque)[cite: 16, 17]',
        },
        {
          statusCode: '502',
          description:
            'Falha na criacao Temenos (gap ambiente HML para PJ)[cite: 16, 17]',
        },
      ],
      tags: ['PIX SPI'],
    },
    {
      method: 'POST',
      path: '/jdpi/spi/op/tedout',
      summary: 'TED-out via Temenos',
      description:
        'Liquida TED intra-bancaria (mesmo ISPB) via Temenos. Interbancarias retornam 422.[cite: 20]',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [
        {
          statusCode: '202',
          description: 'Liquida intra no Temenos (TEDINTIN)[cite: 20]',
        },
        {
          statusCode: '422',
          description: 'Interbancario negado (use /v1/ted)[cite: 20]',
        },
      ],
      tags: ['TED SPI'],
    },
    {
      method: 'POST',
      path: '/v1/ted',
      summary: 'Submit TED Interbancario (Facade)',
      description:
        'Cria e envia a TED via MQ STR (STR0008 + poster Temenos).[cite: 20, 21]',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [
        {
          statusCode: '200',
          description: 'TED submetida, retorna transaction_id[cite: 20]',
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
        { statusCode: '200', description: 'Lista retornada[cite: 20]' },
      ],
      tags: ['TED Facade'],
    },
    {
      method: 'GET',
      path: '/v1/ted/{id}',
      summary: 'Consultar TED',
      parameters: [{ name: 'id', in: 'path', required: true, type: 'string' }],
      responses: [
        {
          statusCode: '200',
          description: 'Retorna status atual[cite: 20, 21]',
        },
      ],
      tags: ['TED Facade'],
    },
    {
      method: 'POST',
      path: '/v1/ted/{id}/approve',
      summary: 'Aprovar TED',
      description: 'Aprova TED em revisao.[cite: 20, 21]',
      parameters: [{ name: 'id', in: 'path', required: true, type: 'string' }],
      responses: [{ statusCode: '200', description: 'Aprovado[cite: 20]' }],
      tags: ['TED Facade'],
    },
    {
      method: 'POST',
      path: '/v1/ted/{id}/settle',
      summary: 'Liquidar TED (Settle)',
      parameters: [{ name: 'id', in: 'path', required: true, type: 'string' }],
      responses: [
        { statusCode: '200', description: 'Liquidacao confirmada[cite: 20]' },
      ],
      tags: ['TED Facade'],
    },
    {
      method: 'POST',
      path: '/v1/ted/{id}/reverse',
      summary: 'Estornar TED',
      parameters: [{ name: 'id', in: 'path', required: true, type: 'string' }],
      responses: [
        { statusCode: '200', description: 'Reversao iniciada[cite: 20, 21]' },
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
          description: 'TEDs reconciliadas por data[cite: 20, 21]',
        },
      ],
      tags: ['TED Facade'],
    },
    {
      method: 'POST',
      path: '/v1/ted/receive',
      summary: 'Receber TED Inbound',
      description:
        'Registra uma TED recebida (STR0008R2 inbound).[cite: 20, 21]',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [{ statusCode: '200', description: 'TED recebida[cite: 20]' }],
      tags: ['TED Facade'],
    },
    {
      method: 'POST',
      path: '/v1/ted/scheduled',
      summary: 'Agendar TED',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [
        { statusCode: '201', description: 'Agendamento criado[cite: 20, 21]' },
      ],
      tags: ['TED Agendado'],
    },
    {
      method: 'GET',
      path: '/v1/ted/scheduled',
      summary: 'Listar TEDs Agendadas',
      responses: [{ statusCode: '200', description: 'Sucesso[cite: 20, 21]' }],
      tags: ['TED Agendado'],
    },
    {
      method: 'GET',
      path: '/v1/ted/scheduled/{id}',
      summary: 'Consultar TED Agendada',
      parameters: [{ name: 'id', in: 'path', required: true, type: 'string' }],
      responses: [{ statusCode: '200', description: 'Sucesso[cite: 20, 21]' }],
      tags: ['TED Agendado'],
    },
    {
      method: 'POST',
      path: '/v1/ted/scheduled/{id}/execute',
      summary: 'Executar TED Agendada Vencida',
      parameters: [{ name: 'id', in: 'path', required: true, type: 'string' }],
      responses: [
        {
          statusCode: '200',
          description: 'Execucao em lote iniciada[cite: 20, 21]',
        },
      ],
      tags: ['TED Agendado'],
    },
    {
      method: 'DELETE',
      path: '/v1/ted/scheduled/{id}',
      summary: 'Cancelar TED Agendada',
      parameters: [{ name: 'id', in: 'path', required: true, type: 'string' }],
      responses: [
        { statusCode: '200', description: 'Cancelado[cite: 20, 21]' },
      ],
      tags: ['TED Agendado'],
    },
  ],
};
