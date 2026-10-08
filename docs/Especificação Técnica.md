# Especificação Técnica

**Plataforma de Gestão de Atividades e Indicadores de Equipe**

- **Versão:** 2.0
- **Status:** Especificação consolidada
- **Fonte primária:** Especificação Técnica v1.0, consolidada com as decisões de produto e domínio posteriores
- **Nomenclatura oficial:** Atividade
- **Backend:** NestJS + TypeScript + Prisma ORM + PostgreSQL
- **Frontend:** React + TypeScript + Tailwind CSS + Recharts

> **Nota sobre escopo técnico:** esta versão consolida o conteúdo da especificação técnica original e as decisões funcionais tomadas posteriormente. A arquitetura detalhada, os padrões de projeto, a organização definitiva dos módulos e outras decisões de implementação serão especificados posteriormente. As estruturas técnicas apresentadas neste documento são referências iniciais, não decisões arquiteturais definitivas.

---

## 1. Objetivo do documento

Este documento especifica a implementação da Plataforma de Gestão de Atividades e Indicadores de Equipe.

O objetivo é transformar a proposta de produto em uma referência para desenvolvimento, definindo:

- contexto e escopo;
- requisitos funcionais;
- regras de negócio;
- permissões;
- fluxo das atividades;
- categorias;
- Kanban;
- dashboard e indicadores;
- fluxos funcionais;
- requisitos não funcionais;
- critérios de aceite;
- escopo do MVP;
- possíveis evoluções.

A especificação técnica original é a fonte primária deste documento. As decisões posteriores registradas durante a definição do produto foram incorporadas para eliminar ou atualizar regras que ficaram desatualizadas.

A arquitetura detalhada e os padrões de projeto serão definidos posteriormente, a partir deste domínio consolidado.

---

## 2. Contexto

A aplicação tem como objetivo centralizar o gerenciamento das atividades de uma equipe e fornecer ao gestor informações que permitam acompanhar a operação e tomar decisões.

O problema apresentado pelo desafio é a dispersão do trabalho em planilhas, papel e grupos de mensagens, dificultando a identificação do que está realmente em andamento. Também são apresentados problemas relacionados à distribuição de atividades, atrasos e ausência de indicadores objetivos para reuniões de acompanhamento.

O sistema deverá, portanto, permitir que a equipe:

1. registre atividades;
2. atribua responsáveis;
3. estabeleça prazos;
4. acompanhe o fluxo de execução;
5. identifique situações de atenção;
6. visualize indicadores;
7. utilize essas informações para tomar decisões.

---

## 3. Escopo

### 3.1. Escopo funcional

O MVP deverá contemplar:

- autenticação;
- gerenciamento de usuários;
- gerenciamento de atividades;
- gerenciamento de categorias;
- atribuição de atividades;
- controle de status;
- controle de prioridade;
- controle de prazos;
- comentários em atividades;
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

---

# 4. Requisitos funcionais

## RF01 — Autenticação

O sistema deverá permitir que usuários ativos se autentiquem e acessem as funcionalidades protegidas.

### Funcionalidades

- login;
- logout;
- consulta do usuário autenticado;
- proteção das rotas;
- controle de acesso;
- renovação da sessão;
- alteração da própria senha.

### Regras

- a autenticação será baseada em JWT;
- todos os perfis poderão realizar login;
- usuários inativos não poderão realizar login;
- o token de acesso terá validade de 1 hora;
- quando o token expirar, a aplicação deverá apresentar uma interface de sessão expirada;
- essa interface deverá permanecer disponível por 30 segundos;
- durante essa janela, o usuário poderá escolher continuar logado;
- ao escolher continuar logado, deverá ser utilizado o mecanismo de refresh token para renovar a sessão;
- caso o usuário não confirme a continuidade dentro dos 30 segundos, deverá ser redirecionado para o login;
- o usuário poderá alterar a própria senha;
- não haverá obrigação de troca de senha no primeiro acesso;
- o usuário poderá continuar utilizando a senha criada inicialmente pelo ADMIN ou alterá-la posteriormente por decisão própria.

O armazenamento do refresh token e os detalhes de segurança associados à renovação serão definidos na especificação arquitetural.

---

## RF02 — Gerenciamento de usuários

O sistema deverá permitir visualizar e administrar os usuários da equipe conforme as permissões de cada perfil.

### Dados

- nome;
- e-mail;
- cargo/função;
- perfil;
- status;
- data de criação.

### Perfis

- `ADMIN`;
- `MANAGER`;
- `MEMBER`.

### Operações

- listar usuários;
- visualizar usuário;
- criar usuário;
- editar usuário;
- ativar usuário;
- desativar usuário.

As permissões dessas operações estão definidas na matriz de permissões.

---

## RF03 — Gerenciamento de atividades

O sistema deverá permitir registrar e acompanhar as atividades da equipe.

O requisito corresponde diretamente à exigência funcional de registrar e acompanhar o trabalho, incluindo atividades, responsáveis e prazos.

### Dados da atividade

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

### Operações

- criar atividade;
- listar atividades;
- visualizar atividade;
- editar atividade;
- excluir atividade;
- atribuir responsável;
- alterar status;
- alterar prioridade;
- comentar atividade.

As permissões dessas operações estão definidas na matriz de permissões.

---

## RF04 — Gerenciamento de categorias

O sistema deverá permitir organizar atividades por categorias.

### Operações

- criar categoria;
- editar categoria;
- excluir categoria;
- ativar categoria;
- desativar categoria;
- listar categorias;
- visualizar categoria.

ADMIN não possui permissões sobre categorias. Essas operações pertencem ao MANAGER.

---

## RF05 — Kanban

O sistema deverá fornecer uma visualização Kanban das atividades.

O Kanban deverá:

- apresentar atividades agrupadas por status;
- permitir drag-and-drop;
- alterar o status da atividade quando uma movimentação for permitida;
- respeitar as mesmas regras de status utilizadas nas demais interfaces;
- respeitar as permissões do usuário;
- apresentar atividades `CANCELLED`.

O Kanban não deverá possuir regras de negócio independentes. A movimentação deverá utilizar as mesmas regras de alteração de status do domínio de atividades.

---

## RF06 — Dashboard e indicadores

O sistema deverá fornecer um dashboard gerencial com indicadores calculados a partir dos dados das atividades.

O dashboard deverá:

- permitir seleção de período;
- aplicar os filtros selecionados aos indicadores;
- combinar filtros utilizando AND;
- apresentar indicadores operacionais;
- apresentar atividades atrasadas;
- apresentar próximas do vencimento;
- apresentar distribuição por colaborador;
- apresentar evolução temporal;
- atualizar os dados após alterações nas atividades.

Os indicadores deverão utilizar as datas relevantes para cada tipo de análise e poderão ser agrupados por períodos de:

