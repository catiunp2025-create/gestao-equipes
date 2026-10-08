# Kanban

## Objetivo

O Kanban é a representação operacional do domínio de atividades em uma visão por status. Ele organiza o trabalho visivelmente, mas não cria um ciclo de vida independente da atividade.

## Regra de domínio

O Kanban não deve possuir regras próprias que contradigam a atividade. A movimentação no Kanban deve respeitar exatamente as mesmas regras de transição de status da entidade Atividade.

Em outras palavras:

- o Kanban representa o estado da atividade;
- a movimentação no quadro é uma operação que aplica as regras de negócio da atividade;
- permissão e transição continuam sendo tratadas pelo domínio da atividade.

## Colunas

As colunas do Kanban são:

- `TODO`;
- `IN_PROGRESS`;
- `REVIEW`;
- `DONE`;
- `CANCELLED`.

## Relação com status da atividade

A representação visual deve refletir o status real da atividade. O Kanban é uma visão do ciclo de vida, não uma segunda máquina de estados.

## Movimentação

A movimentação de uma atividade no Kanban deve seguir os critérios do domínio:

1. verificar permissão do usuário;
2. verificar se a transição é permitida;
3. aplicar regras de negócio da atividade;
4. atualizar o estado da atividade;
5. refletir a mudança na interface.

## Regras específicas

### MEMBER

O MEMBER pode mover somente atividades próprias, mas mesmo assim deve respeitar as regras de transição.

Exemplo:

- `TODO → DONE` não é permitido diretamente;
- a atividade deve passar por `REVIEW` antes de atingir `DONE`.

### MANAGER

O MANAGER pode movimentar atividades conforme suas permissões de gestão, respeitando as regras de transição.

### CANCELLED

- `CANCELLED` deve aparecer como coluna do Kanban;
- atividades canceladas não podem ser movidas para outros status;
- `CANCELLED` é terminal.

## Relação com outras entidades

O Kanban depende diretamente dos conceitos:

- Atividade;
- Status;
- Usuário;
- Permissão;
- Categoria (como contexto de apresentação e filtro);
- Indicadores (porque as alterações de estado impactam a análise).

## Invariantes

- o Kanban respeita a matriz de transição da atividade;
- o Kanban não pode permitir remoção de `CANCELLED`;
- o Kanban não pode permitir conclusão direta fora de `REVIEW`;
- alterações do Kanban devem refletir o restante da aplicação.

## Decisões pendentes

A especificação menciona, como decisões técnicas e de interface, itens como:

- biblioteca de drag-and-drop;
- comportamento visual de movimentação;
- feedback para transições inválidas;
- update otimista ou atualização após confirmação.

Esses temas não pertencem ao domínio e devem permanecer fora desse documento.

## Rastreabilidade

Relacionado a:

- RF05 — Kanban;
- RN03 — Conclusão;
- RN04 — Início;
- matriz de transição da atividade.

## Conteúdo deliberadamente deixado para Architecture

Este documento não define:

- tecnologia do drag-and-drop;
- biblioteca de interface;
- endpoints e integrações;
- implementação de atualização do estado;
- arquitetura do frontend ou backend.
