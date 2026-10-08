# Activities

## Objetivo

A Atividade é o conceito central do domínio da plataforma. Ela representa o trabalho que a equipe executa, o que precisa ser acompanhado, priorizado e concluído.

## Identidade e informações

A especificação define como informações relevantes da atividade:

- título;
- descrição;
- categoria;
- responsável;
- prioridade;
- prazo;
- datas relevantes;
- status.

A atividade também participa de ciclos de acompanhamento e indicadores de desempenho.

## Status

Os estados definidos para a atividade são:

- `TODO` — A fazer;
- `IN_PROGRESS` — Em andamento;
- `REVIEW` — Em revisão;
- `DONE` — Concluída;
- `CANCELLED` — Cancelada.

A atividade possui um ciclo de vida representado por esses estados.

## Ciclo de vida

A regra geral do domínio é:

- regressões de status são permitidas;
- cancelamento pode ocorrer a partir de qualquer status, exceto `CANCELLED`;
- `CANCELLED` é terminal;
- uma atividade não pode sair de `CANCELLED`;
- uma atividade em `DONE` pode retornar a um status anterior permitido;
- `DONE` só pode ser alcançado a partir de `REVIEW`.

### Matriz de transição

| Estado atual | TODO | IN_PROGRESS | REVIEW | DONE | CANCELLED |
| --- | ---: | ---: | ---: | ---: | ---: |
| TODO | — | Sim | Sim | Não | Sim |
| IN_PROGRESS | Sim | — | Sim | Não | Sim |
| REVIEW | Sim | Sim | — | Sim | Sim |
| DONE | Sim | Sim | Sim | — | Sim |
| CANCELLED | Não | Não | Não | Não | — |

Essa matriz define a transição permitida pelo domínio. A autorização do usuário pode impedir a execução de uma transição permitida.

## Fluxo principal

```text
TODO
  ↓
IN_PROGRESS
  ↓
REVIEW
  ↓
DONE
```

`CANCELLED` é um estado adicional e deve estar disponível no Kanban, mas não integra o fluxo principal de conclusão.

## Datas relevantes

A atividade possui datas conceituais que orientam o acompanhamento do trabalho.

### `createdAt`

Representa a data de criação da atividade.

### `startedAt`

Representa o primeiro início registrado da atividade.

Regra de domínio:

- quando a atividade entra em `IN_PROGRESS` pela primeira vez, `startedAt` recebe a data/hora atual;
- regressões e novas entradas em `IN_PROGRESS` não devem sobrescrever o valor original enquanto não houver uma ação explícita de reinício.

### `completedAt`

Representa a data de conclusão da atividade.

Regra de domínio:

- ao entrar em `DONE`, `completedAt` recebe a data/hora atual;
- ao sair de `DONE`, `completedAt` deve ser limpo;
- ao retornar a `DONE`, `completedAt` volta a ser registrado no momento da nova conclusão;
- ao entrar em `CANCELLED`, `completedAt` deve ser limpo.

### `dueDate`

Representa o prazo de execução da atividade.

## Prazo e vencimento

A atividade pode possuir ou não prazo.

A situação de prazo é determinada pela regra de negócio:

- Normal: `dueDate >= hoje` e fora da janela de alerta;
- Próxima do vencimento: dentro da janela configurada para alerta;
- Atrasada: `dueDate < hoje` e a atividade não está em `DONE` nem em `CANCELLED`.

A janela de alerta é configurável, mas seu valor exato ainda não foi definido pela especificação de produto.

### Regras relevantes

- atividade concluída não deve ser considerada atrasada;
- atividade cancelada não deve ser considerada atrasada;
- o vencimento é um conceito aplicado ao prazo, não a um estado da atividade.

## Prioridade

A prioridade da atividade é um atributo do domínio e pode ser:

- `LOW`;
- `MEDIUM`;
- `HIGH`;
- `CRITICAL`.

### `CRITICAL`

Atividades `CRITICAL` devem:

- possuir identificação visual adequada;
- aparecer no topo das ordenações em que a prioridade for relevante;
- ser destacadas no Kanban e nas listagens;
- continuar sujeitas às regras de status e permissão.

## Atribuição e responsável

A atividade pode ter responsável ou não.

- uma atividade pode não ter responsável;
- atividades sem responsável devem ser identificáveis por filtro específico;
- o MANAGER pode atribuir uma atividade a um MEMBER;
- o MEMBER pode atribuir a atividade a si próprio quando a regra de acesso permitir.

### Usuário inativo

Usuários inativos não devem ser selecionáveis como novos responsáveis por atividades.

## Categoria

A atividade deve possuir uma categoria válida.

- categoria é obrigatória;
- categoria inativa não pode ser usada em novas atividades;
- categorias desativadas permanecem vinculadas às atividades existentes.

A relação entre atividade e categoria é parte central do domínio.

## Comentários e revisão

Os requisitos mencionam comentários em atividades e revisão de atividade, mas não definem um modelo completo de comentários nem um histórico condicional. O domínio, portanto, reconhece esses conceitos apenas como ações associadas à atividade, sem detalhar uma estrutura de comentário adicional além do que foi explicitamente estabelecido.

## Invariantes

- uma atividade só pode entrar em `DONE` quando estiver em `REVIEW`;
- `CANCELLED` é terminal;
- uma atividade não pode sair de `CANCELLED`;
- ao entrar em `CANCELLED`, `completedAt` deve ser limpo;
- ao sair de `DONE`, `completedAt` deve ser limpo;
- quando a atividade entra pela primeira vez em `IN_PROGRESS`, `startedAt` é registrado;
- o `startedAt` original não deve ser sobrescrito em novas entradas em `IN_PROGRESS` sem reinício explícito;
- uma categoria desativada não pode ser usada em novas atividades;
- uma atividade cancelada não deve ser considerada atrasada.

## Relações conceituais

- Usuário pode ser responsável por várias atividades;
- Atividade pertence a uma categoria;
- Atividade pode ser consultada por status, categoria, prioridade, responsável e prazo;
- Atividade participa dos indicadores e do Kanban.

## Rastreabilidade

Relacionado a:

- RF03 — Gerenciamento de atividades;
- RN01 — Responsável;
- RN02 — Prazo;
- RN03 — Conclusão;
- RN04 — Início;
- RN05 — Atividade atrasada;
- RN07 — Categoria obrigatória;
- RN08 — Categoria desativada;
- RN11 — Atividades canceladas nos indicadores.

## Decisões pendentes

- valor exato da janela de alerta de prazo;
- regra precisa para datas sem horário e timezone;
- definição de comportamento de reinício explícito de atividade;
- definição de modelo detalhado de comentário e revisão, quando aplicável.

## Conteúdo deliberadamente deixado para Architecture

Este documento não define:

- estrutura do banco de dados;
- endpoints ou contratos de API;
- serviços ou use cases;
- ORM, framework ou infraestrutura;
- biblioteca específica de drag-and-drop do Kanban.