- 1 semana;
- 1 mês;
- 3 meses;
- 6 meses;
- 1 ano.

---

# 5. Perfis e matriz de permissões

Os três perfis possuem responsabilidades distintas.

## 5.1. ADMIN

O ADMIN é responsável pela administração dos usuários.

Pode:

- visualizar usuários;
- criar ADMIN, MANAGER e MEMBER;
- editar qualquer usuário;
- ativar usuários;
- desativar usuários.

O ADMIN não possui permissões operacionais sobre atividades ou categorias.

Portanto, o ADMIN não pode:

- criar atividades;
- editar atividades;
- excluir atividades;
- atribuir atividades;
- alterar prioridade;
- alterar status;
- revisar atividades;
- comentar atividades;
- criar categorias;
- editar categorias;
- excluir categorias;
- ativar categorias;
- desativar categorias.

---

## 5.2. MANAGER

O MANAGER é responsável pela gestão operacional da equipe e das atividades.

Pode:

- visualizar usuários;
- criar MEMBER;
- ativar MEMBER;
- desativar MEMBER;
- editar apenas a si mesmo;
- criar atividades;
- editar atividades;
- excluir atividades;
- atribuir atividades;
- alterar prioridade;
- alterar status;
- revisar atividades;
- comentar atividades;
- criar categorias;
- editar categorias;
- excluir categorias;
- ativar categorias;
- desativar categorias;
- visualizar dashboard e indicadores.

O MANAGER não pode criar, editar, ativar ou desativar ADMIN ou outro MANAGER.

---

## 5.3. MEMBER

O MEMBER pode:

- visualizar seus próprios dados;
- editar a si mesmo;
- visualizar as atividades às quais possui acesso;
- atribuir uma atividade a si mesmo;
- alterar o status das próprias atividades, respeitando as regras de transição;
- comentar nas próprias atividades.

O MEMBER não pode:

- criar atividades;
- editar atividades;
- excluir atividades;
- alterar prioridade;
- revisar atividades;
- alterar atividades de outros usuários;
- criar categorias;
- editar categorias;
- excluir categorias;
- ativar categorias;
- desativar categorias.

---

## 5.4. Matriz resumida

| Ação                   | ADMIN | MANAGER |  MEMBER |
| ---------------------- | ----: | ------: | ------: |
| Editar próprio usuário |   Sim |     Sim |     Sim |
| Editar outro usuário   |   Sim |     Não |     Não |
| Criar ADMIN            |   Sim |     Não |     Não |
| Criar MANAGER          |   Sim |     Não |     Não |
| Criar MEMBER           |   Sim |     Sim |     Não |
| Ativar ADMIN           |   Sim |     Não |     Não |
| Desativar ADMIN        |   Sim |     Não |     Não |
| Ativar MANAGER         |   Sim |     Não |     Não |
| Desativar MANAGER      |   Sim |     Não |     Não |
| Ativar MEMBER          |   Sim |     Sim |     Não |
| Desativar MEMBER       |   Sim |     Sim |     Não |
| Criar atividade        |   Não |     Sim |     Não |
| Editar atividade       |   Não |     Sim |     Não |
| Excluir atividade      |   Não |     Sim |     Não |
| Atribuir atividade     |   Não |     Sim | Própria |
| Alterar prioridade     |   Não |     Sim |     Não |
| Alterar status         |   Não |     Sim | Própria |
| Revisar atividade      |   Não |     Sim |     Não |
| Comentar atividade     |   Não |     Sim | Própria |
| Criar categoria        |   Não |     Sim |     Não |
| Editar categoria       |   Não |     Sim |     Não |
| Excluir categoria      |   Não |     Sim |     Não |
| Ativar categoria       |   Não |     Sim |     Não |
| Desativar categoria    |   Não |     Sim |     Não |

---

# 6. Fluxo de status das atividades

Os status possíveis são:

- `TODO` — A fazer;
- `IN_PROGRESS` — Em andamento;
- `REVIEW` — Em revisão;
- `DONE` — Concluída;
- `CANCELLED` — Cancelada.

O fluxo visual principal é:

```text
TODO
  ↓
IN_PROGRESS
  ↓
REVIEW
  ↓
DONE
```

`CANCELLED` é um estado adicional e deve estar disponível no Kanban.

## 6.1. Regras de transição

A regra geral é:

- regressões de status são permitidas;
- cancelamento pode ocorrer a partir de qualquer status, exceto `CANCELLED`;
- conclusão só pode ocorrer a partir de `REVIEW`;
- `CANCELLED` é terminal;
- uma atividade não pode sair de `CANCELLED`;
- uma atividade que já esteja em `DONE` pode retornar a um status anterior permitido;
- ao sair de `DONE`, `completedAt = null`;
- ao entrar em `DONE`, `completedAt = data/hora atual`;
- ao entrar em `CANCELLED`, `completedAt = null`.

### Matriz de transição

| Estado atual | TODO | IN_PROGRESS | REVIEW | DONE | CANCELLED |
| ------------ | ---: | ----------: | -----: | ---: | --------: |
| TODO         |    — |         Sim |    Sim |  Não |       Sim |
| IN_PROGRESS  |  Sim |           — |    Sim |  Não |       Sim |
| REVIEW       |  Sim |         Sim |      — |  Sim |       Sim |
| DONE         |  Sim |         Sim |    Sim |    — |       Sim |
| CANCELLED    |  Não |         Não |    Não |  Não |         — |

A tabela representa transições permitidas pelo domínio. A autorização determina se o usuário específico pode executar uma transição permitida.

## 6.2. Início da atividade

Quando uma atividade entrar em `IN_PROGRESS` pela primeira vez:

```text
startedAt = data/hora atual
```

`startedAt` representa o primeiro início registrado da atividade.

Como não existe uma operação explícita de reinício neste momento, regressões e novas entradas em `IN_PROGRESS` não deverão sobrescrever o `startedAt` original.

## 6.3. Conclusão

Uma atividade só pode entrar em `DONE` quando estiver em `REVIEW`.

Ao entrar em `DONE`:

```text
completedAt = data/hora atual
```

Ao sair de `DONE`:

```text
completedAt = null
```

Ao retornar posteriormente a `DONE`:

```text
completedAt = data/hora atual
```

## 6.4. Cancelamento

Uma atividade pode ser cancelada a partir de qualquer estado, exceto `CANCELLED`.

Ao entrar em `CANCELLED`:

```text
completedAt = null
```

Uma atividade cancelada não pode retornar a outro status.

---

# 7. Prioridade

As atividades possuirão uma prioridade.

| Prioridade | Descrição |
| ---------- | --------- |
| `LOW`      | Baixa     |
| `MEDIUM`   | Média     |
| `HIGH`     | Alta      |
| `CRITICAL` | Crítica   |

