# Especificação Técnica

**Plataforma de Gestão de Atividades e Indicadores de Equipe**

- **Versão:** 1.0
- **Status:** Proposta técnica
- **Backend:** NestJS + TypeScript + Prisma ORM + PostgreSQL
- **Frontend:** React + TypeScript + Tailwind CSS + Recharts

## 1. Objetivo do documento

Este documento especifica tecnicamente a implementação da Plataforma de Gestão de Atividades e Indicadores de Equipe.

O objetivo é transformar a proposta de produto em uma referência para desenvolvimento, definindo:

- arquitetura;
- módulos;
- responsabilidades;
- modelo de dados;
- regras de negócio;
- API;
- telas;
- componentes;
- indicadores;
- fluxos;
- requisitos funcionais;
- requisitos não funcionais;
- critérios de aceite;
- escopo do MVP;
- possíveis evoluções.

O documento deverá ser utilizado como referência durante a implementação do backend e frontend.

## 2. Contexto

A aplicação tem como objetivo centralizar o gerenciamento das atividades de uma equipe e fornecer ao gestor informações que permitam acompanhar a operação e tomar decisões.

O problema apresentado pelo desafio é a dispersão do trabalho em planilhas, papel e grupos de mensagens, dificultando a identificação do que está realmente em andamento. Também são apresentados problemas relacionados à distribuição de tarefas, atrasos e ausência de indicadores objetivos para reuniões de acompanhamento.

O sistema deverá, portanto, permitir que o gestor:

1. registre as atividades;
2. atribua responsáveis;
3. estabeleça prazos;
4. acompanhe o fluxo de execução;
5. identifique situações de atenção;
6. visualize indicadores;
7. utilize essas informações para tomar decisões.

## 3. Escopo

### 3.1. Escopo funcional

O MVP deverá contemplar:

- autenticação;
- gerenciamento de usuários;
- gerenciamento de atividades;
- atribuição de atividades;
- controle de status;
- controle de prioridade;
- controle de prazos;
- filtros;
- ordenação;
- dashboard gerencial;
- indicadores operacionais;
- visualização Kanban;
- interface responsiva.

### 3.2. Fora do escopo inicial

Não fazem parte do MVP:

- aplicativo mobile nativo;
- notificações por WhatsApp;
- integração com e-mail;
- integração com calendário externo;
- inteligência artificial;
- controle financeiro;
- controle de horas detalhado;
- gestão de projetos complexos;
- automações avançadas;
- integrações externas.

Esses recursos poderão ser considerados em versões futuras.

## 4. Requisitos funcionais

### RF01 — Autenticação

O sistema deverá permitir que usuários autenticados acessem as funcionalidades protegidas.

**Funcionalidades:**

- login;
- logout;
- consulta do usuário autenticado;
- proteção das rotas;
- controle de acesso.

### RF02 — Gerenciamento de usuários

O gestor deverá conseguir visualizar e administrar os membros da equipe.

**Dados:**

- nome;
- e-mail;
- cargo/função;
- perfil;
- status;
- data de criação.

**Operações:**

- listar usuários;
- visualizar usuário;
- criar usuário;
- editar usuário;
- ativar/desativar usuário.

### RF03 — Gerenciamento de atividades

O sistema deverá permitir registrar e acompanhar as atividades da equipe.

O requisito corresponde diretamente à primeira exigência funcional do desafio: o gestor deve conseguir registrar e acompanhar o trabalho, incluindo atividades, responsáveis e prazos.

**Dados da atividade:**

- título;
- descrição;
- responsável;
- status;
- prioridade;
- prazo;
- categoria;
- data de criação;
- data de início;
- data de conclusão.

**Operações:**

- criar atividade;
- listar atividades;
- visualizar atividade;
- editar atividade;
- excluir atividade;
- atribuir responsável;
- alterar status;
- alterar prioridade.

## 5. Fluxo de status

O fluxo padrão das atividades será:

