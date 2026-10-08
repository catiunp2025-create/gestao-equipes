# Regras de Negócio

Fonte: `docs/Especificação Técnica.md`.

## 1. Regras gerais

### RN01 — Responsável

Uma atividade poderá não possuir responsável.

Atividades sem responsável devem ser identificáveis por meio de filtro específico.

- O MANAGER pode atribuir uma atividade a um MEMBER.
- O MEMBER pode atribuir a atividade a si próprio quando a regra de acesso permitir.

### RN02 — Prazo

Uma atividade pode possuir prazo.

A aplicação deve determinar sua situação de prazo:

- Normal: `dueDate >= hoje` e fora da janela de alerta.
- Próxima do vencimento: a atividade está dentro da janela configurada para alerta.
- Atrasada: `dueDate < hoje` e a atividade não está em `DONE` nem em `CANCELLED`.

A janela de alerta deve ser configurável.

### RN03 — Conclusão

Uma atividade só pode ser concluída a partir de `REVIEW`.

Ao entrar em `DONE`:

```text
completedAt = data/hora atual
```

Ao sair de `DONE`:

```text
completedAt = null
```

Ao retornar a `DONE` posteriormente:

```text
completedAt = data/hora atual
```

### RN04 — Início

Quando uma atividade passar para `IN_PROGRESS` pela primeira vez:

```text
startedAt = data/hora atual
```

A data original de início não deve ser sobrescrita em alterações posteriores, enquanto não existir uma ação explícita de reinício.

### RN05 — Atividade atrasada

Uma atividade não deve ser considerada atrasada quando estiver:

- concluída;
- cancelada.

### RN06 — Usuário inativo

Usuários inativos não devem ser selecionáveis como novos responsáveis por atividades.

Atividades históricas de usuários posteriormente desativados devem permanecer preservadas.

### RN07 — Categoria obrigatória

Toda atividade deve possuir uma categoria.

Uma atividade não pode ser criada sem categoria válida.

### RN08 — Categoria desativada

Uma categoria pode ser desativada.

Categorias desativadas:

- não podem ser selecionadas para novas atividades;
- continuam vinculadas às atividades existentes;
- continuam sendo exibidas nas atividades históricas.

A desativação não deve remover nem alterar os vínculos existentes.

### RN09 — Exclusão de categoria

Uma categoria não pode ser excluída enquanto possuir atividades relacionadas.

Quando não houver atividades relacionadas, a exclusão pode ocorrer conforme a política de persistência definida posteriormente.

### RN10 — Filtros

Quando múltiplos filtros forem utilizados simultaneamente, eles devem ser combinados utilizando lógica AND.

Exemplo:

```text
status = IN_PROGRESS
AND
priority = HIGH
AND
category = X
```

### RN11 — Atividades canceladas nos indicadores

Atividades `CANCELLED` devem ser excluídas dos indicadores operacionais, exceto quando um indicador específico tiver como objetivo analisar cancelamentos.

### RN12 — Taxa de conclusão

A taxa de conclusão será calculada, no período selecionado, como:

```text
atividades concluídas no período
──────────────────────────────── × 100
atividades existentes no período
```

### RN13 — Datas relevantes

Os indicadores devem utilizar a data relevante para o fenômeno que está sendo analisado.

| Análise | Data relevante |
| --- | --- |
| Atividades criadas | `createdAt` |
| Atividades iniciadas | `startedAt` |
| Atividades concluídas | `completedAt` |
| Prazo | `dueDate` |
| Tempo de execução | `startedAt` e `completedAt` |

A mesma atividade pode participar de análises diferentes usando datas diferentes.

## 2. Autenticação

- A autenticação será baseada em JWT.
- Todos os perfis podem realizar login.
- Usuários inativos não podem realizar login.
- O token de acesso terá validade de 1 hora.
- Quando o token expirar, a aplicação deve apresentar uma interface de sessão expirada.
- Essa interface deve permanecer disponível por 30 segundos.
- Durante essa janela, o usuário pode escolher continuar logado.
- Ao escolher continuar logado, deve ser utilizado o mecanismo de refresh token para renovar a sessão.
- Caso o usuário não confirme a continuidade dentro dos 30 segundos, deve ser redirecionado para o login.
- O usuário pode alterar a própria senha.
- Não há obrigação de troca de senha no primeiro acesso.
- O usuário pode continuar utilizando a senha criada inicialmente pelo ADMIN ou alterá-la posteriormente por decisão própria.

## 3. Usuários

- O usuário possui dados como nome, e-mail, cargo/função, perfil, status e data de criação.
- Os perfis disponíveis são `ADMIN`, `MANAGER` e `MEMBER`.
- Usuários inativos não podem ser selecionados como novos responsáveis.
- Atividades históricas devem permanecer preservadas mesmo após desativação do usuário.

## 4. Atividades

### 4.1 Status

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

### 4.2 Transições

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

Matriz de transição:

