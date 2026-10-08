# Categories

## Objetivo

A Categoria organiza as atividades do sistema por classificação funcional ou temática. Ela permite agrupar o trabalho e serve como referência para filtros, gestão e análise do contexto operacional.

## Conceito

A categoria é uma classificação atribuída a uma atividade. A especificação exige que toda atividade possua uma categoria válida.

## Finalidade

A categoria tem como objetivo:

- classificar atividades;
- facilitar filtros e agrupamentos;
- organizar o trabalho por tipo ou contexto;
- manter a atividade contextualizada dentro da operação da equipe.

## Estado de categoria

A categoria possui estado ativo/inativo.

### Categoria ativa

Pode ser utilizada em novas atividades.

### Categoria inativa

- não pode ser utilizada em novas atividades;
- continua vinculada às atividades existentes;
- continua sendo exibida nas atividades históricas.

## Relação com Atividade

A categoria está diretamente associada à atividade:

- atividade possui categoria obrigatória;
- categoria desativada não pode ser usada em novas atividades;
- atividades existentes continuam vinculadas à categoria desativada.

## Operações conceituais

A especificação menciona que o MANAGER pode:

- criar categoria;
- editar categoria;
- excluir categoria;
- ativar categoria;
- desativar categoria;
- listar categorias;
- visualizar categoria.

## Integridade

A categoria não pode ser excluída enquanto possuir atividades relacionadas.

Essa regra funciona como uma invariante de integridade no domínio:

- categoria vinculada a atividades não pode ser removida sem considerar o histórico;
- o vínculo histórico das atividades deve ser preservado.

## Invariantes

- toda atividade deve possuir uma categoria válida;
- categoria inativa não pode ser utilizada em novas atividades;
- atividades existentes continuam vinculadas às categorias desativadas;
- categoria com atividades relacionadas não pode ser excluída.

## Decisões pendentes

A especificação não define uma política final para:

- reativação de categoria;
- exclusão de categoria sem vínculo;
- estratégia de exclusão física ou lógica, quando aplicável.

Essas decisões devem ser tratadas em outra etapa e não podem ser assumidas no domínio.

## Rastreabilidade

Relacionado a:

- RF04 — Gerenciamento de categorias;
- RN07 — Categoria obrigatória;
- RN08 — Categoria desativada;
- RN09 — Exclusão de categoria.

## Conteúdo deliberadamente deixado para Architecture

Este documento não define:

- estrutura técnica de persistência;
- regras de exclusão do banco;
- estratégia de soft delete ou hard delete;
- APIs, DTOs ou módulos.
