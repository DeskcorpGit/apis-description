import type { ApiData } from '@/types/api';

export const paymentosApis: ApiData = {
  title: 'PaymentOS - Coleção Completa de APIs Pix',
  description:
    'Conjunto completo de APIs do ecossistema PaymentOS para o SPI/BACEN (Pix): autenticação, DICT, crédito inbound, MED/fraude/devoluções, QR Codes (dinâmico, COBV, composto) e operações de observabilidade e proxy de core bancário.',
  endpoints: [
    {
      method: 'POST',
      path: '/auth/realms/ledgeros/protocol/openid-connect/token',
      summary: 'Obter Token de Acesso',
      description:
        'Gera o token via client_credentials com os scopes necessários (ex: pix:create pix:read).[cite: 1, 2]',
      parameters: [
        {
          name: 'Content-Type',
          in: 'header',
          required: true,
          type: 'string',
          description: 'application/x-www-form-urlencoded[cite: 1]',
        },
      ],
      responses: [
        {
          statusCode: '200',
          description: 'Token obtido com sucesso[cite: 1, 2]',
          example: '{"access_token": "eyJhbG..."}',
        },
      ],
      tags: ['Auth'],
    },
    {
      method: 'POST',
      path: '/paymentos/jdpi/dict/reivindicacao/incluir',
      summary: 'Incluir Reivindicação',
      description:
        'Cria a reivindicação (retorna idReivindicacao). Aparece flagada só na chave do doador.[cite: 5]',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [
        { statusCode: '200', description: 'Reivindicação criada[cite: 5]' },
      ],
      tags: ['DICT Reivindicações'],
    },
    {
      method: 'POST',
      path: '/paymentos/jdpi/dict/reivindicacao/listar',
      summary: 'Listar Reivindicações',
      description:
        'Lista as reivindicações iniciadas (ehReivindicador=true).[cite: 5]',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [
        {
          statusCode: '200',
          description:
            'Array contendo objetos com idReivindicacao e chave[cite: 5]',
        },
      ],
      tags: ['DICT Reivindicações'],
    },
    {
      method: 'POST',
      path: '/paymentos/jdpi/dict/reivindicacao/{idReivindicacao}/cancelar',
      summary: 'Cancelar Reivindicação',
      description: 'Cancela reivindicação iniciada (motivo=0).[cite: 5]',
      parameters: [
        { name: 'idReivindicacao', in: 'path', required: true, type: 'string' },
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [
        { statusCode: '200', description: 'Reivindicação cancelada[cite: 5]' },
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
        'Validação síncrona prévia. Chave-Idempotencia opcional nesta etapa.[cite: 23, 24]',
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
      responses: [
        {
          statusCode: '200',
          description:
            'Retorna {resultado: 1} se válido ou 0 c/ motivo se inválido[cite: 23, 24]',
        },
      ],
      tags: ['Webhooks Crédito'],
    },
    {
      method: 'POST',
      path: '/jdpi/webhook/credito',
      summary: 'Registrar Crédito (9.3.2)',
      description:
        'Efetiva a claim-before-credit. Exige Chave-Idempotencia (retorna 400 JDPI0001 sem ela). Replays da mesma chave geram ack 200 síncrono para idempotência (sem re-creditar).[cite: 23, 24]',
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
      responses: [
        {
          statusCode: '200',
          description:
            'Registrado com sucesso (retorna idCreditoSgct)[cite: 23, 24]',
        },
        {
          statusCode: '400',
          description: 'Falta Chave-Idempotencia[cite: 23, 24]',
        },
        {
          statusCode: '502',
          description:
            'Falha de processamento core (ex: conta não cadastrada no Temenos)[cite: 22, 24]',
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
        'Lista contestações filtradas. Papel ledger-viewer necessário.[cite: 2]',
      parameters: [
        { name: 'coreCustomerId', in: 'query', required: true, type: 'string' },
        { name: 'accountNumber', in: 'query', required: false, type: 'string' },
        {
          name: 'status',
          in: 'query',
          required: false,
          type: 'string',
          description: 'EM_ANALISE | APROVADO | REJEITADA | CANCELADA[cite: 2]',
        },
        { name: 'limit', in: 'query', required: false, type: 'number' },
      ],
      responses: [
        {
          statusCode: '200',
          description: 'Retorna {total, count, contestations[]}[cite: 2]',
        },
        {
          statusCode: '400',
          description: 'status inválido ou sem chaves obrigatórias[cite: 2]',
        },
      ],
      tags: ['Contestação'],
    },
    {
      method: 'POST',
      path: '/jdpi/med/contestacao',
      summary: 'Criar Contestação',
      description:
        'A janela de contestação é de 80 dias (medida sobre instante no endToEndId).[cite: 2]',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [
        {
          statusCode: '201',
          description: 'Criado com sucesso. Status inicial EM_ANALISE[cite: 2]',
        },
        {
          statusCode: '422',
          description: 'Fora da janela de 80 dias[cite: 2]',
        },
      ],
      tags: ['Contestação'],
    },
    {
      method: 'POST',
      path: '/jdpi/med/contestacao/{id}/decide',
      summary: 'Decisão do Analista',
      description:
        'Grava APROVADO/REJEITADA. 409 ao tentar redecidir. Papel ledger-operator/admin[cite: 2]',
      parameters: [
        { name: 'id', in: 'path', required: true, type: 'string' },
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [
        {
          statusCode: '200',
          description:
            'Sucesso, retorna trilha (decidedBy, decidedAt)[cite: 2]',
        },
        {
          statusCode: '400',
          description:
            'Bad Request (decision inválida ou falta decidedBy)[cite: 2]',
        },
        { statusCode: '404', description: 'ID inexistente[cite: 2]' },
        {
          statusCode: '409',
          description: 'Conflito (não sobrescreve 1ª decisão)[cite: 2]',
        },
      ],
      tags: ['Contestação'],
    },
    {
      method: 'POST',
      path: '/jdpi/med/contestacao/{id}/cancel',
      summary: 'Cancelar Contestação',
      description:
        'Apenas aplicável a contestações ativas. É idempotente.[cite: 2]',
      parameters: [{ name: 'id', in: 'path', required: true, type: 'string' }],
      responses: [
        { statusCode: '200', description: 'Status CANCELADA[cite: 2]' },
        { statusCode: '404', description: 'ID inexistente[cite: 2]' },
        {
          statusCode: '409',
          description: 'Conflito (se já não está EM_ANALISE)[cite: 2]',
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
          description: 'Traz campos do contrato e trilha se decidida[cite: 2]',
        },
        { statusCode: '404', description: 'ID inexistente[cite: 2]' },
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
        'Quando pagador e recebedor estão no mesmo ISPB. Sem BACEN. Exige beneficiaryAccountId.[cite: 3]',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
        { name: 'companyId', in: 'header', required: true, type: 'string' },
        { name: 'channelId', in: 'header', required: true, type: 'string' },
        { name: 'userId', in: 'header', required: true, type: 'string' },
      ],
      responses: [
        {
          statusCode: '202',
          description: 'Aceito. Flow=intra, rail=temenos[cite: 3]',
        },
        {
          statusCode: '400',
          description: 'Falha se não conter beneficiaryAccountId[cite: 3]',
        },
      ],
      tags: ['Devoluções'],
    },
    {
      method: 'POST',
      path: '/jdpi/spi/op/devolucao/pixout',
      summary: 'Devolução PIXOUT (PIXREVE)',
      description:
        'Devolve um PIX-out em uma chamada (orderInitiationType=PIXREVE, submitOrder=YES)[cite: 3]',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [{ statusCode: '202', description: 'Aceito[cite: 3]' }],
      tags: ['Devoluções'],
    },
    {
      method: 'POST',
      path: '/jdpi/spi/op/devolucao/med',
      summary: 'Devolução MED (PIXMED) - 2 Passos',
      description:
        'Orquestra os 2 passos: Cria retida PIXMED e submete com orderingReference.[cite: 4]',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
        { name: 'companyId', in: 'header', required: false, type: 'string' },
        { name: 'channelId', in: 'header', required: false, type: 'string' },
        { name: 'userId', in: 'header', required: false, type: 'string' },
      ],
      responses: [
        {
          statusCode: '202',
          description: 'Aceito (submitted ou held_unsubmitted)[cite: 4]',
        },
        {
          statusCode: '400',
          description:
            'Falha sem orderingReference ou uniqueTransactionReference[cite: 4]',
        },
      ],
      tags: ['Devoluções'],
    },
    {
      method: 'POST',
      path: '/jdpi/devolucao/incluir',
      summary: 'Incluir Devolução MED (PIX)',
      description:
        'valorDevolucao >= 0.01. dtHrRequisicaoPsp deve ser data REAL[cite: 7]',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [
        {
          statusCode: '200',
          description: 'Devolução iniciada, retorna idSolDevolucao[cite: 7]',
        },
      ],
      tags: ['MED PIX'],
    },
    {
      method: 'GET',
      path: '/jdpi/devolucao/consultar',
      summary: 'Consultar Devolução MED',
      parameters: [
        { name: 'ispb', in: 'query', required: true, type: 'string' },
        { name: 'idSolDevolucao', in: 'query', required: true, type: 'string' },
      ],
      responses: [{ statusCode: '200', description: 'Sucesso[cite: 7]' }],
      tags: ['MED PIX'],
    },
    {
      method: 'GET',
      path: '/jdpi/devolucao/listar',
      summary: 'Listar Devoluções MED',
      description: 'tpPsp=0; tpPsp=1 pode causar 502 na HML[cite: 7]',
      parameters: [
        { name: 'ispb', in: 'query', required: true, type: 'string' },
        { name: 'tpPsp', in: 'query', required: true, type: 'number' },
        { name: 'pagina', in: 'query', required: false, type: 'number' },
        { name: 'tamanhoPagina', in: 'query', required: false, type: 'number' },
      ],
      responses: [
        { statusCode: '200', description: 'Lista de devoluções[cite: 7]' },
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
        'Cria sobre um CPF/CNPJ. Se chave enviada, tem que casar com cpfCnpj.[cite: 6]',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [
        {
          statusCode: '200',
          description: 'Sucesso, retorna idMarcacaoFraude[cite: 6]',
        },
        { statusCode: '201', description: 'Criado[cite: 6]' },
        {
          statusCode: '502',
          description: 'Erro transitório se upstream indisponível[cite: 6]',
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
          description: 'Retorna { marcacoesInfracao: [...] }[cite: 6]',
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
      responses: [
        { statusCode: '200', description: 'Status atualizado[cite: 6]' },
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
        'Cria relato. email e telefone são obrigatórios se o bloco existir. Retorna 404 em HML devido a falha de upstream.[cite: 6]',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [
        {
          statusCode: '200',
          description: 'Sucesso (idRelatoInfracao gerado)[cite: 6]',
        },
        {
          statusCode: '404',
          description: 'Rota ausente no upstream HML[cite: 6]',
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
          description: 'Retorna array { reporteInfracao: [...] }[cite: 6]',
        },
      ],
      tags: ['Relato Infração'],
    },
    {
      method: 'GET',
      path: '/jdpi/relato-infracao/consultar',
      summary: 'Consultar Relato por ID',
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
        { statusCode: '200', description: 'Detalhes do relato[cite: 6]' },
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
      responses: [
        {
          statusCode: '200',
          description: 'idRecValores gerado com sucesso[cite: 7]',
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
      description: 'Requer urlJwk. Retorna payloadBase64.[cite: 18, 19]',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [
        { statusCode: '200', description: 'Sucesso[cite: 18, 19]' },
        {
          statusCode: '400',
          description: 'Erro por falta de hostJku[cite: 18]',
        },
      ],
      tags: ['QR Code'],
    },
    {
      method: 'PUT',
      path: '/jdpi/qrcode/dinamico/{idDocumento}',
      summary: 'Atualizar QR Dinâmico',
      description:
        'Substituição total. O que não for enviado some. Requer urlPayloadJson, urlJwk, chave, cidade, etc.[cite: 18, 19]',
      parameters: [
        { name: 'idDocumento', in: 'path', required: true, type: 'string' },
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [{ statusCode: '200', description: 'Sucesso[cite: 18, 19]' }],
      tags: ['QR Code'],
    },
    {
      method: 'POST',
      path: '/jdpi/qrcode/dinamico/cobv/gerar',
      summary: 'Gerar QR COBV',
      description:
        'Não assina (não requer urlJwk imediato). A assinatura ocorre em passo posterior.[cite: 18, 19]',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [
        {
          statusCode: '200',
          description: 'Sucesso (gera idDocumento)[cite: 18, 19]',
        },
      ],
      tags: ['QR Code'],
    },
    {
      method: 'POST',
      path: '/jdpi/qrcode/dinamico/cobv/jws',
      summary: 'Assinar COBV (JWS)',
      description:
        'Assina o payload gerando um header alg PS512 baseado no certificado.[cite: 18, 19]',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [
        {
          statusCode: '200',
          description: 'Retorna payloadJws assinado[cite: 18, 19]',
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
      responses: [
        {
          statusCode: '200',
          description: 'Retorna payloadJws assinado[cite: 18, 19]',
        },
      ],
      tags: ['QR Code'],
    },
    {
      method: 'PUT',
      path: '/jdpi/qrcode/dinamico/cobv/{idDocumento}',
      summary: 'Atualizar QR COBV',
      description:
        'Substituição total. Requer valorFinal, dtVenc, etc.[cite: 18, 19]',
      parameters: [
        { name: 'idDocumento', in: 'path', required: true, type: 'string' },
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [
        { statusCode: '200', description: 'Atualizado[cite: 18, 19]' },
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
        'Requer três URLs (urlJwk, urlPayloadJson, urlPayloadJsonRec). txid <= 25 chars.[cite: 18, 19]',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [{ statusCode: '200', description: 'Sucesso[cite: 18, 19]' }],
      tags: ['QR Composto'],
    },
    {
      method: 'POST',
      path: '/jdpi/qrcode/composto/estatico/gerar',
      summary: 'Gerar QR Composto Estático',
      description:
        'txid <= 25 chars. Exige dadosRecorrencia completos.[cite: 19]',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [{ statusCode: '200', description: 'Sucesso[cite: 19]' }],
      tags: ['QR Composto'],
    },
    {
      method: 'POST',
      path: '/jdpi/qrcode/composto/dinamico/gerar',
      summary: 'Gerar QR Composto Dinâmico',
      description:
        'txid 26 a 35 chars. Omitir dadosRecorrencia causa erro 500 no JDPI.[cite: 18, 19]',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [{ statusCode: '200', description: 'Sucesso[cite: 18, 19]' }],
      tags: ['QR Composto'],
    },
    {
      method: 'POST',
      path: '/jdpi/qrcode/composto/dinamico/cobv/gerar',
      summary: 'Gerar QR Composto COBV',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [{ statusCode: '200', description: 'Sucesso[cite: 18, 19]' }],
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
      responses: [{ statusCode: '200', description: 'Sucesso[cite: 19]' }],
      tags: ['QR Composto'],
    },
    {
      method: 'PUT',
      path: '/jdpi/qrcode/composto/dinamico/{idDocumento}',
      summary: 'Atualizar QR Composto Dinâmico',
      description: 'dadosRecorrencia.stRecorrencia é obrigatório.[cite: 19]',
      parameters: [
        { name: 'idDocumento', in: 'path', required: true, type: 'string' },
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [{ statusCode: '200', description: 'Sucesso[cite: 19]' }],
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
      responses: [{ statusCode: '200', description: 'Sucesso[cite: 19]' }],
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
            'Retorna o JOSE payloadJws para PSP pagador (Cadeia Pública)[cite: 18]',
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
        { statusCode: '501', description: 'Resolver em implantação[cite: 18]' },
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
          description: 'Pendente de montagem no domínio real[cite: 18]',
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
      summary: 'Consultar Status Temenos',
      description:
        'Acessa diretamente o status da order no Transact.[cite: 23, 24]',
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
            'Status atual (completed, pending, failed) e body original (se raw=true)[cite: 23, 24]',
        },
      ],
      tags: ['Core Proxy'],
    },
    {
      method: 'GET',
      path: '/jdpi/spi/banklink/saldo',
      summary: 'Consultar Saldo Banklink',
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
            'Retorna saldoDisponivel e saldoBloqueadoJudicial[cite: 23, 24]',
        },
      ],
      tags: ['Core Proxy'],
    },
    {
      method: 'POST',
      path: '/v1/temenos/order/payment-orders',
      summary: 'Proxy RAW Payment Order Temenos',
      description:
        'Envia requisição crua para o Transact. Valida contas e headers.[cite: 22, 24]',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [
        {
          statusCode: '200',
          description: 'JSON original processado pelo T24[cite: 22, 24]',
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
      summary: 'Trace Inbound PIX',
      parameters: [
        { name: 'Authorization', in: 'header', required: true, type: 'string' },
        { name: 'endToEndId', in: 'query', required: true, type: 'string' },
      ],
      responses: [
        {
          statusCode: '200',
          description: 'Cadeia t02..t05 do crédito[cite: 23, 24]',
        },
      ],
      tags: ['Observability'],
    },
    {
      method: 'GET',
      path: '/v1/ops/observability/inbound-credit/dlq',
      summary: 'Consultar Filas DLQ',
      description:
        'Linhas de crédito não confirmados. Suporta rails TED e PIX.[cite: 23, 24]',
      parameters: [
        { name: 'Authorization', in: 'header', required: true, type: 'string' },
        { name: 'rail', in: 'query', required: true, type: 'string' },
        { name: 'limit', in: 'query', required: false, type: 'string' },
      ],
      responses: [
        {
          statusCode: '200',
          description: 'Registros enfileirados[cite: 23, 24]',
        },
      ],
      tags: ['Observability'],
    },
    {
      method: 'GET',
      path: '/v1/ops/observability/inbound-credit/dlq/summary',
      summary: 'Resumo Filas DLQ',
      parameters: [
        { name: 'Authorization', in: 'header', required: true, type: 'string' },
      ],
      responses: [
        {
          statusCode: '200',
          description: 'Aggregates por status e rail[cite: 23, 24]',
        },
      ],
      tags: ['Observability'],
    },
    {
      method: 'GET',
      path: '/v1/ops/observability/audit/core-banking-errors',
      summary: 'Auditoria Erros Bancários',
      parameters: [
        { name: 'Authorization', in: 'header', required: true, type: 'string' },
        { name: 'limit', in: 'query', required: false, type: 'string' },
      ],
      responses: [
        {
          statusCode: '200',
          description: 'Logs de auditoria de integração core[cite: 23, 24]',
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
        'Injeta pacote STR0008R2 na fila de entrada MQ para simulação de recebimentos em ambiente não-produtivo.[cite: 23, 24]',
      parameters: [
        { name: 'Content-Type', in: 'header', required: true, type: 'string' },
      ],
      responses: [
        {
          statusCode: '202',
          description: 'Aceito no MQ (Retorna NumCtrlSTR)[cite: 23, 24]',
        },
      ],
      tags: ['Testing'],
    },
  ],
};