```text
A FAZER
   ↓
EM ANDAMENTO
   ↓
EM REVISÃO
   ↓
CONCLUÍDA
```

Também poderá existir:

- CANCELADA

## 6. Prioridade

As atividades possuirão uma prioridade.

| Prioridade | Descrição |
|---|---|
| `LOW` | Baixa |
| `MEDIUM` | Média |
| `HIGH` | Alta |
| `CRITICAL` | Crítica |

A prioridade será utilizada principalmente para organização e filtragem das atividades.

## 7. Regras de negócio

### RN01 — Responsável

Uma atividade poderá possuir um responsável.

Atividades sem responsável deverão ser identificáveis através de filtro específico.

### RN02 — Prazo

Uma atividade poderá possuir uma data limite.

A aplicação deverá determinar sua situação de prazo:

**Normal**

`dueDate >= hoje`

e fora da janela de alerta.

**Próxima do vencimento**

A atividade está dentro da janela configurada para alerta.

**Atrasada**

`dueDate < hoje`

e a atividade ainda não está concluída ou cancelada.

### RN03 — Conclusão

Quando uma atividade for alterada para `DONE`:

```text
completedAt = data/hora atual
```

Quando uma atividade sair de `DONE`, o campo `completedAt` deverá ser removido ou recalculado conforme a regra adotada.

### RN04 — Início

Quando uma atividade passar para `IN_PROGRESS` pela primeira vez:

```text
startedAt = data/hora atual
```

A implementação deverá evitar sobrescrever a data original de início em alterações posteriores, salvo se houver uma ação explícita de reinício.

### RN05 — Atividade atrasada

Uma atividade não deverá ser considerada atrasada quando estiver:

- concluída;
- cancelada.

### RN06 — Usuário inativo

Usuários inativos não deverão ser selecionáveis como novos responsáveis por atividades.

Atividades históricas de usuários posteriormente desativados deverão permanecer preservadas.

## 8. Arquitetura geral

A aplicação será dividida em frontend, backend e banco de dados.

```text
┌───────────────────────────────┐
│ React                         │
│ TypeScript                    │
│ Tailwind CSS                  │
│ Recharts                      │
└───────────────┬───────────────┘
                │
                │ HTTP / REST
                ▼
┌───────────────────────────────┐
│ NestJS                        │
│ TypeScript                    │
│                               │
│ Controllers                   │
│ Services / Use Cases          │
│ Domain / Business Rules       │
│ Repositories                  │
└───────────────┬───────────────┘
                │
                │ Prisma ORM
                ▼
┌───────────────────────────────┐
│ PostgreSQL                    │
└───────────────────────────────┘
```

## 9. Backend

### 9.1. Estrutura de módulos

Estrutura inicial proposta:

```text
src/
├── auth/
├── users/
├── tasks/
├── categories/
├── dashboard/
├── common/
└── database/
```

**AuthModule**

Responsável por:

- autenticação;
- geração/validação de sessão;
- usuário autenticado;
- guards;
- autorização.

**UsersModule**

Responsável por:

- usuários;
- perfis;
- status dos usuários.

**TasksModule**

Responsável por:

- atividades;
- estados;
- prioridades;
- responsáveis;
- prazos.

**CategoriesModule**

Responsável pela categorização das atividades.

**DashboardModule**

Responsável pelos indicadores e consultas agregadas.

**DatabaseModule**

Responsável pela integração com Prisma.

## 10. Camadas do backend

A implementação deverá evitar concentrar toda a lógica nos controllers.

Estrutura conceitual:

```text
Controller
    ↓
Service / Use Case
    ↓
Repository
    ↓
Prisma
    ↓
PostgreSQL
```

**Controller**

Responsável por:

- receber requisições;
- validar parâmetros;
- chamar casos de uso;
- retornar respostas HTTP.

**Service / Use Case**

Responsável por:

- regras de negócio;
- orquestração;
- validações de domínio;
- execução dos casos de uso.

