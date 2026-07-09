# APIs Description Portal

Este projeto é um portal de documentação e exploração de APIs, desenvolvido com **React**, **Vite**, **TypeScript** e **Tailwind CSS**.

## 🚀 Funcionalidades e Páginas

O projeto conta com as seguintes páginas e rotas principais:

- **Dashboard (`/`)**: Página inicial com uma visão geral do sistema e indicadores.
- **Documentação de APIs (`/apis` e `/apis/:partner`)**: Páginas dedicadas à exibição da documentação detalhada das APIs, permitindo filtrar e visualizar especificações de integrações e parceiros.
- **Swagger UI (`/swagger`)**: Integração nativa com o Swagger UI para visualização e teste interativo dos endpoints das APIs cadastradas.

## 🛠️ Tecnologias Utilizadas

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Router DOM](https://reactrouter.com/)
- [Swagger UI React](https://www.npmjs.com/package/swagger-ui-react)

## 📦 Como clonar e executar o projeto

Siga os passos abaixo para rodar o projeto localmente em sua máquina.

### 1. Clone o repositório

Abra o terminal e execute o comando de clone com o link fornecido:

```bash
git clone https://github.com/deskcorp-git/apis-description.git
```

### 2. Acesse a pasta do projeto

```bash
cd apis-description
```

_(ou navegue até a pasta correspondente ao repositório clonado)_

### 3. Instale as dependências

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado. Em seguida, instale todas as dependências do projeto executando:

```bash
npm install
```

### 4. Rodando o projeto (Ambiente de Desenvolvimento)

Para iniciar o servidor de desenvolvimento local com hot-reload, execute o seguinte comando:

```bash
npm run dev
```

Após rodar o comando, o servidor do Vite será iniciado e exibirá um link (geralmente `http://localhost:5173/`). Acesse-o em seu navegador para utilizar a aplicação.

## 🏗️ Build para Produção

Caso deseje gerar a versão otimizada e minificada para produção, utilize:

```bash
npm run build
```

Os arquivos finais compilados estarão disponíveis na pasta `dist/`.