A prioridade será utilizada para organização, filtragem e ordenação das atividades.

Somente o MANAGER possui permissão para alterar prioridade.

## 7.1. Atividades críticas

Atividades `CRITICAL` deverão:

- possuir identificação visual adequada;
- aparecer no topo das ordenações em que a prioridade for relevante;
- ser destacadas de maneira clara no Kanban e nas listagens;
- permanecer sujeitas às demais regras de status e permissão.

O comportamento visual exato será detalhado na especificação de interface.

---

# 8. Regras de negócio

## RN01 — Responsável

Uma atividade poderá não possuir responsável.

Atividades sem responsável deverão ser identificáveis através de filtro específico.

O MANAGER poderá atribuir uma atividade a um MEMBER.

O MEMBER poderá atribuir a atividade a si próprio quando a regra de acesso permitir.

## RN02 — Prazo

Uma atividade poderá possuir uma data limite.

A aplicação deverá determinar sua situação de prazo:

**Normal**

```text
dueDate >= hoje
```

e fora da janela de alerta.

**Próxima do vencimento**

A atividade está dentro da janela configurada para alerta.

**Atrasada**

```text
dueDate < hoje
```

e a atividade não está em `DONE` nem em `CANCELLED`.

A janela de alerta deverá ser configurável.

## RN03 — Conclusão

Uma atividade só poderá ser concluída a partir de `REVIEW`.

Ao entrar em `DONE`:

```text
completedAt = data/hora atual
```

Ao sair de `DONE`:

```text
completedAt = null
```

Ao entrar novamente em `DONE`:

```text
completedAt = data/hora atual
```

## RN04 — Início

Quando uma atividade passar para `IN_PROGRESS` pela primeira vez:

```text
startedAt = data/hora atual
```

A data original de início não deverá ser sobrescrita em alterações posteriores enquanto não existir uma ação explícita de reinício.

## RN05 — Atividade atrasada

Uma atividade não deverá ser considerada atrasada quando estiver:

- concluída;
- cancelada.

## RN06 — Usuário inativo

Usuários inativos não deverão ser selecionáveis como novos responsáveis por atividades.

Atividades históricas de usuários posteriormente desativados deverão permanecer preservadas.

## RN07 — Categoria obrigatória

Toda atividade deverá possuir uma categoria.

Uma atividade não poderá ser criada sem categoria válida.

## RN08 — Categoria desativada

Uma categoria poderá ser desativada.

Categorias desativadas:

- não poderão ser selecionadas para novas atividades;
- continuarão vinculadas às atividades existentes;
- continuarão sendo exibidas nas atividades históricas.

A desativação não deverá remover nem alterar os vínculos existentes.

## RN09 — Exclusão de categoria

Uma categoria não poderá ser excluída enquanto possuir atividades relacionadas.

Quando não houver atividades relacionadas, a exclusão poderá ocorrer conforme a política de persistência definida posteriormente.

## RN10 — Filtros

Quando múltiplos filtros forem utilizados simultaneamente, eles deverão ser combinados utilizando lógica AND.

Exemplo:

```text
status = IN_PROGRESS
AND
priority = HIGH
AND
category = X
```

## RN11 — Atividades canceladas nos indicadores

As atividades `CANCELLED` deverão ser excluídas dos indicadores operacionais, exceto quando um indicador específico tiver como objetivo analisar cancelamentos.

## RN12 — Taxa de conclusão

A taxa de conclusão será calculada, no período selecionado, como:

```text
atividades concluídas no período
──────────────────────────────── × 100
atividades existentes no período
```

## RN13 — Datas relevantes

Os indicadores deverão utilizar a data relevante para o fenômeno que está sendo analisado.

| Análise               | Data relevante              |
| --------------------- | --------------------------- |
| Atividades criadas    | `createdAt`                 |
| Atividades iniciadas  | `startedAt`                 |
| Atividades concluídas | `completedAt`               |
| Prazo                 | `dueDate`                   |
| Tempo de execução     | `startedAt` e `completedAt` |

A mesma atividade poderá participar de análises diferentes utilizando datas diferentes.

---

# 9. Categorias

As categorias são utilizadas para classificar atividades.

## 9.1. Operações

O MANAGER poderá:

- criar;
- editar;
- excluir;
- ativar;
- desativar.

## 9.2. Estado ativo/inativo

Categorias deverão possuir estado ativo/inativo.

Categorias inativas:

- não poderão ser utilizadas em novas atividades;
- continuarão vinculadas às atividades existentes.

## 9.3. Integridade

Uma categoria relacionada a atividades não poderá ser excluída.

A implementação deverá preservar o histórico das atividades.

---

# 10. Kanban

O Kanban deverá apresentar as atividades agrupadas pelos status:

```text
TODO
IN_PROGRESS
REVIEW
DONE
CANCELLED
```

## 10.1. Movimentação

A movimentação de uma atividade deverá:

1. verificar a permissão do usuário;
2. verificar se a transição de status é permitida;
3. aplicar as regras de domínio;
4. atualizar a atividade;
5. refletir a alteração na interface.

O Kanban não deverá criar regras de negócio próprias.

## 10.2. MEMBER

O MEMBER poderá mover somente atividades próprias.

Mesmo para atividades próprias, deverá respeitar as regras de transição.

Por exemplo, um MEMBER não poderá mover diretamente:

```text
TODO → DONE
```

porque `DONE` exige que a atividade esteja em `REVIEW`.

## 10.3. MANAGER

O MANAGER poderá movimentar atividades conforme suas permissões de gestão, respeitando as regras de transição.

## 10.4. CANCELLED

`CANCELLED` deverá aparecer como coluna do Kanban.

Atividades canceladas não poderão ser movidas para outros status.

---

# 11. Dashboard

O dashboard deverá fornecer uma visão operacional da equipe.

## 11.1. Períodos

A análise deverá suportar:

- 1 semana;
- 1 mês;
- 3 meses;
- 6 meses;
- 1 ano.

## 11.2. Filtros

Os filtros do dashboard deverão ser combinados utilizando AND.

Filtros previstos:

- período;
- colaborador;
- categoria;
- prioridade;
- status;
- situação de prazo.

## 11.3. Atualização

As alterações realizadas nas atividades deverão refletir-se nos indicadores após a atualização dos dados do dashboard.

---

# 12. Indicadores

Os indicadores constituem uma parte essencial do projeto.

Os números apresentados devem possuir utilidade para decisão e sua finalidade deverá ser explicada no README.

## KPI01 — Atividades abertas

Quantidade de atividades cujo status não seja:

- `DONE`;
- `CANCELLED`.

**Finalidade**

Permitir avaliar o volume atual de trabalho pendente.

## KPI02 — Atividades em andamento

Quantidade de atividades com status `IN_PROGRESS`.