**Repository**

Responsável por abstrair o acesso aos dados.

**Prisma**

Responsável pela persistência.

## 11. Modelo de dados

### User

```text
User
├── id
├── name
├── email
├── passwordHash
├── role
├── active
├── createdAt
└── updatedAt
```

### Task

```text
Task
├── id
├── title
├── description
├── status
├── priority
├── dueDate
├── startedAt
├── completedAt
├── createdAt
├── updatedAt
├── assigneeId
└── categoryId
```

### Category

```text
Category
├── id
├── name
├── description
├── createdAt
└── updatedAt
```

## 12. Relacionamentos

```text
User
  │
  │ 1:N
  ▼
Task
  │
  │ N:1
  ▼
Category
```

- Um usuário poderá possuir várias atividades.
- Uma atividade poderá possuir um usuário responsável.
- Uma categoria poderá possuir várias atividades.

## 13. Modelo Prisma conceitual

A implementação deverá resultar em um schema semelhante a:

```prisma
enum UserRole {
  ADMIN
  MANAGER
  MEMBER
}

enum TaskStatus {
  TODO
  IN_PROGRESS
  REVIEW
  DONE
  CANCELLED
}

enum TaskPriority {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}

model User {
  id           String   @id @default(uuid())
  name         String
  email        String   @unique
  passwordHash String
  role         UserRole @default(MEMBER)
  active       Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  tasks        Task[]
}

model Category {
  id          String   @id @default(uuid())
  name        String   @unique
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  tasks       Task[]
}

model Task {
  id          String       @id @default(uuid())
  title       String
  description String?
  status      TaskStatus   @default(TODO)
  priority    TaskPriority @default(MEDIUM)
  dueDate     DateTime?
  startedAt   DateTime?
  completedAt DateTime?
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  assigneeId  String?
  categoryId  String?

  assignee User?     @relation(fields: [assigneeId], references: [id])
  category Category? @relation(fields: [categoryId], references: [id])

  @@index([assigneeId])
  @@index([status])
  @@index([priority])
  @@index([dueDate])
  @@index([categoryId])
}
```

> Esse schema é uma proposta inicial de implementação, não uma exigência presente no documento original.

## 14. API REST

### 14.1. Auth

| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/auth/login` | Autentica o usuário. |
| `POST` | `/auth/logout` | Encerra a sessão. |
| `GET` | `/auth/me` | Retorna o usuário autenticado. |

## 15. Users API

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/users` | Lista usuários. |
| `GET` | `/users/:id` | Retorna um usuário. |
| `POST` | `/users` | Cria usuário. |
| `PATCH` | `/users/:id` | Atualiza usuário. |
| `DELETE` | `/users/:id` | Remove/desativa usuário conforme política adotada. |

**Filtros possíveis:**

```text
?active=true
?role=MEMBER
```