| Estado atual | TODO | IN_PROGRESS | REVIEW | DONE | CANCELLED |
| ------------ | ---: | ----------: | -----: | ---: | --------: |
| TODO         | — | Sim | Sim | Não | Sim |
| IN_PROGRESS  | Sim | — | Sim | Não | Sim |
| REVIEW       | Sim | Sim | — | Sim | Sim |
| DONE         | Sim | Sim | Sim | — | Sim |
| CANCELLED    | Não | Não | Não | Não | — |

A tabela representa transições permitidas pelo domínio. A autorização decide se o usuário específico pode executar uma transição permitida.

### 4.3 Datas

Quando a atividade entra em `IN_PROGRESS` pela primeira vez:

```text
startedAt = data/hora atual
```

Como não existe operação explícita de reinício neste momento, regressões e novas entradas em `IN_PROGRESS` não devem sobrescrever o `startedAt` original.

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

Ao entrar em `CANCELLED`:

```text
completedAt = null
```

### 4.4 Prioridade

As atividades possuem prioridade:

| Prioridade | Descrição |
| ---------- | --------- |
| `LOW` | Baixa |
| `MEDIUM` | Média |
| `HIGH` | Alta |
| `CRITICAL` | Crítica |

A prioridade é utilizada para organização, filtragem e ordenação das atividades.

Somente o MANAGER possui permissão para alterar prioridade.

Atividades `CRITICAL` devem:

- possuir identificação visual adequada;
- aparecer no topo das ordenações em que a prioridade for relevante;
- ser destacadas de maneira clara no Kanban e nas listagens;
- permanecer sujeitas às demais regras de status e permissão.

### 4.5 Prazos

A atividade pode possuir prazo e a aplicação deve determinar sua situação de prazo:

- Normal: `dueDate >= hoje` e fora da janela de alerta.
- Próxima do vencimento: dentro da janela configurada para alerta.
- Atrasada: `dueDate < hoje` e a atividade não está concluída nem cancelada.

A janela de alerta deve ser configurável.

## 5. Categorias

- As categorias são utilizadas para classificar atividades.
- O MANAGER pode criar, editar, excluir, ativar e desativar categorias.
- Categorias inativas não podem ser utilizadas em novas atividades.
- Categorias inativas continuam vinculadas às atividades existentes.
- Uma categoria relacionada a atividades não pode ser excluída.
- A implementação deve preservar o histórico das atividades.
- A desativação não deve remover nem alterar os vínculos existentes.

## 6. Kanban

O Kanban deve apresentar atividades agrupadas pelos status:

```text
TODO
IN_PROGRESS
REVIEW
DONE
CANCELLED
```

Regras aplicáveis:

- o Kanban não deve criar regras de negócio próprias;
- a movimentação deve verificar permissão;
- a movimentação deve verificar se a transição de status é permitida;
- a movimentação deve aplicar as regras de domínio;
- a movimentação deve atualizar a atividade;
- a movimentação deve refletir a alteração na interface;
- o MEMBER pode mover somente atividades próprias;
- mesmo atividades próprias devem respeitar as regras de transição;
- o MANAGER pode movimentar atividades conforme seu domínio e permissões;
- `CANCELLED` deve aparecer como coluna do Kanban;
- atividades canceladas não podem ser movidas para outros status.

## 7. Indicadores

Os indicadores devem possuir finalidade de decisão e devem ser calculados com base em regras definidas.

### Indicadores de volume e status

- `KPI01` — Atividades abertas: quantidade de atividades cujo status não seja `DONE` nem `CANCELLED`.
- `KPI02` — Atividades em andamento: quantidade de atividades com status `IN_PROGRESS`.
- `KPI03` — Atividades atrasadas: quantidade de atividades cujo prazo foi ultrapassado e que não estejam concluídas ou canceladas.
- `KPI04` — Próximos vencimentos: quantidade de atividades que entrarão em situação de vencimento dentro da janela configurada.

### Indicadores de desempenho

- `KPI05` — Taxa de conclusão:

```text
atividades concluídas no período
──────────────────────────────── × 100
atividades existentes no período
```

- `KPI06` — Cumprimento de prazo:

```text
atividades concluídas no prazo
────────────────────────────── × 100
atividades concluídas com prazo
```

- `KPI07` — Distribuição por colaborador: quantidade de atividades atribuídas a cada usuário.
- `KPI08` — Tempo médio de conclusão:

```text
Σ (completedAt - startedAt)
───────────────────────────
atividades concluídas
```

### Regras gerais dos indicadores

- Os filtros do dashboard devem ser combinados com `AND`.
- Os parâmetros de análise devem considerar os períodos de 1 semana, 1 mês, 3 meses, 6 meses e 1 ano.
- Os indicadores devem usar as datas relevantes para cada fenômeno.
- Atividades `CANCELLED` devem ser excluídas dos indicadores operacionais, salvo indicadores específicos para cancelamento.
- As alterações realizadas nas atividades devem refletir os indicadores após atualização dos dados.

## 8. Observações finais

Esta seção reúne as regras de negócio que governam o domínio da aplicação. Ela não redefine arquitetura, não introduz padrões técnicos e preserva a terminologia e os critérios já documentados no produto.
