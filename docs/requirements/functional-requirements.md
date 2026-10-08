# Requisitos Funcionais

Fonte: `docs/Especificação Técnica.md`.

## Visão geral

A plataforma deve centralizar o gerenciamento das atividades de uma equipe e fornecer ao gestor informações para acompanhar a operação e tomar decisões. O sistema deve permitir que usuários registrem atividades, atribuam responsáveis, definam prazos, acompanhem o fluxo de execução, identifiquem situações de atenção e visualizem indicadores.

## RF01 — Autenticação

### Descrição

O sistema deve permitir que usuários ativos realizem autenticação e acessem funcionalidades protegidas.

### Funcionalidades

- login;
- logout;
- consulta do usuário autenticado;
- proteção de rotas;
- controle de acesso;
- renovação da sessão;
- alteração da própria senha.

### Critérios de aceitação

- Usuários ativos devem conseguir realizar login.
- Usuários inativos não devem conseguir realizar login.
- Rotas protegidas devem exigir autenticação.
- O usuário autenticado deve conseguir consultar seus dados.
- O JWT deve ter expiração de 1 hora.
- Quando o JWT expirar, a aplicação deve apresentar a interface de sessão expirada.
- A interface de sessão expirada deve permanecer disponível por 30 segundos.
- Durante essa janela, o usuário deve poder escolher continuar logado.
- Ao escolher continuar logado, deve ser utilizado o mecanismo de refresh token.
- Caso o usuário não confirme a continuidade dentro dos 30 segundos, deve ser redirecionado para o login.
- O usuário deve poder alterar a própria senha.
- Não deve haver obrigatoriedade de troca de senha no primeiro acesso.

## RF02 — Usuários

### Descrição

O sistema deve permitir visualizar e administrar os usuários da equipe conforme as permissões de cada perfil.

### Funcionalidades

- listar usuários;
- visualizar usuário;
- criar usuário;
- editar usuário;
- ativar usuário;
- desativar usuário.

### Critérios de aceitação

- O ADMIN deve poder criar ADMIN, MANAGER e MEMBER.
- O ADMIN deve poder editar qualquer usuário.
- O ADMIN deve poder ativar e desativar usuários.
- O MANAGER deve poder criar, ativar e desativar somente MEMBER.
- O MANAGER deve poder editar somente a si mesmo.
- O MEMBER deve poder editar somente a si mesmo.
- Usuários inativos não devem ser selecionáveis como novos responsáveis por atividades.
- As permissões operacionais devem ser respeitadas em todas as interfaces.

## RF03 — Atividades

### Descrição

O sistema deve permitir registrar e acompanhar as atividades da equipe, incluindo dados básicos, responsáveis, prazos, categoria e fluxo de status.

### Funcionalidades

- criar atividade;
- listar atividades;
- visualizar atividade;
- editar atividade;
- excluir atividade;
- atribuir responsável;
- alterar status;
- alterar prioridade;
- comentar atividade.

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

### Critérios de aceitação

- Uma atividade deve poder ser criada por um MANAGER.
- A atividade deve possuir categoria obrigatória.
- A atividade deve poder possuir responsável ou ficar sem responsável.
- A atividade deve possuir prioridade.
- A atividade deve possuir status.
- A atividade deve poder possuir prazo.
- A atividade deve poder ser editada pelo MANAGER.
- A atividade deve poder ser excluída conforme permissão.
- A atividade deve poder ser atribuída pelo MANAGER.
- A atividade deve poder ser atribuída pelo MEMBER a si próprio quando aplicável.
- A atividade deve poder ter prioridade alterada pelo MANAGER.
- A atividade deve respeitar as regras de transição.
- A atividade só deve poder ser concluída a partir de `REVIEW`.
- O sistema deve registrar `startedAt` ao primeiro início.
- O sistema deve registrar `completedAt` ao entrar em `DONE`.
- O sistema deve limpar `completedAt` ao sair de `DONE`.
- O sistema deve limpar `completedAt` ao entrar em `CANCELLED`.
- A atividade deve poder receber comentários conforme a permissão.
- A atividade deve poder ser filtrada.
- A atividade deve poder ser visualizada no Kanban.
- Os dados da atividade devem refletir corretamente no dashboard.