## 16. Tasks API

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/tasks` | Lista atividades. |
| `GET` | `/tasks/:id` | Retorna uma atividade. |
| `POST` | `/tasks` | Cria uma atividade. |
| `PATCH` | `/tasks/:id` | Atualiza uma atividade. |
| `DELETE` | `/tasks/:id` | Remove uma atividade. |
| `PATCH` | `/tasks/:id/status` | Atualiza o status. |
| `PATCH` | `/tasks/:id/assignee` | Altera o responsável. |

**Filtros:**

```text
?status=IN_PROGRESS
?priority=HIGH
?assigneeId=<id>
?categoryId=<id>
?overdue=true
?dueBefore=<date>
```

Também deverá suportar paginação:

```text
?page=1
&limit=20
```

## 17. Dashboard API

A API de dashboard deverá fornecer dados já agregados sempre que possível.

### `GET /dashboard/summary`

Retorno conceitual:

```json
{
  "total": 42,
  "open": 18,
  "inProgress": 10,
  "overdue": 4,
  "completed": 24,
  "completionRate": 57.14,
  "onTimeRate": 83.33
}
```

### `GET /dashboard/tasks-by-user`

Exemplo:

```json
[
  {
    "userId": "1",
    "userName": "Ana",
    "total": 12
  },
  {
    "userId": "2",
    "userName": "Carlos",
    "total": 8
  }
]
```

### `GET /dashboard/tasks-over-time`

Exemplo:

```json
[
  {
    "date": "2026-09-15",
    "created": 5,
    "completed": 3,
    "overdue": 1
  }
]
```

### `GET /dashboard/deadlines`

Retorna atividades:

- atrasadas;
- próximas do vencimento.

## 18. Indicadores

Os indicadores constituem uma parte essencial do projeto.

O desafio determina que os números apresentados devem possuir utilidade para decisão e que sua finalidade seja explicada no README.

### KPI01 — Atividades abertas

Quantidade de atividades não concluídas.

**Finalidade**

Permitir avaliar o volume atual de trabalho pendente.

### KPI02 — Atividades em andamento

Quantidade de atividades com status `IN_PROGRESS`.

**Finalidade**

Permitir acompanhar o volume de trabalho atualmente em execução.

### KPI03 — Atividades atrasadas

Quantidade de atividades cujo prazo foi ultrapassado.

**Finalidade**

Identificar problemas que já exigem intervenção.

### KPI04 — Próximos vencimentos

Quantidade de atividades que entrarão em situação de vencimento dentro da janela de alerta.

**Finalidade**

Permitir intervenção preventiva.

### KPI05 — Taxa de conclusão

**Fórmula:**

```text
atividades concluídas
──────────────────── × 100
total de atividades
```

**Finalidade**

Acompanhar a capacidade de conclusão da equipe no período selecionado.

### KPI06 — Cumprimento de prazo

**Fórmula conceitual:**

```text
atividades concluídas no prazo
────────────────────────────── × 100
atividades concluídas com prazo
```

**Finalidade**

Avaliar o cumprimento dos compromissos estabelecidos.

### KPI07 — Distribuição por colaborador

Quantidade de atividades atribuídas a cada usuário.

**Finalidade**

Identificar concentração ou distribuição desigual do trabalho.

### KPI08 — Tempo médio de conclusão

**Fórmula:**

```text
Σ (completedAt - startedAt)
───────────────────────────
tarefas concluídas
```

**Finalidade**

Acompanhar a duração média do fluxo de execução.

Esse indicador deverá ser tratado com cautela quando houver atividades de complexidades muito diferentes.

## 19. Frontend

### Estrutura proposta

```text
src/
├── components/
├── layouts/
├── pages/
├── modules/
│   ├── auth/
│   ├── dashboard/
│   ├── tasks/
│   ├── users/
│   └── categories/
├── services/
├── hooks/
├── routes/
├── types/
└── styles/
```

## 20. Páginas

### `/login`

Tela de autenticação.

### `/dashboard`

Dashboard gerencial.

**Componentes:**

```text
Dashboard
├── Header
├── KPI Cards
├── TaskDistributionChart
├── TaskEvolutionChart
├── DeadlineAlerts
└── RecentTasks
```

### `/tasks`

Lista de atividades.

**Funcionalidades:**

- busca;
- filtros;
- ordenação;
- paginação;
- criação;
- edição;
- exclusão.

### `/tasks/kanban`

Quadro Kanban.

**Colunas:**

- `TODO`
- `IN_PROGRESS`
- `REVIEW`
- `DONE`

### `/tasks/:id`

Detalhes da atividade.

### `/users`

Gerenciamento da equipe.

### `/users/:id`

Detalhes do colaborador.

## 21. Componentes principais

### KpiCard

Responsável pela apresentação de indicadores.

**Props conceituais:**

```typescript
interface KpiCardProps {
  title: string;
  value: number | string;
  description?: string;
  trend?: number;
}
```

### TaskTable

Responsável pela visualização tabular das atividades.

### TaskCard

Representação de uma atividade no Kanban.

### TaskForm

Formulário de criação/edição.

### TaskFilters

Filtros da listagem.

### DeadlineAlert

Apresenta atividades próximas do vencimento ou atrasadas.

## 22. Gráficos

O Recharts será utilizado no dashboard.

### Distribuição por usuário

**Tipo:** Bar Chart

**Eixo X:**

- colaboradores.

**Eixo Y:**

- quantidade de atividades.

### Evolução temporal

**Tipo:** Line Chart

**Séries:**

- criadas;
- concluídas;
- atrasadas.

### Distribuição por status

**Tipo:** Pie/Donut Chart

**Categorias:**

- a fazer;
- em andamento;
- revisão;
- concluídas.

Esse gráfico deverá ser utilizado apenas se trouxer informação adicional ao resumo apresentado pelos KPIs.

## 23. Tailwind CSS

O Tailwind será utilizado para:

- layout;
- responsividade;
- espaçamento;
- tipografia;
- cores;
- estados;
- componentes visuais;
- grid;
- flexbox.

A interface deverá utilizar uma escala visual consistente.

Os estilos não deverão ser definidos de maneira arbitrária em cada componente.

## 24. Responsividade

Breakpoints deverão contemplar pelo menos:

- Mobile;
- Tablet;
- Desktop.

No mobile:

- sidebar poderá ser transformada em menu;
- tabelas poderão utilizar scroll horizontal ou apresentação alternativa;
- cards deverão reorganizar-se;
- gráficos deverão adaptar sua largura;
- filtros deverão ser empilhados.

## 25. Fluxo de autenticação

```text
Usuário
   │
   ▼
