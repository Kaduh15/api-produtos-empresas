# API de Empresas e Produtos - Express

Este projeto é uma API RESTful que permite que empresas se cadastrem, façam login e gerenciem seus próprios produtos de forma segura e eficiente.

## 🧰 Tecnologias Utilizadas

- **Node.js** (v22+)
- **Express.js** (Framework web)
- **TypeScript** (Tipagem estática)
- **Prisma ORM** (Database toolkit)
- **PostgreSQL** (Banco de dados)
- **Zod** (Validação de esquemas)
- **JWT** (Autenticação via tokens)
- **Docker** & **Docker Compose** (Containerização)
- **Swagger/OpenAPI** (Documentação da API)

## 📋 Pré-requisitos

- Node.js v22+
- Docker e Docker Compose
- Git

## 🚀 Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Kaduh15/api-produtos-empresas
cd api-produtos-empresas
```

### 2. Configure o `.env`

Crie um arquivo `.env` com base no `.env.example` e adicione as variáveis necessárias:

**Para execução com Docker Compose:**
```bash
DATABASE_URL=postgresql://user:password@db:5432/db_name
JWT_SECRET=sua_chave_secreta_super_segura
```

**Para execução local (sem Docker):**
```bash
DATABASE_URL=postgresql://user:password@localhost:5432/db_name
JWT_SECRET=sua_chave_secreta_super_segura
```

> **Nota:** Use `@db` quando rodando via Docker Compose e `@localhost` quando rodando localmente.

### 3. Suba a aplicação com Docker

```bash
docker-compose up --build
```

### 4. Execute as migrações do banco de dados

**Importante:** Após subir os containers, você precisa aplicar as migrações do Prisma:

```bash
# Execute as migrações dentro do container da aplicação
docker-compose exec app npx prisma migrate deploy

# Ou se preferir, gere e aplique o schema do Prisma
docker-compose exec app npx prisma db push
```

### 5. Acesse a documentação Swagger

```
http://localhost:3000/docs
```

---

## 📦 Funcionalidades

### Autenticação
- `POST /login` → Login da empresa (retorna token JWT)

### Empresas
- `POST /company` → Cria uma nova empresa
- `GET /company/:id` → Detalha uma empresa
- `GET /company/me` → Dados da empresa logada
- `PUT /company/:id` → Atualiza empresa
- `DELETE /company/:id` → Remove empresa

### Produtos
- `POST /products` → Cria um produto (vinculado à empresa logada)
- `GET /products` → Lista produtos da empresa logada
- `GET /products/:id` → Detalha um produto
- `PUT /products/:id` → Atualiza produto
- `DELETE /products/:id` → Remove produto

---

## ✅ Extras Implementados

- Validação com Zod
- Middleware de autenticação
- Padrão Repository
- Documentação Swagger
- Docker para facilitar execução
- Estrutura de código escalável e limpa

---

## 📄 Licença

Este projeto foi desenvolvido como parte de um desafio técnico.
