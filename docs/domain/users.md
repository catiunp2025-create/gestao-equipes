# Users

## Objetivo

Este documento descreve o conceito de usuário no domínio da plataforma, seus perfis, seu ciclo de vida e a forma como ele se relaciona com atividades e permissões.

## Conceitos

### Usuário

O usuário é a identidade da pessoa que atua no sistema e que pode estar associada a atividades, permissões e estado de acesso.

Informações conceituais relevantes definidas pela especificação:

- nome;
- e-mail;
- cargo/função;
- perfil;
- status;
- data de criação.

### Perfil/Papel

Os perfis definidos são:

- `ADMIN`;
- `MANAGER`;
- `MEMBER`.

Esses perfis representam papéis do domínio e definem o tipo de autorização do usuário.

### Permissão

Permissão é a capacidade de executar ações dentro do sistema. Ela decorre do perfil do usuário e do contexto da operação.

O domínio deve preservar a distinção:

- Usuário: identidade e estado da pessoa.
- Perfil/Papel: função atribuída ao usuário.
- Permissão: capacidade resultante da função e da regra de negócio.

## Estado do usuário

O usuário possui estado de atividade:

- ativo;
- inativo.

### Regras associadas

- usuários inativos não podem realizar login;
- usuários inativos não devem ser selecionáveis como novos responsáveis por atividades;
- atividades históricas de usuários desativados devem permanecer preservadas;
- a desativação não deve invalidar o histórico da atividade ou da relação anterior.

## Ciclo de vida do usuário

A especificação menciona operações de administração do usuário:

- listar usuários;
- visualizar usuário;
- criar usuário;
- editar usuário;
- ativar usuário;
- desativar usuário.

A administração do usuário é tratada no domínio como parte da gestão da equipe, mas a regra de permissão específica deve ser interpretada conforme o documento de permissões, não duplicada aqui.

## Alteração do próprio usuário

O usuário pode editar a si mesmo e visualizar seus próprios dados. Esse comportamento é parte do conceito de autonomia do usuário dentro da sua própria identidade.

## Administração por perfil

O domínio reconhece a existência de diferentes responsabilidades de gestão conforme o perfil:

- `ADMIN` administra usuários;
- `MANAGER` gerencia atividades e categorias e pode atuar sobre MEMBER em alguns casos;
- `MEMBER` atua principalmente sobre suas atividades e sobre sua própria identidade.

A matriz de permissões define as operações permitidas em cada perfil. O domínio da entidade Usuário preserva essa diferenciação sem desenvolver a implementação técnica.

## Relações com outras entidades

### Usuário e atividade

O usuário pode ser responsável por uma atividade. A especificação define que:

- uma atividade pode ter um responsável;
- uma atividade pode não ter responsável;
- um usuário inativo não pode ser novo responsável;
- o usuário pode atribuir a si próprio uma atividade quando a regra de acesso permitir.

### Usuário e perfil

Cada usuário possui um papel principal no sistema, que determina suas capacidades de gestão e operação.

### Usuário e autenticação

A autenticação depende da experiência de login de um usuário ativo. O estado do usuário influencia diretamente a autorização de acesso.

## Invariantes

- usuário inativo não pode realizar login;
- usuário inativo não pode ser selecionado como novo responsável para atividades;
- histórico de atividades de usuários desativados deve ser preservado;
- a identidade do usuário persiste mesmo quando seu status de acesso muda.

## Decisões pendentes

Algumas questões relacionadas a usuário não foram fechadas pela especificação de produto, e devem permanecer explícitas:

- detalhes de política de exclusão de usuários;
- política definitiva de múltiplas sessões e assinatura de usuário;
- comportamentos de acessos específicos que dependam de arquitetura.

Essas pendências devem ser tratadas fora deste documento, quando a arquitetura ou a especificação operacional exigir a decisão.

## Rastreabilidade

Relacionado a:

- RF02 — Gerenciamento de usuários;
- RN06 — Usuário inativo;
- documento de permissões.

## Conteúdo deliberadamente deixado para Architecture

Não fazem parte do domínio:

- implementação de autenticação em JWT;
- armazenamento e rotação de sessões;
- modelo técnico de autenticação de usuários;
- regras de banco de dados de persistência do usuário.
