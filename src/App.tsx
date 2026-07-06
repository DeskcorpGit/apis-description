import { ApiDocumentationCard } from "@/components/ApiDocumentationCard"
import type { ApiData } from "@/types/api"

const sampleApiData: ApiData = {
  title: "Users Management API",
  version: "2.1.0",
  description:
    "API RESTful para gerenciamento de usuários, autenticação e permissões do sistema.",
  baseUrl: "https://api.deskcorp.com.br/v2",
  endpoints: [
    {
      method: "GET",
      path: "/users",
      summary: "Listar todos os usuários",
      description:
        "Retorna uma lista paginada de todos os usuários cadastrados no sistema. Suporta filtros por nome, email e status.",
      tags: ["Users", "Public"],
      parameters: [
        {
          name: "page",
          in: "query",
          required: false,
          type: "integer",
          description: "Número da página (default: 1)",
        },
        {
          name: "limit",
          in: "query",
          required: false,
          type: "integer",
          description: "Itens por página (default: 20, max: 100)",
        },
        {
          name: "status",
          in: "query",
          required: false,
          type: "string",
          description: "Filtrar por status: active, inactive, suspended",
        },
        {
          name: "Authorization",
          in: "header",
          required: true,
          type: "string",
          description: "Bearer token de autenticação",
        },
      ],
      responses: [
        {
          statusCode: "200",
          description: "Lista de usuários retornada com sucesso",
          example: JSON.stringify(
            {
              data: [
                { id: 1, name: "João Silva", email: "joao@email.com", status: "active" },
                { id: 2, name: "Maria Souza", email: "maria@email.com", status: "active" },
              ],
              meta: { page: 1, limit: 20, total: 42 },
            },
            null,
            2
          ),
        },
        {
          statusCode: "401",
          description: "Token de autenticação inválido ou expirado",
        },
        {
          statusCode: "500",
          description: "Erro interno do servidor",
        },
      ],
    },
    {
      method: "POST",
      path: "/users",
      summary: "Criar novo usuário",
      description: "Cria um novo registro de usuário no sistema.",
      tags: ["Users", "Admin"],
      parameters: [
        {
          name: "Authorization",
          in: "header",
          required: true,
          type: "string",
          description: "Bearer token de autenticação (admin)",
        },
      ],
      responses: [
        {
          statusCode: "201",
          description: "Usuário criado com sucesso",
          example: JSON.stringify(
            { id: 3, name: "Carlos Lima", email: "carlos@email.com", status: "active" },
            null,
            2
          ),
        },
        {
          statusCode: "400",
          description: "Dados de entrada inválidos",
        },
        {
          statusCode: "409",
          description: "Conflito — email já cadastrado",
        },
      ],
    },
    {
      method: "GET",
      path: "/users/{id}",
      summary: "Buscar usuário por ID",
      description: "Retorna os detalhes de um usuário específico pelo seu ID.",
      tags: ["Users"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          type: "string",
          description: "UUID do usuário",
        },
      ],
      responses: [
        {
          statusCode: "200",
          description: "Detalhes do usuário",
          example: JSON.stringify(
            {
              id: 1,
              name: "João Silva",
              email: "joao@email.com",
              status: "active",
              createdAt: "2024-01-15T10:30:00Z",
            },
            null,
            2
          ),
        },
        {
          statusCode: "404",
          description: "Usuário não encontrado",
        },
      ],
    },
    {
      method: "DELETE",
      path: "/users/{id}",
      summary: "Remover usuário",
      description:
        "Remove permanentemente um usuário do sistema. Ação irreversível.",
      tags: ["Users", "Admin"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          type: "string",
          description: "UUID do usuário a ser removido",
        },
      ],
      responses: [
        {
          statusCode: "204",
          description: "Usuário removido com sucesso",
        },
        {
          statusCode: "404",
          description: "Usuário não encontrado",
        },
      ],
    },
  ],
}

function App() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 flex items-start justify-center">
      <ApiDocumentationCard apiData={sampleApiData} />
    </div>
  )
}

export default App