**Finalidade**

Permitir acompanhar o volume de trabalho atualmente em execução.

## KPI03 — Atividades atrasadas

Quantidade de atividades cujo prazo foi ultrapassado e que não estejam concluídas ou canceladas.

**Finalidade**

Identificar problemas que já exigem intervenção.

## KPI04 — Próximos vencimentos

Quantidade de atividades que entrarão em situação de vencimento dentro da janela configurada.

**Finalidade**

Permitir intervenção preventiva.

## KPI05 — Taxa de conclusão

**Fórmula:**

```text
atividades concluídas no período
──────────────────────────────── × 100
atividades existentes no período
```

**Finalidade**

Acompanhar a capacidade de conclusão da equipe no período selecionado.

## KPI06 — Cumprimento de prazo

**Fórmula conceitual:**

```text
atividades concluídas no prazo
────────────────────────────── × 100
atividades concluídas com prazo
```

**Finalidade**

Avaliar o cumprimento dos compromissos estabelecidos.

## KPI07 — Distribuição por colaborador

Quantidade de atividades atribuídas a cada usuário.

A análise poderá ser realizada nos períodos de 1 mês, 3 meses, 6 meses ou 1 ano, utilizando a data relevante para o recorte adotado.

**Finalidade**

Identificar concentração ou distribuição desigual do trabalho.

Esse indicador não deverá ser interpretado isoladamente como medida de produtividade ou sobrecarga, pois quantidade de atividades não representa necessariamente complexidade.

## KPI08 — Tempo médio de conclusão

**Fórmula:**

```text
Σ (completedAt - startedAt)
───────────────────────────
atividades concluídas
```

A análise deverá considerar atividades que possuam as datas necessárias.

**Finalidade**

Acompanhar a duração média do fluxo de execução.

---

# 13. Análise temporal

A análise temporal deverá permitir observar a evolução das atividades em diferentes horizontes:

- 1 semana;
- 1 mês;
- 3 meses;
- 6 meses;
- 1 ano.

As séries temporais deverão utilizar as datas relevantes para cada fenômeno.

Exemplo:

```text
Criação       → createdAt
Início        → startedAt
Conclusão     → completedAt
Prazo         → dueDate
```

A granularidade de agrupamento poderá variar de acordo com o período selecionado.

O objetivo é permitir observar evolução, concentração, atrasos e capacidade de conclusão ao longo do tempo.

---

# 14. Arquitetura geral

A aplicação será dividida conceitualmente em frontend, backend e banco de dados.

A arquitetura abaixo preserva a proposta da especificação original como referência inicial:

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

Essa estrutura é uma referência inicial. A arquitetura definitiva será especificada posteriormente.

---

# 15. Backend — referência inicial

## 15.1. Módulos conceituais

A especificação original propõe:

```text
src/
├── auth/
├── users/
├── activities/
├── categories/
├── dashboard/
├── common/
└── database/
```

Responsabilidades conceituais:

**Auth**

- autenticação;
- renovação da sessão;
- usuário autenticado;
- guards;
- autorização.

**Users**

- usuários;
- perfis;
- status;
- alteração de senha.

**Activities**

- atividades;
- status;
- prioridades;
- responsáveis;
- prazos;
- comentários;
- regras de transição.

**Categories**

- categorias;
- ativação/desativação;
- integridade dos vínculos.

**Dashboard**

- indicadores;
- consultas agregadas;
- análise temporal.

**Database**

- integração com persistência.

A organização definitiva será decidida posteriormente.

---

# 16. Camadas do backend — referência inicial

A implementação deverá evitar concentrar toda a lógica nos controllers.

A estrutura conceitual original é:

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

A definição detalhada de responsabilidades e padrões de projeto será feita posteriormente.

---

# 17. Modelo de dados conceitual

## User

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

## Activity

```text
Activity
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

## Category

```text
Category
├── id
├── name
├── description
├── active
├── createdAt
└── updatedAt
```

## Comment

O domínio de comentários exige persistência associada à atividade e ao usuário autor.

A estrutura definitiva será especificada junto do modelo de dados arquitetural.

---

# 18. Relacionamentos

```text
User
  │
  │ 1:N
  ▼
Activity
  │
  │ N:1
  ▼
Category

Activity
  │
  │ 1:N
  ▼
Comment
  ▲
  │ N:1
User
```

- Um usuário poderá possuir várias atividades como responsável.
- Uma atividade poderá possuir um usuário responsável.
- Uma categoria poderá possuir várias atividades.
- Uma atividade poderá possuir vários comentários.
- Um usuário poderá criar vários comentários.

---

# 19. Modelo Prisma conceitual

O modelo abaixo mantém a proposta da especificação original, adaptada para a nomenclatura oficial de Atividade e para as novas regras de categoria.

```prisma
enum UserRole {
  ADMIN
  MANAGER
  MEMBER
}

enum ActivityStatus {
  TODO
  IN_PROGRESS
  REVIEW
  DONE
  CANCELLED
}

enum ActivityPriority {
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

  activities Activity[]
  comments   Comment[]
}

model Category {
  id          String     @id @default(uuid())
  name        String     @unique
  description String?
  active      Boolean    @default(true)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  activities Activity[]
}

model Activity {
  id          String           @id @default(uuid())
  title       String
  description String?
  status      ActivityStatus   @default(TODO)
  priority    ActivityPriority @default(MEDIUM)
  dueDate     DateTime?
  startedAt   DateTime?
  completedAt DateTime?
  createdAt   DateTime         @default(now())
  updatedAt   DateTime         @updatedAt
  assigneeId  String?
  categoryId  String

  assignee User?    @relation(fields: [assigneeId], references: [id])
  category Category @relation(fields: [categoryId], references: [id])
  comments Comment[]

  @@index([assigneeId])
  @@index([status])
  @@index([priority])
  @@index([dueDate])
  @@index([categoryId])
}