## RF04 — Categorias

### Descrição

O sistema deve permitir organizar atividades por categorias.

### Funcionalidades

- criar categoria;
- editar categoria;
- excluir categoria;
- ativar categoria;
- desativar categoria;
- listar categorias;
- visualizar categoria.

### Critérios de aceitação

- O MANAGER deve poder criar categorias.
- O MANAGER deve poder editar categorias.
- O MANAGER deve poder ativar e desativar categorias.
- O MANAGER deve poder excluir categorias sem atividades relacionadas.
- Categoria relacionada a atividades não deve poder ser excluída.
- Categoria desativada não deve poder ser usada em novas atividades.
- Atividades existentes devem continuar vinculadas a categorias desativadas.

## RF05 — Kanban

### Descrição

O sistema deve fornecer uma visualização Kanban das atividades.

### Funcionalidades

- apresentar atividades agrupadas por status;
- permitir drag-and-drop;
- alterar o status da atividade quando a movimentação for permitida;
- respeitar as mesmas regras de status do domínio de atividades;
- respeitar as permissões do usuário;
- apresentar atividades `CANCELLED`.

### Critérios de aceitação

- O Kanban deve apresentar `TODO`.
- O Kanban deve apresentar `IN_PROGRESS`.
- O Kanban deve apresentar `REVIEW`.
- O Kanban deve apresentar `DONE`.
- O Kanban deve apresentar `CANCELLED`.
- O Kanban deve permitir drag-and-drop.
- O Kanban deve respeitar permissões.
- O Kanban deve respeitar a matriz de transição.
- O Kanban deve impedir conclusão direta fora de `REVIEW`.
- O Kanban deve impedir saída de `CANCELLED`.
- Alterações de status no Kanban devem refletir-se no restante da aplicação.

## RF06 — Indicadores

### Descrição

O sistema deve fornecer um dashboard gerencial com indicadores calculados a partir dos dados das atividades.

### Funcionalidades

- seleção de período;
- aplicação de filtros ao indicador;
- combinação de filtros via AND;
- apresentação de indicadores operacionais;
- apresentação de atividades atrasadas;
- apresentação de próximas do vencimento;
- apresentação de distribuição por colaborador;
- apresentação de evolução temporal;
- atualização dos dados após alterações nas atividades.

### Períodos suportados

- 1 semana;
- 1 mês;
- 3 meses;
- 6 meses;
- 1 ano.

### Critérios de aceitação

- O dashboard deve apresentar indicadores reais do banco.
- O dashboard deve permitir selecionar 1 mês, 3 meses, 6 meses ou 1 ano.
- Os filtros devem ser combinados com AND.
- O dashboard deve apresentar atividades atrasadas.
- O dashboard deve apresentar próximas do vencimento.
- O dashboard deve apresentar distribuição por colaborador.
- O dashboard deve apresentar evolução temporal.
- O dashboard deve utilizar as datas relevantes para cada análise.
- A taxa de conclusão deve seguir a regra definida na especificação.
- Atividades canceladas devem ser excluídas dos indicadores operacionais, salvo indicadores específicos de cancelamento.
- Os indicadores devem atualizar-se após alterações nas atividades.
- Cada indicador deve possuir uma finalidade de decisão documentada.

## Resumo das áreas cobertas

A documentação funcional do produto está centrada em seis grandes áreas: autenticação, usuários, atividades, categorias, Kanban e indicadores. A delimitação acima preserva as decisões da especificação existente e evita conflitar com elementos de arquitetura, implementação e regras de negócio detalhadas em outros documentos.
