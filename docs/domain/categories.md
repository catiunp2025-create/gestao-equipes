# Categories

> Atualizado em: 2026-10-14

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
- não pode ser escolhida ao alterar a categoria de uma atividade existente;
- continua vinculada às atividades existentes;
- continua sendo exibida nas atividades históricas.

O nome permanece globalmente único mesmo quando a categoria está inativa.

## Relação com Atividade

A categoria está diretamente associada à atividade:

- atividade possui categoria obrigatória;
- categoria desativada não pode ser usada em novas atividades;
- categoria inativa não pode ser escolhida ao alterar a categoria de uma atividade existente;
- editar outros campos da atividade não exige trocar uma categoria que se tornou inativa;
- atividades existentes continuam vinculadas à categoria desativada.

## Operações conceituais

A especificação menciona que o MANAGER pode:

- criar categoria;
- editar categoria;
- ativar categoria;
- desativar categoria;
- listar categorias;
- visualizar categoria.

O fluxo normal desativa categorias logicamente e não permite sua exclusão física.

## Integridade

Toda atividade deve manter uma categoria. A desativação preserva os vínculos existentes.

## Invariantes

- toda atividade deve possuir uma categoria válida;
- categoria inativa não pode ser utilizada em novas atividades;
- categoria inativa não pode ser escolhida ao alterar a categoria;
- editar outros campos não exige trocar uma categoria inativa;
- atividades existentes continuam vinculadas às categorias desativadas;
- nome de categoria é único globalmente, inclusive para categorias inativas;
- categoria é desativada logicamente, sem exclusão física pelo fluxo normal.

## Rastreabilidade

Relacionado a:

- RF04 — Gerenciamento de categorias;
- RN07 — Categoria obrigatória;
- RN08 — Categoria desativada;
- RN09 — Desativação de categoria.

## Conteúdo deliberadamente deixado para Architecture

Este documento não define:

- estrutura técnica de persistência;
- restrições específicas no banco;
- APIs, DTOs ou módulos.