Login
   │
   ▼
POST /auth/login
   │
   ▼
Backend valida credenciais
   │
   ▼
Sessão/token
   │
   ▼
Frontend
   │
   ▼
Dashboard
```

Rotas protegidas deverão verificar autenticação antes de renderizar o conteúdo.

## 26. Fluxo de criação de atividade

```text
Usuário
   │
   ▼
Abrir formulário
   │
   ▼
Preencher atividade
   │
   ▼
POST /tasks
   │
   ▼
Validação
   │
   ▼
Regra de negócio
   │
   ▼
Prisma
   │
   ▼
PostgreSQL
   │
   ▼
Resposta
   │
   ▼
Atualização da interface
```

## 27. Fluxo de atualização de status

```text
TODO
 ↓
IN_PROGRESS
 ↓
REVIEW
 ↓
DONE
```

Ao chegar em `DONE`, a API deverá registrar `completedAt`.

O dashboard deverá refletir a alteração nos indicadores após a atualização.

## 28. Filtros do dashboard

O dashboard deverá permitir, no mínimo, filtragem por período.

**Opções iniciais:**

- últimos 7 dias;
- últimos 30 dias;
- mês atual;
- período personalizado.

**Filtros futuros poderão incluir:**

- colaborador;
- categoria;
- prioridade;
- status.

## 29. Paginação

A listagem de atividades deverá suportar paginação.

**Parâmetros:**

```text
?page=1&limit=20
```

**Resposta:**

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

## 30. Validação

O backend deverá validar todos os dados recebidos.

**Exemplo de criação:**

| Campo | Regra |
|---|---|
| `title` | obrigatório |
| `description` | opcional |
| `priority` | enum válido |
| `status` | enum válido |
| `dueDate` | data válida |
| `assigneeId` | usuário existente e ativo |

O frontend deverá realizar validações de experiência do usuário, mas não substituir as validações do backend.

## 31. Tratamento de erros

A API deverá possuir respostas HTTP consistentes.

**Exemplos:**

- `400 Bad Request`
- `401 Unauthorized`
- `403 Forbidden`
- `404 Not Found`
- `409 Conflict`
- `500 Internal Server Error`

**Formato sugerido:**

```json
{
  "statusCode": 400,
  "message": "Dados inválidos",
  "error": "Bad Request"
}
```

## 32. Autorização

**Perfis propostos:**

### ADMIN

Acesso administrativo completo.

### MANAGER

Pode:

- visualizar dashboard;
- gerenciar atividades;
- gerenciar equipe;
- atribuir atividades;
- alterar prioridades.

### MEMBER

Pode:

- visualizar atividades atribuídas;
- atualizar atividades permitidas;
- alterar status;
- consultar seus próprios dados.

As permissões definitivas deverão ser refinadas antes da implementação da autorização.

## 33. Segurança

O backend deverá:

- armazenar senhas utilizando hash;
- nunca retornar `passwordHash` nas respostas;
- validar entrada;
- proteger endpoints;
- controlar autorização;
- evitar exposição de informações internas;
- utilizar variáveis de ambiente para credenciais;
- utilizar HTTPS em produção.

## 34. Índices do banco

Os campos utilizados frequentemente em filtros deverão possuir índices adequados.

**Inicialmente:**

- `Task.assigneeId`
- `Task.status`
- `Task.priority`
- `Task.dueDate`
- `Task.categoryId`

Índices adicionais deverão ser adicionados somente após identificação de necessidade.

## 35. Testes

### Backend

Testes unitários deverão cobrir principalmente:

- regras de atividade;
- alteração de status;
- identificação de atrasos;
- cálculo dos indicadores;
- permissões;
- validações.

### Integração

Deverão ser testados:

- controllers;
- serviços;
- Prisma;
- banco de dados;
- autenticação.

### Frontend

Deverão ser priorizados testes para:

- formulários;
- filtros;
- componentes críticos;
- comportamento do dashboard;
- estados de carregamento;
- tratamento de erros.

## 36. Estados da interface

As telas deverão possuir estados explícitos para:

### Loading

Quando os dados estiverem sendo carregados.

### Empty

Quando não houver dados.

### Error

Quando ocorrer uma falha.

### Success

Quando uma operação for concluída.

**Exemplo:**

```text
Loading
   ↓