model Comment {
  id         String   @id @default(uuid())
  content    String
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  activityId String
  authorId   String

  activity Activity @relation(fields: [activityId], references: [id])
  author   User     @relation(fields: [authorId], references: [id])

  @@index([activityId])
  @@index([authorId])
}
```

> O schema acima é um modelo conceitual atualizado, não uma decisão definitiva de implementação. Relações, índices, estratégias de exclusão e detalhes de persistência serão validados na especificação arquitetural.

---

# 20. API REST — referência inicial

A API deverá refletir os recursos do domínio. Os nomes e contratos definitivos serão definidos posteriormente.

## 20.1. Auth

| Método  | Endpoint         | Descrição                              |
| ------- | ---------------- | -------------------------------------- |
| `POST`  | `/auth/login`    | Autentica o usuário.                   |
| `POST`  | `/auth/logout`   | Encerra a sessão.                      |
| `POST`  | `/auth/refresh`  | Renova a sessão.                       |
| `GET`   | `/auth/me`       | Retorna o usuário autenticado.         |
| `PATCH` | `/auth/password` | Altera a senha do usuário autenticado. |

## 20.2. Users

| Método  | Endpoint            | Descrição                            |
| ------- | ------------------- | ------------------------------------ |
| `GET`   | `/users`            | Lista usuários.                      |
| `GET`   | `/users/:id`        | Retorna um usuário.                  |
| `POST`  | `/users`            | Cria usuário conforme permissão.     |
| `PATCH` | `/users/:id`        | Atualiza usuário conforme permissão. |
| `PATCH` | `/users/:id/active` | Ativa/desativa usuário.              |

## 20.3. Activities

| Método   | Endpoint                   | Descrição               |
| -------- | -------------------------- | ----------------------- |
| `GET`    | `/activities`              | Lista atividades.       |
| `GET`    | `/activities/:id`          | Retorna uma atividade.  |
| `POST`   | `/activities`              | Cria uma atividade.     |
| `PATCH`  | `/activities/:id`          | Atualiza uma atividade. |
| `DELETE` | `/activities/:id`          | Remove uma atividade.   |
| `PATCH`  | `/activities/:id/status`   | Atualiza o status.      |
| `PATCH`  | `/activities/:id/assignee` | Altera o responsável.   |
| `POST`   | `/activities/:id/comments` | Adiciona comentário.    |
| `GET`    | `/activities/:id/comments` | Lista comentários.      |

**Filtros previstos:**

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

## 20.4. Categories

| Método   | Endpoint                 | Descrição                          |
| -------- | ------------------------ | ---------------------------------- |
| `GET`    | `/categories`            | Lista categorias.                  |
| `GET`    | `/categories/:id`        | Retorna uma categoria.             |
| `POST`   | `/categories`            | Cria categoria.                    |
| `PATCH`  | `/categories/:id`        | Atualiza categoria.                |
| `DELETE` | `/categories/:id`        | Remove categoria quando permitido. |
| `PATCH`  | `/categories/:id/active` | Ativa/desativa categoria.          |

## 20.5. Dashboard

| Método | Endpoint                          | Descrição                                   |
| ------ | --------------------------------- | ------------------------------------------- |
| `GET`  | `/dashboard/summary`              | Retorna resumo dos indicadores.             |
| `GET`  | `/dashboard/activities-by-user`   | Retorna distribuição por colaborador.       |
| `GET`  | `/dashboard/activities-over-time` | Retorna evolução temporal.                  |
| `GET`  | `/dashboard/deadlines`            | Retorna atrasadas e próximas do vencimento. |

---

# 21. Dashboard API — retorno conceitual

## `GET /dashboard/summary`

```json
{
  "open": 18,
  "inProgress": 10,
  "overdue": 4,
  "completed": 24,
  "completionRate": 57.14,
  "onTimeRate": 83.33
}
```

## `GET /dashboard/activities-by-user`

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

## `GET /dashboard/activities-over-time`

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

## `GET /dashboard/deadlines`

Retorna atividades:

- atrasadas;
- próximas do vencimento.

---

# 22. Frontend

## Estrutura conceitual

```text
src/
├── components/
├── layouts/
├── pages/
├── modules/
│   ├── auth/
│   ├── dashboard/
│   ├── activities/
│   ├── users/
│   └── categories/
├── services/
├── hooks/
├── routes/
├── types/
└── styles/
```

A estrutura é uma referência inicial e será refinada posteriormente.

---

# 23. Páginas

## `/login`

Tela de autenticação.

Deverá também apresentar o fluxo de sessão expirada e a possibilidade de renovação durante a janela de 30 segundos.

## `/dashboard`

Dashboard gerencial.

Componentes conceituais:

```text
Dashboard
├── Header
├── PeriodSelector
├── Filters
├── KPICards
├── ActivityDistributionChart
├── ActivityEvolutionChart
├── DeadlineAlerts
└── RecentActivities
```

## `/activities`

Lista de atividades.

Funcionalidades:

- busca;
- filtros;
- ordenação;
- paginação;
- criação conforme permissão;
- edição conforme permissão;
- exclusão conforme permissão;
- destaque de atividades críticas.

## `/activities/kanban`

Quadro Kanban.

Colunas:

- `TODO`;
- `IN_PROGRESS`;
- `REVIEW`;
- `DONE`;
- `CANCELLED`.

## `/activities/:id`

Detalhes da atividade.

Deverá permitir visualizar:

- dados da atividade;
- responsável;
- categoria;
- prioridade;
- status;
- prazo;
- histórico relevante;
- comentários.

As ações disponíveis dependerão da permissão do usuário.

## `/users`

Gerenciamento da equipe conforme permissão.

## `/users/:id`

Detalhes do usuário.

## `/categories`

Gerenciamento de categorias para o MANAGER.

---

# 24. Componentes principais

### KpiCard

Responsável pela apresentação de indicadores.

### ActivityTable

Responsável pela visualização tabular das atividades.

### ActivityCard

Representação de uma atividade no Kanban.

### ActivityForm

Formulário de criação/edição.

### ActivityFilters

Filtros da listagem.

### DeadlineAlert

Apresenta atividades próximas do vencimento ou atrasadas.

### CommentList

Apresenta os comentários da atividade.

### CommentForm

Permite inserir comentário quando o usuário possui permissão.

---

# 25. Gráficos

A especificação original prevê Recharts para o dashboard.

## Distribuição por usuário

**Tipo:** Bar Chart

**Eixo X:**

- colaboradores.

**Eixo Y:**

- quantidade de atividades.

## Evolução temporal

**Tipo:** Line Chart

**Séries:**

- criadas;
- concluídas;
- atrasadas.

A granularidade deverá se adaptar ao período selecionado.

## Distribuição por status

**Tipo:** Pie/Donut Chart

**Categorias:**

- a fazer;
- em andamento;
- revisão;
- concluídas;
- canceladas.

Esse gráfico deverá ser utilizado apenas se trouxer informação adicional ao resumo apresentado pelos KPIs.

---

# 26. Tailwind CSS

A especificação original prevê Tailwind CSS para:

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

A adoção e organização definitiva do sistema visual será detalhada posteriormente.

---

# 27. Responsividade

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

---

# 28. Fluxo de autenticação

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
JWT + refresh token
   │
   ▼
Frontend
   │
   ▼
Dashboard / área autorizada
```

Quando o JWT expirar:

```text
JWT expirado
   │
   ▼
Aviso de sessão expirada
   │
   ├── Continuar logado
   │       │
   │       ▼
   │   Refresh token
   │       │
   │       ▼
   │   Nova sessão
   │
   └── Sem confirmação por 30s
           │
           ▼
         Login
```

