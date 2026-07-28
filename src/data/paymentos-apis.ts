import type { ApiData } from '@/types/api';

export const paymentosApis: ApiData = {
  title: 'PaymentOS - Coleção Completa de APIs Pix',
  description:
    'Conjunto completo de APIs do ecossistema PaymentOS para o SPI/BACEN (Pix): autenticação, DICT, crédito inbound, MED/fraude/devoluções, QR Codes (dinâmico, COBV, composto) e operações de observabilidade e proxy de core bancário.',
  endpoints: [
    // ─────────────────────────────────────────────
    // AUTH
    // ─────────────────────────────────────────────
    {
      method: 'POST',
      path: '/auth/realms/ledgeros/protocol/openid-connect/token',
      summary: 'Obter Token de Acesso',
      description:
        'Gera o token via client_credentials com os scopes necessários (ex: pix:create pix:read).',
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
        'grant_type=client_credentials&client_id=paymentos-service&client_secret=paymentos-secret-uat-2024&scope=ted:create ted:read ted:reverse',
      responses: [
        {
          statusCode: '200',
          description: 'Token JWT gerado com sucesso',
          example: '{"access_token": "eyJhbG..."}',
        },
      ],
      tags: ['Corebanx', 'Auth'],
    },

    // ─────────────────────────────────────────────
    // DICT REIVINDICAÇÕES
    // ─────────────────────────────────────────────
    {
      method: 'POST',
      path: '/paymentos/jdpi/dict/reivindicacao/incluir',
      summary: 'Incluir Reivindicação',
      description:
        'Cria a reivindicação de portabilidade de chave Pix (retorna idReivindicacao). Aparece flagada apenas na chave do doador.',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      requestBody: JSON.stringify(
        {
          chave: 'fulano.tal@provedor.com.br',
          tpChave: 2,
          tpReivindicacao: 0,
          ispbDoador: '60701190',
        },
        null,
        2
      ),
      responses: [
        {
          statusCode: '200',
          description:
            'Reivindicação criada com sucesso, retorna idReivindicacao',
        },
      ],
      tags: ['DICT Reivindicações'],
    },
    {
      method: 'POST',
      path: '/paymentos/jdpi/dict/reivindicacao/listar',
      summary: 'Listar Reivindicações',
      description:
        'Lista as reivindicações iniciadas pelo PSP reivindicador (ehReivindicador=true).',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      requestBody: JSON.stringify(
        {
          ehReivindicador: true,
          pagina: 1,
          tamanhoPagina: 10,
        },
        null,
        2
      ),
      responses: [
        {
          statusCode: '200',
          description:
            'Array de reivindicações contendo idReivindicacao, chave Pix e status de cada item',
        },
      ],
      tags: ['DICT Reivindicações'],
    },
    {
      method: 'POST',
      path: '/paymentos/jdpi/dict/reivindicacao/{idReivindicacao}/cancelar',
      summary: 'Cancelar Reivindicação',
      description:
        'Cancela uma reivindicação iniciada (motivo=0 — desistência do reivindicador).',
      parameters: [
        { name: 'idReivindicacao', in: 'path', required: true, type: 'string' },
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      requestBody: JSON.stringify(
        {
          motivo: 0,
        },
        null,
        2
      ),
      responses: [
        {
          statusCode: '200',
          description: 'Reivindicação cancelada com sucesso no DICT',
        },
      ],
      tags: ['DICT Reivindicações'],
    },

    // ─────────────────────────────────────────────
    // INBOUND CREDIT WEBHOOKS
    // ─────────────────────────────────────────────
    {
      method: 'POST',
      path: '/jdpi/webhook/credito/validar',
      summary: 'Validar Crédito (9.3.1)',
      description:
        'Validação síncrona prévia ao crédito. Chave-Idempotencia é opcional nesta etapa.',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
        {
          name: 'Authorization',
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
      requestBody: JSON.stringify(
        {
          tpIniciacao: 0,
          prioridadePagamento: 0,
          tpPrioridadePagamento: 0,
          finalidade: 0,
          ispbPss: '',
          pagador: {
            ispb: '60701190',
            tpPessoa: 0,
            cpfCnpj: '11111111111',
            nome: 'PAGADOR TESTE',
            nrAgencia: '0001',
            tpConta: 0,
            nrConta: '12345678',
          },
          recebedor: {
            ispb: '04902979',
            tpPessoa: 0,
            cpfCnpj: '79048471249',
            nrAgencia: '0007',
            tpConta: 0,
            nrConta: '0635528',
          },
          dtHrOp: '2026-06-18T20:00:00.000Z',
          valor: 12.34,
          infEntreClientes: 'Compra Paga',
          creditoOrdemPagamento: {
            endToEndId: 'E049029799697VBL1',
            idConciliacaoRecebedor: 'REC00000000000000000000000000000001',
            chave: 'fulano.tal@provedor.com.br',
          },
        },
        null,
        2
      ),
      responses: [
        {
          statusCode: '200',
          description:
            'Retorna {resultado: 1} se o crédito é válido, ou {resultado: 0, motivo: "..."} se inválido',
        },
      ],
      tags: ['Webhooks Crédito'],
    },
    {
      method: 'POST',
      path: '/jdpi/webhook/credito',
      summary: 'Registrar Crédito (9.3.2)',
      description:
        'Efetiva a claim-before-credit. Exige Chave-Idempotencia (retorna 400 JDPI0001 sem ela). Replays com a mesma chave geram ack 200 síncrono sem re-creditar.',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
        {
          name: 'Authorization',
          in: 'header',
          required: false,
          type: 'string',
        },
        {
          name: 'Chave-Idempotencia',
          in: 'header',
          required: true,
          type: 'string',
        },
      ],
      requestBody: JSON.stringify(
        {
          idReqJdPi: 'REQ-TEM-12345678',
          endToEndId: 'E30015936202507161200ABCDEF00001',
          tpIniciacao: 0,
          finalidade: 0,
          dtHrOp: '2026-07-16T12:00:00.000Z',
          dtHrLiquidacao: '2026-07-16T12:00:00.000Z',
          valor: 15.5,
          pagador: {
            ispb: '30015936',
            tpPessoa: 0,
            cpfCnpj: '11122233396',
            nrAgencia: '0001',
            tpConta: 0,
            nrConta: '1000001003',
            nome: 'Pagador Externo',
          },
          recebedor: {
            ispb: '04902979',
            tpPessoa: 0,
            cpfCnpj: '60502961546',
            nrAgencia: '0201',
            tpConta: 0,
            nrConta: '1000005939',
            nome: 'Beneficiario BASA',
          },
        },
        null,
        2
      ),
      responses: [
        {
          statusCode: '200',
          description:
            'Crédito registrado com sucesso, retorna idCreditoSgct para rastreamento',
        },
        {
          statusCode: '400',
          description: 'Header Chave-Idempotencia ausente (código JDPI0001)',
        },
        {
          statusCode: '502',
          description:
            'Falha de processamento no core bancário (ex: conta não cadastrada no Temenos)',
        },
      ],
      tags: ['Webhooks Crédito'],
    },

    // ─────────────────────────────────────────────
    // MED — CONTESTAÇÃO
    // ─────────────────────────────────────────────
    {
      method: 'GET',
      path: '/jdpi/med/contestacao',
      summary: 'Listar Contestações',
      description:
        'Lista contestações MED filtradas por cliente. Requer papel ledger-viewer.',
      parameters: [
        { name: 'coreCustomerId', in: 'query', required: true, type: 'string' },
        { name: 'accountNumber', in: 'query', required: false, type: 'string' },
        {
          name: 'status',
          in: 'query',
          required: false,
          type: 'string',
          description: 'EM_ANALISE | APROVADO | REJEITADA | CANCELADA',
        },
        { name: 'limit', in: 'query', required: false, type: 'number' },
      ],
      responses: [
        {
          statusCode: '200',
          description: 'Objeto com total, count e array de contestações filtradas',
        },
        {
          statusCode: '400',
          description: 'Status inválido ou parâmetros obrigatórios ausentes',
        },
      ],
      tags: ['Contestação'],
    },
    {
      method: 'POST',
      path: '/jdpi/med/contestacao',
      summary: 'Criar Contestação',
      description:
        'Cria uma contestação MED. A janela permitida é de até 80 dias medidos sobre o instante no endToEndId da transação original.',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      requestBody: JSON.stringify(
        {
          endToEndId: 'E04902979202607281200ABCDEF00001',
          motivo: 'FRAUDE_OU_COACAO',
          detalhes: 'Suspeita de golpe do Pix',
          valorContestado: 150.0,
        },
        null,
        2
      ),
      responses: [
        {
          statusCode: '201',
          description: 'Contestação criada com sucesso. Status inicial: EM_ANALISE',
        },
        {
          statusCode: '422',
          description: 'Transação fora da janela de 80 dias para contestação',
        },
      ],
      tags: ['Contestação'],
    },
    {
      method: 'POST',
      path: '/jdpi/med/contestacao/{id}/decide',
      summary: 'Decisão do Analista',
      description:
        'Grava a decisão APROVADO ou REJEITADA. Retorna 409 ao tentar alterar uma decisão já registrada. Requer papel ledger-operator ou admin.',
      parameters: [
        { name: 'id', in: 'path', required: true, type: 'string' },
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      requestBody: JSON.stringify(
        {
          decision: 'APROVADO',
          decidedBy: 'analista.med@banco.com.br',
          justificativa: 'Comprovada fraude por análise do perfil',
        },
        null,
        2
      ),
      responses: [
        {
          statusCode: '200',
          description:
            'Decisão gravada com sucesso, retorna trilha de auditoria (decidedBy, decidedAt)',
        },
        {
          statusCode: '400',
          description: 'Decisão inválida ou campo decidedBy ausente',
        },
        { statusCode: '404', description: 'Contestação não encontrada para o ID informado' },
        {
          statusCode: '409',
          description: 'Conflito — a decisão já foi registrada e não pode ser sobrescrita',
        },
      ],
      tags: ['Contestação'],
    },
    {
      method: 'POST',
      path: '/jdpi/med/contestacao/{id}/cancel',
      summary: 'Cancelar Contestação',
      description:
        'Cancela a contestação. Aplicável apenas a contestações com status EM_ANALISE. Operação idempotente.',
      parameters: [{ name: 'id', in: 'path', required: true, type: 'string' }],
      requestBody: JSON.stringify(
        {
          motivo: 'Solicitação do cliente devedor',
        },
        null,
        2
      ),
      responses: [
        { statusCode: '200', description: 'Contestação cancelada, status atualizado para CANCELADA' },
        { statusCode: '404', description: 'Contestação não encontrada para o ID informado' },
        {
          statusCode: '409',
          description: 'Conflito — contestação não está em status EM_ANALISE',
        },
      ],
      tags: ['Contestação'],
    },
    {
      method: 'GET',
      path: '/jdpi/med/contestacao/{id}',
      summary: 'Consultar Detalhes da Contestação',
      parameters: [{ name: 'id', in: 'path', required: true, type: 'string' }],
      responses: [
        {
          statusCode: '200',
          description: 'Dados completos da contestação incluindo status, trilha e decisão (se houver)',
        },
        { statusCode: '404', description: 'Contestação não encontrada para o ID informado' },
      ],
      tags: ['Contestação'],
    },

    // ─────────────────────────────────────────────
    // MED — DEVOLUÇÕES
    // ─────────────────────────────────────────────
    {
      method: 'POST',
      path: '/jdpi/spi/op/devolucao/intra',
      summary: 'Devolução INTRA (BASA→BASA)',
      description:
        'Processa devolução quando pagador e recebedor pertencem ao mesmo ISPB. Não passa pelo BACEN. Exige beneficiaryAccountId no corpo.',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
        { name: 'companyId', in: 'header', required: true, type: 'string' },
        { name: 'channelId', in: 'header', required: true, type: 'string' },
        { name: 'userId', in: 'header', required: true, type: 'string' },
      ],
      requestBody: JSON.stringify(
        {
          idReqSistemaCliente: 'a7d02e85-857c-4b4b-bc7c-ce43279f2c03',
          endToEndIdOriginal: 'E04902979202607161200ABCDEF00001',
          valorDevolucao: 21.1,
          beneficiaryAccountId: '1000006331',
          motivo: 'DEVOLUCAO_ACORDO',
        },
        null,
        2
      ),
      responses: [
        {
          statusCode: '202',
          description: 'Devolução intra aceita — flow=intra, rail=temenos',
        },
        {
          statusCode: '400',
          description: 'Campo beneficiaryAccountId ausente no corpo da requisição',
        },
      ],
      tags: ['Devoluções'],
    },
    {
      method: 'POST',
      path: '/jdpi/spi/op/devolucao/pixout',
      summary: 'Devolução PIXOUT (PIXREVE)',
      description:
        'Devolve um PIX-out em uma única chamada (orderInitiationType=PIXREVE, submitOrder=YES).',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      requestBody: JSON.stringify(
        {
          idReqSistemaCliente: 'a7d02e85-857c-4b4b-bc7c-ce43279f2c03',
          endToEndIdOriginal: 'E04902979202607161200ABCDEF00001',
          valorDevolucao: 15.5,
          orderInitiationType: 'PIXREVE',
          submitOrder: 'YES',
        },
        null,
        2
      ),
      responses: [{ statusCode: '202', description: 'Devolução PIXREVE aceita e submetida ao BACEN' }],
      tags: ['Devoluções'],
    },
    {
      method: 'POST',
      path: '/jdpi/spi/op/devolucao/med',
      summary: 'Devolução MED (PIXMED) - 2 Passos',
      description:
        'Orquestra os 2 passos da devolução MED: cria a ordem retida PIXMED e a submete com o orderingReference.',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
        { name: 'companyId', in: 'header', required: false, type: 'string' },
        { name: 'channelId', in: 'header', required: false, type: 'string' },
        { name: 'userId', in: 'header', required: false, type: 'string' },
      ],
      requestBody: JSON.stringify(
        {
          orderingReference: 'ORD-MED-123456',
          uniqueTransactionReference: 'UTR-MED-789012',
          endToEndIdOriginal: 'E04902979202607161200ABCDEF00001',
          valorDevolucao: 100.0,
        },
        null,
        2
      ),
      responses: [
        {
          statusCode: '202',
          description: 'Devolução MED aceita — retorna status submitted ou held_unsubmitted',
        },
        {
          statusCode: '400',
          description:
            'Campos orderingReference ou uniqueTransactionReference ausentes no corpo',
        },
      ],
      tags: ['Devoluções'],
    },
    {
      method: 'POST',
      path: '/jdpi/devolucao/incluir',
      summary: 'Incluir Devolução MED (PIX)',
      description:
        'Registra solicitação de devolução MED. valorDevolucao deve ser >= 0.01. dtHrRequisicaoPsp deve ser a data real da requisição.',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      requestBody: JSON.stringify(
        {
          idSolDevolucao: 'DEV-MED-001',
          endToEndIdOriginal: 'E04902979202607161200ABCDEF00001',
          valorDevolucao: 50.0,
          dtHrRequisicaoPsp: '2026-07-28T10:00:00.000Z',
        },
        null,
        2
      ),
      responses: [
        {
          statusCode: '200',
          description: 'Devolução MED iniciada com sucesso, retorna idSolDevolucao',
        },
      ],
      tags: ['MED PIX'],
    },
    {
      method: 'GET',
      path: '/jdpi/devolucao/consultar',
      summary: 'Consultar Devolução MED por ID',
      parameters: [
        { name: 'ispb', in: 'query', required: true, type: 'string' },
        { name: 'idSolDevolucao', in: 'query', required: true, type: 'string' },
      ],
      responses: [{ statusCode: '200', description: 'Dados atuais da devolução MED incluindo status e valores' }],
      tags: ['MED PIX'],
    },
    {
      method: 'GET',
      path: '/jdpi/devolucao/listar',
      summary: 'Listar Devoluções MED',
      description: 'tpPsp=0 retorna todas as devoluções. tpPsp=1 pode retornar 502 em ambiente HML.',
      parameters: [
        { name: 'ispb', in: 'query', required: true, type: 'string' },
        { name: 'tpPsp', in: 'query', required: true, type: 'number' },
        { name: 'pagina', in: 'query', required: false, type: 'number' },
        { name: 'tamanhoPagina', in: 'query', required: false, type: 'number' },
      ],
      responses: [
        { statusCode: '200', description: 'Lista paginada de devoluções MED com status e valores' },
      ],
      tags: ['MED PIX'],
    },

    // ─────────────────────────────────────────────
    // FRAUDE
    // ─────────────────────────────────────────────
    {
      method: 'POST',
      path: '/jdpi/marcacao-fraude/incluir',
      summary: 'Criar Marcação de Fraude',
      description:
        'Cria marcação sobre um CPF/CNPJ. Se a chave Pix for enviada, deve corresponder ao cpfCnpj informado.',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      requestBody: JSON.stringify(
        {
          cpfCnpj: '60502961546',
          chave: '60502961546',
          tipoFraude: 'FALSA_IDENTIDADE',
          detalhes: 'Conta laranja identificada',
        },
        null,
        2
      ),
      responses: [
        {
          statusCode: '200',
          description: 'Marcação de fraude criada com sucesso, retorna idMarcacaoFraude',
        },
        { statusCode: '201', description: 'Marcação criada (resposta alternativa do upstream)' },
        {
          statusCode: '502',
          description: 'Erro transitório — upstream DICT indisponível, tente novamente',
        },
      ],
      tags: ['Fraude'],
    },
    {
      method: 'GET',
      path: '/jdpi/marcacao-fraude/listar',
      summary: 'Listar Marcações de Fraude',
      parameters: [
        { name: 'ispb', in: 'query', required: true, type: 'string' },
        { name: 'cpfCnpj', in: 'query', required: false, type: 'string' },
        { name: 'pagina', in: 'query', required: false, type: 'number' },
        { name: 'tamanhoPagina', in: 'query', required: false, type: 'number' },
      ],
      responses: [
        {
          statusCode: '200',
          description: 'Objeto com array marcacoesInfracao contendo as marcações ativas e canceladas',
        },
      ],
      tags: ['Fraude'],
    },
    {
      method: 'POST',
      path: '/jdpi/marcacao-fraude/{idMarcacaoFraude}/cancelar',
      summary: 'Cancelar Marcação de Fraude',
      parameters: [
        {
          name: 'idMarcacaoFraude',
          in: 'path',
          required: true,
          type: 'string',
        },
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      requestBody: JSON.stringify(
        {
          motivo: 'Análise de erro comprovada',
        },
        null,
        2
      ),
      responses: [
        { statusCode: '200', description: 'Marcação de fraude cancelada, status atualizado no DICT' },
      ],
      tags: ['Fraude'],
    },

    // ─────────────────────────────────────────────
    // RELATO DE INFRAÇÃO
    // ─────────────────────────────────────────────
    {
      method: 'POST',
      path: '/jdpi/relato-infracao/incluir',
      summary: 'Incluir Relato de Infração',
      description:
        'Cria um relato de infração no DICT. Os campos email e telefone são obrigatórios se o bloco de contato for enviado. Pode retornar 404 em HML por ausência de rota no upstream.',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      requestBody: JSON.stringify(
        {
          cpfCnpj: '60502961546',
          chave: 'fulano@email.com',
          contato: {
            email: 'notificacoes@banco.com.br',
            telefone: '+5511999998888',
          },
          detalhes: 'Relato de golpe do suporte falso',
        },
        null,
        2
      ),
      responses: [
        {
          statusCode: '200',
          description: 'Relato de infração criado com sucesso, retorna idRelatoInfracao',
        },
        {
          statusCode: '404',
          description: 'Rota não encontrada no upstream HML — indisponível neste ambiente',
        },
      ],
      tags: ['Relato Infração'],
    },
    {
      method: 'GET',
      path: '/jdpi/relato-infracao/listar',
      summary: 'Listar Relatos de Infração',
      parameters: [
        { name: 'ispb', in: 'query', required: true, type: 'string' },
        { name: 'pagina', in: 'query', required: false, type: 'number' },
        { name: 'tamanhoPagina', in: 'query', required: false, type: 'number' },
      ],
      responses: [
        {
          statusCode: '200',
          description: 'Objeto com array reporteInfracao contendo os relatos paginados',
        },
      ],
      tags: ['Relato Infração'],
    },
    {
      method: 'GET',
      path: '/jdpi/relato-infracao/consultar',
      summary: 'Consultar Relato de Infração por ID',
      parameters: [
        { name: 'ispb', in: 'query', required: true, type: 'string' },
        {
          name: 'idRelatoInfracao',
          in: 'query',
          required: true,
          type: 'string',
        },
      ],
      responses: [
        { statusCode: '200', description: 'Dados completos do relato de infração incluindo status e partes envolvidas' },
      ],
      tags: ['Relato Infração'],
    },

    // ─────────────────────────────────────────────
    // RECUPERAÇÃO DE VALORES
    // ─────────────────────────────────────────────
    {
      method: 'POST',
      path: '/jdpi/recuperacao-valores/incluir',
      summary: 'Incluir Recuperação de Valores',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      requestBody: JSON.stringify(
        {
          idRelatoInfracao: 'REL-12345',
          valorSolicitado: 250.0,
          observacao: 'Solicitação de bloqueio cautelar no recebedor',
        },
        null,
        2
      ),
      responses: [
        {
          statusCode: '200',
          description: 'Solicitação de recuperação criada com sucesso, retorna idRecValores',
        },
      ],
      tags: ['Recuperação de Valores'],
    },

    // ─────────────────────────────────────────────
    // QR CODE DINÂMICO
    // ─────────────────────────────────────────────
    {
      method: 'POST',
      path: '/jdpi/qrcode/dinamico/gerar',
      summary: 'Gerar QR Dinâmico Imediato',
      description: 'Gera e assina o QR Code dinâmico imediato. Requer urlJwk para assinatura. Retorna payloadBase64.',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      requestBody: JSON.stringify(
        {
          chave: 'gustavo.armoa@corebanx.net.br',
          urlJwk: 'h-qrcode.basa.com.br/pix/jwks',
          valorOriginal: 150.0,
          cidade: 'Sao Paulo',
        },
        null,
        2
      ),
      responses: [
        { statusCode: '200', description: 'QR Code dinâmico gerado com sucesso, retorna payloadBase64' },
        {
          statusCode: '400',
          description: 'Campo hostJku ausente — necessário para assinatura JWS',
        },
      ],
      tags: ['QR Code'],
    },
    {
      method: 'PUT',
      path: '/jdpi/qrcode/dinamico/{idDocumento}',
      summary: 'Atualizar QR Dinâmico',
      description:
        'Substituição total do QR dinâmico. Campos não enviados são removidos. Requer urlPayloadJson, urlJwk, chave e cidade.',
      parameters: [
        { name: 'idDocumento', in: 'path', required: true, type: 'string' },
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      requestBody: JSON.stringify(
        {
          urlPayloadJson: 'h-qrcode.basa.com.br/cob/teste',
          urlJwk: 'h-qrcode.basa.com.br/pix/jwks',
          chave: 'gustavo.armoa@corebanx.net.br',
          cidade: 'Sao Paulo',
          valorOriginal: 200.0,
        },
        null,
        2
      ),
      responses: [{ statusCode: '200', description: 'QR Code dinâmico atualizado com sucesso' }],
      tags: ['QR Code'],
    },
    {
      method: 'POST',
      path: '/jdpi/qrcode/dinamico/cobv/gerar',
      summary: 'Gerar QR COBV',
      description:
        'Gera o QR Code de cobrança com vencimento (COBV). Não assina neste passo — a assinatura JWS ocorre em chamada posterior.',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      requestBody: JSON.stringify(
        {
          chave: '+5521973937780',
          nomeRecebedor: 'R C TRINDADE',
          valorOriginal: 100.5,
          dtVenc: '2026-08-30',
        },
        null,
        2
      ),
      responses: [
        {
          statusCode: '200',
          description: 'QR COBV gerado com sucesso, retorna idDocumento para uso na assinatura',
        },
      ],
      tags: ['QR Code'],
    },
    {
      method: 'POST',
      path: '/jdpi/qrcode/dinamico/cobv/jws',
      summary: 'Assinar COBV (JWS)',
      description:
        'Assina o payload COBV gerando header alg PS512 baseado no certificado digital.',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      requestBody: JSON.stringify(
        {
          idDocumento: 'DOC-COBV-12345',
          ispbCertificadoJws: '04902979',
        },
        null,
        2
      ),
      responses: [
        {
          statusCode: '200',
          description: 'Payload JWS assinado com sucesso, retorna payloadJws',
        },
      ],
      tags: ['QR Code'],
    },
    {
      method: 'POST',
      path: '/jdpi/qrcode/dinamico/cobv/jws/{idDocumento}',
      summary: 'Assinar COBV Específico (JWS)',
      parameters: [
        { name: 'idDocumento', in: 'path', required: true, type: 'string' },
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      requestBody: JSON.stringify(
        {
          ispbCertificadoJws: '04902979',
        },
        null,
        2
      ),
      responses: [
        {
          statusCode: '200',
          description: 'Payload JWS do COBV específico assinado e pronto para uso pelo PSP pagador',
        },
      ],
      tags: ['QR Code'],
    },
    {
      method: 'PUT',
      path: '/jdpi/qrcode/dinamico/cobv/{idDocumento}',
      summary: 'Atualizar QR COBV',
      description:
        'Substituição total do COBV. Requer valorFinal, dtVenc e demais campos obrigatórios.',
      parameters: [
        { name: 'idDocumento', in: 'path', required: true, type: 'string' },
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      requestBody: JSON.stringify(
        {
          valorFinal: 1100.11,
          dtVenc: '2026-08-20',
          diasAposVenc: 15,
          chave: 'gustavo.armoa@corebanx.net.br',
        },
        null,
        2
      ),
      responses: [
        { statusCode: '200', description: 'QR COBV atualizado com sucesso' },
      ],
      tags: ['QR Code'],
    },

    // ─────────────────────────────────────────────
    // QR COMPOSTO
    // ─────────────────────────────────────────────
    {
      method: 'POST',
      path: '/jdpi/qrcode/composto/gerar',
      summary: 'Gerar QR Composto (Imediato)',
      description:
        'Gera QR Composto imediato. Requer três URLs: urlJwk, urlPayloadJson e urlPayloadJsonRec. txid deve ter até 25 caracteres.',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      requestBody: JSON.stringify(
        {
          urlJwk: 'h-qrcode.basa.com.br/pix/jwks',
          urlPayloadJson: 'h-qrcode.basa.com.br/cob/teste',
          urlPayloadJsonRec: 'h-qrcode.basa.com.br/rec/teste',
          txid: 'TX1234567890',
        },
        null,
        2
      ),
      responses: [{ statusCode: '200', description: 'QR Composto imediato gerado com sucesso' }],
      tags: ['QR Composto'],
    },
    {
      method: 'POST',
      path: '/jdpi/qrcode/composto/estatico/gerar',
      summary: 'Gerar QR Composto Estático',
      description:
        'Gera QR Composto estático. txid deve ter até 25 caracteres. Exige bloco dadosRecorrencia completo.',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      requestBody: JSON.stringify(
        {
          chave: '+5521973937780',
          nomeRecebedor: 'R C TRINDADE',
          valor: 100.5,
        },
        null,
        2
      ),
      responses: [{ statusCode: '200', description: 'QR Composto estático gerado com sucesso' }],
      tags: ['QR Composto'],
    },
    {
      method: 'POST',
      path: '/jdpi/qrcode/composto/dinamico/gerar',
      summary: 'Gerar QR Composto Dinâmico',
      description:
        'Gera QR Composto dinâmico. txid deve ter entre 26 e 35 caracteres. Omitir dadosRecorrencia causa erro 500 no JDPI.',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      requestBody: JSON.stringify(
        {
          chave: '+5521973937780',
          nomeRecebedor: 'R C TRINDADE',
          valorOriginal: 100.5,
        },
        null,
        2
      ),
      responses: [{ statusCode: '200', description: 'QR Composto dinâmico gerado com sucesso' }],
      tags: ['QR Composto'],
    },
    {
      method: 'POST',
      path: '/jdpi/qrcode/composto/dinamico/cobv/gerar',
      summary: 'Gerar QR Composto COBV',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      requestBody: JSON.stringify(
        {
          chave: '+5521973937780',
          nomeRecebedor: 'R C TRINDADE',
          valorOriginal: 100.5,
        },
        null,
        2
      ),
      responses: [{ statusCode: '200', description: 'QR Composto COBV gerado com sucesso, retorna idDocumento' }],
      tags: ['QR Composto'],
    },
    {
      method: 'PUT',
      path: '/jdpi/qrcode/composto/{idDocumento}',
      summary: 'Atualizar QR Composto',
      parameters: [
        { name: 'idDocumento', in: 'path', required: true, type: 'string' },
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      requestBody: JSON.stringify(
        {
          idDocumento: 'DOC-COMP-12345',
          formato: 2,
          ispbCertificadoJws: '04902979',
          dtInicialRecorrencia: '2026-09-10',
          stRecorrencia: 1,
        },
        null,
        2
      ),
      responses: [{ statusCode: '200', description: 'QR Composto atualizado com sucesso' }],
      tags: ['QR Composto'],
    },
    {
      method: 'PUT',
      path: '/jdpi/qrcode/composto/dinamico/{idDocumento}',
      summary: 'Atualizar QR Composto Dinâmico',
      description: 'Campo dadosRecorrencia.stRecorrencia é obrigatório nesta atualização.',
      parameters: [
        { name: 'idDocumento', in: 'path', required: true, type: 'string' },
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      requestBody: JSON.stringify(
        {
          formato: 2,
          ispbCertificadoJws: '04902979',
          chave: 'gustavo.armoa@corebanx.net.br',
          codigoCategoria: '0000',
          nomeRecebedor: 'GUSTAVO ARMOA',
          cidade: 'Sao Paulo',
          cep: '01227-200',
          valorOriginal: 20.02,
          expiracaoQR: '86400',
          idConciliacaoRecebedor: 'JDPI2020010300000000000000000000001',
          dadosRecorrencia: {
            idRecorrencia: 'RR0490297920260522njua7shf40o',
            tpFrequencia: 4,
            dtInicialRecorrencia: '2026-08-10',
            dtFinalRecorrencia: '2027-08-10',
            pisoValorMaximo: 550,
            nrContrato: '1234567890ABC',
            retentativa: 1,
            recebedor: {
              ispb: '04902979',
              tpPessoa: 1,
              cnpj: '04902979000144',
              cpfCnpj: '04902979000144',
              nome: 'GUSTAVO ARMOA',
              nrAgencia: '0007',
              tpConta: 0,
              nrConta: '0635528',
            },
            devedor: {
              ispb: '04902979',
              tpPessoa: 0,
              cpfCnpj: '79048471249',
              nome: 'Alison Ricardo',
              nrAgencia: '0007',
              tpConta: 0,
              nrConta: '0635528',
            },
            stRecorrencia: 0,
          },
          urlJwk: 'h-qrcode.basa.com.br/pix/jwks',
          urlPayloadJson: 'h-qrcode.basa.com.br/cob/teste',
          urlPayloadJsonRec: 'h-qrcode.basa.com.br/rec/teste',
        },
        null,
        2
      ),
      responses: [{ statusCode: '200', description: 'QR Composto dinâmico atualizado com sucesso' }],
      tags: ['QR Composto'],
    },
    {
      method: 'PUT',
      path: '/jdpi/qrcode/composto/dinamico/cobv/{idDocumento}',
      summary: 'Atualizar QR Composto COBV',
      parameters: [
        { name: 'idDocumento', in: 'path', required: true, type: 'string' },
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      requestBody: JSON.stringify(
        {
          formato: 2,
          ispbCertificadoJws: '04902979',
          chave: 'gustavo.armoa@corebanx.net.br',
          codigoCategoria: '0000',
          cpfRecebedor: '07434576170',
          nomeRecebedor: 'GUSTAVO ARMOA',
          logradouroRecebedor: 'Rua Pix, 123',
          cidade: 'Sao Paulo',
          uf: 'SP',
          cep: '01227-200',
          valorOriginal: 1001.16,
          valorFinal: 1100.11,
          dtVenc: '2026-08-20',
          diasAposVenc: 15,
          idConciliacaoRecebedor: 'JDPI2020010300000000000000000000001',
          dadosRecorrencia: {
            idRecorrencia: 'RR0490297920260522njua7shf40o',
            tpFrequencia: 4,
            dtInicialRecorrencia: '2026-08-10',
            dtFinalRecorrencia: '2027-08-10',
            pisoValorMaximo: 550,
            nrContrato: '1234567890ABC',
            retentativa: 1,
            recebedor: {
              ispb: '04902979',
              tpPessoa: 1,
              cnpj: '04902979000144',
              cpfCnpj: '04902979000144',
              nome: 'GUSTAVO ARMOA',
              nrAgencia: '0007',
              tpConta: 0,
              nrConta: '0635528',
            },
            devedor: {
              ispb: '04902979',
              tpPessoa: 0,
              cpfCnpj: '79048471249',
              nome: 'Alison Ricardo',
              nrAgencia: '0007',
              tpConta: 0,
              nrConta: '0635528',
            },
            stRecorrencia: 0,
          },
          urlJwk: 'h-qrcode.basa.com.br/pix/jwks',
          urlPayloadJson: 'h-qrcode.basa.com.br/cobv/teste',
          urlPayloadJsonRec: 'h-qrcode.basa.com.br/rec/teste',
        },
        null,
        2
      ),
      responses: [{ statusCode: '200', description: 'QR Composto COBV atualizado com sucesso' }],
      tags: ['QR Composto'],
    },

    // ─────────────────────────────────────────────
    // PUBLIC (QR Code resolve / JWKS)
    // ─────────────────────────────────────────────
    {
      method: 'GET',
      path: '/pix/cobv/{token}',
      summary: 'Resolver COBV Público (Sem Auth)',
      parameters: [
        { name: 'token', in: 'path', required: true, type: 'string' },
      ],
      responses: [
        {
          statusCode: '200',
          description:
            'Retorna o payload JWS (JOSE) da cobrança para uso pelo PSP pagador via cadeia pública',
        },
      ],
      tags: ['Public'],
    },
    {
      method: 'GET',
      path: '/pix/cob/{token}',
      summary: 'Resolver COB Imediata (Public)',
      parameters: [
        { name: 'token', in: 'path', required: true, type: 'string' },
      ],
      responses: [
        { statusCode: '501', description: 'Endpoint em implantação — não disponível neste momento' },
      ],
      tags: ['Public'],
    },
    {
      method: 'GET',
      path: '/pix/jwks',
      summary: 'Resolver JWKS Público',
      responses: [
        {
          statusCode: '404',
          description: 'JWKS pendente de configuração no domínio público real',
        },
      ],
      tags: ['Public'],
    },

    // ─────────────────────────────────────────────
    // OPS — CORE PROXY
    // ─────────────────────────────────────────────
    {
      method: 'GET',
      path: '/jdpi/spi/temenos/paymentorders/{temenos_payment_order_id}',
      summary: 'Consultar Status de Ordem no Temenos',
      description:
        'Acessa diretamente o status da payment order no Transact (T24).',
      parameters: [
        {
          name: 'temenos_payment_order_id',
          in: 'path',
          required: true,
          type: 'string',
        },
        { name: 'Authorization', in: 'header', required: true, type: 'string' },
        { name: 'raw', in: 'query', required: false, type: 'boolean' },
      ],
      responses: [
        {
          statusCode: '200',
          description:
            'Status atual da ordem (completed, pending ou failed) e body original do Transact quando raw=true',
        },
      ],
      tags: ['Core Proxy'],
    },
    {
      method: 'GET',
      path: '/jdpi/spi/banklink/saldo',
      summary: 'Consultar Saldo via Banklink',
      parameters: [
        { name: 'Authorization', in: 'header', required: true, type: 'string' },
        { name: 'agencia', in: 'query', required: true, type: 'string' },
        { name: 'conta', in: 'query', required: true, type: 'string' },
        { name: 'cpfCnpj', in: 'query', required: true, type: 'string' },
        { name: 'tipoPessoa', in: 'query', required: true, type: 'string' },
      ],
      responses: [
        {
          statusCode: '200',
          description:
            'Objeto com saldoDisponivel e saldoBloqueadoJudicial da conta consultada',
        },
      ],
      tags: ['Core Proxy'],
    },
    {
      method: 'POST',
      path: '/v1/temenos/order/payment-orders',
      summary: 'Proxy RAW Payment Order Temenos',
      description:
        'Envia requisição crua diretamente para o Transact. Valida contas e headers antes do repasse.',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      requestBody: JSON.stringify(
        {
          body: {
            paymentOrderProductId: 'PIXINTRA',
            debitAccountId: '1000001003',
            creditAccountId: '1000006331',
            paymentCurrencyId: 'BRL',
            amount: 21.1,
            orderingCustomerName: 'Pagador Teste',
            endToEndReference: 'E2E-INTRA',
            executionDate: '2026-07-16',
            narratives: [
              {
                narrative: 'PIXINTRA Debit Transfer',
              },
              {
                narrative: 'PIXINTRA Credit Transfer',
              },
            ],
            contexts: [
              {
                contextName: 'PIX_CUST_NM',
                contextValue: 'Recebedor Teste',
              },
            ],
          },
        },
        null,
        2
      ),
      responses: [
        {
          statusCode: '200',
          description: 'Resposta JSON original processada pelo T24 sem transformações',
        },
      ],
      tags: ['Core Proxy'],
    },

    // ─────────────────────────────────────────────
    // OPS — OBSERVABILITY
    // ─────────────────────────────────────────────
    {
      method: 'GET',
      path: '/v1/ops/observability/inbound-credit/trace',
      summary: 'Trace de Crédito Inbound PIX',
      parameters: [
        { name: 'Authorization', in: 'header', required: true, type: 'string' },
        { name: 'endToEndId', in: 'query', required: true, type: 'string' },
      ],
      responses: [
        {
          statusCode: '200',
          description: 'Cadeia de eventos t02 a t05 do fluxo de crédito para o endToEndId informado',
        },
      ],
      tags: ['Observability'],
    },
    {
      method: 'GET',
      path: '/v1/ops/observability/inbound-credit/dlq',
      summary: 'Consultar Fila DLQ de Crédito',
      description:
        'Lista créditos inbound não confirmados na Dead Letter Queue. Suporta rails TED e PIX.',
      parameters: [
        { name: 'Authorization', in: 'header', required: true, type: 'string' },
        { name: 'rail', in: 'query', required: true, type: 'string' },
        { name: 'limit', in: 'query', required: false, type: 'string' },
      ],
      responses: [
        {
          statusCode: '200',
          description: 'Lista de registros enfileirados na DLQ com motivo de falha e payload original',
        },
      ],
      tags: ['Observability'],
    },
    {
      method: 'GET',
      path: '/v1/ops/observability/inbound-credit/dlq/summary',
      summary: 'Resumo da Fila DLQ',
      parameters: [
        { name: 'Authorization', in: 'header', required: true, type: 'string' },
      ],
      responses: [
        {
          statusCode: '200',
          description: 'Agregados totais da DLQ por status e rail (TED/PIX)',
        },
      ],
      tags: ['Observability'],
    },
    {
      method: 'GET',
      path: '/v1/ops/observability/audit/core-banking-errors',
      summary: 'Auditoria de Erros de Core Bancário',
      parameters: [
        { name: 'Authorization', in: 'header', required: true, type: 'string' },
        { name: 'limit', in: 'query', required: false, type: 'string' },
      ],
      responses: [
        {
          statusCode: '200',
          description: 'Logs de auditoria das integrações com core bancário incluindo erros e timestamps',
        },
      ],
      tags: ['Observability'],
    },

    // ─────────────────────────────────────────────
    // OPS — TESTING
    // ─────────────────────────────────────────────
    {
      method: 'POST',
      path: '/test/mq-inject/ted-inbound',
      summary: 'Injeção Mock de TED Inbound',
      description:
        'Injeta pacote STR0008R2 na fila de entrada MQ para simular recebimento de TED em ambiente não-produtivo.',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      requestBody: JSON.stringify(
        {
          scenario: 'temenos',
          numCtrlStr: 'STRPOC1785260597T1',
          ctCredtd: '1000009087',
          nomCliCredtd: 'BENEFICIARIO TEMENOS',
          valor: '150.00',
          nomCliDebtd: 'PAGADOR TED',
          cnpjCpfCliDebtd: '11111111111',
        },
        null,
        2
      ),
      responses: [
        {
          statusCode: '202',
          description: 'Mensagem aceita na fila MQ, retorna NumCtrlSTR para rastreamento',
        },
      ],
      tags: ['Testing'],
    },
  ],
};