Success → Dados apresentados
```

```text
Loading
   ↓
Empty → Nenhuma atividade encontrada
```

```text
Loading
   ↓
Error → Mensagem + ação de tentar novamente
```

## 37. Critérios de aceite — atividades

Uma atividade será considerada implementada quando:

- puder ser criada;
- puder ser editada;
- possuir responsável;
- possuir prioridade;
- possuir status;
- possuir prazo;
- puder ser concluída;
- puder ser filtrada;
- puder ser visualizada no Kanban;
- refletir seus dados corretamente no dashboard.

## 38. Critérios de aceite — dashboard

O dashboard deverá:

- apresentar indicadores reais do banco;
- permitir selecionar um período;
- apresentar atividades atrasadas;
- apresentar próximas do vencimento;
- apresentar distribuição por colaborador;
- apresentar evolução temporal;
- atualizar os indicadores após alterações nas atividades.

Os indicadores deverão possuir uma finalidade de decisão documentada, conforme exigência do desafio.

## 39. Critérios de aceite — metodologia

O README deverá documentar:

1. metodologia escolhida;
2. motivo da escolha;
3. como a metodologia foi adaptada ao contexto;
4. como ela influencia o sistema.

A proposta atual utiliza principalmente:

```text
Kanban
+
Priorização
+
Indicadores operacionais
```

O desafio explicitamente permite escolher uma metodologia, combinar abordagens ou adaptá-las, desde que a decisão seja justificada.

## 40. Critérios de qualidade

Antes de considerar o MVP concluído, deverão ser verificados:

### Backend

- API funcionando;
- migrations funcionando;
- banco configurado;
- validação implementada;
- autenticação funcionando;
- autorização funcionando;
- erros tratados;
- testes críticos implementados.

### Frontend

- login funcionando;
- dashboard funcionando;
- CRUD de atividades funcionando;
- Kanban funcionando;
- usuários funcionando;
- filtros funcionando;
- gráficos funcionando;
- estados de loading/empty/error;
- responsividade.

### Integração

- frontend consumindo API;
- indicadores calculados a partir dos dados reais;
- alterações refletidas no dashboard;
- erros da API tratados no frontend.

## 41. MVP — ordem de implementação

A implementação deverá seguir uma sequência que minimize dependências bloqueantes.

### Fase 1 — Fundação

- criação do backend;
- criação do frontend;
- configuração TypeScript;
- configuração PostgreSQL;
- configuração Prisma;
- configuração Tailwind;
- configuração Recharts;
- variáveis de ambiente.

### Fase 2 — Banco

- User;
- Category;
- Task;
- migrations;
- seed inicial.

### Fase 3 — Backend básico

- Users;
- Tasks;
- Categories;
- validações;
- CRUD.

### Fase 4 — Autenticação

- login;
- sessão/token;
- guards;
- autorização.

### Fase 5 — Frontend operacional

- layout;
- login;
- usuários;
- atividades;
- formulários;
- filtros.

### Fase 6 — Kanban

- colunas;
- cards;
- alteração de status;
- atualização da API.

### Fase 7 — Dashboard

- KPIs;
- gráficos;
- atividades atrasadas;
- próximos vencimentos;
- filtros temporais.

### Fase 8 — Qualidade

- testes;
- tratamento de erros;
- responsividade;
- revisão de UX;
- documentação.

## 42. Backlog inicial

| ID | Item | Prioridade |
|---|---|---|
| TASK-001 | Configurar backend NestJS | Alta |
| TASK-002 | Configurar Prisma | Alta |
| TASK-003 | Configurar PostgreSQL | Alta |
| TASK-004 | Criar modelo User | Alta |
| TASK-005 | Criar modelo Task | Alta |
| TASK-006 | Criar modelo Category | Média |
| TASK-007 | Implementar autenticação | Alta |
| TASK-008 | Implementar CRUD de usuários | Alta |
| TASK-009 | Implementar CRUD de atividades | Alta |
| TASK-010 | Implementar filtros de atividades | Alta |
| TASK-011 | Implementar regras de prazo | Alta |
| TASK-012 | Implementar Kanban | Alta |
| TASK-013 | Configurar React | Alta |
| TASK-014 | Configurar Tailwind | Alta |
| TASK-015 | Criar layout | Alta |
| TASK-016 | Criar tela de login | Alta |
| TASK-017 | Criar tela de atividades | Alta |
| TASK-018 | Criar dashboard | Alta |
| TASK-019 | Implementar KPIs | Alta |
| TASK-020 | Implementar gráficos | Alta |
| TASK-021 | Implementar responsividade | Média |
| TASK-022 | Implementar testes | Alta |
| TASK-023 | Documentar projeto | Alta |

## 43. Estrutura final esperada

```text
project/
│
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── tasks/
│   │   ├── categories/
│   │   ├── dashboard/
│   │   ├── common/
│   │   └── database/
│   │
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seed.ts
│   │
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── modules/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── routes/
│   │   └── types/
│   │
│   └── package.json
│
├── docker-compose.yml
├── README.md
└── .env.example
```

## 44. Decisões técnicas ainda pendentes

Algumas decisões não são determinadas pelo desafio e deverão ser tomadas antes ou durante a implementação:

### Autenticação

- JWT ou sessão;
- armazenamento do token;
- refresh token;
- expiração.

### Autorização

- permissões por role;
- permissões por recurso;
- ações permitidas para cada perfil.

### Kanban

- drag and drop;
- alteração de status por menu;
- restrições de movimentação.

### Prazo

- quantidade de dias considerada "próxima do vencimento";
- tratamento de finais de semana;
- timezone.

### Exclusão

- exclusão física;
- soft delete.

### Dashboard

- período padrão;
- filtros;
- atualização automática;
- cache.

Essas decisões deverão ser registradas na documentação técnica conforme forem definidas.

## 45. Riscos técnicos

### Risco 1 — Dashboard excessivamente complexo

A criação de muitos indicadores pode transformar o dashboard em uma tela de difícil interpretação.

**Mitigação:** cada indicador deverá possuir uma finalidade de decisão documentada.

### Risco 2 — Confundir quantidade de tarefas com produtividade

Um colaborador possuir mais tarefas não significa necessariamente que seja mais produtivo ou esteja sobrecarregado, pois as atividades podem possuir complexidades diferentes.

**Mitigação:** apresentar o indicador como distribuição de trabalho e evitar utilizá-lo isoladamente como métrica de produtividade.

### Risco 3 — Consultas pesadas no dashboard

Consultas agregadas sobre grande volume de atividades podem impactar a performance.

**Mitigação:**

- agregações no banco;
- índices;
- filtros por período;
- paginação quando aplicável;
- cache em versões futuras.

### Risco 4 — Regras de negócio espalhadas

Regras implementadas diretamente nos componentes React ou controllers podem gerar inconsistências.

**Mitigação:** concentrar regras de negócio no backend e manter o frontend responsável principalmente pela experiência de interação.

## 46. Evolução arquitetural

O MVP deverá privilegiar simplicidade.

Não é necessário introduzir desde o primeiro momento:

- microservices;
- event sourcing;
- CQRS;
- filas;
- Elasticsearch;
- infraestrutura distribuída;
- sistemas de mensageria.

A arquitetura inicial deverá permanecer em uma aplicação monolítica modular:

```text
Backend
    │
    ┌───────────┼───────────┐
    │           │           │
   Auth       Tasks      Dashboard
    │           │           │
    └───────────┼───────────┘
                │
              Prisma
                │
            PostgreSQL