---

# 29. Fluxo de criação de atividade

```text
Usuário autorizado
   │
   ▼
Abrir formulário
   │
   ▼
Preencher atividade
   │
   ▼
POST /activities
   │
   ▼
Validação
   │
   ▼
Regras de negócio
   │
   ▼
Persistência
   │
   ▼
Resposta
   │
   ▼
Atualização da interface
```

A categoria é obrigatória.

---

# 30. Fluxo de atualização de status

```text
Usuário
   │
   ▼
Solicita transição
   │
   ▼
Verifica permissão
   │
   ▼
Verifica transição permitida
   │
   ▼
Aplica regras de data
   │
   ├── IN_PROGRESS → startedAt
   ├── DONE        → completedAt
   ├── saída DONE  → completedAt = null
   └── CANCELLED   → completedAt = null
   │
   ▼
Persiste alteração
   │
   ▼
Atualiza interface e indicadores
```

---

# 31. Filtros do dashboard

O dashboard deverá permitir filtragem por período.

Períodos principais:

- 1 semana;
- 1 mês;
- 3 meses;
- 6 meses;
- 1 ano.

Filtros adicionais poderão incluir:

- colaborador;
- categoria;
- prioridade;
- status;
- situação de prazo.

Filtros combinados deverão utilizar AND.

---

# 32. Paginação

A listagem de atividades deverá suportar paginação.

**Parâmetros:**

```text
?page=1&limit=20
```

**Resposta conceitual:**

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

---

# 33. Validação

O backend deverá validar todos os dados recebidos.

**Exemplo de criação de atividade:**

| Campo         | Regra                                       |
| ------------- | ------------------------------------------- |
| `title`       | obrigatório                                 |
| `description` | opcional                                    |
| `priority`    | enum válido                                 |
| `status`      | enum válido e transição permitida           |
| `dueDate`     | data válida e opcional                      |
| `assigneeId`  | usuário existente e ativo, quando informado |
| `categoryId`  | categoria existente e ativa                 |

O frontend deverá realizar validações para experiência do usuário, mas não substituir as validações do backend.

A tentativa de utilizar categoria inativa em nova atividade deverá ser rejeitada.

---

# 34. Tratamento de erros

A API deverá possuir respostas HTTP consistentes.

**Exemplos:**

- `400 Bad Request`;
- `401 Unauthorized`;
- `403 Forbidden`;
- `404 Not Found`;
- `409 Conflict`;
- `500 Internal Server Error`.

**Formato sugerido:**

```json
{
  "statusCode": 400,
  "message": "Dados inválidos",
  "error": "Bad Request"
}
```

Os contratos definitivos de erro serão definidos posteriormente.

---

# 35. Segurança

O backend deverá:

- armazenar senhas utilizando hash;
- nunca retornar `passwordHash` nas respostas;
- validar entrada;
- proteger endpoints;
- controlar autorização;
- evitar exposição de informações internas;
- utilizar variáveis de ambiente para credenciais;
- utilizar HTTPS em produção;
- validar refresh tokens;
- invalidar sessões/refresh tokens conforme a estratégia de autenticação adotada;
- impedir acesso a recursos não autorizados.

---

# 36. Índices do banco

Os campos utilizados frequentemente em filtros deverão possuir índices adequados.

Inicialmente, deverão ser avaliados:

- `Activity.assigneeId`;
- `Activity.status`;
- `Activity.priority`;
- `Activity.dueDate`;
- `Activity.categoryId`;
- campos necessários para consultas temporais.

Índices adicionais deverão ser adicionados somente após identificação de necessidade.

---

# 37. Testes

## Backend

Testes unitários deverão cobrir principalmente:

- regras de atividade;
- matriz de transição de status;
- `startedAt`;
- `completedAt`;
- cancelamento;
- identificação de atrasos;
- cálculo dos indicadores;
- permissões;
- categorias;
- validações;
- autenticação e renovação da sessão.

## Integração

Deverão ser testados:

- controllers;
- casos de uso/serviços;
- persistência;
- banco de dados;
- autenticação;
- autorização;
- fluxos críticos.

## Frontend

Deverão ser priorizados testes para:

- login;
- renovação da sessão;
- formulários;
- filtros;
- Kanban;
- componentes críticos;
- comportamento do dashboard;
- estados de carregamento;
- tratamento de erros.

---

# 38. Estados da interface

As telas deverão possuir estados explícitos para:

### Loading

Quando os dados estiverem sendo carregados.

### Empty

Quando não houver dados.

### Error

Quando ocorrer uma falha.

### Success

Quando uma operação for concluída.

### Session expired

Quando a sessão expirar e o usuário ainda puder renová-la.

O fluxo de sessão deverá permitir:

```text
Token expirado
   ↓
Session expired
   ↓
30 segundos para decisão
   ├── Continuar → Refresh
   └── Expirar janela → Login
```

---

# 39. Critérios de aceite — autenticação

A autenticação será considerada implementada quando:

- usuário ativo puder realizar login;
- usuário inativo não puder realizar login;
- rotas protegidas exigirem autenticação;
- usuário autenticado puder consultar seus dados;
- JWT possuir expiração de 1 hora;
- expiração apresentar a interface de continuidade;
- a janela de 30 segundos for respeitada;
- refresh token renovar a sessão quando o usuário optar por continuar;
- ausência de confirmação levar ao login;
- usuário puder alterar sua própria senha;
- troca de senha não for obrigatória no primeiro acesso.

---

# 40. Critérios de aceite — usuários e permissões

O gerenciamento de usuários será considerado implementado quando:

- ADMIN puder criar ADMIN, MANAGER e MEMBER;
- ADMIN puder editar qualquer usuário;
- ADMIN puder ativar/desativar usuários;
- MANAGER puder criar, ativar e desativar somente MEMBER;
- MANAGER puder editar somente a si mesmo;
- MEMBER puder editar somente a si mesmo;
- usuários inativos não puderem ser novos responsáveis;
- permissões operacionais forem respeitadas.

---

# 41. Critérios de aceite — atividades

Uma atividade será considerada implementada quando:

- puder ser criada por um MANAGER;
- possuir categoria obrigatória;
- puder possuir responsável;
- puder ficar sem responsável;
- possuir prioridade;
- possuir status;
- puder possuir prazo;
- puder ser editada pelo MANAGER;
- puder ser excluída conforme permissão;
- puder ser atribuída pelo MANAGER;
- puder ser atribuída pelo MEMBER a si próprio quando permitido;
- puder ter prioridade alterada pelo MANAGER;
- respeitar as regras de transição;
- só puder ser concluída a partir de `REVIEW`;
- registrar `startedAt` ao primeiro início;
- registrar `completedAt` ao entrar em `DONE`;
- limpar `completedAt` ao sair de `DONE`;
- limpar `completedAt` ao entrar em `CANCELLED`;
- permitir comentários conforme permissão;
- puder ser filtrada;
- puder ser visualizada no Kanban;
- refletir seus dados corretamente no dashboard.

