# Permissões

Fonte: `docs/Especificação Técnica.md`.

## 1. Perfis

Os perfis presentes no sistema são:

- `ADMIN`;
- `MANAGER`;
- `MEMBER`.

## 2. Visão geral

Os três perfis possuem responsabilidades distintas:

- `ADMIN` é responsável pela administração dos usuários;
- `MANAGER` é responsável pela gestão operacional da equipe e das atividades;
- `MEMBER` pode atuar sobre suas próprias atividades, respeitando as regras de transição.

## 3. ADMIN

### Permite

- visualizar usuários;
- criar `ADMIN`, `MANAGER` e `MEMBER`;
- editar qualquer usuário;
- ativar usuários;
- desativar usuários.

### Proíbe

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

## 4. MANAGER

### Permite

- visualizar usuários;
- criar `MEMBER`;
- ativar `MEMBER`;
- desativar `MEMBER`;
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

### Proíbe

- criar, editar, ativar ou desativar `ADMIN` ou outro `MANAGER`.

## 5. MEMBER

### Permite

- visualizar seus próprios dados;
- editar a si mesmo;
- visualizar as atividades às quais possui acesso;
- atribuir uma atividade a si próprio;
- alterar o status das próprias atividades, respeitando as regras de transição;
- comentar nas próprias atividades.

### Proíbe

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

## 6. Matriz resumida

| Ação | ADMIN | MANAGER | MEMBER |
| --- | ---: | ---: | ---: |
| Editar próprio usuário | Sim | Sim | Sim |
| Editar outro usuário | Sim | Não | Não |
| Criar ADMIN | Sim | Não | Não |
| Criar MANAGER | Sim | Não | Não |
| Criar MEMBER | Sim | Sim | Não |
| Ativar ADMIN | Sim | Não | Não |
| Desativar ADMIN | Sim | Não | Não |
| Ativar MANAGER | Sim | Não | Não |
| Desativar MANAGER | Sim | Não | Não |
| Ativar MEMBER | Sim | Sim | Não |
| Desativar MEMBER | Sim | Sim | Não |
| Criar atividade | Não | Sim | Não |
| Editar atividade | Não | Sim | Não |
| Excluir atividade | Não | Sim | Não |
| Atribuir atividade | Não | Sim | Própria |
| Alterar prioridade | Não | Sim | Não |
| Alterar status | Não | Sim | Própria |
| Revisar atividade | Não | Sim | Não |
| Comentar atividade | Não | Sim | Própria |
| Criar categoria | Não | Sim | Não |
| Editar categoria | Não | Sim | Não |
| Excluir categoria | Não | Sim | Não |
| Ativar categoria | Não | Sim | Não |
| Desativar categoria | Não | Sim | Não |

## 7. Regras de autorização relevantes

- A autorização determina se um usuário pode ou não executar uma transição permitida pelo domínio.
- O Kanban deve respeitar tanto as regras de transição quanto as permissões do usuário.
- A mesma atividade não pode ser alterada por diferentes interfaces com regras divergentes: a autorização deve ser centralizada no domínio.
- O `MEMBER` pode mover apenas atividades próprias, e mesmo assim deve respeitar as regras de transição do status.
- O `MANAGER` pode movimentar atividades conforme suas permissões de gestão, respeitando as regras de transição.
- O `ADMIN` não possui permissões operacionais sobre atividades ou categorias.

## 8. Observação sobre escopo

Esta documentação trata apenas do conjunto de permissões e autorizações do produto, preservando as regras acordadas na especificação técnica. Decisões técnicas de implementação de guardas, policies e mecanismos de autenticação serão tratadas em documentação arquitetural específica.