```

Essa abordagem é suficiente para o escopo inicial e mantém o projeto simples de desenvolver, testar e demonstrar.

## 47. Resultado esperado

Ao final do MVP, o sistema deverá permitir que um gestor entre na aplicação e obtenha uma visão objetiva da situação da equipe.

O fluxo esperado será:

```text
┌──────────────┐
│    LOGIN     │
└──────┬───────┘
       ↓
┌──────────────┐
│  DASHBOARD   │
└──────┬───────┘
       ↓
┌───────────────┼────────────────┐
↓               ↓                ↓
Atividades    Kanban           Equipe
│               │                │
└───────────────┼────────────────┘
                ↓
           Dados reais
                ↓
           Indicadores
                ↓
             Decisão
```

O produto deverá resolver o problema fundamental apresentado no desafio: substituir uma visão fragmentada do trabalho por uma visão centralizada, permitindo ao gestor acompanhar atividades, prazos e distribuição do trabalho e utilizar indicadores para apoiar suas decisões.

O desafio enfatiza justamente que o desenho de como a ferramenta organiza e apresenta o trabalho faz parte da avaliação.

## 48. Definição do MVP

O MVP será considerado concluído quando for possível executar o seguinte cenário de ponta a ponta:

1. Gestor realiza login.
2. Gestor visualiza o dashboard.
3. Gestor cadastra membros da equipe.
4. Gestor cria uma atividade.
5. Gestor define responsável.
6. Gestor define prioridade.
7. Gestor define prazo.
8. Colaborador visualiza a atividade.
9. Colaborador inicia a atividade.
10. Atividade passa pelo fluxo Kanban.
11. Atividade é concluída.
12. `completedAt` é registrado.
13. Dashboard é atualizado.
14. Indicadores refletem a alteração.
15. Atividades atrasadas e próximas do vencimento são identificadas.
16. Gestor utiliza essas informações para acompanhar a operação.

Esse fluxo representa o núcleo funcional do produto e deve ser priorizado antes da implementação de funcionalidades secundárias.
