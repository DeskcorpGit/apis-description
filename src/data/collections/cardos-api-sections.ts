import type { ApiData } from '@/types/api';

export const cardosApiSections: ApiData[] = [
  {
    title: '00 · Smoke — comece por aqui',
    baseUrl: 'https://cardos-uat.corebanxapp.com.br',
    partner: 'Corebanx',
    description:
      'Sequência mínima de verificação. Rode **em ordem**; ela popula `cardId`, `programId` e `cardholderId` para o resto da collection.\n\n1. **Serviço no ar** — sem credencial.\n2. **Credencial válida** — se der `401`, a chave está errada; se der `400 invalid ledger_id`, a chave está certa e falta o `ledger_id`.\n3. Programas e portadores — insumos para emitir cartão.',
    endpoints: [
      {
        method: 'GET',
        path: '/healthz',
        summary: '1. Serviço no ar (healthz)',
        description:
          'Público. `{"status":"UP","components":{"database":"UP"}}` com 200, ou `DOWN` com 503.',
        tags: ['00 · Smoke — comece por aqui'],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
      },
      {
        method: 'GET',
        path: '/v1/cards',
        summary: '2. Credencial + tenant (list cards)',
        description:
          'Se responder 200, você está integrado. 401 = chave errada · 400 = falta `ledger_id`.\n\nResposta: `{"cards":[…],"total":N}`. O script salva `cardId`, `cardholderId` e `programId` do primeiro cartão — é daqui que saem os IDs para emitir outro (**não existe `GET /v1/cardholders`**; o portador só é navegável pelos cartões).',
        tags: ['00 · Smoke — comece por aqui'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
          },
        ],
      },
      {
        method: 'GET',
        path: '/v1/programs',
        summary: '3. Programas (program_id p/ emitir)',
        description:
          'O `program_id` de `POST /v1/cards` sai daqui — é a fonte autoritativa.',
        tags: ['00 · Smoke — comece por aqui'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
          },
        ],
      },
      {
        method: 'GET',
        path: '/v1/cards/{cardId}',
        summary: '4. Detalhe do cartão (valida o encadeamento)',
        description:
          'Usa o `{{cardId}}` que o passo 2 salvou. Se responder 200, as variáveis estão encadeando e o resto da collection funciona sem edição manual.',
        tags: ['00 · Smoke — comece por aqui'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
          },
        ],
      },
    ],
  },
  {
    title: 'Cards',
    baseUrl: 'https://cardos-uat.corebanxapp.com.br',
    partner: 'Corebanx',
    description:
      'Card lifecycle — issuance, activation, freeze/unfreeze, lock/unlock, controls, limits, replacement.',
    endpoints: [
      {
        method: 'POST',
        path: '/v1/card/proposals',
        summary: 'Cria uma proposta de cartão no parceiro emissor (AsapTech)',
        description:
          'Porta de entrada da emissão (T-45.1.1). Dispara a cadeia proposta -> cofre de tokens -> mapa de identidade.\nDEDUPLICACAO: o POST /proposals do parceiro NAO aceita chave de idempotencia, entao um segundo envio criaria OUTRA CONTA BANCARIA para a mesma pessoa. O CardOS recusa com 409 PROPOSAL_DUPLICATE quando o documento ja tem proposta NA MESMA organizacao. A rota e classificada como financeira e e fail-closed: sem Idempotency-Key, e recusada.\nCATALOGO: productUuid, cardKitId e demais identificadores do parceiro vem da configuracao do ambiente e NAO sao aceitos no corpo.\n\n`POST /v1/card/proposals` · operationId `createCardProposal`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `201` — Proposta criada.\n- `400` — Campos obrigatorios ausentes (a resposta diz quais).\n- `401` — Organizacao nao resolvida a partir da credencial.\n- `409` — Documento ja tem proposta nesta organizacao (code: PROPOSAL_DUPLICATE).\n- `502` — Falha ao criar a proposta no parceiro.',
        tags: ['Cards', 'card'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Idempotency-Key',
            in: 'header',
            required: true,
            type: 'string',
            description: '{{$guid}}',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "holder_document": "12345678909",\n  "holder_name": "MARIA SILVA",\n  "printed_name": "MARIA SILVA",\n  "email": "maria.silva@example.com",\n  "phone": "+5561999990000",\n  "birthday": "1990-01-15",\n  "street": "SBS Quadra 1",\n  "number": "100",\n  "neighborhood": "Asa Sul",\n  "city": "Brasília",\n  "region": "DF",\n  "postal_code": "70070100",\n  "country": "BR",\n  "branch": "0001",\n  "account_number": "9001001",\n  "due_date": "2026-09-15"\n}',
      },
      {
        method: 'GET',
        path: '/v1/cards',
        summary: 'List cards',
        description:
          "`GET /v1/cards` · operationId `listCards`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Paged list of cards in the caller's tenant.\n- `401` — Missing or invalid authentication.\n- `403` — Authenticated but not allowed (tenant isolation, scope check, mTLS missing).\n- `429` — Rate-limit hit. Retry after `Retry-After` header.\n- `5XX` — Internal error. Correlation ID in body for support.",
        tags: ['Cards', 'cards'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/cards',
        summary: 'Issue a new card',
        description:
          '`POST /v1/cards` · operationId `createCard`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `201` — Card created. New cards start in `PENDING_ISSUANCE` (virtual) or `PENDING_ACTIVATION` (physical).\n- `400` — Validation failure or malformed request body.\n- `401` — Missing or invalid authentication.\n- `403` — Authenticated but not allowed (tenant isolation, scope check, mTLS missing).\n- `409` — State-machine violation or duplicate resource.\n- `5XX` — Internal error. Correlation ID in body for support.',
        tags: ['Cards', 'cards'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "program_id": "{{programId}}",\n  "cardholder_id": "{{cardholderId}}",\n  "cardholder_name": "MARIA SILVA",\n  "card_type": "VIRTUAL",\n  "card_config": "REVENU_VIRTUAL",\n  "label": "Cartão Postman",\n  "last_four_digits": "1234",\n  "expiry_month": 12,\n  "expiry_year": 2030,\n  "daily_limit": "6000.00",\n  "monthly_limit": "60000.00",\n  "transaction_limit": "2000.00",\n  "currency": "BRL",\n  "controls": {\n    "contactless_enabled": true,\n    "international_enabled": true,\n    "online_enabled": true,\n    "withdrawal_enabled": true\n  }\n}',
      },
      {
        method: 'GET',
        path: '/v1/cards/{cardId}',
        summary: 'Get a card by ID',
        description:
          "`GET /v1/cards/{id}` · operationId `getCard`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Card.\n- `404` — Resource not found within the caller's tenant.\n- `401` — Missing or invalid authentication.\n- `403` — Authenticated but not allowed (tenant isolation, scope check, mTLS missing).\n- `5XX` — Internal error. Correlation ID in body for support.",
        tags: ['Cards', 'cards'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/cards/{cardId}/activate',
        summary: 'Activate a card (transitions to `ACTIVE`)',
        description:
          "`POST /v1/cards/{id}/activate` · operationId `activateCard`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Card transitioned to ACTIVE.\n- `404` — Resource not found within the caller's tenant.\n- `409` — Card is not in an activatable state (per CardStatus transitions).\n- `401` — Missing or invalid authentication.\n- `403` — Authenticated but not allowed (tenant isolation, scope check, mTLS missing).\n- `5XX` — Internal error. Correlation ID in body for support.",
        tags: ['Cards', 'cards'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody: '{}',
      },
      {
        method: 'POST',
        path: '/v1/cards/{cardId}/freeze',
        summary: 'Freeze a card → FROZEN (reversible hold)',
        description:
          "Transitions the card to FROZEN. The endpoint (not the body) decides the state: `/freeze` always yields FROZEN, `/lock` always yields LOCKED. `reason` is audit text only and does not select the state.\n\n`POST /v1/cards/{id}/freeze` · operationId `freezeCard`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Card transitioned to FROZEN. Returns to ACTIVE via `/unfreeze`.\n- `404` — Resource not found within the caller's tenant.\n- `409` — State-machine violation or duplicate resource.\n- `401` — Missing or invalid authentication.\n- `403` — Authenticated but not allowed (tenant isolation, scope check, mTLS missing).\n- `5XX` — Internal error. Correlation ID in body for support.",
        tags: ['Cards', 'cards'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody: '{\n  "reason": "LOST"\n}',
      },
      {
        method: 'POST',
        path: '/v1/cards/{cardId}/unfreeze',
        summary: 'Unfreeze a card (back to `ACTIVE`)',
        description:
          "`POST /v1/cards/{id}/unfreeze` · operationId `unfreezeCard`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Card transitioned to ACTIVE.\n- `404` — Resource not found within the caller's tenant.\n- `409` — State-machine violation or duplicate resource.\n- `401` — Missing or invalid authentication.\n- `403` — Authenticated but not allowed (tenant isolation, scope check, mTLS missing).\n- `5XX` — Internal error. Correlation ID in body for support.",
        tags: ['Cards', 'cards'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody: '{}',
      },
      {
        method: 'POST',
        path: '/v1/cards/{cardId}/replace',
        summary:
          'Replace a card. Old card transitions to `REPLACED`; a new card is issued',
        description:
          "`POST /v1/cards/{id}/replace` · operationId `replaceCard`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `201` — Replacement card issued.\n- `404` — Resource not found within the caller's tenant.\n- `409` — State-machine violation or duplicate resource.\n- `401` — Missing or invalid authentication.\n- `403` — Authenticated but not allowed (tenant isolation, scope check, mTLS missing).\n- `5XX` — Internal error. Correlation ID in body for support.",
        tags: ['Cards', 'cards'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody: '{\n  "reason": "LOST"\n}',
      },
      {
        method: 'POST',
        path: '/v1/cards/{cardId}/lock',
        summary: 'Lock a card → LOCKED (manual / system / controls-driven)',
        description:
          "Transitions the card to LOCKED. The endpoint (not the body) decides the state: `/lock` always yields LOCKED, `/freeze` always yields FROZEN. `reason` is audit text only and does not select the state.\n\n`POST /v1/cards/{id}/lock` · operationId `lockCard`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.\n- `409` — State-machine violation or duplicate resource.",
        tags: ['Cards', 'cards'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody: '{\n  "reason": "LOST"\n}',
      },
      {
        method: 'POST',
        path: '/v1/cards/{cardId}/unlock',
        summary: 'Unlock a locked card',
        description:
          "`POST /v1/cards/{id}/unlock` · operationId `unlockCard`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.\n- `409` — State-machine violation or duplicate resource.",
        tags: ['Cards', 'cards'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody: '{}',
      },
      {
        method: 'POST',
        path: '/v1/cards/{cardId}/cancel',
        summary: 'Cancel a card (terminal)',
        description:
          "`POST /v1/cards/{id}/cancel` · operationId `cancelCard`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/issuance/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.\n- `409` — State-machine violation or duplicate resource.",
        tags: ['Cards', 'cards'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody: '{\n  "reason": "LOST"\n}',
      },
      {
        method: 'POST',
        path: '/v1/cards/{cardId}/terminate',
        summary:
          'Terminate a card (terminal — distinct from cancel for irreversibility audit)',
        description:
          "`POST /v1/cards/{id}/terminate` · operationId `terminateCard`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `400` — Validation failure or malformed request body.\n- `404` — Resource not found within the caller's tenant.\n- `409` — State-machine violation or duplicate resource.",
        tags: ['Cards', 'cards'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody: '{\n  "reason": "LOST"\n}',
      },
      {
        method: 'PUT',
        path: '/v1/cards/{cardId}/label',
        summary: "Update the card's display label",
        description:
          "`PUT /v1/cards/{id}/label` · operationId `updateCardLabel`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/issuance/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Cards', 'cards'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody: '{\n  "label": "Cartão Postman"\n}',
      },
      {
        method: 'PUT',
        path: '/v1/cards/{cardId}/limits',
        summary:
          'Update card spending limits (daily / monthly / renew frequency)',
        description:
          "`PUT /v1/cards/{id}/limits` · operationId `updateCardLimits`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/issuance/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.\n- `409` — State-machine violation or duplicate resource.",
        tags: ['Cards', 'cards'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "daily_limit": "100.00",\n  "monthly_limit": "100.00",\n  "transaction_limit": "100.00"\n}',
      },
      {
        method: 'PUT',
        path: '/v1/cards/{cardId}/controls',
        summary:
          'Update card controls (MCC restrictions, country allow-list, online/contactless toggles)',
        description:
          "`PUT /v1/cards/{id}/controls` · operationId `updateCardControls`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/issuance/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Cards', 'cards'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "contactless_enabled": true,\n  "international_enabled": true,\n  "online_enabled": true,\n  "withdrawal_enabled": true\n}',
      },
      {
        method: 'GET',
        path: '/v1/cardholders/{cardholderId}/cards',
        summary: "List a cardholder's cards",
        description:
          "`GET /v1/cardholders/{cardholder_id}/cards` · operationId `listCardsByCardholder`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Cards', 'cardholders'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
      },
      {
        method: 'GET',
        path: '/v1/programs/{programId}/cards',
        summary: 'List cards under a card program',
        description:
          "`GET /v1/programs/{program_id}/cards` · operationId `listCardsByProgram`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Cards', 'programs'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
      },
    ],
  },
  {
    title: 'Transactions',
    baseUrl: 'https://cardos-uat.corebanxapp.com.br',
    partner: 'Corebanx',
    description:
      'Card transaction authorization, confirmation, booking, reversal, and queries.',
    endpoints: [
      {
        method: 'POST',
        path: '/v1/transactions/authorize',
        summary: 'Authorize a card transaction (hot path — < 1 ms p99 target)',
        description:
          '`POST /v1/transactions/authorize` · operationId `authorizeTransaction`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `201` — Authorization decision. `PENDING` = approved (awaiting clearing); `DECLINED` carries `decline_reason`.\n- `400` — Validation failure or malformed request body.\n- `401` — Missing or invalid authentication.\n- `403` — Authenticated but not allowed (tenant isolation, scope check, mTLS missing).\n- `429` — Rate-limit hit. Retry after `Retry-After` header.\n- `5XX` — Internal error. Correlation ID in body for support.',
        tags: ['Transactions'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "card_id": "{{cardId}}",\n  "external_id": "6f9d2b1e-1c5a-4f8b-9e3d-7c2a8f4e6d1b",\n  "amount": {\n    "amount": "150.00",\n    "currency": "BRL"\n  },\n  "currency": "BRL",\n  "merchant_name": "LOJA TESTE",\n  "merchant_category_code": "5411",\n  "merchant_city": "BRASILIA",\n  "merchant_country": "BR",\n  "auth_code": "123456",\n  "transaction_type": "PURCHASE",\n  "card_present": true\n}',
      },
      {
        method: 'POST',
        path: '/v1/transactions/{transactionId}/confirm',
        summary: 'Confirm a pending transaction (clearing received)',
        description:
          "`POST /v1/transactions/{id}/confirm` · operationId `confirmTransaction`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Transaction transitioned to CONFIRMED.\n- `404` — Resource not found within the caller's tenant.\n- `409` — State-machine violation or duplicate resource.\n- `401` — Missing or invalid authentication.\n- `403` — Authenticated but not allowed (tenant isolation, scope check, mTLS missing).\n- `5XX` — Internal error. Correlation ID in body for support.",
        tags: ['Transactions'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody: '{}',
      },
      {
        method: 'POST',
        path: '/v1/transactions/{transactionId}/reverse',
        summary: 'Reverse a pending or confirmed transaction',
        description:
          "`POST /v1/transactions/{id}/reverse` · operationId `reverseTransaction`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Transaction transitioned to REVERSED.\n- `404` — Resource not found within the caller's tenant.\n- `409` — State-machine violation or duplicate resource.\n- `401` — Missing or invalid authentication.\n- `403` — Authenticated but not allowed (tenant isolation, scope check, mTLS missing).\n- `5XX` — Internal error. Correlation ID in body for support.",
        tags: ['Transactions'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody: '{\n  "reason": "LOST"\n}',
      },
      {
        method: 'POST',
        path: '/v1/transactions/{transactionId}/book',
        summary: 'Book a confirmed transaction into the ledger (terminal)',
        description:
          "`POST /v1/transactions/{id}/book` · operationId `bookTransaction`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/transaction/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Transaction transitioned to BOOKED.\n- `404` — Resource not found within the caller's tenant.\n- `409` — State-machine violation or duplicate resource.\n- `401` — Missing or invalid authentication.\n- `403` — Authenticated but not allowed (tenant isolation, scope check, mTLS missing).\n- `5XX` — Internal error. Correlation ID in body for support.",
        tags: ['Transactions'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "settled_amount": "100.00",\n  "currency": "BRL",\n  "interchange_fee": "1.50"\n}',
      },
      {
        method: 'GET',
        path: '/v1/transactions/{transactionId}',
        summary: 'Get a transaction by ID',
        description:
          "`GET /v1/transactions/{id}` · operationId `getTransaction`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Transaction.\n- `404` — Resource not found within the caller's tenant.\n- `401` — Missing or invalid authentication.\n- `403` — Authenticated but not allowed (tenant isolation, scope check, mTLS missing).\n- `5XX` — Internal error. Correlation ID in body for support.",
        tags: ['Transactions'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
      },
      {
        method: 'GET',
        path: '/v1/cards/{cardId}/transactions',
        summary: 'List transactions for a card',
        description:
          "`GET /v1/cards/{card_id}/transactions` · operationId `listTransactionsByCard`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Transactions'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
      },
      {
        method: 'GET',
        path: '/v1/transactions/by-status',
        summary: 'List transactions filtered by status',
        description:
          '`GET /v1/transactions/by-status` · operationId `listTransactionsByStatus`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.',
        tags: ['Transactions'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
          {
            name: 'status',
            in: 'query',
            required: true,
            type: 'string',
            description: ' (obrigatório)',
          },
        ],
      },
      {
        method: 'PUT',
        path: '/v1/transactions/{transactionId}/category',
        summary: "Set or override a transaction's accounting category",
        description:
          "`PUT /v1/transactions/{id}/category` · operationId `setTransactionCategory`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/transaction/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Transactions'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody: '{\n  "category": "FOOD_AND_DRINKS"\n}',
      },
      {
        method: 'PUT',
        path: '/v1/transactions/{transactionId}/partner-status',
        summary: 'Update the partner-submission status of a transaction',
        description:
          "`PUT /v1/transactions/{id}/partner-status` · operationId `setTransactionPartnerStatus`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/transaction/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Transactions'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody: '{\n  "status": "ACTIVE"\n}',
      },
    ],
  },
  {
    title: 'Organizations',
    baseUrl: 'https://cardos-uat.corebanxapp.com.br',
    partner: 'Corebanx',
    description:
      'Organization onboarding, status transitions, card-account and team management.',
    endpoints: [
      {
        method: 'GET',
        path: '/v1/organizations',
        summary: 'List organizations visible to the caller',
        description:
          '`GET /v1/organizations` · operationId `listOrganizations`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Paged list of organizations.\n- `401` — Missing or invalid authentication.\n- `5XX` — Internal error. Correlation ID in body for support.',
        tags: ['Organizations', 'organizations'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/organizations',
        summary: 'Create a new organization (onboards a new tenant)',
        description:
          '`POST /v1/organizations` · operationId `createOrganization`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `201` — Organization created in `PENDING_APPROVAL`.\n- `400` — Validation failure or malformed request body.\n- `401` — Missing or invalid authentication.\n- `403` — Authenticated but not allowed (tenant isolation, scope check, mTLS missing).\n- `5XX` — Internal error. Correlation ID in body for support.',
        tags: ['Organizations', 'organizations'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "name": "TESTE Postman",\n  "country": "BR",\n  "currency": "BRL",\n  "funding_model": "PREFUND",\n  "credit_limit": {\n    "amount": "150.00",\n    "currency": "BRL"\n  }\n}',
      },
      {
        method: 'GET',
        path: '/v1/organizations/{organizationId}',
        summary: 'Get organization by ID',
        description:
          "`GET /v1/organizations/{id}` · operationId `getOrganization`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Organization.\n- `404` — Resource not found within the caller's tenant.\n- `5XX` — Internal error. Correlation ID in body for support.",
        tags: ['Organizations', 'organizations'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/organizations/{organizationId}/activate',
        summary: 'Activate a pending-approval organization',
        description:
          "`POST /v1/organizations/{id}/activate` · operationId `activateOrganization`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/program/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Organization transitioned to ACTIVE.\n- `404` — Resource not found within the caller's tenant.\n- `409` — State-machine violation or duplicate resource.\n- `5XX` — Internal error. Correlation ID in body for support.",
        tags: ['Organizations', 'organizations'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody: '{\n  "credit_limit": "100.00",\n  "currency": "BRL"\n}',
      },
      {
        method: 'POST',
        path: '/v1/organizations/{organizationId}/credit-limit',
        summary:
          "Adjust an organization's credit limit; cascades proportionally to its card accounts",
        description:
          "`POST /v1/organizations/{id}/credit-limit` · operationId `adjustOrganizationCreditLimit`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.\n- `409` — State-machine violation or duplicate resource.\n- `5XX` — Internal error. Correlation ID in body for support.",
        tags: ['Organizations', 'organizations'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody: '{\n  "new_limit": "50000.00",\n  "currency": "BRL"\n}',
      },
      {
        method: 'POST',
        path: '/v1/organizations/{organizationId}/suspend',
        summary: 'Suspend an active organization',
        description:
          "`POST /v1/organizations/{id}/suspend` · operationId `suspendOrganization`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/program/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Organization transitioned to SUSPENDED.\n- `404` — Resource not found within the caller's tenant.\n- `409` — State-machine violation or duplicate resource.\n- `5XX` — Internal error. Correlation ID in body for support.",
        tags: ['Organizations', 'organizations'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody: '{\n  "reason": "LOST"\n}',
      },
      {
        method: 'POST',
        path: '/v1/organizations/{organizationId}/card-accounts',
        summary: 'Create a card account under an organization',
        description:
          "`POST /v1/organizations/{id}/card-accounts` · operationId `createCardAccount`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/program/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `201` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Organizations', 'organizations'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "name": "TESTE Postman",\n  "currency": "BRL",\n  "account_type": "PREFUND",\n  "payment_frequency": "PREFUNDED"\n}',
      },
      {
        method: 'POST',
        path: '/v1/organizations/{organizationId}/bank-accounts',
        summary:
          'Register a bank account for an organization (prefund / billing / refund, PRD-005)',
        description:
          "`POST /v1/organizations/{id}/bank-accounts` · operationId `createBankAccount`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `201` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `400` — Validation failure or malformed request body.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Organizations', 'organizations'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "beneficiary": "MARIA SILVA",\n  "bank_name": "BASA",\n  "bic": "BASBBRTT",\n  "iban": "BR1500000000000010932840814P2",\n  "transfer_type": "LOCAL"\n}',
      },
      {
        method: 'POST',
        path: '/v1/organizations/{organizationId}/teams',
        summary: 'Create a team under an organization',
        description:
          "`POST /v1/organizations/{id}/teams` · operationId `createTeam`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/program/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `201` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Organizations', 'organizations'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "name": "TESTE Postman",\n  "cost_center": "CC-001"\n}',
      },
      {
        method: 'POST',
        path: '/v1/bank-accounts/{bankAccountId}/close',
        summary: "Close an organization's bank account",
        description:
          "`POST /v1/bank-accounts/{id}/close` · operationId `closeBankAccount`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.\n- `409` — State-machine violation or duplicate resource.",
        tags: ['Organizations', 'bank-accounts'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody: '{}',
      },
      {
        method: 'POST',
        path: '/v1/teams/{teamId}/members',
        summary: 'Add a member (cardholder) to a team',
        description:
          "`POST /v1/teams/{id}/members` · operationId `addTeamMember`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/program/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Organizations', 'teams'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody: '{\n  "cardholder_id": "{{cardholderId}}"\n}',
      },
    ],
  },
  {
    title: 'Cardholders',
    baseUrl: 'https://cardos-uat.corebanxapp.com.br',
    partner: 'Corebanx',
    description: 'Cardholder invitation, registration, deactivation.',
    endpoints: [
      {
        method: 'PUT',
        path: '/v1/cardholders/{cardholderId}',
        summary: "Update a cardholder's profile",
        description:
          "`PUT /v1/cardholders/{id}` · operationId `updateCardholder`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/program/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Cardholders'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "first_name": "TESTE",\n  "last_name": "TESTE",\n  "phone_number": "+5561999990000",\n  "language": "pt-BR",\n  "role": "CARDHOLDER"\n}',
      },
      {
        method: 'POST',
        path: '/v1/cardholders/{cardholderId}/deactivate',
        summary:
          'Deactivate a cardholder (terminal cardholder status INACTIVE)',
        description:
          "`POST /v1/cardholders/{id}/deactivate` · operationId `deactivateCardholder`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/program/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Cardholders'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody: '{\n  "reason": "LOST"\n}',
      },
      {
        method: 'POST',
        path: '/v1/organizations/{organizationId}/cardholders',
        summary: 'Invite a cardholder to an organization (creates in INVITED)',
        description:
          "`POST /v1/organizations/{id}/cardholders` · operationId `inviteCardholder`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/program/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `201` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Cardholders'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "first_name": "TESTE",\n  "last_name": "TESTE",\n  "email": "maria.silva@example.com",\n  "role": "CARDHOLDER"\n}',
      },
      {
        method: 'POST',
        path: '/v1/organizations/{organizationId}/cardholders/register',
        summary:
          'Register a previously-invited cardholder (transitions INVITED → ACTIVE)',
        description:
          "`POST /v1/organizations/{id}/cardholders/register` · operationId `registerCardholder`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/program/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.\n- `409` — State-machine violation or duplicate resource.",
        tags: ['Cardholders'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "first_name": "TESTE",\n  "last_name": "TESTE",\n  "email": "maria.silva@example.com",\n  "role": "CARDHOLDER"\n}',
      },
    ],
  },
  {
    title: 'Programs',
    baseUrl: 'https://cardos-uat.corebanxapp.com.br',
    partner: 'Corebanx',
    description: 'Card-program approval workflow.',
    endpoints: [
      {
        method: 'GET',
        path: '/v1/programs',
        summary: 'List card programs',
        description:
          '`GET /v1/programs` · operationId `listPrograms`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.',
        tags: ['Programs'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/programs',
        summary: 'Create a card program',
        description:
          '`POST /v1/programs` · operationId `createProgram`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/program/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `201` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.',
        tags: ['Programs'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "name": "TESTE Postman",\n  "program_type": "PREPAID",\n  "network_provider": "VISA",\n  "bin_prefix": "400000",\n  "daily_limit": "100.00",\n  "monthly_limit": "100.00",\n  "transaction_limit": "100.00",\n  "currency": "BRL"\n}',
      },
      {
        method: 'GET',
        path: '/v1/programs/{programId}',
        summary: 'Get a card program by ID',
        description:
          "`GET /v1/programs/{id}` · operationId `getProgram`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Programs'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/programs/{programId}/submit',
        summary: 'Submit a draft program for approval',
        description:
          "`POST /v1/programs/{id}/submit` · operationId `submitProgram`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.\n- `409` — State-machine violation or duplicate resource.",
        tags: ['Programs'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody: '{}',
      },
      {
        method: 'POST',
        path: '/v1/programs/{programId}/approve',
        summary: 'Approve a submitted program',
        description:
          "`POST /v1/programs/{id}/approve` · operationId `approveProgram`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.\n- `409` — State-machine violation or duplicate resource.",
        tags: ['Programs'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody: '{}',
      },
      {
        method: 'POST',
        path: '/v1/programs/{programId}/activate',
        summary: 'Activate an approved program',
        description:
          "`POST /v1/programs/{id}/activate` · operationId `activateProgram`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.\n- `409` — State-machine violation or duplicate resource.",
        tags: ['Programs'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody: '{}',
      },
      {
        method: 'POST',
        path: '/v1/programs/{programId}/suspend',
        summary: 'Suspend an active program',
        description:
          "`POST /v1/programs/{id}/suspend` · operationId `suspendProgram`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.\n- `409` — State-machine violation or duplicate resource.",
        tags: ['Programs'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody: '{}',
      },
    ],
  },
  {
    title: 'Payments',
    baseUrl: 'https://cardos-uat.corebanxapp.com.br',
    partner: 'Corebanx',
    description: 'Bill collection, top-ups, payouts, account-entry ledger.',
    endpoints: [
      {
        method: 'GET',
        path: '/v1/payments',
        summary: 'List payments (bills, top-ups, payouts, etc.)',
        description:
          '`GET /v1/payments` · operationId `listPayments`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.',
        tags: ['Payments', 'payments'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
      },
      {
        method: 'GET',
        path: '/v1/payments/{paymentId}',
        summary: 'Get a payment by ID',
        description:
          "`GET /v1/payments/{id}` · operationId `getPayment`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Payments', 'payments'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/payments/bills',
        summary: 'Create a BILL payment (monthly settlement)',
        description:
          '`POST /v1/payments/bills` · operationId `createBill`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/settlement/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `201` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.',
        tags: ['Payments', 'payments'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "card_account_id": "{{cardAccountId}}",\n  "amount": "100.00",\n  "currency": "BRL",\n  "execution_date": "2026-08-17T12:00:00Z"\n}',
      },
      {
        method: 'POST',
        path: '/v1/payments/topups',
        summary: 'Create a TOPUP payment (incoming wire)',
        description:
          '`POST /v1/payments/topups` · operationId `createTopup`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/settlement/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `201` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.',
        tags: ['Payments', 'payments'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "card_account_id": "{{cardAccountId}}",\n  "amount": "100.00",\n  "currency": "BRL",\n  "counterparty_name": "TESTE",\n  "counterparty_iban": "BR1500000000000010932840814P2"\n}',
      },
      {
        method: 'POST',
        path: '/v1/payments/payouts',
        summary: 'Create a PAYOUT payment (outgoing)',
        description:
          '`POST /v1/payments/payouts` · operationId `createPayout`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/settlement/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `201` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.',
        tags: ['Payments', 'payments'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "card_account_id": "{{cardAccountId}}",\n  "amount": "100.00",\n  "currency": "BRL",\n  "counterparty_name": "TESTE",\n  "counterparty_iban": "BR1500000000000010932840814P2",\n  "counterparty_bic": "BASBBRTT",\n  "counterparty_branch": "0001",\n  "counterparty_account": "000000000001",\n  "counterparty_account_type": "CORRENTE"\n}',
      },
      {
        method: 'POST',
        path: '/v1/payments/{paymentId}/collect',
        summary: 'Mark a BILL as collected (SEPA D+N elapsed)',
        description:
          "`POST /v1/payments/{id}/collect` · operationId `collectPayment`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.\n- `409` — State-machine violation or duplicate resource.",
        tags: ['Payments', 'payments'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody: '{}',
      },
      {
        method: 'POST',
        path: '/v1/payments/{paymentId}/confirm',
        summary: 'Confirm a top-up payment (incoming wire verified)',
        description:
          "`POST /v1/payments/{id}/confirm` · operationId `confirmPayment`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.\n- `409` — State-machine violation or duplicate resource.",
        tags: ['Payments', 'payments'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody: '{}',
      },
      {
        method: 'GET',
        path: '/v1/account-entries',
        summary: 'List account-ledger entries',
        description:
          '`GET /v1/account-entries` · operationId `listAccountEntries`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.',
        tags: ['Payments', 'account-entries'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/account-entries',
        summary: 'Create a manual account entry (admin-only)',
        description:
          '`POST /v1/account-entries` · operationId `createAccountEntry`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/settlement/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `201` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.',
        tags: ['Payments', 'account-entries'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "card_account_id": "{{cardAccountId}}",\n  "entry_type": "TRANSACTION",\n  "amount": "100.00",\n  "currency": "BRL",\n  "balance_after": "100.00",\n  "booking_date": "2026-08-17T12:00:00Z",\n  "transaction_id": "{{transactionId}}",\n  "payment_id": "{{paymentId}}",\n  "index": 1\n}',
      },
      {
        method: 'POST',
        path: '/v1/account-entries/{accountEntryId}/reverse',
        summary: 'Reverse an account entry (admin-only)',
        description:
          "`POST /v1/account-entries/{id}/reverse` · operationId `reverseAccountEntry`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/settlement/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Payments', 'account-entries'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "reason": "LOST",\n  "booking_date": "2026-08-17T12:00:00Z"\n}',
      },
      {
        method: 'GET',
        path: '/v1/account-entries/{accountEntryId}',
        summary: 'Get an account entry',
        description:
          "`GET /v1/account-entries/{id}` · operationId `getAccountEntry`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Payments', 'account-entries'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
      },
      {
        method: 'GET',
        path: '/v1/card-accounts/{cardAccountId}/balance',
        summary: 'Get the current balance of a card account',
        description:
          "`GET /v1/card-accounts/{id}/balance` · operationId `getCardAccountBalance`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Payments', 'card-accounts'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
      },
      {
        method: 'GET',
        path: '/v1/card-accounts/{cardAccountId}/current-invoice',
        summary:
          'Get the current invoice (fatura atual) of a card account — the latest billing cycle, with total, due date and transaction count. NOTE: minimum payment and IOF/tax are not modeled (frozen credit scope, M-50)',
        description:
          "`GET /v1/card-accounts/{id}/current-invoice` · operationId `getCurrentInvoice`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Payments', 'card-accounts'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
      },
    ],
  },
  {
    title: 'Statements',
    baseUrl: 'https://cardos-uat.corebanxapp.com.br',
    partner: 'Corebanx',
    description: 'Periodic financial statements per card account.',
    endpoints: [
      {
        method: 'GET',
        path: '/v1/statements/{statementId}',
        summary: 'Get a statement by ID (links to PDF / CSV / camt.053 XML)',
        description:
          "`GET /v1/statements/{id}` · operationId `getStatement`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Statements'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/statements/{statementId}/close',
        summary: 'Close a statement (triggers PDF/CSV/XML generation)',
        description:
          "`POST /v1/statements/{id}/close` · operationId `closeStatement`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/settlement/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.\n- `409` — State-machine violation or duplicate resource.",
        tags: ['Statements'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "closing_balance": "100.00",\n  "currency": "BRL"\n}',
      },
    ],
  },
  {
    title: 'Disputes',
    baseUrl: 'https://cardos-uat.corebanxapp.com.br',
    partner: 'Corebanx',
    description:
      'Cardholder disputes — opening, evidence, investigation, arbitration, resolution.',
    endpoints: [
      {
        method: 'GET',
        path: '/v1/disputes',
        summary: 'List disputes',
        description:
          '`GET /v1/disputes` · operationId `listDisputes`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.',
        tags: ['Disputes'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/disputes',
        summary: 'Open a dispute on a transaction',
        description:
          '`POST /v1/disputes` · operationId `createDispute`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/dispute/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `201` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.',
        tags: ['Disputes'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "card_id": "{{cardId}}",\n  "transaction_id": "{{transactionId}}",\n  "disputed_amount": "100.00",\n  "currency": "BRL",\n  "reason_code": "teste de integração",\n  "description": "criado via Postman"\n}',
      },
      {
        method: 'GET',
        path: '/v1/disputes/{disputeId}',
        summary: 'Get a dispute by ID',
        description:
          "`GET /v1/disputes/{id}` · operationId `getDispute`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Disputes'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
      },
      {
        method: 'GET',
        path: '/v1/cards/{cardId}/disputes',
        summary: 'List disputes for a card',
        description:
          '`GET /v1/cards/{card_id}/disputes` · operationId `listDisputesByCard`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.',
        tags: ['Disputes'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
      },
      {
        method: 'GET',
        path: '/v1/disputes/{disputeId}/evidence',
        summary: 'List evidence attached to a dispute',
        description:
          "`GET /v1/disputes/{id}/evidence` · operationId `listDisputeEvidence`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Disputes'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/disputes/{disputeId}/evidence',
        summary: 'Add evidence to a dispute',
        description:
          "`POST /v1/disputes/{id}/evidence` · operationId `addDisputeEvidence`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/dispute/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `201` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Disputes'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "evidence_type": "RECEIPT",\n  "description": "criado via Postman",\n  "file_url": "https://example.com/webhook",\n  "submitted_by": "postman"\n}',
      },
      {
        method: 'POST',
        path: '/v1/disputes/{disputeId}/investigate',
        summary: 'Transition a dispute into INVESTIGATING',
        description:
          "`POST /v1/disputes/{id}/investigate` · operationId `investigateDispute`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.\n- `409` — State-machine violation or duplicate resource.",
        tags: ['Disputes'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody: '{}',
      },
      {
        method: 'POST',
        path: '/v1/disputes/{disputeId}/arbitrate',
        summary: 'Escalate a dispute to arbitration',
        description:
          "`POST /v1/disputes/{id}/arbitrate` · operationId `arbitrateDispute`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.\n- `409` — State-machine violation or duplicate resource.",
        tags: ['Disputes'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody: '{}',
      },
      {
        method: 'POST',
        path: '/v1/disputes/{disputeId}/provisional-credit',
        summary:
          'Issue a provisional credit to the cardholder pending dispute resolution',
        description:
          "`POST /v1/disputes/{id}/provisional-credit` · operationId `issueProvisionalCredit`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Disputes'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody: '{}',
      },
      {
        method: 'POST',
        path: '/v1/disputes/{disputeId}/resolve',
        summary: 'Resolve a dispute (terminal)',
        description:
          "`POST /v1/disputes/{id}/resolve` · operationId `resolveDispute`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/dispute/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.\n- `409` — State-machine violation or duplicate resource.",
        tags: ['Disputes'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "outcome": "RESOLVED_CUSTOMER",\n  "resolved_by": "postman",\n  "notes": "teste via Postman"\n}',
      },
    ],
  },
  {
    title: 'Accounting',
    baseUrl: 'https://cardos-uat.corebanxapp.com.br',
    partner: 'Corebanx',
    description:
      'GL accounts, VAT rates, projects, suppliers, custom fields, accounting transactions, receipts.',
    endpoints: [
      {
        method: 'GET',
        path: '/v1/gl-accounts',
        summary: 'List GL accounts',
        description:
          '`GET /v1/gl-accounts` · operationId `listGLAccounts`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.',
        tags: ['Accounting', 'gl-accounts'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/gl-accounts',
        summary: 'Create a GL account',
        description:
          '`POST /v1/gl-accounts` · operationId `createGLAccount`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `201` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.',
        tags: ['Accounting', 'gl-accounts'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "name": "TESTE Postman",\n  "account_number": "9001001"\n}',
      },
      {
        method: 'GET',
        path: '/v1/gl-accounts/{glAccountId}',
        summary: 'Get a GL account',
        description:
          "`GET /v1/gl-accounts/{id}` · operationId `getGLAccount`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Accounting', 'gl-accounts'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/vat-rates',
        summary: 'Create a VAT rate',
        description:
          '`POST /v1/vat-rates` · operationId `createVATRate`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `201` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.',
        tags: ['Accounting', 'vat-rates'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "name": "TESTE Postman",\n  "rate": "19.00",\n  "code": "DE-19"\n}',
      },
      {
        method: 'GET',
        path: '/v1/vat-rates/{vatRateId}',
        summary: 'Get a VAT rate',
        description:
          "`GET /v1/vat-rates/{id}` · operationId `getVATRate`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Accounting', 'vat-rates'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/projects',
        summary: 'Create a project / cost unit',
        description:
          '`POST /v1/projects` · operationId `createProject`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `201` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.',
        tags: ['Accounting', 'projects'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "name": "TESTE Postman",\n  "cost_unit": "CC-1000"\n}',
      },
      {
        method: 'GET',
        path: '/v1/projects/{projectId}',
        summary: 'Get a project',
        description:
          "`GET /v1/projects/{id}` · operationId `getProject`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Accounting', 'projects'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
      },
      {
        method: 'PUT',
        path: '/v1/projects/{projectId}',
        summary: 'Update a project',
        description:
          "`PUT /v1/projects/{id}` · operationId `updateProject`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Accounting', 'projects'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "action": "activate",\n  "team_id": "6f9d2b1e-1c5a-4f8b-9e3d-7c2a8f4e6d1b"\n}',
      },
      {
        method: 'POST',
        path: '/v1/suppliers',
        summary: 'Create a supplier',
        description:
          '`POST /v1/suppliers` · operationId `createSupplier`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `201` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.',
        tags: ['Accounting', 'suppliers'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "name": "TESTE Postman",\n  "account_number": "9001001"\n}',
      },
      {
        method: 'GET',
        path: '/v1/suppliers/{supplierId}',
        summary: 'Get a supplier',
        description:
          "`GET /v1/suppliers/{id}` · operationId `getSupplier`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Accounting', 'suppliers'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
      },
      {
        method: 'GET',
        path: '/v1/custom-fields',
        summary: 'List organization custom fields',
        description:
          '`GET /v1/custom-fields` · operationId `listCustomFields`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.',
        tags: ['Accounting', 'custom-fields'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/custom-fields',
        summary: 'Create a custom field',
        description:
          '`POST /v1/custom-fields` · operationId `createCustomField`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `201` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.',
        tags: ['Accounting', 'custom-fields'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "label": "Cartão Postman",\n  "field_type": "TEXT",\n  "automation_type": "CARD"\n}',
      },
      {
        method: 'GET',
        path: '/v1/custom-fields/{customFieldId}',
        summary: 'Get a custom field',
        description:
          "`GET /v1/custom-fields/{id}` · operationId `getCustomField`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Accounting', 'custom-fields'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/accounting-transactions',
        summary:
          'Create an accounting transaction (splits are added afterwards via .../splits)',
        description:
          '`POST /v1/accounting-transactions` · operationId `createAccountingTransaction`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `201` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.',
        tags: ['Accounting', 'accounting-transactions'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "card_transaction_id": "6f9d2b1e-1c5a-4f8b-9e3d-7c2a8f4e6d1b",\n  "billing_amount": "150.00",\n  "transaction_amount": "150.00",\n  "billing_currency": "BRL",\n  "transaction_currency": "BRL"\n}',
      },
      {
        method: 'GET',
        path: '/v1/accounting-transactions/{accountingTransactionId}',
        summary: 'Get an accounting transaction',
        description:
          "`GET /v1/accounting-transactions/{id}` · operationId `getAccountingTransaction`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Accounting', 'accounting-transactions'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/accounting-transactions/{accountingTransactionId}/splits',
        summary:
          'Add a split to an accounting transaction (append, max 10, RN_AT_001)',
        description:
          "`POST /v1/accounting-transactions/{id}/splits` · operationId `addAccountingSplit`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.\n- `409` — State-machine violation or duplicate resource.",
        tags: ['Accounting', 'accounting-transactions'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "billing_amount": "75.00",\n  "transaction_amount": "75.00",\n  "gl_account_id": "6f9d2b1e-1c5a-4f8b-9e3d-7c2a8f4e6d1b",\n  "vat_rate_id": "6f9d2b1e-1c5a-4f8b-9e3d-7c2a8f4e6d1b",\n  "project_id": "6f9d2b1e-1c5a-4f8b-9e3d-7c2a8f4e6d1b",\n  "note": "teste via Postman"\n}',
      },
      {
        method: 'PUT',
        path: '/v1/accounting-transactions/{accountingTransactionId}/splits',
        summary:
          'Replace ALL splits atomically (the set must sum to the total, max 10, RN_AT_001)',
        description:
          "O único caminho para distribuir uma transação: a soma do conjunto é validada de uma vez. Add/update por índice recusam estados intermediários.\n\n`PUT /v1/accounting-transactions/{id}/splits` · operationId `replaceAccountingSplits`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.\n- `409` — State-machine violation or duplicate resource.",
        tags: ['Accounting', 'accounting-transactions'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "splits": [\n    {\n      "billing_amount": "75.00",\n      "transaction_amount": "75.00",\n      "gl_account_id": "6f9d2b1e-1c5a-4f8b-9e3d-7c2a8f4e6d1b",\n      "vat_rate_id": "6f9d2b1e-1c5a-4f8b-9e3d-7c2a8f4e6d1b",\n      "project_id": "6f9d2b1e-1c5a-4f8b-9e3d-7c2a8f4e6d1b",\n      "note": "teste via Postman"\n    }\n  ]\n}',
      },
      {
        method: 'PUT',
        path: '/v1/accounting-transactions/{accountingTransactionId}/splits/{splitIndex}',
        summary:
          'Replace the split at the given index (amounts must still sum, RN_AT_001)',
        description:
          "`PUT /v1/accounting-transactions/{id}/splits/{index}` · operationId `updateAccountingSplit`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.\n- `409` — State-machine violation or duplicate resource.",
        tags: ['Accounting', 'accounting-transactions'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "billing_amount": "75.00",\n  "transaction_amount": "75.00",\n  "gl_account_id": "6f9d2b1e-1c5a-4f8b-9e3d-7c2a8f4e6d1b",\n  "vat_rate_id": "6f9d2b1e-1c5a-4f8b-9e3d-7c2a8f4e6d1b",\n  "project_id": "6f9d2b1e-1c5a-4f8b-9e3d-7c2a8f4e6d1b",\n  "note": "teste via Postman"\n}',
      },
      {
        method: 'DELETE',
        path: '/v1/accounting-transactions/{accountingTransactionId}/splits/{splitIndex}',
        summary:
          'Remove the split at the given index (at least one split must remain)',
        description:
          "`DELETE /v1/accounting-transactions/{id}/splits/{index}` · operationId `removeAccountingSplit`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.\n- `409` — State-machine violation or duplicate resource.",
        tags: ['Accounting', 'accounting-transactions'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody: '{}',
      },
      {
        method: 'POST',
        path: '/v1/accounting-transactions/{accountingTransactionId}/categorize',
        summary:
          'Move an accounting transaction from DRAFT to CATEGORIZED (pré-requisito do export)',
        description:
          "`POST /v1/accounting-transactions/{id}/categorize` · operationId `categorizeAccountingTransaction`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.\n- `409` — State-machine violation or duplicate resource.",
        tags: ['Accounting', 'accounting-transactions'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody: '{}',
      },
      {
        method: 'POST',
        path: '/v1/accounting-transactions/{accountingTransactionId}/export',
        summary:
          'Mark an accounting transaction as EXPORTED (immutable thereafter, RN_AT_003)',
        description:
          "`POST /v1/accounting-transactions/{id}/export` · operationId `exportAccountingTransaction`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.\n- `409` — State-machine violation or duplicate resource.",
        tags: ['Accounting', 'accounting-transactions'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody: '{}',
      },
      {
        method: 'GET',
        path: '/v1/receipts/{receiptId}',
        summary: 'Get a receipt',
        description:
          "`GET /v1/receipts/{id}` · operationId `getReceipt`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Accounting', 'receipts'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
      },
      {
        method: 'GET',
        path: '/v1/receipts',
        summary: 'List receipts',
        description:
          '`GET /v1/receipts` · operationId `listReceipts`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.',
        tags: ['Accounting', 'receipts'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/receipts',
        summary:
          'Upload a receipt (PDF / PNG / JPG); OCR + auto-match runs asynchronously',
        description:
          '`POST /v1/receipts` · operationId `uploadReceipt`\n\n⚠️ `ledger_id` é **obrigatório** nesta rota (400 sem ele). Não está declarado no OpenAPI — foi adicionado aqui a partir do manual verificado contra o código.\n\n**Respostas:**\n- `201` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.',
        tags: ['Accounting', 'receipts'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'ledger_id',
            in: 'query',
            required: true,
            type: 'string',
            description:
              'OBRIGATÓRIO — tenant do CardOS é o par organization_id (da credencial) + ledger_id (da query).',
          },
        ],
        requestBody:
          '{\n  "transaction_id": "{{transactionId}}",\n  "file_name": "receipt-2026-08.pdf",\n  "mime_type": "application/pdf",\n  "file_url": "https://storage.example.com/receipts/abc.pdf"\n}',
      },
    ],
  },
  {
    title: 'Security',
    baseUrl: 'https://cardos-uat.corebanxapp.com.br',
    partner: 'Corebanx',
    description:
      '3-D Secure, PIN management, network tokens, fraud alerts, velocity rules.',
    endpoints: [
      {
        method: 'POST',
        path: '/v1/3ds/challenges',
        summary: 'Create a 3-D Secure challenge (PCI-sensitive)',
        description:
          '`POST /v1/3ds/challenges` · operationId `create3DSChallenge`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/security/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n**Respostas:**\n- `201` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.',
        tags: ['Security', '3ds'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
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
          '{\n  "card_id": "{{cardId}}",\n  "transaction_id": "{{transactionId}}",\n  "amount": "100.00",\n  "currency": "BRL",\n  "merchant_name": "LOJA TESTE"\n}',
      },
      {
        method: 'GET',
        path: '/v1/3ds/challenges/{challengeId}',
        summary: 'Get a 3-D Secure challenge by ID',
        description:
          "`GET /v1/3ds/challenges/{id}` · operationId `get3DSChallenge`\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Security', '3ds'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/3ds/challenges/{challengeId}/submit',
        summary: 'Submit a 3DS challenge response (PCI-sensitive)',
        description:
          "`POST /v1/3ds/challenges/{id}/submit` · operationId `submit3DSChallenge`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/security/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.\n- `409` — State-machine violation or duplicate resource.",
        tags: ['Security', '3ds'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
        requestBody: '{\n  "otp": "123456",\n  "accept_risk": true\n}',
      },
      {
        method: 'GET',
        path: '/v1/cards/{cardId}/pin',
        summary: "Read a card's PIN (PCI-sensitive; mTLS + MFA required)",
        description:
          "`GET /v1/cards/{id}/pin` · operationId `getCardPin`\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Security', 'cards'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/cards/{cardId}/pin',
        summary: "Set a card's PIN (PCI-sensitive)",
        description:
          "`POST /v1/cards/{id}/pin` · operationId `setCardPin`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/security/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Security', 'cards'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
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
          '{\n  "cardholder_id": "{{cardholderId}}",\n  "pin": "1234"\n}',
      },
      {
        method: 'PUT',
        path: '/v1/cards/{cardId}/pin',
        summary: "Change a card's PIN (PCI-sensitive)",
        description:
          "`PUT /v1/cards/{id}/pin` · operationId `changeCardPin`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/security/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Security', 'cards'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
        requestBody: '{\n  "current_pin": "1234",\n  "new_pin": "4321"\n}',
      },
      {
        method: 'POST',
        path: '/v1/cards/{cardId}/pin/verify',
        summary: 'Verify a card PIN (PCI-sensitive)',
        description:
          "`POST /v1/cards/{id}/pin/verify` · operationId `verifyCardPin`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/security/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `401` — Missing or invalid authentication.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Security', 'cards'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
        requestBody: '{\n  "pin": "1234"\n}',
      },
      {
        method: 'GET',
        path: '/v1/cards/{cardId}/network-tokens',
        summary: "List a card's network tokens (PCI-sensitive)",
        description:
          "`GET /v1/cards/{id}/network-tokens` · operationId `listCardNetworkTokens`\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Security', 'cards'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
      },
      {
        method: 'GET',
        path: '/v1/cards/{cardId}/fraud-alerts',
        summary: 'List fraud alerts for a card',
        description:
          "`GET /v1/cards/{id}/fraud-alerts` · operationId `listCardFraudAlerts`\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Security', 'cards'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/cards/{cardId}/velocity-check',
        summary: 'Run a velocity-rule check against a card',
        description:
          "`POST /v1/cards/{id}/velocity-check` · operationId `cardVelocityCheck`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/security/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Security', 'cards'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
        requestBody: '{\n  "amount": "100.00",\n  "currency": "BRL"\n}',
      },
      {
        method: 'POST',
        path: '/v1/network-tokens',
        summary: 'Issue a network token for a card (PCI-sensitive)',
        description:
          '`POST /v1/network-tokens` · operationId `createNetworkToken`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/security/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n**Respostas:**\n- `201` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.',
        tags: ['Security', 'network-tokens'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
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
          '{\n  "card_id": "{{cardId}}",\n  "provider": "VISA",\n  "wallet": "APPLE_PAY",\n  "device_id": "6f9d2b1e-1c5a-4f8b-9e3d-7c2a8f4e6d1b",\n  "last4": "1234",\n  "expiry_month": 12,\n  "expiry_year": 2030\n}',
      },
      {
        method: 'GET',
        path: '/v1/network-tokens/{networkTokenId}',
        summary: 'Get a network token by ID (PCI-sensitive)',
        description:
          "`GET /v1/network-tokens/{id}` · operationId `getNetworkToken`\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Security', 'network-tokens'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
      },
      {
        method: 'DELETE',
        path: '/v1/network-tokens/{networkTokenId}',
        summary: 'Revoke a network token (PCI-sensitive)',
        description:
          "`DELETE /v1/network-tokens/{id}` · operationId `revokeNetworkToken`\n\n**Respostas:**\n- `204` — Operation succeeded; no response body.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Security', 'network-tokens'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
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
      },
      {
        method: 'GET',
        path: '/v1/fraud-alerts',
        summary: 'List fraud alerts',
        description:
          '`GET /v1/fraud-alerts` · operationId `listFraudAlerts`\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.',
        tags: ['Security', 'fraud-alerts'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/fraud-alerts',
        summary: 'Create a fraud alert manually',
        description:
          '`POST /v1/fraud-alerts` · operationId `createFraudAlert`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/security/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n**Respostas:**\n- `201` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.',
        tags: ['Security', 'fraud-alerts'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
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
          '{\n  "card_id": "{{cardId}}",\n  "transaction_id": "{{transactionId}}",\n  "reason": "LOST",\n  "severity": "MEDIUM",\n  "score": "0.85"\n}',
      },
      {
        method: 'GET',
        path: '/v1/fraud-alerts/{fraudAlertId}',
        summary: 'Get a fraud alert by ID',
        description:
          "`GET /v1/fraud-alerts/{id}` · operationId `getFraudAlert`\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Security', 'fraud-alerts'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/fraud-alerts/{fraudAlertId}/resolve',
        summary: 'Resolve a fraud alert (terminal)',
        description:
          "`POST /v1/fraud-alerts/{id}/resolve` · operationId `resolveFraudAlert`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/security/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Security', 'fraud-alerts'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
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
          '{\n  "action": "dismiss",\n  "reviewer": "postman",\n  "notes": "teste via Postman"\n}',
      },
      {
        method: 'GET',
        path: '/v1/velocity-rules',
        summary: 'List velocity rules',
        description:
          '`GET /v1/velocity-rules` · operationId `listVelocityRules`\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.',
        tags: ['Security', 'velocity-rules'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/velocity-rules',
        summary: 'Create a velocity rule (COUNT or AMOUNT)',
        description:
          '`POST /v1/velocity-rules` · operationId `createVelocityRule`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/security/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n**Respostas:**\n- `201` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.',
        tags: ['Security', 'velocity-rules'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
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
          '{\n  "card_id": "{{cardId}}",\n  "rule_type": "COUNT",\n  "window_seconds": 3600,\n  "threshold": "20",\n  "currency": "BRL",\n  "description": "criado via Postman"\n}',
      },
      {
        method: 'GET',
        path: '/v1/velocity-rules/{velocityRuleId}',
        summary: 'Get a velocity rule',
        description:
          "`GET /v1/velocity-rules/{id}` · operationId `getVelocityRule`\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Security', 'velocity-rules'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
      },
      {
        method: 'PUT',
        path: '/v1/velocity-rules/{velocityRuleId}',
        summary: 'Update a velocity rule',
        description:
          "`PUT /v1/velocity-rules/{id}` · operationId `updateVelocityRule`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/security/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Security', 'velocity-rules'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
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
          '{\n  "action": "activate",\n  "threshold": "20",\n  "window_seconds": 3600\n}',
      },
    ],
  },
  {
    title: 'API Keys',
    baseUrl: 'https://cardos-uat.corebanxapp.com.br',
    partner: 'Corebanx',
    description: 'API key lifecycle for programmatic access.',
    endpoints: [
      {
        method: 'GET',
        path: '/v1/api-keys',
        summary: 'List API keys',
        description:
          '`GET /v1/api-keys` · operationId `listApiKeys`\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.',
        tags: ['API Keys'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/api-keys',
        summary: 'Create a new API key (returns the secret only on creation)',
        description:
          '`POST /v1/api-keys` · operationId `createApiKey`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/auth/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n**Respostas:**\n- `201` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.',
        tags: ['API Keys'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
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
          '{\n  "environment": "uat",\n  "description": "criado via Postman",\n  "created_by": "postman",\n  "scopes": [\n    "read"\n  ]\n}',
      },
      {
        method: 'POST',
        path: '/oauth/token',
        summary:
          'OAuth2 client_credentials — troca client_id/client_secret por um Bearer access token',
        description:
          'Endpoint público: as credenciais NO corpo (ou em HTTP Basic) autenticam. Habilitado por deployment via OAUTH_SIGNING_SECRET; devolve 503 quando não configurado. Não faz parte da superfície versionada /v1.\n\n`POST /oauth/token` · operationId `issueToken`\n\n**Respostas:**\n- `200` — Access token emitido.\n- `400` — invalid_request ou unsupported_grant_type.\n- `401` — invalid_client — falha na autenticação do cliente.\n- `503` — endpoint de token não configurado (OAUTH_SIGNING_SECRET ausente).',
        tags: ['API Keys'],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
        requestBody:
          'application/x-www-form-urlencoded:\ngrant_type=client_credentials\nclient_id={{clientId}}\nclient_secret={{clientSecret}}',
      },
      {
        method: 'GET',
        path: '/v1/api-keys/{apiKeyId}',
        summary: "Get an API key's metadata (the secret is never returned)",
        description:
          "`GET /v1/api-keys/{id}` · operationId `getApiKey`\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['API Keys'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
      },
      {
        method: 'DELETE',
        path: '/v1/api-keys/{apiKeyId}',
        summary: 'Revoke an API key',
        description:
          "`DELETE /v1/api-keys/{id}` · operationId `revokeApiKey`\n\n**Respostas:**\n- `204` — Operation succeeded; no response body.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['API Keys'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
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
      },
      {
        method: 'POST',
        path: '/v1/api-keys/{apiKeyId}/rotate',
        summary:
          'Rotate an API key — returns the new secret; old secret keeps working for 24 h',
        description:
          "`POST /v1/api-keys/{id}/rotate` · operationId `rotateApiKey`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/auth/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['API Keys'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
        requestBody: '{\n  "grace_seconds": 1\n}',
      },
    ],
  },
  {
    title: 'Webhooks',
    baseUrl: 'https://cardos-uat.corebanxapp.com.br',
    partner: 'Corebanx',
    description: 'Webhook endpoint registration and delivery tracking.',
    endpoints: [
      {
        method: 'GET',
        path: '/v1/webhook-endpoints',
        summary: 'List webhook endpoints',
        description:
          '`GET /v1/webhook-endpoints` · operationId `listWebhookEndpoints`\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.',
        tags: ['Webhooks'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
      },
      {
        method: 'POST',
        path: '/v1/webhook-endpoints',
        summary:
          'Register a webhook endpoint. Returns the HMAC signing secret on creation',
        description:
          '`POST /v1/webhook-endpoints` · operationId `createWebhookEndpoint`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/integration/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n**Respostas:**\n- `201` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.',
        tags: ['Webhooks'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
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
          '{\n  "url": "https://example.com/webhook",\n  "description": "criado via Postman",\n  "events": [\n    "card.created"\n  ]\n}',
      },
      {
        method: 'GET',
        path: '/v1/webhook-endpoints/{webhookEndpointId}',
        summary: 'Get a webhook endpoint',
        description:
          "`GET /v1/webhook-endpoints/{id}` · operationId `getWebhookEndpoint`\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Webhooks'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
      },
      {
        method: 'PUT',
        path: '/v1/webhook-endpoints/{webhookEndpointId}',
        summary: 'Update a webhook endpoint (URL, event filter, retry policy)',
        description:
          "`PUT /v1/webhook-endpoints/{id}` · operationId `updateWebhookEndpoint`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/integration/handler/handler.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Webhooks'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
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
          '{\n  "action": "update-events",\n  "events": [\n    "card.created"\n  ],\n  "description": "criado via Postman"\n}',
      },
      {
        method: 'DELETE',
        path: '/v1/webhook-endpoints/{webhookEndpointId}',
        summary: 'Delete a webhook endpoint',
        description:
          "`DELETE /v1/webhook-endpoints/{id}` · operationId `deleteWebhookEndpoint`\n\n**Respostas:**\n- `204` — Operation succeeded; no response body.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Webhooks'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
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
      },
      {
        method: 'GET',
        path: '/v1/webhook-endpoints/{webhookEndpointId}/deliveries',
        summary: 'List delivery attempts for a webhook endpoint (debugging)',
        description:
          "`GET /v1/webhook-endpoints/{id}/deliveries` · operationId `listWebhookDeliveries`\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `404` — Resource not found within the caller's tenant.",
        tags: ['Webhooks'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
      },
    ],
  },
  {
    title: 'Partner Callbacks',
    baseUrl: 'https://cardos-uat.corebanxapp.com.br',
    partner: 'Corebanx',
    description: 'Inbound HMAC-signed callbacks from card-network partners.',
    endpoints: [
      {
        method: 'POST',
        path: '/v1/partner-callbacks/asaptech',
        summary: 'Recebe o CardProposalEvent da AsapTech (M-44)',
        description:
          'UNICO endpoint que aceita escrita SEM credencial do CardOS — o parceiro nao tem (nem deve ter) uma API key nossa. Fica fora da autenticacao por API key (SkipPaths) e a autenticacao prevista e ASSINATURA DO PAYLOAD, cujo contrato e pergunta aberta ao parceiro.\nPor isso a montagem exige PARTNER_WEBHOOK_ENABLED=true E PARTNER_WEBHOOK_ALLOW_UNSIGNED=true; ligar a primeira sem a segunda FALHA O BOOT.\nRESPONDE 2xx QUASE SEMPRE, e isso significa "recebido e persistido", NAO "processado". O processamento e assincrono; o que falha fica com processed_at IS NULL para reprocessamento. A unica recusa e corpo ilegivel ou sem proposalId — sem ele o evento nao tem a quem se referir.\n\n`POST /v1/partner-callbacks/asaptech` · operationId `receivePartnerCallback`\n\n**Respostas:**\n- `200` — Recebido e persistido no inbox.\n- `400` — Corpo ilegivel ou sem proposalId.',
        tags: ['Partner Callbacks'],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
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
          '{\n  "proposalId": "{{proposalId}}",\n  "subEvent": "CARD_TO_EMBOSSING",\n  "status": "ACTIVE",\n  "at": "2026-08-17T12:00:00Z",\n  "data": {}\n}',
      },
      {
        method: 'POST',
        path: '/v1/partner-callbacks/pliant',
        summary:
          'Inbound callback from Pliant partner (auth notification, status update). HMAC-signed body',
        description:
          '`POST /v1/partner-callbacks/pliant` · operationId `pliantPartnerCallback`\n\n🔺 **O corpo abaixo NÃO vem do OpenAPI** — o spec não declara `requestBody` para esta operação. Ele foi derivado do handler (`modules/transaction/handler/partner_callback.go`), que é a fonte da verdade. Campos entre `<…>` você precisa preencher.\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `401` — Missing or invalid authentication.',
        tags: ['Partner Callbacks'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
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
          '{\n  "event_type": "transaction.synced",\n  "organization_id": "{{organizationId}}",\n  "ledger_id": "{{ledgerId}}",\n  "transaction_id": "{{transactionId}}"\n}',
      },
    ],
  },
  {
    title: 'Health',
    baseUrl: 'https://cardos-uat.corebanxapp.com.br',
    partner: 'Corebanx',
    description: 'Service health, readiness, and Prometheus metrics.',
    endpoints: [
      {
        method: 'GET',
        path: '/healthz',
        summary: 'Liveness probe',
        description:
          '`GET /healthz` · operationId `healthz`\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.',
        tags: ['Health'],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
      },
      {
        method: 'GET',
        path: '/readyz',
        summary: 'Readiness probe (checks DB, Kafka, downstream dependencies)',
        description:
          '`GET /readyz` · operationId `readyz`\n\n**Respostas:**\n- `200` — Operation succeeded. The body shape depends on the endpoint; see the per-operation response schema for detailed endpoints.\n- `503` — Not ready.',
        tags: ['Health'],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
      },
      {
        method: 'GET',
        path: '/metrics',
        summary: 'Prometheus metrics endpoint',
        description:
          '`GET /metrics` · operationId `metrics`\n\n**Respostas:**\n- `200` — Prometheus text exposition format.',
        tags: ['Health'],
        parameters: [
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
          },
        ],
      },
    ],
  },
  {
    title: '99 · Banklink /visa (opt-in · mTLS)',
    baseUrl: 'https://cardos-uat.corebanxapp.com.br',
    partner: 'Corebanx',
    description:
      '**Fora do OpenAPI `/v1` de propósito** — é a superfície que a **AsapTech chama no CardOS**, não o contrário. Montada a partir de `modules/banklink/` (8 endpoints, v1+v2).\n\nPara usar: `BANKLINK_ENABLED=true`, `PAN_INDEX_KEY` setada, e **certificado de cliente mTLS configurado no Postman** (Settings → Certificates). Sem mTLS a conexão é recusada.\n\n⚠️ Os 7 primeiros respondem **HTTP 200 sempre**, com o desfecho em `responseCode`. `/card/activate` põe o desfecho no **status HTTP** — não copie o tratamento de um para o outro.',
    endpoints: [
      {
        method: 'POST',
        path: '/api/v2/visa/authorize/debit',
        summary: 'Authorize · débito',
        description:
          '0100 · débito. Aprova/recusa e bloqueia saldo.\n\n⚠️ Superfície **chamada pela AsapTech**, não por você. Exige **mTLS** (certificado de cliente) e `BANKLINK_ENABLED`. Responde **HTTP 200 sempre** — o desfecho está em `responseCode`. Existe o equivalente em `/api/v1/visa/...` (sem a exigência de conta da v2).',
        tags: ['99 · Banklink /visa (opt-in · mTLS)'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
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
          '{\n  "mti": "0100",\n  "pan": "{{visaPan}}",\n  "processingCode": "000000",\n  "amount": "10000",\n  "transmissionDateTime": "0817120000",\n  "systemTraceAuditNumber": "123456",\n  "expirationDate": "3012",\n  "merchantType": "5411",\n  "acquiringCountryCode": "076",\n  "posEntryMode": "051",\n  "posConditionCode": "00",\n  "track2Data": "",\n  "retrievalReferenceNumber": "{{visaRrn}}",\n  "terminalId": "TERM0001",\n  "merchantId": "MERCH000000001",\n  "merchantNameLocation": "LOJA TESTE        BRASILIA  BR",\n  "currencyCode": "986",\n  "codigoAgencia": "0001",\n  "numeroConta": "000000000001"\n}',
      },
      {
        method: 'POST',
        path: '/api/v2/visa/authorize/credit',
        summary: 'Authorize · crédito',
        description:
          '0100 com processingCode `26` → ACCOUNT_CREDIT.\n\n⚠️ Superfície **chamada pela AsapTech**, não por você. Exige **mTLS** (certificado de cliente) e `BANKLINK_ENABLED`. Responde **HTTP 200 sempre** — o desfecho está em `responseCode`. Existe o equivalente em `/api/v1/visa/...` (sem a exigência de conta da v2).',
        tags: ['99 · Banklink /visa (opt-in · mTLS)'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
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
          '{\n  "mti": "0100",\n  "pan": "{{visaPan}}",\n  "processingCode": "000000",\n  "amount": "10000",\n  "transmissionDateTime": "0817120000",\n  "systemTraceAuditNumber": "123456",\n  "expirationDate": "3012",\n  "merchantType": "5411",\n  "acquiringCountryCode": "076",\n  "posEntryMode": "051",\n  "posConditionCode": "00",\n  "track2Data": "",\n  "retrievalReferenceNumber": "{{visaRrn}}",\n  "terminalId": "TERM0001",\n  "merchantId": "MERCH000000001",\n  "merchantNameLocation": "LOJA TESTE        BRASILIA  BR",\n  "currencyCode": "986",\n  "codigoAgencia": "0001",\n  "numeroConta": "000000000001"\n}',
      },
      {
        method: 'POST',
        path: '/api/v2/visa/inquiry/account',
        summary: 'Inquiry · conta',
        description:
          'Consulta de saldo. **Não bloqueia e não grava** — é o de maior volume.\n\n⚠️ Superfície **chamada pela AsapTech**, não por você. Exige **mTLS** (certificado de cliente) e `BANKLINK_ENABLED`. Responde **HTTP 200 sempre** — o desfecho está em `responseCode`. Existe o equivalente em `/api/v1/visa/...` (sem a exigência de conta da v2).',
        tags: ['99 · Banklink /visa (opt-in · mTLS)'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
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
          '{\n  "mti": "0100",\n  "pan": "{{visaPan}}",\n  "processingCode": "000000",\n  "amount": "10000",\n  "transmissionDateTime": "0817120000",\n  "systemTraceAuditNumber": "123456",\n  "expirationDate": "3012",\n  "merchantType": "5411",\n  "acquiringCountryCode": "076",\n  "posEntryMode": "051",\n  "posConditionCode": "00",\n  "track2Data": "",\n  "retrievalReferenceNumber": "{{visaRrn}}",\n  "terminalId": "TERM0001",\n  "merchantId": "MERCH000000001",\n  "merchantNameLocation": "LOJA TESTE        BRASILIA  BR",\n  "currencyCode": "986",\n  "codigoAgencia": "0001",\n  "numeroConta": "000000000001"\n}',
      },
      {
        method: 'POST',
        path: '/api/v2/visa/notify/credit',
        summary: 'Notify · crédito',
        description:
          'Notificação: não há o que aprovar.\n\n⚠️ Superfície **chamada pela AsapTech**, não por você. Exige **mTLS** (certificado de cliente) e `BANKLINK_ENABLED`. Responde **HTTP 200 sempre** — o desfecho está em `responseCode`. Existe o equivalente em `/api/v1/visa/...` (sem a exigência de conta da v2).',
        tags: ['99 · Banklink /visa (opt-in · mTLS)'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
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
          '{\n  "mti": "0100",\n  "pan": "{{visaPan}}",\n  "processingCode": "000000",\n  "amount": "10000",\n  "transmissionDateTime": "0817120000",\n  "systemTraceAuditNumber": "123456",\n  "expirationDate": "3012",\n  "merchantType": "5411",\n  "acquiringCountryCode": "076",\n  "posEntryMode": "051",\n  "posConditionCode": "00",\n  "track2Data": "",\n  "retrievalReferenceNumber": "{{visaRrn}}",\n  "terminalId": "TERM0001",\n  "merchantId": "MERCH000000001",\n  "merchantNameLocation": "LOJA TESTE        BRASILIA  BR",\n  "currencyCode": "986",\n  "codigoAgencia": "0001",\n  "numeroConta": "000000000001"\n}',
      },
      {
        method: 'POST',
        path: '/api/v2/visa/advice',
        summary: 'Advice',
        description:
          '0420 aplica estorno; 0120 registra débito aprovado offline.\n\n⚠️ Superfície **chamada pela AsapTech**, não por você. Exige **mTLS** (certificado de cliente) e `BANKLINK_ENABLED`. Responde **HTTP 200 sempre** — o desfecho está em `responseCode`. Existe o equivalente em `/api/v1/visa/...` (sem a exigência de conta da v2).',
        tags: ['99 · Banklink /visa (opt-in · mTLS)'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
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
          '{\n  "mti": "0100",\n  "pan": "{{visaPan}}",\n  "processingCode": "000000",\n  "amount": "10000",\n  "transmissionDateTime": "0817120000",\n  "systemTraceAuditNumber": "123456",\n  "expirationDate": "3012",\n  "merchantType": "5411",\n  "acquiringCountryCode": "076",\n  "posEntryMode": "051",\n  "posConditionCode": "00",\n  "track2Data": "",\n  "retrievalReferenceNumber": "{{visaRrn}}",\n  "terminalId": "TERM0001",\n  "merchantId": "MERCH000000001",\n  "merchantNameLocation": "LOJA TESTE        BRASILIA  BR",\n  "currencyCode": "986",\n  "codigoAgencia": "0001",\n  "numeroConta": "000000000001"\n}',
      },
      {
        method: 'POST',
        path: '/api/v2/visa/reversal',
        summary: 'Reversal',
        description:
          'Casa por RRN; DE90 (originalDataElements) é conferido.\n\n⚠️ Superfície **chamada pela AsapTech**, não por você. Exige **mTLS** (certificado de cliente) e `BANKLINK_ENABLED`. Responde **HTTP 200 sempre** — o desfecho está em `responseCode`. Existe o equivalente em `/api/v1/visa/...` (sem a exigência de conta da v2).',
        tags: ['99 · Banklink /visa (opt-in · mTLS)'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
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
          '{\n  "mti": "0100",\n  "pan": "{{visaPan}}",\n  "processingCode": "000000",\n  "amount": "10000",\n  "transmissionDateTime": "0817120000",\n  "systemTraceAuditNumber": "123456",\n  "expirationDate": "3012",\n  "merchantType": "5411",\n  "acquiringCountryCode": "076",\n  "posEntryMode": "051",\n  "posConditionCode": "00",\n  "track2Data": "",\n  "retrievalReferenceNumber": "{{visaRrn}}",\n  "terminalId": "TERM0001",\n  "merchantId": "MERCH000000001",\n  "merchantNameLocation": "LOJA TESTE        BRASILIA  BR",\n  "currencyCode": "986",\n  "codigoAgencia": "0001",\n  "numeroConta": "000000000001"\n}',
      },
      {
        method: 'POST',
        path: '/api/v2/visa/reversal/credit-notification',
        summary: 'Reversal · credit notification',
        description:
          'Contrato exige responder sucesso; o Acker é exigido no boot.\n\n⚠️ Superfície **chamada pela AsapTech**, não por você. Exige **mTLS** (certificado de cliente) e `BANKLINK_ENABLED`. Responde **HTTP 200 sempre** — o desfecho está em `responseCode`. Existe o equivalente em `/api/v1/visa/...` (sem a exigência de conta da v2).',
        tags: ['99 · Banklink /visa (opt-in · mTLS)'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
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
          '{\n  "mti": "0100",\n  "pan": "{{visaPan}}",\n  "processingCode": "000000",\n  "amount": "10000",\n  "transmissionDateTime": "0817120000",\n  "systemTraceAuditNumber": "123456",\n  "expirationDate": "3012",\n  "merchantType": "5411",\n  "acquiringCountryCode": "076",\n  "posEntryMode": "051",\n  "posConditionCode": "00",\n  "track2Data": "",\n  "retrievalReferenceNumber": "{{visaRrn}}",\n  "terminalId": "TERM0001",\n  "merchantId": "MERCH000000001",\n  "merchantNameLocation": "LOJA TESTE        BRASILIA  BR",\n  "currencyCode": "986",\n  "codigoAgencia": "0001",\n  "numeroConta": "000000000001"\n}',
      },
      {
        method: 'POST',
        path: '/api/v2/visa/card/activate',
        summary: 'Card · activate',
        description:
          'Ativa o cartão, cancela o anterior e devolve o PAN **mascarado**.\n\n⚠️ **Convenção de erro OPOSTA às 7 anteriores:** aqui o desfecho vai no **status HTTP**, não no `responseCode`.',
        tags: ['99 · Banklink /visa (opt-in · mTLS)'],
        parameters: [
          {
            name: 'X-API-Key',
            in: 'header',
            required: true,
            type: 'string',
            description:
              'Chave de API do tenant (equivalente a Authorization: Bearer <chave>). Herdada da configuração da collection.',
          },
          {
            name: 'Accept',
            in: 'header',
            required: true,
            type: 'string',
            description: 'application/json',
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
          '{\n  "pan": "{{visaPan}}",\n  "panSequenceNumber": "01",\n  "activationDate": "2026-08-17",\n  "activationChannel": "APP",\n  "codigoAgencia": "0001",\n  "numeroConta": "000000000001"\n}',
      },
    ],
  },
];
