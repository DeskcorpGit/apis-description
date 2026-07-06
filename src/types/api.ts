/**
 * Interfaces TypeScript para a estrutura de dados de uma API (OpenAPI-like).
 * Usadas pelo componente ApiDocumentationCard.
 */

/** Representa um único parâmetro de um endpoint */
export interface ApiParameter {
  /** Nome do parâmetro (ex: "userId", "page") */
  name: string
  /** Localização do parâmetro: query, path, header ou cookie */
  in: "query" | "path" | "header" | "cookie"
  /** Se o parâmetro é obrigatório */
  required: boolean
  /** Tipo do parâmetro (ex: "string", "integer", "boolean") */
  type: string
  /** Descrição legível do parâmetro */
  description?: string
}

/** Representa uma resposta possível de um endpoint (status code) */
export interface ApiResponse {
  /** Código de status HTTP (ex: "200", "404", "500") */
  statusCode: string
  /** Descrição da resposta */
  description: string
  /** Exemplo do corpo da resposta em formato string/JSON */
  example?: string
}

/** Métodos HTTP suportados */
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS"

/** Representa um endpoint completo de uma API */
export interface ApiEndpoint {
  /** Método HTTP (ex: "GET", "POST") */
  method: HttpMethod
  /** Caminho/rota do endpoint (ex: "/api/v1/users/{id}") */
  path: string
  /** Resumo curto do endpoint */
  summary?: string
  /** Descrição detalhada do endpoint */
  description?: string
  /** Lista de parâmetros do endpoint */
  parameters?: ApiParameter[]
  /** Lista de respostas possíveis (status codes) */
  responses?: ApiResponse[]
  /** Tags/categorias do endpoint */
  tags?: string[]
}

/** Estrutura raiz que agrupa múltiplos endpoints (equivalente simplificado do OpenAPI) */
export interface ApiData {
  /** Título da API */
  title: string
  /** Versão da API (ex: "1.0.0") */
  version?: string
  /** Descrição da API */
  description?: string
  /** URL base da API (ex: "https://api.exemplo.com") */
  baseUrl?: string
  /** Lista de endpoints documentados */
  endpoints: ApiEndpoint[]
}