---

# 42. Critérios de aceite — categorias

Categorias serão consideradas implementadas quando:

- MANAGER puder criar categorias;
- MANAGER puder editar categorias;
- MANAGER puder ativar/desativar categorias;
- MANAGER puder excluir categorias sem atividades relacionadas;
- categoria relacionada a atividades não puder ser excluída;
- categoria desativada não puder ser usada em novas atividades;
- atividades existentes continuarem vinculadas a categorias desativadas.

---

# 43. Critérios de aceite — Kanban

O Kanban será considerado implementado quando:

- apresentar `TODO`;
- apresentar `IN_PROGRESS`;
- apresentar `REVIEW`;
- apresentar `DONE`;
- apresentar `CANCELLED`;
- permitir drag-and-drop;
- respeitar permissões;
- respeitar a matriz de transição;
- impedir conclusão direta fora de `REVIEW`;
- impedir saída de `CANCELLED`;
- refletir alterações de status no restante da aplicação.

---

# 44. Critérios de aceite — dashboard

O dashboard deverá:

- apresentar indicadores reais do banco;
- permitir selecionar 1 mês, 3 meses, 6 meses ou 1 ano;
- aplicar filtros combinados com AND;
- apresentar atividades atrasadas;
- apresentar próximas do vencimento;
- apresentar distribuição por colaborador;
- apresentar evolução temporal;
- utilizar as datas relevantes para cada análise;
- calcular taxa de conclusão conforme a regra definida;
- excluir atividades canceladas dos indicadores, salvo indicadores específicos de cancelamento;
- atualizar os indicadores após alterações nas atividades.

Os indicadores deverão possuir uma finalidade de decisão documentada.

---

# 45. Critérios de aceite — metodologia

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

O desafio permite escolher uma metodologia, combinar abordagens ou adaptá-las, desde que a decisão seja justificada.

---

# 46. Critérios de qualidade

Antes de considerar o MVP concluído, deverão ser verificados:

## Backend

- API funcionando;
- migrations funcionando;
- banco configurado;
- validação implementada;
- autenticação funcionando;
- refresh funcionando;
- autorização funcionando;
- erros tratados;
- testes críticos implementados;
- regras de domínio cobertas por testes.

## Frontend

- login funcionando;
- renovação de sessão funcionando;
- dashboard funcionando;
- gerenciamento de atividades funcionando;
- Kanban funcionando;
- usuários funcionando;
- categorias funcionando;
- filtros funcionando;
- gráficos funcionando;
- estados de loading/empty/error;
- responsividade.

## Integração

- frontend consumindo API;
- indicadores calculados a partir dos dados reais;
- alterações refletidas no dashboard;
- erros da API tratados no frontend;
- permissões respeitadas de ponta a ponta.

---

# 47. MVP — ordem de implementação

A implementação deverá seguir uma sequência que minimize dependências bloqueantes.

Esta ordem é uma referência funcional. A decomposição definitiva em tarefas será feita posteriormente.

## Fase 1 — Fundação

- criação do backend;
- criação do frontend;
- configuração TypeScript;
- configuração PostgreSQL;
- configuração Prisma;
- configuração Tailwind;
- configuração Recharts;
- variáveis de ambiente.

## Fase 2 — Banco e domínio

- User;
- Category;
- Activity;
- Comment;
- migrations;
- seed inicial.

## Fase 3 — Backend básico

- Users;
- Activities;
- Categories;
- Comments;
- validações;
- regras de negócio;
- CRUD.

## Fase 4 — Autenticação e autorização

- login;
- JWT;
- refresh token;
- logout;
- guards;
- autorização;
- alteração de senha.

## Fase 5 — Frontend operacional

- layout;
- login;
- usuários;
- categorias;
- atividades;
- formulários;
- filtros;
- comentários.

## Fase 6 — Kanban

- colunas;
- cards;
- drag-and-drop;
- alteração de status;
- regras de transição;
- atualização da API.

## Fase 7 — Dashboard

- KPIs;
- gráficos;
- atividades atrasadas;
- próximos vencimentos;
- filtros temporais;
- distribuição por colaborador;
- evolução temporal.

## Fase 8 — Qualidade

- testes;
- tratamento de erros;
- responsividade;
- revisão de UX;
- documentação.

---

# 48. Backlog inicial

O backlog original deverá ser reinterpretado à luz desta especificação consolidada antes da implementação.

Uma estrutura inicial de trabalho é:

| ID       | Item                                    | Prioridade |
| -------- | --------------------------------------- | ---------- |
| TASK-001 | Configurar backend NestJS               | Alta       |
| TASK-002 | Configurar Prisma                       | Alta       |
| TASK-003 | Configurar PostgreSQL                   | Alta       |
| TASK-004 | Criar modelo User                       | Alta       |
| TASK-005 | Criar modelo Activity                   | Alta       |
| TASK-006 | Criar modelo Category                   | Alta       |
| TASK-007 | Criar modelo Comment                    | Média      |
| TASK-008 | Implementar autenticação                | Alta       |
| TASK-009 | Implementar refresh token               | Alta       |
| TASK-010 | Implementar autorização                 | Alta       |
| TASK-011 | Implementar gerenciamento de usuários   | Alta       |
| TASK-012 | Implementar gerenciamento de categorias | Alta       |
| TASK-013 | Implementar gerenciamento de atividades | Alta       |
| TASK-014 | Implementar regras de status            | Alta       |
| TASK-015 | Implementar regras de prazo             | Alta       |
| TASK-016 | Implementar comentários                 | Média      |
| TASK-017 | Implementar filtros de atividades       | Alta       |
| TASK-018 | Configurar React                        | Alta       |
| TASK-019 | Configurar Tailwind                     | Alta       |
| TASK-020 | Criar layout                            | Alta       |
| TASK-021 | Criar tela de login                     | Alta       |
| TASK-022 | Criar tela de atividades                | Alta       |
| TASK-023 | Criar tela de categorias                | Alta       |
| TASK-024 | Criar tela de usuários                  | Alta       |
| TASK-025 | Implementar Kanban                      | Alta       |
| TASK-026 | Criar dashboard                         | Alta       |
| TASK-027 | Implementar KPIs                        | Alta       |
| TASK-028 | Implementar gráficos                    | Alta       |
| TASK-029 | Implementar responsividade              | Média      |
| TASK-030 | Implementar testes                      | Alta       |
| TASK-031 | Documentar projeto                      | Alta       |

Este backlog não constitui ainda o plano de implementação. Ele deverá ser refinado após a definição arquitetural.

---

