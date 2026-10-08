# Authentication

## Objetivo

Este documento descreve o domínio de autenticação da aplicação, preservando apenas os conceitos e comportamentos que foram explicitamente definidos nos requisitos e regras de negócio.

## Conceitos centrais

### Usuário autenticado

O sistema reconhece um usuário como pessoa que possui identidade válida para acessar áreas protegidas. A autenticação é tratada como a condição para entrar no ambiente operacional da aplicação.

### Usuário ativo/inativo

O usuário possui um estado de atividade que interfere no acesso:

- usuário ativo pode realizar login;
- usuário inativo não pode realizar login.

Esse estado é parte do conceito de usuário e influencia diretamente a autenticação.

### Sessão

A sessão representa a continuidade do acesso do usuário após a autenticação. A especificação menciona uma sessão que pode expirar e, em seguida, oferecer a possibilidade de renovação.

## Comportamento de autenticação

### Login

O sistema deve permitir que usuários ativos se autentiquem e acessem funcionalidades protegidas.

A autenticação é tratada como um processo de validação de identidade do usuário, com acesso protegido a áreas da aplicação.

### Logout

O documento de requisitos menciona logout como funcionalidade de autenticação. O domínio não define a estratégia de invalidação ou persistência, apenas a existência do conceito de encerramento da sessão.

### Expiração

- o token de acesso tem validade de 1 hora;
- ao expirar, a aplicação deve apresentar uma interface de sessão expirada;
- essa interface deve permanecer disponível por 30 segundos;
- durante o período de 30 segundos, o usuário pode escolher continuar logado;
- se não houver confirmação, o usuário deve ser redirecionado para login.

Essas regras pertencem ao domínio de autenticação e sessão, independentemente da tecnologia usada para implementá-las.

## Renovação

A renovação da sessão é tratada como uma ação de continuidade do acesso quando o usuário opta por manter a sessão ativa.

Conceitualmente:

- expiração do token de acesso leva ao estado de sessão expirada;
- o usuário pode escolher continuar logado;
- a continuidade exige o uso do mecanismo de refresh token;
- o refresh token é a parte da atualização da sessão, mas a implementação técnica exata continua pendente.

### Pendência do domínio

A especificação identifica que os detalhes de segurança da renovação permanecem pendentes, incluindo:

- armazenamento do refresh token;
- rotação de refresh tokens;
- revogação;
- múltiplas sessões;
- logout/invalidação;
- duração do refresh token.

Essas questões não podem ser convertidas em regras definitivas de domínio sem que a fonte as defina.

## Alteração de senha

O usuário pode alterar sua própria senha.

O domínio não exige troca de senha no primeiro acesso e não impõe obrigatoriedade de troca após a criação do usuário.

## Relação com Usuário

O usuário e a autenticação são conceitos distintos:

- o usuário representa a identidade e o perfil na equipe;
- a autenticação representa a capacidade de acessar o sistema com essa identidade;
- o estado ativo/inativo do usuário afeta a possibilidade de login.

## Invariantes

- usuário inativo não pode realizar login;
- sessão expirada exige decisão do usuário dentro da janela de 30 segundos;
- a própria senha pode ser alterada pelo usuário autenticado;
- o domínio não define obrigatório reset de senha no primeiro acesso.

## Decisões pendentes

### Sessão e renovação

- estratégia de armazenamento do refresh token;
- rotação de refresh tokens;
- revogação de sessões;
- política de múltiplas sessões;
- política de invalidação em logout;
- comportamento técnico de “continuar logado”.

Esses pontos permanecem como pendências e devem ser tratadas em documentação posterior, sem que o domínio invente uma escolha operacional.

## Rastreabilidade

Relacionado a:

- RF01 — Autenticação;
- RN02 — Prazo (não diretamente);
- regras de autenticação definidas em `business-rules.md`.

## Conteúdo deliberadamente deixado para Architecture

A documentação de domínio não define:

- JWT como detalhe técnico de implementação;
- refresh token em armazenamento e persistência;
- guarda de rotas;
- políticas de sessão em infraestruturas específicas;
- mecanismos de revogação ou rotação.

Esses temas pertencem a uma etapa de arquitetura, não ao domínio.
