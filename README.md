# 📋 API de Gestão de Contratos - Teste MODEC

Uma API RESTful robusta para gerenciamento de contratos desenvolvida com **NestJS**, **TypeORM** e **SQLite**.

## 🚀 Tecnologias Utilizadas

- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo
- **[TypeORM](https://typeorm.io/)** - ORM para TypeScript e JavaScript
- **[SQLite](https://www.sqlite.org/)** - Banco de dados relacional leve
- **[Class Validator](https://github.com/typestack/class-validator)** - Validação de dados
- **[Class Transformer](https://github.com/typestack/class-transformer)** - Transformação de objetos

## 📁 Estrutura do Projeto

```
src/
├── app.module.ts              # Módulo principal da aplicação
├── main.ts                    # Ponto de entrada da aplicação
├── seed.ts                    # Script para popular o banco com dados
├── infra/                     # Infraestrutura e configurações
│   └── database/              
│       ├── database.module.ts # Configuração do banco de dados
│       ├── seed.module.ts     # Módulo para seeds
│       └── seeds/             # Scripts de população do banco
│           └── contract.seed.ts
└── modules/                   # Módulos de negócio
    └── contracts/             # Módulo de contratos
        ├── contracts.controller.ts  # Controller REST
        ├── contracts.service.ts     # Lógica de negócio
        ├── contracts.module.ts      # Configuração do módulo
        ├── dtos/                    # Data Transfer Objects
        │   ├── create-contract.dto.ts
        │   ├── update-contract.dto.ts
        │   └── get-contracts.dto.ts
        └── entity/                  # Entidades do banco
            └── contract.entity.ts
```

## 🛠️ Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- **Node.js** (versão 18+ recomendada)
- **npm** ou **yarn**
- **Git**

## 📥 Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/well-silva/teste-modec-api.git
cd teste-modec-api
```

2. **Instale as dependências:**
```bash
npm install
```

## 🎯 Como Executar

### 1. **Modo Desenvolvimento (com auto-reload)**
```bash
npm run start:dev
```
A aplicação estará disponível em: `http://localhost:3000`

### 2. **Modo Produção**
```bash
# Build da aplicação
npm run build

# Executar em produção
npm run start:prod
```

### 3. **Modo Debug**
```bash
npm run start:debug
```

## 🌱 Populando o Banco com Dados de Teste

Execute o seed para criar 30 contratos de exemplo:

```bash
npm run seed
```

**Nota:** O seed só executa se o banco estiver vazio. Para repovoar, delete o arquivo `database.sqlite` e execute o comando novamente.

## 📋 Funcionalidades da API

### **Endpoints Disponíveis:**

#### **📄 Listar Contratos**
```http
GET /contracts
```

**Query Parameters (todos opcionais):**
- `page` - Número da página (padrão: 1)
- `limit` - Itens por página (padrão: 10, máximo: 100)
- `search` - Busca por texto (pesquisa em descrição, fornecedor e responsável)
- `supplier` - Filtrar por fornecedor
- `status` - Filtrar por status (`active`, `pending`, `completed`, `cancelled`)
- `category` - Filtrar por categoria
- `startDate` - Data de início (formato: YYYY-MM-DD)
- `endDate` - Data de fim (formato: YYYY-MM-DD)

**Exemplo:**
```bash
curl "http://localhost:3000/contracts?page=1&limit=5&status=active&search=petrobras"
```

#### **🔍 Buscar Contrato por ID**
```http
GET /contracts/:id
```

**Exemplo:**
```bash
curl http://localhost:3000/contracts/1
```

#### **➕ Criar Novo Contrato**
```http
POST /contracts
Content-Type: application/json
```

**Body:**
```json
{
  "supplier": "Empresa Exemplo Ltda.",
  "amount": 1500000,
  "category": "Tecnologia",
  "startDate": "2025-01-01",
  "endDate": "2025-12-31",
  "description": "Desenvolvimento de sistema de gestão empresarial",
  "responsible": "João Silva"
}
```

#### **✏️ Atualizar Contrato**
```http
PUT /contracts/:id
Content-Type: application/json
```

**Body (todos os campos são opcionais):**
```json
{
  "status": "active",
  "amount": 2000000,
  "responsible": "Maria Santos"
}
```

#### **🗑️ Remover Contrato**
```http
DELETE /contracts/:id
```

## ✅ Validações Implementadas

### **Campos Obrigatórios (POST):**
- `supplier` - String (2-200 caracteres)
- `amount` - Número positivo
- `category` - String (2-100 caracteres)
- `startDate` - Data no formato YYYY-MM-DD
- `endDate` - Data no formato YYYY-MM-DD
- `description` - String (10-1000 caracteres)
- `responsible` - String (2-100 caracteres)

### **Status Permitidos:**
- `active` - Ativo
- `pending` - Pendente
- `completed` - Concluído
- `cancelled` - Cancelado

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes em modo watch
npm run test:watch

# Testes de cobertura
npm run test:cov

# Testes end-to-end
npm run test:e2e
```

## 📝 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run start` | Inicia a aplicação |
| `npm run start:dev` | Inicia em modo desenvolvimento |
| `npm run start:debug` | Inicia em modo debug |
| `npm run start:prod` | Inicia em modo produção |
| `npm run build` | Gera build de produção |
| `npm run seed` | Popula o banco com dados de teste |
| `npm run format` | Formata o código com Prettier |
| `npm run lint` | Executa o ESLint |
| `npm test` | Executa testes unitários |
| `npm run test:e2e` | Executa testes end-to-end |

## 🐛 Resolução de Problemas

### **Erro: "Port 3000 already in use"**
```bash
# Use uma porta diferente
PORT=3001 npm run start:dev
```

### **Erro: "Cannot find module"**
```bash
# Reinstale as dependências
rm -rf node_modules package-lock.json
npm install
```

### **Banco de dados corrompido**
```bash
# Delete o banco e execute o seed novamente
rm database.sqlite
npm run seed
```

## 📊 Exemplos de Uso

### **Buscar contratos ativos com paginação:**
```bash
curl "http://localhost:3000/contracts?status=active&page=1&limit=10"
```

### **Pesquisar por texto:**
```bash
curl "http://localhost:3000/contracts?search=petrobras"
```

### **Filtrar por categoria e período:**
```bash
curl "http://localhost:3000/contracts?category=Energy&startDate=2024-01-01&endDate=2024-12-31"
```

### **Criar contrato completo:**
```bash
curl -X POST http://localhost:3000/contracts 
  -H "Content-Type: application/json" 
  -d '{
    "supplier": "Tech Solutions Ltda.",
    "amount": 850000,
    "category": "Tecnologia",
    "startDate": "2025-03-01",
    "endDate": "2025-08-31",
    "description": "Desenvolvimento de aplicativo mobile para gestão de vendas",
    "responsible": "Ana Paula Rodrigues"
  }'
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).

## 👨‍💻 Autor

**Wellington Silva** - [GitHub](https://github.com/well-silva)

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela no repositório!**
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