# 49. Estrutura final esperada — referência original

A especificação original propõe uma estrutura separada entre backend e frontend:

```text
project/
│
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── activities/
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

Esta estrutura é mantida como referência da especificação original. A organização definitiva do repositório será definida posteriormente.

---

# 50. Decisões técnicas ainda pendentes

As decisões abaixo não são fechadas por esta especificação e deverão ser tratadas na documentação arquitetural.

## Autenticação

- armazenamento do access token;
- armazenamento do refresh token;
- rotação de refresh tokens;
- estratégia de revogação;
- política de múltiplas sessões;
- detalhes de logout;
- duração do refresh token.

## Autorização

- implementação técnica das permissões;
- granularidade dos guards/policies;
- acesso definitivo do ADMIN ao dashboard;
- acesso definitivo do MEMBER ao dashboard;
- regras técnicas para acesso a atividades não atribuídas.

## Kanban

- biblioteca de drag-and-drop;
- comportamento visual durante movimentação;
- feedback para transições inválidas;
- optimistic update ou atualização após confirmação da API.

## Prazo

- quantidade exata de dias da janela de alerta;
- tratamento de finais de semana;
- timezone;
- comportamento de datas sem horário.

## Exclusão

- exclusão física ou soft delete de atividades;
- política definitiva de exclusão de usuários;
- política definitiva de exclusão de categorias sem vínculos.

## Dashboard

- período padrão;
- granularidade das séries temporais;
- atualização automática;
- estratégia de cache;
- implementação precisa do conjunto temporal denominado "atividades existentes no período".

A fórmula da taxa de conclusão já está definida. O ponto pendente é somente a implementação precisa do conjunto temporal utilizado pela consulta histórica.

---

# 51. Riscos técnicos

## Risco 1 — Dashboard excessivamente complexo

A criação de muitos indicadores pode transformar o dashboard em uma tela de difícil interpretação.

**Mitigação:** cada indicador deverá possuir uma finalidade de decisão documentada.

## Risco 2 — Confundir quantidade de atividades com produtividade

Um colaborador possuir mais atividades não significa necessariamente que seja mais produtivo ou esteja sobrecarregado, pois as atividades podem possuir complexidades diferentes.

**Mitigação:** apresentar o indicador como distribuição de trabalho e evitar utilizá-lo isoladamente como métrica de produtividade.

## Risco 3 — Consultas pesadas no dashboard

Consultas agregadas sobre grande volume de atividades podem impactar a performance.

**Mitigação:**

- agregações no banco;
- índices;
- filtros por período;
- paginação quando aplicável;
- cache em versões futuras.

## Risco 4 — Regras de negócio espalhadas

Regras implementadas diretamente nos componentes React ou controllers podem gerar inconsistências.

**Mitigação:** concentrar regras de negócio no backend e manter o frontend responsável principalmente pela experiência de interação.

## Risco 5 — Permissões inconsistentes entre interfaces

A existência de diferentes pontos para alterar uma atividade, como lista, detalhes e Kanban, pode gerar comportamentos diferentes.

**Mitigação:** todas as interfaces deverão utilizar as mesmas regras de autorização e transição do domínio.

## Risco 6 — Perda de histórico por desativação

Desativar usuários ou categorias sem preservar seus vínculos históricos pode alterar a interpretação dos indicadores.

**Mitigação:** desativação deverá preservar os vínculos existentes.

---

# 52. Evolução arquitetural

O MVP deverá privilegiar simplicidade.

Não é necessário introduzir desde o primeiro momento:

- microservices;
- event sourcing;
- CQRS;
- filas;
- Elasticsearch;
- infraestrutura distribuída;
- sistemas de mensageria.

A arquitetura inicial deverá permanecer simples o suficiente para desenvolver, testar e demonstrar o produto.

A decisão arquitetural definitiva será documentada posteriormente.

---

# 53. Resultado esperado

Ao final do MVP, o sistema deverá permitir que a equipe registre e acompanhe suas atividades e que o MANAGER obtenha uma visão objetiva da situação operacional.

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

O produto deverá resolver o problema fundamental apresentado no desafio: substituir uma visão fragmentada do trabalho por uma visão centralizada, permitindo acompanhar atividades, prazos e distribuição do trabalho e utilizar indicadores para apoiar decisões.

O desenho de como a ferramenta organiza e apresenta o trabalho faz parte do resultado esperado do projeto.

---

# 54. Definição do MVP

O MVP será considerado concluído quando for possível executar um cenário de ponta a ponta representativo do domínio:

1. Usuário autorizado realiza login.
2. O sistema identifica seu perfil e permissões.
3. MANAGER cadastra um MEMBER.
4. MANAGER cria uma categoria ativa.
5. MANAGER cria uma atividade.
6. MANAGER define categoria.
7. MANAGER define responsável e prioridade.
8. MANAGER define prazo.
9. MEMBER visualiza a atividade.
10. MEMBER pode atribuí-la a si próprio quando aplicável.
11. MEMBER altera o status conforme as transições permitidas.
12. A atividade passa por `TODO`, `IN_PROGRESS` e `REVIEW`.
13. A atividade é concluída a partir de `REVIEW`.
14. `completedAt` é registrado.
15. A atividade pode ser comentada conforme as permissões.
16. A atividade pode ser visualizada no Kanban.
17. O dashboard reflete os dados reais.
18. Indicadores são calculados conforme os períodos selecionados.
19. Atividades atrasadas e próximas do vencimento são identificadas.
20. A distribuição do trabalho é apresentada.
21. O MANAGER utiliza essas informações para acompanhar a operação.
22. A sessão expira após 1 hora e oferece a renovação durante a janela de 30 segundos.
23. Categorias desativadas permanecem preservadas nas atividades existentes.

Esse fluxo representa o núcleo funcional do produto e deverá ser priorizado antes da implementação de funcionalidades secundárias.

---

# 55. Princípios para as próximas especificações

Esta versão consolidada deve servir como base para as próximas etapas de documentação.

A partir dela:

1. **Arquitetura** deverá definir como os requisitos serão implementados.
2. **Padrões de projeto** deverão ser escolhidos conforme as necessidades reais do domínio.
3. **Modelo de dados definitivo** deverá derivar das regras de negócio, sem antecipar decisões desnecessárias.
4. **API definitiva** deverá refletir os casos de uso e as permissões estabelecidas.
5. **Frontend** deverá representar as regras do domínio sem duplicar sua autoridade.
6. **Testes** deverão proteger principalmente as regras de negócio e os fluxos críticos.
7. **Backlog de implementação** deverá ser derivado desta especificação, evitando tarefas que contradigam o domínio.

A especificação funcional e de domínio deverá permanecer estável sempre que possível. Alterações arquiteturais não deverão alterar regras de negócio sem uma decisão explícita de produto.
